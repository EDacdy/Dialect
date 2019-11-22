<!--  -->
<template>
  <div>
    <van-tabs v-model="active" sticky swipeable title-inactive-color="#323233">
      <div slot="nav-left" style="margin:12px 40px 0px 15px;">
        <router-link to="/addfriends">
          <img src="../assets/add.svg" />
        </router-link>
      </div>
      <!-- 社区关注 -->
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh('recommend')">
        <van-tab>
          <span slot="title">关注</span>
          <div slot="default">
            <div class="recommend">
              <div class="title">智能推荐</div>
              <div>
                <van-swipe :loop="false" :width="130" :height="150" :show-indicators="false">
                  <van-swipe-item v-for="(swiper,index) in recommend" :key="index">
                    <div class="reco">
                      <img :src="swiper.headimg" />
                      {{swiper.username}}
                      <span>温州市</span>
                      <van-button
                        size="mini"
                        @click="adduser(index,swiper.id)"
                      >{{swiper.isfollow==false?'关注':'已关注'}}</van-button>
                    </div>
                  </van-swipe-item>
                </van-swipe>
              </div>
            </div>
            <HotList
              v-for="(dl,index) in recommendList"
              :alldata="dl"
              :id="dl.id"
              :indexkey="index"
              :key="dl.id"
              v-on:openSheet="openSheet(arguments)"
            ></HotList>
          </div>
        </van-tab>
      </van-pull-refresh>
      <!-- 热门动态 -->
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh('hot')">
        <van-tab>
          <span slot="title">热门</span>
          <div slot="default">
            <HotList
              v-for="(dl,index) in hotList"
              :alldata="dl"
              :id="dl.id"
              :indexkey="index"
              :key="dl.id"
              v-on:openSheet="openSheet(arguments)"
            ></HotList>
          </div>
        </van-tab>
      </van-pull-refresh>
      <!-- 最新动态 -->
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh('new')">
        <van-tab>
          <span slot="title">最新</span>
          <div slot="default">
            <HotList
              v-for="(dl,index) in newList"
              :alldata="dl"
              :id="dl.id"
              :indexkey="index"
              :key="dl.id"
              v-on:openSheet="openSheet(arguments)"
            ></HotList>
          </div>
        </van-tab>
      </van-pull-refresh>
      <div slot="nav-right" style="margin:12px 15px 0px 40px;">
        <router-link to="/addtrends">
          <img src="../assets/write.svg" />
        </router-link>
      </div>
    </van-tabs>
    <van-action-sheet
      v-model="show"
      :actions="actions"
      cancel-text="取消"
      @select="onSelect"
      @cancel="onCancel"
    />
    <TabBar />
  </div>
</template>

<script>
import TabBar from "@/components/base/TabBar.vue";
import HotList from "@/components/community/List.vue";
// import mockData from "../mock/pdlist";

export default {
  data() {
    return {
      isLoading: false,
      show: false,
      hidden: null,
      hiddenU:null,

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
      recommendList: [],
      hotList: [],
      newList: [
        {
          id: 1,
          username: "chenchen",
          headimg: require("../assets/20190723175107.png"),
          time: "2019-08-22", //评论时间  最好返回相对时间
          content: "隔河语不同,两村话不一", //评论内容
          imgs: [
            //图片数组 可空可1可2 不可再多了
            require("../assets/20190723175107.png"),
            require("../assets/20190723175107.png")
          ],
          //语言链接
          audiourl: "",
          follow: false, //根据传的用户名是否关注来决定是t是f
          good: false, //点赞 就是点爱心
          goodnum: 10, //点赞人数
          commentNum: 55, //评论人数
          place: "宁波" //用户city信息
        }
      ],
      dataList: [
        {
          id: 1,
          username: "chenchen",
          headimg: require("../assets/20190723175107.png"),
          time: "2019-08-22", //评论时间  最好返回相对时间
          content: "隔河语不同,两村话不一", //评论内容
          imgs: [
            //图片数组 可空可1可2 不可再多了
            require("../assets/20190723175107.png"),
            require("../assets/20190723175107.png")
          ],
          //语言链接
          audiourl: "",
          follow: false, //根据传的用户名是否关注来决定是t是f
          good: false, //点赞 就是点爱心
          goodnum: 10, //点赞人数
          commentNum: 55, //评论人数
          place: "宁波" //用户city信息
        },
        {
          id: 2,
          username: "chenchen",
          headimg: require("../assets/20190723175107.png"),
          time: "2019-08-22",
          content: "隔河语不同,两村话不一",
          imgs: [require("../assets/20190723175107.png")],
          audiourl: null,
          follow: false,
          good: false,
          goodnum: 50,
          commentNum: 55,
          place: "温州"
        }
      ]
    };
  },
  components: {
    TabBar,
    HotList
  },
  methods: {
    //ajax请求刷新数据
    onRefresh(type) {
      // setTimeout(() => {
      //   this.$toast.success({ duration: 800, message: "刷新成功" });
      //   this.isLoading = false;
      //   this.count++;
      //   console.log(type + "发起刷新请求");
      // }, 500);

      // if (type == "hot") {
      //   this.getCommunityList("hot");
      // } else if (type == "new") {
      //   this.getCommunityList("new");
      // } else if (type == "recommend") {
      //   this.getCommunityList("recommend");
      // }
      var data = new FormData();
      data.append("type", type); //热门-hot   最新-new   关注-recommend
      data.append("id", JSON.parse(localStorage.getItem("user")).id);
      console.log(type + "" + JSON.parse(localStorage.getItem("user")).id);
      this.axios
        .post("/getCommunityList", data)
        .then(res => {
          // console.log(res);
          if (type === "hot") {
            this.hotList = res.data.data;
            this.$toast.success({ duration: 800, message: "刷新成功" });
            this.isLoading = false;
            console.log(res.data.data);
          } else if (type === "new") {
            this.newList = res.data.data;
            console.log(res.data.data);
            this.$toast.success({ duration: 800, message: "刷新成功" });
            this.isLoading = false;
          } else if (type === "recommend") {
            this.recommendList = res.data.data;
            console.log(res.data.data);
            this.$toast.success({ duration: 800, message: "刷新成功" });
            this.isLoading = false;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    onSelect(item, index) {
      console.log(index);
      if (index === 0) {
        
        this.$dialog
          .confirm({
            title: "提示",
            message: "确定不再显示该用户动态吗？"
          })
          .then(() => {
            //ajax请求后台屏蔽用户
            this.show = false;
             this.hiddenUser();
          })
          .catch(() => {});
      } else if (index === 1) {
        this.$toast("将为您屏蔽该动态");
         this.hiddenId();
        this.show = false;
      } else if (index === 2) {
        this.$dialog
          .confirm({
            title: "提示",
            message: "确定举报该用户不良行为吗？\n"
          })
          .then(() => {
            this.show = false;
            var data = new FormData();
            data.append("hidden_id", this.hidden);
            data.append("id", JSON.parse(localStorage.getItem("user")).id);
            this.axios
              .post("/jubao", data)
              .then(res => {
                this.$toast("已将举报提交至后台等待审核");
                console.log(res);
              })
              .catch(error => {
                console.log(error);
              });
          })
          .catch(() => {});
      }
    },
    onCancel() {},
    openSheet(val) {
      this.show = true;
      this.hidden = val[1];
      this.hiddenU = val[3];
      console.log(val);
    },
    hiddenId() {
      var index = this.hotList.findIndex(item => {
        if (item.id == this.hidden) {
          return true;
        }
      });
      this.hotList.splice(index, 1);
      console.log("删除" + index + this.hidden);
    },
    async hiddenUser() {
      console.log(this.hiddenU);
      this.hotList.findIndex((item,index,arr) => {
        if (item.userid == this.hiddenU) {
          // return true;
            this.hotList.splice(index, 1);
            console.log("删除" + index + this.hiddenU);
        }
      });
    
      
    },
    aaaa(val) {
      console.log(val);
    },
    adduser(index, id) {
      // this.recommend[index].buttontext = "已关注";
      this.recommend[index].isfollow = true;
      this.addRecommends(id);
      
    },
    getCommunityList(type) {
      //根据用户名和请求的标签类型返回对应的list 及关注情况
      var data = new FormData();
      data.append("type", type); //热门-hot   最新-new   关注-recommend
      data.append("id", JSON.parse(localStorage.getItem("user")).id);
      this.axios
        .post("/getCommunityList", data)
        .then(res => {
          // console.log(res);
          if (type === "hot") {
            this.hotList = res.data.data;
            console.log("热门");
            console.log(res.data.data);
          } else if (type === "new") {
            this.newList = res.data.data;
            console.log("最新");
            console.log(res.data.data);
          } else if (type === "recommend") {
            this.recommendList = res.data.data;
            console.log(res.data.data);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getRecommends() {
      //传用户名返回未关注过的推荐用户列表 十条
      var data = new FormData();
      data.append("id", JSON.parse(localStorage.getItem("user")).id);
      console.log(JSON.parse(localStorage.getItem("user")).id);
      this.axios
        .post("/getRecommends", data)
        .then(res => {
          console.log(res.data.data);
          this.recommend = res.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    addRecommends(id) {
      var data = new FormData();
      data.append("to_id", id);
      data.append("id", JSON.parse(localStorage.getItem("user")).id);
      console.log(id + " " + JSON.parse(localStorage.getItem("user")).id);
      this.axios
        .post("/addRecommends", data)
        .then(res => {
          console.log(res);

          this.$toast.success({ duration: 600, message: "关注成功" });
           this.getCommunityList("recommend");
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {},
  mounted() {
    this.getCommunityList("hot");
    this.getCommunityList("new");
    this.getCommunityList("recommend");
    this.getRecommends();
  },
  beforeRouteEnter (to, from, next) {
  next(vm => {
    // 通过 `vm` 访问组件实例
    if(from.name=="addtrends"){
      vm.getCommunityList("new");
    }
  })
}
};
</script>

<style scoped lang="scss">
::v-deep .van-tab--active {
  font-size: 15px;
  font-weight: 600;
  transition: 0.1s;
  -moz-transition: 0.1s; /* Firefox 4 */
  -webkit-transition: 0.1s; /* Safari 和 Chrome */
  -o-transition: 0.1s; /* Opera */
}
::v-deep .van-tabs__line {
  background-color: rgb(22, 21, 21) !important;
}
::v-deep .van-hairline--top-bottom::after {
  border-top: none;
}
.content {
  background-color: #f1f1f1;
  width: auto;
  height: 120px;
  position: relative;
  margin: 8px 10px;
  padding: 8px;
}
.content .header {
  width: auto;
  height: 60px;
  position: relative;
  background-color: white;
}
.header .headimg img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
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
::v-deep .van-swipe-item {
  // background-color: yellow;
  // margin: 5px 10px;
}
.recommend {
  background-color: #f1f1f1;
  margin: 10px auto;
  box-sizing: border-box;
  padding-bottom: 5px;
}
.recommend .title {
  font-size: 14px;
  padding: 5px 10px;
  text-align: left;
  color: #808594;
  font-weight: bold;
}
.recommend .reco:first-child {
  margin-left: 10px;
}
.recommend .reco {
  border: 1px solid white;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  padding: 10px;
  font-size: 13px;
  line-height: 24px;
}
.reco span {
  font-size: 12px;
  color: gray;
}
.reco img {
  width: 45px;
  height: 45px;
  object-fit: cover;

  border-radius: 50%;
  margin-bottom: 5px;
}
</style>