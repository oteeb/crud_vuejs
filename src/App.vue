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
              <h5>
                <router-link class="nav-link" to="/"
                  >Vue js CRUD Application</router-link
                >
              </h5>
            </li>
          </ul>
        </div>

        <form class="d-flex" role="search">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </nav>
<br>
    <div class="container">
      <div class="row">
        <div class="col">
          
        </div>
        <div class="col-10">
          <router-view></router-view>
        </div>
        <div class="col">


          <router-link to="/Create" type="button" class="btn btn-success"><i class="bi bi-plus-circle"></i> Add</router-link>


        </div>
      </div>
    </div>
    
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
