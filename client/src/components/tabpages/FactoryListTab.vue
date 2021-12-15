<template>
  <div class="tab-pane fade show active" role="tabpanel" aria-labelledby="nav-home-tab">
    <div class="container-xl">
      <div class="table-responsive">
        <div class="table-wrapper">
          <div class="table-title">
            <div class="row">
              <div class="col-sm-6">
                <h2>
                  <b>{{ $t("message.FactoryListTableName") }}</b>
                </h2>
              </div>
              <div class="col-sm-6">
                <a href="#addColumnModal" class="btn btn-success" data-toggle="modal"
                  ><i class="material-icons">&#xE147;</i> <span>{{ $t("message.AddNewColumn") }}</span></a
                >
              </div>
            </div>
          </div>
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th v-for="(items, i) in columnNames" :key="i + 1">
                  <a href="#deleteColumnModal" @click="deleteColumnData(items.column_name)" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                  <!-- Company Name -->
                  {{ items.column_name.replace("_", " ").toUpperCase() }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(items, i) in factories" :key="i">
                <td>{{ items.company_name }}</td>
                <td>{{ items.start_date }}</td>
                <td>{{ items.end_date }}</td>
                <td>{{ items.employees_number }}</td>
                <td>{{ items.special_member }}</td>

                <td>
                  <a href="#updateRowModal" @click="updateData(items)" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                  <a href="#deleteRowModal" @click="deleteRowData(items.company_name)" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Add Modal Start -->
    <add-column-modal id="addColumnModal" />
    <!-- Add Modal End -->

    <!-- Edit Modal Start -->
    <update-row-modal id="updateRowModal" :updateData="updateDatas" />
    <!-- Edit Modal End -->

    <!-- Delete Modal Start -->
    <delete-row-modal id="deleteRowModal" :deleteData="deleteRowName"></delete-row-modal>
    <!-- Delete Modal End -->

    <!-- Delete Modal Start -->
    <delete-column-modal id="deleteColumnModal" :deleteData="deleteColumnName"></delete-column-modal>
    <!-- Delete Modal End -->
  </div>
</template>

<script>
import updateRowModal from "../modals/factoryList/UpdateRowModal.vue";
import addColumnModal from "../modals/factoryList/AddColumnModal.vue";
import deleteRowModal from "../modals/factoryList/DeleteRowModal.vue";
import deleteColumnModal from "../modals/factoryList/DeleteColumnModal.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    addColumnModal,
    updateRowModal,
    deleteRowModal,
    deleteColumnModal,
  },
  data() {
    return {
      // props data
      updateDatas: "",
      deleteRowName: "",
      deleteColumnName: "",
    };
  },
  created() {
    this.getAllFactory();
    this.getAllColumns();
  },
  computed: {
    ...mapGetters(["factories", "columnNames"]),
  },
  methods: {
    ...mapActions(["getAllFactory", "getAllColumns"]),
    // Send to update modal
    updateData(updateDataEvent) {
      if (updateDataEvent !== null || updateDataEvent !== "") {
        this.updateDatas = updateDataEvent;
      }
    },
    // Send to deleteRowModal
    deleteRowData(deleteDataEvent) {
      if (deleteDataEvent !== null || deleteDataEvent !== "") {
        this.deleteRowName = deleteDataEvent;
      }
    },

    // Send to deleteColumnModal
    deleteColumnData(deleteDataEvent) {
      if (deleteDataEvent !== null || deleteDataEvent !== "") {
        this.deleteColumnName = deleteDataEvent;
      }
    },
  },
};
</script>

<style></style>
