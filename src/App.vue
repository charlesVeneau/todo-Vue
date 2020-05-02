<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>-->
    <!-- <router-view /> -->
    <div id="topBar"></div>
    <Todos />
  </div>
</template>

<script>
import Todos from "@/components/Todos.vue";

export default {
  components: {
    Todos
  }
};
</script>

<style lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  background: #8360c3;
  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #2ebf91, #8360c3);
  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #2ebf91, #8360c3);
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 1.2em;
  background: #fff;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
