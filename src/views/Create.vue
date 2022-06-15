<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col"></div>
        <div class="col-6">
          <form @submit="CreateForm">
            <h1>Create</h1>
            <div class="row">
              <div class="form-group">
                <label for="exampleInputEmail1">เลือกยี่ห้อรถ</label>

                <select v-model="applicant.brandId" class="form-control" >
                  <option disabled value="">Please select one</option>
                  <option v-for="currency in viewbrand" v-bind:value="currency.brandId">
                    {{ currency.brandName }}
                  </option>
                </select>
                <small class="form-text text-muted">กรุณาเลือกยี่ห้อรถ</small>
              </div>

              <div class="form-group">
                <label for="exampleInputPassword1">รหัสรุ่นรถ</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="MD-"
                  v-model="applicant.modelCode"
                />
                <small class="form-text text-muted"
                  >กรุณากรอกรหัสรุ่นรถ</small
                >
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">ชื่อรุ่นรถ</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Name"
                  v-model="applicant.name"
                />
                <small class="form-text text-muted"
                  >กรุณากรอกชื่อรุ่นรถ</small
                >
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">ปีรถ</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="ModelYear"
                  v-model="applicant.modelYear"
                />
                <small class="form-text text-muted"
                  >กรุณากรอกปีรถ</small
                >
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">การใช้น้ำมัน</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Fuel"
                  v-model="applicant.fuel"
                />
                <small class="form-text text-muted"
                  >กรุณาเลือก D = ดีเซล , S = เบนซิน</small
                >

                  <br>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1">
                    <label class="form-check-label" for="inlineRadio1">D</label>
                  </div><br>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2">
                    <label class="form-check-label" for="inlineRadio2">S</label>
                  </div>


              </div>

              <button type="submit" class="btn btn-primary">Submit</button>
              &nbsp;&nbsp;
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
  name: "User",
  data() {
    return {
      viewbrand: [],
      loading: true,
      errored: false,
      url: "https://dms-backend-dev-dxvb7izyka-as.a.run.app",

      applicant: {
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
      this.applicant.brandId = "";
      this.applicant.modelCode = "";
      this.applicant.name = "";
      this.applicant.modelYear = "";
      this.applicant.fuel = "";
    },
    CreateForm(event) {
      if (!this.applicant.brandId) {
        alert("กรุณากรอก BrandId !!");
        return;
      }
      if(!this.applicant.modelCode){
        alert("กรุณากรอก ModelCode !!");
        return;
      }
      if(!this.applicant.name){
        alert("กรุณากรอก Name !!");
        return;
      }else if(this.applicant.name.length < 3){
        alert("Name ต้องไม่น้อยกว่า 3 ตัวตัวอักษร !!");
        return;
      }
      if (!this.applicant.fuel) {
        alert("กรุณากรอก fuel !!");
        return;
      }else if(this.applicant.fuel === "D" || this.applicant.fuel === "S"){
        axios
          .post(this.url + "/api/vehicle-model/store?", {
              brandId: this.applicant.brandId,
              modelCode: this.applicant.modelCode,
              name: this.applicant.name,
              modelYear: this.applicant.modelYear,
              fuel: this.applicant.fuel,
          })
          .then((response) => {
            alert(response.data.message);
            this.$router.push({name:'home'});
            event.preventDefault();
          })
          .catch((error) => {
            console.log(error);
            alert(error.response.data.message);
            
          })
        
      }else  {
        alert("fuel ต้องเป็น D & S เท่านั้น !!");
        
          
      }
      //alert(JSON.stringify(this.applicant));
      event.preventDefault();
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
    }


  },
};
</script>

<style scoped></style>
