<!--  -->
<template>
  <div>
    <!-- 顶部 -->
    <NavBar>
      <div slot="left-screen" @click="onReturn">
        <img src="../../assets/return.png" />
        <span style="position:relative;top:-3px;">返回</span>
      </div>
      <div slot="title-screen">语料库</div>
      <div slot="right-screen">
        <router-link to="/addsentence">
          <img src="../../assets/dubadd.svg" />
        </router-link>
      </div>
    </NavBar>
    <!-- 吸顶标签栏 -->
    <div style="margin-top:46px;">
      <van-tabs v-model="active" sticky swipeable>
        <van-tab>
          <span slot="title">诗词</span>
          <div slot="default">
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh('诗词')">
              <div >
                <router-link
                  tag="div"
                  :to="`/dubdetails/${dub.id}`"
                  class="dublist"
                  v-for="(dub,index) in dublist0"
                  :key="index"
                >
                  <div class="hbox">
                    <div class="svgbox">
                      <SvgA>
                        <template v-slot:svgtext>{{dub.title|IndexOf}}</template>
                      </SvgA>
                    </div>
                    <div class="fonts">
                      <div class="f-title">《{{dub.title}}》</div>
                      <div class="f-content">{{dub.content}}</div>
                    </div>
                  </div>
                  <div class="dbox">
                    <div class="nums">
                      <img src="../../assets/dub1.png" />
                      {{dub.num}}
                    </div>
                    <div class="times">
                      <img src="../../assets/dub2.png" />
                      {{dub.time}}
                    </div>
                  </div>
                </router-link>
              </div>
            </van-pull-refresh>
          </div>
        </van-tab>
        <van-tab>
          <span slot="title">日常</span>
          <div slot="default">
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh('日常')">
              <div >
                <router-link
                  tag="div"
                  :to="`/dubdetails/${dub.id}`"
                  class="dublist"
                  v-for="(dub,index) in dublist1"
                  :key="index"
                >
                  <div class="hbox">
                    <div class="svgbox">
                      <SvgA>
                        <template v-slot:svgtext>{{dub.title|IndexOf}}</template>
                      </SvgA>
                    </div>
                    <div class="fonts">
                      <div class="f-title">《{{dub.title}}》</div>
                      <div class="f-content">{{dub.content}}</div>
                    </div>
                  </div>
                  <div class="dbox">
                    <div class="nums">
                      <img src="../../assets/dub1.png" />
                      {{dub.num}}
                    </div>
                    <div class="times">
                      <img src="../../assets/dub2.png" />
                      {{dub.time}}
                    </div>
                  </div>
                </router-link>
              </div>
            </van-pull-refresh>
          </div>
        </van-tab>
        <van-tab>
          <span slot="title">俗语</span>
          <div slot="default">
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh('俗语')">
              <div >
                <router-link
                  tag="div"
                  :to="`/dubdetails/${dub.id}`"
                  class="dublist"
                  v-for="(dub,index) in dublist2"
                  :key="index"
                >
                  <div class="hbox">
                    <div class="svgbox">
                      <SvgA>
                        <template v-slot:svgtext>{{dub.title|IndexOf}}</template>
                      </SvgA>
                    </div>
                    <div class="fonts">
                      <div class="f-title">《{{dub.title}}》</div>
                      <div class="f-content">{{dub.content}}</div>
                    </div>
                  </div>
                  <div class="dbox">
                    <div class="nums">
                      <img src="../../assets/dub1.png" />
                      {{dub.num}}
                    </div>
                    <div class="times">
                      <img src="../../assets/dub2.png" />
                      {{dub.time}}
                    </div>
                  </div>
                </router-link>
              </div>
            </van-pull-refresh>
          </div>
        </van-tab>
        <van-tab>
          <span slot="title">台词</span>
          <div slot="default">
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh('台词')">
              <div >
                <router-link
                  tag="div"
                  :to="`/dubdetails/${dub.id}`"
                  class="dublist"
                  v-for="(dub,index) in dublist3"
                  :key="index"
                >
                  <div class="hbox">
                    <div class="svgbox">
                      <SvgA>
                        <template v-slot:svgtext>{{dub.title|IndexOf}}</template>
                      </SvgA>
                    </div>
                    <div class="fonts">
                      <div class="f-title">《{{dub.title}}》</div>
                      <div class="f-content">{{dub.content}}</div>
                    </div>
                  </div>
                  <div class="dbox">
                    <div class="nums">
                      <img src="../../assets/dub1.png" />
                      {{dub.num}}
                    </div>
                    <div class="times">
                      <img src="../../assets/dub2.png" />
                      {{dub.time}}
                    </div>
                  </div>
                </router-link>
              </div>
            </van-pull-refresh>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <TabBar />
  </div>
</template>

<script>
import NavBar from "@/components/base/NavBar.vue";
import TabBar from "@/components/base/TabBar.vue";
import SvgA from "@/components/base/Svg.vue";
export default {
  data() {
    return {
      active: 0,
      count: 0,
      isLoading: false,
      dublist0: [
        // {
        //   id: 1,
        //   title: "李延年歌",
        //   content:
        //     "北方有佳人，绝世而独立。一顾倾人城，再顾倾人国。宁不知倾城与倾国，佳人再难得。",
        //   num: 36,
        //   time: "1小时前",
        //   type: "诗词"
        // },
      ],
      dublist1: [
        {
          id: 4,
          title: "数字",
          content: "一二三四五六七八九十",
          num: 99,
          time: "1天前",
          type: "日常"
        },
        {
          id: 5,
          title: "问候",
          content: "好久没见你，最近在做什么",
          num: 17,
          time: "6小时前",
          type: "日常"
        },
        {
          id: 6,
          title: "问候",
          content: "你好",
          num: 22,
          time: "2天前",
          type: "日常"
        }
      ],
      dublist2: [],
      dublist3: []
    };
  },
  components: {
    NavBar,
    TabBar,
    SvgA
  },
  methods: {
    onReturn() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    onRefresh(type) {
      if (type === "诗词") {
        this.getAll("诗词");
      } else if (type === "日常") {
        this.getAll("日常");
      } else if (type === "俗语") {
        this.getAll("俗语");
      } else if (type === "台词") {
        this.getAll("台词");
      }
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
        this.count++;
        console.log(type + "发起刷新请求");
      }, 500);
    },
    getAll(type) {
      var data = new FormData();
      data.append("type", type);
      this.axios
        .post("/dub", data)
        .then(res => {
          console.log(res.data);
          if (type === "诗词") {
            this.dublist0 = res.data.data;
          } else if (type === "日常") {
            this.dublist1 = res.data.data;
          } else if (type === "俗语") {
            this.dublist2 = res.data.data;
          } else if (type === "台词") {
            this.dublist3 = res.data.data;
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  filters: {
    IndexOf: function(value) {
      var value = value.substr(0, 1);
      return value;
    }
  },
  mounted() {
    this.getAll("诗词");
    this.getAll("日常");
    this.getAll("俗语");
    this.getAll("台词");
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
::v-deep .van-tabs__line {
  background-color: rgb(22, 21, 21) !important;
}
::v-deep .van-tabs--line {
  padding-top: 46px;
}
::v-deep .van-tabs--line .van-tabs__wrap {
  height: 46px;
}
.dublist {
  width: calc(100%-18px);
  margin: 9px;
  border-radius: 2px;
  background-color: white;
  height: auto;
  padding: 15px 0;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}
.hbox {
  display: flex;
  align-items: center;
  justify-content: center;
}
.fonts {
  text-align: left;
  width: auto;
  flex-grow: 1;
}
.svgbox {
  width: 65px;
  min-width: 65px;
  height: 60px;
  padding: 10px 8px 0 12px;
  // font-family: "'KaiTi','楷体_gb2312',楷体";
  font-size: 20px;
}

.f-title {
  margin: 0 0 10px 0;
  color: #494747;
}
.f-content {
  // text-align: justify;
  letter-spacing: 2px;
  padding-right: 12px;
}
.dbox {
  position: relative;
  padding: 18px 10px 0 0;
  font-size: 14px;
  height: 25px;
}
.nums {
  align-items: center;
  justify-content: center;
  display: flex;
  position: absolute;
  left: 45%;
}
.times {
  align-items: center;
  justify-content: center;
  display: flex;
  position: absolute;
  left: 70%;
}
</style>