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
                <label for="exampleInputEmail1">Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="Name"
                  aria-describedby="NameHelp"
                  placeholder="Enter Name"
                  v-model="applicantUpdate.name"
                />
                <small id="NameHelp" class="form-text text-muted"
                  >Enter your Name .</small
                >
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Job</label>
                <input
                  type="text"
                  class="form-control"
                  id="Job"
                  placeholder="Job"
                  v-model="applicantUpdate.job"
                />
                <small id="JobHelp" class="form-text text-muted"
                  >Enter your Job .</small
                >
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
      this.applicantUpdate.name = "";
      this.applicantUpdate.job = "";
    },
    Update() {
      if (!this.applicantUpdate.name) {
        alert("กรุณากรอก Name !!");
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
  },
};
</script>

<style scoped></style>
