<template>
  <form @submit.prevent="loginHandler" class="controls">
    <label>Username</label>
    <input type="text" class="control" v-model="username">
    <label>Password</label>
    <input type="password" class="control" v-model="password">
    <p v-if="errorMessage.length > 0" class="error">{{errorMessage}}</p>
    <button class="button">Login</button>
    <router-link to="/signup"> Ainda não tens conta?</router-link>
  </form>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "SignUp",
  computed: {
    ...mapGetters([
        'errorMessage'
    ])
  },
  methods: {
    loginHandler: function () {

      this.$store.commit('setErrorMessage', "")
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

.error {
  font-size: 1rem;
  color: #551a8b;
}

@media (max-width: 50rem) {
  .controls {
    margin: 5rem 0 5rem 5%;
    width: 90%;
  }
}

</style>