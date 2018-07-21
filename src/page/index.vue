<template>
    <div>
      <m-header></m-header>
      <div class="tab">
        <tab></tab>
        <keep-alive>
         <router-view></router-view>
        </keep-alive>
      </div>
    </div>
</template>
<script>
import recommend from './recommend.vue'
import tab from '../components/tab.vue'
import rankingList from './rankingList.vue'
import mHeader from '../components/mheader.vue'
export default{
  data () {
    return {
    }
  },
  components: {
    recommend,
    mHeader,
    rankingList,
    tab
  }
}
</script>
<style lang="less">
  .mu-tabs{
    position: fixed;
    left: 0;
    top:50px;
  }
</style>
