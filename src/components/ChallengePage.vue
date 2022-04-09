<template>
  <div class="page">
    <div class="points">80</div>
    <span class="points-label">Pontuação</span>

    <span class="challenge-group" v-if="currentChallenges.length > 0">Desafios do momento</span>
    <div class="challenges-now" v-if="currentChallenges.length > 0">
      <ChallengeListing
          v-for="challenge in currentChallenges"
          :title="challenge.title"
          :date="challenge.date"
          :id="challenge._id"
          :points="challenge.points"
          :key="challenge._id"
      ></ChallengeListing>
    </div>
    <span class="challenge-group" v-if="futureChallenges.length > 0">Desafios futuros</span>
    <div class="challenges-now" v-if="futureChallenges.length > 0">
      <ChallengeListing
          v-for="challenge in futureChallenges"
          :title="challenge.title"
          :date="challenge.date"
          :id="challenge._id"
          :points="challenge.points"
          :key="challenge._id"
      ></ChallengeListing>
    </div>
  </div>
</template>

<script>

import ChallengeListing from "@/components/ChallengeListing";
import {mapGetters} from "vuex";

export default {
  name: "ChallengePage",
  components: {
    ChallengeListing
  },
  computed: {
    ...mapGetters([
      'challenges'
    ]),
    currentChallenges() {
      return this.challenges.filter((challenge) => {
        return new Date(challenge.date) < new Date()
      })
    },
    futureChallenges() {
      return this.challenges.filter((challenge) => {
        return new Date(challenge.date) >= new Date()
      })
    }
  },
  mounted() {
    this.$store.dispatch('getChallenges')
  }

}
</script>

<style scoped>
.page {
  margin: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.points {
  font-size: 16rem;
  color: #9400d3;
  height: 20rem;
}

.points-label {
  font-size: 1.2rem;
  color: #b19cd9;
}

.challenges-now {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.challenge-group {
  font-size: 2rem;
  color: #9400d3;
  font-weight: bold;
  width: 60%;
}

.challenge:hover,
.challenge:active {
  background: #9400d3;
  /*border: 5px solid #b19cd9;*/
}


</style>