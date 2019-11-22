<!--  -->
<template>
  <div class="foo">
    <van-tabbar v-model="active" active-color="black">
      <van-tabbar-item v-for="(item,index) in tabbars" :key="index" :to="item.name">
        <span>{{item.title}}</span>
        <template slot="icon" slot-scope="props">
          <img :src="props.active ? item.active : item.normal" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
// import Vue from 'vue';
// import { Tabbar, TabbarItem } from 'vant';
// Vue.use(Tabbar).use(TabbarItem);
// import 'vant/lib/index.css'

export default {
  name: "TabBar",
  data() {
    return {
      active: 0,
      tabbars: [
        {
          name: "/home",
          title: "推荐",
          normal: require("../../assets/hot.svg"),
          active: require("../../assets/hotfill.svg")
        },
        {
          name: "/found",
          title: "发现",
          normal: require("../../assets/faxian.svg"),
          active: require("../../assets/faxian_fill.svg")
        },
        {
          name: "/community",
          title: "社区",
          normal: require("../../assets/group.svg"),
          active: require("../../assets/group_fill.svg")
        },
        {
          name: "/user",
          title: "我的",
          normal: require("../../assets/addressbook.svg"),
          active: require("../../assets/addressbook_fill.svg")
        }
      ]
    };
  },
  created() {
    this.upactive();
  },
  updated() {
    this.upactive();
  },
  methods: {
    upactive() {
      this.nowPath = this.$route.path;
      // console.log(this.nowPath);
      //vue提供的方法
      if (this.nowPath == "/home") {
        this.active = 0;
      } else if (
        this.nowPath == "/found" ||
        this.nowPath == "/dub" ||
        this.nowPath == "/article" ||
        this.nowPath == "/video" ||
        this.nowPath == "/course"
      ) {
        this.active = 1;
      } else if (this.nowPath == "/community") {
        this.active = 2;
      } else if (this.nowPath == "/user") {
        this.active = 3;
      }
    }
  },
  deactivated() {
    //销毁实例，防止缓存
    this.$destroy(true);
  }
};
</script>
<!--添加scoped 可将样式限制在当前组件-->
<style scoped lang="scss">
.foo {
  box-sizing: border-box;
  padding-bottom: 50px;
}
</style>