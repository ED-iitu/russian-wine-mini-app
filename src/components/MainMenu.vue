<template>
  <nav class="bottom-nav">
    <router-link to="/collection" class="nav-item" :class="{ active: $route.path === '/collection' }">
      🍾<span>Вино</span>
    </router-link>
<!--    <router-link to="/named" class="nav-item" :class="{ active: $route.path === '/named' }">-->
<!--      🍇<span>Именное вино</span>-->
<!--    </router-link>-->
    <router-link to="/tastings" class="nav-item" :class="{ active: $route.path === '/tastings' }">
      🍷<span>Дегустации</span>
    </router-link>
<!--    <router-link to="/subscription" class="nav-item" :class="{ active: $route.path === '/subscription' }">-->
<!--      📦<span>Подписка</span>-->
<!--    </router-link>-->

    <!--    <router-link to="/contacts" class="nav-item" :class="{ active: $route.path === '/contacts' }">-->
    <!--      📦<span>Контакты</span>-->
    <!--    </router-link>-->
    <router-link to="/sets" class="nav-item" :class="{ active: $route.path === '/sets' }">
      🍷🍷<span>Сеты</span>
    </router-link>
    <router-link to="/cart" class="nav-item" :class="{ active: $route.path === '/cart' }">
      🛒<span>Корзина</span>
    </router-link>
    <router-link to="/additional" class="nav-item" :class="{ active: $route.path === '/additional' }">
      ...<span>Дополнительно</span>
    </router-link>
  </nav>
</template>

<style scoped>
.bottom-nav {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
  background-color: #fff;
  border-top: 1px solid #ddd;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 1000;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  color: #888;
  text-decoration: none;
}

.nav-item.active {
  color: #000;
  font-weight: bold;
}
</style>
<script setup lang="ts">
</script>