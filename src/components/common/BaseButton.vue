<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  loading: false,
  disabled: false,
  type: 'button',
});

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

const variants = {
  primary: 'bg-cyan-600 hover:bg-cyan-700 text-white disabled:bg-cyan-800',
  secondary: 'bg-slate-700 hover:bg-slate-600 text-white disabled:bg-slate-800',
  outline: 'border border-cyan-600 text-cyan-500 hover:bg-cyan-900/30 disabled:border-cyan-800',
  danger: 'bg-rose-600 hover:bg-rose-700 text-white disabled:bg-rose-800',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2',
  lg: 'px-6 py-3 text-lg',
};
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    class="relative inline-flex items-center justify-center font-medium transition-colors rounded-lg disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
    :class="[variants[variant], sizes[size]]"
    @click="emit('click', $event)"
  >
    <span :class="{ 'opacity-0': loading }">
      <slot />
    </span>

    <span
      v-if="loading"
      class="absolute inset-0 flex items-center justify-center"
    >
      <svg
        class="w-5 h-5 animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </span>
  </button>
</template>
