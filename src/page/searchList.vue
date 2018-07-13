<template>
    <div class="search-list" >
      <div class="title">
        <span class="text">搜索历史</span>
        <span class="clear" @click="deletAll">
              <i class="iconfont icon-delete"></i>
            </span>
      </div>
      <ul ref="ul">
        <li class="search-item" v-for="(item,index) in historyList" :key="index" ref="li">
          <span class="text">{{item}}</span>
          <span class="icon" @click="del(item, index)">
            <i class="iconfont icon-close" ></i>
          </span>
        </li>
      </ul>
      <mu-dialog  width="360" :open.sync="isShow" >
        <p>是否清空历史记录？</p>
        <mu-button slot="actions" flat color="primary" @click="confirm">清空</mu-button>
         <mu-button slot="actions" flat color="primary" @click="cancel">取消</mu-button>
      </mu-dialog>
    </div>
</template>
<script>
export default{
  data () {
    return {
      historyList: [],
      isShow: false
    }
  },
  props: ['search'],
  watch: {
    // 将搜索的添加到历史记录里
    search (newval, oldval) {
      if (newval) {
        this.historyList.push(newval)
        // 数组去重
        this.historyList = [...new Set(this.historyList)]
      }
    }
  },
  methods: {
    del (item, index) {
      this.historyList.splice(index, 1)
    },
    // 确定
    confirm () {
      this.isShow = false
      this.historyList = []
    },
    // 取消
    cancel () {
      this.isShow = false
    },
    // 清除所有
    deletAll () {
      this.isShow = true
    }
  }
}
</script>
<style lang="less" scoped>
  .search-list {
    .search-item {
      display: flex;
      align-items: center;
      height: 35px;
      overflow: hidden;
      font-size: 14px;
      &.list-enter-active, &.list-leave-active {
        transition: all 0.1s;
      }
      &.list-enter, &.list-leave-to {
        height: 0;
      }
      .text {
        flex: 1;
        color: #2E3030;
      }
      .icon {
        position: relative;
        .icon-delete {
          font-size: 11px;
          color: #2E3030;
        }
      }
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
