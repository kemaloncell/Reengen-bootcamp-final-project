<template>
  <div class="modal fade">
    <div class="modal-dialog">
      <div class="modal-content">
        <form @submit.prevent="">
          <div class="modal-header">
            <h4 class="modal-title">{{ $t("message.DeleteTitle") }}</h4>
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          </div>
          <div class="modal-body">
            <p>{{ $t("message.DeleteDesc") }}</p>
            <p class="text-warning">
              <small>{{ $t("message.deleteAlert") }}</small>
            </p>
          </div>
          <div class="modal-footer">
            <input type="button" class="btn btn-default" data-dismiss="modal" :value="$t('message.CancelBtn')" />
            <input type="submit" class="btn btn-danger" data-dismiss="modal" @click="deleteTableData" :value="$t('message.DeleteBtn')" />
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
    ...mapActions(["deleteFactory"]),
    deleteTableData() {
      let payload = {
        company_name: this.deleteData,
      };
      this.deleteFactory(payload).then(() => {
        // this.$swal("Delete Successful");
        this.$swal({ title: "Good job", text: "Deletion successful!", type: "success" }).then(function () {
          location.reload();
        });
      });
    },
  },
};
</script>

<style></style>
