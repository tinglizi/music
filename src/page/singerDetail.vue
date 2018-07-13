<template>
  <div class="song-menu" ref="songMenu">
    <div class="header" ref="header">
      <div class="back" @click="back">
        <i class="iconfont icon-fanhui"></i>
      </div>
      <h3>{{songTitle}}</h3>
    </div>
    <div class="list">
      <div class="music-wrap">
        <div class="bgImg" :style="{backgroundImage:'url('+artist.img1v1Url+')'}" ref="bgImg">
          <div class="filter"></div>
          <div class="list-text">{{artist.name}}</div>
        </div>
        <div class="music-list-wrap">
          <div class="sequence-play">
            <i class="iconfont icon-bofang"></i> 播放全部<span>&nbsp;(共{{hotSongs.length}}首)</span>
          </div>
          <song-list :songs="hotSongs"></song-list>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {getArtist} from '../api'
import songList from '../components/songLists.vue'
export default{
  data () {
    return {
      hotSongs: [],
      artist: {},
      imgHeight: '',
      songTitle: '歌手'
    }
  },
  created () {
    this._getDetail()
  },
  mounted () {
    // 获取头部图片的高度
    this.imgHeight = this.$refs.bgImg.clientHeight
    // 监听window的滚动事件
    window.addEventListener('scroll', () => {
      // 判断滚动条是否大于0，大于则将头部的背景颜色更改
      if (scrollY > 0) {
        // 更改头部title
        if (scrollY >= this.imgHeight - 20) {
          this.songTitle = this.artist.name
        } else {
          this.songTitle = '歌手'
        }
        // 设置颜色透明度，滚动高度/图片的高度
        let percent = Math.abs(scrollY / this.imgHeight)
        this.$refs.header.style.background = `rgba(212, 68, 57, ${percent})`
      } else {
        this.$refs.header.style.background = 'rgba(212, 68, 57, 0)'
      }
    })
  },
  methods: {
    _getDetail () {
      let id = this.$route.params.id
      getArtist(id).then(res => {
        if (res) {
          this.hotSongs = res.data.hotSongs
          this.artist = res.data.artist
        }
      })
    },
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
  .song-menu{
    background: #f2f3f4;
  }
  .header{
    position: fixed;
    top:0;
    width: 100%;
    height: 44px;
    z-index: 100;
    color: #fff;
    .back{
      position: absolute;
      left: 0px;
      width: 44px;
      height: 44px;
      line-height: 44px;
      text-align: center;
      i{
        color: #fff;
        font-size: 22px;
      }
    }
    h3{
      position: absolute;
      left: 40px;
      line-height: 44px;
      font-size: 16px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
  .bgImg{
    width: 100%;
    padding-top: 75%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 0 30%;
    position: relative;
    .filter{
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: black;
      opacity: .2;
    }
  }
  .list-text{
    position: absolute;
    bottom: 50px;
    font-size: 16px;
    line-height: 18px;
    font-weight: bold;
    letter-spacing: 1px;
    color: #fff;
    left: 20px;
  }
  .play-count{
    position: absolute;
    bottom: 20px;
    left: 20px;
    color: #fff;
    font-size: 12px;
    i{
      font-size: 20px;
      vertical-align: middle;
    }
  }
  .music-list-wrap{
    padding: 41px 0 0px 0;
    border-radius: 10px;
    position: relative;
    top: -20px;
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
