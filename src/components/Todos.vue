<template>
  <div>
    <header class="header">
      <p>
        Welcome back
        {{ userProfile.name }}
      </p>
      <a class="header-btn" @click.prevent="logOut">Log Out</a>
      <!-- <router-link to="settings">Settings</router-link> -->
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
            class="input--todo"
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
import { mapState } from "vuex";
const firebase = require("../components/firebaseInt");

export default {
  data() {
    return {
      newTodo: "",
      bdTodo: {},
      filter: "all"
    };
  },
  methods: {
    toggleToDo(index) {
      this.userTodos[index].completed = !this.userTodos[index].completed;
      firebase.db
        .collection("todos")
        .doc(this.userTodos[index].id)
        .update({
          completed: this.userTodos[index].completed
        });
    },
    addToDo() {
      if (this.newTodo.length > 0) {
        var newTodoRef = firebase.db.collection("todos").doc();
        (this.bdTodo = {
          id: newTodoRef.id,
          content: this.newTodo,
          createdOn: new Date(),
          completed: false,
          userName: this.userProfile.name,
          userId: this.currentUser.uid
        }),
          this.userTodos.push(this.bdTodo);
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
    },
    logOut() {
      firebase.auth.signOut().then(() => {
        this.$store.dispatch("clearData");
        this.$router.push("/login");
      });
    }
  },
  computed: {
    ...mapState(["userProfile", "currentUser", "userTodos"]),
    Todos() {
      return this.userTodos.filter(state => !state.completed).length;
    },
    doneTodos() {
      return this.userTodos.filter(state => state.completed).length;
    },
    filtered() {
      if (this.filter === "todo") {
        return this.userTodos.filter(state => !state.completed);
      } else if (this.filter == "done") {
        return this.userTodos.filter(state => state.completed);
      }
      return this.userTodos;
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
  .header-btn {
    margin: auto 0;
    font-size: 1em;
  }
}
.input--todo {
  background-color: #fff;
  text-align: left;
  border: none;
  font-size: 1.4rem;
  padding: 0.6rem;
  outline: none;
  padding: 0 0.4em;
  width: 75%;
}
@media (max-width: 400px) {
  .header {
    padding: 0 1rem;
  }
}
</style>