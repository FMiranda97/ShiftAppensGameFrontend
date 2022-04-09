<template>
  <div class="details">
    <span class="title">{{ title }}</span>
    <span class="time">{{ preDateString }} {{ date }}</span>
    <span class="description">{{ description }}</span>
    <form class="form" @submit.prevent="submitHandler">
      <label for="validationCode">Código de validação</label>
      <template v-if="isLoggedIn">
        <span class="controls" v-if="!challengeCompleted">
          <input id="validationCode" type="text" class="validation-code" v-model="validationCode">
          <button class="button">Enviar</button>
        </span>
        <font-awesome-icon icon="circle-check" class="checkMark" v-else/>
        <font-awesome-icon icon="circle-xmark" class="checkMark" v-if="error"/>
      </template>
      <router-link to="/login" class="button" v-else>Faz login para começar!</router-link>

    </form>
  </div>
</template>

<script>
import moment from "moment";
import {mapGetters} from "vuex";
import axios from "axios";

export default {
  name: "ChallengeDetail",
  props: ['id'],
  data() {
    return {
      validationCode: "",
      challengeCompleted: false,
      error: false
    }
  },
  computed: {
    ...mapGetters([
      'getChallenge',
      'isLoggedIn'
    ]),
    title() {
      return this.getChallenge(this.id) && this.getChallenge(this.id).title
    },
    date() {
      moment.locale('pt-pt')
      return this.getChallenge(this.id) && moment(this.getChallenge(this.id).date).fromNow()
    },
    preDateString() {
      if (new Date() > new Date(this.getChallenge(this.id).date)) {
        return "Começou"
      } else {
        return "Começa"
      }
    },
    description() {
      return this.getChallenge(this.id) && this.getChallenge(this.id).description
    }
  },
  methods: {
    submitHandler() {
      this.error = false
      axios.post(`${process.env.VUE_APP_BACKEND_URL}/challenges/validate`, {
        idChallenge: this.id,
        code: this.validationCode
      })
        .then(() => {
          this.challengeCompleted = true
        })
        .catch(error => {
          console.log(error.response)
          this.error = true
        })
    }
  },
  created() {
    this.$store.dispatch('getChallenges')
  }
}
</script>

<style scoped>

.details {
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

.title {
  font-size: 2rem;
  font-weight: bold;
  color: #9400d3;
}

.form {
  display: flex;
  flex-direction: column;
}


label {
  font-size: 1rem;
}

input {
  font: inherit;
  font-size: 1rem;
}

button {
  font: inherit;
  font-size: 1rem;
}

.checkMark {
  font-size: 2rem;
  margin: 1rem;
  color: #9400d3;
}


.controls {
  display: flex;
  flex-direction: column;
}

</style>