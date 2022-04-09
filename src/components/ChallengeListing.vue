<template>
  <div class="challenge">
    {{title}}
    <span class="date">08/04/2022 - 22:45</span>
    <span class="points">Pontos: 25</span>
  </div>
</template>

<script>
export default {
  name: "ChallengeListing",
  props: ['title', 'date', 'points']
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