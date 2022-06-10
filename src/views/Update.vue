<template>
  <div class="Updates">
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
                  disabled
                />
                <small class="form-text text-muted">Enter your ModelId .</small>
              </div>
              <div class="form-group">
                <label for="exampleInputEmail1">BrandID</label>
                  
                <select v-model="applicantUpdate.brandId" class="form-control" >
                  <option disabled value="">Please select one</option>
                  <option v-for="currency in viewbrand" v-bind:value="currency.brandId">
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
    console.log(this.$route.params.id );
    this.carbrand();
    this.cardetails();
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
      
      if (this.applicantUpdate) {
        axios
          .put(this.url + "/api/vehicle-model/update", {
            modelId: this.applicantUpdate.modelId,
            brandId: this.applicantUpdate.brandId,
            modelCode: this.applicantUpdate.modelCode,
            name: this.applicantUpdate.name,
            modelYear: this.applicantUpdate.modelYear,
            fuel: this.applicantUpdate.fuel,
          })
          .then((response) => {
            this.applicantUpdate = response.data;
            console.log(this.applicantUpdate);
            alert(response.data.message);
            this.$router.push({name:'home'});
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
    cardetails() {
      axios
        .get(this.url + "/api/vehicle-model/show", {
          params: {
            modelId: this.$route.params.id,
          },
        })
        .then((response) => {

          this.applicantUpdate.modelId = response.data.data.modelId;
          this.applicantUpdate.brandId = response.data.data.brandId;
          this.applicantUpdate.modelCode = response.data.data.modelCode;
          this.applicantUpdate.name = response.data.data.name;
          this.applicantUpdate.modelYear = response.data.data.modelYear;
          this.applicantUpdate.fuel = response.data.data.fuel;
          //alert(JSON.stringify(this.view));
          console.log(this.response.data.data);
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

<style scoped></style>
