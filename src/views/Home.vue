<template>
  <div class="home">
    <div class="header">
      <h1>To Do List</h1>
    </div>
    <div class="container">
      <BaseInput />
      <div class="todo__items">
        <p
          v-for="(todo, index) in todos"
          @click="toggleToDo(index)"
          :key="todo.id"
          :class="[{doneToDo : !todo.state}, '']"
        >{{ todo.content}}</p>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import BaseInput from "@/components/BaseInput.vue";

export default {
  data() {
    return {
      todos: [
        {
          id: 1,
          content: "todo item 1",
          state: true
        },
        {
          id: 2,
          content: "todo item 2",
          state: true
        },
        {
          id: 3,
          content: "todo item 3",
          state: true
        },
        {
          id: 4,
          content: "todo item 4",
          state: true
        }
      ]
    };
  },
  components: {
    BaseInput
  },
  methods: {
    toggleToDo(index) {
      this.todos[index].state = !this.todos[index].state;
    }
  }
};
</script>

<style scoped>
.doneToDo {
  color: lightgray;
  text-decoration: line-through;
}
</style>