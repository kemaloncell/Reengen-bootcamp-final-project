import Vue from "vue";
import Vuex from "vuex";

import Auth from "../Warehouse/Auth";
import FactoryList from "../Warehouse/FactoryList";
import FactoryName from "../Warehouse/FactoryName";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { Auth, FactoryList, FactoryName },
});
