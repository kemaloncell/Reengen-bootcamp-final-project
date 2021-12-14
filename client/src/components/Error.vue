<template>
  <!-- <div v-if="alert" class="alert alert-danger">
    {{ msg }}
    <button type="button" @click="hideAlert()" class="close" data-dismiss="alert" aria-label="Close">&times;</button>
  </div>  -->
  <div class="alert alert-danger">
    {{ msg }}
    <button type="button" @click="hideAlert()" class="close" data-dismiss="alert" aria-label="Close">&times;</button>
  </div>
</template>

<script>
export default {
  props: ["msg"],
  data() {
    return {};
  },
  methods: {
    /* hideAlert() {
      this.alert = null;
    }, */
  },
};
</script>

<style scoped>
.alert {
  border-radius: 0px;
}
.alert-danger {
  background: rgb(240, 10, 10);
  color: #fff;
  border-radius: 6px;
}
</style>
