<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>

<script setup lang="ts">
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps<{
  subjects: { name: string; score: number }[]
}>()

const chartData = {
  labels: props.subjects.map((s) => s.name),
  datasets: [
    {
      label: 'Progress (%)',
      data: props.subjects.map((s) => s.score),
      backgroundColor: '#93c5fd',
      borderRadius: 5,
    },
  ],
}

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
  },
  scales: {
    y: {
      min: 0,
      max: 100,
      ticks: { stepSize: 20 },
    },
  },
}
</script>
