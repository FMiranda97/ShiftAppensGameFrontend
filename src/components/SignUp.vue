<template>
  <div class="container">
    <form @submit.prevent="signupHandler" class="controls">
      <label>Username</label>
      <input type="text" class="control" v-model="username">
      <label>Email</label>
      <input type="text" class="control" v-model="email">
      <label>Password</label>
      <input type="password" class="control" v-model="password">
      <p v-if="errorMessage.length > 0" class="error">{{errorMessage}}</p>
      <button class="button">Registar</button>
      <router-link to="/login">Já te registaste?</router-link>
    </form>
  </div>

</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "SignUp",
  data() {
    return {
      username: "",
      password: "",
      email: ""
    }
  },
  computed: {
    ...mapGetters([
      'errorMessage'
    ])
  },
  methods: {
    signupHandler() {
      this.$store.dispatch('signup', {
        username: this.username,
        password: this.password,
        email: this.email
      })
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
  justify-content: center;
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