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

import VueBus from "vue-bus";
Vue.use(VueBus);
Vue.use(Buefy);
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);

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
