<template>
  <div @click="goToDetails" class="wine-card">
    <img :src="'https://russianvine.ru/storage/' + wine.image" alt="wine" />
    <h3>{{ wine.title }}</h3>
    <p>{{ wine.region.title }}</p>
    <p>{{ wine.winery?.title || '' }}</p>
    <p><strong>{{ wine.color.title }}</strong> | {{ wine.sugar.title }} | {{ wine.year }}</p>
    <p><strong>{{ wine.price }} ₽</strong></p>
    <button @click.stop="$emit('add', wine)">Добавить в корзину</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({ wine: Object })
const emit = defineEmits(['add'])
const router = useRouter()

const goToDetails = () => {
  router.push({ name: 'wine-details', params: { id: props.wine.id } })
}
</script>

<style scoped>

.wine-card {
  border: 1px solid #ddd;
  padding: 1rem;
  text-align: center;
  margin-bottom: 2rem; /* Добавляем отступ снизу, чтобы карточки не накладывались */
}

img {
  width: 80px; /* Устанавливаем фиксированную ширину */
  height: 300px; /* Устанавливаем фиксированную высоту */
  object-fit: cover; /* Обрезаем картинку, если она не помещается */
  margin-bottom: 1rem; /* Добавляем отступ снизу от картинки */
}

button {
  margin-top: 0.5rem;
  padding: 0.5rem;
  background: black;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
