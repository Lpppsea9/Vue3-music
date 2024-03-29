import { createRouter, createWebHashHistory } from "vue-router";
import Recommend from "@/views/recommend.vue";
import Search from "@/views/search.vue";
import Singer from "@/views/singer.vue";
import TopList from "@/views/top-list.vue";
import SingerDetail from "@/views/singer-detail.vue";
import Test from "@/Test/index.vue";
import App from "@/App.vue";

// import Loading from '@/components/base/loading/loading.vue'

const routes = [
  {
    path: "/",
    // redirect: "/test",
    component: App,
  },
  {
    path: "/recommend",
    component: Recommend,
  },
  {
    path: "/search",
    component: Search,
  },
  {
    path: "/singer",
    component: Singer,
    children: [
      {
        path: ":id",
        component: SingerDetail,
      },
    ],
  },
  {
    path: "/top-list",
    component: TopList,
  },
  {
    path: "/test",
    component: Test,
  },
];

const router = createRouter({
  // process.env.BASE_URL
  history: createWebHashHistory(),
  routes,
});

export default router;
