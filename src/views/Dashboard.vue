<template>
  <section
    :class="[
      'grid grid-cols-1 gap-4 mb-6 ',
      roleText === 'Administrator' ? 'md:grid-cols-3' : 'md:grid-cols-2',
    ]"
  >
    <div
      class="info-card bg-blue-300 text-white dark:bg-blue-900 min-h-[170px]"
      role="region"
      aria-label="Total number of students"
    >
      <h3>Total Students</h3>
      <p>{{ totalStudents }}</p>
    </div>

    <div
      class="info-card bg-purple-300 text-white dark:bg-purple-900"
      role="region"
      aria-label="Popular Courses"
    >
      <h3>Popular Courses</h3>
      <p>{{ popularCourses }}</p>
    </div>

    <div
      v-if="roleText === 'Administrator'"
      class="info-card bg-orange-300 dark:bg-orange-900 text-white"
      role="region"
      aria-label="Total number of Teachers"
    >
      <h3>Total Teachers</h3>
      <p>{{ totalTeachers }}</p>
    </div>
  </section>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
    <section
      class="mt-6 bg-white dark:bg-black p-4 rounded-lg p-4"
      v-if="roleText === 'Administrator'"
    >
      <h3 class="text-lg font-semibold text-gray mb-4 dark:text-white">Top Teachers</h3>
      <table class="min-w-full" role="table" aria-label="Top Teachers table">
        <thead class="bg-blue-100 text-blue-800">
          <tr role="row">
            <th role="columnheader" scope="col" class="p-2 text-left">#</th>
            <th role="columnheader" scope="col" class="p-2 text-left">Name</th>
            <th role="columnheader" scope="col" class="p-2 text-left">Subject</th>
            <th role="columnheader" scope="col" class="p-2 text-left">Email</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(teacher, index) in teacherStore.teachers"
            :key="teacher.id"
            class="border-b hover:bg-blue-50 dark:hover:bg-blue-900 dark:text-white"
            tabindex="0"
            @keydown.enter="() => {}"
          >
            <td class="p-2">{{ index + 1 }}</td>
            <td class="p-2">{{ teacher.name }}</td>
            <td class="p-2">{{ teacher.subject }}</td>
            <td class="p-2 font-semibold text-blue-700">{{ teacher.email }}%</td>
          </tr>
        </tbody>
      </table>
    </section>
    <section class="mt-6 bg-white dark:bg-black p-4 rounded-lg p-4">
      <h3 class="text-lg font-semibold text-gray mb-4 dark:text-white">Top Students</h3>
      <table class="min-w-full">
        <thead class="bg-blue-100 text-blue-800" role="table" aria-label="Top Students table">
          <tr role="row">
            <th role="columnheader" scope="col" class="p-2 text-left">#</th>
            <th role="columnheader" scope="col" class="p-2 text-left">Name</th>
            <th role="columnheader" scope="col" class="p-2 text-left">Grade</th>
            <th role="columnheader" scope="col" class="p-2 text-left">Progress</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(student, index) in topStudents"
            :key="student.id"
            class="border-b hover:bg-blue-50 dark:hover:bg-blue-900 dark:text-white"
            tabindex="0"
            @keydown.enter="() => {}"
          >
            <td class="p-2">{{ index + 1 }}</td>
            <td class="p-2">{{ student.name }}</td>
            <td class="p-2">{{ student.grade }}</td>
            <td class="p-2 font-semibold text-blue-700">{{ student.progress }}%</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="bg-white dark:bg-black p-4 mt-4">
      <h3 class="text-lg font-semibold text-gray-800 text-gray dark:text-white mb-4">
        Course Popularity
      </h3>
      <CoursePopularityChart :students="studentStore.students" />
    </section>
    <section
      class="bg-white dark:bg-gray-800 p-4 mt-4 md:col-span-1"
      v-if="roleText === 'Administrator'"
    >
      <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Lastest Notifications
      </h3>
      <ul class="space-y-3">
        <li
          v-for="(notification, index) in notificationStore.notifications"
          :key="index"
          class="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
        >
          <svg
            class="w-5 h-5 text-blue-500 mt-1 shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              d="M10 2a6 6 0 0 0-6 6v3.586L3.293 14.293a1 1 0 0 0 .707 1.707H16a1 1 0 0 0 .707-1.707L16 11.586V8a6 6 0 0 0-6-6Zm-1 15a1 1 0 1 0 2 0h-2Z"
            />
          </svg>
          <span>{{ notification.message }}</span>
        </li>
      </ul>
    </section>
  </div>
  <div v-if="isLoading" class="text-center p-4">Loading students...</div>
  <div v-if="error" class="text-red-600 p-4">{{ error }}</div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, onMounted, ref } from 'vue'
const CoursePopularityChart = defineAsyncComponent(
  () => import('@/components/CoursePopularityChart.vue'),
)
import { useStudentStore } from '@/stores/studentStore'
import { storeToRefs } from 'pinia'
import { useTeacherStore } from '@/stores/teacherStore'
import { useNotificationStore } from '@/stores/notification'

const role = ref(localStorage.getItem('role') || '')

const roleText = role.value === 'teacher' ? 'Teacher' : 'Administrator'

const sortKey = ref('')
const sortAsc = ref(true)

function sortBy(key: string) {
  if (sortKey.value === key) {
    sortAsc.value = !sortAsc.value
  } else {
    sortKey.value = key
    sortAsc.value = true
  }
}

const studentStore = useStudentStore()
const { isLoading, error } = storeToRefs(studentStore)
const { fetchStudents } = studentStore
const teacherStore = useTeacherStore()

const page = ref(1)
const pageSize = 10
onMounted(async () => {
  ;(fetchStudents({ pageIndex: page.value, pageSize }),
    teacherStore.fetchTeachers(),
    fetchNotifications())
})
const theme = ref()

onMounted(() => {
  theme.value = localStorage.getItem('theme')
  if (theme.value === 'dark') {
    document.documentElement.classList.add('dark')
  }
})

const totalTeachers = computed(() => teacherStore.teachers.length)

const totalStudents = computed(() => studentStore.students.length)
const popularCourses = computed(() => {
  const subjectCount: Record<string, number> = {}

  studentStore.students.forEach((student) => {
    const subject = student.subject
    if (!subjectCount[subject]) {
      subjectCount[subject] = 1
    } else {
      subjectCount[subject]++
    }
  })

  const sorted = Object.entries(subjectCount).sort((a, b) => b[1] - a[1])
  return sorted
    .slice(0, 3)
    .map(([subject]) => subject)
    .join(', ')
})
const topStudents = computed(() => {
  return [...studentStore.students]
    .sort((a, b) => b.progress - a.progress)
    .slice(0, roleText === 'Administrator' ? teacherStore.teachers.length : 9)
})

const notificationStore = useNotificationStore()
const { fetchNotifications } = notificationStore
</script>
<style scoped>
.info-card {
  padding: 1.25rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.info-card h3 {
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: uppercase;
}

.info-card p {
  font-size: 1.875rem;
  font-weight: 700;
  margin-top: 0.5rem;
}
@media (forced-colors: active) {
  .info-card {
    background: Canvas;
    color: CanvasText;
    border: 1px solid GrayText;
  }
}

button {
  cursor: pointer;
  transition: background-color 0.2s ease;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
