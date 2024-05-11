// auth.js
import { createStore } from 'vuex';

// Создание хранилища Vuex
const store = createStore({
  state() {
    return {
      isAuthenticated: false,
      user: null
    };
  },
  mutations: {
    setAuthentication(state, status) {
      state.isAuthenticated = status;
    },
    setUser(state, user) {
      state.user = user;
      console.log(user)
    }
  },
  actions: {
    login({ commit }, user) {
      commit('setAuthentication', true);
      commit('setUser', user);
    },
    logout({ commit }) {
      commit('setAuthentication', false);
      commit('setUser', null);
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.isAuthenticated;
    },
    currentUser(state) {
      return state.user;
    }
  }
});

export default store;
