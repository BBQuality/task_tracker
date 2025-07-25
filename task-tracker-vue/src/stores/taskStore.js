import { defineStore } from 'pinia'

const TASKS_KEY = 'task-tracker-tasks'

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: JSON.parse(localStorage.getItem(TASKS_KEY)) || [],
    nextId: 1,
  }),
  actions: {
    addTask(title) {
      if (title.trim()) {
        this.tasks.push({ id: this.nextId++, title, done: false })
        this.saveTasks()
      }
    },
    toggleTask(id) {
      const task = this.tasks.find(t => t.id === id)
      if (task) {
        task.done = !task.done
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

