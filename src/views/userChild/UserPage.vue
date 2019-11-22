<!--  -->
<template>
  <div style="padding-top:46px;height:calc(100% - 46px)">
    <NavBar>
      <div slot="left-screen" @click="onReturn">
        <img src="../../assets/return.png" />
        <span style="position:relative;top:-3px;">返回</span>
      </div>
      <div slot="title-screen">个人主页</div>
      <div slot="right-screen"></div>
    </NavBar>
    <!-- <div class="bg"> -->
    <div class="bgimg">
      <img src="../../assets/cf2c702egy1ffhb5zn9xhj20hs0p5dhh.png" style="width:100%;opacity: 0.2;" />
    </div>
    <!-- </div> -->
    <div class="box">
      <div class="flexbox">
        <div class="headimg">
          <img :src="user.headimg" />
        </div>
        <div class="username">{{user.username}}</div>
        <div class="jianjie">个人简介:{{user.intro}}</div>
        <div class="place">
          <img src="../../assets/imap.svg" />
          {{user.placecity}}
        </div>
        <van-button  v-show="control" size="small" @click="addRecommend">{{this.buttonText===false?"关注":"取消关注"}}</van-button>
      </div>
      <div class="popup">
        <div class="recommend">
          <div class="left">
            <div class="text">
              {{user.stars}}
              <br />
              <span >关注</span>
            </div>
            <div class="imgs">
              <img v-for="(img,index) in focus" :src="img" :key="index" />
            </div>
          </div>
          <div class="right">
            <div class="text">
              {{user.fans}}
              <br />
              <span>被关注</span>
            </div>
          </div>
        </div>
        <div class="bgimg2">
          <van-swipe
            :loop="false"
            style="width:100%;height:calc(100vh - 46px - 383px);min-height:200px;"
            vertical
            :show-indicators="false"
          >
            <van-swipe-item v-for="(dl,index) in dataList" :key="index">
              <div class="o_swift">
                <div class="o_content">{{dl.content}}</div>
              </div>
            </van-swipe-item>
             <van-swipe-item v-if="dataList.length==0">
              <div class="o_swift">
                <div class="o_content" style="font-size:14px;">发表过的动态和其他信息会在此展示<br/>
                </div>
              </div>
            </van-swipe-item>
          </van-swipe>
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
      buttonText: true,
      user: {
        user_id: 1,
        username: "EDa",
        headimg: "https://img.yzcdn.cn/vant/cat.jpeg"
      },
      control:true,
      focus: {},
      data1:[

      ],
      dataList: [
        {
          id: 1,
          username: "chenchen",
          headimg: require("../../assets/20190723175107.png"),
          time: "2019-08-22", //评论时间  最好返回相对时间
          content: "隔河语不同,两村话不一", //评论内容
          imgs: [
            //图片数组 可空可1可2 不可再多了
            require("../../assets/20190723175107.png"),
            require("../../assets/20190723175107.png")
          ],
          //语言链接
          audiourl: "",
          follow: false, //根据传的用户名是否关注来决定是t是f
          good: false, //点赞 就是点爱心
          goodnum: 10, //点赞人数
          commentNum: 55, //评论人数
          place: "宁波" //用户city信息
        }
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
    addRecommend() {
      this.buttonText = !this.buttonText;
    },

    myFocus() {
      var data = new FormData();
      data.append("id", this.$route.params.id);
      //获取传过去id的关注人数  不是被关注！！！ 返回最后五个关注人数的头像
      this.axios
        .post("/getMyFocus", data)
        .then(res => {
          console.log(res.data.data);
          this.focus = res.data.data.imgs;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getUser() {
      var data = new FormData();
      data.append("id", this.$route.params.id);
      this.axios
        .post("/getUser", data)
        .then(res => {
          console.log(res.data.data);
          this.user = res.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getMyDynamic() {
      var data = new FormData();
      data.append("id", this.$route.params.id);
      this.axios
        .post("/getMyDynamic", data)
        .then(res => {
          this.dataList = res.data.data;
          console.log(res.data.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getUserToUser(){
       var data = new FormData();
      if(JSON.parse(localStorage.getItem("user")).id==this.$route.params.id){
        this.control = false;
        console.log("dsadsads");
      }
      data.append("id", JSON.parse(localStorage.getItem("user")).id);
      data.append("to_id", this.$route.params.id);
      this.axios
        .post("/isFollow", data)
        .then(res => {
          console.log(res.data.data);
          this.buttonText= res.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    let tmpUser = JSON.parse(localStorage.getItem("user"));
    // console.log(tmpUser);
    this.user = tmpUser;
    this.myFocus();
    this.getUser();
    this.getMyDynamic();
    this.getUserToUser();
  },
   deactivated() {
    //销毁实例，防止缓存
    this.$destroy(true);
  }
};
</script>
<style scoped lang="scss">
.bg {
}
.bgimg {
  position: fixed;
  top: 46px;
}
.bgimg img {
  width: 100vw;

  max-height: 56vh;
  object-fit: fill;
}
.box {
  position: relative;
  height: calc(100vh - 46px);
}
.flexbox {
  position: absolute;
  left: 50%;
  top: 14%;
  transform: translate(-50%, 0%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  //   align-items: center
}
.flexbox > div {
  margin-bottom: 9px;
}
.flexbox .headimg {
  width: 80px;
  height: 80px;
}
.jianjie {
  font-size: 12px;
  max-width: 70vw;
  overflow: auto;
  white-space: nowrap;
  // overflow-x: hidden;
}
.jianjie::-webkit-scrollbar {
  display: none;
}
.flexbox .headimg img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
}
.flexbox .place {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}
.box .popup {
  position: absolute;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.69);
  min-height: 50vh;
  width: 100%;
}
.recommend {
  height: 90px;
  padding: 10px;
  background-color: #f1f1f126;
  box-sizing: border-box;
  display: flex;
  color: black;
}
.recommend .left {
  border-right: 1px solid #cac1c1;
  min-width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 30px;
  box-sizing: border-box;
}

.recommend .left .text {
  margin-right: 15px;
}
.recommend span {
  font-size: 12px;
  color: #8c8888;
}
.recommend .left .imgs {
}
.recommend .left .imgs img {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid white;
  margin-left: -4px;
}
.recommend .right {
  width: auto;
  max-width: 50%;
  margin-left: auto;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
}
.o_swift {
  background-color: #f1f1f1;
  width: 100%;
  height: 100%;
  padding: 40px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}
.o_swift .o_content {
  text-align: justify;
  color: #997d7d;
  // width: 100%;
  border: 20px #e9e1e1 solid;
  outline: 20px solid #ebe9eb;
}
// .bgimg2{
//   background-image: url(../../assets/nigel-tadyanehondo-417616-unsplash.jpg);
//   filter: grayscale(200%);
//   background-size: 100% 100%;
// }
</style>