<template>
  <div class="home">
    <!--View-->
    <div class="container">
      <div class="row">
        <div class="col">
          <h1>รายการรถ</h1>
          
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
                    <th scope="col">รหัส (ระบบ) รุ่นรถ</th>

                    <th scope="col">รหัสรุ่นรถ</th>
                    <th scope="col">ชื่อรุ่นรถ</th>
                    <th scope="col">ยี่ห้อรถ</th>
                    <th scope="col">ปีรถ</th>
                    <th scope="col">การใช้น้ำมัน</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="views in view.data"
                    v-bind:key="views.modelId"
                  >
                    <th scope="row">{{ views.modelId }}</th>
                    <td>{{ views.modelCode }}</td>
                    <td>{{ views.name }}</td>
                    <td>{{ views.brandName }}</td>
                    <td>{{ views.modelYear }}</td>
                    <td v-if="views.fuel === 'D'">{{ viewfuel.D }}</td>
                    <td v-if="views.fuel === 'S'">{{ viewfuel.S }}</td>
                    
                    <td>
                      <router-link class="btn btn-secondary" :to="{name:'Update',params:{id:views.modelId}}"><i class="bi bi-pencil-square"></i></router-link>
                      &nbsp;<button
                        type="button"
                        class="btn btn-danger"
                        @click="Deletealert(views.modelId)"
                      >
                        <i class="bi bi-trash"></i>
                      </button>
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
      viewfuel: "",
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
          this.viewfuel = response.data.statusLabel.fuel
          //console.log(this.view);
          
        })
        .catch((error) => {
          console.log(error);
          this.erroredview = true;
        })
        .finally(() => (this.loadingview = false));
    },

    Deletealert(id) {
      
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


    