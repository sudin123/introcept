import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
import Columns from './modules/columns';
export default new Vuex.Store({
  modules: {
    Columns,
  },
  strict: false,
});
