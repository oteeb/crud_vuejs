<template>
  <div class="home">
    <!--View-->
    <div class="container">
      <div class="row">
        <div class="col">
          <h1>List car</h1>

          <div class="card w-50">
            <div class="card-body">
              <div class="form-group">
                <label for="exampleInputEmail1">page</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter page"
                  v-model="page"
                />
                <small class="form-text text-muted">Enter your page .</small>
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">perPage</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter page"
                  v-model="perPage"
                />
                <small class="form-text text-muted">Enter your perPage .</small>
              </div>
              <button
                type="button"
                class="btn btn-primary"
                @click.prevent="ListUsers"
              >
                View
              </button>
              <br /><br />

            </div>
          </div>
          
          <br />
          <section v-if="erroredview">
            <p>
              ขออภัย เราไม่สามารถเรียกข้อมูลนี้ได้ในขณะนี้
              โปรดลองอีกครั้งในภายหลัง
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
                  <tr
                    v-for="currency in view.data"
                    v-bind:key="currency.modelId"
                  >
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
                  Total = {{ view.total }}
                </tbody>
              </table>
            </div>
          </section>

          <br />

          <h1>Car Brand</h1>

          <div class="card w-50">
            <div class="card-body">
              <div class="form-group">
                <label for="exampleInputEmail1">Brand</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter brand"
                  v-model="brand"
                />
                <small class="form-text text-muted">Enter your page .</small>
              </div>
              <button
                type="button"
                class="btn btn-primary"
                @click.prevent="ListUsers"
              >
                View
              </button>
            </div>
          </div>


          <br />
          <section v-if="erroredview">
            <p>
              ขออภัย เราไม่สามารถเรียกข้อมูลนี้ได้ในขณะนี้
              โปรดลองอีกครั้งในภายหลัง
            </p>
          </section>

          <section v-else>
            <div v-if="loadingview">Loading...</div>

            <div v-else>
              <table class="table table-sm">
                <thead>
                  <tr>
                    <th scope="col">BrandId</th>
                    <th scope="col">BrandName</th>

                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="currency in viewbrand"
                    v-bind:key="currency.brandId"
                  >
                    <th scope="row">{{ currency.brandId }}</th>
                    <td>{{ currency.brandName }}</td>

                    <td>
                      <button
                        type="button"
                        class="btn btn-danger"
                        @click="alertttt(currency.brandId)"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>


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
      viewbrand: [],
      page: 1,
      perPage: 5,
      brandID: "",
      modelCode: "",
      name: "",
      brand: "hon",
      modelId: 40,
      url: "https://dms-backend-dev-dxvb7izyka-as.a.run.app",
      loadingview: true,
      erroredview: false,
    };
  },
  mounted() {
    this.ListUsers();
  },
  methods: {
    ListUsers() {
      axios
        .get(this.url + "/api/vehicle-model?", {
          params: {
            page: this.page,
            perPage: this.perPage,
          },
        })
        .then((response) => {
          this.view = response.data;
          console.log(this.view);
        })
        .catch((error) => {
          console.log(error);
          this.erroredview = true;
        })
        .finally(() => (this.loadingview = false));

      axios
        .get(this.url + "/api/vehicle-model/brand", {
          params: {
            brand: this.brand,
          },
        })
        .then((response) => {
          this.viewbrand = response.data;
          console.log(this.viewbrand);
        })
        .catch((error) => {
          console.log(error);
          this.erroredview = true;
        });
    },

    alertttt() {
      if (confirm("ต้องการ ลบข้อมูล หรือ ไม่?")) {
        this.Delete();
      }
    },
    Delete(id) {
      axios
        .delete("https://reqres.in/api/users/", {
          params: {
            id: id,
          },
        })
        .then((response) => {
          this.view = response.data;
          console.log(this.view);
          alert("ลบข้อมูลสำเสร็จ");
        });
    },
    cardetails(){

      axios
        .get(this.url + "/api/vehicle-model/show?", {
          params: {
            modelId: this.modelId,
            
          },
        })
        .then((response) => {
          this.view = response.data;
          alert(JSON.stringify(this.view));
          console.log(this.view);
        })
        .catch((error) => {
          console.log(error);
          this.erroredview = true;
        })
        .finally(() => (this.loadingview = false));

    },
  },
};
</script>
