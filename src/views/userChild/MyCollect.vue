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
        <div slot="title-screen">我的收藏</div>
        <div slot="right-screen"></div>
      </NavBar>

      <div>
        <HotList
          v-for="(dl,index) in dataList"
          :alldata="dl"
          :id="dl.id"
          :indexkey="index"
          :key="dl.id"
          v-on:openSheet="openSheet(arguments)"
        ></HotList>
      </div>
      <div v-if="articleList.length==0" class="nodynamic">
        <h5>您还没有任何收藏哦~</h5>
        <router-link tag="p" :to="`/article`" class="go">
          去收藏
          <span>文章</span>
        </router-link>
        <router-link tag="p" :to="`/video`" class="go">
          去收藏
          <span>视频</span>
        </router-link>
      </div>
      <div v-else class="results">
        <van-swipe-cell v-for="(art,index) in articleList" :key="index">
          <router-link tag="div" :to="`/articledetails/${art.id}`" class="result">
            <div class="title">
              <span style="font-size:14px;">
                <van-tag round type="primary">文章</van-tag>
              </span>
              {{art.title}}
            </div>
            <div class="content">
              <div class="message">
                <p>{{art.content|htmlfilter}}</p>
                <span>
                  <span>{{art.goodnum}}收藏</span>·&nbsp;
                  <span>评论</span>·&nbsp;
                  <span>{{art.time}}</span>
                </span>
              </div>
              <img :src="art.cover" />
            </div>
          </router-link>

          <template slot="right" style="height:100%;" class="dele">
            <van-button square type="danger" text="取消收藏" @click="deleteArticle(art.id)" />
          </template>
        </van-swipe-cell>

        <van-swipe-cell v-for="(art,index) in videoList" :key="index">
          <router-link tag="div" :to="`/videoplay/${art.id}`" class="result">
            <div class="title">
            <span style="font-size:14px;">
              <van-tag round type="success">视频</van-tag>
            </span>
            {{art.title}}
          </div>
          <div class="content">
            <div class="message">
              <p>{{art.zhaiyao}}</p>
              <span>
                <span>{{art.collect}}收藏</span>·&nbsp;
                <span>评论</span>·&nbsp;
                <span>{{art.time}}</span>
              </span>
            </div>
            <img :src="art.cover" />
          </div>
          </router-link>

          <template slot="right" style="height:100%;" class="dele">
            <van-button square type="danger" text="取消收藏" @click="deleteVideo(art.id)" />
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

      actions: [
        { name: "减少推荐该用户动态" },
        { name: "不再显示该动态" },
        { name: "举报", subname: "不良信息" }
      ],
      recommend: [
        {
          id: 1,
          username: "chenc2",
          city: "温州市"
        }
      ],
      active: 1,

      dataList: [],
      articleList: [],
      videoList: []
    };
  },
  components: {
    HotList,
    NavBar
  },

  filters: {
    htmlfilter: function(msg) {
      var msg = msg.slice(0, 100);
      msg = msg.replace(/<\/?[^>]*>/g, ""); //去除HTML Tag
      msg = msg.replace(/[|]*\n/, ""); //去除行尾空格
      msg = msg.replace(/&npsp;/gi, ""); //去掉npsp
      // msg = msg.replace(/&*;/gi, ""); //去掉npsp
      return msg;
    }
  },
  methods: {
    //ajax请求刷新数据
    onReturn() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    getMyCollect() {
      var data = new FormData();
      data.append("id", JSON.parse(localStorage.getItem("user")).id);
      this.axios
        .post("/getMyCollect", data)
        .then(res => {
          //   this.dataList = res.data.data;
          console.log(res.data.data);
          this.articleList = res.data.data.articles;
          this.videoList = res.data.data.videos;
        })
        .catch(error => {
          console.log(error);
        });
    },
    deleteArticle(id) {
      var data = new FormData();
      data.append("article_id", id); //url中的文章id
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
          this.getMyCollect();
        })
        .catch(error => {
          console.log(error);
        });
    },
    deleteVideo(id){
       var data = new FormData();
      data.append("video_id", id);
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
          this.getMyCollect();
        })
        .catch(error => {
          console.log(error);
        });
    
    }
  },
  created() {},
  mounted() {
    this.getMyCollect();
  },
  deactivated() {
    //销毁实例，防止缓存
    this.$destroy(true);
  }
};
</script>

<style scoped lang="scss">
::v-deep div.imgs {
  // clear: both;
  overflow: hidden;
}
::v-deep div.imgs img {
  width: 49%;
  height: 25vh;
  margin: 12px 0px 7px 0px;
  object-fit: cover;
}
::v-deep div.imgs img:first-child {
  width: 49%;
  float: left;
}
::v-deep div.imgs img:last-child {
  width: 49%;
  float: right;
}
::v-deep div.imgs > img:only-of-type {
  width: 100%;
  height: 25vh;
  margin: 12px 0px 5px 0px;
  object-fit: cover;
}
::v-deep .header {
  display: none;
}
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
  padding-top: 10px;
  background-color: #f1f1f1;
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
</style>