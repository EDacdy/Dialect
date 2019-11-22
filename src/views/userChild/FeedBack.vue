<!--  -->
<template>
  <div style="padding-top:56px;height:100vh">
    <NavBar>
      <div slot="left-screen" @click="onReturn">
        <img src="../../assets/return.png" />
        <span style="position:relative;top:-3px;">返回</span>
      </div>
      <div slot="title-screen">意见反馈</div>
      <div slot="right-screen" @click="submit">
        <img src="../../assets/nike.svg" />
      </div>
    </NavBar>
    <div class="box">
      <div class="title">问题或建议</div>
      <van-field
        v-model="message"
        type="textarea"
        placeholder="请详细描述问题出现的情况、操作步骤、出现的提示语等。"
        rows="3"
        autosize
      />
      <div class="title">联系方式(选填)</div>
      <van-field v-model="contact" placeholder="邮箱、手机号或QQ号码" />
      <div class="title">问题截图(选填)</div>
      <van-uploader v-model="fileList" :max-count="1" style="float:left"/>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/base/NavBar.vue";
export default {
  data() {
    return {
      fileList: [],
      message: null,
      
    };
  },
  components: {
    NavBar
  },
  methods: {
    onReturn() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    submit(){
      if(this.message===null){
        this.$toast.fail("请按要求提交");
      }else{
         this.$toast.success("感谢您的反馈");
         axios
        .post("/addDynamic", {
          contact:this.contact,
          img1:this.fileList[0].content,  //图片1
          content:this.message, //反馈内容
          id: JSON.parse(localStorage.getItem("user")).id //本地存储的用户信息-id
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
      }
    }
  }
};
</script>
<style scoped lang="scss">
.box {
  padding: 0px 20px;
}
.title{
  text-align: left;
  padding: 10px;
  margin-top: 15px;
  // color: gray;
  // font-weight: bold;
}
.box div:first-child{
  margin-top: 0px;
}
::v-deep .van-cell {
  border: 1px solid rgb(216, 212, 212);
  border-radius: 3px;
}
</style>