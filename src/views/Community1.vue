<!--  -->
<template>
  <div>
    <van-tabs
      v-model="tabType"
      sticky
      swipeable
      title-inactive-color="#323233"
      @change="changeTab(tabType)"
    >
      <div slot="nav-left" style="margin:12px 40px 0px 15px;">
        <router-link to="/">
          <img src="../assets/add2.png" />
        </router-link>
      </div>
      <!-- 社区关注 -->
      <van-tab>
        <span slot="title">关注</span>
        <div slot="default">
        
          <mescroll-vue
            ref="mescroll0"
            :down="getMescrollDown(0)"
            :up="getMescrollUp(0)"
            @init="mescrollInit0"
          >
            <HotList v-for="pd in tab0.list" :key="pd.id">
              <template v-slot:username>{{pd.username}}</template>
              <template v-slot:datetime>{{pd.datetime}}</template>
              <template v-slot:content>{{pd.content}}</template>
              <template v-slot:imgs>
                <img src="../assets/595814.gif" />
                <img src="../assets/595814.gif" />
              </template>
            </HotList>
          </mescroll-vue>
        
        </div>
      </van-tab>
      <!-- 热门动态 -->
      <van-tab>
        <span slot="title">热门</span>
        <div slot="default">

          <mescroll-vue
            ref="mescroll1"
            :up="getMescrollUp(1)"
            @init="mescrollInit1"
          >
            <HotList v-for="pd in tab1.list" :key="pd.id">
              <template v-slot:username>{{pd.username}}</template>
              <template v-slot:datetime>{{pd.datetime}}</template>
              <template v-slot:content>{{pd.content}}</template>
              <template v-slot:imgs>
                <img src="../assets/595814.gif" />
              </template>
            </HotList>
          </mescroll-vue>

        </div>
      </van-tab>
      <!-- 最新动态 -->
      <van-tab>
        <span slot="title">最新</span>
        <div slot="default">

          <mescroll-vue
            ref="mescroll2"
           
            :up="getMescrollUp(2)"
            @init="mescrollInit2"
          >
            <HotList v-for="pd in tab1.list" :key="pd.id">
              <template v-slot:username>{{pd.username}}</template>
              <template v-slot:datetime>{{pd.datetime}}</template>
              <template v-slot:content>{{pd.content}}</template>
              <template v-slot:imgs>
                <img src="../assets/595814.gif" />
                <img src="../assets/595814.gif" />
              </template>
            </HotList>
          </mescroll-vue>

        </div>
      </van-tab>
      <div slot="nav-right" style="margin:12px 15px 0px 40px;">
        <router-link to="/addtrends">
          <img src="../assets/write.png" />
        </router-link>
      </div>
    </van-tabs>

    <TabBar />
  </div>
</template>

<script>
import TabBar from "@/components/base/TabBar.vue";
import HotList from "@/components/community/List.vue";
import MescrollVue from "mescroll.js/mescroll.vue";
import mockData from "../mock/pdlist";

export default {
  data() {
    return {
      active: 0,
      tab0: { mescroll: null, list: [], isListInit: false }, // 关注
      tab1: { mescroll: null, list: [], isListInit: false }, // 热门
      tab2: { mescroll: null, list: [], isListInit: false }, // 最新
      tabType: 0
    };
  },
  components: {
    TabBar,
    HotList,
    MescrollVue
  },
  methods: {
  // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit0 (mescroll) {
      mescroll.tabType = 0; // 加入标记,便于在回调中取到对应的list
      this.tab0.mescroll = mescroll;
    },
    mescrollInit1 (mescroll) {
      mescroll.tabType = 1;
      this.tab1.mescroll = mescroll;
    },
    mescrollInit2 (mescroll) {
      mescroll.tabType = 2;
      this.tab2.mescroll = mescroll;
    },
    mescrollInit3 (mescroll) {
      mescroll.tabType = 3;
      this.tab3.mescroll = mescroll;
    },
    // 多mescroll的配置,需通过方法获取,保证每个配置是单例
    getMescrollDown (tabType) {
      let isAuto = tabType === 0; // 第一个mescroll传入true,列表自动加载
      return {
        auto: isAuto,
        callback: this.downCallback
      }
    },
    getMescrollUp (tabType) {
      let emptyWarpId = 'dataList' + tabType;
      return {
        auto: false,
        callback: this.upCallback, // 上拉回调,此处可简写; 相当于 callback: function (page) { upCallback(page); }
        noMoreSize: 4, // 如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
        empty: {
          warpId: emptyWarpId, // 父布局的id;
          icon: 'http://www.mescroll.com/img/mescroll-empty.png', // 图标,默认null
          tip: '暂无相关数据~', // 提示
          btntext: '去逛逛 >', // 按钮,默认""
          btnClick: function () { // 点击按钮的回调,默认null
            alert('点击了按钮,具体逻辑自行实现')
          }
        },
        toTop: { // 配置回到顶部按钮
        warpId:app,
          src: 'http://www.mescroll.com/img/mescroll-totop.png' // 图片路径,默认null (建议写成网络图,不必考虑相对路径)
        }
      }
    },
    /* 下拉刷新的回调 */
    downCallback (mescroll) {
      // 这里加载你想下拉刷新的数据, 比如刷新tab1的轮播数据
      if (mescroll.tabType === 0) {
        // loadSwiper();
      } else if (mescroll.tabType === 1) {
        // ....
      } else if (mescroll.tabType === 2) {
        // ....
      } else if (mescroll.tabType === 3) {
        // ....
      }
      mescroll.resetUpScroll();// 触发下拉刷新的回调,加载第一页的数据
    },
    /* 上拉加载的回调 page = {num:1, size:10}; num:当前页 从1开始, size:每页数据条数 */
    upCallback (page, mescroll) {
      if (mescroll.tabType === 0) {
        // 全部
        this.tab0.isListInit = true;// 标记列表已初始化,保证列表只初始化一次
        this.getListDataFromNet(mescroll.tabType, page.num, page.size, (curPageData) => {
          mescroll.endSuccess(curPageData.length);// 联网成功的回调,隐藏下拉刷新和上拉加载的状态;
          if (page.num === 1) this.tab0.list = []; // 如果是第一页需手动制空列表
          this.tab0.list = this.tab0.list.concat(curPageData); // 追加新数据
        }, () => {
          if (page.num === 1) this.tab0.isListInit = false;
          mescroll.endErr();// 联网失败的回调,隐藏下拉刷新的状态
        })
      } else if (mescroll.tabType === 1) {
        // 奶粉
        this.tab1.isListInit = true;// 标记列表已初始化,保证列表只初始化一次
        this.getListDataFromNet(mescroll.tabType, page.num, page.size, (curPageData) => {
          mescroll.endSuccess(curPageData.length);// 联网成功的回调,隐藏下拉刷新和上拉加载的状态;
          if (page.num === 1) this.tab1.list = []; // 如果是第一页需手动制空列表
          this.tab1.list = this.tab1.list.concat(curPageData); // 追加新数据
        }, () => {
          if (page.num === 1) this.tab1.isListInit = false;
          mescroll.endErr();// 联网失败的回调,隐藏下拉刷新的状态
        })
      } else if (mescroll.tabType === 2) {
        // 面膜
        this.tab2.isListInit = true;// 标记列表已初始化,保证列表只初始化一次
        this.getListDataFromNet(mescroll.tabType, page.num, page.size, (curPageData) => {
          mescroll.endSuccess(curPageData.length);// 联网成功的回调,隐藏下拉刷新和上拉加载的状态;
          if (page.num === 1) this.tab2.list = []; // 如果是第一页需手动制空列表
          this.tab2.list = this.tab2.list.concat(curPageData); // 追加新数据
        }, () => {
          if (page.num === 1) this.tab2.isListInit = false;
          mescroll.endErr();// 联网失败的回调,隐藏下拉刷新的状态
        })
      } else if (mescroll.tabType === 3) {
        // 图书
        this.tab3.isListInit = true;// 标记列表已初始化,保证列表只初始化一次
        this.getListDataFromNet(mescroll.tabType, page.num, page.size, (curPageData) => {
          mescroll.endSuccess(curPageData.length);// 联网成功的回调,隐藏下拉刷新和上拉加载的状态;
          if (page.num === 1) this.tab3.list = []; // 如果是第一页需手动制空列表
          this.tab3.list = this.tab3.list.concat(curPageData); // 追加新数据
        }, () => {
          if (page.num === 1) this.tab3.isListInit = false;
          mescroll.endErr();// 联网失败的回调,隐藏下拉刷新的状态
        })
      }
    },

    // 切换菜单
    changeTab (type) {
      let curTab = this.getTabData(this.active);// 当前列表
      let newTab = this.getTabData(type);// 新转换的列表
      curTab.mescroll.hideTopBtn(); // 隐藏当前列表的回到顶部按钮
      this.active = type // 切换菜单
      if (!newTab.isListInit) {
        newTab.mescroll.triggerDownScroll(); // 加载列表
      } else {
        setTimeout(() => {
          // 检查新转换的列表是否需要显示回到到顶按钮
          var curScrollTop = newTab.mescroll.getScrollTop();
          if (curScrollTop >= newTab.mescroll.optUp.toTop.offset) {
            newTab.mescroll.showTopBtn();
          } else {
            newTab.mescroll.hideTopBtn();
          }
        }, 30)
      }
    },
    // 获取菜单对应的数据
    getTabData (tabType) {
      if (tabType == null) tabType = this.tabType;
      if (tabType === 0) {
        return this.tab0;
      } else if (tabType === 1) {
        return this.tab1;
      } else if (tabType === 2) {
        return this.tab2;
      } else if (tabType === 3) {
        return this.tab3;
      }
    },
    /* 联网加载列表数据
          在您的实际项目中,请参考官方写法: http://www.mescroll.com.html#tagUpCallback
          请忽略getListDataFromNet的逻辑,这里仅仅是在本地模拟分页数据,本地演示用
          实际项目以您服务器接口返回的数据为准,无需本地处理分页.
          * */
    getListDataFromNet (tabType, pageNum, pageSize, successCallback, errorCallback) {
      // 延时一秒,模拟联网
      setTimeout(() => {
        try {
          var listData = []
          // tabType 全部商品0; 奶粉1; 面膜2; 图书3;
          if (tabType === 0) {
            // 全部商品 (模拟分页数据)
            for (var i = (pageNum - 1) * pageSize; i < pageNum * pageSize; i++) {
              if (i === mockData.length) break
              listData.push(mockData[i])
            }
          } else if (tabType === 1) {
            // 奶粉
            for (var n = 0; n < mockData.length; n++) {
            
                listData.push(mockData[n])
              
            }
          } else if (tabType === 2) {
            // 面膜
            for (var j = 0; j < mockData.length; j++) {
            
                listData.push(mockData[j])
              
            }
          } else if (tabType === 2) {
            // 图书
            for (var k = 0; k < mockData.length; k++) {
             
                listData.push(mockData[k])
             
            }
          }
          // 回调
          successCallback && successCallback(listData);
        } catch (e) {
          // 联网失败的回调
          errorCallback && errorCallback();
        }
      }, 1000)
    }
  
  }, beforeRouteEnter (to, from, next) { // 如果没有配置回到顶部按钮或isBounce,则beforeRouteEnter不用写
    next(vm => {
      let curMescroll = vm.$refs['mescroll' + vm.tabType]; // 找到当前mescroll的ref,调用子组件mescroll-vue的beforeRouteEnter方法
      curMescroll && curMescroll.beforeRouteEnter() // 进入路由时,滚动到原来的列表位置,恢复回到顶部按钮和isBounce的配置
    })
  },
  beforeRouteLeave (to, from, next) { // 如果没有配置回到顶部按钮或isBounce,则beforeRouteLeave不用写
    let curMescroll = this.$refs['mescroll' + this.tabType]; // 找到当前mescroll的ref,调用子组件mescroll-vue的beforeRouteEnter方法
    curMescroll && curMescroll.beforeRouteLeave() // 退出路由时,记录列表滚动的位置,隐藏回到顶部按钮和isBounce的配置
    next()
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
::v-deep .mescroll-totop {
  position: fixed;
  right: 15px;
  bottom: 60px;
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

.mescroll {
  position: fixed;
  top: 44px;
  bottom: 0;
  height: auto;
  padding-bottom: 40px;
}
.mescroll-upwarp {clear:left} 
</style>