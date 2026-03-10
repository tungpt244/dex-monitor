<script setup lang="ts">
import type { Token, Timeframe, TokenHighLow } from '../types/token.interface'

defineProps<{
  tokens: Token[]
  timeframe: Timeframe
  getHighLow: (tokenId: string) => TokenHighLow
}>()

const emit = defineEmits<{
  remove: [tokenId: string]
}>()

function formatPrice(price: number): string {
  if (price < 0.001) return `$${price.toFixed(7)}`
  if (price < 1) return `$${price.toFixed(4)}`
  return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

function formatVolume(value: number): string {
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(1)}B`
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(0)}M`
  return `$${value.toLocaleString()}`
}

function formatChange(change: number): string {
  const sign = change >= 0 ? '+' : ''
  return `${sign}${change.toFixed(1)}%`
}
</script>

<template>
  <div class="md:hidden flex flex-col gap-3">
    <div
      v-for="token in tokens"
      :key="token.id"
      class="glass-card glass-card-hover p-4"
    >
      <!-- Row 1: Token info + Price -->
      <div class="flex items-start justify-between mb-3">
        <div class="flex items-center gap-3">
          <span class="text-xl w-10 h-10 flex items-center justify-center rounded-full bg-charcoal-800/50 overflow-hidden shrink-0">
            <img
              v-if="token.icon"
              :src="token.icon"
              :alt="token.symbol"
              class="w-full h-full object-cover"
              loading="lazy"
            />
            <span v-else class="text-xs font-bold text-charcoal-300">{{ token.symbol.charAt(0) }}</span>
          </span>
          <div>
            <div class="font-semibold text-white">{{ token.name }}</div>
            <div class="text-xs text-charcoal-400">{{ token.symbol }}</div>
          </div>
        </div>
        <div class="text-right">
          <div class="font-mono text-white font-medium">{{ formatPrice(token.price) }}</div>
          <span
            class="inline-block mt-1 px-2 py-0.5 rounded text-xs font-semibold"
            :class="token.change24h >= 0 ? 'text-positive bg-green-accent/10' : 'text-negative bg-red-accent/10'"
          >
            {{ formatChange(token.change24h) }}
          </span>
        </div>
      </div>

      <!-- Row 2: High / Low -->
      <div class="flex gap-4 mb-2 text-xs">
        <div>
          <span class="text-charcoal-500 uppercase">High ({{ timeframe }})</span>
          <div class="font-mono text-charcoal-200 mt-0.5">{{ formatPrice(getHighLow(token.id).high) }}</div>
        </div>
        <div>
          <span class="text-charcoal-500 uppercase">Low ({{ timeframe }})</span>
          <div class="font-mono text-charcoal-200 mt-0.5">{{ formatPrice(getHighLow(token.id).low) }}</div>
        </div>
      </div>

      <!-- Row 3: Volume + Liquidity + Remove -->
      <div class="flex items-center justify-between text-xs text-charcoal-400">
        <div class="flex gap-4">
          <span>Vol 24h: <span class="text-charcoal-300">{{ formatVolume(token.volume) }}</span></span>
          <span>Liq: <span class="text-charcoal-300">{{ formatVolume(token.tvl) }}</span></span>
        </div>
        <button
          :id="`remove-mobile-${token.id}`"
          class="text-charcoal-500 hover:text-red-accent transition-colors p-1"
          @click="emit('remove', token.id)"
        >
          🗑️
        </button>
      </div>
    </div>
  </div>
</template>
