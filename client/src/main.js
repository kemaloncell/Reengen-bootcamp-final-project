import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import i18n from "./locales/i18n";

Vue.config.productionTip = false;

// Setting up default vue's http modules for api calls
Vue.prototype.$http = axios;
const token = localStorage.getItem("token");
//Is there is any token we will simply append default axios authorization headers
if (token) {
  Vue.prototype.$http.defaults.headers.common["Authorization"] = token;
}

Vue.use(VueSweetalert2);
Vue.use(Vuetify);
new Vue({
  i18n,
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
