<template>
  <div class="dark:bg-black bg-gray-100">
    <div class="flex">
      <Sidebar v-if="!isLoginPage" :isOpen="sidebarOpen" @toggle="sidebarOpen = !sidebarOpen" />
      <div
        :class="[
          'w-full pr-3 pt-6 sm:pl-0 pl-3',
          isLoginPage
            ? 'ml-0 '
            : sidebarOpen
              ? 'ml-0 sm:ml-24 md:ml-60 lg:ml-60'
              : 'ml-0 sm:ml-24 md:ml-24 lg:ml-32',
        ]"
      >
        <Header v-if="!isLoginPage" />
        <main :class="[isLoginPage ? 'ml-0 ' : 'bg-white py-6 px-6 rounded-md dark:bg-black']">
          <router-view />
        </main>
      </div>
    </div>
    <button
      @click="toggleDarkMode"
      aria-label="Toggle high contrast mode"
      class="fixed bottom-4 right-4 z-50 bg-white dark:bg-black p-3 rounded-full shadow-lg hover:bg-blue-100"
    >
      <svg
        class="w-6 h-6 text-gray-800 dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 9a3 3 0 0 1 3-3m-2 15h4m0-3c0-4.1 4-4.9 4-9A6 6 0 1 0 6 9c0 4 4 5 4 9h4Z"
        />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from '@/components/Sidebar.vue'
import Header from '@/layout/Header.vue'

const sidebarOpen = ref(false)
const route = useRoute()

const theme = ref()
onMounted(() => {
  theme.value = localStorage.getItem('theme')
  if (theme.value === 'dark') {
    document.documentElement.classList.add('dark')
  }
})
function toggleDarkMode() {
  const html = document.documentElement
  html.classList.toggle('dark')
  localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light')
  theme.value = localStorage.getItem('theme')
}
const isLoginPage = computed(() => route.name === 'login')
</script>

<style scoped></style>
