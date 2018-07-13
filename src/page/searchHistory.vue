<template>
    <div class="search-history">
      <ul>
        <li class="search-item">
          <span class="text"></span>
          <span class="icon">
            <i class="iconfont icon-close"></i>
          </span>
        </li>
      </ul>
    </div>
</template>
<script>
export default{
  data () {
    return {}
  }
}
</script>
<style lang="less" scoped>
  .search-history{
    .search-item{
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      height: 35px;
      overflow: hidden;
      font-size: 14px;
      .text{
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        color: #2E3030;
      }
      .icon{
        position: relative;
        &:before{
          content: '';
          position: absolute;
          top: -10px;
          left: -10px;
          right: -10px;
          bottom: -10px;
        }
        i{
          font-size: 11px;
          color: #2E3030;
        }
      }
    }
  }
</style>
