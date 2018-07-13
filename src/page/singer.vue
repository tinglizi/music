<template>
    <div class="singer" ref="singer">
      <singerList></singerList>
    </div>
</template>
<script>
import singerList from '../components/singerList.vue'
import {getSingers} from '../api'
export default{
  data () {
    return {
      singer: []
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
    _getSinger () {
      getSingers().then(res => {
        let lists = res.data.artists
        let sortlist = lists.map(item => {
          return item.name
        })
        let sort = sortlist.sort(function (a, b) {
          return a.localeCompare(b)
        })
        console.log(sort)
      })
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
