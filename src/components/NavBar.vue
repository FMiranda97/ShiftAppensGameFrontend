<template>
  <header class="header">
    <div class="backdrop" v-if="isOpen" @click="closeMenuHandler"></div>
    <button class="open-menu-button" @click="openMenuHandler"><font-awesome-icon icon="bars" name="openMenu"></font-awesome-icon></button>

    <router-link to="/" class="brand" active-class="active-home" v-if="!isOpen">{{ username || 'Home' }}</router-link>
    <transition name="slide">
      <div class="menu" v-if="isOpen" @click="closeMenuHandler">
        <router-link to="/" class="header-item" active-class="active" v-if="isOpen">{{ username || 'Home' }}</router-link>
        <router-link to="/challenges" class="header-item" active-class="active">Desafios</router-link>
        <router-link to="/leaderboard" class="header-item" active-class="active">Leaderboard</router-link>
        <router-link to="/admin" class="header-item" active-class="active" v-if="isAdmin">Admin</router-link>
        <template v-if="!isLoggedIn">
          <router-link v-if="currentRouteName !== '/login'" to="/signup" class="header-item" active-class="active">
            Registo / Login
          </router-link>
          <router-link v-else to="/login" class="header-item" active-class="active">Registo / Login</router-link>
        </template>
        <button v-if="isLoggedIn" class="header-item" @click="logoutHandler">Logout</button>
      </div>
    </transition>


    <div class="header-items">
      <router-link to="/challenges" class="header-item" active-class="active">Desafios</router-link>
      <router-link to="/leaderboard" class="header-item" active-class="active">Leaderboard</router-link>
      <router-link to="/admin" class="header-item" active-class="active" v-if="isAdmin">Admin</router-link>
      <template v-if="!isLoggedIn">
        <router-link v-if="currentRouteName !== '/login'" to="/signup" class="header-item" active-class="active">
          Registo / Login
        </router-link>
        <router-link v-else to="/login" class="header-item" active-class="active">Registo / Login</router-link>
      </template>
      <button v-if="isLoggedIn" class="header-item" @click="logoutHandler">Logout</button>
    </div>
  </header>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'NavBar',
  data() {
    return {
      isOpen: false
    }
  },
  computed: {
    ...mapGetters([
      'isLoggedIn',
      'isAdmin',
      'username'
    ]),
    currentRouteName() {
      return this.$route.path;
    }
  },
  methods: {
    logoutHandler() {
      this.$store.dispatch('logout')
    },
    openMenuHandler() {
      this.isOpen = true;
    },
    closeMenuHandler() {
      this.isOpen = false;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  transform: translateX(-100%);
}

.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.3);
}

.menu {
  position: fixed;
  z-index: 2;
  width: 50vw;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background: #9400d3;
}

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

.open-menu-button {
  display: none;
  appearance: none;
  background: none;
  border: none;
  color: white;
  font-weight: bold;
  font-size: 1.5rem;
  padding: 0.5rem;
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

.active {
  border-bottom: 2px solid #aaa;
  color: #aaa;
}

.active-home {
  color: #aaa;
}

.header-item:hover,
.header-item:active,
.header-item.active-link {
  border-bottom: 2px solid #aaa;
  color: #aaa;
}

@media (max-width: 50rem) {
  .open-menu-button {
    display: block;
  }

  .brand {
    display: none;
  }

  .header-items {
    display: none;
  }

  .header-item {
    border: none;
  }

  .active {
    border: none;
    color: #aaa;
  }

  .header-item:hover,
  .header-item:active,
  .header-item.active-link {
    color: #aaa;
    border: none;
  }
}


</style>
