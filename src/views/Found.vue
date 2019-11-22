<!--  -->
<template>
  <div>
    <NavBar>
      <div slot="left-screen"></div>
      <div slot="title-screen">发现</div>
      <div slot="right-screen">
        <router-link to="/search">
          <img src="../assets/search.svg" />
        </router-link>
      </div>
    </NavBar>
    <!-- 内容模块 -->
    <div style="margin-top:56px;">
       <router-link tag="div" class="plan"  to="/userplan">
        <div class="planB">有识有志·乡音塾</div>
      </router-link>
      <div class="dia">
        <router-link tag="div" class="sort" to="/sort">
          <div>
            方言分类
            <img src="../assets/jian.svg" />
          </div>
          <span>汉语方言分类小百科</span>
        </router-link>

        <router-link tag="div" class="map" to="/map">
          <div>
            方言地图
            <img src="../assets/jian.svg" />
          </div>
          <span>在线图片资源</span>
        </router-link>
      </div>
      <div class="todo">
        <!-- 配音 -->
        <!-- <div class="dub">
         
        </div>-->
        <van-cell is-link to="/dub">
          <template slot="title">语料库</template>
          <div slot="right-icon" style="margin-top:5px;">
            <img src="../assets/iconmonstr-headphones-14.svg" />
          </div>
        </van-cell>
        <van-cell is-link to="/article">
          <template slot="title">文章</template>
          <div slot="right-icon" style="margin-top:5px;">
            <img src="../assets/iconmonstr-book-17.svg" />
          </div>
        </van-cell>
        <van-cell is-link to="/video">
          <template slot="title">视频</template>
          <div slot="right-icon" style="margin-top:5px;">
            <img src="../assets/iconmonstr-video-9.svg" />
          </div>
        </van-cell>
        <van-cell is-link to="/course">
          <template slot="title">课程</template>
          <div slot="right-icon" style="margin-top:5px;">
            <img src="../assets/class.svg" />
          </div>
        </van-cell>
      </div>
    </div>
    <TabBar />
  </div>
</template>

<script>
import TabBar from "@/components/base/TabBar.vue";
import NavBar from "@/components/base/NavBar.vue";

export default {
  data() {
    return {};
  },
  components: {
    TabBar,
    NavBar
  }
};
</script>

<style scoped lang="scss">
.plan {
  margin: 0px 15px;
  width: auto;
  height: 18vh;
  position: relative;
  overflow: hidden;
  // background-color:rgba(0,0,0,0.5);
  background-image: url(../assets/20190723175107.png);
  // opacity: 0.5;
  background-size: 85vh auto;
  background-position: center center;
  border-radius: 10px;
  background-repeat: no-repeat;
  font-size: 20px;
  font-weight: 600;

  line-height: 15vh;
}
.planB {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  text-align: center;
  background: rgba(255, 255, 255, 0.5);
  color: #48555d;
}
.todo ::v-deep .van-cell__title {
  text-align: left;
  padding-left: 8px;
  line-height: 36px;
}
.todo ::v-deep .van-cell {
  padding: 15px 15px;
}
.todo ::v-deep .van-cell ::after {
  position: absolute;
  box-sizing: border-box;
  content: " ";
  pointer-events: none;
  right: 18px;
  bottom: 0;
  left: 18px;
  border-bottom: 1px solid #ebedf0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
.todo ::v-deep .van-cell:not(:last-child)::after {
  right: 18px;

  left: 18px;
}
.todo ::v-deep .van-cell {
  font-size: 18px;
}
.dia {
  width: 100%;
  height: 100px;
  // background-color: violet;
  padding: 10px 15px;
  margin-top: 10px;
  display: flex;
  box-sizing: border-box;
}
.dia .sort {
  width: 48%;
  height: auto;
  background-color: #f8f8f8;
  border-radius: 15px;
  padding: 15px 25px;
  box-sizing: border-box;
  text-align: left;
  // font-family:"Heiti SC"
}
.dia .sort > div,
.dia .map > div {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bolder;
}
.dia .sort > div > img,
.dia .map > div > img {
  margin-left: auto;
}
.dia .sort span,
.dia .map span {
  display: inline-block;
  text-align: left;
  margin: 8px 0 0 0px;
  font-size: 12px;
  text-align: left;
}
.dia .map {
  width: 48%;
  height: auto;
  background-color: #f8f8f8;
  border-radius: 15px;
  padding: 15px 25px;
  box-sizing: border-box;
  text-align: left;
  margin-left: auto;
}
</style>