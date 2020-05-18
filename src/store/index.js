import Vue from "vue";
import Vuex from "vuex";

const fb = require("@/components/firebaseInt")

Vue.use(Vuex);

fb.auth.onAuthStateChanged(user => {
  if (user) {
    store.commit("setCurrentUser", user);
    store.dispatch("fetchUserProfile");

    //Add user todos to an array with realtime update
    fb.db.collection('todos').orderBy('createdOn', 'asc').onSnapshot(querySnapshot => {
      let todosArray = []
      querySnapshot.forEach(doc => {
        let todo = doc.data();
        if (todo.userId === user.uid) {
          todosArray.push(todo)
        }
      })
      store.commit('setTodos', todosArray)
    })
  }
})

const store = new Vuex.Store({
  state: {
    currentUser: null,
    userProfile: {},
    userTodos: []
  },
  mutations: {
    setCurrentUser(state, val) {
      state.currentUser = val
    },
    setUserProfile(state, val) {
      state.userProfile = val
    },
    setTodos(state, val) {
      state.userTodos = val
    }
  },
  actions: {
    clearData({
      commit
    }) {
      commit("setCurrentUser", null)
      commit("setUserProfil", {})
    },
    fetchUserProfile({
      commit,
      state
    }) {
      fb.db
        .collection("users")
        .doc(state.currentUser.uid)
        .get()
        .then(res => {
          commit("setUserProfile", res.data());
        })
        .catch(err => {
          console.log(err);
        });
    }
  },

  modules: {}
});

export default store