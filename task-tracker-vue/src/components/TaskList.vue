<template>
  <div>
    <!-- Форма додавання -->
    <form @submit.prevent="add">
      <input v-model="title" placeholder="Нова задача..." />
      <button>Додати</button>
    </form>

    <!-- Кнопки фільтра -->
    <div class="filters">
      <button @click="filter = 'all'">Усі</button>
      <button @click="filter = 'active'">Активні</button>
      <button @click="filter = 'done'">Виконані</button>
    </div>

    <!-- Список задач -->
    <draggable
      v-if="filter === 'all'"
      v-model="store.tasks"
      tag="ul"
      item-key="id"
      @end="store.saveTasks()"
    >
      <template #item="{ element }">
        <li>
          <input type="checkbox" :checked="element.done" @change="toggle(element.id)"/>
          <span :style="{ textDecoration: element.done ? 'line-through' : 'none' }">
            {{ element.title }}
          </span>
          <button @click="remove(element.id)">🗑️</button>
        </li>
      </template>
    </draggable>

    <!-- Інші фільтри -->
    <ul v-else>
      <li v-for="task in filteredTasks" :key="task.id">
        <input type="checkbox" :checked="task.done" @change="toggle(task.id)"/>
        <span :style="{ textDecoration: task.done ? 'line-through' : 'none' }">
          {{ task.title }}
        </span>
        <button @click="remove(task.id)">🗑️</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTaskStore } from '../stores/taskStore'
import draggable from 'vuedraggable'

const store = useTaskStore()
const title = ref('')
const filter = ref('all')

const add = () => {
  store.addTask(title.value)
  title.value = ''
}

const toggle = store.toggleTask
const remove = store.removeTask

const filteredTasks = computed(() => {
  if (filter.value === 'active') return store.tasks.filter(t => !t.done)
  if (filter.value === 'done') return store.tasks.filter(t => t.done)
  return store.tasks
})
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 8px;
  margin: 4px 0;
  background: #f0f0f0;
  border-radius: 4px;
  cursor: grab;
}

.filters {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}

button {
  cursor: pointer;
}
</style>
