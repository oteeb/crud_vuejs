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
                <label for="exampleInputEmail1">BrandID</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter BrandID"
                  v-model="applicant.brandId"
                />
                <small class="form-text text-muted"
                  >Enter your BrandID .</small
                >
              </div>

              <div class="form-group">
                <label for="exampleInputPassword1">ModelCode</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="MD-"
                  v-model="applicant.modelCode"
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
                  v-model="applicant.name"
                />
                <small class="form-text text-muted"
                  >Enter your Name .</small
                >
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">ModelYear</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="ModelYear"
                  v-model="applicant.modelYear"
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
                  v-model="applicant.fuel"
                />
                <small class="form-text text-muted"
                  >Enter your Fuel .</small
                >
              </div>

              <button type="submit" class="btn btn-primary">Submit</button>
              &nbsp;&nbsp;
              <button type="button" class="btn btn-danger" @click="Clear">
                Clear
              </button>
              <p class="center">#Spy {{ JSON.stringify(applicant) }}</p>

              <section v-if="errored">
                <p>
                  ขออภัย เราไม่สามารถเรียกข้อมูลนี้ได้ในขณะนี้
                  โปรดลองอีกครั้งในภายหลัง
                </p>
              </section>

              <section v-else>
                <div v-if="loading">Loading...</div>

                <div v-else>
                  <table class="table table-sm">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Job</th>
                        <th scope="col">CreatedAt</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-bind:key="applicant.id">
                        <th scope="row">{{ applicant.id }}</th>
                        <td>{{ applicant.name }}</td>
                        <td>{{ applicant.job }}</td>
                        <td>{{ applicant.createdAt }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
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
        alert("กรุณากรอก ModelYear !!");
        return;
      }
      if (this.applicant) {
        alert(this.applicant.modelCode);
        axios
          .post(this.url + "/api/vehicle-model/store?", {
              brandId: this.applicant.brandId,
              modelCode: this.applicant.modelCode,
              name: this.applicant.name,
              modelYear: this.applicant.modelYear,
              fuel: this.applicant.fuel,
          })
          .then((response) => {
            this.applicant = response.data;
            console.log(this.applicant);
            alert("เพิ่มข้อมูลสำเสร็จ");
            event.preventDefault();
          })
          .catch((error) => {
            console.log(error);
            this.errored = true;
          })
          .finally(() => (this.loading = false));
      }

      //alert(JSON.stringify(this.applicant));
      event.preventDefault();
    },
  },
};
</script>

<style scoped></style>
