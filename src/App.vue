<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from './store'

  const store = useStore()

  const idAuthenticated = computed(()=>{
    return store.getters['Auth/idToken']!= null
  })

  const logout = () => {
    store.dispatch('Auth/logout');
  }
</script>
<template>
  <nav>
    <template v-if="!idAuthenticated" >
      <router-link to="/register" class="header-item">Register</router-link> |
      <router-link to="/login" class="header-item">Login</router-link> |
    </template>
    <template v-if="idAuthenticated" >
      <router-link to="/">Pet</router-link> |
      <span to="/" class="header-item" @click="logout" >Logout</span> |
    </template>
    
  </nav>
  <router-view/>
</template>

<style>
#app {
  text-align: center;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
