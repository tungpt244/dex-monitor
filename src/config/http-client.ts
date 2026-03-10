/**
 * Centralized HTTP client for API requests.
 * Uses native fetch + AbortController per project rules.
 */

export interface HttpClientConfig {
  baseUrl: string;
  defaultHeaders?: Record<string, string>;
  timeout?: number;
}

export interface RequestOptions {
  signal?: AbortSignal;
  headers?: Record<string, string>;
  params?: Record<string, string>;
}

const DEFAULT_TIMEOUT = 15_000; // 15s

/**
 * Create an HTTP client instance with a base URL and default config.
 */
export function createHttpClient(config: HttpClientConfig) {
  const { baseUrl, defaultHeaders = {}, timeout = DEFAULT_TIMEOUT } = config;

  async function get<T>(
    path: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const url = buildUrl(`${baseUrl}${path}`, options.params);

    // Merge AbortController: respect caller signal + add timeout
    const timeoutController = new AbortController();
    const timeoutId = setTimeout(() => timeoutController.abort(), timeout);

    // If caller provides a signal, abort on either caller or timeout
    const combinedSignal = options.signal
      ? combineSignals(options.signal, timeoutController.signal)
      : timeoutController.signal;

    try {
      const res = await fetch(url, {
        method: "GET",
        headers: { ...defaultHeaders, ...options.headers },
        signal: combinedSignal,
      });

      if (!res.ok) {
        throw new ApiError(
          res.status,
          `HTTP ${res.status}: ${res.statusText}`,
          url
        );
      }

      return (await res.json()) as T;
    } catch (error: unknown) {
      if (error instanceof ApiError) throw error;

      if (error instanceof Error && error.name === "AbortError") {
        throw error; // Re-throw AbortError for composable cleanup
      }

      throw new ApiError(0, `Network error: ${(error as Error).message}`, url);
    } finally {
      clearTimeout(timeoutId);
    }
  }

  return { get };
}

/** Custom API error with status code and URL context */
export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly url: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// ── Helpers ──────────────────────────────────────────────

function buildUrl(base: string, params?: Record<string, string>): string {
  if (!params || Object.keys(params).length === 0) return base;
  const qs = new URLSearchParams(params).toString();
  return `${base}?${qs}`;
}

function combineSignals(...signals: AbortSignal[]): AbortSignal {
  const controller = new AbortController();
  for (const signal of signals) {
    if (signal.aborted) {
      controller.abort(signal.reason);
      break;
    }
    signal.addEventListener("abort", () => controller.abort(signal.reason), {
      once: true,
    });
  }
  return controller.signal;
}
