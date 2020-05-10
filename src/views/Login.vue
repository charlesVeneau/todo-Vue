<template>
  <div :class="{'signup-form' : !showLoginForm && !showForgotPassword}">
    <transition name="fade">
      <div v-if="performingRequest" class="loading">
        <p>...loading</p>
      </div>
    </transition>
    <!-------- START OF LOGIN FORM -------->
    <form v-if="showLoginForm" @submit.prevent class="container">
      <h1>Login</h1>
      <div class="row-col">
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
      </div>

      <div class="formBtn">
        <a class="btn-blue" @click.prevent="toggleForm">Create an account</a>
        <a class="btn-blue" @click="togglePasswordReset">Forgot Password</a>
      </div>
    </form>
    <!--------!!! END OF LOGIN FORM !!!-------->
    <!-------- START OF SIGNUP FORM -------->

    <form v-if="!showLoginForm && !showForgotPassword" @submit.prevent class="container">
      <h1>SignUp</h1>
      <div class="row-col">
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
      </div>
      <div class="formBtn">
        <a class="btn-blue" @click.prevent="toggleForm">Log In</a>
      </div>
    </form>
    <!--------!!! END OF SIGNUP FORM !!!-------->
    <!-------- START OF RESET PSWRD FORM -------->
    <form v-if="showForgotPassword" @submit.prevent class="password-reset container">
      <div v-if="!passwordResetSuccess">
        <h1>Reset Password</h1>
        <p class="form-text">We will send you an email to reset your password</p>
        <div class="row-col">
          <input
            class="input"
            type="email"
            name="resetEmail"
            id="resetEmail"
            v-model="passwordForm.email"
            placeholder="your@email.com"
            required
          />
          <button @click.prevent="resetPassword" class="btn">Submit</button>
          <div class="formBtn"></div>

          <a class="btn-blue" @click.prevent="togglePasswordReset">Log In</a>
        </div>
      </div>
      <div v-else>
        <h1>Email Sent</h1>
        <p>Check your email to reset your password</p>
        <button @click.prevent="togglePasswordReset" class="btn-blue">Log In</button>
      </div>
    </form>
    <!--------!!! START OF RESET PSWRD FORM !!!-------->
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
      passwordForm: {
        email: ""
      },
      showLoginForm: true,
      showForgotPassword: false,
      passwordRequestSuccess: false,
      performingRequest: false,
      errorMsg: ""
    };
  },
  methods: {
    toggleForm() {
      this.erroMsg = "";
      this.showLoginForm = !this.showLoginForm;
    },
    togglePasswordReset() {
      if (this.showForgotPassword) {
        this.showLoginForm = true;
        this.showForgotPassword = false;
        this.passwordRequestSuccess = false;
      } else {
        this.showLoginForm = false;
        this.showForgotPassword = true;
      }
    },
    logIn() {
      this.performingRequest = true;
      firebase.auth
        .signInWithEmailAndPassword(
          this.loginForm.email,
          this.loginForm.password
        )
        .then(user => {
          console.log(user);
          this.$store.commit("setCurrentUser", user.user);
          this.$store.dispatch("fetchUserProfile");
          this.performingRequest = false;
          this.$router.push("/");
        })
        .catch(err => {
          console.log(err);
          this.performingRequest = false;
          this.errorMsg = err.message;
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
    },
    resetPassword() {
      this.performingRequest = true;
      firebase.auth
        .sendPasswordResetEmail(this.passwordForm.email)
        .then(() => {
          this.performingRequest = false;
          this.passwordRequestSuccess = true;
          this.passwordForm.email = "";
        })
        .catch(err => {
          console.log(err);
          this.performingRequest = false;
          this.errorMsg = err.message;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.input,
.input + .btn {
  margin-top: 1em;
}
</style>