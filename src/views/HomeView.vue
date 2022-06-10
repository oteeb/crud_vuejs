<template>
  <div class="home">
    <!--View-->
    <div class="container">
      <div class="row">
        <div class="col">
          <h1>List Users</h1>

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
                    <th scope="col">#</th>
                    <th scope="col">Email</th>
                    <th scope="col">First_name</th>
                    <th scope="col">Last_name</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="currency in view" v-bind:key="currency.id">
                    <th scope="row">{{ currency.id }}</th>
                    <td>{{ currency.email }}</td>
                    <td>{{ currency.first_name }}</td>
                    <td>{{ currency.last_name }}</td>
                    <td>
                      <button
                        type="button"
                        class="btn btn-danger"
                        @click="alertttt(currency.id)"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <button type="button" class="btn btn-primary" @click="ListUsers">
            View</button
          >&nbsp;&nbsp;
          <button type="button" class="btn btn-danger" @click="Clear">
            Clear
          </button>
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
      view: null,
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
        .get("https://reqres.in/api/users/", {
          params: {
            page: 2,
          },
        })
        .then((response) => {
          this.view = response.data.data;
          console.log(this.view);
        })
        .catch((error) => {
          console.log(error);
          this.erroredview = true;
        })
        .finally(() => (this.loadingview = false));
    },
    Clear() {
      this.view = null;
      console.log(this.view);
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
  },
};
</script>
