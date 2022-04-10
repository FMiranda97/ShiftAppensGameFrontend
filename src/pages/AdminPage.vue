<template>
  <form @submit.prevent="submitHandler" class="controls">
    <h1>Criar Desafio</h1>
    <label for="title">Título</label>
    <input id="title" type="text" v-model="title" placeholder="Introduz um título para o desafio">
    <label for="description">Descrição</label>
    <textarea id="description" v-model="description" placeholder="Introduz a descrição do desafio"></textarea>
    <label for="date">Data</label>
    <input id="date" type="datetime-local" v-model="date">
    <label for="points">Pontos</label>
    <input id="points" type="number" min="0" step="1" v-model="points">
    <p class="error" v-if="message.length > 0">{{ message }}</p>

    <label for="codes">Gerar códigos</label>
    <input id="codes" type="number" min="0" step="1" v-model="randomCodes">
    <label for="specific">Código específico</label>
    <input id="specific" type="text" v-model="specificCode" placeholder="Opcional">

    <button class="button">Criar</button>
    <button class="button back-button" @click="backHandler">
      <font-awesome-icon icon="arrow-left"></font-awesome-icon>
    </button>
  </form>

</template>

<script>

import axios from "axios";

export default {
  name: "CreateChallengePage",
  data() {
    return {
      title: "",
      description: "",
      date: "2022-04-10T14:00",
      points: 5,
      randomCodes: 0,
      specificCode: "",
      message: ""
    }
  },
  methods: {
    backHandler() {
      this.$router.back()
    },
    submitHandler() {
      axios.post(`${process.env.VUE_APP_BACKEND_URL}/challenges`,
          {
            title: this.title,
            description: this.description,
            date: new Date(this.date).toISOString(),
            points: this.points,
          }
      ).then(response => {
        this.message = response.data.msg;
        const challengeId = response.data.challengeId;
        if (this.specificCode.length > 0 && this.randomCodes > 0) {
          axios.post(`${process.env.VUE_APP_BACKEND_URL}/challenges/createtextcode`,
              {
                idChallenge: challengeId,
                textCode: this.specificCode,
                numTimes: this.randomCodes,
              }
          ).then(response => {
            this.message += ". " + response.data.msg;
          }).catch(error => {
            this.message += ". " + error.response.data.msg;
          })
        } else if (this.randomCodes > 0) {
          axios.post(`${process.env.VUE_APP_BACKEND_URL}/challenges/generate`,
              {
                ncodes: this.randomCodes,
                idChallenge: challengeId
              }
          ).then(response => {
            console.log(response)
            this.message += ". " + response.data.msg;
          }).catch(error => {
            console.log(error.response)
            this.message += ". " + error.response.data.msg;
          })
        }
      }).catch(error => {
        this.message = error.response.data.msg;
      })
    }
  }
}
</script>

<style scoped>
.controls {
  position: relative;
  margin: 5rem 0 5rem 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-size: 2rem;
  padding: 1rem;
  background: #b19cd9;
  color: white;
  border: 5px solid #9400d3;
  width: 60%;
}

h1 {
  color: #9400d3;
  margin: 0;
}

input {
  font: inherit;
  font-size: 1rem;
}

#title {
  width: 60%;
}

textarea {
  resize: none;
  width: 60%;
  font: inherit;
  font-size: 1rem;
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

.error {
  font-size: 1rem;
  color: #551a8b;
}

</style>