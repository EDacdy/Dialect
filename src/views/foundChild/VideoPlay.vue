<!--  -->
<template>
  <div style="background-color:#f5f7fb;">
    <div class="return" @click="onReturn">
      <img src="../../assets/rrr.svg" />
    </div>
    <div class="video" id="dplayer">
      <!-- <video
        id="video"
        controls="true"
        preload="auto"
        webkit-playsinline="true"
        playsinline="true"
        x-webkit-airplay="allow"
        x5-video-player-type="h5"
        x5-video-player-fullscreen="true"
        x5-video-orientation="portraint"
        style="object-fit:fill"
      > 
        <source src="https://www.w3school.com.cn/i/movie.ogg" type="video/ogg" />Your browser does not support the video tag.
      </video>-->
      <d-player @play="play" ref="player" :options="options"></d-player>
    </div>
    <div class="o_message">
      <van-tag color="#627df5">标题</van-tag>
      {{videoDetails.title}}
      <br />
      <span class="block">2019-08-01</span>
    </div>
    <div class="explain">
      <div class="text">
        <!-- "马来西亚乡音考古工作者张吉安，于2005年1月发起【乡音考古】计划，
        行脚到马来西亚大小城镇边陲，探寻各个南方籍贯，开启老人的记忆匣子，记录逐渐消音的乡谣曲艺."-->
        {{videoDetails.zhaiyao}}
      </div>
      <div class="componets">
        <img :src="favor?favor2:favor1" @click="favorite" />
        <img src="../../assets/comm.svg" @click="inputshows" />
      </div>
    </div>
    <div class="favor"></div>
    <div class="comments">
      <div class="native" id="comment">
        评论
        <div class="bottomdiv"></div>
      </div>
      <div class="nobody" v-if="comments.length==0">
        <img src="../../assets/nobody.svg" />
        <span>还没有评论,第一个发表评论吧！</span>
      </div>
      <div class="comment" v-for="(comment,index)  in comments" :key="comment.id" v-else>
        <div class="headimg">
          <img :src="comment.headimg" />
        </div>
        <div class="message">
          <div class="header">
            <div class="username">
              {{comment.username}}
              <br />
              <span>{{comment.time}}</span>
            </div>
            <div class="good" @click="addGood(index,comment.id)">
              {{comment.goods}}
              <img :src="comment.good ? active :normal" />
            </div>
          </div>
          <div
            class="co"
            v-if="!comment.to_uid"
            @click="addinput(comment.username,comment.id)"
          >{{comment.content}}</div>
          <div class="co" v-else @click="addinput(comment.username,comment.id)">
            <span>@{{comment.to_username}}</span>
            :{{comment.content}}
          </div>
          <van-divider />
        </div>
      </div>

      <van-search
        ref="inputfocus"
        autofocus="autofocus"
        :placeholder="placeholder"
        left-icon
        @search="search"
        clearable
        input-align="center"
        v-model="value"
        style="position:fixed;bottom:0;width:100%;padding: 2px 10px;"
        v-if="inputshow"
        @focus="inputfocus"
      ></van-search>
    </div>
  </div>
</template>

<script>
import dPlayer from "vue-dplayer";
import "vue-dplayer/dist/vue-dplayer.css";
export default {
  data() {
    return {
      videoDetails: {},
      player: null,
      options: {
        video: {
          // url: "https://www.w3school.com.cn/i/movie.ogg"
          url: ""
        },
        contextmenu: [{}]
      },
      placeholder: "说点什么吧",
      value: null,
      to_username: null,
      to_uid: null,
      inputshow: false,
      favor: false,
      favor1: require("../../assets/favor.svg"),
      favor2: require("../../assets/favor_fill.svg"),
      normal: require("../../assets/good.svg"),
      active: require("../../assets/goodfill.svg"),
      comments: [
        // {
        //   id: 1,
        //   username: "chenchen",
        //   headimg: "https://img.yzcdn.cn/vant/cat.jpeg",
        //   time: "1小时前",
        //   goods: 5,
        //   content: "乡土情感的表达需要方言",
        //   clickgood: false,
        //   from_uid: 201703060, //评论用户的id
        //   to_uid: 201703060, //评论目标用户id
        //   to_username: "chenchen" //评论目标用户名
        // },
        // {
        //   id: 2,
        //   username: "chenchen",
        //   headimg: "https://img.yzcdn.cn/vant/cat.jpeg",
        //   time: "2小时前",
        //   goods: 1,
        //   content: "狭义上的分类这是一个不错的标准",
        //   clickgood: true,
        //   from_uid: 201703060,
        //   to_uid: null,
        //   to_username: null
        // }
      ]
    };
  },
  components: {
    dPlayer
  },
  methods: {
    onReturn() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    addGood(index, commentId) {
      console.log("index" + index + " id " + commentId);
      let goodstate = this.comments[index].good;
      this.comments[index].good = !goodstate;
      //取消点赞
      if (goodstate) {
        this.comments[index].goods--;
      } else {
        this.comments[index].goods++;
      }
      this.addVideoCommentGood(this.comments[index].id);
    },
    addinput(to_username, to_uid) {
      this.placeholder = "回复" + to_username + ":";
      this.to_username = to_username;
      this.to_uid = to_uid;
    },
    search() {
      this.$toast.loading("正在保存评论");
      //此处写axios请求刷新评论
      this.addVideoComment();
    },
    play() {
      console.log("play callback");
    },
    favorite() {
      this.favor = !this.favor;
      this.addVideoLike();
    },
    inputshows() {
      this.inputshow = !this.inputshow;
    },
    inputfocus() {
      console.log("1111");
    },
    getVideoDetails() {
      var data = new FormData();
      data.append("video_id", this.$route.params.id);
      this.axios
        .post("/getVideoDetails", data)
        .then(res => {
          console.log(res);
          // this.options.video.url = res.data.data.video_url;
          this.videoDetails = res.data.data;
          console.log(res.data.data.video_url);
          console.log(this.options.video.url);
          this.$refs.player.dp.switchVideo(
            { url: res.data.data.video_url },
            {}
          );
        })
        .catch(error => {
          console.log(error);
        });
    },
    getVideoComments() {
      //根据视频id获取评论  且返回登录用户的评论点赞情况
      var data = new FormData();
      data.append("video_id", this.$route.params.id);
      data.append("id", JSON.parse(localStorage.getItem("user")).id);

      this.axios
        .post("/getVideoComments", data)
        .then(res => {
          console.log(res);
          this.comments = res.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getVideoLikeMessage() {
      //根据视频id和本地用户id请求收藏信息（视频下方星号）
      var data = new FormData();
      data.append("video_id", this.$route.params.id);
      data.append("id", JSON.parse(localStorage.getItem("user")).id);
      this.axios
        .post("/getVideoLikeMessage", data)
        .then(res => {
          console.log(res.data.data);
          this.favor = res.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    addVideoComment() {
      //对视频添加评论  或  回复他人（to_username为空时）
      var data = new FormData();
      data.append("video_id", this.$route.params.id);
      if (this.to_uid != null) {
        data.append("to_uid", this.to_uid);
      }
      data.append("content", this.value);
      data.append("id", JSON.parse(localStorage.getItem("user")).id);
      this.axios
        .post("/addVideoComment", data)
        .then(res => {
          //如果成功 调用刷新方法
          this.getVideoComments();
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
    },
    addVideoCommentGood(value) {
      //给视频下别人的评论点赞或取消点赞
      var data = new FormData();
      data.append("to_uid", value);
      data.append("id", JSON.parse(localStorage.getItem("user")).id);
      console.log(value+" "+JSON.parse(localStorage.getItem("user")).id)
      this.axios
        .post("/addVideoCommentGood", data)
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
    },
    addVideoLike() {
      //收藏或取消收藏视频
      var data = new FormData();
      data.append("video_id", this.$route.params.id);
      data.append("id", JSON.parse(localStorage.getItem("user")).id);
      this.axios
        .post("/addVideoLike", data)
        .then(res => {
          console.log(res.data.data);
          if (res.data.data) {
            this.$toast.success({ duration: 500, message: "收藏成功" });
          }else{
            this.$toast.success({ duration: 500, message: "已取消收藏" });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    this.player = this.$refs.player.dp;
    this.getVideoDetails();
    this.getVideoComments();
    this.getVideoLikeMessage();
  },
  deactivated() {
    //销毁实例，防止缓存
    this.$destroy(true);
  }
};
</script>

<style scoped lang="scss">
.return {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  padding: 15px;
}
.o_message {
  width: calc(100%-30px);
  height: auto;
  background-color: white;
  text-align: left;
  padding: 15px;
  font-size: 15px;
}
.o_message .block {
  display: block;
  text-align: right;
  font-size: 12px;
  color: gray;
}
.explain {
  width: 100%;
  background-color: white;
  margin: 10px 0;
  font-size: 15px;
  text-align: left;
}
.explain .text {
  padding: 15px;
  position: relative;
}
.text:before {
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  border-top: 1px solid #d6d8e0;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
.componets {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: left;
  padding: 5px 15px;
}
.componets img {
  margin-right: 20px;
}
.dplayer {
  width: 100%;
  height: 35vh;
  max-height: 250px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
}
.video {
  width: 100%;
  height: 35vh;
  background-color: aqua;
}

.video video {
  width: 100%;
  // height: 35vh;
}
.fixed_bottom {
  position: fixed;
  bottom: 0;
  height: 45px;
  width: 100%;
  background-color: white;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.comments {
  background-color: white;
}
.comments .native {
  height: 40px;
  width: auto;
  padding: 0;
  position: relative;
  margin-bottom: 15px;
  text-align: left;
  font-size: 14px;
  font-weight: 600;
  color: #4c4e51;
  padding-left: 20px;
  line-height: 40px;
}
.native:before {
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  border-top: 1px solid #c8c9ce;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
.bottomdiv {
  position: absolute;
  left: 27px;
  bottom: 2px;
  width: 18px;
  border-radius: 10%;
  border-top: 2px solid #317ef3;
}
.comment {
  display: flex;
}
.comment .headimg {
  min-width: 75px;
  width: 60px;
  height: auto;
  padding: 3px 0;
  flex-grow: 0;
}
.headimg img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  object-fit: cover;
}
.message {
  flex-grow: 1;
}
.header {
  display: flex;
}
.header .username {
  height: 40px;
  text-align: left;
  flex-grow: 1;
  font-size: 14px;
  line-height: 18px;
}
.username span {
  font-size: 12px;
  color: gray;
}
.header .good {
  width: 60px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: gray;
}
.good img {
  margin-left: 3px;
}
.comment .co {
  text-align: left;
  padding: 5px 20px 0 0;
  font-size: 15px;
}
.co span {
  color: #317ef3;
}
.nobody {
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 50px;
  box-sizing: border-box;
}
.nobody span {
  margin-top: 10px;
  font-size: 14px;
  color: #707070;
}
</style>