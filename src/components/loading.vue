<template>
    <div>
      <div v-show="getLoading" class="loading">
        <!--<mu-circular-progress class="demo-circular-progress" :size="36"></mu-circular-progress>-->
        <img src="../assets/loading.gif" alt="">
      </div>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default{
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['getLoading'])
  }
}
</script>
<style lang="less" scoped>
.loading{
  position: fixed;
  left: 0;
  top:0;
  width: 100%;
  height: 100%;
  text-align: center;
  z-index: 10;
  img{
    margin-top: 150px;
    width: 40px;
    height: 40px;
  }
}
</style>
