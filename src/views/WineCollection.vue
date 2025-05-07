<template>
  <div class="wine-intro">
    <h2>Вино</h2>
    <p>Мы собрали для Вас самую полную коллекцию Русских Вин</p>
  </div>

  <div class="catalog-container">
    <WineFilters :filters="filters" @filter="applyFilter" />

    <div class="wine-grid">
      <WineCard
          v-for="wine in wines"
          :key="wine.id"
          :wine="wine"
          @add="addToCart"
      />
    </div>

    <button v-if="nextPageUrl" @click="loadMore" class="load-more">Показать ещё</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
const router = useRouter()
import { useRoute } from 'vue-router'
const route = useRoute()
import WineFilters from './../components/WineFilters.vue'
import WineCard from './../components/WineCard.vue'
import { useToast } from 'vue-toastification'

const wines = ref([])
const filters = ref({})
const page = ref(1)
const nextPageUrl = ref(null)
const toast = useToast()

const loadWines = async (reset = false) => {
  try {
    const { data } = await axios.get('https://russianvine.ru/api/wines', {
      params: {
        ...filters.value,
        page: page.value,
      },
    })

    if (reset) {
      wines.value = data.data
    } else {
      wines.value.push(...data.data)
    }

    nextPageUrl.value = data.next_page_url
  } catch (error) {
    console.error('Ошибка при загрузке вин:', error)
  }
}

const applyFilter = (newFilters) => {
  filters.value = newFilters
  page.value = 1
  router.replace({ query: newFilters }) // сохраняем в URL
  loadWines(true)
}

const loadMore = () => {
  page.value += 1
  loadWines()
}

const addToCart = (wine) => {
  const cart = JSON.parse(localStorage.getItem('cart')) || []
  const index = cart.findIndex(item => item.id === wine.id)

  if (index !== -1) {
    cart[index].quantity += 1
  } else {
    cart.push({ ...wine, quantity: 1 })
  }

  localStorage.setItem('cart', JSON.stringify(cart))
  toast.success('Вино добавлено в корзину!', {
    timeout: 2000
  })
}


onMounted(() => {
  filters.value = { ...route.query } // читаем из URL
  loadWines(true)
})
</script>

<style scoped>
/* Основной контейнер с описанием */
.wine-intro {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto; /* Центрирование */
  padding: 2rem 1rem;
  background-color: #f9f9f9;
  text-align: center;
  box-sizing: border-box;
}

/* Заголовок */
.wine-intro h2 {
  font-size: 2rem;
  font-weight: bold;
  color: #6a1b9a;
  margin-bottom: 1rem;
}

/* Описание */
.wine-intro p {
  font-size: 1.2rem;
  color: #555;
  margin: 0 auto;
  max-width: 100%;
}

/* Контейнер для каталога с фильтрами и товарами */
.catalog-container {
  display: flex;
  flex-direction: column;
  align-items: center; /* Центрируем содержимое */
  padding-top: 2rem;
  width: 100%;
  box-sizing: border-box;
  padding-bottom: 3rem;
}

/* Сетка карточек вин */
.wine-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Автоматическая настройка сетки */
  gap: 1rem;
  width: 100%;
  max-width: 1200px; /* Ограничение ширины для больших экранов */
  box-sizing: border-box;
}

/* Кнопка для загрузки дополнительных вин */
.load-more {
  margin: 1rem auto;
  display: block;
  padding: 0.7rem 1.5rem;
  background-color: #222;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.load-more:hover {
  background-color: #444;
}
</style>
