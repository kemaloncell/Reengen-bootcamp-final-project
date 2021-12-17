<template>
  <div class="modal fade">
    <div class="modal-dialog">
      <div class="modal-content">
        <form @submit.prevent="">
          <div class="modal-header">
            <h4 class="modal-title">{{ $t("message.UpdateTitle") }}</h4>
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label>{{ $t("message.UpdateName") }}</label>
              <input type="text" class="form-control" v-model="company_name" required />
            </div>
            <div class="form-group">
              <label>{{ $t("message.UpdateStartDate") }}</label>
              <input type="date" class="form-control" v-model="start_date" required />
            </div>
            <div class="form-group">
              <label>{{ $t("message.UpdateEndDate") }}</label>
              <input type="date" class="form-control" v-model="end_date" required />
            </div>
            <div class="form-group">
              <label>{{ $t("message.UpdateEmpNumber") }}</label>
              <input type="number" class="form-control" v-model="employees_number" required />
            </div>
            <div class="form-group checkDiv">
              <label>{{ $t("message.UpdateSpecialNumber") }}</label>
              <input type="checkbox" class="check" v-model="special_member" required />
            </div>
          </div>
          <div class="modal-footer">
            <input type="button" class="btn btn-default" data-dismiss="modal" :value="$t('message.CancelBtn')" />
            <input type="submit" class="btn btn-info" data-dismiss="modal" :value="$t('message.SaveBtn')" @click="updateTableData" />
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
    updateData: {
      required: true,
    },
  },
  data() {
    return {
      company_name: "",
      start_date: "",
      end_date: "",
      employees_number: "",
      special_member: "",
    };
  },
  watch: {
    // We set the data from props as v-model value
    updateData() {
      this.company_name = this.$props.updateData.company_name;
      this.start_date = this.$props.updateData.start_date;
      this.end_date = this.$props.updateData.end_date;
      this.employees_number = this.$props.updateData.employees_number;
      this.special_member = this.$props.updateData.special_member;
    },
  },
  methods: {
    ...mapActions(["updateFactory"]),
    updateTableData() {
      let payload = {
        company_name: this.company_name,
        start_date: this.start_date,
        end_date: this.end_date,
        employees_number: this.employees_number,
        special_member: this.special_member,
      };
      if (this.company_name !== "" && this.start_date !== "" && this.end_date !== "" && this.employees_number !== "") {
        this.updateFactory(payload).then(() => {
          this.$swal({ title: "Good job", text: "Update successful!", type: "success" }).then(function () {
            location.reload();
          });
        });
      } else {
        this.$swal("Please fill in the blanks");
      }
    },
  },
};
</script>

<style>
.check {
  margin-left: 10px;
  margin-top: -7px;
  height: 50px;
}
.checkDiv {
  display: flex;
  align-items: center;
}
</style>
