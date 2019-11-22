<!--  -->
<template>
  <div>
    <div style="padding-top:46px">
      <NavBar>
        <div slot="left-screen" @click="onReturn">
          <img src="../../assets/return.png" />
          <span style="position:relative;top:-3px;">返回</span>
        </div>
        <div slot="title-screen">课程</div>
        <div slot="right-screen">
          <router-link to="/search">
            <img src="../../assets/search.svg" />
          </router-link>
        </div>
      </NavBar>
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh()">
        <router-link
          tag="div"
         
          class="course"
          v-for="(item,index) in courseList"
          :key="index"
           :to="`/coursedetails/${item.id}`"
        >
          <div class="imgs">
            <img :src="item.cover" />
          </div>
          <div class="message">
            <div class="title">{{item.title}}</div>
            <div class="watch">
              <img src="../../assets/aaau.svg" />
              {{item.user.username}}
            </div>
            <div class="time">最近更新：{{item.time}}</div>
          </div>
        </router-link>

        <!-- <div class="end">--END--</div> -->
      </van-pull-refresh>
    </div>
    <TabBar />
  </div>
</template>

<script>
import NavBar from "@/components/base/NavBar.vue";
import TabBar from "@/components/base/TabBar.vue";

export default {
  data() {
    return {
      isLoading: false,
      courseList: [
        {
          id: 1,
          cover: require("../../assets/cover2.jpg"),
          title: "百晓教你学说温州话",
          author: "chenchen",
          time: "2019-08-30"
        },
        {
          id: 2,
          cover: require("../../assets/cover2.jpg"),
          title: "雾都夜话",
          author: "chenchen",
          time: "2019-08-30"
        },
        {
          id: 3,
          cover: require("../../assets/cover2.jpg"),
          title: "粤来粤好学",
          author: "chenchen",
          time: "2019-08-30"
        }
      ]
    };
  },
  components: {
    NavBar,
    TabBar
  },
  methods: {
    onReturn() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    onRefresh(type) {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
        this.count++;
        console.log(type + "发起刷新请求");
      }, 500);
    },
    getAllCourse() {
      //获取所有课程  需返回id 课程标题 课程作者 最后一条录音上传的时间
      this.axios
        .post("/getAllCourse")
        .then(res => {
          console.log(res);
          this.courseList =res.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted(){
    this.getAllCourse();
  }
};
</script>
<style scoped lang="scss">
::v-deep .van-nav-bar__left {
  top: 5px;
  display: table-cell;
  vertical-align: middle;
}

.course {
  width: calc(100%-20px);
  margin: 0 auto;
  height: auto;
  padding: 10px 10px;
  display: flex;
  //   align-content: flex-start;
  //   justify-content: space-between;
}

.course .imgs {
}
.message {
  margin-left: 12px;
  position: relative;
  flex-grow: 1;
}
.message::after {
  position: absolute;
  box-sizing: border-box;
  content: " ";
  pointer-events: none;
  right: 0;
  bottom: -10px;
  left: 0px;
  border-bottom: 1px solid #d1d5db;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
.imgs img {
  width: 130px;
  height: 70px;
  object-fit: cover;
  border-radius: 5px;
  box-shadow: 0 0px 3px rgba(0, 0, 0, 0.2);
}

.title {
  font-size: 14px;
  text-align: left;
  margin: 5px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.watch {
  text-align: left;
  align-items: center;
  justify-content: left;
  display: flex;
  font-size: 12px;
  color: #bfbfbf;
  // margin: 0px 6px;
  // width: 100%;
}
.time {
  text-align: left;
  // justify-content: left;
  font-size: 12px;
  color: rgb(104, 101, 101);
}
</style>