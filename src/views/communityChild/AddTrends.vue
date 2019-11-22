<!--  -->
<template>
  <div>
    <div style="padding-top:46px;">
      <NavBar>
        <div slot="left-screen" @click="onReturn">
          <img src="../../assets/return.png" />
          <span style="position:relative;top:-3px;"></span>
        </div>
        <div slot="title-screen">发动态</div>
        <div slot="right-screen" @click="sendCheck">发送</div>
      </NavBar>
      <van-cell-group>
        <van-field
          v-model="message"
          type="textarea"
          placeholder="此时此刻,想和大家分享什么..."
          rows="3"
          autosize
          ref="field"
        />
      </van-cell-group>
      <van-uploader v-model="fileList" multiple :max-count="2" :after-read="afterRead" />

      <div class="audiocheck">
        <div class="audiostart" v-show="!audioHidden" @click="startRecording">
          <img src="../../assets/audiostart.png" />
        </div>
        <div class="audiofinish" v-show="audioHidden" @click="stopRecording">
          <img src="../../assets/finish.png" />
        </div>
        <div class="audition" v-show="audition" @click="playRecording">
          <img src="../../assets/audition.png" />
        </div>
        <div class="auditionfinish" v-show="auditionstop" @click="pause">
          <img src="../../assets/finish.png" />
        </div>
        <audio ref="audio" autoplay src @ended="audioEnd"></audio>
      </div>
    </div>
  </div>
</template>

<script>
// import {Record} from '../../../static/js/record.js'
import NavBar from "@/components/base/NavBar.vue";
var Record = require("../../../static/js/record.js");
export default {
  data() {
    return {
      fileList: [],
      message: null,
      audioHidden: false,
      audition: false,
      auditionstop: false,
      recordstatus:false   //记录录音情况 
    };
  },
  components: {
    NavBar,
    Record
  },
  methods: {
    // 返回上一页
    onReturn() {
      if (!this.message) {
        window.history.length > 1
          ? this.$router.go(-1)
          : this.$router.push("/");
      } else {
        this.$dialog
          .confirm({
            title: "提示",
            message: "将会清空内容，确定退出吗？"
          })
          .then(() => {
            window.history.length > 1
              ? this.$router.go(-1)
              : this.$router.push("/");
          })
          .catch(() => {});
      }
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
      // 将base64解码
      var bytes = atob(base64String);
      //var bytes = base64;
      var bytesCode = new ArrayBuffer(bytes.length);
      // 转换为类型化数组
      var byteArray = new Uint8Array(bytesCode);

      // 将base64转换为ascii码
      for (var i = 0; i < bytes.length; i++) {
        byteArray[i] = bytes.charCodeAt(i);
      }
      // 生成Blob对象（文件对象）
      return new Blob([bytesCode], { type: imgtype });
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      
      // this.axios
      //   .post(
      //     "/upload",
      //     data
      //   )
      //   .then(res => {
      //     console.log(res);
      //     console.log("data" + data);
      //     // console.log(this.fileList);
      //     // console.log(data.get("img1"));
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });
    },
    //发送--校验
    sendCheck() {
      if (!this.message) {
        this.$toast("内容不能为空");
        this.$refs.field.focus();
        // console.log(this.$refs.audio.duration);
        var blobb = Record.recorder.getBlob();
        // var blobb = this.convertBase64ToBlob()
        // console.log(blobb);
      } else {
        var blobb;
        var data = new FormData();
        if (this.recordstatus != false) {
          console.log("录音不为空");
          blobb = Record.recorder.getBlob();
        }
        var img1, img2;
        // if (this.fileList.length == 1) {
        //   img1 = this.convertBase64ToBlob(this.fileList[0].content);
        //   img2 = null;
        // } else if (this.fileList.length == 2) {
        //   img1 = this.convertBase64ToBlob(this.fileList[0].content);
        //   img2 = this.convertBase64ToBlob(this.fileList[1].content);
        // }
        if (this.fileList.length >= 1) {
          data.append(
            "img1",
            this.convertBase64ToBlob(this.fileList[0].content)
          );
        }

        if (this.fileList.length == 2) {
          data.append(
            "img2",
            this.convertBase64ToBlob(this.fileList[1].content)
          );
        }
        data.append("content", this.message);
        data.append("record", blobb);
        data.append("id", JSON.parse(localStorage.getItem("user")).id);

            console.log(data.get("record"));
        this.axios
          .post("/addDynamic", data)
          .then(res => {
            console.log(res);
             this.$toast.success({ duration: 800, message: "发布成功" });
              setTimeout(() => {
                this.$router.go(-1);
              }, 800);
            // console.log(data.get("img1"));
            // console.log(data.get("img2"));
            // console.log(data.get("record"));
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    startRecording() {
      Record.HZRecorder.get(function(rec) {
        Record.recorder = rec;
        Record.recorder.start(); //录音开始
        console.log("录音开始");

      });
      this.audioHidden = !this.audioHidden;
      this.recordstatus=true;
    },
    stopRecording() {
      Record.recorder.stop(); //录音结束
      this.audioHidden = !this.audioHidden;
      this.$toast.success({ duration: 500, message: "录音完成" });
      this.audition = true;
    },
    playRecording() {
      Record.recorder.play(this.$refs.audio); //试听开始
      this.audition = false;
      this.auditionstop = !this.auditionstop;
    },
    pause() {
      this.$refs.audio.pause(); //试听结束
      this.$toast.fail({ duration: 500, message: "试听终止" });
      this.auditionstop = !this.auditionstop;
      this.audition = true;
    },
    audioEnd() {
      this.auditionstop = !this.auditionstop;
      this.audition = true;
    }
  },
  mounted() {},
   deactivated() {
    //销毁实例，防止缓存
    this.$destroy(true);
  }

};
</script>

<style scoped lang="scss">
::v-deep .van-nav-bar__right {
  top: 0;
  display: table-cell;
  vertical-align: middle;
  font-weight: 600;
}
::v-deep [class*="van-hairline"]::after {
  border: none;
}
::v-deep .van-uploader {
  // position: absolute;
  // left: 10px;
  padding-left: 10px;
  float: left;
  position: relative;
  width: auto;
  max-width: 180px;
}
::v-deep .van-uploader__upload {
  margin: 0 0 10px 0;
  // min-width: 170px;
}

body {
  background-color: #f3f5f6;
}
.audiocheck {
  width: auto;
  height: 78px;
  float: left;
  position: relative;
  // left: 50%;
  box-sizing: border-box;
  min-width: 80px;
  max-width: 180px;
}
.audiostart,
.audiofinish,
.audition,
.auditionfinish {
  width: 78px;
  height: 78px;
  cursor: pointer;
  position: relative;
  border: 1px dashed #e5e5e5;
  float: left;
  margin: 0 0 10px 10px;
}
.auditionfinish img,
.audiostart img,
.audiofinish img,
.audition img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>