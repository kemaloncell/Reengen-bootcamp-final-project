<template>
  <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="container d-flex w justify-content-center">
      <div class="modal-dialog" role="document">
        <!-- Error component -->
        <Error v-if="error" :msg="error" />
        <div class="modal-content p-4">
          <button type="button" class="close x" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <div class="modal-header border-0 mb-2">
            <h5 class="modal-title" id="exampleModalLabel">Login</h5>

            <!-- <button type="button" class="close" aria-label="Close" data-target="#register" disabled="true"><span aria-hidden="true">Log in</span></button> -->
          </div>

          <div class="modal-body">
            <!-- <h3 class="mb-4 title">Log In<br /></h3> -->
            <!-- Email -->
            <div class="form-group">
              <input type="text" id="email" v-model="email" class="form-control p-0" required style="box-shadow: none; border-radius: 0px" />
              <label class="form-control-placeholder p-0" for="name">Email</label>
            </div>
            <!-- Password -->
            <div class="form-group">
              <input type="password" id="password" v-model="password" class="form-control p-0" required style="box-shadow: none; border-radius: 0px" />
              <label class="form-control-placeholder p-0" for="password">Password</label>
            </div>
            <!-- Remember checkbox -->
            <div class="form-group">
              <input type="checkbox" v-model="remember" id="box-1" />
              <label for="box-1">Remember me</label>
            </div>
          </div>
          <div class="modal-footer border-0 mb-4"><button type="button" @click="loginUser" class="btn signup col-6 col-md-6">LOGIN</button></div>
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
      email: "",
      password: "",
      remember: true,
    };
  },
  computed: {
    ...mapGetters(["error"]),
  },
  methods: {
    ...mapActions(["login"]),
    loginUser() {
      let user = {
        email: this.email,
        password: this.password,
        remember: this.remember,
      };
      this.login(user)
        .then((res) => {
          if (res.data.success) {
            // this.$swal("Hello Vue world!!!");
            this.$router.push("/dashboard");
          }
        })
        .catch((err) => {
          console.log(err);
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

/*Checkboxes styles*/
input[type="checkbox"] {
  display: none;
}

input[type="checkbox"] + label {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 20px;
  font: 14px/20px "Open Sans", Arial, sans-serif;
  color: #ddd;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

input[type="checkbox"] + label:last-child {
  margin-bottom: 0;
}

input[type="checkbox"] + label:before {
  content: "";
  display: block;
  width: 20px;
  height: 20px;
  border: 1px solid #6cc0e5;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0.6;
  -webkit-transition: all 0.12s, border-color 0.08s;
  transition: all 0.12s, border-color 0.08s;
}

input[type="checkbox"]:checked + label:before {
  width: 10px;
  top: -5px;
  left: 5px;
  border-radius: 0;
  opacity: 1;
  border-top-color: transparent;
  border-left-color: transparent;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
