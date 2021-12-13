<template>
  <div class="modal fade">
    <div class="modal-dialog">
      <div class="modal-content">
        <form>
          <div class="modal-header">
            <h4 class="modal-title">Add Employee</h4>
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label>Column Name</label>
              <input v-model="column_name" type="text" class="form-control" required />
            </div>

            <label>Column Type</label>
            <select v-model="column_type" class="browser-default custom-select">
              <option v-for="items in columnTypes" :key="items">{{ items }}</option>
            </select>
          </div>
          <div class="modal-footer">
            <input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel" />
            <input type="submit" class="btn btn-success" value="Add" @click="addFactoryColumn" />
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
      this.register(addColumn).then(() => {
        this.$router.push("/");
      });
    },
  },
};
</script>

<style></style>
