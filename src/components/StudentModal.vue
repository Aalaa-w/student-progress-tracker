<template>
  <dialog
    ref="dialogRef"
    class="rounded-md p-6 w-full max-w-4xl bg-white dark:bg-black shadow-lg"
    @click.self="close"
    aria-modal="true"
    role="dialog"
    aria-labelledby="dialog-title"
  >
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold text-gray-800 dark:text-white" id="dialog-title">
        Student Details
      </h2>
      <button
        class="hover:bg-red-500 text-red-500 hover:text-white rounded-md py-2 px-2"
        @click="close"
        aria-label="Close dialog"
      >
        Close
      </button>
    </div>
    <div class="grid grid-cols-12 gap-4 mb-4 items-center mb-5">
      <section
        aria-labelledby="student-info"
        class="grid grid-cols-12 gap-4 mb-4 items-center mb-5 col-span-12 md:col-span-6"
        v-if="student"
      >
        <div class="col-span-12 md:col-span-6">
          <label class="mb-2 font-medium text-gray-900 dark:text-white mb-2">Name</label>
          <div class="details font-small text-gray-400 mt-2">
            {{ student.name }}
          </div>
        </div>
        <div class="col-span-12 md:col-span-6">
          <label class="mb-2 font-medium text-gray-900 dark:text-white mb-2">Grade</label>
          <div class="details font-small text-gray-400 mt-2">
            {{ student.grade }}
          </div>
        </div>
        <div class="col-span-12 md:col-span-6">
          <label class="mb-2 font-medium text-gray-900 dark:text-white mb-2">Subject</label>
          <div class="details font-small text-gray-400 mt-2">
            {{ student.subject }}
          </div>
        </div>
        <div class="col-span-12 md:col-span-6">
          <label class="mb-2 font-medium text-gray-900 dark:text-white mb-2">Progress</label>
          <div class="details font-small text-gray-400 mt-2 flex gap-2">
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
          </div>
        </div>
        <div class="col-span-12 md:col-span-6">
          <label class="mb-2 font-medium text-gray-900 dark:text-white mb-2">Last Activity</label>
          <div class="details font-small text-gray-400 mt-2">
            {{ student.lastActivity }}
          </div>
        </div>
        <div class="col-span-12 md:col-span-6">
          <label class="mb-2 font-medium text-gray-900 dark:text-white mb-2">Status</label>
          <div class="details font-small text-gray-400 mt-2">
            {{ student.status }}
          </div>
        </div>
      </section>
      <div class="col-span-12 md:col-span-6">
        <section aria-labelledby="assignments">
          <h3 class="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Assignments</h3>
          <ul class="space-y-2" role="list" aria-labelledby="assignments-title">
            <li
              v-for="(assignment, index) in student?.assignments || []"
              :key="index"
              class="flex justify-between items-center p-3 rounded bg-gray-100 dark:bg-black"
              role="listitem"
            >
              <div>
                <p class="font-medium text-gray-900 dark:text-white">{{ assignment.title }}</p>
                <p class="text-sm text-gray-500">Due: {{ assignment.dueDate }}</p>
              </div>
              <span
                :class="[
                  'text-sm font-semibold px-2 py-1 rounded',
                  assignment.status === 'completed'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800',
                ]"
              >
                {{ assignment.status === 'completed' ? 'Completed' : 'Pending' }}
              </span>
            </li>
          </ul>
        </section>
      </div>
    </div>
    <div v-if="student" class="grid grid-cols-12 gap-4 mb-4 items-center mb-5">
      <div class="col-span-12 md:col-span-6">
        <StudentChart
          v-if="student && student.subjects"
          :key="student.id"
          :subjects="student.subjects"
          class="mt-6"
        />
      </div>
      <div class="col-span-12 md:col-span-6">
        <ActivityChart
          v-if="student && student.activityData"
          :key="student.id"
          :activities="student.activityData"
          class="mt-6"
        />
      </div>
    </div>

    <!-- Assignments Section -->
  </dialog>
</template>

<script setup lang="ts">
import { ref, defineExpose, watch, defineAsyncComponent } from 'vue'
const StudentChart = defineAsyncComponent(() => import('@/components/StudentChart.vue'))
const ActivityChart = defineAsyncComponent(() => import('@/components/ActivityChart.vue'))

const dialogRef = ref<HTMLDialogElement | null>(null)
const props = defineProps<{
  student: any | null
}>()

function open() {
  dialogRef.value?.showModal()
}
function close() {
  dialogRef.value?.close()
}
defineExpose({ open, close })
</script>
<style>
.details {
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: all 0.2s;
  width: 100%;
  height: 40px;
}
</style>
