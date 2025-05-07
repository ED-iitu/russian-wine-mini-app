<template>
  <div class="cart">
    <h1 class="cart-title">Ваш заказ</h1>

    <div v-if="cartItems.length > 0" class="cart-list">
      <div v-for="item in cartItems" :key="item.id" class="cart-item">
        <img
            v-if="item.image"
            :src="withHost(item.image)"
            alt="wine image"
            class="cart-item-image"
        />

        <div class="cart-item-info">
          <h3 class="cart-item-title">{{ item.title }}</h3>
          <p class="cart-item-detail">Производитель: {{ item.winery?.title || '—' }}</p>
          <p class="cart-item-detail">Цена: {{ item.price }} ₽</p>

          <div class="quantity-control">
            <button @click="decreaseQuantity(item.id)">−</button>
            <span>{{ item.quantity }}</span>
            <button @click="increaseQuantity(item.id)">+</button>
          </div>
        </div>

        <button @click="removeFromCart(item.id)" class="remove-button">✕</button>
      </div>

      <div class="cart-summary">
        <p class="total">Итого: {{ totalPrice }} ₽</p>

        <form @submit.prevent="submitOrder" class="user-form">
          <input v-model="name" type="text" placeholder="Имя" required />
          <input v-model="email" type="email" placeholder="Email" required />
          <input
              v-model="phone"
              type="tel"
              placeholder="7 (___) ___-__-__"
              required
          />
          <button type="submit" class="checkout-button">Оформить заказ</button>
        </form>
      </div>
    </div>

    <div v-else class="empty-cart">
      <p>Корзина пуста</p>
    </div>

    <!-- Сообщение об успешном заказе -->
    <div v-if="orderSuccess" class="order-success">
      <p>Благодарим за интерес к товарам Русское Вино. Ваш заказ получен и поступит в обработку в ближайшее время.</p>
      <button @click="continueShopping" class="continue-button">Продолжить покупки</button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useCartStore } from '@/stores/cart.js'
import axios from 'axios'
import { useRouter } from 'vue-router'

const cart = useCartStore()
const router = useRouter()

onMounted(() => {
  cart.loadCart()
})

const cartItems = computed(() => cart.items)
const totalPrice = computed(() =>
    cart.items.reduce(
        (sum, item) => sum + Number(item.price || 0) * (item.quantity || 1),
        0
    )
)

const removeFromCart = (id) => {
  cart.remove(id)
}

const increaseQuantity = (id) => {
  const item = cart.items.find(i => i.id === id)
  if (item) {
    item.quantity += 1
    cart.saveCart()
  }
}

const decreaseQuantity = (id) => {
  const item = cart.items.find(i => i.id === id)
  if (item && item.quantity > 1) {
    item.quantity -= 1
    cart.saveCart()
  } else if (item) {
    cart.remove(id)
  }
}

const withHost = (path) => `https://russianvine.ru/storage/${path}`

const name = ref('')
const email = ref('')
const phone = ref('')
const orderSuccess = ref(false)

const submitOrder = async () => {
  const orderData = {
    name: name.value,
    email: email.value,
    phone: phone.value,
    items: cart.items,
    total: totalPrice.value
  }

  try {
    const response = await axios.post('https://russianvine.ru/api/order', orderData)

    if (response.status === 201) {
      orderSuccess.value = true
      cart.clear()
    }
  } catch (error) {
    console.error('Ошибка при отправке заказа', error)
    alert('Произошла ошибка при оформлении заказа. Пожалуйста, попробуйте позже.')
  }
}

const continueShopping = () => {
  router.push('/') // Перенаправление на главную страницу для продолжения покупок
}
</script>

<style scoped>
.cart {
  padding: 2rem 1rem;
  max-width: 600px;
  margin: 0 auto;
}

.cart-title {
  font-size: 1.8rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
}

.cart-list {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.cart-item {
  display: flex;
  align-items: center;
  background-color: #fafafa;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.cart-item-image {
  width: 70px;
  height: auto;
  border-radius: 8px;
  margin-right: 1rem;
}

.cart-item-info {
  flex: 1;
}

.cart-item-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.3rem;
}

.cart-item-detail {
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 0.2rem;
}

.remove-button {
  background: none;
  border: none;
  font-size: 1.3rem;
  color: #c00;
  cursor: pointer;
}

.cart-summary {
  margin-top: 2rem;
  text-align: center;
}

.total {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.user-form {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-top: 1rem;
}

.user-form input {
  padding: 0.6rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.checkout-button {
  background-color: #222;
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
  margin-bottom: 3rem;
}

.checkout-button:hover {
  background-color: #444;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.quantity-control button {
  padding: 0.3rem 0.6rem;
  font-size: 1rem;
  background: #eee;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
}

.quantity-control span {
  font-size: 1rem;
  min-width: 20px;
  text-align: center;
}

.empty-cart {
  text-align: center;
  font-size: 1rem;
  color: #777;
  padding: 2rem 0;
}

.order-success {
  text-align: center;
  font-size: 1rem;
  color: #2a9d8f;
  padding: 2rem 0;
}

.continue-button {
  background-color: #222;
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 3rem;
}

.continue-button:hover {
  background-color: #444;
}
</style>
