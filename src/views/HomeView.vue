<template>
  <div class="home">
    <!--View-->
    <div class="container">
      <div class="row">
        <div class="col">
          <h1>List car</h1>
          
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
                    <th scope="col"></th>
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
                      </button>&nbsp;
                      <router-link class="btn btn-secondary" :to="{name:'Update',params:{id:currency.modelId}}">Edit</router-link>
                    </td>
                  </tr>
                  Total = {{ view.total }}
                </tbody>
              </table>
            </div>
          </section>

          <br />

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
      modelId: "",
      url: "https://dms-backend-dev-dxvb7izyka-as.a.run.app",
      loadingview: true,
      erroredview: false,
    };
  },
  mounted() {
    console.log();
    this.ListUsers();
  },
  methods: {
    ListUsers() {
      axios
        .get(this.url + "/api/vehicle-model", {
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
    },

    alertttt(id) {
      
      if (confirm("ต้องการ ลบข้อมูล หรือ ไม่?")) {
        this.Delete(id);
        
      }
    },
    Delete(id) {
      axios
        .delete(this.url +"/api/vehicle-model/delete?", {
          params: {
            modelId: id,
          },
        })
        .then((response) => {
          this.view = response.data;
          console.log(this.view);
          alert(response.data.message);
          this.ListUsers();
        })
        .catch((error) => {
          console.log(error.message);
          alert(error.message);
        });
    },
  },
};
</script>


    