<template>
  <div class="details">
    <span class="title">{{ title }}</span>
    <span class="time">{{preDateString}} {{ date }}</span>
    <span class="description">{{ getChallenge(id) && getChallenge(id).description }}</span>
    <form class="form">
      <label for="validationCode">Código de validação</label>
      <span class="controls">
        <input id="validationCode" type="text" class="validation-code">
        <button class="button">Enviar</button>
      </span>
    </form>
  </div>
</template>

<script>
import moment from "moment";
import {mapGetters} from "vuex";

export default {
  name: "ChallengeDetail",
  props: ['id'],
  computed: {
    ...mapGetters([
        'getChallenge'
    ]),
    title() {
      return this.getChallenge(this.id) && this.getChallenge(this.id).title
    },
    date() {
      moment.locale('pt-pt')
      return this.getChallenge(this.id) && moment(this.getChallenge(this.id).date).fromNow()
    },
    preDateString() {
      if(new Date() > new Date(this.date)) {
        return "Começou"
      }else {
        return "Começa"
      }
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

</style>