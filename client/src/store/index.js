import Vue from "vue";
import Vuex from "vuex";

import Auth from "../Warehouse/Auth";
import FactoryList from "../Warehouse/FactoryList";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { Auth, FactoryList },
});
