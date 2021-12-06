import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import vuetify from "./plugins/vuetify";
import axios from "axios";

Vue.config.productionTip = false;

// Setting up default vue's http modules for api calls
Vue.prototype.$http = axios;
const token = localStorage.getItem("token");
//Is there is any token we will simply append default axios authorization headers
if (token) {
  Vue.prototype.$http.defaults.headers.common["Authorization"] = token;
}

Vue.use(Vuetify);
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
