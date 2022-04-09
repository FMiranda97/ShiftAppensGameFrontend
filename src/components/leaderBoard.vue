<template>
  <div class="leaderboard">
    <h1>Leaderboard</h1>
    <div
        class="entry"
        v-for="(user, idx) in getLeaderboards"
        :key="idx"
        :style="{color: idx === 0 ? 'gold': idx === 1 ? 'lightgrey': idx === 2 ? '#cd7f32': 'white'}"
    >
      <span class="place" v-if="idx<3"><font-awesome-icon icon="ranking-star"/></span>
      <span class="place" v-else>{{idx + 1}}º</span>
      <span class="user">{{ user.username }}</span>
      <span class="user">{{ user.totalPoints }} pontos</span>
    </div>
  </div>
</template>

<script>

import {mapGetters} from "vuex";

export default {
  name: "leaderBoard",
  components: {
    FontAwesomeIcon
  },
  computed: {
    ...mapGetters([
      'getLeaderboards'
    ])
  },
  mounted() {
    this.$store.dispatch('getLeaderboard')
  }
}

import {library} from '@fortawesome/fontawesome-svg-core'
import {faUserSecret} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

library.add(faUserSecret)

</script>

<style scoped>
h1 {
  color: #9400d3;
}

.leaderboard {
  position: relative;
  margin: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.entry {
  display: flex;
  justify-content: space-between;
  font-size: 2rem;
  border: 2px solid #9400d3;
  border-left: 4px solid #9400d3;
  border-right: 4px solid #9400d3;
  padding: 1rem;
  background: #b19cd9;
  color: white;
  width: 60%;
}

.entry:first-of-type {
  border-top: 4px solid #9400d3;
}

.entry:last-of-type {
  border-bottom: 4px solid #9400d3;
}


</style>