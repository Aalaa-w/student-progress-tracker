<template>
  <div class="max-h-[500px] min-w-full mx-auto place-items-center">
    <Pie :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { computed } from 'vue'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

const props = defineProps<{
  students: { subject: string }[]
}>()

const chartData = computed(() => {
  const counts: Record<string, number> = {}

  props.students.forEach((student) => {
    const subject = student.subject
    counts[subject] = (counts[subject] || 0) + 1
  })

  const labels = Object.keys(counts)
  const data = Object.values(counts)

  const colors = ['#1e40af', '#2563eb', '#93c5fd', '#ef4444', '#8b5cf6']

  return {
    labels,
    datasets: [
      {
        label: 'Students',
        data,
        backgroundColor: labels.map((_, i) => colors[i % colors.length]),
        borderWidth: 1,
      },
    ],
  }
})

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: '#374151',
      },
    },
  },
} as const
</script>
