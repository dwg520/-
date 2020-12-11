<template>
  <div>
    <swiper :options="swiperOption" >
    <swiper-slide><img class="w-100" src="../assets/images/a.jpeg" alt=""></swiper-slide>
    <swiper-slide><img class="w-100" src="../assets/images/b.jpeg" alt=""></swiper-slide>
     <swiper-slide><img class="w-100" src="../assets/images/c.jpeg" alt=""></swiper-slide>
      <div class="swiper-pagination pagination-home "  slot="pagination"></div>
    </swiper>
    <!-- end of swiper -->
    <div class="nav-icons bg-white mt-2 " >
      <ul class="d-flex d-flex-row  pl-0 pt-3" v-show="boxshow">
        <li class="icon-items mb-3 text-center text-grey">
          <i class="sprite sprite-biaoliao"></i>
          <div class="mt-2">爆料站</div>
        </li>
         <li class="icon-items mb-3 text-center text-grey">
          <i class="sprite sprite-gushi"></i>
          <div class="mt-2">故事站</div>
        </li>
         <li class="icon-items mb-3 text-center text-grey">
          <i class="sprite sprite-shangcheng"></i>
          <div class="mt-2">周边商城</div>
        </li>
         <li class="icon-items mb-3 text-center text-grey">
          <i class="sprite sprite-tiyan"></i>
          <div class="mt-2">体验服</div>
        </li>
         <li class="icon-items mb-3 text-center text-grey">
          <i class="sprite sprite-xinren"></i>
          <div class="mt-2">新人专区</div>
        </li>
         <li class="icon-items mb-3 text-center text-grey">
          <i class="sprite sprite-news"></i>
          <div class="mt-2">荣耀-传承</div>
        </li>
         <li class="icon-items mb-3 text-center text-grey">
          <i class="sprite sprite-wangzhe"></i>
          <div class="mt-2">王者营地</div>
        </li>
         <li class="icon-items mb-3 text-center text-grey">
          <i class="sprite sprite-weixin"></i>
          <div class="mt-2">公众号</div>
        </li>
         <li class="icon-items mb-3 text-center text-grey">
          <i class="sprite sprite-duiju"></i>
          <div class="mt-2">对局环境</div>
        </li>
      </ul>
     <div class="bg-light py-2 w-100 text-center">
        <i class="sprite sprite-shouqi"></i>
        <span class="fs-xs ml-1" @click="boxshow=!boxshow">{{boxshow ? '收起':'展开'}}</span>
      </div>
    </div>
    <!-- end of icons -->
    


  <ListCard title="新闻列表" icon="xinwen_o" :categories='categories' >
   <template #items="{category}">
   <router-link tag="div" :to="`articles/${news._id}`"
   class="mt-2 fs-lg d-flex" 
   v-for="(news,i) in category.newslist" :key="i" > 
    <span class="text-primary">[{{news.categoryName}}]</span>
    <span class="px-1">|</span>
    <span class="text-dark-2 flex-1 yichu">{{news.title}}</span>
    <span >{{news.createdAt | date}}</span>
   </router-link>
   </template>
  </ListCard>

  <ListCard title="英雄列表" icon="yingxiong" :categories='list' >
   <template #items="{category}">
    <div class="d-flex d-flex-row text-center" >
       <router-link tag="div" :to="`/herolist/${news._id}`"
       class=" fs-lg p-1" style="width:20%" 
       v-for="(news,i) in category.herolist" :key="i" > 
    <img :src="news.avatar" alt="" class="w-100">
    <div class="">{{news.name}}</div>
       </router-link>
    </div>
  
   </template>
  </ListCard>
  
  
  </div>
</template>
<script>
// import card from '../components/Card'
// import ListCard from '../components/ListCard'
import dayjs from 'dayjs'
export default {
// cnpm install dayjs 格式化时间
filters:{
  date(val){
    return dayjs(val).format('MM/DD') 
  }
},
  data(){
    return {
       swiperOption:{
                // 参数选项,显示小点
                pagination:{
                  el:'.swiper-pagination',
                  clickable:true
                },
                //循环
                loop:true,
                //每张播放时长3秒，自动播放
                autoplay: {
                 delay: 2000,
                 disableOnInteraction: false
                },
                //滑动速度
                speed:1000,
                delay:1000,
                
            },
            categories:[],
            list:[],
            boxshow:true
    }
  },
  methods:{
   async dedao(){
    const res =  await this.$http.get('/news/list')
    this.categories = res.data
    },
    async fetchhero(){
      const res=  await this.$http.get('/hero/list')
      this.list = res.data
    }
  },
  created(){
    this.dedao();
    this.fetchhero();
  },
  // components:{
  // //  card:card,
  //  ListCard
  // }
}
</script>
<style lang='scss' >
@import '../assets/scss/_variables';
.pagination-home{
   .swiper-pagination-bullet {
   background: map-get($colors,'white' );
   };
   &.swiper-pagination-bullet-active {
     background: map-get($colors, 'black');
   }
 }
.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
}
 .d-flex-row {
   .icon-items {
     width: 25%;
     border-right: 1px solid $border-color;
     &:nth-child(4n) {
       border: none;
     }
   }
   
 }
</style>