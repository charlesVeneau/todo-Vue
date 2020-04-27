<template>
  <div class="container">
    <header>
      <h1>ToDo</h1>
    </header>
    <section>
      <div class="row">
        <input
          type="text"
          placeholder="Add a task"
          class="input"
          v-model="newTodo"
          @keyup.enter="addToDo()"
        />
        <button class="btn btn-add" @click="addToDo">Add</button>
      </div>
      <ul class="todo__items">
        <li
          v-for="(todo, index) in todos"
          :key="todo.id"
          class="todo row"
          @click="toggleToDo(index)"
        >
          <label :class="{doneTask : todo.completed}">{{todo.content}}</label>
          <div class>
            <BaseButton name="trash" color="rgb(124,240,145)" />
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todos: [
        {
          id: 1,
          content: "todo item 1",
          completed: false
        },
        {
          id: 2,
          content: "todo item 2",
          completed: false
        },
        {
          id: 3,
          content: "todo item 3",
          completed: false
        },
        {
          id: 4,
          content: "todo item 4",
          completed: false
        }
      ],
      newTodo: ""
    };
  },
  methods: {
    toggleToDo(index) {
      this.todos[index].completed = !this.todos[index].completed;
    },
    addToDo() {
      this.todos.push({
        id: this.todos.length + 1,
        content: this.newTodo,
        completed: false
      });
      this.newTodo = "";
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  background-color: #fff;
  margin: 10rem auto 0;
  width: 70%;
  max-width: 400px;
}
.row {
  display: flex;
  justify-content: center;
  align-items: center;
}

.input {
  background-color: #fff;
  text-align: left;
  border: none;
  font-size: 1.4rem;
  padding: 0.6rem;
  outline: none;
  width: 75%;
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
}

.btn {
  border: none;
  font-size: 1.4rem;
  padding: 0.6rem;
  outline: none;
  background-color: rgb(86, 194, 110);
  color: #fff;
  width: 25%;
  &:hover {
    background-color: rgb(117, 209, 137);
  }
}

.doneTask {
  color: lightgray;
  text-decoration: line-through;
}
</style>