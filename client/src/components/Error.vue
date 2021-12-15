<template>
  <div v-if="msg ? showMessage() : null" class="alert alert-danger" role="alert">
    {{ msg }}
  </div>
</template>

<script>
export default {
  props: ["msg"],
  methods: {
    showMessage() {
      this.$swal({ icon: "error", title: "Oops...", text: this.msg });
    },
  },
};
</script>
