<template>
  <div class="details">
    <span class="title">{{ title }}</span>
    <span class="time">{{ preDateString }} {{ date }}</span>
    <span class="description">{{ description }}</span>
    <form class="form" @submit.prevent="submitHandler">
      <label for="validationCode">Código de validação</label>
      <template v-if="isLoggedIn">
        <span class="controls" v-if="!challengeCompleted && alreadyStarted">
          <input id="validationCode" type="text" class="validation-code" v-model="validationCode">
          <button class="button">Enviar</button>
        </span>
        <span v-else-if="!alreadyStarted" class="not-started">Este evento ainda não começou!</span>
        <font-awesome-icon icon="circle-xmark" class="checkMark" v-else-if="error"/>
        <font-awesome-icon icon="circle-check" class="checkMark" v-else/>
      </template>
      <router-link to="/login" class="button" v-else>Faz login para começar!</router-link>

      <button class="button back-button" @click="backHandler"><font-awesome-icon icon="arrow-left"></font-awesome-icon></button>
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
    alreadyStarted() {
      return new Date() > new Date(this.getChallenge(this.id).date)
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
    backHandler() {
      this.$router.back()
    },
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

  position: relative;
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
  justify-content: center;
  align-items: center;
}

.back-button {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  width: 3rem;
  font-size: 2rem;
  left: 0;
  top: 0;
}

label {
  font-size: 1rem;
}

.not-started {
  color: #9400d3;
  font-size: 1.2rem;
  font-weight: bold;
}

@media (max-width: 50rem) {
  .details {
    width: 90%;
    margin: 5rem 0 5rem 5%;
  }

  .back-button {
    position: static;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3rem;
    width: 3rem;
    font-size: 2rem;
  }

  .time {
    font-size: 0.8rem;
  }

  .description {
    font-size: 1.2rem;
  }

  label {
    font-size: 0.8rem;
  }

  span {
    margin: 0.2rem 0;
  }

  .not-started {
    color: #9400d3;
    font-size: 1.2rem;
    font-weight: bold;
  }
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