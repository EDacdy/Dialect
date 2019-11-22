<template>
  <div class="home">
    <NavBar>
      <div slot="left-screen">
        <router-link to="/login">
          <div style="width:20px;height:20px"></div>
        </router-link>
      </div>

      <div slot="title-screen">推荐</div>
      <div slot="right-screen">
        <router-link to="/search">
          <img src="../assets/search.svg" />
        </router-link>
      </div>
    </NavBar>
    <!-- <div>
      <van-swipe :autoplay="3000" indicator-color="white" class="default" style="width:95%;margin:0 auto;border-radius:10px;">
        <van-swipe-item>
          <img src="http://img.mp.itc.cn/upload/20170721/14338de24d5f4131987ff27eac429ffd_th.jpg" />
        </van-swipe-item>
        <van-swipe-item>
          <img src="http://img1.imgtn.bdimg.com/it/u=2321051145,3065560886&fm=26&gp=0.jpg" />
        </van-swipe-item>
        <van-swipe-item>
          <img src="http://img1.imgtn.bdimg.com/it/u=2602652852,118602137&fm=26&gp=0.jpg" />
        </van-swipe-item>
      </van-swipe>
    </div>-->
    <div class="dub">
      <img src="../assets/yin.svg" />
      <p>
        乡音塾
        <br />
        <span>
          根植于乡土的互联网"学塾"
          <br />开启您的记忆匣子
          <br />记录逐渐消音的乡谣曲艺
          <br />让方言传承下去
        </span>
      </p>
      <img src="../assets/yin.svg" @dblclick="test"/>
    </div>
    <div class="Ocard">
      <div class="title">
        <p>
          精选语料
          <br />
          <span>海量语料库等您来方言配音</span>
        </p>
        <router-link tag="span" to="/dub">
          更多
          <img src="../assets/xiaojian.svg" />
        </router-link>
      </div>
      <md-card>
        <md-card-media class="top">
          <!-- swiper -->
          <swiper :options="swiperOption1">
            <swiper-slide>
              <router-link tag="div" class="dubcard" :to="`/dubdetails/3`">
                <div class="bg"></div>
                <div class="text">《回乡偶书》</div>
                <img src="../assets/huixiangoushu.jpg" />
              </router-link>
            </swiper-slide>
            <swiper-slide>
              <router-link tag="div" class="dubcard" :to="`/dubdetails/2`">
                <div class="bg"></div>
                <div class="text">《再别康桥》</div>
                <img src="../assets/dubbg1.png" />
              </router-link>
            </swiper-slide>
            <swiper-slide>
              <router-link tag="div" class="dubcard" :to="`/dubdetails/18`">
                <div class="bg"></div>
                <div class="text">《渡汉江》</div>
                <img src="../assets/dudu.jpg" />
              </router-link>
            </swiper-slide>

            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </md-card-media>
        <md-card-media class="bottom">
          <!-- swiper -->
          <swiper :options="swiperOption2">
            <swiper-slide>
              <router-link tag="span" class="dubcard" :to="`/dubdetails/27`">#不像不是戏,太像不是艺#</router-link>
            </swiper-slide>
            <swiper-slide>
              <router-link tag="span" class="dubcard" :to="`/dubdetails/28`">#不听老人言,吃亏在眼前#</router-link>
            </swiper-slide>
            <swiper-slide>
              <router-link tag="span" class="dubcard" :to="`/dubdetails/31`">#乡情的衰退，就是诗情的锐减#</router-link>
            </swiper-slide>
            <swiper-slide>
              <router-link tag="span" class="dubcard" :to="`/dubdetails/29`">#好久不见,甚是想念#</router-link>
            </swiper-slide>
            <swiper-slide>
              <router-link tag="span" class="dubcard" :to="`/dubdetails/30`">#念念不忘，必有回响#</router-link>
            </swiper-slide>
            <swiper-slide>
              <router-link tag="span" class="dubcard" :to="`/dubdetails/11`">#如果有多一张船票，你会不会跟我一起走#</router-link>
            </swiper-slide>
            <swiper-slide>
              <router-link tag="span" class="dubcard" :to="`/dubdetails/8`">#有一种乡音叫京片子#</router-link>
            </swiper-slide>
            <swiper-slide>
              <router-link tag="span" class="dubcard" :to="`/dubdetails/4`">#一二三四五六七八九十#</router-link>
            </swiper-slide>
            <!-- <swiper-slide>#不听老人言,吃亏在眼前#</swiper-slide>
            <swiper-slide>#乡情的衰退，就是诗情的锐减。#</swiper-slide>
            <swiper-slide>#好久不见,甚是想念#</swiper-slide>
            <swiper-slide>#念念不忘，必有回响#</swiper-slide>
            <swiper-slide>#如果有多一张船票，你会不会跟我一起走#</swiper-slide>
            <swiper-slide>#有一种乡音叫京片子#</swiper-slide>
            <swiper-slide>#一二三四五六七八九十#</swiper-slide> -->

            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </md-card-media>
      </md-card>
    </div>
    <div class="article">
      <div class="header">
        精选文章
        <router-link tag="span" to="/article">
          更多
          <img src="../assets/xiaojian.svg" />
        </router-link>
      </div>
      <div class="content">
       <router-link tag="div" class="artcard" :to="`/articledetails/3`">
          <img src="http://120.78.75.14/files/image/0-17f2f101-e82e-4c23-bc4d-54c757e91749.jpeg" />
          <div class="text">
            迷恋乡土乡音
            <span>刘文谵</span>
            <div class="zhaiyao">诺瓦利斯曾经说过：哲学，就是怀着乡愁四处寻找家园。而哲学之思一经诗化，便直接通向了艺术。刘文谌的绘画作品，也是一种乡愁的滋味，并从视觉上造就了一个能够体验精神游历状态的家园。</div>
          </div>
       </router-link>
        <router-link tag="div" class="artcard"  :to="`/articledetails/1`">
          <img src="http://120.78.75.14/files/image/0-66d944be-42fa-4115-8bed-6c5ee42c4642.jpeg" />
          <div class="text">
            	记住乡音
            <span>梁冬</span>
            <div class="zhaiyao">乡音是什么?乡音就是一个人出生的根。它教会了你说话,它扶着你学步。无论你走到天涯海角,那浓浓的乡音总会时不时流露出来。</div>
          </div>
       </router-link>
       <router-link tag="div" class="artcard"  :to="`/articledetails/9`">
          <img src="http://120.78.75.14/files/image/0-c68a8e6b-b5fd-4ef3-9c75-40b14bc93932.png" />
          <div class="text">
            方言表情包,传承方言极好
            <span>中华文明网</span>
            <div class="zhaiyao">提及方言，相信许多人都会情不自禁地联想到贺知章的那句“乡音无改鬓毛衰”，甚至会为之而潸然泪下。这也正是我们对“月是故乡明，话是乡音亲”念念不忘的根本原因。只是，随着社会的发展，在随处可见的“请说普通话”的提示下，方言正与我们渐行渐远。这样一种结局，并不仅仅意味着一种语音、一种声调的消失，而是意味着方言所携带的文化密码同时消失。事实上，随着方言的远去，方言所所蕴含的丰富内涵，有许多，后人已经莫名所以。以方言地名为例，方言地名是语言的活化石，是地名文化重要的组成部分。方言地名不仅包含着风土人情、自然地理、历史文化，也直接记录着许多字词的读音演变过程。</div>
          </div>
        </router-link>
      </div>
    </div>
    <div class="video">
      <div class="header">
        精选视频
        <router-link tag="span" to="/video">
          更多
          <img src="../assets/xiaojian.svg" />
        </router-link>
      </div>
      <md-card>
        <md-card-media>
          <swiper :options="swiperOption3">
            <swiper-slide>
              <div  @click="toVideo('3')">
              <div class="videocard" >
                <img src="http://120.78.75.14/files/image/0-0b098672-6ceb-4f2e-a0c0-f0a3f45414f2.jpeg" />
              </div>
              <img src="../assets/videoplay.png" class="imgcenter" />
              <div class="title">风味人间,方言地图</div>
              </div>
            </swiper-slide>
            <swiper-slide >
              <div  @click="toVideo('4')">
              <div class="videocard">
                <img src="../assets/cover2.jpg" />
              </div>
              <img src="../assets/videoplay.png" class="imgcenter" />
              <div class="title">乡音回家,冬至团圆</div>
              </div>
            </swiper-slide>
            <swiper-slide>
                <div  @click="toVideo('5')">
              <div class="videocard">
                <img src="../assets/cover1.jpg" />
              </div>
              <img src="../assets/videoplay.png" class="imgcenter" />
              <div class="title">年味回家,乡音团圆</div>
                </div>
            </swiper-slide>
          </swiper>
        </md-card-media>
      </md-card>
    </div>
    <div class="article course">
      <div class="header">
        热门课程
        <router-link tag="span" to="/article">
          更多
          <img src="../assets/xiaojian.svg" />
        </router-link>
      </div>
      <div class="content">
       <router-link tag="div" class="artcard" :to="`/coursedetails/9`">
          <img src="http://120.78.75.14/files/image/9-2722c190-4acd-4d05-a3da-565ab9be5d3e.jpeg" style="height:"/>
          <div class="text">
            百晓教你温州话
            <span>课程音频数：7</span>
            <div class="zhaiyao">"瓯越传统方言--”温州话“交流与学习"</div>
          </div>
       </router-link>
        <router-link tag="div" class="artcard"  :to="`/coursedetails/15`">
          <img src="http://120.78.75.14/files/image/15-c32faa65-e3e6-4b88-991b-ae26df3970fc.jpeg"/>
          <div class="text">
            	北风跟太阳（方言版）
            <span>课程音频数：7</span>
            <div class="zhaiyao">"收集了部分方言版本的北方跟太阳"</div>
          </div>
       </router-link>
       
      </div>
    </div>
    <div class="chinamap">
      <md-card>
        <md-card-media>
          <swiper :options="swiperOption4">
            <div class="parallax-bg" slot="parallax-bg" data-swiper-parallax="-23%"></div>
            <swiper-slide>
              <div class="title" data-swiper-parallax="-100">
                <SvgA>
                  <template v-slot:svgtext>乡</template>
                </SvgA>
              </div>
              <div class="subtitle" data-swiper-parallax="-200">乡[xiāng]:乡土、家乡</div>
              <div class="text" data-swiper-parallax="-300">
                <p>
                  君自故乡来,应知故乡事,
                  <br />来日绮窗前,寒梅着花未?
                  <br />
                  <span style="margin-left:35px">——王维《杂诗》</span>
                  <br />每个人的心里，都有一片魂牵梦萦的土地。乡土情结,像烙印,像蚕茧,像文身一样不能化解与消褪。
                </p>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="title" data-swiper-parallax="-100">
                <SvgA>
                  <template v-slot:svgtext>音</template>
                </SvgA>
              </div>
              <div class="subtitle" data-swiper-parallax="-200">音[yīn]:声音、乡音</div>
              <div class="text" data-swiper-parallax="-300">
                <p>方言是一种独特的民族文化，每一个地方都有自己独特的方言，它传承千年，有着丰厚的文化底蕴</p>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="title" data-swiper-parallax="-100">
                <SvgA>
                  <template v-slot:svgtext>塾</template>
                </SvgA>
              </div>
              <div class="subtitle" data-swiper-parallax="-200">塾[shú]:乡塾、教室</div>
              <div class="text" data-swiper-parallax="-300">
                <p>塾在旧时是私人设立的教学的地方,现今互联网高速发展,在线教育的发展让学习知识打破了时间和空间的限制,赋予了"塾"全新的定义,乡音塾就是这样一个互联网在线学习平台，旨在提高人们学习方言的兴趣,促进乡土方言文化的发展与延续。</p>
              </div>
            </swiper-slide>
            <div class="swiper-pagination swiper-pagination-white" slot="pagination"></div>
            <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
            <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
          </swiper>
        </md-card-media>
      </md-card>
    </div>

    <TabBar />
  </div>
</template>

<script>
// @ is an alias to /src
import TabBar from "@/components/base/TabBar.vue";
import NavBar from "@/components/base/NavBar.vue";
import "swiper/dist/css/swiper.css";

import { swiper, swiperSlide } from "vue-awesome-swiper";

import SvgA from "@/components/base/Svg.vue";
export default {
  data() {
    return {
      swiperOption1: {
        slidesPerView: 2,
        spaceBetween: 10,
        slidesOffsetBefore: 15,
        slidesOffsetAfter: 15,
        freeMode: true,
        pagination: {
          clickable: true
        }
      },
      swiperOption2: {
        slidesPerView: 2,
        slidesPerColumn: 2,
        spaceBetween: 10,
        slidesOffsetBefore: 15,
        slidesOffsetAfter: 15,
        freeMode: true,
        pagination: {
          // el: '.swiper-pagination',
          clickable: true
        }
      },
      swiperOption3: {
        slidesPerView: 2.2,
        spaceBetween: 10,
        slidesOffsetBefore: 15,
        slidesOffsetAfter: 15,
        freeMode: true,
        pagination: {
          clickable: true
        }
      },
      swiperOption4: {
        speed: 800,
        parallax: true,
        pagination: {
          // el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      }
    };
  },
  components: {
    swiper,
    swiperSlide,
    TabBar,
    NavBar,
    SvgA
  },methods:{
    toVideo(id){
      this.$router.push({ path: `/videoplay/${id}` });
    },
    test(){
      var data = new FormData();
        data.append("account", "admin");
        data.append("password", "admin");
        this.axios
          .post("/login", data)
          .then(res => {
            console.log(res);
          })
          .catch(error => {
            console.log(error);
          });
    }
  },mounted() {
    let tmpUser = JSON.parse(localStorage.getItem("user"));
    this.user = tmpUser;
    console.log(this.user);
    if(this.user==null){
      this.$toast.fail({ duration: 800, message: "请先登录" })
       this.$router.push("/login");
    }
  },
};
</script>


<style scoped lang="scss">
.home {
  padding-top: 46px;
  background: linear-gradient(
    0deg,
    rgba(243, 225, 181, 0.75),
    rgb(253, 253, 253)
  );
  position: relative;
}
.dub {
  padding: 30px;
  box-sizing: border-box;
  width: 94%;
  height: 38vh;
  background-color: white;
  margin: 10px auto;
  border-radius: 18px;
  border-bottom-left-radius: 60px;
  box-shadow: 0 1px 2px rgba(80, 78, 78, 0.2);
  -webkit-box-shadow: 0 1px 2px rgba(110, 108, 108, 0.3);
  background: url(../assets/bga.jpg) no-repeat;
  background-size: cover;
}
.dub p {
  font-size: 25px;
  color: #736b6b;
  margin: 18px 0;
  text-shadow: 1px 1px 1px #d3c9c9, -1px -1px 1px #fff;
}
.dub span {
  font-size: 16px;
}
.dub img:first-child {
  float: left;
}
.dub img:last-child {
  float: right;
}
::v-deep .van-nav-bar__right {
  top: 6px;
}
::v-deep .van-nav-bar__left {
  top: 6px;
}
.Ocard {
  margin-top: 15px;
  padding: 0px 0 16px 0;
  background-color: rgba(255, 255, 255, 0.842);
  border-radius: 8px;
  border-top-left-radius: 50px;
  box-shadow: 0 1px 2px rgba(80, 78, 78, 0.2);
}
.Ocard .title {
  height: 50px;
  padding: 3px 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  font-size: 15px;
  color: #736b6b;
  font-weight: bold;
}
.Ocard .title > p > span {
  font-weight: normal;
  font-size: 12px;
  color: #8a8a8a;
}
.Ocard .title > span {
  position: absolute;
  right: 15px;
  font-weight: normal;
  font-size: 12px;
  color: #8a8a8a;
  display: flex;
  align-items: center;
  justify-content: center;
}
.Ocard .bottom .swiper-container {
  padding-top: 15px;
}
.Ocard .bottom .swiper-container .swiper-slide {
  white-space: nowrap;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  color: black;
}
.dubcard {
  height: 100px;
  background-color: #fff;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
}
.dubcard .bg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.15);
}
.dubcard .text {
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  color: white;
  font-weight: bold;
  font-size: 16px;
}
.dubcard img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.default img {
  width: 100%;
  height: 25vh;
}

.article {
  margin-top: 15px;
  // height: 400px;
  background-color: rgba(255, 255, 255, 0.808);
  padding-bottom: 5px;
}
.article .header {
  height: 40px;
  padding: 3px 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: left;
  font-size: 15px;
  color: #736b6b;
  font-weight: bold;
}
.article .header span {
  margin-left: auto;
  font-weight: normal;
  font-size: 12px;
  color: #8a8a8a;
  display: flex;
  align-items: center;
  justify-content: center;
}
.article .content {
  padding: 0px 15px;
}
.article .content .artcard {
  margin-bottom: 15px;
  display: flex;
}
.article .content .artcard img {
  width: 160px;
  min-width: 160px;
  height: 100px;
  object-fit: cover;
  margin-right: 15px;
}
.article .content .artcard .text {
  max-width: 50%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
  font-size: 17px;
  color: black;
}
.article .content .artcard .text span {
  font-size: 14px;
  color: #968d8d;
}
.article .content .artcard .text .zhaiyao {
  width: 100%;
  color: rgb(90, 86, 86);
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; // 控制多行的行数
  -webkit-box-orient: vertical;
}

.video {
  margin-top: 15px;
  margin-bottom: 20px;
  height: 200px;
  background-color: rgba(255, 255, 255, 0.884);
}
.video .header {
  height: 40px;
  padding: 3px 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: left;
  font-size: 15px;
  color: #736b6b;
  font-weight: bold;
}
.video .header span {
  margin-left: auto;
  font-weight: normal;
  font-size: 12px;
  color: #8a8a8a;
  display: flex;
  align-items: center;
  justify-content: center;
}
.video .videocard {
  height: 110px;
  background-color: #968d8d;
  overflow: hidden;
  border-radius: 5px;
}
.video .videocard img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.video .title {
  padding-top: 8px;
  font-size: 14px;
  color: black;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.video .swiper-slide {
  position: relative;
}
.video .imgcenter {
  position: absolute;
  left: 50%;
  top: 43%;
  transform: translate(-50%, -50%);
}

.chinamap {
  margin: 35px 0px;
}
.parallax-bg {
  position: absolute;
  left: 0;
  top: 0;
  width: 130%;
  height: 100%;
  background: url("../assets/map.png") no-repeat;
  background-size: contain;
  background-position: center;
}
.chinamap .swiper-slide {
  padding-top: 50px;
}
.chinamap .swiper-slide .title {
  font-size: 41px;
  font-weight: 300;
  max-height: 60px;
}
.chinamap .swiper-slide .subtitle {
  font-size: 18px;
}
.chinamap .swiper-slide .text {
  font-size: 14px;

  line-height: 1.3;
  padding: 5px 35px;
}
</style>