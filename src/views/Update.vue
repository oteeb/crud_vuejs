<template>
  <div class="Updates">
    {{ this.$route.params.id }}
    <!--Update-->
    <div class="container">
      <div class="row">
        <div class="col"></div>
        <div class="col-6">
          <form @submit.prevent="Update">
            <h1>Edit</h1>
            <div class="row">
              <div class="form-group">
                <label for="exampleInputEmail1">ModelId</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter BrandID"
                  v-model="applicantUpdate.modelId"
                />
                <small class="form-text text-muted">Enter your ModelId .</small>
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">BrandID</label>
                  
                <select class="form-control" >
                  <option disabled value="">Please select one</option>
                  <option v-for="currency in viewbrand" v-bind:key="currency.brandId">
                    {{ currency.brandName }}
                  </option>
                </select>


                <small class="form-text text-muted">Enter your BrandID .</small>
              </div>

              <div></div>

              <div class="form-group">
                <label for="exampleInputPassword1">ModelCode</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="MD-"
                  v-model="applicantUpdate.modelCode"
                />
                <small class="form-text text-muted"
                  >Enter your ModelCode .</small
                >
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Name</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Name"
                  v-model="applicantUpdate.name"
                />
                <small class="form-text text-muted">Enter your Name .</small>
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">ModelYear</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="ModelYear"
                  v-model="applicantUpdate.modelYear"
                />
                <small class="form-text text-muted"
                  >Enter your ModelYear .</small
                >
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Fuel</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Fuel"
                  v-model="applicantUpdate.fuel"
                />
                <small class="form-text text-muted">Enter your Fuel .</small>
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
              &nbsp;
              <button type="button" class="btn btn-danger" @click="Clear">
                Clear
              </button>
              <p class="center">#Spy {{ JSON.stringify(applicantUpdate) }}</p>
            </div>
          </form>
        </div>
        <div class="col"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Updates",
  data() {
    return {
      viewbrand: [],
      url: "https://dms-backend-dev-dxvb7izyka-as.a.run.app",
      applicantUpdate: {
        modelId: "",
        brandId: "",
        modelCode: "",
        name: "",
        modelYear: "",
        fuel: "",
      },
    };
  },

  mounted() {
    this.carbrand();
  },
  methods: {
    Clear() {
      this.applicantUpdate.modelId = "";
      this.applicantUpdate.brandId = "";
      this.applicantUpdate.modelCode = "";
      this.applicantUpdate.name = "";
      this.applicantUpdate.modelYear = "";
      this.applicantUpdate.fuel = "";
    },
    Update() {
      if (!this.applicantUpdate.modelId) {
        alert("กรุณากรอก ModelId !!");
        return;
      }
      if (!this.applicantUpdate.job) {
        alert("กรุณากรอก Job !!");
        return;
      }
      if (this.applicantUpdate) {
        axios
          .put("https://reqres.in/api/users/2", {
            name: this.applicantUpdate.name,
            job: this.applicantUpdate.job,
          })
          .then((response) => {
            this.applicantUpdate = response.data;
            console.log(this.applicantUpdate);
            alert("Update สำเสร็จ");
          })
          .catch((error) => {
            console.log(error);
            alert(error);
          });
      }
    },
    carbrand() {
      axios
        .get(this.url + "/api/vehicle-model/brand", {})
        .then((response) => {
          this.viewbrand = response.data;
          console.log(this.viewbrand);
        })
        .catch((error) => {
          console.log(error);
          this.erroredview = true;
        });
    },
  },
};
</script>

<style scoped></style>
