<template>
  <div>
    <form @submit.prevent="add">
      <input v-model="title" placeholder="New task..." />
      <button>Add</button>
    </form>

    <ul>
      <li v-for="task in tasks" :key="task.id">
        <input type="checkbox" v-model="task.done" @change="toggle(task.id)" />
        <span :style="{ textDecoration: task.done ? 'line-through' : 'none' }">{{ task.title }}</span>
        <button @click="remove(task.id)">🗑️</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTaskStore } from '../stores/taskStore'

const store = useTaskStore()
const title = ref('')

const add = () => {
  store.addTask(title.value)
  title.value = ''
}
const toggle = store.toggleTask
const remove = store.removeTask
const tasks = store.tasks
</script>
