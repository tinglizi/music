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
      <mu-drawer :open.sync="open" :docked="docked" :right="position === 'right'" width="100%">
        <div class="back" @click="open = false">
          <i class="iconfont icon-fanhui"></i>
        </div>
        <mu-tabs :value.sync="active" center color="#c62828" indicator-color="#fff">
          <mu-tab>我的收藏</mu-tab>
          <mu-tab>最近播放</mu-tab>
        </mu-tabs>
        <div class="music-list-wrap">
          <div class="sequence-play">
            <i class="iconfont icon-bofang"></i> 播放全部<span>&nbsp;(共2首)</span>
          </div>
        </div>
        <div class="text">
          <div class="demo-text" v-if="active === 0">
            <song-list></song-list>
          </div>
          <div class="demo-text" v-if="active === 1">
            <song-list></song-list>
          </div>
        </div>
      </mu-drawer>
    </mu-container>
  </div>
</template>

<script>
import songList from '../components/songLists.vue'
import {mapGetters} from 'vuex'
export default {
  name: 'mhead',
  data () {
    return {
      docked: false,
      open: false,
      position: 'left',
      active: 0
    }
  },
  computed: {
    ...mapGetters([
      'getPlayList'
    ])
  },
  methods: {
    search () {
      this.$router.push('/searchView/search')
    }
  },
  components: {
    songList
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
  .back {
    position: fixed;
    left: 0px;
    width: 44px;
    height: 44px;
    line-height: 44px;
    text-align: center;
    z-index: 999;
    i {
      color: #fff;
      font-size: 22px;
    }
  }
  .mu-tabs{
    top: 0;
    z-index: 998;
  }
  .text {
    margin-top: 60px;
  }
  .music-list-wrap{
    padding: 41px 0 0px 0;
    border-radius: 10px;
    position: relative;
    top: 50px;
    background: #f2f3f4;
    .sequence-play{
      position: absolute;
      top: 0;
      display: flex;
      align-items: center;
      width: 100%;
      height: 40px;
      padding-left: 16px;
      border-bottom: 1px solid #e4e4e4;
      color: #333;
      font-size: 16px;
      i.icon-bofang{
        margin-right: 12px;
        font-size: 20px;
      }
      span{
        color: #666;
        font-size: 14px;
      }
    }
  }
</style>
