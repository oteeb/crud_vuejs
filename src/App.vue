<template>
  <div class="App">
    <nav
      class="navbar navbar-expand-lg navbar-dark bg-dark"
      aria-label="Tenth navbar example"
    >
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="navbarsExample08"
          aria-controls="navbarsExample08"
          aria_expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div
          class="collapse navbar-collapse justify-content-md-center"
          id="navbarsExample08"
        >
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link disabled">Vue js CRUD Application</a>
            </li>
            <li class="nav-item">
              <router-link class="nav-link active" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/Create">Create</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <br />

    <br />
    <router-view></router-view>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "home",
  data() {
    return {
      view: [],
      modelId: "",
      url: "https://dms-backend-dev-dxvb7izyka-as.a.run.app",
      loadingview: true,
      erroredview: false,
    };
  },
  methods: {
    cardetails() {
      axios
        .get(this.url + "/api/vehicle-model/show?", {
          params: {
            modelId: this.modelId,
          },
        })
        .then((response) => {
          this.view = response.data;
          //alert(JSON.stringify(this.view));
          console.log(this.view);
        })
        .catch((error) => {
          console.log(error);
          this.erroredview = true;
        })
        .finally(() => {
          this.loadingview = false;
          return;
        });
    },
  },
};
</script>

<style></style>
