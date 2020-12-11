import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Main from "../views/Main.vue";
import Articles from "../views/Articles";
import Herolist from "../views/Herolist";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Main",
    component: Main,
    children:[
    {path:'/',component:Home },
    {path:'/articles/:id',component:Articles, props:true},
    ]
  },
  {
    path:"/herolist/:id",
    component:Herolist,
    props:true
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
