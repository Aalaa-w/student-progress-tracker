<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black">
    <div class="bg-white dark:bg-black p-8 rounded-xl shadow-lg w-full max-w-sm">
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">Login</h2>

      <form @submit.prevent="handleLogin" novalidate>
        <!-- Username Field -->
        <div class="mb-4">
          <label class="block text-gray-900 dark:text-gray-300 mb-2" for="username">Username</label>
          <input
            id="username"
            v-model="username"
            type="text"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
            :class="errors.username ? 'border-red-500 focus:ring-red-400' : 'focus:ring-blue-500'"
            required
          />
          <p v-if="errors.username" class="text-sm text-red-500 mt-1">{{ errors.username }}</p>
        </div>

        <!-- Role Field -->
        <div class="mb-4">
          <label class="block text-gray-900 dark:text-gray-300 mb-2" for="role">Select Role</label>
          <select
            id="role"
            v-model="role"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
            :class="errors.role ? 'border-red-500 focus:ring-red-400' : 'focus:ring-blue-500'"
            required
          >
            <option disabled value="">-- Choose a role --</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Administrator</option>
          </select>
          <p v-if="errors.role" class="text-sm text-red-500 mt-1">{{ errors.role }}</p>
        </div>

        <!-- Submit -->
        <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const role = ref('')
const errors = ref<{ username?: string; role?: string }>({})
const router = useRouter()

function sanitize(input: string) {
  return input.replace(/[<>\/\\'"`]/g, '')
}

function validateForm() {
  errors.value = {}

  const name = sanitize(username.value.trim())

  if (!name) {
    errors.value.username = 'Username is required.'
  } else if (!/^[a-zA-Z0-9_]{3,20}$/.test(name)) {
    errors.value.username =
      'Username must be 3–20 characters and contain only letters, numbers, or underscores.'
  }

  if (!role.value) {
    errors.value.role = 'Please select a role.'
  }

  return Object.keys(errors.value).length === 0
}

function handleLogin() {
  if (!validateForm()) return

  localStorage.setItem('username', sanitize(username.value.trim()))
  localStorage.setItem('role', role.value)
  router.push('/dashboard')
}
</script>
