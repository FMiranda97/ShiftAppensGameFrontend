<template>
  <div class="page">
    <div class="points">80</div>
    <span class="points-label">Pontuação</span>

    <span class="challenge-group">Desafios do momento</span>
    <div class="challenges-now">
      <ChallengeListing title="Descobre o caminho para caracas"></ChallengeListing>
      <ChallengeListing title="Workshop sobre workshops"></ChallengeListing>
    </div>
    <span class="challenge-group">Desafios futuros</span>
    <div class="challenges-now">
      <ChallengeListing title="Descobre o caminho para caracas"></ChallengeListing>
      <ChallengeListing title="Workshop sobre workshops"></ChallengeListing>
    </div>
  </div>
</template>

<script>

import ChallengeListing from "@/components/ChallengeListing";

export default {
  name: "ChallengePage",
  components: {
    ChallengeListing
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