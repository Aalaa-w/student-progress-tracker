import { defineStore } from 'pinia'
import { ref } from 'vue'

export type Notification = {
  id: number
  message: string
}

export const useNotificationStore = defineStore('notificationStore', () => {
  const notifications = ref<Notification[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const fetchNotifications = async () => {
    isLoading.value = true
    error.value = null

    try {
      const res = await fetch('http://localhost:3000/notifications')
      if (!res.ok) throw new Error('Failed to fetch notifications')
      const data = await res.json()
      notifications.value = data
    } catch (err: any) {
      error.value = err.message || 'Unknown error'
    } finally {
      isLoading.value = false
    }
  }

  return { notifications, isLoading, error, fetchNotifications }
})
