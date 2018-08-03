<template>

    <div class="recommend">
      <!--轮播图-->
      <div class="carousel">
        <mu-carousel hide-controls hide-indicators>
          <mu-carousel-item v-for="(banner,index) in banners" :key="index">
            <img :src="banner.picUrl">
          </mu-carousel-item>
        </mu-carousel>
      </div>
      <!--推荐歌单-->
      <div class="recommend-song">
        <h2>推荐歌单</h2>
        <div class="song-list">
          <div class="song-item" v-for="(item,index) in recommendLists" :key="index" @click="selectList(item)">
            <div class="songList">
              <div class="img">
                <img  v-lazy="item.picUrl">
                <p class="title">{{item.name}}</p>
              </div>
              <div class="play-count">
                <i class="iconfont icon-yinle"></i>
                {{Math.floor(item.playCount / 10000) }}万
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--推荐歌曲-->
      <div class="recommend-song">
        <h2>推荐歌曲</h2>
        <div class="song-list">
          <div class="song-item" v-for="(item,index) in recommendSongs" :key="index" @click="selectSong(item)">
            <div class="songList">
              <div class="img recommens">
                <img v-lazy="item.picurl">
                <p class="title">{{item.name}}</p>
                <p class="subtitle">{{item.singer}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import { banner, recommendList, recommendSong, getSongDetail } from '../api/index'
import {createRecommendSong} from '../utils/song'
export default{
  data () {
    return {
      // 轮播图
      banners: [],
      // 推荐歌单
      recommendLists: [],
      // 推荐歌曲
      recommendSongs: []
    }
  },
  created () {
    this._banner()
    this._recommendList()
    this._recommendSong()
  },
  methods: {
    _banner () {
      // 获取轮播图
      banner().then((res) => {
        this.banners = res.data.banners
      })
    },
    _recommendList () {
      // 推荐歌单
      recommendList().then(res => {
        this.recommendLists = res.data.result
      })
    },
    _recommendSong () {
      // 推荐歌曲
      recommendSong().then(res => {
        let list = res.data.result.map((item) => {
          return createRecommendSong(item)
        })
        list.splice(9)
        this.recommendSongs = list
      })
    },
    // 选择歌单
    selectList (item) {
      this.$router.push({
        path: `/musicList/${item.id}`
      })
    },
    // 选择歌曲
    selectSong (item) {
      getSongDetail(item.id).then(res => {
        let songs = res.data.songs[0]
        // 保存播放的歌曲信息
        this.$store.commit('saveSong', songs)
        // 将歌曲添加到播放列表
        this.$store.commit('setPlayList', songs)
        // 设置显示播放歌曲界面
        this.$store.commit('toggleScreen', true)
        // 播放歌曲
        this.$store.commit('togglePlay', true)
        // 设置当前播放歌曲的索引值
        this.$store.commit('setCurrentIndex', songs)
      })
    }
  }
}
</script>
<style scoped lang="less">
  .carousel{
    margin-top: 98px;
    img{
      width: 100%;
    }
  }
  .mu-carousel{
    height: 150px;
  }
  .recommend-song{
    color: #333;
    h2{
      height:50px;
      line-height: 50px;
      font-size: 16px;
      padding-left: 10px;
    }
  }
  .song-list{
    display: flex;
    flex-wrap: wrap;
    .song-item{
      width: 33%;
    }
  }
  .songList{
    padding: 5px;
  }
  .img {
    img{
      width: 100%;
      border-radius: 5px;
    }
    p{
      font-size: 13px;
    }
    .title{
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .subtitle{
      color: #757575;
    }
  }
  .recommens .title{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .songList{
    position: relative;
  }
  .play-count{
    position: absolute;
    right: 15px;
    top:10px;
    font-size: 12px;
    color: #fff;
  }
</style>
