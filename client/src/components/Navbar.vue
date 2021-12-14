<template>
  <div>
    <nav class="navbar navbar-dark navbar-expand-md fixed-top bg-dark">
      <div class="container-fluid">
        <!-- for mobil nav -->
        <a class="navbar-brand" href="/" v-if="user"
          >Welcome <b>{{ user.name }}</b></a
        ><button data-toggle="collapse" aria-hidden="true" class="navbar-toggler" data-target="#navcol-1"><span class="sr-only">Toggle navigation</span><span class="navbar-toggler-icon"></span></button>

        <div class="collapse navbar-collapse" id="navcol-1">
          <ul class="nav navbar-nav ml-auto">
            <li class="nav-item" v-if="!isLoggedIn">
              <!-- <router-link class="nav-link" to="/login" tag="a"><i class="fa fa-sign-in"></i> Login</router-link> -->
              <a class="nav-link" data-toggle="modal" role="button" data-target="#login"><i class="fa fa-sign-in"> </i> Log In</a>
            </li>
            <li class="nav-item" v-if="!isLoggedIn">
              <!--  <router-link class="nav-link" to="#register" tag="a"><i class="fa fa-user-plus"></i> Register</router-link> -->
              <a class="nav-link" data-toggle="modal" role="button" data-target="#register"><i class="fa fa-user-plus"> </i> Sign Up</a>
            </li>
            <!-- Language -->
            <li class="nav-item dropdown ml-2">
              <a class="nav-link dropdown-toggle" role="button" data-toggle="dropdown"><i class="fas fa-globe"></i> Lang</a>
              <div class="dropdown-menu" aria-labelledby="dropdown09">
                <a class="dropdown-item" role="button" @click="changeLanguage('en')"><img src="../assets/united-kingdom.png" width="20" height="20" alt="flag" /> English</a>
                <a class="dropdown-item" role="button" @click="changeLanguage('tr')"><img src="../assets/turkey.png" width="20" height="20" alt="flag" /> Turkish</a>
              </div>
            </li>
            <!-- User Settings -->
            <li class="nav-item dropdown ml-2 nav-user" role="button" v-if="isLoggedIn">
              <a class="nav-link nav-user-img" href="#" id="navbarDropdownMenuLink2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <img src="https://img.icons8.com/dusk/100/000000/user-female-circle.png" alt="" class="user-avatar-md rounded-circle" /></a>
              <div class="dropdown-menu dropdown-menu-right nav-user-dropdown" aria-labelledby="navbarDropdownMenuLink2">
                <div class="nav-user-info">
                  <h5 class="mb-0 text-white nav-user-name" v-if="user">{{ user.name }}</h5>
                  <span class="status"></span><span class="ml-2">Available</span>
                </div>
                <a class="dropdown-item" href="#"><i class="fas fa-user mr-2"></i>Account</a>
                <a class="dropdown-item" href="#"><i class="fas fa-cog mr-2"></i>Setting</a>
                <a class="dropdown-item" @click.prevent="logoutUser"><i class="fas fa-power-off mr-2"></i>Logout</a>
              </div>
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

import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    LoginModal,
    RegisterModal,
  },
  created() {
    // get user name
    this.getProfile();
    // default language
    if (localStorage.getItem("lang") == null) {
      localStorage.setItem("lang", "en");
    }
  },
  computed: {
    ...mapGetters(["isLoggedIn", "user"]),
  },
  methods: {
    ...mapActions(["logout", "getProfile"]),
    logoutUser() {
      this.logout();
      window.location.reload();
    },

    // method of language
    changeLanguage(event) {
      localStorage.setItem("lang", event);
      window.location.reload();
    },
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

/* Navbar Profile Settings*/

.nav-user {
}

.nav-user-dropdown {
  padding: 0px;
  min-width: 230px;
  margin: 0px;
}

.nav-user-name {
}

.nav-user-info {
  background-color: #5969ff;
  line-height: 1.4;
  padding: 12px;
  color: #fff;
  font-size: 13px;
  border-radius: 2px 2px 0 0;
}

.nav-user-info .status {
  float: left;
  top: 7px;
  left: 0px;
}

.nav-user-dropdown {
}

.nav-user-dropdown .dropdown-item {
  display: block;
  width: 100%;
  padding: 12px 22px 15px;
  clear: both;
  font-weight: 400;
  color: #686972;
  text-align: inherit;
  white-space: nowrap;
  background-color: transparent;
  border: 0;
  font-size: 13px;
  line-height: 0.4;
}

.nav-user-dropdown .dropdown-item:hover {
  background-color: grey;
  color: white;
}

.user-avatar-xxl {
  height: 128px;
  width: 128px;
}

.user-avatar-xl {
  height: 90px;
  width: 90px;
}

.user-avatar-lg {
  height: 48px;
  width: 48px;
}

.user-avatar-md {
  height: 32px;
  width: 32px;
}

.user-avatar-sm {
  height: 24px;
  width: 24px;
}

.user-avatar-xs {
  height: 18px;
  width: 18px;
}

.avatar {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  border: 2px solid #f7f9fa;
  background: #f7f9fa;
  color: #fff;
}

.media-attachment div.avatar {
  border: none;
}

.avatar.bg-primary {
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar.bg-primary i {
  font-size: 14px;
}
</style>
