import axios from "axios";
// import router from "../router";

const state = {
  factories: {},
  status: "",
  columnNames: {},
};

const getters = {
  factoryState: (state) => state.status,
  factories: (state) => state.factories,
};

const actions = {
  // Get All Factory List
  async getAllFactory({ commit }) {
    commit("factories_request");
    let res = await axios.get("http://localhost:5000/api/factories/getAllFactory");
    commit("get_all_factories", res.data.factories);
    return res;
  },

  // Update Factory Row
  async updateFactory({ commit }, tableData) {
    commit("update_request");
    try {
      let res = await axios.put("http://localhost:5000/api/factories/updateFactory", tableData);
      if (res.data.success !== undefined) {
        commit("update_success");
      }
      return res;
    } catch (err) {
      console.log(err);
    }
  },

  // Delete Factory Row
  async deleteFactory({ commit }, companyName) {
    commit("delete_request");
    try {
      let res = await axios.delete("http://localhost:5000/api/factories/deleteFactory", { data: { company_name: companyName } });
      if (res.data.success !== undefined) {
        commit("delete_success");
      }
      return res;
    } catch (err) {
      console.log(err);
    }
  },

  //Get Column
  async getAllColumn({ commit }) {
    commit("get_column_request");
    let res = await axios.get("http://localhost:5000/api/factories/getFactoryColumn");
    commit("get_column", res.data.columns);
    return res;
  },

  //Add Column
  async addColumn({ commit }, addColumn) {
    commit("add_column_request");
    try {
      let res = await axios.post("http://localhost:5000/api/factories/createFactoryColumn", addColumn);
      commit("add_column_success");
      return res;
    } catch (err) {
      console.log(err);
    }
  },
};

const mutations = {
  factories_request(state) {
    state.status = "loading";
  },
  get_all_factories(state, factories) {
    state.factories = factories;
  },
  update_request(state) {
    state.status = "loading";
  },
  update_success(state) {
    state.status = "success";
  },
  delete_request(state) {
    state.status = "loading";
  },
  delete_success(state) {
    state.status = "success";
  },

  get_column_request(state) {
    state.status = "loading";
  },
  get_column(state, columnNames) {
    state.columnNames = columnNames;
  },
  add_column_request(state) {
    state.status = "loading";
  },
  add_column_success(state) {
    state.status = "success";
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
