import axios from "axios";

const state = {
  factoryData: {},
  status: "",
  factoryColumnNames: {},
};

const getters = {
  factoryDataState: (state) => state.status,
  factoryData: (state) => state.factoryData,
  factoryColumnNames: (state) => state.factoryColumnNames,
};

const actions = {
  // Get All Factory List
  async getAllFactoryName({ commit }) {
    commit("factory_name_request");
    let res = await axios.get("http://localhost:5000/api/factories/getAllFactoryName");
    commit("get_all_factory_name", res.data.factoryData);
    return res;
  },

  // Update Factory Row
  async updateFactoryName({ commit }, tableData) {
    commit("update_factory_request");
    try {
      let res = await axios.put("http://localhost:5000/api/factories/updateFactoryName", tableData);
      if (res.data.success !== undefined) {
        commit("update_factory_success");
      }
      return res;
    } catch (err) {
      console.log(err);
    }
  },

  // Delete Factory Row
  async deleteFactoryName({ commit }, unitUsing) {
    commit("delete_row_request");
    try {
      let res = await axios.delete("http://localhost:5000/api/factories/deleteFactoryName", { data: { unit_using: unitUsing } });
      if (res.data.success !== undefined) {
        commit("delete_row_success");
      }
      return res;
    } catch (err) {
      console.log(err);
    }
  },

  //Get Column
  async factoryGetAllColumns({ commit }) {
    commit("get_factory_column_request");
    let res = await axios.get("http://localhost:5000/api/factories/getFactoryNameColumn");
    commit("get_factory_columns", res.data.columns);
    return res;
  },

  //Add Column
  async factoryAddColumn({ commit }, addColumn) {
    commit("factory_add_column_request");
    try {
      let res = await axios.post("http://localhost:5000/api/factories/createFactoryNameColumn", addColumn);
      commit("factory_add_column_success");
      return res;
    } catch (err) {
      console.log(err);
    }
  },

  // Delete Column
  async factoryDeleteColumn({ commit }, columnName) {
    commit("delete_column_request");
    try {
      let res = await axios.delete("http://localhost:5000/api/factories/deleteFactoryNameColumn", { data: { column_name: columnName } });
      if (res.data.success !== undefined) {
        commit("delete_column_success");
      }
      return res;
    } catch (err) {
      console.log(err);
    }
  },
};

const mutations = {
  factory_name_request(state) {
    state.status = "loading";
  },
  get_all_factory_name(state, factoryData) {
    state.factoryData = factoryData;
  },
  update_factory_request(state) {
    state.status = "loading";
  },
  update_factory_success(state) {
    state.status = "success";
  },
  delete_row_request(state) {
    state.status = "loading";
  },
  delete_row_success(state) {
    state.status = "success";
  },

  get_factory_column_request(state) {
    state.status = "loading";
  },
  get_factory_columns(state, factoryColumnNames) {
    state.factoryColumnNames = factoryColumnNames;
  },
  factory_add_column_request(state) {
    state.status = "loading";
  },
  factory_add_column_success(state) {
    state.status = "success";
  },
  delete_column_request(state) {
    state.status = "loading";
  },
  delete_column_success(state) {
    state.status = "success";
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
