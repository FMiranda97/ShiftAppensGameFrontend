<template>
  <NavBar></NavBar>
<!--  <router-view class="view"></router-view>-->
  <router-view v-slot="{ Component, route }">
  <transition :name="route.meta.transitionName || 'slide-right'" mode="out-in">
      <component :is="Component"/>
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

.slide-left-leave {
  transform: translateX(0);
}

.slide-left-leave-active {
  transition: transform 0.2s;
}

.slide-left-leave-to {
  transform: translateX(-100%);
}

.slide-left-enter {
  transform: translateX(0);
}

.slide-left-enter-active {
  transition: transform 0.2s;
}

.slide-left-enter-from {
  transform: translateX(100%);
}

.slide-right-leave {
  transform: translateX(0);
}

.slide-right-leave-active {
  transition: transform 0.2s;
}

.slide-right-leave-to {
  transform: translateX(100%);
}

.slide-right-enter {
  transform: translateX(0);
}

.slide-right-enter-active {
  transition: transform 0.2s;
}

.slide-right-enter-from {
  transform: translateX(-100%);
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
