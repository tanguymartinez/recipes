<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{ name: 'home'}">HOME</router-link>
      <router-link :to="{ name: 'new'} ">NEW</router-link>
      <router-link :to="{name : 'about'}">ABOUT</router-link>
    </div>
    <transition name="router-view" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<style lang="sass">
body
  margin: 0
</style>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  max-width: 50rem;
  width: 50%;
  min-width: 35rem;
  margin: auto;
}

#nav {
  padding: 30px;
  border-radius: 0 0 20px 20px;
  background-color: black;
  margin: auto;
  color: white;
  margin-bottom: 3rem;
  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;
    margin-left: 1rem;
    margin-right: 1rem;
    color: white;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
<style lang="sass" scoped>
.router-view-enter-active,
.router-view-leave-active
  transition: all 200ms

.router-view-enter,.router-view-leave-to
  opacity: 0
  transform: translateY(2rem)
</style>
