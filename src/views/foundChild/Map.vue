<!--  -->
<template>
  <div style="padding-top:46px;">
    <NavBar>
      <div slot="left-screen" @click="onReturn">
        <img src="../../assets/return.png" />
        <span style="position:relative;top:-3px;">返回</span>
      </div>
      <div slot="title-screen">在线方言图库</div>
      <div slot="right-screen"></div>
    </NavBar>
    <div class="imgs">
      <div v-for="(img,index) in imgs" :key="index">
        <img :src="img.url" @click="action(index)"/>
        <span>{{img.title}}</span>
      
      </div>
       
    </div>
      <van-image-preview
        v-model="show"
        :images="this.imgs[this.startPosition].url"
        :swipe-duration="300"
        :showIndex="false"
        :maxZoom="5"
        :loop="false"/>
  </div>
  
</template>

<script>
import NavBar from "@/components/base/NavBar.vue";
export default {
  data() {
    return {
        startPosition:0,
        show:false,
        pic:[

        ],
      imgs: [
        {
          title: "中国汉语方言分布图",
          url: [require("../../assets/china1.png")]
        },
        {
          title: "吴语分区图",
          url: [require("../../assets/wuyu.png")]
        },
        {
          title: "闽语分支分布图",
          url: [require("../../assets/minyu.png")]
        },
        {
          title: "湘语分布区",
          url: [require("../../assets/xiangyu.png")]
        },
        {
          title: "晋语分区图",
          url: [require("../../assets/jinyu.png")]
        },
        {
          title: "官话分布图",
          url: [require("../../assets/guanhua.png")]
        }
      ]
    };
  },
  components: {
    NavBar
  },
  methods: {
    onReturn() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    action(index){
       
          this.startPosition = index;
         console.log(this.imgs[this.startPosition].url[0]); 
          this.show=true;
    }
  }
};
</script>

<style scoped lang="scss">
.imgs {
  padding: 10px;
  box-sizing: border-box;
}
.imgs > div {
  margin-bottom: 10px;
  padding-bottom: 30px;
  position: relative;
  border-radius: 2px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}
.imgs > div img {
  width: 100%;
  height: 250px;

  object-fit: cover;
}
.imgs > div span {
  position: absolute;
  bottom: 0;
  left: 50%;
  text-align: center;
  transform: translate(-50%, -50%);
}
</style>