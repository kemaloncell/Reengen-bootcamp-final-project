import axios from "axios";
// import router from "../router";

const state = {
  token: localStorage.getItem("token") || "",
  user: {},
  status: "",
};

const getters = {
  /* isLoggedIn: function (state) {
    if (state.token != "") {
      return true;
    } else {
      return false;
    }
  }, */
  isLoggedIn: (state) => !!state.token,
  authState: (state) => state.status,
  user: (state) => state.user,
};

const actions = {
  //Login Action
  async login({ commit }, user) {
    commit("auth_request");
    let res = await axios.post("http://localhost:5000/api/users/login", user);
    if (res.data.success) {
      const token = res.data.token;
      const user = res.data.user;
      // Store the token into the localStorage
      localStorage.setItem("token", token);
      // Set the axios defaults
      axios.defaults.headers.common["Authorization"] = token;
      commit("auth_success", token, user);
    }
    return res;
  },

  //Register Action
  async register({ commit }, userData) {
    commit("register_request");
    let res = await axios.post("http://localhost:5000/api/users/register", userData);
    if (res.data.success !== undefined) {
      commit("register_success");
    }
    return res;
  },
};

const mutations = {
  auth_request(state) {
    state.status = "loading";
  },
  auth_success(state, token, user) {
    state.token = token;
    state.user = user;
    state.status = "success";
  },
  register_request(state) {
    state.status = "loading";
  },
  register_success(state) {
    state.status = "success";
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
