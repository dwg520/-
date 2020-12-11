<template>
    <div id="article">
       <div class="d-flex px-2  py-3 border-bottom">
           <div class="iconfont icon-xiaoyu "></div>
          <strong class="text-blue flex-1">{{list.title}}</strong>
          <div class="text-grey fs-xxs">{{list.createdAt | data}}</div>
       </div>
        <div v-html="list.body" class="xiangqing px-3 fs-xl"></div>
        <div class="d-flex ai-center p-3 border-top">
            <i class="iconfont icon-xiangguanzixun" style="font-size:25px"></i>
            <strong class="text-blue ml-2">相关资讯</strong>
        </div>
       <div class="px-2">
        <router-link tag="div" class="m-2"
        :to="`/articles/${item._id}`"
        v-for="item in list.related" :key="item._id">
        {{item.title}}
        </router-link>
       </div>
    </div>
</template>
<script>
import dayjs from 'dayjs'
export default {
    filters:{
  data(val){
    return dayjs(val).format('MM/DD') 
  }
},
    props:{
        id:{required:true}
    },
    data(){
        return {
            list:{}
        }
    },
    methods:{
      async fetch(){
           const res=await this.$http.get(`articles/${this.id}`)
           this.list = res.data
        }
    },
    // 用来监听页面上的数据
    watch:{
     id(){
         this.fetch()
     }
    },
    created(){
      this.fetch()
    }
}
</script>
<style lang="scss">
#article {
    .xiangqing{
        line-height: 1.538462rem /* 20/13 */;
        img {
            width: 100%;
            height: auto;
        }
    }
}
</style>