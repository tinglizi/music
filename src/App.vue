<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>

export default {
  name: 'App'
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
