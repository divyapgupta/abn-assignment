import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import HomePage from "../pages/HomePage.vue";
import SearchPage from "../pages/SearchPage.vue";
import ShowPage from "../pages/ShowPage.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/search",
    name: "Search",
    component: SearchPage,
  },
  {
    path: "/show/:id",
    name: "ShowPage",
    component: ShowPage,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
