<template>
  <div class="page">
    <router-link class="challenge" to="/admin/createchallenge">Criar Desafio</router-link>
    <router-link class="challenge" to="/admin/codes">Ver Códigos</router-link>
    <router-link class="challenge" to="/admin/newcode">Criar Códigos</router-link>
  </div>
</template>

<script>
export default {
  name: "AdminPage"
}
</script>

<style scoped>

.page {
  margin: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.challenge {
  appearance: none;
  text-decoration: none;
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

.challenge:hover,
.challenge:active {
  background: #9400d3;
  /*border: 5px solid #b19cd9;*/
}

</style>