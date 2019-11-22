<!--  -->
<template>
  <div style="background-color:#f8f8f8;padding-top:56px;height:clac(100vh - 56px)">
    <NavBar>
      <div slot="left-screen" @click="onReturn">
        <img src="../../assets/return.png" />
        <span style="position:relative;top:-3px;">返回</span>
      </div>
      <div slot="title-screen">账号设置</div>
      <div slot="right-screen" @click="submit">
        <img src="../../assets/nike.svg" />
      </div>
    </NavBar>
    <!-- <div class="home_index">
      <div class="home">
        <img alt="Vue logo" src="../../assets/logo.png" />
        <input ref="photoref" type="file" accept="image/*" @change="Photograph()" capture="camera" />
        <p>{{ fileName }}</p>
      </div>
      <div class="preview">
        <img :src="base64ImgData" alt />
        
      </div>
    </div>-->
    <div class="public">
      <div>
        头像
        <div class="cimg">
          <img :src="user.headimg" alt />
          <input
            ref="photoref"
            type="file"
            accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
            @change="Photograph()"
          />
          <img src="../../assets/ccca.svg" />
        </div>
      </div>
      <div class="inputspa">
        用户名
        <div  >
          <van-field v-model="user.username" clearable placeholder="用户名不能为空" />
          <img src="../../assets/jian.svg" />
        </div>
      </div>
      <div>
        绑定邮箱
        <div>
          {{user.email}}
          <img src="../../assets/jian.svg" />
        </div>
      </div>
      <div @click="showPlace = true">
        家乡
        <div>
          {{user.placecity}}
          <img src="../../assets/jian.svg" />
        </div>
      </div>
      <div>
        简介
        <div>
          <van-field
            v-model="user.intro"
            type="textarea"
            placeholder="简单的介绍下自己吧"
            rows="2"
            autosize
          />
        </div>
      </div>
    </div>
    <van-popup v-model="showPlace" position="bottom" :style="{ height: '40%' }">
      <van-area
        :area-list="areaList"
        :columns-num="2"
        :title="biaoti"
        @confirm="onPlace"
        @cancel="cancelShow"
      />
    </van-popup>
  </div>
</template>

<script>
import NavBar from "@/components/base/NavBar.vue";

import Area from "../../../static/js/area.js";
export default {
  data() {
    return {
      user: {
        intro: null, //简介
        username: "EDa", //用户名
        email: "106733@qq.com",
        place: null, //省份
        city: null, //城市
        placecity: null, //省+城
        headimg: "https://img.yzcdn.cn/vant/cat.jpeg"
      },

      showPlace: false,
      areaList: Area,
      headimgstatus:false,
      fileName: "点击Vue拍照"
    };
  },
  components: {
    NavBar,
    Area
  },
  methods: {
    onReturn() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    async Photograph() {
      // 获取用户拍照的图片名字，显示到页面上
      this.fileName = this.$refs.photoref.files[0].name;
      // 获取图片base64 代码，并存放到 base64ImgData 中
      this.user.headimg = await this.FileReader(this.$refs.photoref.files[0]);
      this.headimgstatus=true;
    },
    /**
     * 返回用户拍照图片的base64
     */
    FileReader(FileInfo) {
      // FileReader 方法参考地址：https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader
      let reader = new FileReader();
      // readAsDataURL 方法参考地址：https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/readAsDataURL
      reader.readAsDataURL(FileInfo);
      // 监听读取操作结束
      /* eslint-disable */
      return new Promise(
        resolve => (reader.onloadend = () => resolve(reader.result))
      );
    },
    convertBase64ToBlob(base64) {
      var base64Arr = base64.split(",");
      var imgtype = "";
      var base64String = "";
      if (base64Arr.length > 1) {
        //如果是图片base64，去掉头信息
        base64String = base64Arr[1];
        imgtype = base64Arr[0].substring(
          base64Arr[0].indexOf(":") + 1,
          base64Arr[0].indexOf(";")
        );
      }
      var bytes = atob(base64String);
      var bytesCode = new ArrayBuffer(bytes.length);
      var byteArray = new Uint8Array(bytesCode);

      for (var i = 0; i < bytes.length; i++) {
        byteArray[i] = bytes.charCodeAt(i);
      }
      // 生成Blob对象（文件对象）
      return new Blob([bytesCode], { type: imgtype });
    },
    onPlace(arr) {
      this.showPlace = false;

      this.user.place = arr[0].name;
      this.user.city = arr[1].name;
      if (this.user.place !== this.user.city && this.user.place != null) {
        this.user.placecity = this.user.place + "" + this.user.city;
      } else {
        this.user.placecity = this.user.place;
      }
      console.log(arr);
    },
    cancelShow() {
      this.showPlace = false;
    },
    //提交时进行验证
    submit() {
      if (!this.user.username && !this.user.placecity) {
        console.log(this.user.username+" "+ this.user.placecity);
        this.$toast.fail({ duration: 800, message: "请填写完整" });
        
      } else {
        var data =new FormData();
        if(this.headimgstatus){
           var blobb =  this.convertBase64ToBlob(this.user.headimg)
          data.append("headimg",blobb);
        }
        data.append("id",JSON.parse(localStorage.getItem("user")).id);
        data.append("place",this.user.place);
        data.append("city",this.user.city);
        data.append("intro",this.user.intro);
        data.append("placecity",this.user.placecity);
        data.append("username",this.user.username);
         console.log(data);
         this.axios
          .post("/changeMessage", data)
          .then(res => {
            console.log(res);
            var userData = res.data.data;
              var tmpUser = JSON.stringify(userData);
              localStorage.setItem("user", tmpUser);
              this.$toast.success({ duration: 800, message: "保存成功" });
              setTimeout(() => {
                this.$router.go(-1);
              }, 800);
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  },
  mounted() {
    let tmpUser = JSON.parse(localStorage.getItem("user"));
    this.user = tmpUser;
    if (tmpUser.place == tmpUser.city && tmpUser.placecity != null) {
      this.placecity = tmpUser.place;
    }
  },
   deactivated() {
    //销毁实例，防止缓存
    this.$destroy(true);
  }
};
</script>
<style scoped lang="scss">
::v-deep -webkit-input-placeholder {
  text-align: right;
}
::v-deep .van-cell {
  padding: 0;
}
.inputspa ::v-deep .van-field__control{
  text-align: right;
}
::v-deep .van-field__control {
  text-align: left;
}

::v-deep .van-cell:not(:last-child)::after {
  border: none;
}
.public {
}
.public > div {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  padding: 15px 15px;
  position: relative;
}
.public > div > div {
  margin-left: auto;
  display: flex;
  align-items: center;
  // justify-content: center;
}
.public > div:not(:last-child)::after {
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
.cimg {
  position: relative;
  width: 50px;
  height: 50px;
}
.cimg img:first-child {
  width: 50px;
  height: 50px;
  object-fit: cover;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
}
.cimg img:last-child {
  position: absolute;
  right: -3px;
  bottom: -3px;
  background-color: white;
  border-radius: 50%;

  opacity: 0.9;
}
.home {
  width: 200px;
  margin: 0 auto;
  position: relative;
}
input[type="file"] {
  position: absolute;
  left: 0;
  top: 0;
  width: 50px;
  height: 50px;
  z-index: 9;
  opacity: 0;
}
.home p {
  font-size: 13px;
  color: #8d8d8d;
}
.preview img {
  width: 100%;
}
</style>