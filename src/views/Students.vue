<template>
  <div class="mt-6">
    <!-- Export Button -->
    <div class="grid grid-cols-12 gap-4 mb-4 items-center mb-5">
      <div class="col-span-12 md:col-span-6">
        <h2 class="text-2xl font-semibold dark:text-white">Students Data</h2>
      </div>
      <div class="col-span-9 md:col-span-4">
        <input
          v-model="filters.name"
          placeholder="Search by name...."
          class="filter-input"
          aria-label="Search"
        />
      </div>
      <div class="col-span-3 md:col-span-2">
        <div class="text-center w-full">
          <button
            @click="toggleDropdown"
            @blur="handleBlur"
            id="user-menu-button"
            role="menu"
            aria-labelledby="user-menu-button"
            class="flex items-center justify-center gap-2 rounded-md text-blue-600 hover:text-white border-2 border-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 h-[40px] w-full transition text-center font-semibold"
          >
            <svg
              class="w-5 h-5"
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
                d="M19 10V4a1 1 0 0 0-1-1H9.914a1 1 0 0 0-.707.293L5.293 7.207A1 1 0 0 0 5 7.914V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2M10 3v4a1 1 0 0 1-1 1H5m5 6h9m0 0-2-2m2 2-2 2"
              />
            </svg>
            Export
          </button>
          <div
            v-if="dropdownOpen"
            class="absolute right-5 mt-2 w-48 bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50"
          >
            <button
              @click="exportToCSV"
              class="px-4 py-2 text-gray dark:text-white text-left w-full"
              role="menuitem"
            >
              Export CSV
            </button>
            <button
              @click="exportToPDF"
              class="text-gray dark:text-white px-4 py-2 text-left w-full"
              role="menuitem"
            >
              Export PDF
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="grid grid-cols-12 gap-4 mb-4 border p-3 border-gray-200 rounded-md mt-5">
      <div class="col-span-12 md:col-span-6">
        <label class="mb-2 font-medium text-gray-900 dark:text-white" for="grades">Grades</label>
        <select
          v-model="filters.grade"
          class="filter-input mt-2"
          aria-label="Filter from grade"
          id="grades"
        >
          <option value="">All Grades</option>
          <option>Grade 6</option>
          <option>Grade 7</option>
        </select>
      </div>
      <div class="col-span-12 md:col-span-6">
        <label class="mb-2 font-medium text-gray-900 dark:text-white" for="subjects"
          >Subjects</label
        >
        <select
          id="subjects"
          v-model="filters.subject"
          class="filter-input mt-2"
          aria-label="Filter from subject"
        >
          <option value="">All Subjects</option>
          <option>Math</option>
          <option>Science</option>
          <option>English</option>
        </select>
      </div>
      <div class="col-span-12 md:col-span-6">
        <label class="mb-2 font-medium text-gray-900 dark:text-white" for="from">From</label>
        <input
          id="from"
          type="date"
          v-model="filters.dateFrom"
          class="filter-input mt-2"
          aria-label="Filter from date"
        />
      </div>
      <div class="col-span-12 md:col-span-6">
        <label class="mb-2 font-medium text-gray-900 dark:text-white" for="to">To</label>

        <input
          id="to"
          type="date"
          v-model="filters.dateTo"
          class="filter-input mt-2"
          aria-label="Filter to date"
        />
      </div>
    </div>

    <!-- Table -->
    <div
      v-if="selectedStudents.length > 0"
      class="flex flex-wrap gap-4 items-center mb-4 bg-gray-100 dark:bg-black p-3 rounded"
    >
      <span class="font-medium text-gray-900 dark:text-white">
        {{ selectedStudents.length }} selected
      </span>
      <button @click="exportSelectedToCSV" class="bg-green-600 text-white px-3 py-1 rounded">
        Export to CSV
      </button>
    </div>

    <div class="auto-scroll-table">
      <table
        class="min-w-full bg-white dark:bg-black text-sm rounded-lg overflow-hidden"
        role="table"
        aria-label="Student progress table"
      >
        <thead
          class="dark:bg-gray-700 dark:text-gray-300 uppercase bg-blue-100 text-gray-800 text-left"
        >
          <tr role="row">
            <th role="columnheader" scope="col" class="p-3">
              <input type="checkbox" v-model="toggleAll" aria-label="Select all students" />
            </th>
            <th role="columnheader" scope="col" class="p-3 cursor-pointer" @click="sortBy('name')">
              Name
            </th>
            <th role="columnheader" scope="col" class="p-3 cursor-pointer" @click="sortBy('grade')">
              Grade
            </th>
            <th
              role="columnheader"
              scope="col"
              class="p-3 cursor-pointer"
              @click="sortBy('progress')"
            >
              Progress
            </th>
            <th
              role="columnheader"
              scope="col"
              class="p-3 cursor-pointer"
              @click="sortBy('lastActivity')"
            >
              Last Activity
            </th>
            <th role="columnheader" scope="col" class="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="student in paginatedStudents"
            :key="student.id"
            tabindex="0"
            class="border-b hover:bg-blue-50 dark:hover:bg-gray-700 transition cursor-pointer dark:text-white"
            @keydown.enter="openModal(student)"
            @click="openModal(student)"
            role="row"
          >
            <td class="p-3">
              <input
                type="checkbox"
                :value="student.id"
                :checked="selectedStudents.includes(student.id)"
                @click.stop="toggleSelection(student.id)"
              />
            </td>
            <td class="p-3">{{ student.name }}</td>
            <td class="p-3">{{ student.grade }}</td>
            <td class="p-3 flex items-center gap-1">
              {{ student.progress }}%
              <span v-if="student.trend === 'down'">
                <svg
                  class="w-6 h-6 text-red-600 dark:text-white"
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
                    d="M4 4.5V19a1 1 0 0 0 1 1h15M7 10l4 4 4-4 5 5m0 0h-3.207M20 15v-3.207"
                  />
                </svg>
              </span>
              <span v-if="student.trend === 'up'">
                <svg
                  class="w-6 h-6 text-green-600 dark:text-white"
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
                    d="M4 4.5V19a1 1 0 0 0 1 1h15M7 14l4-4 4 4 5-5m0 0h-3.207M20 9v3.207"
                  />
                </svg>
              </span>
            </td>
            <td class="p-3">{{ student.lastActivity }}</td>
            <td class="p-3">
              <span
                :class="[
                  'border  px-2 rounded-md py-1',
                  student.status === 'Active'
                    ? 'text-green-600  border-green-600'
                    : 'text-gray-400  border-gray-400',
                ]"
              >
                {{ student.status }}
              </span>
            </td>
          </tr>
          <tr v-if="!isLoading && !error && filteredAndSortedStudents.length === 0">
            <td colspan="5" class="text-center py-4 text-gray-500">
              No students match your filters.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <StudentModal ref="modalRef" :student="selectedStudent" />
  <div class="mt-6 flex justify-center items-center gap-2 mb-5">
    <button
      :disabled="page <= 1"
      @click="page--"
      class="px-4 py-1 rounded bg-blue-200 hover:bg-gray-300 disabled:opacity-50"
    >
      ← Prev
    </button>
    <span class="px-3 text-gray-500 dark:text-white">{{ page }} / {{ totalPages }}</span>
    <button
      :disabled="page >= totalPages"
      @click="page++"
      class="px-4 py-1 rounded bg-blue-200 hover:bg-gray-300 disabled:opacity-50"
    >
      Next →
    </button>
  </div>
</template>
<script setup lang="ts">
import { computed, defineAsyncComponent, onMounted, ref } from 'vue'

const StudentModal = defineAsyncComponent(() => import('@/components/StudentModal.vue'))

import { useStudentStore } from '@/stores/studentStore'
import { storeToRefs } from 'pinia'
import { useTeacherStore } from '@/stores/teacherStore'
import jsPDF from 'jspdf'

const filters = ref({
  name: '',
  grade: '',
  subject: '',
  dateFrom: '',
  dateTo: '',
})

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
const { students, isLoading, error } = storeToRefs(studentStore)
const { fetchStudents } = studentStore
const teacherStore = useTeacherStore()

onMounted(async () => {
  ;(fetchStudents({ pageIndex: page.value, pageSize }), teacherStore.fetchTeachers())
})
const theme = ref()

onMounted(() => {
  theme.value = localStorage.getItem('theme')
  if (theme.value === 'dark') {
    document.documentElement.classList.add('dark')
  }
})

const filteredAndSortedStudents = computed(() => {
  let result = [...students.value]

  // Filter
  if (filters.value.name)
    result = result.filter((s) => s.name.toLowerCase().includes(filters.value.name.toLowerCase()))
  if (filters.value.grade) result = result.filter((s) => s.grade === filters.value.grade)
  if (filters.value.subject) result = result.filter((s) => s.subject === filters.value.subject)
  if (filters.value.dateFrom) {
    result = result.filter((s) => new Date(s.lastActivity) >= new Date(filters.value.dateFrom))
  }
  if (filters.value.dateTo) {
    result = result.filter((s) => new Date(s.lastActivity) <= new Date(filters.value.dateTo))
  }

  // Sort
  if (sortKey.value) {
    result.sort((a, b) => {
      const aValue = a[sortKey.value as keyof typeof a]
      const bValue = b[sortKey.value as keyof typeof b]

      if (typeof aValue === 'string') {
        return sortAsc.value
          ? (aValue as string).localeCompare(bValue as string)
          : (bValue as string).localeCompare(aValue as string)
      } else {
        return sortAsc.value ? +aValue - +bValue : +bValue - +aValue
      }
    })
  }

  return result
})
const selectedStudent = ref<any>(null)
const modalRef = ref()

function openModal(student: any) {
  selectedStudent.value = student
  modalRef.value?.open()
}
function exportToCSV() {
  const headers = [
    'Name',
    'Grade',
    'Progress (%)',
    'Last Activity',
    'Status',
    'Assignments Count',
    'Activities Count',
  ]

  const rows = filteredAndSortedStudents.value.map((student) => [
    student.name,
    student.grade,
    student.progress,
    student.lastActivity,
    student.status,
    student.assignments?.length || 0,
    student.activityData?.length || 0,
  ])

  const csvContent =
    'data:text/csv;charset=utf-8,' + [headers, ...rows].map((row) => row.join(';')).join('\n')

  const encodedUri = encodeURI(csvContent)
  const link = document.createElement('a')
  link.setAttribute('href', encodedUri)
  link.setAttribute('download', 'students.csv')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

function exportToPDF() {
  const doc = new jsPDF()
  const startY = 20

  doc.setFontSize(16)
  doc.text('Student Progress Report', 20, 15)

  let y = startY
  filteredAndSortedStudents.value.forEach((student, index) => {
    const {
      name,
      grade,
      subject,
      progress,
      lastActivity,
      status,
      trend,
      assignments,
      activityData,
    } = student

    doc.setFontSize(12)
    doc.text(`• ${index + 1}. ${name}`, 20, y)
    y += 6
    doc.text(`Grade: ${grade}`, 30, y)
    y += 6
    doc.text(`Subject: ${subject}`, 30, y)
    y += 6
    doc.text(`Progress: ${progress}% (${trend === 'up' ? '⬆' : '⬇'})`, 30, y)
    y += 6
    doc.text(`Status: ${status}`, 30, y)
    y += 6
    doc.text(`Last Activity: ${lastActivity}`, 30, y)
    y += 6
    doc.text(`Assignments: ${assignments?.length || 0}`, 30, y)
    y += 6
    doc.text(`Activity Logs: ${activityData?.length || 0}`, 30, y)
    y += 10

    // Check page break
    if (y > 270) {
      doc.addPage()
      y = 20
    }
  })

  doc.save('students.pdf')
}
const selectedStudents = ref<string[]>([])

const toggleAll = computed({
  get: () =>
    selectedStudents.value.length === paginatedStudents.value.length &&
    paginatedStudents.value.length > 0,
  set: (value: boolean) => {
    selectedStudents.value = value ? paginatedStudents.value.map((s) => s.id) : []
  },
})

function toggleSelection(id: string) {
  const index = selectedStudents.value.indexOf(id)
  if (index === -1) selectedStudents.value.push(id)
  else selectedStudents.value.splice(index, 1)
}

function exportSelectedToCSV() {
  const selected = studentStore.students.filter((s) => selectedStudents.value.includes(s.id))

  const csvRows = [
    ['Name', 'Grade', 'Progress', 'Last Activity', 'Status'],
    ...selected.map((s) => [s.name, s.grade, s.progress + '%', s.lastActivity, s.status]),
  ]

  const csvContent = csvRows.map((row) => row.join(',')).join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', 'selected_students.csv')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
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
// pagination
const page = ref(1)
const pageSize = 10

const paginatedStudents = computed(() => {
  const start = (page.value - 1) * pageSize
  const end = start + pageSize
  return filteredAndSortedStudents.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredAndSortedStudents.value.length / pageSize)
})
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
.filter-input {
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: all 0.2s;
  width: 100%;
  height: 40px;
}

.filter-input:focus {
  outline: none;
  border-color: #60a5fa;
  box-shadow: 0 0 0 2px rgba(96, 165, 250, 0.5);
}
button {
  cursor: pointer;
  transition: background-color 0.2s ease;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.auto-scroll-table {
  width: 100%;
  overflow: auto;
}
</style>
