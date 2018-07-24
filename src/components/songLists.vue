<template>
    <div class="song-list">
      <ul>
        <li class="item" v-for="(item,index) in songs" :key="index" @click="selectSong(item)">
          <p class="count">{{index + 1}}</p>
          <div class="content">
            <h2 class="name">{{item.name}}</h2>
            <h2 class="desc">{{singer(item)}}</h2>
          </div>
        </li>
      </ul>
    </div>
</template>
<script>
import {getSongDetail} from '../api'
export default{
  data () {
    return {}
  },
  methods: {
    // 获取歌手的名称，用‘/’分割
    singer (item) {
      let name
      if (item.artists) {
        name = item.artists.map((item) => {
          return item.name
        })
      } else {
        name = item.ar.map((item) => {
          return item.name
        })
      }
      return name.join('/')
    },
    // 选择单曲
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
  },
  props: {
    songs: Array
  }
}
</script>
<style lang="less" scoped>
  .no-wrap{
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .song-list{
    .item{
      position: relative;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      height: 60px;
      border-bottom: 1px solid  #e4e4e4;
      .count{
        flex: 0 0 50px;
        width: 50px;
        text-align: center;
        color: #757575;
      }
      .content{
        flex: 1;
        line-height:20px;
        overflow: hidden;
        .name{
          margin-top: 4px;
          width: 80%;
          .no-wrap;
          color: #2E3030;
          font-weight: 100;
          font-size: 16px;
        }
        .desc{
          width: 80%;
          font-size: 12px;
          .no-wrap;
          color: #757575;
        }
      }
    }
  }
</style>
