<template>
  <div class="page">
    <button @click="$router.back()" class="back-button">← Назад</button>
    <h1>Контакты</h1>
  </div>
</template>
<script setup lang="ts">
</script>

<style scoped>
.back-button {
  display: block;
  width: 100%;
  text-align: left;
  padding: 1rem 1.5rem;
  background-color: #f5f5f5;
  border: none;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: #333;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: background-color 0.2s ease;
}
</style>