<template>
  <form @submit.prevent="loginHandler" class="controls">
    <label>Username</label>
    <input type="text" class="control" v-model="username">
    <label>Password</label>
    <input type="password" class="control" v-model="password">
    <button class="button">Login</button>
    <router-link to="/signup"> Ainda não tens conta?</router-link>
  </form>
</template>

<script>
export default {
  name: "SignUp",
  methods: {
    loginHandler: function () {
      this.$store.dispatch('login', {
        username: this.username,
        password: this.password
      })
    }
  },
  data() {
    return {
      username: "",
      password: ""
    }
  }
}
</script>

<style scoped>

.controls {
  margin: 5rem 0 5rem 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-size: 1rem;
  padding: 1rem;
  background: #b19cd9;
  color: white;
  border: 5px solid #9400d3;
  width: 60%;
}

.control {
  font: inherit;
  margin: 0.2rem;
}

@media (max-width: 50rem) {
  .controls {
    margin: 5rem 0 5rem 5%;
    width: 90%;
  }
}

</style>