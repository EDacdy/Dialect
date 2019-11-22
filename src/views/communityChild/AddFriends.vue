<!--  -->
<template>
  <div>
    <div style="padding-top:46px;">
      <NavBar>
        <div slot="left-screen" @click="onReturn">
          <img src="../../assets/return.png" />
          <span style="position:relative;top:-3px;">返回</span>
        </div>
        <div slot="title-screen">添加关注</div>
        <div slot="right-screen">
          <img src="../../assets/more.png" />
        </div>
      </NavBar>
      <form action="/">
        <van-search v-model="value" placeholder="请输入搜索关键词" @search="onSearch" show-action>
          <div slot="action" @click="onSearch">搜索</div>
        </van-search>
      </form>
      <!-- <div class="cellbox">
        <van-cell v-for="(user,index) in result" :key="index">
          <div class="headimg">
            <img :src="user.headimg" />
          </div>
          <div class="username">{{user.username}}</div>
          <div class="fans">关注人数:{{user.fans}}</div>
          <div class="address">{{user.placecity}}</div>
          <div class="follow" v-if="!user.isfollow" @click="follows">+关注</div>
          <div class="already" v-else>已关注</div>
        </van-cell>
      </div>-->
      <div class="cellbox">
        <van-cell v-for="(user,index) in result" :key="index">
          <div class="headimg">
            <img :src="user.headimg" />
          </div>
          <div class="username">{{user.username}}</div>
          <div class="fans">关注人数:{{user.fans}}</div>
          <div class="address">{{user.placecity}}</div>
          <div class="follow" v-if="!user.isfollow" @click="searchfollows(index,user.id)">+关注</div>
          <div class="already" v-else>已关注</div>
        </van-cell>
      </div>
      <van-divider>推荐</van-divider>
      <div class="cellbox">
        <van-cell v-for="(user,index) in users.slice(0,3)" :key="index">
          <div class="headimg">
            <img :src="user.headimg" />
          </div>
          <div class="username">{{user.username}}</div>
          <div class="fans">关注人数:{{user.fans}}</div>
          <div class="address">{{user.placecity}}</div>
          <div class="follow" v-if="!user.isfollow" @click="follows(index,user.id)">+关注</div>
          <div class="already" v-else>已关注</div>
        </van-cell>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/base/NavBar.vue";
export default {
  data() {
    return {
      value: null,
      follow: false,
      users: [
        // {
        //   username: "大润发",
        //   headimg: "https://img.yzcdn.cn/vant/cat.jpeg",
        //   fans: 188,
        //   address: "浙江杭州",
        //   follow: true
        // },
        // {
        //   username: "好心的旅行家",
        //   headimg: "https://img.yzcdn.cn/vant/cat.jpeg",
        //   fans: 198,
        //   address: "浙江温州",
        //   follow: false
        // },
        // {
        //   username: "赛博加朋克",
        //   headimg: "https://img.yzcdn.cn/vant/cat.jpeg",
        //   fans: 18,
        //   address: "重庆",
        //   follow: false
        // }
      ],
      result: []
    };
  },
  components: {
    NavBar
  },
  methods: {
    onReturn() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    onSearch() {
      console.log(this.value);
      //传搜索关键字  返回搜索结果  传登录id还可以返回关注情况
      var data = new FormData();
      data.append("id", JSON.parse(localStorage.getItem("user")).id);
      data.append("content", this.value);
      this.axios
        .post("/searchUser", data)
        .then(res => {
          console.log(res);
          this.result = res.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    follows(index, user_id) {
      this.users[index].isfollow = !this.users[index].isfollow;
      var data = new FormData();
      data.append("id", JSON.parse(localStorage.getItem("user")).id);
      data.append("to_id", user_id);
      this.axios
        .post("/addRecommends", data)
        .then(res => {
          console.log(res);
          if (res.data.data.follow) {
            this.$toast.success({ duration: 800, message: "关注成功" });
          } else {
            this.$toast.success({ duration: 800, message: "取消关注" });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    searchfollows(index, user_id) {
      this.result[index].isfollow = !this.result[index].isfollow;
      var data = new FormData();
      data.append("id", JSON.parse(localStorage.getItem("user")).id);
      data.append("to_id", user_id);
      this.axios
        .post("/addRecommends", data)
        .then(res => {
          if (res.data.data.follow) {
            this.$toast.success({ duration: 800, message: "关注成功" });
          } else {
            this.$toast.success({ duration: 800, message: "取消关注" });
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
      this.axios
        .post("/getRecommends", data)
        .then(res => {
          console.log(res.data.data);
          this.users = res.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    this.getRecommends();
  },
  deactivated() {
    //销毁实例，防止缓存
    this.$destroy(true);
  }
};
</script>

<style scoped lang="scss">
::v-deep .van-nav-bar__left {
  top: 6px;
  display: table-cell;
  vertical-align: middle;
}
::v-deep .van-divider {
  margin: 5px 0;
}
.cellbox ::v-deep .van-cell__title {
  text-align: left;
  padding-left: 8px;
  line-height: 36px;
}
.cellbox ::v-deep .van-cell {
  padding: 15px 15px;
  position: relative;
}

.cellbox ::v-deep .van-cell:not(:last-child)::after {
  right: 18px;
  left: 18px;
}
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
</style>