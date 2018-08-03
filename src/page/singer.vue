<template>
    <div class="singer" ref="singer">
      <singerList :data="singers" @selectItem="select"></singerList>
    </div>
</template>
<script>
import {Singer} from '../utils/singer'
import singerList from '../components/singerList.vue'
import {getSingers} from '../api'
const pinyin = require('pinyin')
const HOT_NAME = '热门'
const HOT_SINGERS = 10
export default{
  data () {
    return {
      singers: []
    }
  },
  created () {
    this._getSinger()
  },
  methods: {
    playSort (arr) {
      arr.sort(function (a, b) {
        return a.localeCompare(b)
      })
    },
    // 获取歌手列表
    _getSinger () {
      getSingers().then(res => {
        let lists = res.data.artists
        lists.map(item => {
          // 取得歌手的首字符并通过pinyin转换为字母并转换为大写
          let py = pinyin(item.name[0], {
            style: pinyin.STYLE_FIRST_LETTER
          })
          item.initial = py[0][0].toUpperCase()
        })
        this.singers = this._initial(lists)
      })
    },
    _initial (list) {
      let result = []
      let hot = []
      // 设置热门的列表
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      list.forEach((item, index) => {
        // 热门前10条列表
        if (index < HOT_SINGERS) {
          map.hot.items.push(Singer(item))
        }
        // 设置key为首字母，如果map对象不存在当前首字母则添加
        const key = item.initial
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        // 为map对象里key添加items
        map[key].items.push(Singer(item))
      })
      // 遍历map,获取到将每个属型值赋给result
      for (const key in map) {
        let val = map[key]
        // 匹配得到的首字母是否等于大写英文
        if (val.title.match(/[A-Z]/)) {
          result.push(val)
          // 如果等于热门添加到hot数组中
        } else if (val.title === '热门') {
          hot.push(val)
        }
      }
      // 从a-z按照健值排序
      result.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(result)
    },
    select (item) {
      this.$router.push(`/searchView/singer/${item.id}`)
    }
  },
  components: {
    singerList
  }
}
</script>
<style scoped>
  .singer {
    position: fixed;
    top: 98px;
    bottom:0;
    width: 100%;
  }
</style>
