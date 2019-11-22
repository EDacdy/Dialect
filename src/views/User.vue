<!--  -->
<template>
  <div style="padding-top:46px;background-color:#f8f8f8">
    <NavBar>
      <div slot="left-screen"></div>
      <div slot="title-screen">我的</div>
      <div slot="right-screen">
        <!-- <img src="../assets/music.png" /> -->
      </div>
    </NavBar>
    <!-- 内容模块 -->
    <div>
      <router-link tag="div" class="user" to="/changemessage">
        <img :src="user.headimg" class="headimg" />
        <b>{{user.username}}</b>
        <span style="margin-left:auto;">
          <img src="../assets/jian.svg" />
        </span>
      </router-link>
      <router-link tag="div" :to="`/userpage/${user.id}`" class="userpage">
        <img src="../assets/userpage.svg" />
        个人主页
        <span style="margin-left:auto;">
          <img src="../assets/jian.svg" />
        </span>
      </router-link>
      <div class="more">
        <router-link tag="div" to="/mycourse">
          <img src="../assets/star.svg" />
          我的课程
          <span style="margin-left:auto;">
            <img src="../assets/jian.svg" />
          </span>
        </router-link>
        <router-link tag="div" to="/mydynamic">
          <img src="../assets/dong.svg" />
          我的动态
          <span style="margin-left:auto;">
            <img src="../assets/jian.svg" />
          </span>
        </router-link>
        <router-link tag="div" to="/mycollect">
          <img src="../assets/star.svg" />
          我的收藏
          <span style="margin-left:auto;">
            <img src="../assets/jian.svg" />
          </span>
        </router-link>
      </div>
      <div class="more">
        <router-link tag="div" to="/feedback">
          <img src="../assets/yijian.svg" />
          意见反馈
          <span style="margin-left:auto;">
            <img src="../assets/jian.svg" />
          </span>
        </router-link>
        <div>
          <img src="../assets/star.svg" />
          关于我们
          <span style="margin-left:auto;">
            <img src="../assets/jian.svg" />
          </span>
        </div>
      </div>
      <div class="exit" @click="exitlogin">退出登录</div>
    </div>

    <TabBar />
  </div>
</template>

<script>
import TabBar from "@/components/base/TabBar.vue";
import NavBar from "@/components/base/NavBar.vue";
export default {
  data() {
    return {
      user: {
        // id: 1,
        // username: "EDa",
        // headimg: "https://img.yzcdn.cn/vant/cat.jpeg"
      }
    };
  },
  components: {
    TabBar,
    NavBar
  },
  methods: {
    exitlogin() {
      this.$dialog
        .confirm({
          message: "确定退出登录并且回到登录页面？"
        })
        .then(() => {
          localStorage.removeItem("user");
          this.$router.push("/login");
        })
        .catch(() => {});
    }
  },
  mounted() {
    let tmpUser = JSON.parse(localStorage.getItem("user"));
    this.user = tmpUser;
    //  let tmpUser = JSON.stringify(this.user)
    //     // 登录信息存到本地
    //     localStorage.setItem('user', tmpUser)
  },
  deactivated() {
    //销毁实例，防止缓存
    this.$destroy(true);
  }
};
</script>
<style scoped lang="scss">
.user {
  height: 90px;
  box-sizing: border-box;
  padding: 10px 20px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
}
.user .headimg {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
}
.userpage {
  height: auto;
  padding: 15px 20px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  font-size: 14px;
  box-sizing: border-box;
}
.userpage > img {
  margin-right: 10px;
}
.more {
  margin-bottom: 15px;
  background-color: white;

  font-size: 14px;
}
.more > div {
  width: 100%;
  padding: 15px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  position: relative;
}
.more > div:not(:last-child)::after {
  position: absolute;
  box-sizing: border-box;
  content: " ";
  pointer-events: none;
  right: 0;
  bottom: 0;
  left: 15px;
  border-bottom: 1px solid #ebedf0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
.more > div > img {
  margin-right: 10px;
}
.exit {
  padding: 15px 20px;
  text-align: center;
  font-size: 14px;
  background-color: white;
  color: #f04e5c;
}
</style>