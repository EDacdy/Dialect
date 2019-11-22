<!--  -->
<template>
  <div>
    <div style="padding-top:46px">
      <NavBar>
        <div slot="left-screen" @click="onReturn">
          <img src="../../assets/return.png" />
          <span style="position:relative;top:-3px;">返回</span>
        </div>
        <div slot="title-screen">文章详情</div>
        <div slot="right-screen" @click="favorite">
          <img :src="favor?favor2:favor1" />
        </div>
      </NavBar>
      <div>
        <div class="cover">
          <img :src="article.cover" />
          <div class="title">{{article.title}}</div>
        </div>
        <div class="content" v-html="article.content"></div>
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
          <div class="a_hidden" v-show="isClick">
            <img src="../../assets/ahi.svg" />
          </div>
          <div class="fixed_bottom" :class="{'o_hidden':isClick }">
            <span @click="close">
              <img src="../../assets/hidden.svg" />
            </span>
            <van-search
              :placeholder="placeholder"
              shape="round"
              left-icon
              @search="search"
              clearable
              input-align="center"
              v-model="value"
              style="width:80%;padding: 0px 10px;"
            ></van-search>
            <span @click="scroll">
              <img src="../../assets/ccc.svg" />
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/base/NavBar.vue";
export default {
  data() {
    return {
      isClick: false,
      placeholder: "说点什么吧",
      value: null,
      to_username: null,
      to_uid: null,
      isLoading: false,
      favor: false,
      normal: require("../../assets/good.svg"),
      active: require("../../assets/goodfill.svg"),
      favor1: require("../../assets/favor.svg"),
      favor2: require("../../assets/favor_fill.svg"),
      article: {
        // id: 1, //article_id
        // title: "汉语方言分区的两个基本标准", //标题
        // content: "", //内容
        // cover: "https://img.yzcdn.cn/vant/cat.jpeg", //封面
        // time: "2019-08-06" //发表时间
      },
      comments: [
        // {
        //   id: 1,
        //   username: "chenchen",
        //   headimg: "https://img.yzcdn.cn/vant/cat.jpeg",
        //   time: "1小时前",
        //   goods: 5,
        //   content: "乡土情感的表达需要方言",
        //   good: false,
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
        //   good: true,
        //   from_uid: 201703060,
        //   to_uid: 0,
        //   to_username: 0
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
    addGood(index, commentId) {
      console.log("index" + index + "id " + commentId);
      let goodstate = this.comments[index].good;
      this.comments[index].good = !goodstate;
      //取消点赞
      if (goodstate) {
        this.comments[index].goods--;
      } else {
        this.comments[index].goods++;
      }
      this.addArticleCommentGood(this.comments[index].id);
    },
    addinput(to_username, to_uid) {
      console.log(to_username);
      this.placeholder = "回复" + to_username + ":";
      this.to_username = to_username;
      this.to_uid = to_uid;
    },
    search() {
      this.$toast.loading("正在保存评论");
      //此处写axios请求刷新评论
      this.addArticleComment();
    },
    scroll() {
      const returnEle = document.querySelector("#comment");
      if (!!returnEle) {
        returnEle.scrollIntoView(true);
        this.placeholder = "说点什么吧";
      }
    },
    close() {
      this.isClick = !this.isClick;
    },
    favorite() {
      this.favor = !this.favor;
      this.addArticleLike();
    },
    getArticleDetails() {
      var data = new FormData();
      data.append("article_id", this.$route.params.id); //url中的文章id
      this.axios
        .post("/getArticleDetails", data)
        .then(res => {
          console.log(res);
          this.article = res.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getArticleComments() {
      //根据文章id获取评论  且返回登录用户的评论点赞情况
      var data = new FormData();
      data.append("article_id", this.$route.params.id); //url中的文章id
      data.append("id", JSON.parse(localStorage.getItem("user")).id);
      this.axios
        .post("/getArticleComments", data)
        .then(res => {
          console.log(res);
          this.comments = res.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getLikeMessage() {
      //根据文章id和本地用户名请求收藏信息（右上角星号）
      var data = new FormData();
      data.append("articleid", this.$route.params.id); //url中的文章id
      data.append("id", JSON.parse(localStorage.getItem("user")).id);
      this.axios
        .post("/getLikeMessage", data)
        .then(res => {
          console.log(res);
          this.favor = res.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    addArticleCommentGood(value) {
      //给别人的评论内容 点赞或取消
      var data = new FormData();
      data.append("to_uid", value);
      data.append("id", JSON.parse(localStorage.getItem("user")).id);
      this.axios
        .post("/addArticleCommentGood", data)
        .then(res => {
          console.log(res);
          // console.log("评论点赞");
          if (res.data.data == false) {
            this.$toast.success({ duration: 500, message: "已取消点赞" });
          } else {
            this.$toast.success({ duration: 500, message: "点赞成功" });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    addArticleComment() {
      var data = new FormData();
      data.append("article_id", this.$route.params.id); //url中的文章id
      data.append("to_id", this.to_uid); //评论目标用户  没有选择回复用户时可为空
      data.append("content", this.value); //评论内容
      data.append("id", JSON.parse(localStorage.getItem("user")).id); //本地存储的用户信息-id
      //对文章添加评论  或回复他人 to_uid不为空时
      this.axios
        .post("/addArticleComment", data)
        .then(res => {
          this.$toast.success({ duration: 500, message: "发表成功" });
          //如果成功 调用刷新方法
          this.getArticleComments();
        })
        .catch(error => {
          console.log(error);
        });
    },
    addArticleLike() {
      //收藏或取消收藏文章
      var data = new FormData();
      data.append("article_id", this.$route.params.id); //url中的文章id
      data.append("id", JSON.parse(localStorage.getItem("user")).id);
      this.axios
        .post("/addArticleLike", data)
        .then(res => {
          if (res.data.data == false) {
            this.$toast.success({ duration: 500, message: "已取消收藏" });
          } else {
            this.$toast.success({ duration: 500, message: "收藏成功" });
          }
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    this.getArticleDetails();
    this.getArticleComments();
    this.getLikeMessage();
  },
  deactivated() {
    //销毁实例，防止缓存
    this.$destroy(true);
  }
};
</script>
<style scoped lang="scss">
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
.o_hidden {
  opacity: 0;
  transition: opacity 1s;
}
.a_hidden {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 40px;
  width: 40px;
  padding: 5px 0 0 5px;
}
::v-deep .van-nav-bar__left {
  top: 5px;
  display: table-cell;
  vertical-align: middle;
}
.cover {
  position: relative;
  // margin-bottom: 20px;
}
.cover img {
  width: 100%;
  width: 100%;
  object-fit: cover;
}
.cover .title {
  position: absolute;
  bottom: 25px;
  color: white;
  font-size: 22px;
  padding: 0 20px;
}
.content {
  padding: 10px 20px;
  line-height: 30px;
  text-align: left;
}
.comments {
  padding-bottom: 40px;
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