<template>
  <div id="app">
    <router-view />
    <MainMenu />
  </div>
</template>

<script setup>
import MainMenu from './components/MainMenu.vue'
</script>

<style>
html, body, #app {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: sans-serif;
  background-color: white;
  color: #111;
}

#app {
  padding-bottom: 60px; /* чтобы контент не перекрывался nav-баром */
}
</style>
