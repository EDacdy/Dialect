<!--  -->
<template>
   <div>
      <van-nav-bar fixed  :z-index="3">
      <template slot="left" >
      <slot name="left-screen"><img src="../../assets/search.svg"></slot>
      </template>
      <template slot="title">
      <slot name="title-screen">乡音</slot>
      </template>
      <template slot="right">
      <slot name="right-screen"><img src="../../assets/music.png"></slot>
      </template>
      </van-nav-bar>
   </div>
</template>

<script>
export default {
   data () {
       return {

       };
   }

};
</script>
<style scoped lang="scss">

::v-deep .van-nav-bar__right{
  top:6px;
}
::v-deep .van-nav-bar__left{
  top:6px;
}
</style>