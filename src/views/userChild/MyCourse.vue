<!--  -->
<template>
  <div style="padding-top:46px;height:calc(100vh - 46px);background-color:rgb(248, 248, 248)">
    <NavBar>
      <div slot="left-screen" @click="onReturn">
        <img src="../../assets/return.png" />
        <span style="position:relative;top:-3px;">返回</span>
      </div>
      <div slot="title-screen">我的课程</div>
      <div slot="right-screen" @click="toDraft">草稿箱</div>
    </NavBar>
    <div class="box">
       <router-link to="/userplan" tag="div" class="idcard" >
        身份认证
        <span>
          <img src="../../assets/jian.svg" />
        </span>
      </router-link>
      <div class="makebutton">
        <van-button
          :icon="makeimg"
          color="#2a9fe4"
          type="info"
          size="large"
          :text="'创建'"
          @click="submit"
          to="/createcourse"
        />
      </div>
      <p>已发布的课程</p>
      <div class="courseList">
        <router-link
          tag="div"
          class="courseElement"
          v-for="(item,index) in courseList"
          :key="index"
          :to="`/coursedetails/${item.id}`"
        >
          <img :src="item.cover" class="cover" />
          <div class="message">
            <div>{{item.title}}</div>
            <div>{{item.time}}&nbsp;更新了"{{item.last}}"</div>
            <div>
              <img src="../../assets/sound.svg" style="margin-right:7px;" />
              {{item.recordnum}}
            </div>
          </div>
          <div class="enter">
            <img src="../../assets/jian.svg" />
          </div>
        </router-link>
        <!-- <div class="courseElement">
          <img src="../../assets/huixiangoushu.jpg" class="cover"/>
          <div class="message">
            <div>温州话</div>
            <div>20189-08-30&nbsp;更新了"温州18"</div>
            <div> <img src="../../assets/sound.svg" style="margin-right:7px;">5</div>
          </div>
          <div class="enter"><img src="../../assets/jian.svg" /></div>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/base/NavBar.vue";
export default {
  data() {
    return {
      makeimg: require("../../assets/makec.svg"),
      courseList: [
        // {
        //   course_id:1,
        //   cover: require("../../assets/20190723175107.png"),
        //   title:"温州话教程",
        //   intro:"这是一个温州话教程",//课程说明
        //   time:"2019-09-01",//最后更新时间
        //   nums:5, //课程内音频数量
        //   last:"音频1111", //最后一条更新的音频title
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
    submit() {},
    getMyCourse() {
      var data = new FormData();
      data.append("id", JSON.parse(localStorage.getItem("user")).id); //id
      this.axios
        .post("/getMyCourse", data)
        .then(res => {
          console.log(res);
          this.courseList = res.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    toDraft() {
      this.$router.push("/draft");
    }
  },
  mounted() {
    this.getMyCourse();
  }
};
</script>
<style scoped lang="scss">
.makebutton {
  padding: 20px 0px;
  background-color: white;
}
::v-deep .van-button {
  width: 85%;
  border-radius: 25px;
  font-size: 16px;
}

::v-deep .van-nav-bar__right {
  top: 0;
}
.box .idcard {
  padding: 10px 10px 10px 15px;
  background-color: white;
  margin-bottom: 15px;
  text-align: left;
  font-size: 15px;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
}
.box .idcard span {
  margin-left: auto;
}
.box p {
  margin: 6px 0 6px 10px;
  text-align: left;
  color: #777070;
  font-size: 14px;
}
.courseList {
  background-color: white;
}
.courseList .courseElement {
  display: flex;
  padding: 10px;
  box-sizing: border-box;
  position: relative;
}
.courseElement .cover {
  width: 80px;
  height: 75px;
  object-fit: cover;
  margin: 0px 6px;
  border-radius: 7px;
}
.courseElement .message {
  display: flex;
  flex-direction: column;
  align-content: left;
  justify-content: space-between;
  font-size: 14px;
  text-align: left;
}
.courseElement .enter {
  position: absolute;
  right: 0%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.courseElement:not(:last-child)::after {
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
</style>