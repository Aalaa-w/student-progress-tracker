<template>
  <router-link :to="link" class="focus:outline-none" :aria-label="title" role="menuitem">
    <div
      class="flex items-center gap-4 px-4 py-2 hover:bg-white hover:text-blue-300 transition rounded-md relative cursor-pointer"
    >
      <span class="text-xl" v-html="icon" aria-hidden="true"></span>
      <span v-if="isOpen" class="whitespace-nowrap">{{ title }}</span>
      <span
        v-if="badge"
        class="absolute right-2 top-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full"
        :aria-label="`${title} notifications: ${badge}`"
      >
        {{ badge }}
      </span>
    </div>
  </router-link>
</template>

<script setup lang="ts">
defineProps<{
  icon: string
  title: string
  isOpen: boolean
  badge?: number | string
  link: string
}>()
</script>
