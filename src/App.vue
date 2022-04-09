<template>
  <NavBar></NavBar>
<!--  <router-view class="view"></router-view>-->
  <router-view v-slot="{ Component }">
    <transition name="slide" mode="out-in">
      <component :is="Component" :duration="{ enter: 500, leave: 800 }"/>
    </transition>
  </router-view>
</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
  name: 'App',
  components: {
    NavBar,
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

.slide-leave {
  transform: translateX(0);
}

.slide-leave-active {
  transition: transform 0.2s;
}

.slide-leave-to {
  transform: translateX(-100%);
}

.slide-enter {
  transform: translateX(0);
}

.slide-enter-active {
  transition: transform 0.2s;
}

.slide-enter-from {
  transform: translateX(100%);
}



html, body {
  font-family: Poppins, sans-serif;
}

* {
  box-sizing: border-box;
}

.button {
  appearance: none;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
  border: 4px solid #9400d3;
  margin: 1rem;
  border-radius: 10px;
  padding: 0.5rem;
  color: #9400d3;
  background: #b19cd9;
  cursor: pointer;
}

.button:hover {
  background: #9400d3;
  color: white;
}

</style>
