<template>
  <div>
    <header class="header">
      <button class="svg-wrapper save__button">
        <svg class="svg svg-green" :width="24" :height="24">
          <use v-bind="{'xlink:href':'/feather-sprite.svg#'+'save'}" />
        </svg>
      </button>
      <button class="svg-wrapper login__button">
        <svg class="svg svg-green" :width="24" :height="24">
          <use v-bind="{'xlink:href':'/feather-sprite.svg#'+'log-in'}" />
        </svg>
      </button>
      <button class="svg-wrapper signin__button">
        <svg class="svg svg-green" :width="24" :height="24">
          <use v-bind="{'xlink:href':'/feather-sprite.svg#'+'log-out'}" />
        </svg>
      </button>
    </header>
    <div class="container">
      <section class="title">
        <h1>Todo List</h1>
      </section>
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
          <li v-for="(todo, index) in filtered" :key="todo.id" class="todo row">
            <label
              :class="{ doneTask:todo.completed }"
              @click="toggleToDo(index)"
            >{{ todo.content }}</label>
            <!-- <BaseButton name="x" class="svg-red" @click="deleteTodo" /> -->
            <button class="svg-wrapper" @click.prevent="deleteTodo(todo, index)">
              <svg class="svg svg-red" :width="24" :height="24">
                <use v-bind="{'xlink:href':'/feather-sprite.svg#'+'x'}" />
              </svg>
            </button>
          </li>
        </ul>
      </section>
      <section class="filters__section">
        <ul class="row filters__list">
          <li>
            <a
              href="#"
              :class="{selected : filter == 'all'}"
              @click.prevent="filter = 'all'"
            >All tasks</a>
          </li>
          <li>
            <a
              href="#"
              :class="{selected : filter == 'todo'}"
              @click.prevent="filter = 'todo'"
            >{{Todos}} tasks to do</a>
          </li>
          <li>
            <a
              href="#"
              :class="{selected : filter == 'done'}"
              @click.prevent="filter = 'done'"
            >{{doneTodos}} done tasks</a>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script>
const firebase = require("../components/firebaseInt");

export default {
  data() {
    return {
      todos: [],
      newTodo: "",
      bdTodo: {},
      filter: "all"
    };
  },
  created() {
    firebase.db
      .collection("todos")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          // console.log(doc.id);
          const data = {
            id: doc.id,
            content: doc.data().content,
            completed: doc.data().completed
          };
          this.todos.push(data);
        });
      });
  },
  methods: {
    toggleToDo(index) {
      this.todos[index].completed = !this.todos[index].completed;
      firebase.db
        .collection("todos")
        .doc(this.todos[index].id)
        .update({
          completed: this.todos[index].completed
        });
    },
    addToDo() {
      if (this.newTodo.length > 0) {
        var newTodoRef = firebase.db.collection("todos").doc();
        (this.bdTodo = {
          id: newTodoRef.id,
          content: this.newTodo,
          completed: false
        }),
          this.todos.push(this.bdTodo);
        newTodoRef.set(this.bdTodo);
        this.newTodo = "";
        this.bdTodo = "";
      }
    },
    deleteTodo(todo) {
      firebase.db
        .collection("todos")
        .doc(todo.id)
        .delete();
      console.log(todo.id);
      this.todos = this.todos.filter(i => i !== todo);
    }
  },
  computed: {
    Todos() {
      return this.todos.filter(todo => !todo.completed).length;
    },
    doneTodos() {
      return this.todos.filter(todo => todo.completed).length;
    },
    filtered() {
      if (this.filter === "todo") {
        return this.todos.filter(todo => !todo.completed);
      } else if (this.filter == "done") {
        return this.todos.filter(todo => todo.completed);
      }
      return this.todos;
    }
  }
};
</script>

<style lang="scss" scoped>
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

.filters__list {
  list-style: none;
  justify-content: center;
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