<!--  -->
<template>
  <div>
    <div style="padding-top:46px">
      <NavBar>
        <div slot="left-screen" @click="onReturn">
          <img src="../../assets/return.png" />
          <span style="position:relative;top:-3px;">返回</span>
        </div>
        <div slot="title-screen">语料</div>
        <div slot="right-screen">
          <router-link :to="`/dubplay/${this.$route.params.id}`">
            <img src="../../assets/luyin.svg" />
          </router-link>
        </div>
      </NavBar>
      <div class="message">
        <div class="top">
          选自《{{data.title}}》
          <span>类别：{{data.type}}</span>
        </div>
        <div class="content">{{data.content}}</div>
        <div class="bottom">
          <div class="nums">
            <img src="../../assets/dub1.png" />
            {{data.num}}
          </div>
          <div class="times">
            <img src="../../assets/dub2.png" />
            {{data.time}}
          </div>
        </div>
      </div>
      <div>
        <van-index-bar :z-index="2" :index-list="indexList" :sticky-offset-top="44">
          <!-- <div class="van-index-bar__sidebar" style="z-index: 2;"><span data-index="最新" class="van-index-bar__index">最新</span><span data-index="北京" class="van-index-bar__index" style="">北京</span><span data-index="天津" class="van-index-bar__index">天津</span><span data-index="陕西" class="van-index-bar__index">陕西</span><span data-index="浙江" class="van-index-bar__index">浙江</span></div>  -->
          <div v-for="(list,index) in indexList" :key="index">
            <van-index-anchor :index="list">{{list}}</van-index-anchor>

            <div v-if="list=='最新'">
              <div v-for="(dub,index) in dublist.slice(0,4)" :key="index">
                <div class="fordub">
                  <div class="header">
                    <div class="headimg">
                      <img :src="dub.headimg" />
                    </div>
                    <div class="username">
                      {{dub.username}}
                      <br />
                      <span>{{dub.time}}</span>
                    </div>
                    <div class="placeright">
                      {{dub.city}}
                      <br />
                      {{dub.lan}}
                    </div>
                  </div>
                  <TalkAudio :toUrl="dub.audiourl" style="width:95%"></TalkAudio>
                </div>
              </div>
            </div>

            <div v-for="(dub,index) in dublist" :key="index">
              <div v-if="dub.place.indexOf(list) !== -1">
                <div class="fordub">
                  <div class="header">
                    <div class="headimg">
                      <img :src="dub.headimg" />
                    </div>
                    <div class="username">
                      {{dub.username}}
                      <br />
                      <span>{{dub.time}}</span>
                    </div>
                    <div class="placeright">
                      {{dub.city}}
                      <br />
                      {{dub.lan}}
                    </div>
                  </div>
                  <TalkAudio :toUrl="dub.audiourl" style="width:95%"></TalkAudio>
                </div>
              </div>
            </div>
          </div>
        </van-index-bar>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/base/NavBar.vue";
import TalkAudio from "@/components/base/TalkAudio.vue";
export default {
  data() {
    return {
      pipei: null,
      indexList: [
        "最新"
        // "京"
        // "津",
        // "冀",
        // "晋",
        // "蒙",
        // "辽",
        // "吉",
        // "黑",
        // "沪",
        // "苏",
        // "浙",
        // "皖",
        // "闽",
        // "赣",
        // "鲁",
        // "豫",
        // "鄂",
        // "湘",
        // "粤",
        // "桂",
        // "琼",
        // "渝",
        // "川",
        // "贵",
        // "云",
        // "藏",
        // "陕",
        // "甘",
        // "青",
        // "宁",
        // "新",
        // "台",
        // "港",
        // "澳"
      ],
      data: {
        // id: 1,
        // title: "李延年歌",
        // content:
        //   "北方有佳人，绝世而独立。一顾倾人城，再顾倾人国。宁不知倾城与倾国，佳人再难得。",
        // num: 36,
        // time: "1小时前",
        // type: "诗词"
      },
      dublist: [
        // {
        //   uid:1,//用户id
        //   headimg: require("../../assets/20190723175107.png"),//用户头像
        //   username: "chen1",//用户名
        //   place:"北京市",//省份
        //   city: "北京市",//城市
        //   lan: "普通话",
        //   time: "2019-08-01",
        //   audiourl:
        //     "http://m8.music.126.net/20190815124808/9eac5d41d9c7016aa3ae1e333f7f1d77/ymusic/da41/1089/be24/bdc2c36a524cac92ddad472a212ef418.mp3"
        // },
        // {
        //   headimg: require("../../assets/20190723175107.png"),
        //   username: "chen4",
        //   place:"陕西省",//省份
        //   city: "石家庄市",
        //   lan: "家乡话",
        //   time: "2019-08-01",
        //   audiourl:
        //     "http://m8.music.126.net/20190815124808/9eac5d41d9c7016aa3ae1e333f7f1d77/ymusic/da41/1089/be24/bdc2c36a524cac92ddad472a212ef418.mp3"
        // },
        // {
        //   headimg: require("../../assets/20190723175107.png"),
        //   username: "chen2",
        //   place: "天津市",
        //   city: "天津市",
        //   lan: "家乡话",
        //   time: "2019-08-02",
        //   audiourl:
        //     "http://m8.music.126.net/20190815124808/9eac5d41d9c7016aa3ae1e333f7f1d77/ymusic/da41/1089/be24/bdc2c36a524cac92ddad472a212ef418.mp3"
        // },
        // {
        //   headimg: require("../../assets/20190723175107.png"),
        //   username: "chen3",
        //   place: "北京市",
        //   city: "北京市",
        //   lan: "家乡话",
        //   time: "2019-08-01",
        //   audiourl:
        //     "http://m8.music.126.net/20190815124808/9eac5d41d9c7016aa3ae1e333f7f1d77/ymusic/da41/1089/be24/bdc2c36a524cac92ddad472a212ef418.mp3"
        // },
        
      ]
    };
  },
  components: {
    NavBar,
    TalkAudio
  },
  methods: {
    onReturn() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },

    chance() {
      for (var i = 0; i < this.dublist.length; i++) {
        let val = this.valForShort(this.dublist[i].place);
        console.log(val);
        this.indexList.push(val);
      }
      this.indexList = [...new Set(this.indexList)];
    },
    valForShort(province) {
      console.log(province);
      // if (province == "北京市") return "京";
      // else if (province == "天津市") return "津";
      // else if (province == "重庆市") return "渝";
      // else if (province == "上海市") return "沪";
      // else if (province == "河北省") return "冀";
      // else if (province == "山西省") return "晋";
      // else if (province == "辽宁省") return "辽";
      // else if (province == "吉林省") return "吉";
      // else if (province == "黑龙江省") return "黑";
      // else if (province == "江苏省") return "苏";
      // else if (province == "浙江省") return "浙";
      // else if (province == "安徽省") return "皖";
      // else if (province == "福建省") return "闽";
      // else if (province == "江西省") return "赣";
      // else if (province == "山东省") return "鲁";
      // else if (province == "河南省") return "豫";
      // else if (province == "湖北省") return "鄂";
      // else if (province == "湖南省") return "湘";
      // else if (province == "广东省") return "粤";
      // else if (province == "海南省") return "琼";
      // else if (province == "四川省") return "川";
      // else if (province == "贵州省") return "贵";
      // else if (province == "云南省") return "云";
      // else if (province == "陕西省") return "陕";
      // else if (province == "甘肃省") return "甘";
      // else if (province == "青海省") return "青";
      // else if (province == "台湾省") return "台";
      // else if (province == "内蒙古自治区") return "蒙";
      // else if (province == "广西壮族自治区") return "桂";
      // else if (province == "宁夏回族自治区") return "宁";
      // else if (province == "新疆维吾尔自治区 ") return "新";
      // else if (province == "西藏自治区") return "藏";
      // else if (province == "香港特别行政区") return "港";
      // else if (province == "澳门特别行政区") return "澳";
      if (province == "北京市") return "北京";
      else if (province == "天津市") return "天津";
      else if (province == "重庆市") return "重庆";
      else if (province == "上海市") return "上海";
      else if (province == "河北省") return "河北";
      else if (province == "山西省") return "山西";
      else if (province == "辽宁省") return "辽宁";
      else if (province == "吉林省") return "吉林";
      else if (province == "黑龙江省") return "黑龙江";
      else if (province == "江苏省") return "江苏";
      else if (province == "浙江省") return "浙江";
      else if (province == "安徽省") return "安徽";
      else if (province == "福建省") return "福建";
      else if (province == "江西省") return "江西";
      else if (province == "山东省") return "山东";
      else if (province == "河南省") return "河南";
      else if (province == "湖北省") return "湖北";
      else if (province == "湖南省") return "湖南";
      else if (province == "广东省") return "广东";
      else if (province == "海南省") return "海南";
      else if (province == "四川省") return "四川";
      else if (province == "贵州省") return "贵州";
      else if (province == "云南省") return "云南";
      else if (province == "陕西省") return "陕西";
      else if (province == "甘肃省") return "甘肃";
      else if (province == "青海省") return "青海";
      else if (province == "台湾省") return "台湾";
      else if (province == "内蒙古自治区") return "内蒙古";
      else if (province == "广西壮族自治区") return "广西";
      else if (province == "宁夏回族自治区") return "宁夏";
      else if (province == "新疆维吾尔自治区 ") return "新疆";
      else if (province == "西藏自治区") return "西藏";
      else if (province == "香港特别行政区") return "香港";
      else if (province == "澳门特别行政区") return "澳门";
    },
    //根据id获取语料详情
    getDubDetails() {
      var data = new FormData();
      data.append("id", this.$route.params.id);
      this.axios
        .post("/dub/id", data)
        .then(res => {
          // console.log(res);
          this.data = res.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    //根据id获取语料页--语料（用户录音）
    getDubComments() {
      var data = new FormData();
      data.append("dub_id", this.$route.params.id);
      this.axios
        .post("/dub/id/comments", data)
        .then(res => {
          console.log(res.data.data);
          this.dublist = res.data.data;
          this.chance();
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  filters: {
    provinceForShort: function(val) {
      console.log(val);

      if (val === "京") return "北京";
      else if (val === "津") return "天津市";
      else if (val === "渝") return "重庆市";
      else if (val == "沪") return "上海市";
      else if (val == "冀") return "河北省";
      else if (val == "晋") return "山西省";
      else if (val == "辽") return "辽宁省";
      else if (val == "吉") return "吉林省";
      else if (val == "黑") return "黑龙江省";
      else if (val == "苏") return "江苏省";
      else if (val == "浙") return "浙江省";
      else if (val == "皖") return "安徽省";
      else if (val == "闽") return "福建省";
      else if (val == "赣") return "江西省";
      else if (val == "鲁") return "山东省";
      else if (val == "豫") return "河南省";
      else if (val == "鄂") return "湖北省";
      else if (val == "湘") return "湖南省";
      else if (val == "粤") return "广东省";
      else if (val == "琼") return "海南省";
      else if (val == "川") return "四川省";
      else if (val == "贵") return "贵州省";
      else if (val == "云") return "云南省";
      else if (val == "陕") return "陕西省";
      else if (val == "甘") return "甘肃省";
      else if (val == "青") return "青海省";
      else if (val == "台") return "台湾省";
      else if (val == "蒙") return "内蒙古自治区";
      else if (val == "桂") return "广西壮族自治区";
      else if (val == "宁") return "宁夏回族自治区";
      else if (val == "新") return "新疆维吾尔自治区 ";
      else if (val == "藏") return "西藏自治区";
      else if (val == "港") return "香港特别行政区";
      else if (val == "澳") return "澳门特别行政区";
      else return val;
    }
  },
  mounted() {
    this.getDubComments();

    this.getDubDetails();
    this.favorite();
  },
   deactivated() {
    //销毁实例，防止缓存
    this.$destroy(true);
  }
};
</script>


<style scoped lang="scss">
::v-deep .van-nav-bar {
  z-index: 5;
}
::v-deep .van-index-anchor {
  width: 100%;
  box-sizing: border-box;
  margin: 2px auto;
  padding: 5px 10px;
  background-color: #f8f8f8;
  text-align: left;
}
.message {
  width: calc(100%-8px);
  margin: 4px;
  height: auto;
  min-height: 150px;
  background-color: white;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
}
.message .top {
  padding: 15px 15px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  color: gray;
}
.message .top span {
  margin-left: auto;
}
.message .content {
  padding: 15px;
  text-align: left;
  font-size: 16px;
}
.message .bottom {
  width: 100%;
  box-sizing: border-box;
  padding: 13px 20px;
  display: flex;
  align-items: center;
  // position: absolute;
  // bottom: 0;
}
.message .nums,
.message .times {
  display: flex;
  align-items: center;
  // justify-content: center;
  font-size: 14px;
  color: #554c4c;
}
.times {
  margin-left: auto;
}
.fordub {
  position: relative;
  margin: 8px 10px;
  padding: 10px 10px 10px 10px;
  background-color: #f1f1f1;
}
.fordub .header {
  width: auto;
  height: 50px;
  position: relative;
  // background-color: white;
}
.header .headimg {
  position: absolute;
  left: 0px;
  top: 0px;
  opacity: 1;
}
.header .headimg img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}
.header .username {
  width: auto;
  position: absolute;
  left: 46px;
  top: 5px;
  text-align: left;
  font-size: 18px;
  line-height: 16px;
  color: black;
}
.username span {
  font-size: 12px;
  color: #9c9c9c;
}
.header .placeright {
  color: #726f6f;
  font-size: 12px;
  position: absolute;
  right: 5%;
  top: 6px;
  text-align: right;
}
</style>
