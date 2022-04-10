<template>
  <div class="page">
    <template v-if="isLoggedIn">
      <div class="points">{{ points }}</div>
      <span class="points-label">Pontuação</span>
    </template>

    <div class="search-container">
      <font-awesome-icon icon="magnifying-glass"></font-awesome-icon>
      <input type="text" v-model="filterText" class="search-bar">
    </div>

    <span class="challenge-group" v-if="currentChallenges.length > 0">Desafios do momento</span>
    <div class="challenges" v-if="currentChallenges.length > 0">
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
    <div class="challenges" v-if="futureChallenges.length > 0">
      <ChallengeListing
          v-for="challenge in futureChallenges"
          :title="challenge.title"
          :date="challenge.date"
          :id="challenge._id"
          :points="challenge.points"
          :key="challenge._id"
          is-future="true"
      ></ChallengeListing>
    </div>
  </div>
</template>

<script>

import ChallengeListing from "@/components/ChallengeListing";
import {mapGetters} from "vuex";
import axios from "axios";

export default {
  name: "ChallengePage",
  components: {
    ChallengeListing
  },
  data() {
    return {
      points: '?',
      filterText: ''
    }
  },
  computed: {
    ...mapGetters([
      'challenges',
        'isLoggedIn'
    ]),
    filteredChallenges() {
      return this.challenges.filter((challenge) => {
        return challenge.title.toLowerCase().includes(this.filterText.toLowerCase())
      })
    },
    currentChallenges() {
      return this.filteredChallenges.filter((challenge) => {
        return new Date(challenge.date) < new Date()
      })
    },
    futureChallenges() {
      return this.filteredChallenges.filter((challenge) => {
        return new Date(challenge.date) >= new Date()
      })
    }
  },
  created() {
    axios.get(`${process.env.VUE_APP_BACKEND_URL}/challenges/userpoints`)
        .then((response) => {
          this.points = response.data.userPoints
        })
        .catch(error => {
          console.log(error.response)
        })
  },
  mounted() {
    this.$store.dispatch('getChallenges');
  }

}
</script>

<style scoped>
.search-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1.2rem;
  color: #9400d3;
  width: 60%;
}

.search-bar {
  appearance: none;
  border: 4px solid #b19cd9;
  font: inherit;
  color: #9400d3;
  width: 100%;
  margin: 1rem;
}

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


.challenges {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.challenge-group {
  font-size: 2rem;
  text-align: center;
  color: #9400d3;
  font-weight: bold;
  width: 60%;
}

@media (max-width: 50rem) {
  .page {
    margin: 5rem 0;
  }

  .points {
    font-size: 8rem;
    height: 10rem;
    margin-top: 1rem;
  }

  .points-label {
    font-size: 1rem;
  }

  .challenges {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .challenge-group {
    font-size: 1rem;
    color: #9400d3;
    font-weight: bold;
    width: 60%;
  }
}

</style>