<template>
  <div>
    <nav class="navbar navbar-dark navbar-expand-md fixed-top bg-dark">
      <div class="container-fluid">
        <!-- for mobil nav -->
        <a class="navbar-brand" href="/">Welcome name</a><button data-toggle="collapse" aria-hidden="true" class="navbar-toggler" data-target="#navcol-1"><span class="sr-only">Toggle navigation</span><span class="navbar-toggler-icon"></span></button>

        <div class="collapse navbar-collapse" id="navcol-1">
          <ul class="nav navbar-nav ml-auto">
            <li class="nav-item" v-if="!isLoggedIn">
              <!-- <router-link class="nav-link" to="/login" tag="a"><i class="fa fa-sign-in"></i> Login</router-link> -->
              <a class="nav-link" data-toggle="modal" role="button" data-target="#login"><i class="fa fa-sign-in"> </i> Login</a>
            </li>
            <li class="nav-item" role="presentation" v-if="!isLoggedIn">
              <!--  <router-link class="nav-link" to="#register" tag="a"><i class="fa fa-user-plus"></i> Register</router-link> -->
              <a class="nav-link" data-toggle="modal" role="button" data-target="#register"><i class="fa fa-user-plus"> </i> Register</a>
            </li>

            <li class="nav-item ml-2" role="presentation">
              <a class="nav-link" href="#"><i class="fas fa-globe"></i></a>
            </li>
            <li class="nav-item ml-2" role="presentation" v-if="isLoggedIn">
              <a class="nav-link" href="#"><i class="fas fa-user">Pro</i></a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!-- login Modal -->
    <login-modal id="login" />
    <!-- Register Modal -->
    <register-modal id="register" />
  </div>
</template>

<script>
import LoginModal from "./modals/LoginModal.vue";
import RegisterModal from "./modals/RegisterModal.vue";

import { mapGetters } from "vuex";
export default {
  components: {
    LoginModal,
    RegisterModal,
  },
  computed: {
    ...mapGetters(["isLoggedIn"]),
  },
};
</script>

<style scoped>
body {
  margin: 0;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  text-align: left;
  background-color: rgba(82, 108, 245, 0.64);
}

#navcol-1 {
  font-size: 18px;
}

@media (max-width: 576px) {
  .navbar-dark .navbar-nav .nav-link {
    float: right;
  }
}
</style>
