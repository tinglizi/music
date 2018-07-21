<template>
    <div class="search-result" >
      <p class="title">最佳匹配</p>
      <div v-if="show">
        <div class="search-item" @click="selectItem(albums)">
          <img :src="albums.artists[0].img1v1Url" alt="" >
          <span>歌手：{{albums.artists[0].name}}</span>
        </div>
        <div class="search-item" @click="selectItem(albums)">
          <img :src="albums.playlists[0].coverImgUrl" alt="">
          <div class="text">
            <p>歌单：{{albums.playlists[0].name}}</p>
            <p class="singer">{{albums.artists[0].name}}</p>
          </div>
        </div>
      <ul class="search-list">
        <li class="list-item" v-for="(song, index) in songList" :key="index" @click="selectSong(song)">
          <div class="icon">
            <i></i>
          </div>
          <div class="name">
            <p class="song">{{song.name}}</p>
            <p class="singer">{{song.artists[0].name}}</p>
          </div>
        </li>
      </ul>
      </div>
      <div v-show="!show">暂无搜索结果！</div>
    </div>
</template>
<script>
import {getSongDetail} from '../api'
import {mapGetters} from 'vuex'
export default{
  data () {
    return {
      show: false
    }
  },
  props: ['songList', 'albums', 'search'],
  mounted () {
    if (!this.albums) this.show = false
  },
  watch: {
    search (newval, oldval) {
      this.search = newval
    },
    albums (newval, oldval) {
      if (newval) this.show = true
      this.albums = newval
    },
    songList (newval, oldval) {
      this.songList = newval
    }
  },
  computed: {
    ...mapGetters([
      'getPlayList'
    ])
  },
  methods: {
    // 选择歌曲
    selectItem (item) {
      let id = item.artists[0].id
      this.$router.push(`/searchView/singer/${id}`)
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
  }
}
</script>
<style lang="less" scoped>
  .search-result{
     height: 100%;
     overflow: auto;
     margin-top: 50px;
     .title{
       padding-left: 20px;
       padding-bottom: 10px;
       color: #d44439;
       font-size: 11px;
     }
     .search-item{
       display: -webkit-box;
       display: -ms-flexbox;
       display: flex;
       -webkit-box-align: center;
       -ms-flex-align: center;
       align-items: center;
       padding: 8px 20px;
       border-bottom: 1px solid #e4e4e4;
       font-size: 14px;
       img{
         -webkit-box-flex: 0;
         -ms-flex: 0 0 50px;
         flex: 0 0 50px;
         margin-right: 15px;
         width: 50px;
         height: 50px;
       }
     }
     .search-list{
       padding-bottom: 30px;
       li {
         display: -webkit-box;
         display: -ms-flexbox;
         display: flex;
         padding: 8px 20px;
         height: 50px;
         -webkit-box-align: center;
         -ms-flex-align: center;
         align-items: center;
         border-bottom: 1px solid #e4e4e4;
         .name{
           -webkit-box-flex: 1;
           -ms-flex: 1;
           flex: 1;
           font-size: 14px;
           color: #2E3030;
           overflow: hidden;
           p{
             padding: 1px 0;
           }
           .song{
             font-size: 16px;
             color: #2E3030;
             white-space: nowrap;
             overflow: hidden;
             text-overflow: ellipsis;
           }
           .singer{
             font-size: 12px;
             color: #757575;
             white-space: nowrap;
             overflow: hidden;
             text-overflow: ellipsis;
           }
         }
       }
     }
  }
</style>
