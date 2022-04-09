<template>
  <form action="" class="controls">
    <label>Username</label>
    <input type="text" class="control">
    <label>Email</label>
    <input type="text" class="control">
    <label>Password</label>
    <input type="text" class="control">
    <button class="control">Registar</button>
    <router-link to="/login">Já te registaste?</router-link>
  </form>
</template>

<script>
export default {
  name: "SignUp"
}
</script>

<style scoped>

.controls {
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

.control {
  font: inherit;
  margin: 0.2rem;
}

</style>