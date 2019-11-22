<!--  -->
<template>
  <div>
    <div
      style="padding-top:46px;height:calc(100vh - 46px);background-color:rgba(248, 248, 248, 0.45)"
    >
      <NavBar>
        <div slot="left-screen" @click="onReturn">
          <img src="../../assets/return.png" />
          <span style="position:relative;top:-3px;">返回</span>
        </div>
        <div slot="title-screen">草稿箱</div>
        <div slot="right-screen"></div>
      </NavBar>
      <div v-if="list.length==0" class="nodynamic">
        <h5>您还没有创建过音频卡片哦~</h5>
        <router-link tag="p" :to="`/createcourse`" class="go">去创建</router-link>
      </div>
      <div v-else class="results">
        <van-swipe-cell v-for="(item, index) in list" :key="item.id">
          <div class="cardList">
            <div class="audio1" @click.stop="startPlayOrPause(index)">
              <span>
                <img :src="item.playing?stopsvg:playsvg" />
              </span>
              <img :src="item.cover" style=" opacity: 0.5;" />
            </div>
            <audio ref="aaudio" @pause="onPause(index)" @play="onPlay" :src="item.audiourl"></audio>
            <div class="message">
              <div class="title">{{item.title}}</div>
              <div class="intro">{{item.intro}}</div>
              <div class="time">{{item.data}}</div>
            </div>
          </div>
          <template slot="right" style="height:100%;" class="dele">
            <van-button square type="danger" text="取消收藏" @click="deleteRecord(item.id)" />
          </template>
        </van-swipe-cell>
      </div>
    </div>
  </div>
</template>

<script>
import HotList from "@/components/community/List.vue";

import NavBar from "@/components/base/NavBar.vue";
export default {
  data() {
    return {
      isLoading: false,
      show: false,
      hidden: null,
      hiddenU: null,
      list: [],

      playsvg: require("../../assets/playsvg.svg"),
      stopsvg: require("../../assets/stopsvg.svg"),
      dataList: [],
      articleList: [],
      videoList: []
    };
  },
  components: {
    HotList,
    NavBar
  },

 
  methods: {
    //ajax请求刷新数据
    onReturn() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    getMyRecord() {
      var data = new FormData();
      data.append("id", JSON.parse(localStorage.getItem("user")).id);
      this.axios
        .post("/getMyAudioCard", data)
        .then(res => {
          //   this.dataList = res.data.data;
          console.log(res.data.data);
          this.list = res.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    deleteRecord(id) {
      var data = new FormData();
      data.append("record_id", id);
      this.axios
        .post("/delCourseRecord", data)
        .then(res => {
          console.log(res);
           
           this.getMyRecord();
           
        })
        .catch(error => {
          console.log(error);
        });
    },
    startPlayOrPause(index) {
      console.log(this.list[index].playing);
      console.log(this.list);
      return this.list[index].playing ? this.pause(index) : this.play(index);
    },
    play(index) {
      this.list[index].playing = true;
      this.$refs.aaudio[index].play();
    },
    // 暂停音频
    pause(index) {
      this.list[index].playing = false;
      this.$refs.aaudio[index].pause();
    },
    onPlay(res) {
      console.log(res);
      let target = res.target;
      let audios = document.getElementsByTagName("audio");
      [...audios].forEach(item => {
        if (item !== target) {
          item.pause();
          console.log(item);
        }
      });
    },
    onPause(index) {
      this.list[index].playing = false;
    },
  },
  created() {},
  mounted() {
    this.getMyRecord();
  },
  deactivated() {
    //销毁实例，防止缓存
    this.$destroy(true);
  }
};
</script>

<style scoped lang="scss">
.nodynamic {
  width: 100%;
  height: 100px;
  background: url(../../assets/serch-null.png) no-repeat 0 0;
  background-size: 100px;
  display: table;
  // margin: 80px auto 40px;
  margin: 0 auto;
  padding: 15px 0 0 115px;
  text-align: left;
  position: absolute;
  top: 40%;
  transform: translate(20px, -50%);
}
.nodynamic * {
  margin: 0;
  padding: 0;
}
.nodynamic h5 {
  font-size: 18px;
  color: #8fafc6;
  font-weight: bold;
}
.nodynamic p {
  margin: 15px 0 10px 50px;
  font-size: 14px;
  color: #bdc3c7;
  font-weight: bold;
}
.nodynamic p span {
  color: #947e7e;
}
// .nodynamic .go {
//   margin: 15px 0 0 15px;
//   font-size: 35px;
//   color: #5e91b6;
// }

.results {
//   padding-top: 10px;
//   background-color: #f1f1f1;
}
.results .result {
  background-color: white;
  padding: 10px;
  box-sizing: border-box;
  // margin-bottom: 10px;
  margin-bottom: 10px;
}
.result .title {
  font-size: 16px;
  text-align: left;
  margin-bottom: 5px;
  display: -webkit-box;
  -webkit-line-clamp: 2; // 控制多行的行数
  -webkit-box-orient: vertical;
}
.result .content {
  height: 100%;
  display: flex;
  text-align: left;
}
.result .content .message {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.result .content .message p {
  margin: 0;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; // 控制多行的行数
  -webkit-box-orient: vertical;
  line-height: 22px;
}

.result .content .message > span {
  font-size: 13px;
  // letter-spacing:6px;
}
.result .content .message > span span {
  margin-right: 10px;
}
.result img {
  min-width: 110px;
  height: 70px;
  object-fit: cover;
}
::v-deep .van-swipe-cell__right button {
  height: 100%;
}

.cardList {
  display: flex;
  align-items: center;
  justify-content: center;
}
.cardList .audio1 {
  width: 60px;
  height: 60px;
  position: relative;
  margin-right: 12px;
}
.cardList .audio1 span {
  // width: 18px;
  // height: 18px;
}

.cardList .audio1 > img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 5px;
}
.cardList .audio1 span {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.cardList .message {
  flex-grow: 1;
}
.message > div {
  margin: 0;
  padding: 0;
}
.message .title {
  font-size: 14px;
  color: black;
}
.message .intro {
  max-width: 60vw;
  overflow-x: hidden;
}
.message .intro,
.message .time {
  font-size: 13px;
  color: gray;
}
::v-deep .van-swipe-cell__wrapper{
    padding: 20px;
    text-align: left;
    border-bottom: 10px solid white;
}
</style>