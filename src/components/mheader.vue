<template>
  <div class="">
    <mu-appbar style="width: 100%;" color="red800">
      <mu-button icon slot="left" @click="open = true">
        <mu-icon value="menu" ></mu-icon>
      </mu-button>
       music
       <mu-button flat slot="right" @click="search"><mu-icon value="search"></mu-icon></mu-button>
    </mu-appbar>
    <!--抽屉导航-->
    <mu-container>
      <mu-drawer :open.sync="open" :docked="docked" :right="position === 'right'">
        <mu-list>
          <mu-list-item button>
            <mu-list-item-title>Menu Item 1</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button>
            <mu-list-item-title>Menu Item 2</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button>
            <mu-list-item-title @click="open = false">Close</mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </mu-drawer>
    </mu-container>
  </div>
</template>

<script>
export default {
  name: 'mhead',
  data () {
    return {
      docked: false,
      open: false,
      position: 'left'
    }
  },
  methods: {
    search () {
      this.$router.push('/searchView/search')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
  .mu-appbar{
    text-align: center;
    position: fixed;
    left: 0;
    top:0;
    z-index: 10;
  }
</style>
