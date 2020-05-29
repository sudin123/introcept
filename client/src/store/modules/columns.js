export const SET_COLUMNS = 'SET_COLUMNS';
const state = {
  columns: [],
};

const mutations = {
  [SET_COLUMNS](state, payload) {
    state.columns = payload;
  },
};

const actions = {};

const getters = {
  columns: state => state.columns,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
