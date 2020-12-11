<template>
<div class=" mt-3 bg-white card">
     <div class="d-flex   py-3 px-3 card">
      <i class="iconfont" :class="`icon-${icon}`"></i>
      <div class="fs-xl  flew-grow-1 ml-2"><strong>{{title}}</strong></div>
      <i class="iconfont icon-sangedian" v-if="!plain"></i>
    </div>
    <div class="px-3 card-body mt-3 ">
        <slot></slot>
    </div>
</div>
</template>
<script>
export default {
    props:{
      title:{type:String,required:true},
      icon:{type:String,required:true},
      plain:{type:Boolean}
    }
}
</script>
<style lang='scss'>
@import '../assets/scss/_variables.scss';
  .card {
      border-bottom: 1px solid map-get($colors,'gey-1');
  }
</style>
