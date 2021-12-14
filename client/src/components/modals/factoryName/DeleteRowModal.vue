<template>
  <div class="modal fade">
    <div class="modal-dialog">
      <div class="modal-content">
        <form @submit.prevent="">
          <div class="modal-header">
            <h4 class="modal-title">Delete Factroy Data</h4>
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          </div>
          <div class="modal-body">
            <p>Are you sure you want to delete these Records?</p>
            <p class="text-warning"><small>This action cannot be undone.</small></p>
          </div>
          <div class="modal-footer">
            <input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel" />
            <input type="submit" class="btn btn-danger" data-dismiss="modal" @click="deleteTableData" value="Delete" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    deleteData: {
      required: true,
    },
  },
  methods: {
    ...mapActions(["deleteFactoryName"]),
    deleteTableData() {
      let payload = {
        unit_using: this.deleteData,
      };
      this.deleteFactoryName(payload).then(() => {
        this.$swal({ title: "Good job", text: "Deletion successful!", type: "success" }).then(function () {
          location.reload();
        });
      });
    },
  },
};
</script>

<style></style>
