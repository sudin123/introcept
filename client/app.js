require("babel-core/register");
require("babel-polyfill");

import Vue from "vue";
import App from "./src/App.vue";

import router from "./src/routes/index";
import store from "./src/store/index";
import Buefy from "buefy";
import "buefy/dist/buefy.css";

import api from "./handler/axios.js";
Vue.prototype.$api = api;

// import forms from "./config/forms";
// Vue.prototype.$forms = forms;

// import { actions, bulkActions } from "./config/actions";
// Vue.prototype.$actions = actions;
// Vue.prototype.$bulkActions = bulkActions;

// import columns from "./config/columns";
// Vue.prototype.$columns = columns;

import VueBus from "vue-bus";
Vue.use(VueBus);
Vue.use(Buefy);

import VueQuillEditor from "vue-quill-editor";
// require styles
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

Vue.use(VueQuillEditor);

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
