import { ref, computed, onUnmounted } from 'vue'
import type { Token, Timeframe, TokenHighLow } from '../types/token.interface'
import { fetchTokens, fetchTokenHighLow, searchTokens } from '../services/watchlist.service'

const tokens = ref<Token[]>([])
const highLowData = ref<TokenHighLow[]>([])
const timeframe = ref<Timeframe>('1h')
const searchQuery = ref('')
const lastUpdated = ref<Date>(new Date())
const isLoading = ref(false)
const error = ref<string | null>(null)

// AbortController for managing ongoing requests (per project rules)
let currentController: AbortController | null = null

function abortPrevious() {
  if (currentController) {
    currentController.abort()
    currentController = null
  }
}

export function useWatchlist() {
  const filteredTokens = computed(() => {
    const query = searchQuery.value.toLowerCase().trim()
    if (!query) return tokens.value

    return tokens.value.filter(
      (token) =>
        token.name.toLowerCase().includes(query) ||
        token.symbol.toLowerCase().includes(query)
    )
  })

  function getHighLow(tokenId: string) {
    const data = highLowData.value.find((d) => d.tokenId === tokenId)
    return data ?? { high: 0, low: 0, timeframe: timeframe.value, tokenId }
  }

  async function loadTokens() {
    abortPrevious()
    currentController = new AbortController()
    isLoading.value = true
    error.value = null

    try {
      tokens.value = await fetchTokens(currentController.signal)
      await updateHighLow()
      lastUpdated.value = new Date()
    } catch (e: unknown) {
      if (e instanceof Error && e.name !== 'AbortError') {
        error.value = e.message
      }
    } finally {
      isLoading.value = false
    }
  }

  async function updateHighLow() {
    if (tokens.value.length === 0) return
    highLowData.value = await fetchTokenHighLow(tokens.value, timeframe.value)
  }

  async function setTimeframe(tf: Timeframe) {
    timeframe.value = tf
    await updateHighLow()
  }

  function removeToken(tokenId: string) {
    tokens.value = tokens.value.filter((t) => t.id !== tokenId)
    highLowData.value = highLowData.value.filter((d) => d.tokenId !== tokenId)
  }

  async function addTokenBySearch(query: string) {
    abortPrevious()
    currentController = new AbortController()

    try {
      const results = await searchTokens(query, currentController.signal)
      // Add results that aren't already in the watchlist
      const existingIds = new Set(tokens.value.map((t) => t.id))
      const newTokens = results.filter((t) => !existingIds.has(t.id))
      if (newTokens.length > 0) {
        tokens.value = [...tokens.value, ...newTokens.slice(0, 5)]
        await updateHighLow()
        lastUpdated.value = new Date()
      }
      return newTokens
    } catch (e: unknown) {
      if (e instanceof Error && e.name !== 'AbortError') {
        error.value = e.message
      }
      return []
    }
  }

  function setSearchQuery(query: string) {
    searchQuery.value = query
  }

  // Cleanup on unmount (per project rules - Memory Management)
  onUnmounted(() => {
    abortPrevious()
  })

  return {
    tokens: filteredTokens,
    timeframe,
    searchQuery,
    lastUpdated,
    isLoading,
    error,
    getHighLow,
    loadTokens,
    setTimeframe,
    removeToken,
    addTokenBySearch,
    setSearchQuery,
  }
}
