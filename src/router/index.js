import { createRouter, createWebHashHistory } from 'vue-router'
import Recommend from '@/views/recommend.vue'
import Search from '@/views/search.vue'
import Singer from '@/views/singer.vue'
import TopList from '@/views/top-list.vue'

import Loading from '@/components/base/loading/loading.vue'

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    component: Recommend
  },
  {
    path: '/search',
    component: Loading
  },
  {
    path: '/singer',
    component: Singer
  },
  {
    path: '/top-list',
    component: TopList
  }
]

const router = createRouter({
  // process.env.BASE_URL
  history: createWebHashHistory(),
  routes
})

export default router
