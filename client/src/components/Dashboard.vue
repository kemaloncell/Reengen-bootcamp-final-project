<template>
  <div>
    <section id="tabs" class="project-tab mt-5">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <nav>
              <div class="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" data-target="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Project Tab 1</a>
                <a class="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" data-target="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Project Tab 2 </a>
              </div>
            </nav>
            <div class="tab-content" id="nav-tabContent">
              <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                <div class="container-xl">
                  <div class="table-responsive">
                    <div class="table-wrapper">
                      <div class="table-title">
                        <div class="row">
                          <div class="col-sm-6">
                            <h2>Factory <b>List</b></h2>
                          </div>
                          <div class="col-sm-6">
                            <a href="#addColumnModal" class="btn btn-success" data-toggle="modal"><i class="material-icons">&#xE147;</i> <span>Add New Column</span></a>
                            <!--         <a href="#deleteEmployeeModal" class="btn btn-danger" data-toggle="modal"><i class="material-icons">&#xE15C;</i> <span>Delete</span></a> -->
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
              </div>
              <!-- Second Tab Start -->
              <div class="tab-pane fade show active" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                <div class="container-xl">
                  <div class="table-responsive">
                    <div class="table-wrapper">
                      <div class="table-title">
                        <div class="row">
                          <div class="col-sm-6">
                            <h2>Manage <b>Employees</b></h2>
                          </div>
                          <div class="col-sm-6">
                            <a href="#addEmployeeModal" class="btn btn-success" data-toggle="modal"><i class="material-icons">&#xE147;</i> <span>Add New Employee</span></a>
                            <a href="#deleteEmployeeModal" class="btn btn-danger" data-toggle="modal"><i class="material-icons">&#xE15C;</i> <span>Delete</span></a>
                          </div>
                        </div>
                      </div>
                      <table class="table table-striped table-hover">
                        <thead>
                          <tr>
                            <th>
                              <span class="custom-checkbox">
                                <input type="checkbox" id="selectAll" />
                                <label for="selectAll"></label>
                              </span>
                            </th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <span class="custom-checkbox">
                                <input type="checkbox" id="checkbox1" name="options[]" value="1" />
                                <label for="checkbox1"></label>
                              </span>
                            </td>
                            <td>Thomas Hardy123123123</td>
                            <td>thomashardy@mail.com</td>
                            <td>89 Chiaroscuro Rd, Portland, USA</td>
                            <td>(171) 555-2222</td>
                            <td>
                              <a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                              <a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span class="custom-checkbox">
                                <input type="checkbox" id="checkbox2" name="options[]" value="1" />
                                <label for="checkbox2"></label>
                              </span>
                            </td>
                            <td>Dominique Perrier</td>
                            <td>dominiqueperrier@mail.com</td>
                            <td>Obere Str. 57, Berlin, Germany</td>
                            <td>(313) 555-5735</td>
                            <td>
                              <a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                              <a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span class="custom-checkbox">
                                <input type="checkbox" id="checkbox3" name="options[]" value="1" />
                                <label for="checkbox3"></label>
                              </span>
                            </td>
                            <td>Maria Anders</td>
                            <td>mariaanders@mail.com</td>
                            <td>25, rue Lauriston, Paris, France</td>
                            <td>(503) 555-9931</td>
                            <td>
                              <a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                              <a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span class="custom-checkbox">
                                <input type="checkbox" id="checkbox4" name="options[]" value="1" />
                                <label for="checkbox4"></label>
                              </span>
                            </td>
                            <td>Fran Wilson</td>
                            <td>franwilson@mail.com</td>
                            <td>C/ Araquil, 67, Madrid, Spain</td>
                            <td>(204) 619-5731</td>
                            <td>
                              <a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                              <a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <span class="custom-checkbox">
                                <input type="checkbox" id="checkbox5" name="options[]" value="1" />
                                <label for="checkbox5"></label>
                              </span>
                            </td>
                            <td>Martin Blank</td>
                            <td>martinblank@mail.com</td>
                            <td>Via Monte Bianco 34, Turin, Italy</td>
                            <td>(480) 631-2097</td>
                            <td>
                              <a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                              <a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Second Tab End-->
            </div>
          </div>
        </div>
      </div>
    </section>

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
import updateRowModal from "../components/modals/UpdateRowModal.vue";
import addColumnModal from "../components/modals/AddColumnModal.vue";
import deleteRowModal from "../components/modals/DeleteRowModal.vue";
import deleteColumnModal from "../components/modals/DeleteColumnModal.vue";
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

<style>
body {
  color: #566787;
  background: #f5f5f5;
  font-family: "Varela Round", sans-serif;
  font-size: 13px;
}
.table-responsive {
  margin: 30px 0;
}
.table-wrapper {
  background: #fff;
  padding: 20px 25px;
  border-radius: 3px;
  min-width: 1000px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
}
.table-title {
  padding-bottom: 15px;
  background: #435d7d;
  color: #fff;
  padding: 16px 30px;
  min-width: 100%;
  margin: -20px -25px 10px;
  border-radius: 3px 3px 0 0;
}
.table-title h2 {
  margin: 5px 0 0;
  font-size: 24px;
}
.table-title .btn-group {
  float: right;
}
.table-title .btn {
  color: #fff;
  float: right;
  font-size: 13px;
  border: none;
  min-width: 50px;
  border-radius: 2px;
  border: none;
  outline: none !important;
  margin-left: 10px;
}
.table-title .btn i {
  float: left;
  font-size: 21px;
  margin-right: 5px;
}
.table-title .btn span {
  float: left;
  margin-top: 2px;
}
table.table tr th,
table.table tr td {
  border-color: #e9e9e9;
  padding: 12px 15px;
  vertical-align: middle;
  text-align: center;
}

table.table-striped tbody tr:nth-of-type(odd) {
  background-color: #fcfcfc;
}
table.table-striped.table-hover tbody tr:hover {
  background: #f5f5f5;
}
table.table th i {
  font-size: 13px;
  margin: 0 5px;
  cursor: pointer;
  color: red;
}
table.table td:last-child i {
  opacity: 0.9;
  font-size: 22px;
  margin: 0 5px;
}
table.table td a {
  font-weight: bold;
  color: #566787;
  display: inline-block;
  text-decoration: none;
  outline: none !important;
}
table.table td a:hover {
  color: #2196f3;
}
table.table td a.edit {
  color: #ffc107;
}
table.table td a.delete {
  color: #f44336;
}
table.table td i {
  font-size: 19px;
}
table.table .avatar {
  border-radius: 50%;
  vertical-align: middle;
  margin-right: 10px;
}

.hint-text {
  float: left;
  margin-top: 10px;
  font-size: 13px;
}

/* Modal styles */
.modal .modal-dialog {
  max-width: 400px;
}
.modal .modal-header,
.modal .modal-body,
.modal .modal-footer {
  padding: 20px 30px;
}
.modal .modal-content {
  border-radius: 3px;
  font-size: 14px;
}
.modal .modal-footer {
  background: #ecf0f1;
  border-radius: 0 0 3px 3px;
}
.modal .modal-title {
  display: inline-block;
}
.modal .form-control {
  border-radius: 2px;
  box-shadow: none;
  border-color: #dddddd;
}
.modal textarea.form-control {
  resize: vertical;
}
.modal .btn {
  border-radius: 2px;
  min-width: 100px;
}
.modal form label {
  font-weight: normal;
}
</style>
