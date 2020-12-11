<template>
  <div class="about">
    <div class="topbar bg-black py-2 px-3 d-flex ai-center">
      <img src="../assets/logo.png" alt="" height="30" />
      <div class="px-2 flew-grow-1 d-flex">
        <div class="text-white">王者荣耀</div>
        <div class="fs-xxs ml-3 text-white">攻略站</div>
      </div>
      <router-link tag="div" class="text-white" :to="`/`"
        >更多英雄 &gt;</router-link
      >
    </div>
    <div
      :class="{ isactive: true }"
      :style="{ backgroundImage: `url(${herolist.banner})` }"
    >
      <div class="info text-white p-3 h-100 d-flex d-flex-column jc-end">
        <div>{{ herolist.title }}</div>
        <h2 class="my-2">{{ herolist.name }}</h2>
        <div>{{ herolist.categories.map(v => v.name).join("/") }}</div>
        <div class="d-flex jc-between ">
          <div v-if="herolist.scores" class="flex-1">
            <span>难度</span>
            <span class="scores bg-primary">{{
              herolist.scores.difficult
            }}</span>
            <span>技能</span>
            <span class="scores bg-blue">{{ herolist.scores.skills }}</span>
            <span>攻击</span>
            <span class="scores bg-red">{{ herolist.scores.attack }}</span>
            <span>生存</span>
            <span class="scores bg-dark-1">{{ herolist.scores.survive }}</span>
          </div>
          <router-link tag="div" to="/" class="fs-xxs text-grey"
            >皮肤></router-link
          >
        </div>
      </div>
    </div>
    <!-- end of  top-->
   <div>
      <div class="bg-white px-3">
      <div class="d-flex jc-around py-2 border-bottom ">
        <div>
          <div class="active">英雄初识</div>
        </div>
        <div>
          <div>进阶攻略</div>
        </div>
      </div>
     
    </div>
    <swiper>
       <swiper-slide>
        <div>
          <div class="border-bottom bg-white">
            <div class="d-flex px-3 pt-2">
               <router-link tag="button" to="/" class="btn btn-lg flex-1 ">
          <i class="iconfont icon-shipin"></i>
           英雄介绍视频
         </router-link>

         <router-link tag="button" to="/" class=" flex-1 btn btn-lg ml-2">
         <i class="iconfont icon-tupian"></i>
           一图识英雄
         </router-link>
            </div>
              <div class="mt-3">
                <div class="d-flex jc-around">
            <img :src="item.icon" 
            @click="skillsindex=i"
            :class="{actives:skillsindex===i}"
            v-for="(item,i) in herolist.skills" 
            :key="item.name" 
            width="60"
            height="60"
            >
          </div>
          <div v-if="currentskills" >
           <div class="d-flex py-4 px-3">
              <h3 class="m-0">{{currentskills.name}}</h3>
            <span class="text-grey ml-3">(冷却值:{{currentskills.delay}} 消耗:{{currentskills.cost}})</span>
           </div>
           <p class="px-3">{{currentskills.description}}</p>
           <div class="border-bottom"></div>
           <p class="text-grey px-3">小提示:{{currentskills.tips}}</p>
          </div>
              </div>
          </div>
           <div>
             <card plain title="加点建议" icon="xinwen_o" class="hero-items">
               <div class="fs-xl py-2 mb-2">顺风出装</div>
               <div class="d-flex jc-around text-center">
                 <div v-for="item in herolist.items1" :key="item.name">
                 <img :src="item.icon" alt="">
                 <div class="fs-xs">{{item.name}}</div>
               </div>
               </div>
                <div class="border-bottom mt-3"></div>
                <div class="fs-xl py-2 mb-2 mt-3">逆风出装</div>
               <div class="d-flex jc-around text-center">
                 <div v-for="item in herolist.items2" :key="item.name">
                 <img :src="item.icon" alt="">
                 <div class="fs-xs">{{item.name}}</div>
               </div>
               </div>
             </card>
           <card plain  title="使用技巧" icon="xinwen_o">
             <p>{{herolist.usageTips}}</p>
           </card>
           <card plain title="对抗技巧" icon="xinwen_o">
             <p>{{herolist.battleTips}}</p>
           </card>
           <card plain title="团战思路" icon="xinwen_o">
             <p>{{herolist.teamTips}}</p>
           </card>
           <card plain title="英雄关系" icon="xinwen_o">
             <div class="mb-3">最佳搭档</div>
             <div class="d-flex mt-3" v-for="item in herolist.partners" :key="item._id">
               <img :src="item.hero.avatar" alt="" height="50">
               <p class="m-0 ml-3 flex-1">{{item.description}}</p>
             </div>
              <div class="border-bottom mt-3"></div>
           </card>
            
           </div>
        </div>
       </swiper-slide>
       <swiper-slide>

       </swiper-slide>
     </swiper>
   </div>

    <!-- <div>{{herolist}}</div> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      herolist: {
        scores: []
      },
      skillsindex:0
    };
  },
  props: {
    id: { required: true }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`/herolist/${this.id}`);
      this.herolist = res.data;
    }
  },
  computed :{
    currentskills(){
      return this.herolist.skills[this.skillsindex]
    }
  },
  created() {
    this.fetch();
  }
};
</script>
<style lang="scss">
@import '../assets/scss/_variables.scss';
.about {
  .isactive {
    height: 191px;
    width: 100%;
    background-size: 100% 191px;
  }
  .info {
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
    .scores {
      display: inline-block;
      height: 12px;
      width: 12px;
      line-height: 12px;
      text-align: center;
      border-radius: 50%;
      font-size: 8px;
      margin: 0 2px;
    }
  }
  .actives {
    border: 3px solid map-get($colors, 'primary');
    border-radius: 50%;
  }
  .hero-items {
    img {
      width: 47px;
      height: 47px;
      border-radius: 50%;
    }
  }
}
</style>
