<template>
  <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="container d-flex justify-content-center">
      <div class="modal-dialog" role="document">
        <!-- Error component -->
        <Error v-if="error" :msg="error" />
        <div class="modal-content p-4">
          <button type="button" class="close x" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <div class="modal-header border-0 mb-2">
            <h5 class="modal-title" id="exampleModalLabel">Register</h5>
            <!--    <button type="button" class="close" aria-label="Close" disabled="true"><span aria-hidden="true">Log in</span></button> -->
          </div>
          <div class="modal-body">
            <!-- <h3 class="mb-4 title">New<br />Account</h3> -->
            <div class="form-group">
              <input type="text" id="name" v-model="name" class="form-control p-0" required style="box-shadow: none; border-radius: 0px" />
              <label class="form-control-placeholder p-0" for="name lbl">Full Name</label>
            </div>
            <div class="form-group">
              <input type="text" id="email" v-model="email" class="form-control p-0" required style="box-shadow: none; border-radius: 0px" />
              <label class="form-control-placeholder p-0" for="name">Email</label>
            </div>
            <div class="form-group">
              <select v-model="role" class="form-control" required style="box-shadow: none; border-radius: 0px">
                <option disabled selected>Please choose one</option>
                <option>Admin</option>
                <option>Editor</option>
              </select>
              <label class="form-control-placeholder p-0" for="name">Role</label>
            </div>
            <div class="form-group">
              <input type="password" id="password" v-model="password" class="form-control p-0" required style="box-shadow: none; border-radius: 0px" />
              <label class="form-control-placeholder p-0" for="password">Password</label>
            </div>
            <div class="form-group">
              <input type="password" id="confirm_password" v-model="confirm_password" class="form-control p-0" required style="box-shadow: none; border-radius: 0px" />
              <label class="form-control-placeholder p-0" for="password">Confirm Password</label>
            </div>

            <label class="tc">By signing up I accept the <strong>Terms & Conditions</strong> of Daily</label>
          </div>
          <div class="modal-footer border-0 mb-4"><button type="button" class="btn signup col-6 col-md-6" @click="registerUser">SIGNUP</button></div>
          <!-- data-dismiss="modal" -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Error from "../Error.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    Error,
  },
  data() {
    return {
      name: "",
      email: "",
      role: "",
      password: "",
      confirm_password: "",
    };
  },
  computed: {
    ...mapGetters(["error"]),
  },
  methods: {
    ...mapActions(["register"]),
    registerUser() {
      let user = {
        name: this.name,
        email: this.email,
        role: this.role,
        password: this.password,
        confirm_password: this.confirm_password,
      };
      this.register(user).then((res) => {
        if (res.data.success) {
          this.$router.push("/");
        }
      });
    },
  },
};
</script>

<style scoped>
body {
  background-color: #7e57c2;
}

.container {
  margin-top: 100px;
}

.form-group {
  position: relative;
  margin-bottom: 1.5rem;
}

.form-control-placeholder {
  position: absolute;
  top: 0;
  padding: 7px 0 0 13px;
  transition: all 200ms;
  opacity: 0.5;
  color: grey;
}

.form-control:focus + .form-control-placeholder,
.form-control:valid + .form-control-placeholder {
  font-size: 75%;
  transform: translate3d(0, -100%, 0);
  opacity: 1;
}

.form-control {
  background: transparent;
  border: none;
  border-bottom: 1px solid grey;
}

input.form-control:focus,
input.form-control:after {
  outline-width: 0;
  border-bottom: 1px solid aqua;
  background: transparent;
}

.modal-content {
  color: white;
  background-image: radial-gradient(circle 919px at 1.7% 6.1%, rgb(12, 12, 12) 0%, rgba(14, 14, 14, 0.85) 100.2%);
}

.modal-title {
  color: aqua;
}

.modal {
  background-image: radial-gradient(circle 919px at 1.7% 6.1%, rgba(41, 58, 76, 1) 0%, rgba(40, 171, 226, 1) 100.2%);
}

.tc {
  font-size: 12px;
}

.modal-footer {
  justify-content: flex-start;
}

.signup {
  background: rgb(20, 155, 224);
  background: linear-gradient(90deg, rgba(20, 155, 224, 1) 0%, rgba(0, 49, 78, 1) 100%);
  border-radius: 34rem;
  border: none;
  color: white;
  font-size: 14px;
  font-weight: bold;
  height: 46px;
}

.close {
  color: aqua;
  font-size: 12px;
  position: relative;
  top: 20px;
}

h5 {
  font-size: 2rem;
  font-weight: 900;
}

.title {
  font-size: 2.25rem;
  font-weight: 700;
}

.x {
  color: grey;
  font-size: 40px;
  font-weight: 100;
  display: flex;
  flex-direction: row-reverse;
  top: 0;
}

.btn.focus,
.btn:focus {
  outline: 0;
  box-shadow: none !important;
}

.btn:hover {
  opacity: 0.6;
  transition: 1s;
}
.x.focus,
.x:focus {
  outline: 0;
  box-shadow: none !important;
}
select option {
  background: rgb(27, 27, 27);
}
</style>
