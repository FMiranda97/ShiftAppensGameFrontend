<template>
  <div class="challenge">
    {{ title }}
    <span class="date">{{preDateString}} {{ formattedDate }}</span>
    <span class="points">Pontos: {{ points || 'desconhecido' }}</span>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: "ChallengeListing",
  props: ['title', 'date', 'points'],
  computed: {
    formattedDate() {
      moment.locale("pt-pt")
      return moment(this.date).fromNow()
    },
    preDateString() {
      if(new Date() > new Date(this.date)) {
        return "Começou"
      }else {
        return "Começa"
      }
    }
  }
}
</script>

<style scoped>
.challenge {
  position: relative;
  font-size: 2rem;
  text-align: center;
  border: 5px solid #9400d3;
  margin: 1rem;
  padding: 1rem;
  background: #b19cd9;
  color: white;
  width: 60%;
  cursor: pointer;
}

.date {
  position: absolute;
  left: 0;
  bottom: 0;
  font-size: 0.8rem;
  padding: 0.2rem;
}

.points {
  position: absolute;
  right: 0;
  bottom: 0;
  font-size: 0.8rem;
  padding: 0.2rem;
}

</style>