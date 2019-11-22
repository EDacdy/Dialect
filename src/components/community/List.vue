<!--  -->
<template>
  <div>
    <div class="content" :key="list.id">
      <div class="header">
        <div class="headimg">
          <img :src="list.headimg" />
        </div>
          <router-link tag="div" :to="`/userpage/${list.userid}`" class="username">
          {{list.username}}
          <br />
          <span>{{list.time}}</span>
        </router-link>
        <van-tag round color="#bcb4b4" v-show="!list.follow" @click="addFollow(list.userid)">关注</van-tag>
        <span class="more" @click="open">
          <img src="../../assets/more1.svg" />
        </span>
      </div>
      <div class="center">
        <div style="margin:5px 0;">{{list.content}}</div>
        <div class="imgs">
          <img
            v-for="(aimg,index) in list.imgs"
            :src="aimg"
            :key="index"
            @click="componentCall(index)"
          />
        </div>
        <TalkAudio v-if="list.audiourl!=null" :toUrl="list.audiourl"></TalkAudio>
        <div class="addition">
          <div style="margin-right:50px">
            <img :src=" list.good? active : normal" @click="endchance(list.id,list.username)" />
            <span v-show="list.goodnum!=0">{{list.goodnum}}</span>
          </div>
          <div @click="showPopup(list.id)">
            <img :src=" commentHighlight? cct : cco" @click="commentchance(list.id)" />
            <span>{{list.commentNum}}</span>
          </div>
          <div style="margin-left: auto;">
            <span>{{list.city}}</span>
            <img src="../../assets/place.svg" />
          </div>
        </div>
      </div>
      <van-image-preview
        v-model="show"
        :images="list.imgs"
        :swipe-duration="300"
        :loop="false"
        :start-position="this.startPosition"
      />
      <van-popup
        v-model="popupShow"
        round
        position="bottom"
        :style="{ height: 'auto',width:'100%',paddingBottom:'50px' }"
        @close="commentchance"
        get-container="body"
      >
        <div class="popupcomment">
          <div class="top">
            {{comments.length}}条评论
            <span @click="closePopup">
              <img src="../../assets/close.svg" />
            </span>
          </div>
          <div class="comments" v-if="comments.length!=0">
            <div class="comment" v-for="(comment,index)  in comments" :key="comment.id">
              <div class="headimg">
                <img :src="comment.headimg" />
              </div>
              <div class="message">
                <div class="head">
                  <div class="name">
                    {{comment.username}}
                    <br />
                    <span>{{comment.time}}</span>
                  </div>
                  <div class="good" @click="addGood(comment.id,index)" style="margin-left:auto">
                    <span v-if="comment.goods!=0">{{comment.goods}}</span>
                    <img :src="comment.clickgood ? goodcancel :good" />
                  </div>
                </div>
                <div
                  class="co"
                  v-if="!comment.to_uid"
                  @click="addinput(comment.username)"
                >{{comment.content}}</div>
                <div class="co" v-else @click="addinput(comment.username)">
                  <span>@{{comment.to_username}}</span>
                  :{{comment.content}}
                </div>
                <van-divider />
              </div>
            </div>
          </div>
          <div v-else class="nobody">
            <img src="../../assets/nobody.svg" />
            <span>还没有评论,第一个发表评论吧！</span>
          </div>
        </div>
        <van-search
          :placeholder="placeholder"
          clearable
          @clear="clearable"
          v-model="value"
          show-action=""
          left-icon
          @search="send"
          style="position:absolute;bottom:0;width:100%;"
        >
          <div slot="action" @click="send">发送</div>
        </van-search>
      </van-popup>
    </div>
  </div>
</template>

<script>
import TalkAudio from "@/components/base/TalkAudio.vue";

export default {
  props: {
    id: Number,
    alldata: Object,
    indexkey:Number
  },
  data() {
    return {
      dy_id: null,
      popupShow: false,
      to_id: null,
      to_username: null,
      placeholder: "留下您的精彩评论吧",
      value: null,
      show: false,
     
      startPosition: 0,
      list: this.alldata,
      commentHighlight: false,
      normal: require("../../assets/love.svg"),
      active: require("../../assets/love1.svg"),
      cco: require("../../assets/cco.svg"),
      cct: require("../../assets/cct.svg"),
      good: require("../../assets/good.svg"),
      goodcancel: require("../../assets/goodfill.svg"),
      comments: [
        {
          id: 1,
          username: "chenchen",
          headimg: "https://img.yzcdn.cn/vant/cat.jpeg",
          time: "1小时前",
          goods: 5,
          content: "乡土情感的表达需要方言",
          clickgood: false,
          from_uid: 201703060, //评论用户的id
          to_uid: 201703060, //评论目标用户id
          to_username: "chenchen" //评论目标用户名
        },
        {
          id: 2,
          username: "chenchen",
          headimg: "https://img.yzcdn.cn/vant/cat.jpeg",
          time: "2小时前",
          goods: 1,
          content: "狭义上的分类这是一个不错的标准",
          clickgood: true,
          from_uid: 201703060,
          to_uid: null,
          to_username: null
        }
      ]
    };
  },
  components: {
    TalkAudio
  },
  methods: {
    open() {
      let flag =true;
      this.$emit("openSheet", flag,this.id,this.indexkey,this.list.userid);
    },
    endchance(id, username) {
      //点赞点爱心  社区动态语音条下面的小爱心
      if (!this.list.good) {
        this.list.goodnum++;
      } else {
        this.list.goodnum--;
      }
      this.list.good = !this.list.good;
      var data = new FormData();
      data.append("to_id", id); //点爱心目标id
      data.append("id", JSON.parse(localStorage.getItem("user")).id); //本地存储的用户信息-id
      this.axios
        .post("/addDynamicLike", data)
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
    },
    commentchance(dy_id) {
      this.commentHighlight = !this.commentHighlight;
      //当前动态评论弹出层的索引id
      this.dy_id = dy_id;
    },
    addFollow(id) {
      //添加关注
      this.list.follow = true;
      var data = new FormData();
      data.append("to_id", id);
      data.append("id", JSON.parse(localStorage.getItem("user")).id);
      console.log(id + " " + JSON.parse(localStorage.getItem("user")).id);
      this.axios
        .post("/addRecommends", data)
        .then(res => {
          this.$toast.success({ duration: 800, message: "关注成功" });
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
    },
    //显示图片预览组件
    componentCall(index) {
      this.show = true;
      this.startPosition = index;
    },
    showPopup(dy_id) {
      //点击社区评论按你时 显示评论弹出层 并请求加载该动态下的所有评论
      //以及传当前用户id一起返回评论点赞情况
      this.popupShow = true;
      var data = new FormData();
      data.append("dy_id", dy_id);
      data.append("id", JSON.parse(localStorage.getItem("user")).id);
      this.axios
        .post("/getDynamicComments", data)
        .then(res => {
          console.log(res);
          this.comments = res.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    closePopup() {
      this.popupShow = !this.popupShow;
    },
    addGood(commentId,index) {
      console.log("id " + commentId +" "+index);
      var data = new FormData();
      data.append("co_id", commentId);
      data.append("id", JSON.parse(localStorage.getItem("user")).id);
      
      //为社区动态下的评论内容 点赞或取消点赞
      this.axios
        .post("/addDynamicCommentsLike",data)
        .then(res => {
          console.log(res);
          let goodstate = this.comments[index].clickgood;
      this.comments[index].clickgood = !goodstate;
      //取消点赞
      if (goodstate) {
        this.comments[index].goods--;
      } else {
        this.comments[index].goods++;
      }
        })
        .catch(error => {
          console.log(error);
        });
    },
    send() {
      //评论社区下动态  传动态id 和当前用户id 和评论内容  和 回复用户id（可为空）
      var data = new FormData();
      data.append("dy_id", this.dy_id);
      if (this.to_id != null) {
        data.append("to_id", this.to_id);
      }

      data.append("content", this.value);
      data.append("id", JSON.parse(localStorage.getItem("user")).id);
      console.log(this.dy_id + "" + this.to_id + "" + this.value);
      this.axios
        .post("/addDynamicComments", data)
        .then(res => {
          console.log(res);
          this.showPopup(this.dy_id);
          this.value=null;
          this.$toast.success({ duration: 800, message: "发表评论成功" });
        })
        .catch(error => {
          console.log(error);
        });
    },
    addinput(to_username) {
      console.log(to_username);
      this.placeholder = "回复" + to_username + ":";
      this.to_username = to_username;
    },
    clearable() {
      this.to_username = null;
      this.placeholder = "留下您的精彩评论吧";
    }
  }
};
</script>

<style scoped lang="scss">
::v-deep .van-tag {
  padding: 0.2em 0.6em;
  position: absolute;
  right: 25px;
  top: 10px;
}
::v-deep .van-image-preview__index {
  top: 96%;
}
.content {
  position: relative;
  margin: 8px 10px;
  padding: 10px 10px 2px 10px;
  background-color: #f1f1f1;
}
.content .header {
  width: auto;
  height: 50px;
  position: relative;
  // background-color: white;
}
.header .headimg {
  position: absolute;
  left: 0px;
  top: 0px;
  opacity: 1;
}
.header .headimg img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}
.header .username {
  width: auto;
  position: absolute;
  left: 46px;
  top: 5px;
  text-align: left;
  font-size: 18px;
  line-height: 16px;
  color: black;
}
.more {
  position: absolute;
  right: 0px;
  top: 12px;
}
.username span {
  font-size: 12px;
  color: #9c9c9c;
}
.center {
  text-align: justify;
  // font-weight: 600;
  // font-size: 95%;
  color: black;
  position: relative;
}
.addition {
  width: auto;
  height: 40px;
  display: flex;
}
.addition > div {
  min-width: 45px;
  display: flex;
  align-items: center;
  justify-content: left;
}
.addition span {
  margin-left: 2px;
  font-size: 14px;
  color: #8a8a8a;
}
//只有一张图片时的样式
// ::v-deep div.imgs > img:only-of-type {
//   width: 100%;
//   height: 25vh;
//   margin: 12px 0px 5px 0px;
//   object-fit: cover;
// }
// //两张图片
// ::v-deep div.imgs >img{
//   width: 49%;
//   height: 25vh;
//   margin: 12px 0px 5px 0px;
//   object-fit: cover;
// }
// ::v-deep div.imgs >img:first-child{
//   width: 49%;
//   float: left;
// }
// ::v-deep div.imgs >img:last-child{
//   width: 49%;
//   float: right;
// }
::v-deep .van-popup {
  position: absolute;
  bottom: 0;
  padding-bottom: 30px;
}
.popupcomment {
  width: auto;
  height: auto;
  // min-height: 50vh;
  max-height: 60vh;
}
.popupcomment .top {
  position: relative;
  text-align: center;
  padding: 13px 0px;
  font-size: 13px;
  font-weight: bold;
}
.popupcomment .comments {
  max-height: 60vh;
  overflow: auto;
  box-sizing: border-box;
  padding-bottom: 40px;
}
.top span {
  position: absolute;
  top: 10px;
  right: 15px;
  padding: 2px;
}
.popupcomment .comment {
  display: flex;
}
.popupcomment .comment .headimg {
  min-width: 70px;
  width: 60px;
  height: auto;
  padding: 3px 0;
  display: flex;

  flex-grow: 0;
  justify-content: center;
}
.popupcomment .headimg img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  object-fit: cover;
}
.popupcomment .message {
  flex-grow: 1;
}
.popupcomment .head {
  display: flex;
}
.popupcomment .head .name {
  height: 40px;
  text-align: left;
  flex-grow: 1;
  font-size: 14px;
  line-height: 18px;
}
.popupcomment .name span {
  font-size: 12px;
  color: gray;
}
.popupcomment .head .good {
  width: 60px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: gray;
}
.popupcomment .good img {
  margin-left: 3px;
}
.popupcomment .comment .co {
  text-align: left;
  padding: 5px 20px 0 0;
  font-size: 15px;
}
.popupcomment .co span {
  color: #317ef3;
}
.popupcomment .nobody {
  min-height: 40vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 50px;
  box-sizing: border-box;
}
.popupcomment .nobody span {
  margin-top: 10px;
  font-size: 14px;
  color: #707070;
}
</style>