<template>
    <div class="search">
      <div class="header" ref="header">
        <div class="back" @click="back">
          <i class="iconfont icon-fanhui"></i>
        </div>
        <input type="text" v-model="search" placeholder="搜索歌曲、歌手">
        <div class="close" v-show="search" @click="close">
          <i class="iconfont icon-close"></i>
        </div>
      </div>
      <div class="hot-search" v-show="!search">
        <p class="title">热门搜索</p>
        <span class="hot-search-item" v-for="(hot,index) in hots" :key="index" @click="addQuery(hot.first)">{{hot.first}}</span>
      </div>
      <!--历史记录-->
      <div class="search-wrapper">
        <div class="search-history" v-show="!search">
          <search-list :search="search"></search-list>
        </div>
        <div class="search-result" v-show="search">
          <search-result :songList="songList" :albums="album" :search="search"></search-result>
        </div>
      </div>

    </div>
</template>
<script>
import {getHotSearch, getSearchSong, getAlbum} from '../api'
import searchResult from './searchResult.vue'
import searchList from './searchList.vue'
export default{
  data () {
    return {
      search: '',
      hots: [],
      songList: [],
      page: 0,
      album: [],
      historylist: []
    }
  },
  created () {
    this.hotSearch()
  },
  watch: {
    search (newval, oldval) {
      if (newval) {
        this._getSearchSong(newval, oldval)
        this._getAlbum(newval)
      }
    }
  },
  methods: {
    // 热门搜索
    hotSearch () {
      getHotSearch().then(res => {
        this.hots = res.data.result.hots
      })
    },
    // 点击热门搜索
    addQuery (name) {
      this.search = name
      this._getSearchSong(this.search)
    },
    // 输入获取搜索数据
    _getSearchSong (newval) {
      getSearchSong(newval, this.page).then(res => {
        this.songList = res.data.result.songs
        this.historylist.push(newval)
      })
    },
    // 获取专辑名称
    _getAlbum (newval) {
      getAlbum(newval).then(res => {
        this.album = res.data.result
      })
    },
    // 清除输入内容
    close () {
      this.search = ''
    },
    back () {
      this.$router.back()
    }
  },
  components: {
    searchResult,
    searchList
  }
}
</script>
<style scoped lang="less">
  .mu-appbar{
    text-align: left;
    position: fixed;
    left: 0;
    top:0;
    z-index: 10;
  }
  .header{
    background: #c62828;
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
    .close{
      position: fixed;
      right: 0;
      top:0;
      width: 44px;
      height: 44px;
      text-align: center;
      line-height: 44px;
      i{
        color: #fff;
        font-size: 22px;
      }
    }
    input{
      background: none;
      outline: none;
      margin-left: 50px;
      border: 0;
      height: 44px;
      color: #fff;
      font-size: 16px;
      width: 70%;
    }
    ::-webkit-input-placeholder{
      color: #fff;
    }
  }
  .hot-search{
    margin: 44px 20px 0;
    p{
      padding: 15px 5px 26px 5px;
      height: 30px;
      line-height: 20px;
      font-size: 12px;
      color: #757575;
    }
    span{
      display: inline-block;
      padding: 3px 5px;
      margin: 4px 4px;
      border: 0.8px solid #c7c7c7;
      border-radius: 5px;
      line-height: 20px;
      color: #2E3030;
      font-size: 14px;
    }
  }
  .search-history {
    margin: 44px 20px 0;
    .title{
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      height: 30px;
      font-size: 12px;
      color: #757575;
      span.text{
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
      }
      /*span.clear:before{
        content: '';
        position: absolute;
        top: -10px;
        left: -10px;
        right: -10px;
        bottom: -10px;
      }*/
    }
  }
</style>
