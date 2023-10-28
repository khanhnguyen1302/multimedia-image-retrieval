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
  width: 100%;
}

button {
  background-color: #eee;
  border: none;
  padding: 10px 10px;
  border-radius: 8px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px;
}

select {
  background-color: #eee;
  border: none;
  padding: 10px 10px;
  border-radius: 8px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px;
  margin-top: 10px;
}
</style>
