<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  components: {},
  computed: {
    ...mapState(["currentUser"])
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

.header {
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  padding: 0 4rem;
}

.title {
  background-color: currentColor;

  padding: 0.1em 0;
  h1 {
    color: #fff;
  }
}
.container {
  background-color: #fff;
  margin: 10rem auto 0;
  width: 70%;
  max-width: 400px;
  box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.349);
}
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.row-col {
  display: flex;
  flex-flow: column;
}

.formBtn {
  display: flex;
  justify-content: space-between;
}
.form-text {
  font-size: 1.2rem;
}

.input {
  background-color: #fff;
  text-align: left;
  border: none;
  font-size: 1.4rem;
  padding: 0.6rem;
  outline: none;
  padding: 0 0.4em;
}

.todo__items {
  list-style: none;
  margin: 0;
  padding: 0;
  text-align: left;
  font-size: 1.4rem;
}

.todo {
  padding: 0.4em;
  padding-right: 0;
}

.btn {
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  padding: 0.6rem;
  outline: none;
  background-color: rgb(86, 194, 110);
  color: #fff;
  width: 100%;

  &:hover {
    background-color: rgb(117, 209, 137);
  }
}

.btn-blue {
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  padding: 0.6rem;
  outline: none;
  background-color: #2c3e50;
  color: #fff;
  width: 100%;
}

.doneTask {
  color: lightgray;
  text-decoration: line-through;
}

.svg-wrapper {
  border: none;
  font-size: 1.4rem;
  padding: 0.6rem;
  outline: none;
  background-color: #fff;
  color: rgb(165, 165, 165);
}
.svg {
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
}

.svg-green {
  &:hover {
    stroke: rgb(86, 194, 110);
  }
}
.svg-red {
  &:hover {
    stroke: rgb(202, 75, 75);
  }
}

.filters__list {
  list-style: none;
  justify-content: center;
  text-align: center;
  padding: 1em;
  margin: 0;
  border-top: 1px solid rgb(194, 194, 194);
  li + li {
    margin-left: 3em;
  }
  a {
    color: rgb(165, 165, 165);
    text-decoration: none;
    padding: 0.1em 0.2em;
  }
}

.selected {
  color: rgb(86, 194, 110) !important;
}
</style>
