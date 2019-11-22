<!--  -->
<template>
  <div style="background-color:#f5f7fb;padding-top:46px">
    <NavBar>
      <div slot="left-screen" @click="onReturn">
        <img src="../../assets/return.png" />
        <span style="position:relative;top:-3px;">返回</span>
      </div>
      <div slot="title-screen">{{details.title}}</div>
      <div slot="right-screen">
        <img src="../../assets/more.png" />
      </div>
    </NavBar>
    <div class="cover">
      <img :src="details.cover" />
    </div>
    <van-tabs v-model="active" sticky :offset-top="46" swipeable>
      <van-tab>
        <span slot="title">详情</span>
        <div slot="default" class="head">
          <div class="header">
            <div class="title">{{details.title}}</div>
            <div class="nums">课程共计{{details.recordnum}}课</div>
            <div class="time">最近更新时间:{{details.time}}</div>
          </div>
          <div class="center">
            <div class="intro">课程简介</div>
            <div class="content">{{details.intro}}</div>
            <div class="author">作者简介</div>
            <div class="cellbox">
              <van-cell>
                <div class="headimg">
                  <img :src="author.headimg" />
                </div>
                <div class="username">{{author.username}}</div>
                <div class="fans">关注人数:{{author.fans}}</div>
                <div class="address">{{author.placecity}}</div>
                <div class="follow" v-if="!follow" @click="follows(author.id)">+关注</div>
                <div class="already" v-else>已关注</div>
              </van-cell>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab>
        <span slot="title">课程</span>
        <div slot="default">
          <van-cell v-for="(item, index) in list" :key="index">
            <div class="cardList">
              <div class="audio1" @click="startPlayOrPause(index)">
                <span>
                  <img :src="item.playing?stopsvg:playsvg" />
                </span>
                <img :src="item.cover" />
              </div>
              <audio
                ref="aaudio"
                @pause="onPause(index)"
                @play="onPlay"
                :src="item.audiourl"
                @loadedmetadata="onLoadedmetadata(index)"
              ></audio>
              <div class="message">
                <div class="title">{{item.title}}</div>
                <div class="intro">{{item.intro}}</div>
                <div class="time">
                  <div>{{item.username|formatTime}}</div>
                  <span>{{item.time}}</span>
                </div>
              </div>
            </div>
          </van-cell>
        </div>
      </van-tab>
      <van-tab>
        <span slot="title">评论</span>
        <div slot="default">
          <div class="nobody" v-if="comments.length==0">
            <img src="../../assets/nobody.svg" />
            <span>还没有评论,第一个发表评论吧！</span>
          </div>
          <div class="c_comment">
            <div class="c_box" v-for="(comment,index)  in comments" :key="index">
              <div class="c_img">
                <img :src="comment.user.headimg" />
              </div>
              <div class="c_message">
                <div class="c_user">
                  <span>{{comment.user.username}}</span>
                  <span style="font-size:14px">{{comment.time}}</span>
                </div>
                <div class="c_content">{{comment.comment.content}}</div>
              </div>
            </div>
          </div>
          <!-- <div class="c_comment">
            <div class="comment" v-for="(comment,index)  in comments" :key="comment.id">
              <div class="">
                <img :src="comment.headimg" />
              </div>
              <div class="">
                <div class="">
                  <div class="">
                    {{comment.username}}
                    <br />
                    <span>{{comment.time}}</span>
                  </div>
                  <div class="" @click="addGood(index,comment.id)">
                    {{comment.goods}}
                    <img :src="comment.clickgood ? active :normal" />
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
          </div>-->

          <!-- <van-search
              ref="inputfocus"
              autofocus="autofocus"
              placeholder="placeholder"
              left-icon
              @search="search"
              
              v-model="value"
              style="position:fixed;bottom:0;width:100%;padding: 2px 10px;"
              
          ></van-search>-->
          <van-search
            placeholder="对课程有什么想法可以表达出来"
            v-model="value"
            left-icon
            show-action=""
            @search="search"
            style="position:fixed;bottom:10px;width:100%;"
          >
            <div slot="action" @click="search">发送</div>
          </van-search>
          <!-- </div> -->
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import NavBar from "@/components/base/NavBar.vue";
export default {
  data() {
    return {
      value: null,
      follow:false,
      playsvg: require("../../assets/playsvg.svg"),
      stopsvg: require("../../assets/stopsvg.svg"),
      normal: require("../../assets/good.svg"),
      active: require("../../assets/goodfill.svg"),
      author: {
        id: 1,
        username: "CC",
        headimg: "https://img.yzcdn.cn/vant/cat.jpeg",
        fans: 188,
        address: "广州",
        follow: false,
        jianjie: "土生土长广州人"
      },
      details: {
        // id:8,
        // cover:null,
        // intro:null,
        // recordnum:null,
        // title:null,
        // userid:null
      },
      list: [
        {
          id: 1,
          username: "chenchen",
          cover: require("../../assets/play.png"),
          title: "正宗温州话",
          intro: "第一段音频-介绍温州",
          time: "2019-08-30",
          audiourl:
            "https://uploadfile1.talkmate.com/card/sounds/16/08/28/57c2683035bed.mp3",
          playing: false
        }
      ],
      comments: [
        // {
        //   id: 1,
        //   username: "chenchen",
        //   headimg: "https://img.yzcdn.cn/vant/cat.jpeg",
        //   time: "1小时前",
        //   content: "乡土情感的表达需要方言"
        // },
        // {
        //   id: 2,
        //   username: "chenchen",
        //   headimg: "https://img.yzcdn.cn/vant/cat.jpeg",
        //   time: "2小时前",
        //   content: "狭义上的分类这是一个不错的标准"
        // },
        // {
        //   id: 1,
        //   username: "chenchen",
        //   headimg: "https://img.yzcdn.cn/vant/cat.jpeg",
        //   time: "1小时前",
        //   content: "乡土情感的表达需要方言"
        // },
        // {
        //   id: 1,
        //   username: "chenchen",
        //   headimg: "https://img.yzcdn.cn/vant/cat.jpeg",
        //   time: "1小时前",
        //   content: "乡土情感的表达需要方言"
        // },
        // {
        //   id: 1,
        //   username: "chenchen",
        //   headimg: "https://img.yzcdn.cn/vant/cat.jpeg",
        //   time: "1小时前",
        //   content: "乡土情感的表达需要方言"
        // }
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
    search() {
      var data = new FormData();
      data.append("id", JSON.parse(localStorage.getItem("user")).id);
      data.append("content", this.value);
      data.append("course_id", this.$route.params.id); //路径中课程id
      this.axios
        .post("/addCourseComments", data)
        .then(res => {
          console.log(res);
          this.getCourseComments();
        })
        .catch(error => {
          console.log(error);
        });
    },
    getCourseComments() {
      var data = new FormData();
      data.append("id", this.$route.params.id); //路径中课程id
      this.axios
        .post("/getCourseComments", data)
        .then(res => {
          console.log(res);
          this.comments = res.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    follows(user_id) {
      this.follow = !this.follow;
      console.log(user_id);
       var data = new FormData();
      data.append("to_id", user_id);
      data.append("id", JSON.parse(localStorage.getItem("user")).id);
      this.axios
        .post("/addRecommends",data)
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
    },
    //  getUserToUser(){

    //    var data = new FormData();
    //   data.append("id", JSON.parse(localStorage.getItem("user")).id);
    //   data.append("to_id", this.author.id);
    //   this.axios
    //     .post("/isFollow", data)
    //     .then(res => {
    //       console.log(res);
    //       // this.follow = !this.follow
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // },
    //课程音频播放 下
    startPlayOrPause(index) {
      console.log(this.list[index].playing);
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
      console.log(res.target);
      let target = res.target;
      let audios = document.getElementsByTagName("audio");
      [...audios].forEach(item => {
        if (item !== target) {
          item.pause();
          // console.log(item);
        }
      });
    },
    onPause(index) {
      this.list[index].playing = false;
    },
    getCourseDetails() {
      //根据课程id获取该课程详情 和作者信息
      var data = new FormData();
      data.append("id", this.$route.params.id); //id

      this.axios
        .post("/getCourseDetails", data)
        .then(res => {
          console.log(res);
          this.details = res.data.data;
          this.author = res.data.data.user;
        })
        .catch(error => {
          console.log(error);
        });
    },
    // getRecommend(){
    //    var data = new FormData();
    //   data.append("id", JSON.parse(localStorage.getItem("user")).id); //id
    //   data.append("author_id", this.author.id);
    //   this.axios
    //     .post("/getFollow", data)
    //     .then(res => {
    //       console.log(res);
    //       this.details = res.data.data;
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // },
    getCourseAudio() {
      //根据课程id获取该课程下所有音频
      var data = new FormData();
      data.append("id", this.$route.params.id); //id
      this.axios
        .post("/getCourseAudio", data)
        .then(res => {
          console.log(res);
          this.list = res.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    onLoadedmetadata(index) {
      //音频时长
      var dur = this.$refs.aaudio[index].duration;
      this.list[index].username = dur;
    }
  },
  mounted() {
    this.getCourseAudio();
    this.getCourseDetails();
    this.getCourseComments();
    this.getUserToUser();
  },
  filters: {
    formatTime: function(second) {
      var secondType = typeof second;
      if (secondType === "number" || secondType === "string") {
        second = parseInt(second);
        var mimute = Math.floor(second / 60);
        second = second - mimute * 60;
        return ("0" + mimute).slice(-2) + ":" + ("0" + second).slice(-2);
      } else {
        return "00:00";
      }
      return value;
    }
  },
  deactivated() {
    //销毁实例，防止缓存
    this.$destroy(true);
  }
};
</script>

<style scoped lang="scss">
.cover img {
  width: 100%;
  max-height: 35vh;
}
::v-deep .van-tabs__line {
  background-color: #2a9fe4 !important;
  width: 40px !important;
  height: 2px !important;
}
::v-deep .van-cell {
  padding: 10px 0;
  
}
.head .header {
  padding: 15px 20px;
  display: flex;
  flex-direction: column;
  text-align: left;
  background-color: white;
}
.head .header > div,
.center > div {
  margin-bottom: 5px;
}
.head .header .title,
.head .center .intro,
.head .center .author {
  font-size: 16px;
  font-weight: bold;
}
.head .header .nums {
  font-size: 14px;
  color: gray;
}
.head .header .time {
  font-size: 14px;
  color: gray;
}
.head .center {
  margin-top: 10px;
  padding: 15px 20px;
  text-align: left;
  background-color: white;
}
.head .center .content {
  font-size: 14px;
  color: gray;
  padding-bottom: 20px;
}
//作者信息

.headimg {
  width: 55px;
  height: 55px;
}
.headimg img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
  padding-top: 2px;
}
.cellbox {
  min-height: 100px;
}
.cellbox .username {
  position: absolute;
  top: 0px;
  left: 60px;
  font-size: 14px;
}
.cellbox .fans {
  position: absolute;
  top: 34px;
  left: 60px;
  font-size: 12px;
  color: gray;
}
.cellbox .address {
  position: absolute;
  top: 18px;
  left: 60px;
  font-size: 12px;
  color: gray;
}
.cellbox .follow,
.cellbox .already {
  position: absolute;
  top: 10px;
  right: 0px;
  border: solid 1px black;
  width: 45px;
  font-size: 12px;
  text-align: center;
}
.cellbox .already {
  border: none;
  color: #cebebe;
}

//课程音频list样式

.cardList {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0 0 15px;
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
  // white-space: nowrap;
  // overflow-x: auto;
}
.message .intro,
.message .time {
  font-size: 13px;
  color: gray;
  display: flex;
  padding-right: 20px;
}
.message .time span {
  margin-left: auto;
}
.c_comment {
  padding: 10px;
  padding-bottom: 55px;
  background-color: white;
}
.c_comment .c_box {
  padding: 10px;
  display: flex;
}
.c_comment .c_box .c_img img {
  width: 55px;
  height: 55px;
  border-radius: 50%;
}
.c_comment .c_box .c_message {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin-left: 10px;
  flex-grow: 1;
}
.c_message .c_user {
  width: 100%;
  font-size: 16px;
  color: gray;
  display: flex;
  justify-content: space-between;
  align-content: center;
}

.c_message .c_content {
  font-size: 14px;
  color: rgb(53, 52, 52);
  text-align: left;
}
.nobody {
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 50px;
  box-sizing: border-box;
  background-color: white;
}
.nobody span {
  margin-top: 10px;
  font-size: 14px;
  color: #707070;
}
</style>