<!--  -->
<template>
  <div style="padding-top:46px;height:calc(100vh - 46px);">
    <NavBar>
      <div slot="left-screen" @click="onReturn">
        <img src="../../assets/return.png" />
        <span style="position:relative;top:-3px;">返回</span>
      </div>
      <div slot="title-screen"></div>
      <div slot="right-screen" @click="submit"></div>
    </NavBar>
    <div class="box">
      <div class="bgbg">
        <img src="../../assets/bgbg.png" />
      </div>
      <div class="logo">
        <img src="../../assets/logo1.png" />
      </div>
      <h1 style="text-align:left;padding-left:20px;">
        <b>方言学者计划</b>
        <b></b>
        <br />
      </h1>
      <h4 style="text-align:left;padding-left:20px;">
        让学习方言变的简单，现在来，不算晚
        <br />
      </h4>
      <div class="imgs">
        <img src="http://120.78.75.14/files/image/1-818953fb-e012-40fe-b26f-31b6c43fbbfe.jpeg" />
        <img src="http://120.78.75.14/files/image/14-1f4c72ad-d1a9-46b7-ad99-690f6d1a0753.png" />
        <img src="http://120.78.75.14/files/image/13-9e8366fb-b320-41e4-ac12-3d36becbe5f3.png" />
        <img src="http://120.78.75.14/files/image/17-800313e5-b6c3-4c95-a9c6-1cd0b34d702c.jpeg" />
        <img src="http://120.78.75.14/files/image/3-9ed0b7c4-43f2-4558-acea-7317ac26345b.jpeg" />
        <img src="http://120.78.75.14/files/image/26-8828481f-0626-4254-b586-65c844ad0439.png" />
      </div>
      <div style="margin-top:20px;">
        <div style="padding:8px 30px;">
          <van-field v-model="value1" placeholder="输入您的称呼" />
        </div>
        <div style="padding:8px 30px;margin-bottom:15px">
          <van-field v-model="value2" placeholder="填写您的联系方式或证明材料" />
        </div>
        <van-button color="#f1f1f1" type="info" size="large" :text="'提交'" @click="check" />
      </div>
      <div style="padding-top:30px;">
        <p>
          <b>方言学者如何理解？</b>
        </p>
        <p>
          <b>方言</b>是语言的地域变体
          <b></b>。
          <b></b>中国幅员辽阔，方言众多。一般认为，汉语可以分为七大方言：
          <b></b>官话方言、湘方言、赣方言、吴方言、闽方言、粤方言和客家方言。
          <b>
            <br />
          </b>
        </p>
        <p>
          <b>学者</b>：社会学概念。有广义、狭义之分。广义“学者”：是指具有一定学识水平、能在相关领域表达思想、提出见解、引领社会文化潮流的人；狭义“学者”：是指追求学问之人，即专门从事某种学术研究的人。“学者”有时亦称“专家”，能在自己所在领域做出相应成就的人。
        </p>
        <p>方言学者亦可以是对方言学有所见识的人或是有志于成为讲好某一地方方言的人，这也就是我们乡音塾招募有识有志之士的初衷，有了您的加入，“乡音塾”在方言学习的道理上才能走的更远，我们方能为方言保护献出绵薄之力。</p>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
import NavBar from "@/components/base/NavBar.vue";
export default {
  data() {
    return {
      makeimg: require("../../assets/makec.svg"),
      courseList: [],
      value1: null,
      value2: null
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
    check(){
      if(this.value1&&this.value2){
   this.$toast.success({ duration: 500, message: "提交成功" });
      }else{
        this.$toast.fail({ duration: 500, message: "请认真填写" });
      }
    }
  },
  mounted() {
    this.getMyCourse();
  }
};
</script>
<style scoped lang="scss">
::v-deep .van-button {
  width: 85%;
  border-radius: 25px;
  font-size: 16px;
}

::v-deep .van-nav-bar__right {
  top: 0;
}
.bgbg {
  z-index: -1;
  position: absolute;
  top: 0;
  left: 0;
}
.bgbg img {
  width: 100vw;
}
.box {
  padding: 10px;
  // padding-top: 50px;
}
.box .logo {
  padding-top: 70px;
  width: 50%;
}
.box .logo img {
  width: 150px;
  height: auto;
}
.box p {
  text-align: left;
  padding-left: 10px;
}
.imgs {
  overflow-x: scroll;
  display: flex;
  flex-wrap: nowrap;
  margin-left: -10px;
  width: 100vw;
}
.imgs img {
  width: 70px;
  height: 70px;
  object-fit: cover;
  margin-right: 5px;
}
::v-deep .van-button--info {
  background-color: #e9e9e9;
  border: 1px solid #e9e9e9;
}
</style>