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
  <div class="hidden md:block overflow-x-auto">
    <table class="w-full text-sm">
      <thead>
        <tr class="text-charcoal-400 text-xs uppercase tracking-wider border-b border-charcoal-800/50">
          <th class="text-left py-3 px-4 font-medium">Token</th>
          <th class="text-right py-3 px-4 font-medium">Price</th>
          <th class="text-right py-3 px-4 font-medium">24h Change</th>
          <th class="text-right py-3 px-4 font-medium">{{ timeframe }} High</th>
          <th class="text-right py-3 px-4 font-medium">{{ timeframe }} Low</th>
          <th class="text-right py-3 px-4 font-medium">Volume</th>
          <th class="text-right py-3 px-4 font-medium">TVL</th>
          <th class="text-center py-3 px-4 font-medium">Trend</th>
          <th class="text-center py-3 px-4 font-medium">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="token in tokens"
          :key="token.id"
          class="border-b border-charcoal-800/30 hover:bg-charcoal-900/40 transition-colors"
        >
          <!-- Token -->
          <td class="py-4 px-4">
            <div class="flex items-center gap-3">
              <span class="text-xl w-8 h-8 flex items-center justify-center rounded-full bg-charcoal-800/50 overflow-hidden">
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
          </td>

          <!-- Price -->
          <td class="text-right py-4 px-4 font-mono text-white font-medium">
            {{ formatPrice(token.price) }}
          </td>

          <!-- 24h Change -->
          <td class="text-right py-4 px-4">
            <span
              class="inline-block px-2 py-0.5 rounded text-xs font-semibold"
              :class="token.change24h >= 0 ? 'text-positive bg-green-accent/10' : 'text-negative bg-red-accent/10'"
            >
              {{ formatChange(token.change24h) }}
            </span>
          </td>

          <!-- High -->
          <td class="text-right py-4 px-4 font-mono text-charcoal-200">
            {{ formatPrice(getHighLow(token.id).high) }}
          </td>

          <!-- Low -->
          <td class="text-right py-4 px-4 font-mono text-charcoal-200">
            {{ formatPrice(getHighLow(token.id).low) }}
          </td>

          <!-- Volume -->
          <td class="text-right py-4 px-4 text-charcoal-300">
            {{ formatVolume(token.volume) }}
          </td>

          <!-- TVL -->
          <td class="text-right py-4 px-4 text-charcoal-300">
            {{ formatVolume(token.tvl) }}
          </td>

          <!-- Trend -->
          <td class="text-center py-4 px-4">
            <div class="flex justify-center gap-0.5">
              <template v-if="token.trend === 'up'">
                <div class="w-1 h-3 rounded-sm bg-green-accent/60"></div>
                <div class="w-1 h-4 rounded-sm bg-green-accent/80"></div>
                <div class="w-1 h-5 rounded-sm bg-green-accent"></div>
              </template>
              <template v-else-if="token.trend === 'down'">
                <div class="w-1 h-5 rounded-sm bg-red-accent"></div>
                <div class="w-1 h-4 rounded-sm bg-red-accent/80"></div>
                <div class="w-1 h-3 rounded-sm bg-red-accent/60"></div>
              </template>
              <template v-else>
                <div class="w-1 h-4 rounded-sm bg-charcoal-500"></div>
                <div class="w-1 h-4 rounded-sm bg-charcoal-500"></div>
                <div class="w-1 h-4 rounded-sm bg-charcoal-500"></div>
              </template>
            </div>
          </td>

          <!-- Actions -->
          <td class="text-center py-4 px-4">
            <button
              :id="`remove-${token.id}`"
              class="text-charcoal-500 hover:text-red-accent transition-colors p-1"
              title="Remove from watchlist"
              @click="emit('remove', token.id)"
            >
              🗑️
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
