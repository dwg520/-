import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import card from './components/Card'
Vue.component('card',card)
import ListCard from './components/ListCard'
Vue.component('ListCard',ListCard)

//  npm install vue-awesome-swiper@2.6.7 –save
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
Vue.use(VueAwesomeSwiper)
import './assets/scss/style.scss'
import axios from 'axios'
Vue.prototype.$http = axios.create({
 baseURL:'http://localhost:3000/web/api'
})
import './assets/font_c1622j7759j/iconfont.css'
Vue.config.productionTip = false;
Vue.pr
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
