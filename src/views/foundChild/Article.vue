<!--  -->
<template>
  <div>
    <div style="padding-top:46px">
      <NavBar>
        <div slot="left-screen" @click="onReturn">
          <img src="../../assets/return.png" />
          <span style="position:relative;top:-3px;">返回</span>
        </div>
        <div slot="title-screen">文章</div>
        <div slot="right-screen">
          <router-link to="/search">
            <img src="../../assets/search.svg" />
          </router-link>
        </div>
      </NavBar>
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh()">
        <router-link tag="div" :to="`/articledetails/${item.id}`" v-for="(item,index) in list" :key="index" class="article">
          <div class="cover">
            <img :src="item.cover" />
          </div>
          <div class="title">{{item.title}}</div>
          <div class="good">
            <img src="../../assets/xihuan_1.png" />
            <span v-show="item.goodnum!=0">{{item.goodnum}}</span>
          </div>
        </router-link>
     
        <div class="end">--END--</div>
      </van-pull-refresh>
    </div>
    <TabBar/>
  </div>
</template>

<script>
import NavBar from "@/components/base/NavBar.vue";

import TabBar from "@/components/base/TabBar.vue";
export default {
  data() {
    return {
      isLoading: false,
      list:[
        // {
        //   id:1,
        //   title:"方言：式微挡不住,“留存”亦可贵",
        //   cover:require("../../assets/20190723175107.png"),
        //   like:266
        // }, {
        //   id:2,
        //   title:"方言：式微挡不住,“留存”亦可贵2",
        //   cover:require("../../assets/20190723175107.png"),
        //   like:266
        // }, {
        //   id:3,
        //   title:"方言：式微挡不住,“留存”亦可贵3",
        //   cover:require("../../assets/20190723175107.png"),
        //   like:266
        // }
      ]
    };
  },
  components: {
    NavBar,
    TabBar
  },
  methods: {
    onReturn() {
      // this.$router.push("/found");
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    onRefresh(type) {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
        this.count++;
        console.log(type + "发起刷新请求");
        this.getAllArticle();
      }, 500);
    },
    getAllArticle(){
      //获取所有文章
       this.axios
        .post("/allArticle", {
        })
        .then(res => {
          console.log(res);
          this.list = res.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    
    }
  },
  mounted(){
    this.getAllArticle();

  }
};
</script>
<style scoped lang="scss">
::v-deep .van-nav-bar__left {
  top: 5px;
  display: table-cell;
  vertical-align: middle;
}
::v-deep .van-pull-refresh {
  background-color: #f4f2f2;
}
.article {
  width: 100%;
  padding-bottom: 5px;
  margin: 5px 0 8px 0;
  background-color: white;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}
.article .cover {
  width: 100%;
  height: 150px;
}
.cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.title {
  margin: 7px 0;
}
.good {
  display: flex;
  align-items: center;
  justify-content: center;
  color: gray;
  height: 20px;
  font-size: 12px;
}
.end{
    font-size: 12px;
    width: 100%;
    height: auto;
    background-color: white;
}
</style>