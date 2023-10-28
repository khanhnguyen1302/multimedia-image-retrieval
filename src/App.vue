<template>
  <img class="logo" alt="Vue logo" src="./assets/logotemp.webp" />
  <MultiMedia msg="Welcome to Your Vue.js App" />
</template>

<script>
import MultiMedia from "./components/MultiMedia.vue";

export default {
  name: "App",
  components: {
    MultiMedia,
  },
};
</script>

<style>
html {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.logo {
  max-width: 500px;
}
</style>
