<template>
  <div class="home mt-5">
    <br />
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="display-4">{{ $t("message.HomeTitle") }}</h1>
        <p class="lead">{{ $t("message.HomeDesc") }}</p>
      </div>
    </div>
    <div class="row">
      <div class="col-md-3 col-sm-6 col-xs-12">
        <div class="card bg-dark text-white">
          <div class="card-body">
            <h5 class="card-title">MongoDB</h5>
            <p class="card-text">{{ $t("message.MongoDb") }}</p>
            <a href="https://www.mongodb.com/" target="_blank" class="btn bg-white">More Info.</a>
          </div>
        </div>
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12">
        <div class="card bg-secondary text-white">
          <div class="card-body">
            <h5 class="card-title">PostgreSQL</h5>
            <p class="card-text">{{ $t("message.PostgreSQL") }}</p>
            <a href="https://www.postgresql.org/" target="_blank" class="btn bg-white">More Info.</a>
          </div>
        </div>
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12">
        <div class="card bg-danger text-white">
          <div class="card-body">
            <h5 class="card-title">Vue.js</h5>
            <p class="card-text">{{ $t("message.VueJs") }}</p>
            <a href="https://vuejs.org/" target="_blank" class="btn bg-white">More Info.</a>
          </div>
        </div>
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12">
        <div class="card bg-success text-white">
          <div class="card-body">
            <h5 class="card-title">Node.js</h5>
            <p class="card-text">{{ $t("message.NodeJs") }}</p>
            <a href="https://nodejs.org/" target="_blank" class="btn bg-white">More Info.</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>
