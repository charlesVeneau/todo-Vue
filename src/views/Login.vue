<template>
  <div>
    <transition name="fade">
      <div v-if="performingRequest" class="loading">
        <p>...loading</p>
      </div>
    </transition>
    <!-------- START OF LOGIN FORM -------->
    <form v-if="showLoginForm" @submit.prevent class="container">
      <h1>Login</h1>

      <input
        class="input"
        type="email"
        name="email"
        id="email"
        placeholder="email"
        required
        v-model="loginForm.email"
      />
      <input
        class="input"
        type="password"
        name="password"
        id="password"
        placeholder="password"
        required
        v-model="loginForm.password"
      />
      <button class="btn" @click.prevent="logIn">Log In</button>
      <div class="formBtn">
        <a href="#" @click.prevent="toggleForm">Create an account</a>
      </div>
    </form>
    <!--------!!! END OF LOGIN FORM !!!-------->
    <!-------- START OF SIGNUP FORM -------->

    <form v-else @submit.prevent class="container">
      <h1>SignUp</h1>

      <input
        class="input"
        type="email"
        name="email"
        id="email"
        placeholder="email"
        required
        v-model="signUpForm.email"
      />
      <input
        class="input"
        type="text"
        name="name"
        id="name"
        placeholder="name"
        required
        v-model="signUpForm.name"
      />
      <input
        class="input"
        type="password"
        name="password"
        id="password"
        placeholder="password"
        required
        v-model="signUpForm.password"
      />
      <button class="btn" @click.prevent="SignUp">Sign Up</button>
      <div class="formBtn">
        <a href="#" @click.prevent="toggleForm">Log In</a>
      </div>
    </form>
    <!--------!!! END OF SIGNUP FORM !!!-------->
    <transition name="fade">
      <div v-if="errorMsg !==''" class="error-msg">
        <p>{{ errorMsg }}</p>
      </div>
    </transition>
  </div>
</template>

<script>
// import firebase from "../components/firebaseInt";
const firebase = require("../components/firebaseInt");

export default {
  name: "SignUp",
  data() {
    return {
      loginForm: {
        email: "",
        password: ""
      },
      signUpForm: {
        email: "",
        name: "",
        password: ""
      },
      showLoginForm: true,
      performingRequest: false,
      errorMsg: ""
    };
  },
  methods: {
    toggleForm() {
      this.showLoginForm = !this.showLoginForm;
    },
    logIn() {
      this.performingRequest = true;
      firebase.auth
        .signInWithEmailAndPassword(
          this.loginForm.email,
          this.loginForm.password
        )
        .then(user => {
          this.$store.commit("setCurrentUser", user.user);
          this.$store.dispatch("fetchUserProfile");
          this.$router.push("/");
        })
        .catch(err => {
          console.log(err);

          this.performingRequest = false;
        });
    },
    SignUp() {
      this.performingRequest = true;
      firebase.auth
        .createUserWithEmailAndPassword(
          this.signUpForm.email,
          this.signUpForm.password
        )
        .then(user => {
          this.$store.commit("setCurrentUser", user.user);
          firebase.db
            .collection("users")
            .doc(user.user.uid)
            .set({
              name: this.signUpForm.name,
              email: this.signUpForm.email
            });
        })
        .then(() => {
          this.$store.dispatch("fetchUserProfile");
          this.$router.push("/");
        })
        .catch(error => {
          console.log(error.code);
          console.log(error.message);
          this.performingRequest = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>