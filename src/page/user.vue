<template>
    <div>
      <mu-container>
        <div class="back" @click="back">
          <i class="iconfont icon-fanhui"></i>
        </div>
        <mu-tabs :value.sync="active" center color="#c62828" indicator-color="#fff">
          <mu-tab>我的收藏</mu-tab>
          <mu-tab>最近播放</mu-tab>
        </mu-tabs>
        <div class="text">
          <div class="demo-text" v-if="active === 0">
            <div class="music-list-wrap">
              <div class="sequence-play">
                <i class="iconfont icon-bofang"></i> 播放全部<span>&nbsp;(共{{getCollect.length}}首)</span>
              </div>
            </div>
            <song-list :songs="getCollect"></song-list>
          </div>
          <div class="demo-text" v-if="active === 1">
            <div class="music-list-wrap">
              <div class="sequence-play">
                <i class="iconfont icon-bofang"></i> 播放全部<span>&nbsp;(共{{getPlayList.length}}首)</span>
              </div>
            </div>
            <song-list :songs="getPlayList"></song-list>
          </div>
        </div>
      </mu-container>
    </div>
</template>
<script>
import songList from '../components/songLists.vue'
import {mapGetters} from 'vuex'
export default{
  data () {
    return {
      active: 0
    }
  },
  computed: {
    ...mapGetters([
      'getPlayList',
      'getCollect'
    ])
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  },
  components: {
    songList
  }
}
</script>
<style lang="less" scoped>
  .back {
    position: fixed;
    left: 0px;
    top: 0px;
    width: 44px;
    height: 44px;
    line-height: 44px;
    text-align: center;
    z-index: 149;
    i {
      color: #fff;
      font-size: 22px;
    }
  }
  .mu-tabs{
    top: 0;
    z-index: 148;
  }
  .text {
    margin-top: 50px;
    background: #f2f3f4;
  }
  .music-list-wrap{
    padding: 41px 0 0px 0;
    border-radius: 10px;
    position: relative;
    top: 0px;
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
