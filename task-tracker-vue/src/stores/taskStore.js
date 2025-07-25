import { defineStore } from 'pinia'

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: [],
    nextId: 1,
  }),
  actions: {
    addTask(title) {
      if (title.trim()) {
        this.tasks.push({ id: this.nextId++, title, done: false })
      }
    },
    toggleTask(id) {
      const task = this.tasks.find(t => t.id === id)
      if (task) task.done = !task.done
    },
    removeTask(id) {
      this.tasks = this.tasks.filter(t => t.id !== id)
    }
  }
})
