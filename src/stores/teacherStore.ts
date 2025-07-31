import { defineStore } from 'pinia'
import { ref } from 'vue'

export type Teacher = {
  id: number
  name: string
  subject: string
  email: string
}

export const useTeacherStore = defineStore('teacherStore', () => {
  const teachers = ref<Teacher[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const fetchTeachers = async () => {
    isLoading.value = true
    error.value = null

    try {
      const res = await fetch('http://localhost:3000/teachers')
      if (!res.ok) throw new Error('Failed to fetch teachers')
      const data = await res.json()
      teachers.value = data
    } catch (err: any) {
      error.value = err.message || 'Unknown error'
    } finally {
      isLoading.value = false
    }
  }

  return { teachers, isLoading, error, fetchTeachers }
})
