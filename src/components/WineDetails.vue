<template>
  <div class="wine-details">
    <button @click="$router.back()" class="back-button">← Назад к каталогу</button>

    <div v-if="wine">
      <div class="wine-image">
        <img :src="withHost(wine.image)" :alt="wine.title" />
      </div>
      <div class="details">
        <h2>{{ wine.title }}</h2>
        <p><strong>Цвет:</strong> {{ wine.color?.title || '—' }}</p>
        <p><strong>Тип:</strong> {{ wine.class?.title || '—' }}</p>
        <p><strong>Регион:</strong> {{ wine.region?.title || '—' }}</p>
        <p><strong>Сахар:</strong> {{ wine.sugar?.title || '—' }}</p>
        <p><strong>Сорт:</strong> {{ wine.sort?.title || '—' }}</p>
        <p><strong>Крепость:</strong> {{ wine.fortress || '—' }}%</p>
        <p><strong>Год:</strong> {{ wine.year || '—' }}</p>
        <p><strong>Производитель:</strong> {{ wine.winery?.title || '—' }}</p>
        <p><strong>Цена:</strong> {{ wine.price || '0' }} ₽</p>
      </div>

      <hr>
      <div class="additional-details">
        <p><strong>Особенности производства:</strong> {{ stripHtml(wine?.production_feature) || '—' }}</p>
        <br>
        <p><strong>Дегустационные характеристики:</strong> {{ stripHtml(wine?.combination) || '—' }}</p>
        <br>
        <p><strong>Подача:</strong> {{ stripHtml(wine?.innings) || '—' }}</p>
      </div>


      <div class="add-button-wrapper">
        <button @click="addToCart(wine)" class="add-button">Добавить в корзину</button>
      </div>
    </div>

    <p v-else>Загрузка...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { useToast } from 'vue-toastification'

const wine = ref(null)
const route = useRoute()
const id = route.params.id
const toast = useToast()

const withHost = (path) => `https://russianvine.ru/storage/${path}`

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

const stripHtml = (html) => {
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = html
  return tempDiv.textContent || tempDiv.innerText || ''
}

onMounted(async () => {
  const res = await axios.get(`https://russianvine.ru/api/wines/${id}`)
  wine.value = res.data
})
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
.wine-image {
  max-width: 100%;
  border-radius: 12px;
  margin-bottom: 1rem;
}
.add-button {
  background-color: #222;
  color: white;
  padding: 0.7rem 1.2rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}
.add-button:hover {
  background-color: #444;
}

.wine-image {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.wine-image img {
  width: 100px; /* Задаем фиксированную ширину */
  max-width: 90%; /* Чтобы не выходило за пределы экрана */
  height: auto;
}

.wine-details {
  padding-bottom: 5rem;
}

.add-button-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
}

.details {
  padding: 1rem;
}

.additional-details {
  padding: 1rem;
}

strong{
  font-weight: bold;
}
</style>
