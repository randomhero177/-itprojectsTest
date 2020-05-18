import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import task from '@/store/modules/task';
Vue.use(Vuex);

const { hostname, port } = window.location;

const state = {
  hostname,
  port,
};

const getters = {};

const mutations = {};

const actions = {};

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  actions,
  mutations,
  getters,
  modules: {
    task,
  },
  plugins: [createPersistedState({
    paths: ['task']
  }),
  ],
});

export default store;