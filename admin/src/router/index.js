import Vue from "vue";
import VueRouter from "vue-router";
import Main from '../views/Main'
import CategoryEdit from '../views/CategoryEdit'
import CategoryList from '../views/CategoryList'
import ItemEdit from '../views/ItemEdit'
import Itemlist from '../views/Itemlist'
import HeroEdit from '../views/HeroEdit'
import Herolist from '../views/Herolist'

import ArticleEdit from '../views/ArticleEdit'
import Articlelist from '../views/Articlelist'

import AdEdit from '../views/AdEdit'
import Adlist from '../views/Adlist'

import AdminUserEdit from '../views/AdminUserEdit'
import AdminUserlist from '../views/AdminUserlist'

import login from '../views/Home'

Vue.use(VueRouter);

const routes = [
  {
    path:'/login',
    name:'login',
    component:login,
    meta:{isPublic:true}
  },
  {
    path: "/",
    name: "Main",
    component: Main,
    children:[
      {path:'/categories/create',component:CategoryEdit},
      {path:'/categories/list',component:CategoryList},
      {path:'/categories/edit/:id',component:CategoryEdit,props:true},

      {path:'/items/create',component:ItemEdit},
      {path:'/items/list',component:Itemlist},
      {path:'/items/edit/:id',component:ItemEdit,props:true},

      {path:'/heros/create',component:HeroEdit},
      {path:'/heros/list',component:Herolist},
      {path:'/heros/edit/:id',component:HeroEdit,props:true},

      {path:'/articles/create',component:ArticleEdit},
      {path:'/articles/list',component:Articlelist},
      {path:'/articles/edit/:id',component:ArticleEdit,props:true},

      {path:'/ads/create',component:AdEdit},
      {path:'/ads/list',component:Adlist},
      {path:'/ads/edit/:id',component:AdEdit,props:true},

      {path:'/admin_users/create',component:AdminUserEdit},
      {path:'/admin_users/list',component:AdminUserlist},
      {path:'/admin_users/edit/:id',component:AdminUserEdit,props:true}
    ]
  },

];



const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to,from,next)=>{
  // console.log(to.meta);
  if(!to.meta.isPublic && !localStorage.token){
    return next('/login')
  }
  next()
  })

export default router;
