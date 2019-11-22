<!--  -->
<template>
  <div>
    <div
      style="padding-top:46px;min-height:calc(100vh - 96px);background-color:rgba(248, 248, 248, 0.45)"
    >
      <NavBar>
        <div slot="left-screen" @click="onReturn">
          <img src="../../assets/return.png" />
          <span style="position:relative;top:-3px;">返回</span>
        </div>
        <div slot="title-screen">我的动态</div>
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
      <div v-if="dataList.length==0" class="nodynamic">
        <h5>您还没有发表过动态哦~</h5>
        <p>去发表动态吧！</p>
        <router-link tag="p" :to="`/addtrends`" class="go">Go</router-link>
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

      dataList: [
        // {
        //   id: 1,
        //   username: "chenchen",
        //   headimg: require("../../assets/20190723175107.png"),
        //   time: "2019-08-22", //评论时间  最好返回相对时间
        //   content: "隔河语不同,两村话不一", //评论内容
        //   imgs: [
        //     //图片数组 可空可1可2 不可再多了
        //     require("../../assets/20190723175107.png"),
        //     require("../../assets/20190723175107.png")
        //   ],
        //   //语言链接
        //   audiourl: "",
        //   follow: false, //根据传的用户名是否关注来决定是t是f
        //   good: false, //点赞 就是点爱心
        //   goodnum: 10, //点赞人数
        //   commentNum: 55, //评论人数
        //   place: "宁波" //用户city信息
        // },
        // {
        //   id: 2,
        //   username: "chenchen",
        //   headimg: require("../../assets/20190723175107.png"),
        //   time: "2019-08-22",
        //   content: "隔河语不同,两村话不一",
        //   imgs: [require("../../assets/20190723175107.png")],
        //   audiourl: null,
        //   follow: false,
        //   good: false,
        //   goodnum: 50,
        //   commentNum: 55,
        //   place: "温州"
        // }
      ]
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
    getMyDynamic() {
      var data = new FormData();
      data.append("id", JSON.parse(localStorage.getItem("user")).id);
      this.axios
        .post("/getMyDynamic", data)
        .then(res => {
          this.dataList = res.data.data;
          console.log(res.data.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {},
  mounted() {
    this.getMyDynamic();
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
  font-size: 14px;
  color: #bdc3c7;
  font-weight: bold;
}
.nodynamic .go {
  margin: 15px 0 0 15px;
  font-size: 35px;
  color: #5e91b6;
}
</style>