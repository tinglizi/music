<template>
  <div id="app">
    <router-view/>
    <player></player>
    <loading></loading>
  </div>
</template>
<script>
import player from './page/player.vue'
import loading from './components/loading.vue'
export default {
  name: 'App',
  components: {
    player,
    loading
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
*{
 margin: 0;
 padding: 0;
}
html,body{
  background: #F2F3F4;
}
ul,li {
  list-style: none;
}

</style>
