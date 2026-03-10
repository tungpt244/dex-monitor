<script setup lang="ts">
import { onMounted } from 'vue'
import AppHeader from '@/components/common/AppHeader.vue'
import AppFooter from '@/components/common/AppFooter.vue'
import TimeframeSelector from './components/TimeframeSelector.vue'
import TokenTable from './components/TokenTable.vue'
import TokenCard from './components/TokenCard.vue'
import { useWatchlist } from './composables/useWatchlist'

const {
  tokens,
  timeframe,
  searchQuery,
  lastUpdated,
  isLoading,
  getHighLow,
  loadTokens,
  setTimeframe,
  removeToken,
  setSearchQuery,
} = useWatchlist()

onMounted(() => {
  loadTokens()
})
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <AppHeader :model-value="searchQuery" @update:model-value="setSearchQuery" />

    <main class="flex-1 px-4 py-4 md:px-6 md:py-6 max-w-7xl mx-auto w-full">
      <!-- Watchlist Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div class="flex items-center gap-4">
          <h2 class="text-lg font-bold text-white">Watchlist</h2>
          <TimeframeSelector :model-value="timeframe" @update:model-value="setTimeframe" />
        </div>
      </div>

      <!-- Loading -->
      <div v-if="isLoading" class="text-center py-12 text-charcoal-400">
        Loading tokens...
      </div>

      <!-- Empty State -->
      <div v-else-if="tokens.length === 0" class="text-center py-12">
        <p class="text-charcoal-400 text-lg">No tokens found</p>
        <p class="text-charcoal-500 text-sm mt-2">Try adjusting your search query</p>
      </div>

      <!-- Token List -->
      <template v-else>
        <TokenTable
          :tokens="tokens"
          :timeframe="timeframe"
          :get-high-low="getHighLow"
          @remove="removeToken"
        />
        <TokenCard
          :tokens="tokens"
          :timeframe="timeframe"
          :get-high-low="getHighLow"
          @remove="removeToken"
        />
      </template>
    </main>

    <AppFooter :last-updated="lastUpdated" />
  </div>
</template>
