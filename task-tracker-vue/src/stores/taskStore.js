import { defineStore } from 'pinia'

const TASKS_KEY = 'task-tracker-tasks'

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: JSON.parse(localStorage.getItem(TASKS_KEY)) || [],
    nextId: JSON.parse(localStorage.getItem(TASKS_KEY))?.length
  ? Math.max(...JSON.parse(localStorage.getItem(TASKS_KEY)).map(t => t.id)) + 1
  : 1,
  }),
  actions: {
    addTask(title) {
      if (title.trim()) {
        this.tasks.push({ id: this.nextId++, title, done: false })
        this.saveTasks()
      }
    },
toggleTask(id) {
  const index = this.tasks.findIndex(t => t.id === id)
  if (index !== -1) {
    this.tasks[index].done = !this.tasks[index].done
    this.saveTasks()
  }
},
    removeTask(id) {
      this.tasks = this.tasks.filter(t => t.id !== id)
      this.saveTasks()
    },
    saveTasks() {
      localStorage.setItem(TASKS_KEY, JSON.stringify(this.tasks))
    }
  }
})

