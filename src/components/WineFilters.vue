<template>
  <div>
    <!-- Кнопка Фильтры -->
    <button @click="toggleFilters">{{ filtersVisible ? 'Закрыть фильтры' : 'Показать фильтры' }}</button>

    <!-- Блок фильтров -->
    <div v-if="filtersVisible" class="filter-bar">
      <div class="filter-group">
        <label>Тип</label>
        <select v-model="selected.class_id">
          <option disabled value="">Выбери</option>
          <option v-for="item in filters.classes" :key="item.id" :value="item.id">
            {{ item.title }}
          </option>
        </select>
      </div>

      <div class="filter-group">
        <label>Цвет</label>
        <select v-model="selected.color_id">
          <option disabled value="">Выбери</option>
          <option v-for="item in filters.colors" :key="item.id" :value="item.id">
            {{ item.title }}
          </option>
        </select>
      </div>

      <div class="filter-group">
        <label>Регион</label>
        <select v-model="selected.region_id">
          <option disabled value="">Выбери</option>
          <option v-for="item in filters.regions" :key="item.id" :value="item.id">
            {{ item.title }}
          </option>
        </select>
      </div>

      <div class="filter-group">
        <label>Сахар</label>
        <select v-model="selected.sugar_id">
          <option disabled value="">Выбери</option>
          <option v-for="item in filters.sugars" :key="item.id" :value="item.id">
            {{ item.title }}
          </option>
        </select>
      </div>

      <div class="filter-group">
        <label>Сорт винограда</label>
        <select v-model="selected.sort_id">
          <option disabled value="">Выбери</option>
          <option v-for="item in filters.sorts" :key="item.id" :value="item.id">
            {{ item.title }}
          </option>
        </select>
      </div>

      <div class="filter-group">
        <label>Год</label>
        <select v-model="selected.year">
          <option disabled value="">Выбери</option>
          <option v-for="item in filters.years" :key="item.year" :value="item.year">
            {{ item.year }}
          </option>
        </select>
      </div>

      <div class="filter-group">
        <label>Крепость</label>
        <select v-model="selected.fortress">
          <option disabled value="">Выбери</option>
          <option v-for="item in filters.fortresses" :key="item.fortress" :value="item.fortress">
            {{ item.fortress }}%
          </option>
        </select>
      </div>

      <!-- Кнопка применить фильтры -->
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <button @click="applyFilters">Показать вина</button>
        <button @click="resetFilters" class="reset-button">Сбросить фильтры</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const filtersVisible = ref(false)
const selected = ref({
  class_id: '',
  color_id: '',
  region_id: '',
  sugar_id: '',
  sort_id: '',
  year: '',
  fortress: ''
})

const filters = ref({
  colors: [],
  regions: [],
  sugars: [],
  sorts: [],
  classes: [],
  years: [],
  fortresses: []
})

const emitFilter = defineEmits(['filter'])

const resetFilters = () => {
  selected.value = {
    class_id: '',
    color_id: '',
    region_id: '',
    sugar_id: '',
    sort_id: '',
    year: '',
    fortress: ''
  }

  emitFilter('filter', {}) // Отправляем пустой фильтр
  filtersVisible.value = false
}

onMounted(async () => {
  try {
    const response = await axios.get('https://russianvine.ru/api/wines/filters')
    const data = response.data

    filters.value.colors = data.colors
    filters.value.regions = data.regions
    filters.value.sugars = data.sugars
    filters.value.sorts = data.sorts
    filters.value.classes = data.classes
    filters.value.years = data.years
    filters.value.fortresses = data.fortresses
  } catch (error) {
    console.error('Ошибка при загрузке фильтров:', error)
  }
})

const toggleFilters = () => {
  filtersVisible.value = !filtersVisible.value
}

const applyFilters = () => {
  // Отправляем только выбранные фильтры (не равные null или пустому значению)
  const filtersToApply = {}

  for (const [key, value] of Object.entries(selected.value)) {
    if (value) {  // Отправляем только те параметры, которые имеют значение
      filtersToApply[key] = value
    }
  }

  // Эмитим фильтры в родительский компонент
  emitFilter('filter', filtersToApply)

  filtersVisible.value = false
}
</script>

<style scoped>
.filter-bar {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
  border-top: 1px solid #eee;
  padding-top: 1rem;
  margin-bottom: 1rem;
}

.filter-group {
  display: flex;
  flex-direction: column;
}

select {
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  min-width: 150px;
}

button {
  padding: 0.5rem 1rem;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  margin-bottom: 1rem;
}

button:hover {
  background-color: #444;
}
</style>
