<template>
  <div class="App">

    <nav
      class="navbar navbar-expand-lg navbar-dark bg-dark"
      aria-label="Tenth navbar example"
    >
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="navbarsExample08"
          aria-controls="navbarsExample08"
          aria_expanded="false"
          aria-label="Toggle navigation"
          @click="showmenunavbar()"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div
          class="collapse navbar-collapse justify-content-md-center"
          id="navbarsExample08"
        >
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link disabled">Vue js CRUD Application</a>
            </li>
            <li class="nav-item">
              <router-link class="nav-link active" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/Create">Create</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/Update">Update</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <br />

    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      navbars: false,

    };
  },
  methods: {
    showmenunavbar() {
      //alert("rffrffse !!");
      this.navbars = true;
      
    },
  },
};
</script>

<style></style>
