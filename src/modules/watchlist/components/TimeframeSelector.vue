<script setup lang="ts">
import type { Timeframe } from '../../types/token.interface'

defineProps<{
  modelValue: Timeframe
}>()

const emit = defineEmits<{
  'update:modelValue': [value: Timeframe]
}>()

const timeframes: Timeframe[] = ['1h', '4h', '24h', '7d']
</script>

<template>
  <div class="flex items-center gap-2">
    <button
      v-for="tf in timeframes"
      :key="tf"
      :id="`tf-${tf}`"
      class="pill-button"
      :class="{ active: modelValue === tf }"
      @click="emit('update:modelValue', tf)"
    >
      {{ tf }}
    </button>
  </div>
</template>
