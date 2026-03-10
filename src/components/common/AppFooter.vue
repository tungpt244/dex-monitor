<script setup lang="ts">
import { computed } from 'vue'

defineProps<{
  lastUpdated: Date
}>()

const autoRefresh = defineModel<boolean>('autoRefresh', { default: true })

const formattedTime = computed(() => {
  // Reactivity on autoRefresh toggle to re-render is intentional
  return new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })
})
</script>

<template>
  <footer class="px-4 py-3 md:px-6 md:py-4 flex items-center justify-between text-xs text-charcoal-500 border-t border-charcoal-800/30">
    <span>
      🕐 Last updated: {{ formattedTime }}
    </span>

    <div class="flex items-center gap-4">
      <label class="flex items-center gap-2 cursor-pointer" for="auto-refresh">
        <span>Auto-refresh</span>
        <div class="relative">
          <input
            id="auto-refresh"
            v-model="autoRefresh"
            type="checkbox"
            class="sr-only peer"
          />
          <div class="w-9 h-5 rounded-full bg-charcoal-700 peer-checked:bg-cyan-accent/30 transition-colors"></div>
          <div class="absolute left-0.5 top-0.5 w-4 h-4 rounded-full bg-charcoal-400 peer-checked:bg-cyan-accent peer-checked:translate-x-4 transition-all"></div>
        </div>
      </label>
    </div>
  </footer>
</template>
