<template>
  <div class="modal fade">
    <div class="modal-dialog">
      <div class="modal-content">
        <form @submit.prevent="">
          <div class="modal-header">
            <h4 class="modal-title">{{ $t("message.AddColumn") }}</h4>
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label>{{ $t("message.ColumnName") }}</label>
              <input v-model="column_name" placeholder="e.g. column_name or column" type="text" class="form-control" required />
            </div>

            <label>{{ $t("message.ColumnType") }}</label>
            <select v-model="column_type" class="browser-default custom-select" required>
              <option v-for="(items, i) in columnTypes" :key="i">{{ items }}</option>
            </select>
          </div>
          <div class="modal-footer">
            <input type="button" class="btn btn-default" data-dismiss="modal" :value="$t('message.CancelBtn')" />
            <input type="submit" class="btn btn-success" :value="$t('message.AddBtn')" @click="addFactoryColumn" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      columnTypes: [
        "char",
        "character",
        "varchar",
        "character",
        "bit varying",
        "text",
        "bit",
        "varbit",
        "smallint",
        "int",
        "integer",
        "bigint",
        "smallserial",
        "serial",
        "bigserial",
        "numeric",
        "double precision",
        "real",
        "money",
        "bool",
        "boolean",
        "date",
        "timestamp",
        "timestamp without time zone",
        "timestamp with time zone",
        "time",
        "time without time zone",
        "time with time zone",
        "tsquery",
        "tsvector",
        "txid_snapshot",
        "uuid",
        "xml",
      ],
      column_type: "",
      column_name: "",
    };
  },
  methods: {
    ...mapActions(["addColumn"]),
    addFactoryColumn() {
      let addColumn = {
        column_type: this.column_type,
        column_name: this.column_name,
      };
      if (this.column_name === "" && this.column_type === "") {
        this.$swal("Please fill in the blanks");
      } else if (this.column_name.indexOf(" ") > 0) {
        this.$swal("Please fill in the column name without spaces eg. column_name");
      } else {
        this.addColumn(addColumn).then(() => {
          this.$swal({ title: "Good job", text: "Update successful!", type: "success" }).then(function () {
            location.reload();
          });
        });
      }
    },
  },
};
</script>

<style></style>
