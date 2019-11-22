<!--  -->
<template>
  <div style="padding-top:54px;">
    <van-col span="24" style="position:fixed;top:0px;">
      <form action="/">
        <van-search
          v-model="value"
          placeholder="请输入搜索关键词"
          show-action
          @search="onSearch"
          @cancel="onCancel"
          autofocus
        />
      </form>
    </van-col>
    <div v-if="!searchresult">
      <div class="hot">
        <div class="ontitle" style="margin-bottom:8px;">搜索趋势</div>
        <van-row type="flex" justify="space-around">
          <van-col span>
            <van-tag size="large" round color="#f0f0f0" text-color="#929292" @click="Esearch('方言')">方言保护</van-tag>
          </van-col>
          <van-col span>
            <van-tag size="large" round color="#f0f0f0" text-color="#929292" @click="Esearch('学习')">学习</van-tag>
          </van-col>
          <van-col span>
            <van-tag size="large" round color="#f0f0f0" text-color="#929292" @click="Esearch('微公益')">微公益</van-tag>
          </van-col>
        </van-row>
        <van-row type="flex" justify="space-around">
          <van-col span>
            <van-tag size="large" round color="#f0f0f0" text-color="#929292" @click="Esearch('日常用语')">日常用语</van-tag>
          </van-col>
          <van-col span>
            <van-tag size="large" round color="#f0f0f0" text-color="#929292" @click="Esearch('学者计划')">学者计划</van-tag>
          </van-col>
          <van-col span>
            <van-tag size="large" round color="#f0f0f0" text-color="#929292" @click="Esearch('乡音百科')">乡音百科</van-tag>
          </van-col>
        </van-row>
        <van-row type="flex" justify="space-around">
          <van-col span>
            <van-tag size="large" round color="#f0f0f0" text-color="#929292" @click="Esearch('吴语')">吴语</van-tag>
          </van-col>
          <van-col span>
            <van-tag size="large" round color="#f0f0f0" text-color="#929292" @click="Esearch('官话')">官话</van-tag>
          </van-col>
          <van-col span>
            <van-tag size="large" round color="#f0f0f0" text-color="#929292" @click="Esearch('家乡话')">家乡话</van-tag>
          </van-col>
        </van-row>
      </div>
      <div class="history" v-if="historyList !==null && historyList.length > 0">
        <div class="ontitle">
          搜索历史
          <span @click="onEmpty">清空</span>
        </div>
        <van-cell v-for="(item,index) in historyList.slice(0,5)" :key="index">
          <div slot="icon">
            <img src="../../assets/history.png" />
          </div>
          <template slot="title">{{item}}</template>
          <div slot="right-icon" style="margin-top:5px;" @click="onRemove(index)">
            <img src="../../assets/delete.png" />
          </div>
        </van-cell>
      </div>
    </div>
    <div v-else class="results">
      <router-link tag="div" :to="`/articledetails/${art.id}`" class="result" v-for="(art,index) in articleList" :key="index">
        <div class="title"><span style="font-size:14px;"><van-tag round type="primary">文章</van-tag></span>{{art.title}}</div>
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
      <router-link tag="div" :to="`/videoplay/${art.id}`" class="result" v-for="(art,index) in videoList" :key="index">
        <div class="title"><span style="font-size:14px;"><van-tag round type="success">视频</van-tag></span>{{art.title}}</div>
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
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/base/NavBar.vue";
export default {
  data() {
    return {
      value: null,
      searchresult: false,
      resultstatus: false,
      historyList: [],
      articleList: [],
      videoList: []
    };
  },
  components: {},
  methods: {
    onSearch() {
      //搜索记录存入本地
      let templist = JSON.parse(localStorage.getItem("searchHistory") || "[]");
      templist.unshift(this.value);
      //数组去重
      let array = Array.from(new Set(templist));
      console.log(array);
      localStorage.setItem("searchHistory", JSON.stringify(array));
      this.listRefresh();
      this.searchresult = true;
      this.resultstatus = true;

      var data = new FormData();
      data.append("content", this.value);
      this.axios
        .post("/search", data)
        .then(res => {
          console.log(res.data.data);
          this.articleList = res.data.data.returnArticles;

          this.videoList = res.data.data.returnVideos;
        })
        .catch(error => {
          console.log(error);
        });
    },
    Esearch(content){
      this.value=content;
      this.onSearch();
    },
    //取消-跳转到来的路由
    onCancel() {
      if (this.searchresult == true) {
        this.resultstatus = false;
        // this.searchresult=false;
      }
      if (this.searchresult == false && this.resultstatus == false) {
        window.history.length > 1
          ? this.$router.go(-1)
          : this.$router.push("/");
      } else {
        this.searchresult = !this.searchresult;
      }
    },
    onRemove(index) {
      let templist = JSON.parse(localStorage.getItem("searchHistory") || "[]");
      templist.splice(index, 1);
      localStorage.setItem("searchHistory", JSON.stringify(templist));
      this.listRefresh();
    },
    //清空所有历史记录
    onEmpty() {
      this.$toast.success("记录已清空");
      localStorage.removeItem("searchHistory");
      this.listRefresh();
      // Toast.success('历史已清空');
    },
    listRefresh() {
      let items = JSON.parse(localStorage.getItem("searchHistory"));
      this.historyList = items;
    }
  },
  mounted() {
    this.listRefresh();
  },
  filters: {
    htmlfilter: function(msg) {
      var msg = msg.replace(/<\/?[^>]*>/g, ""); //去除HTML Tag
      msg = msg.replace(/[|]*\n/, ""); //去除行尾空格
      msg = msg.replace(/&npsp;/gi, ""); //去掉npsp
      return msg;
    }
  }
};
</script>

<style scoped lang="scss">
.results {
  padding-top: 10px;
  background-color: #f1f1f1;
}
.results .result {
  background-color: white;
  padding: 10px;
  box-sizing: border-box;
  // margin-bottom: 10px;
  border-bottom: #f1f1f1 10px solid;
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
::v-deep .van-cell__title {
  text-align: left;
  padding-left: 8px;
}
::v-deep .van-cell {
  line-height: 20px;
}
::v-deep .van-tag--default {
  padding: 3px 18px;
}
::v-deep .van-row--justify-space-around {
  padding: 0 15px;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: space-between;
}
.hot ::v-deep .van-row--flex {
  margin-bottom: 10px;
}
// 覆盖原有last选择器样式
.history ::v-deep .van-cell ::after {
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
.ontitle {
  width: auto;
  height: auto;
  text-align: left;
  padding: 0px 15px;
  font-size: 15px;
  font-weight: 600;
  color: black;
  margin-bottom: 8px;
}
.ontitle span {
  float: right;
  font-size: 14px;
  font-weight: 400;
}
.hot {
  margin-bottom: 20px;
}
</style>