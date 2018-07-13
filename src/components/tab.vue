<template>
    <div class="tabs">
        <router-link to="/recommend">
          <div class="tab">推荐</div>
        </router-link>
        <router-link to="/rankingList">
          <div class="tab">排行</div>
        </router-link>
        <router-link to="/singer">
          <div class="tab">歌手</div>
        </router-link>
    </div>
</template>
<script>
export default{
  name: 'tab',
  data () {
    return {
      active: 0
    }
  }
}
</script>
<style lang="less" scoped>
  .tabs{
    position: fixed;
    left: 0;
    top:50px;
    width: 100%;
    height: 48px;
    line-height: 48px;
    display: flex;
    justify-content: space-around;
    background: #c62828;
    font-size: 15px;
    z-index: 20;
    a{
      color: #e6e6e6;
      display: block;
      width: 33%;
      text-align: center;
    }
    .tab{

    }
    .router-link-active{
      border-bottom: 2px solid #fff;
      color: #fff;
    }
  }
</style>
