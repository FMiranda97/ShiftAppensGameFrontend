<template>
  <header class="header">
    <a href="/" class="brand">Cofinha</a>
    <div class="header-items">
      <router-link to="/leaderboard" class="header-item">Leaderboard</router-link>
      <router-link to="/" class="header-item">Desafios</router-link>
      <router-link to="/signup" class="header-item">Registo / Login</router-link>
      <a class="header-item">Logout</a>
    </div>
  </header>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #9400d3;
  color: white;
  margin: 0;
  padding: 0;
  top: 0;
  left: 0;
  height: 3rem;
  z-index: 1;
}

.brand {
  position: relative;
  z-index: 1;
  padding: 0.5rem;
  text-decoration: none;
  color: inherit;
  font-size: 1.5rem;
  border-bottom: 2px solid rgba(0, 0, 0, 0);
}

.brand:hover,
.brand:active {
  color: #aaa;
}

.header-items {
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
}

.header-item {
  appearance: none;
  border: none;
  background: none;
  font: inherit;
  margin: 1rem;
  text-decoration: none;
  padding: 0;
  border-bottom: 2px solid rgba(0, 0, 0, 0);
  color: white;
  cursor: pointer;
}
.header-item:hover,
.header-item:active,
.header-item.active-link {
  border-bottom: 2px solid #aaa;
  color: #aaa;
}


</style>
