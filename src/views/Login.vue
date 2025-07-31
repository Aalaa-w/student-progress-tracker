<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black">
    <div class="bg-white dark:bg-black p-8 rounded-xl shadow-lg w-full max-w-sm">
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">Login</h2>

      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block text-gray-900 dark:text-gray-300 mb-2" for="username">Username</label>
          <input
            id="username"
            v-model="username"
            type="text"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div class="mb-4">
          <label class="block text-gray-900 dark:text-gray-300 mb-2" for="role">Select Role</label>
          <select
            id="role"
            v-model="role"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option disabled value="">-- Choose a role --</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Administrator</option>
          </select>
        </div>

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
const router = useRouter()

function handleLogin() {
  const cleanUsername = sanitize(username.value.trim())
  if (!cleanUsername || !role.value) {
    alert('Please fill in all fields correctly.')
    return
  }

  localStorage.setItem('username', cleanUsername)
  localStorage.setItem('role', role.value)
  router.push('/dashboard')
}

function sanitize(input: string) {
  return input.replace(/[<>\/\\'"`]/g, '')
}
</script>
