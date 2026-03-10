<script setup lang="ts">
defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <header class="glass-card sticky top-0 z-50 px-4 py-3 md:px-6 md:py-4 flex items-center justify-between gap-4">
    <div class="flex items-center gap-2 shrink-0">
      <span class="text-xl">📊</span>
      <h1 class="text-lg md:text-xl font-bold text-white tracking-tight">
        DEX Monitor
      </h1>
    </div>

    <div class="relative flex-1 max-w-md">
      <span class="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-400 text-sm">🔍</span>
      <input
        id="search-token"
        type="text"
        :value="modelValue"
        placeholder="Search tokens by name or symbol..."
        class="w-full pl-9 pr-4 py-2 rounded-lg bg-charcoal-900/60 border border-charcoal-700/50 text-sm text-charcoal-100 placeholder-charcoal-500 outline-none focus:border-cyan-accent/40 transition-colors"
        @input="onInput"
      />
    </div>
  </header>
</template>
