<template>
  <nav>
    <router-link to="/todo">ToDo</router-link> |
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
