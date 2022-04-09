<template>
  <div class="leaderboard">
    <h1>Leaderboard</h1>
    <div class="entry">
      <span class="place"><font-awesome-icon icon="ranking-star"/></span>
      <span class="user">Osnarfio</span>
      <span class="user">25 pontos</span>
    </div>
    <div class="entry">
      <span class="place">2º</span>
      <span class="user">Cofinha</span>
      <span class="user">24 pontos</span>
    </div>
    <div class="entry">
      <span class="place">3º</span>
      <span class="user">Chata</span>
      <span class="user">2 pontos</span>
    </div>
    <div class="entry">
      <span class="place">4º</span>
      <span class="user">Random</span>
      <span class="user">1 ponto</span>
    </div>
    <div class="entry">
      <span class="place">5º</span>
      <span class="user">Quem?</span>
      <span class="user">0 pontos</span>
    </div>
  </div>
</template>

<script>

export default {
  name: "leaderBoard",
  components: {
    FontAwesomeIcon
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