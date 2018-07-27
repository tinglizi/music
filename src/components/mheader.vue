<template>
  <div class="header">
    <mu-appbar style="width: 100%;" color="red800">
      <mu-button icon slot="left" @click="user">
        <mu-icon value="menu" ></mu-icon>
      </mu-button>
       music
       <mu-button flat slot="right" @click="search"><mu-icon value="search"></mu-icon></mu-button>
    </mu-appbar>
  </div>
</template>

<script>
export default {
  name: 'mhead',
  data () {
    return {
    }
  },
  methods: {
    search () {
      this.$router.push('/searchView/search')
    },
    user () {
      this.$router.push('/user')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .mu-appbar{
    text-align: center;
    position: fixed;
    left: 0;
    top:0;
    z-index: 10;
  }
</style>
