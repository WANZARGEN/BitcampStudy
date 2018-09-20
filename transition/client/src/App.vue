<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Original</router-link> |
      <router-link to="/about">Custom</router-link>
    </div>
    <h1>VUE TRANSITION</h1>
      <router-view class="router-view"/>
    <h2>by WANZARGEN</h2>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
h1 {
  margin-bottom: 80px;
}
h2 {
  margin-top: 80px;
}
.router-view {
  width: 100%;
  // min-height: 60vh;
}
</style>
