<template>
  <Line :data="chartData" :options="chartOptions" />
</template>

<script setup lang="ts">
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)

const props = defineProps<{ activities: { date: string; progress: number }[] }>()

const chartData = {
  labels: props.activities.map((a) => a.date),
  datasets: [
    {
      label: 'Progress Over Time',
      data: props.activities.map((a) => a.progress),
      borderColor: '#93c5fd',
      backgroundColor: '#93c5fd',
      fill: false,
      tension: 0.3,
    },
  ],
}

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Activity Timeline',
    },
  },
} as const
</script>
