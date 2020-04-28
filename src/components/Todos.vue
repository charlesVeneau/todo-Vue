<template>
  <div class="container">
    <header class="header">
      <h1>Todo List</h1>
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
        <button class="svg-wrapper" @click.prevent="addToDo">
          <svg class="svg svg-green" :width="24" :height="24">
            <use v-bind="{'xlink:href':'/feather-sprite.svg#'+'plus'}" />
          </svg>
        </button>
      </div>
      <ul class="todo__items">
        <li v-for="(todo, index) in todos" :key="todo.id" class="todo row">
          <label :class="{doneTask : todo.completed}" @click="toggleToDo(index)">{{todo.content}}</label>
          <!-- <BaseButton name="x" class="svg-red" @click="deleteTodo" /> -->
          <button class="svg-wrapper" @click.prevent="deleteTodo(index)">
            <svg class="svg svg-red" :width="24" :height="24">
              <use v-bind="{'xlink:href':'/feather-sprite.svg#'+'x'}" />
            </svg>
          </button>
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
      if (this.newTodo.length > 0) {
        this.todos.push({
          id: this.todos.length + 1,
          content: this.newTodo,
          completed: false
        });
        this.newTodo = "";
      }
    },
    deleteTodo(index) {
      console.log("click");
      this.todos.splice(index, 1);
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  background-color: currentColor;
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
  padding-right: 0;
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
</style>