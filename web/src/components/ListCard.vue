<template>
  <card :icon="icon" :title="title">
    <div class="d-flex jc-between ">
      <div :class="{ active: active===i }" v-for="(item,i) in categories" :key="i"
       @click="$refs.list.swiper.slideTo(i)">
       <div> {{item.name}} </div>
        </div>
    </div>
    <div class="py-2">
      <swiper ref="list" :options="{autoHeight:true}"
      @slide-change="() => active=$refs.list.swiper.activeIndex">
        <swiper-slide v-for="(item,i) in categories" :key="i">
          <slot name="items" :category="item"></slot>
        </swiper-slide>
      </swiper>
    </div>
  </card>
</template>
<script>
// import card from "../components/Card";
export default {
  props: {
    icon: { type: String, required: true },
    title: { type: String, required: true },
    categories: { type: Array, required: true }
  },
  // components: {
  //   card: card
  // },

  data(){
    return {
      active:0
    }
  },
};
</script>