<template>
    <div class="ranking-list">
      <ul>
        <li class="item" v-for="(item,index) in playList" :key="index" @click="selectItem(item)">
          <div class="icon">
            <img v-lazy="item.coverImgUrl" alt="">
          </div>
          {{ playList.top }}
          <ul class="songlist">
            <li class="song" v-for="(item,index2) in playList[index].top" :key="index2">
              <span>{{index2 + 1}}.</span>
              <span>{{item.name}}- {{item.ar[0].name}}</span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
</template>
<script>
import {rank} from '../api'
const YUNMUSIC_TOP = [0, 1, 2, 3, 4, 22, 23]
export default{
  data () {
    return {
      playList: []
    }
  },
  created () {
    this.getRank()
  },
  methods: {
    getRank () {
      for (let i in YUNMUSIC_TOP) {
        rank(i).then(res => {
          let list = res.data.playlist
          list.top = res.data.playlist.tracks.slice(0, 3)
          this.playList.push(list)
        })
      }
    },
    selectItem (item) {
      this.$router.push({
        path: `/musicList/${item.id}`
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .ranking-list{
    margin-top: 98px;
    overflow-x: hidden;
  }
  .item{
   margin: 0 10px;
   padding: 3px 0;
   display: flex;
   align-items: center;
    .icon{
      width: 100px;
      height: 100px;
      border-radius: 3px;
      img{
        width: 100%;
      }
    }
  }
  .songlist{
    li{
      padding: 0 20px;
      line-height: 30px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      color: #333;
      font-size: 14px;
    }
  }
</style>
