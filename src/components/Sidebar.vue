<template>
  <aside
    role="complementary"
    aria-label="Sidebar Navigation"
    :class="[
      ' bg-blue-300 dark:bg-blue-900 text-white transition-all duration-300 ease-in-out shadow-lg fixed top-0  z-50 shadow-lg',
      props.isOpen
        ? 'w-[14rem] rounded-none mx-0 top-0 h-[100%] '
        : 'w-16 rounded-md mx-0 top-5 h-[96%] sm:mx-5 left-[-80px] sm:left-0',
    ]"
  >
    <div
      :class="[
        'py-4 px-4',
        props.isOpen
          ? 'flex justify-between items-center flex-row'
          : 'flex flex-col justify-center items-center gap-2',
      ]"
    >
      <!-- Logo -->
      <div class="flex items-center justify-center">
        <h1 class="font-bold text-center">LOGO</h1>
      </div>

      <!-- Toggle Button -->
      <div class="flex justify-center items-center hidden sm:block">
        <button
          @click="$emit('toggle')"
          class="text-white text-xl focus:outline-none"
          aria-label="Toggle sidebar"
        >
          ☰
        </button>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex flex-col gap-4" aria-label="Main Navigation">
      <SidebarItem
        icon='<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-house-fill" viewBox="0 0 16 16">
  <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z"/>
  <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z"/>
</svg>'
        title="Dashboard"
        :isOpen="props.isOpen"
        link="/dashboard"
      />
      <SidebarItem
        icon='<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
  <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
</svg>'
        title="Students"
        :isOpen="props.isOpen"
        link="/Students"
      />
    </nav>
  </aside>
  <div class="block sm:hidden mobile-toggle">
    <div class="flex justify-center items-center">
      <button
        @click="$emit('toggle')"
        class="text-gray-500 text-2xl focus:outline-none"
        aria-label="Toggle sidebar"
      >
        ☰
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
const SidebarItem = defineAsyncComponent(() => import('@/components/SidebarItem.vue'))
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{ isOpen: boolean }>()
const emit = defineEmits(['toggle'])
</script>
<style>
.mobile-toggle {
  position: absolute;
  right: 70px;
  top: 31px;
}
</style>
