<!--  -->
<template>
  <div>
    <div style="padding-top:46px">
      <NavBar>
        <div slot="left-screen" @click="onReturn">
          <img src="../../assets/return.png" />
          <span style="position:relative;top:-3px;">返回</span>
        </div>
        <div slot="title-screen">视频</div>
        <div slot="right-screen">
          <router-link to="/search">
            <img src="../../assets/search.svg" />
          </router-link>
        </div>
      </NavBar>
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh()">
        <div class="video">
          <div  v-for="(video,index) in videoList" @click="goto(video.id)" :key="index" class="box">
            <div class="imgs">
              <div class="cover1">
                <img :src="video.cover"/>
             
              </div>
              <img src="../../assets/videoplay.png" class="imgcenter" />
            </div>
            <div class="title">{{video.title}}</div>
            <div class="watch">
              <img src="../../assets/video.png" />
              {{video.collect}}
            </div>
          </div>

          <!-- <div class="box">
             <div class="imgs">
              <div class="cover1">
                <img src="../../assets/cover1.jpg"/>
            
              </div>
              <img src="../../assets/videoplay.png" class="imgcenter" />
            </div>
            <div class="title">乡音回家,冬至团圆</div>
            <div class="watch">
              <img src="../../assets/video.png" />
              388
            </div>
          </div>
          <div class="box"></div>
          <div class="box"></div>
          <div class="box"></div>
          <div class="box"></div> -->
        </div>
        <!-- <div class="end">--END--</div> -->
      </van-pull-refresh>
    </div>
    <TabBar />
  </div>
</template>

<script>
import NavBar from "@/components/base/NavBar.vue";
import TabBar from "@/components/base/TabBar.vue";

export default {
  data() {
    return {
      isLoading: false,
      videoList: [
      //   {
      //     video_id: 1, //视频id
      //     cover: require("../../assets/cover2.jpg"), //封面
      //     title: "乡音回家,冬至团圆",
      //     collect: 50, //收藏数
      //     zhaiyao:
      //       "马来西亚乡音考古工作者张吉安，于2005年1月发起【乡音考古】计划，", //摘要
      //     time: "2019-08-02",
      //     video_url:
      //       ""
      //   },
      //   {
      //     video_id: 2, //视频id
      //     cover: require("../../assets/cover1.jpg"), //封面
      //     title: "年味回家,乡音团圆",
      //     collect: 55, //收藏数
      //     zhaiyao:
      //       "马来西亚乡音考古工作者张吉安，于2005年1月发起【乡音考古】计划，", //摘要
      //     time: "2019-08-03",
      //     video_url:
      //       "http://113.105.248.62/2/e/a/e/o/eaeoztnjaxmxazilmyqebtiuxtaudi/hc.yinyuetai.com/5B21016C60853D1F9115DC667CDA543D.mp4?sc=54a9a16a7683787e&br=783&vid=3390695&aid=39450&area=KR&vst=3"
      //   }
      ]
    };
  },
  components: {
    NavBar,
    TabBar
  },
  methods: {
    onReturn() {
      // this.$router.push("/found");
      window.history.length > 1 ? this.$router.go("-1") : this.$router.push("/");
    },
    onRefresh() {
      setTimeout(() => {
        this.$toast.success({ duration: 800, message: "刷新成功" });
        this.isLoading = false;
        console.log("发起刷新请求");
      }, 500);
    },
    getAllVideo() {
      //获取所有视频  需返回id 封面图 播放量 标题
      this.axios
        .post("/getAllVideo", {})
        .then(res => {
          console.log(res);
          this.videoList = res.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    goto(id){
       this.$router.push({ path: `/videoplay/${id}` });
    }
  },
  mounted(){
    this.getAllVideo();
  }
};
</script>
<style scoped lang="scss">
::v-deep .van-nav-bar__left {
  top: 5px;
  display: table-cell;
  vertical-align: middle;
}

.video {
  width: calc(100%-20px);
  margin: 0 auto;
  height: auto;
  padding: 5px 10px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  flex-direction: row;
  justify-content: space-between;
}
.video .box {
  width: 48%;
  height: 215px;
  margin: 5px 0;
  border: 1px solid #f2e8e8;
  border-radius: 5px;
}
.video .imgs {
  width: 100%;
  height: 160px;
  border-radius: 1px;
  position: relative;
}
.video .cover1 {
  width: 100%;
  height: 100%;
  position: relative;
}
.cover1 img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.cover1:after {
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  bottom: 0;
  left: 0;
  box-shadow: inset 0px 15px 15px -15px #fff, inset 0px -15px 15px -15px #fff;
}
.imgs .imgcenter {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.title {
  font-size: 14px;
  text-align: left;
  margin: 8px 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.watch {
  float: left;
  align-items: center;
  justify-content: center;
  display: flex;
  font-size: 12px;
  color: #bfbfbf;
  margin: 0px 6px;
}
</style>