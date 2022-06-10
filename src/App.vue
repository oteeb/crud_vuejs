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
            <li class="nav-item">
              <router-link class="nav-link" to="/Update">Update</router-link>
            </li>
          </ul>
        </div>

        <form class="form-inline my-2 my-lg-0" @submit.prevent="cardetails">
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="basic-addon2"
              v-model="modelId"
            />
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="submit">
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    </nav>

    <br />
    <h1>View Search</h1>
    <section v-if="erroredview">
      <p>
        ขออภัย เราไม่สามารถเรียกข้อมูลนี้ได้ในขณะนี้ โปรดลองอีกครั้งในภายหลัง
      </p>
    </section>

    <section v-else>
      <div v-if="loadingview">Loading...</div>

      <div v-else>
        <table class="table table-sm">
          <thead>
            <tr>
              <th scope="col">ModelId</th>

              <th scope="col">ModelCode</th>
              <th scope="col">Name</th>
              <th scope="col">BrandName</th>
              <th scope="col">ModelYear</th>
              <th scope="col">Fuel</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="currency in view" v-bind:key="currency.modelId">
              <th scope="row">{{ currency.modelId }}</th>

              <td>{{ currency.modelCode }}</td>
              <td>{{ currency.name }}</td>
              <td>{{ currency.brandName }}</td>
              <td>{{ currency.modelYear }}</td>
              <td>{{ currency.fuel }}</td>
              <td>
                <button
                  type="button"
                  class="btn btn-danger"
                  @click="alertttt(currency.modelId)"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
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
