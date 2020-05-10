import Vue from "vue";
import Vuex from "vuex";

const fb = require("../components/firebaseInt")

Vue.use(Vuex);

// fb.auth.onAuthStateChanged(user => {
//   if (user) {
//     // store.commit("setCurrentUser", user);
//     store.dispatch("fetchUserProfile");
//   }
// })

export default new Vuex.Store({
  state: {
    currentUser: null,
    userProfile: {}
  },
  mutations: {
    setCurrentUser(state, val) {
      state.currentUser = val
    },
    setUserProfile(state, val) {
      state.userProfile = val
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