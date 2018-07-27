import Vue from 'vue'
import Router from 'vue-router'
import Index from '../page/index'
import Recommend from '../page/recommend'
import MusicList from '../page/musicList.vue'
import RankingList from '../page/rankingList.vue'
import Singer from '../page/singer.vue'
import singerDetail from '../page/singerDetail.vue'
import Search from '../page/search.vue'
import SearchView from '../page/searchView.vue'
import User from '../page/user.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      redirect: '/recommend',
      children: [
        {
          path: 'recommend',
          name: 'recommend',
          component: Recommend
        },
        {
          path: 'rankingList',
          name: 'rankingList',
          component: RankingList
        },
        {
          path: 'singer',
          name: 'singer',
          component: Singer
        }
      ]
    },
    {
      path: '/musicList/:id',
      name: 'musicList',
      component: MusicList
    },
    {
      path: '/searchView',
      name: 'searchView',
      component: SearchView,
      children: [
        {
          path: 'search',
          name: 'search',
          component: Search
        },
        {
          path: 'singer/:id',
          name: 'singerDetail',
          component: singerDetail
        }
      ]
    },
    {
      path: '/user',
      name: 'user',
      component: User
    }
  ]
})
