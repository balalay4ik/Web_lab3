<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="wrapper">
<Header></Header>
  <router-view />
<Footer></Footer>
</div>
</template>

<style scoped></style>
