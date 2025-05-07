<template>
  <div class="additional-container">
    <h2>Дополнительные страницы</h2>

    <div class="links-grid">
      <router-link to="/contacts" class="link-card">
        📞 Контакты
      </router-link>
      <router-link to="/named" class="link-card">
        🍇 Именное вино
      </router-link>
      <router-link to="/subscription" class="link-card">
        📦 Подписка
      </router-link>
      <!-- Добавь свои страницы по мере необходимости -->
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.additional-container {
  padding: 2rem 1rem 4rem;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.additional-container h2 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #6a1b9a;
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.link-card {
  background: #f9f9f9;
  border-radius: 12px;
  padding: 1.2rem;
  font-size: 1rem;
  font-weight: 500;
  color: #333;
  text-decoration: none;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: background 0.3s;
}

.link-card:hover {
  background: #eee;
}
</style>
