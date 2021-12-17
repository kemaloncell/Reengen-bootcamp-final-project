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
              <label>{{ $t("message.UpdateRowName") }}</label>
              <input type="text" class="form-control" v-model="unit_using" required />
            </div>
            <label>{{ $t("message.UpdateDateRange") }}</label>
            <div class="form-group dateRangeDiv">
              <input type="date" class="form-control dateRange1" v-model="startDate" required />
              <input type="date" class="form-control dateRange2" v-model="endDate" required />
            </div>
            <div class="form-group">
              <label>{{ $t("message.UpdateUsage") }}</label>
              <input type="number" class="form-control" v-model="usage" required />
            </div>
            <div class="form-group">
              <label>{{ $t("message.UpdateUsageFee") }}</label>
              <input type="number" class="form-control" v-model="usage_fee" required />
            </div>
            <div class="form-group checkDiv">
              <label>{{ $t("message.UpdateDiscountedPrice") }}</label>
              <input type="checkbox" class="check" v-model="discounted_price" required />
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
      unit_using: "",
      startDate: "",
      endDate: "",
      usage: "",
      usage_fee: "",
      discounted_price: "",
    };
  },

  watch: {
    // We set the data from props as v-model value
    updateData() {
      this.unit_using = this.$props.updateData.unit_using;
      this.startDate = this.$props.updateData.date_range.split(",")[0];
      this.endDate = this.$props.updateData.date_range.split(",")[1];
      this.usage = this.$props.updateData.usage;
      this.usage_fee = this.$props.updateData.usage_fee;
      this.discounted_price = this.$props.updateData.discounted_price;
    },
  },
  methods: {
    ...mapActions(["updateFactoryName"]),
    updateTableData() {
      // convert to date format
      const dateConverter = `[${this.startDate},${this.endDate})`;

      let payload = {
        unit_using: this.unit_using,
        date_range: dateConverter,
        usage: this.usage,
        usage_fee: this.usage_fee,
        discounted_price: this.discounted_price,
      };
      if (this.unit_using !== "" && this.usage !== "" && this.usage_fee !== "") {
        this.updateFactoryName(payload).then(() => {
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
.dateRangeDiv {
  display: flex;
  align-items: center;
  justify-content: center;
}
.dateRange1 {
  width: 170px;
  margin-right: 5px;
}
.dateRange2 {
  width: 170px;
}
</style>
