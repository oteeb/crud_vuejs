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
                <label for="exampleInputEmail1">Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Name"
                  v-model="applicant.name"
                />
                <small id="emailHelp" class="form-text text-muted"
                  >Enter your Name .</small
                >
              </div>

              <div class="form-group">
                <label for="exampleInputPassword1">Job</label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputPassword1"
                  placeholder="Job"
                  v-model="applicant.job"
                />
                <small id="emailHelp" class="form-text text-muted"
                  >Enter your Job .</small
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

      applicant: {
        name: "",
        job: "",
      },
    };
  },
  methods: {
    Clear() {
      this.applicant.name = "";
      this.applicant.job = "";
    },
    CreateForm(event) {
      if (!this.applicant.name) {
        alert("กรุณากรอก Name !!");
        return;
      }else if(this.applicant.name.length < 5){
        alert("Name ต้องไม่น้อยกว่า 5 ตัวตัวอักษร !!");
        return;
      }
      if (!this.applicant.job) {
        alert("กรุณากรอก Job !!");
        return;
      }
      if (this.applicant) {
        axios
          .post("https://reqres.in/api/users", {
            name: this.applicant.name,
            job: this.applicant.job,
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
