<template>
  <div :class="{ dark: isDark }">
    <button @click="toggleTheme">{{ isDark ? '🌙' : '☀️' }}</button>
    <router-view />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const isDark = ref(localStorage.getItem('theme') === 'dark')

const toggleTheme = () => {
  isDark.value = !isDark.value
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

watch(isDark, (val) => {
  document.documentElement.classList.toggle('dark', val)
})
</script>

<style>
.dark {
  background: #111;
  color: #eee;
}
</style>
