const state = {
  taskList: [],
  currentTask: {}
};

const actions = {
  updateCurrentTask({ commit }, data) {
    commit('changeCurrentTask', data);
  },
  updateCurrentTaskListText({ commit }, data) {
    commit('changeCurrentTaskListText', data);
  },
  addItemToTaskList({ commit }, data) {
    commit('addItemToTaskList', data)
  },
  deleteItemFromTask({ commit }, data) {
    commit('deleteItemFromTask', data)
  },
};

const mutations = {
  createNewTask(state, payload) {
    state.taskList.push(payload);
  },
  addItemToTaskList(state, payload) {
    state.taskList[parseInt(payload.taskId, 10)].taskList.push(JSON.parse(JSON.stringify(payload.data)));
  },
  changeCurrentTask(state, payload) {
    state.taskList[parseInt(payload.id)] = payload.data;
  },
  updateOriginalTask(state, payload) {
    state.currentTask = payload.data;
  },
  changeCurrentTaskTitle(state, payload) {
    state.taskList[parseInt(payload.id)].title = payload.title;
  },
  changeCurrentTaskStatus(state, payload) {
    state.taskList[parseInt(payload.id)].taskList[payload.currentTaskId].active = payload.active;
  },
  changeCurrentTaskListText(state, payload) {
    state.taskList[payload.id].taskList[payload.currentTaskId].title = payload.text;
  },
  deleteTask(state, data) {
    state.taskList.splice(parseInt(data.taskId, 10), 1);
  },
  deleteItemFromTask(state, payload) {
    state.taskList[parseInt(payload.taskId)].taskList.splice(parseInt(payload.currentTaskId), 1)
  },
};

const task = {
  namespaced: true,
  state,
  actions,
  mutations,
};

export default task;
