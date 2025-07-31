<template>
  <header class="flex justify-between items-start mb-4" role="header">
    <div>
      <h1 class="text-4xl font-bold text-gray dark:text-white">Dashboard</h1>
      <p class="text-gray-400 dark:text-white p-1">Welcome back, {{ username }}!</p>
    </div>
    <div class="relative inline-block text-left" @keyup.esc="dropdownOpen = false">
      <!-- Dropdown Trigger -->
      <button
        @click="toggleDropdown"
        @blur="handleBlur"
        class="flex items-center gap-2 rounded-full border-2 border-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
        id="user-menu-button"
        aria-haspopup="true"
      >
        <img
          src="/src/assets/user.jpg"
          alt="User Avatar"
          class="w-10 h-10 rounded-full object-cover"
        />
      </button>

      <!-- Dropdown Menu -->
      <div
        v-if="dropdownOpen"
        class="absolute right-0 mt-2 w-48 bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50"
        role="menu"
        aria-labelledby="user-menu-button"
      >
        <div class="bg-gray-100 p-2">
          <div class="flex flex-col items-start mx-2">
            <h2 class="font-medium font-bold text-gray">
              {{ username }}
            </h2>
            <span class="text-xs text-gray-500">
              {{ roleText }}
            </span>
          </div>
        </div>

        <button @click="toggleContrast" class="w-full text-left px-4 py-2 text-sm" role="menuitem">
          <span class="dark:text-white hover:bg-grey-400 flex gap-2"
            ><svg
              class="w-6 h-6 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fill-rule="evenodd"
                d="M11.675 2.015a.998.998 0 0 0-.403.011C6.09 2.4 2 6.722 2 12c0 5.523 4.477 10 10 10 4.356 0 8.058-2.784 9.43-6.667a1 1 0 0 0-1.02-1.33c-.08.006-.105.005-.127.005h-.001l-.028-.002A5.227 5.227 0 0 0 20 14a8 8 0 0 1-8-8c0-.952.121-1.752.404-2.558a.996.996 0 0 0 .096-.428V3a1 1 0 0 0-.825-.985Z"
                clip-rule="evenodd"
              />
            </svg>
            High Contrast
          </span>
        </button>
        <button
          @click="logout"
          class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100 dark:hover:bg-red-900 dark:text-red-400 flex gap-2"
          role="menuitem"
        >
          <svg
            class="w-6 h-6 text-red-600 dark:text-red"
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
              d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"
            />
          </svg>
          Logout
        </button>
      </div>
    </div>
  </header>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref(localStorage.getItem('username') || '')
const role = ref(localStorage.getItem('role') || '')
const roleText = role.value === 'teacher' ? 'Teacher' : 'Administrator'
const router = useRouter()

function logout() {
  localStorage.clear()
  router.push('/login')
}
function toggleContrast() {
  document.body.classList.toggle('high-contrast')
}
const dropdownOpen = ref(false)

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value
}

// Close dropdown when clicking outside
function handleBlur(event: FocusEvent) {
  const related = event.relatedTarget as HTMLElement | null
  if (!related || !related.closest('[role="menu"]')) {
    dropdownOpen.value = false
  }
}
</script>
<style></style>
