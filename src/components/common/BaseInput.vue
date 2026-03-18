<script setup lang="ts">
interface Props {
  modelValue: string | number;
  label?: string;
  type?: string;
  placeholder?: string;
  error?: string;
  id?: string;
}

defineProps<Props>();
defineEmits(['update:modelValue']);
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label v-if="label" :for="id" class="text-sm font-medium text-slate-300">
      {{ label }}
    </label>
    <input
      :id="id"
      :type="type || 'text'"
      :value="modelValue"
      :placeholder="placeholder"
      class="w-full px-3 py-2 bg-slate-800 border rounded-lg outline-none transition-all duration-200 text-slate-100 placeholder:text-slate-500"
      :class="[
        error 
          ? 'border-rose-500/50 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10' 
          : 'border-slate-700 focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10'
      ]"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <span v-if="error" class="text-xs text-rose-500 mt-0.5">
      {{ error }}
    </span>
  </div>
</template>
