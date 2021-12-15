<template>
  <div class="tab-pane fade show active" role="tabpanel" aria-labelledby="nav-contact-tab">
    <div class="container-xl">
      <div class="table-responsive">
        <div class="table-wrapper">
          <div class="table-title">
            <div class="row">
              <div class="col-sm-6">
                <h2>
                  <b>{{ $t("message.FactoryNameTableName") }}</b>
                </h2>
              </div>
              <div class="col-sm-6">
                <a href="#FactoryAddColumnModal" class="btn btn-success" data-toggle="modal"
                  ><i class="material-icons">&#xE147;</i> <span>{{ $t("message.AddNewColumn") }}</span></a
                >
              </div>
            </div>
          </div>
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th v-for="(items, i) in factoryColumnNames" :key="i + 1">
                  <a href="#FactoryDeleteColumnModal" @click="deleteColumnData(items.column_name)" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                  <!-- Company Name -->
                  {{ items.column_name.replace("_", " ").toUpperCase() }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(items, i) in factoryData" :key="i">
                <td>{{ items.unit_using }}</td>
                <td>{{ items.date_range }}</td>
                <td>{{ items.usage }}</td>
                <td>{{ items.usage_fee }}</td>
                <td>{{ items.discounted_price }}</td>
                <td>
                  <a href="#FactoryUpdateRowModal" @click="updateData(items)" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                  <a href="#FactoryDeleteRowModal" @click="deleteRowData(items.unit_using)" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                </td>
              </tr>
              <tr></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- Add Modal Start -->
    <add-column-modal id="FactoryAddColumnModal" />
    <!-- Add Modal End -->

    <!-- Edit Modal Start -->
    <update-row-modal id="FactoryUpdateRowModal" :updateData="updateDatas" />
    <!-- Edit Modal End -->

    <!-- Delete Modal Start -->
    <delete-row-modal id="FactoryDeleteRowModal" :deleteData="deleteRowName"></delete-row-modal>
    <!-- Delete Modal End -->

    <!-- Delete Modal Start -->
    <delete-column-modal id="FactoryDeleteColumnModal" :deleteData="deleteColumnName"></delete-column-modal>
    <!-- Delete Modal End -->
  </div>
</template>

<script>
import updateRowModal from "../modals/factoryName/UpdateRowModal.vue";
import addColumnModal from "../modals/factoryName/AddColumnModal.vue";
import deleteRowModal from "../modals/factoryName/DeleteRowModal.vue";
import deleteColumnModal from "../modals/factoryName/DeleteColumnModal.vue";
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
    this.getAllFactoryName();
    this.factoryGetAllColumns();
  },
  computed: {
    ...mapGetters(["factoryData", "factoryColumnNames"]),
  },
  methods: {
    ...mapActions(["getAllFactoryName", "factoryGetAllColumns"]),
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
