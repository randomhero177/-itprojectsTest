const state = {
  showCreateTask: false,
  showEditTask: false,
};

const actions = {
  updateShowCreateTask({ commit }, data) {
    commit('setAccomplishments', data);
  },
};

const mutations = {
  setShowCreateTask(state, data) {
    state.showCreateTask = data;
  },
};

const modal = {
  namespaced: true,
  state,
  actions,
  mutations,
};

export default modal;
