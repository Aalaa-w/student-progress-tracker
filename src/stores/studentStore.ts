import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStudentStore = defineStore('studentStore', () => {
  const students = ref<any[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function fetchStudents(p0: { pageIndex: number; pageSize: number }) {
    isLoading.value = true
    error.value = null
    try {
      const response = await fetch('http://localhost:3000/students')
      if (!response.ok) throw new Error('Failed to fetch students.')
      students.value = await response.json()
    } catch (err: any) {
      error.value = err.message || 'Unknown error'
    } finally {
      isLoading.value = false
    }
  }

  return { students, isLoading, error, fetchStudents }
})
