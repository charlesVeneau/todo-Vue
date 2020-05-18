import Vue from "vue";
import VueRouter from "vue-router";
import firebase from "firebase/app";

import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";

Vue.use(VueRouter);

const routes = [{
    path: "*",
    redirect: "/"
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true
    }
  }
];
const router = new VueRouter({
  mode: "history",
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const currentUser = firebase.auth().currentUser

  if (requiresAuth && !currentUser) {
    next('/login')
  } else if (requiresAuth && currentUser) {
    next()
  } else {
    next()
  }
})

export default router;