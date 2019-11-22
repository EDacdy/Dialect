<!--  -->
<template>
  <div style="padding-top:46px;height:calc(100vh - 46px);background-color:rgb(248, 248, 248)">
    <NavBar>
      <div slot="left-screen" @click="onReturn">
        <img src="../../assets/return.png" />
        <span style="position:relative;top:-3px;">返回</span>
      </div>
      <div slot="title-screen">创建</div>
      <div slot="right-screen" @click="submit"></div>
    </NavBar>
    <van-tabs v-model="active" sticky :offset-top="46" swipeable>
      <van-tab>
        <span slot="title">音频卡片</span>
        <div slot="default">
          <div class="cover">
            <img src="../../assets/capt.svg" />
            <span>轻触上传卡片封面</span>
            <input
              ref="photoref"
              type="file"
              accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
              @change="Photograph1()"
            />
            <img :src="base64ImgData1" alt style="coverimg" />
          </div>
          <div style="padding:8px 30px;">
            <van-field v-model="cardtitle" placeholder="请输入卡片标题" />
          </div>
          <div style="padding:8px 30px;">
            <van-field v-model="cardcontent" placeholder="请输入卡片文字描述" />
          </div>
          <div class="control">
            <div class="container">
              <div class="recordbutton" @click="recordchance">
                <img :src="playing?normalc:normal" />
              </div>
              <div class="x-loader" v-show="recording"></div>
            </div>
            <div class="f_text">
              点击话筒开始录音
              <br />
              <span v-show="this.try" @click="tryPlay">
                试听
                <audio ref="audio" autoplay src></audio>
              </span>
            </div>
          </div>
          <div>
            <van-button
              color="#2a9fe4"
              type="info"
              size="large"
              :text="'保存'"
              @click="submit"
              :disabled="disabled"
              to="/createcourse"
            />
          </div>
        </div>
      </van-tab>
      <van-tab>
        <span slot="title">课程</span>
        <div slot="default">
          <div style="height:calc(100vh - 200px);overflow-y:scroll;">
            <van-checkbox-group v-model="result" v-show="!scrollstatus">
              <!-- <draggable
                :list="list"
                :disabled="!enabled"
                class="list-group"
                ghost-class="ghost"
                :move="checkMove"
                @start="dragging = true"
                @end="dragging = false"
              > -->
                <van-cell
                  v-for="(item, index) in list"
                  clickable
                  :key="item"
                  @click="toggle(index)"
                >
                  <div class="cardList">
                    <div class="audio1" @click.stop="startPlayOrPause(index)">
                      <span>
                        <img :src="item.playing?stopsvg:playsvg" />
                      </span>
                      <img :src="item.cover" style=" opacity: 0.5;"/>
                    </div>
                    <audio ref="aaudio" @pause="onPause(index)" @play="onPlay" :src="item.audiourl"></audio>
                    <div class="message">
                      <div class="title">{{item.title}}</div>
                      <div class="intro">{{item.intro}}</div>
                      <div class="time">{{item.data}}</div>
                    </div>
                    <van-checkbox :name="item" ref="checkboxes" slot="right-icon" />
                  </div>
                </van-cell>
              <!-- </draggable> -->
            </van-checkbox-group>
            <div id="Ascroll" style="height:500px;" v-show="!next&&scrollstatus">
              <div class="cover">
                <img src="../../assets/capt.svg" />
                <span>轻触上传课程封面</span>
                <input
                  ref="photoref"
                  type="file"
                  accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
                  @change="Photograph2()"
                />
                <img :src="base64ImgData2" alt style="coverimg" />
              </div>
              <div style="padding:8px 30px;">
                <van-field v-model="coursetitle" placeholder="请输入课程标题" />
              </div>
              <div style="padding:8px 30px;">
                <van-field v-model="coursecontent" placeholder="请输入课程文字描述" />
              </div>
            </div>
          </div>
          <div class="check">
            <p>需要至少2张卡片才能创建课程,长按卡片可以调整顺序</p>
            <van-button
              ref="submitbutton"
              color="#2a9fe4"
              type="info"
              size="large"
              :text="'下一步'"
              @click="scroll"
              :disabled="next"
            />
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import NavBar from "@/components/base/NavBar.vue";

import draggable from "vuedraggable";
import { setTimeout } from "timers";
var Record = require("../../../static/js/record.js");

export default {
  data() {
    return {
      // 音频是否处于播放状态的属性
      playing: false,
      cardtitle: null,
      cardcontent: null,
      active: 0,
      makeimg: require("../../assets/makec.svg"),
      recording: false,
      normal: require("../../assets/hua.svg"),
      normalc: require("../../assets/sang.svg"),
      playsvg: require("../../assets/playsvg.svg"),
      stopsvg: require("../../assets/stopsvg.svg"),
      base64ImgData1: null,
      base64ImgData2: null,
      enabled: true,
      coursetitle: null,
      coursecontent: null,
      scrollstatus: false,
      try:false,
      list: [
        {
          id: 1,
          username: "chenchen",
          cover: require("../../assets/play.png"),
          title: "正宗温州话",
          intro: "第一段音频-介绍温州",
          data: "2019-08-30",
          audiourl:
            "https://uploadfile1.talkmate.com/card/sounds/16/08/28/57c2683035bed.mp3",
          playing: false
        }
       
      ],

      dragging: false,
      result: []
    };
  },
  components: {
    NavBar,
    draggable
  },
  methods: {
    onReturn() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    async Photograph1() {
      // 获取图片base64 代码，并存放到 base64ImgData 中
      this.base64ImgData1 = await this.FileReader(this.$refs.photoref.files[0]);
      console.log(this.base64ImgData1);
    },
    async Photograph2() {
      // 获取图片base64 代码，并存放到 base64ImgData 中
      this.base64ImgData2 = await this.FileReader(this.$refs.photoref.files[0]);
      console.log(this.$refs.photoref.files[0]);
      console.log(base64ImgData2);
    },
    FileReader(FileInfo) {
      let reader = new FileReader();
      reader.readAsDataURL(FileInfo);
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
    submit() {
      var data = new FormData();
      var blobb = this.convertBase64ToBlob(this.base64ImgData1);
      var record = Record.recorder.getBlob(); 
      data.append("cover", blobb); //封面
      data.append("id", JSON.parse(localStorage.getItem("user")).id); //id
      data.append("title", this.cardtitle); //音频卡片标题
      data.append("intro", this.cardcontent); //卡片说明
      data.append("record",record); 
      this.axios
        .post("/addAudioCard", data) //添加音频卡片
        .then(res => {
          console.log(res);
          this.$dialog
          .confirm({
            // title: "",
            message: "保存成功",
            "cancelButtonText":"继续创建",
            "confirmButtonText":"去草稿箱",
            "confirmButtonColor":"#1885df"
          })
          .then(() => {
            window.history.length > 1
              ? this.$router.push("/draft")
              : this.$router.push("/");
          })
          .catch(() => {
            this.cardtitle=null;
            this.cardcontent=null;
            this.base64ImgData1=null;
            this.$refs.audio=null;
            this.try =false;
          });
          this.getMyAudioCard();
        })
        .catch(error => {
          console.log(error);
        });
    },
    startRecording() {
      Record.HZRecorder.get(function(rec) {
        Record.recorder = rec;
        Record.recorder.start(); //录音开始
        console.log("录音开始");
      });
    },
    recordchance() {
      if (this.recording == true) {
        this.stopRecording();
      } else {
        this.startRecording();
      }
      this.recording = !this.recording;
    },
    startRecording() {
      Record.HZRecorder.get(function(rec) {
        Record.recorder = rec;
        Record.recorder.start(); //录音开始
        console.log("录音开始");
      });
    },
    stopRecording() {
      Record.recorder.stop(); //录音结束
      this.$toast.success({ duration: 500, message: "录音完成" });
      this.try = true;
      
    },
    playRecording() {
      Record.recorder.play(this.$refs.audio); //试听开始
    },
    tryPlay() {
      Record.recorder.play(this.$refs.audio);
      console.log(this.$refs.audio.src);
    },
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
      // console.log(this.result);
    },

    //课程音频播放 下
    startPlayOrPause(index) {
      console.log(this.list[index].playing);
      console.log(this.list);
      return this.list[index].playing ? this.pause(index) : this.play(index);
    },
    play(index) {
      this.list[index].playing = true;
      this.$refs.aaudio[index].play();
    },
    // 暂停音频
    pause(index) {
      this.list[index].playing = false;
      this.$refs.aaudio[index].pause();
    },
    onPlay(res) {
      console.log(res);
      let target = res.target;
      let audios = document.getElementsByTagName("audio");
      [...audios].forEach(item => {
        if (item !== target) {
          item.pause();
          console.log(item);
        }
      });
    },
    onPause(index) {
      this.list[index].playing = false;
    },
    scroll() {
      if (this.scrollstatus) {
        if (
          this.coursetitle &&
          this.coursecontent &&
          this.result.length >= 2 &&
          this.base64ImgData2
        ) {
          var blobb = this.convertBase64ToBlob(this.base64ImgData2);

          var data = new FormData();
          data.append("cover", blobb); //课程封面
          data.append("id", JSON.parse(localStorage.getItem("user")).id); //id
          data.append("title", this.coursetitle); //课程卡片标题
          data.append("intro", this.coursecontent); //课程说明
        
          data.append("audiolist", JSON.stringify(this.result)); //选中的音频数组

          // console.log(JSON.stringify(this.result));
          this.axios
            .post("/addCourse", data) //添加课程
            .then(res => {
              this.$toast.success({ duration: 800, message: "发布成功" });
              
              console.log(res);
              this.$router.go(-1);
              // 粤来粤爱LoveRadio
              // 粤爱粤传递，欢迎来听粤语方言课程
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          this.$toast.fail({ duration: 800, message: "请填写完整" });
        }
      }
      this.scrollstatus = true;
      this.$refs.submitbutton.textContent = "发布";
   
    },
    getMyAudioCard() {
      var data = new FormData();
      data.append("id", JSON.parse(localStorage.getItem("user")).id); //id
      this.axios
        .post("/getMyAudioCard", data) 
        .then(res => {
          console.log(res);
          this.list=res.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  computed: {
    disabled: function() {
      if (this.lan && this.placecity) {
        this.textbutton = "提交";
      }
      return this.base64ImgData1 && this.cardtitle && this.cardcontent &&this.try ? false : true;
    },
    next: function() {
      return this.result.length >= 2 ? false : true;
    }
  },
  mounted(){
    this.getMyAudioCard();
  },
  deactivated() {
    //销毁实例，防止缓存
    this.$destroy(true);
  }
};
</script>
<style scoped lang="scss">
::v-deep .van-tabs__line {
  background-color: #2a9fe4 !important;
  width: 60px !important;
}
::v-deep .van-tab__pane {
  position: relative;
  height: calc(100vh - 90px);
  overflow: hidden;
}
.makebutton {
  padding: 20px 0px;
  background-color: white;
}
::v-deep .van-button {
  width: 85%;
  border-radius: 25px;
  font-size: 16px;
}

::v-deep .van-nav-bar__right {
  top: 0;
}
.cover {
  width: 80%;
  height: 150px;
  margin: 20px auto;
  border: 2px rgb(201, 190, 190) dashed;
  outline: 5px solid rgb(234, 233, 235);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  // overflow: hidden;
}
.cover span {
  position: absolute;
  bottom: 5px;
  color: gray;
  font-size: 14px;
}
.cover img:last-child {
  position: absolute;
  max-width: 100%;
  height: 100%;
  object-fit: scale-down;
}
input[type="file"] {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 9;
  opacity: 0;
}
.control {
  height: 175px;
  position: relative;
  box-sizing: border-box;
  padding-top: 30px;
}

.recordbutton {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #48a0e9;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  min-height: 90px;
  position: relative;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
}
//播放涟漪效果
.x-loader {
  -webkit-animation: xboxloader infinite 2.5s linear;
  animation: xboxloader infinite 2.5s linear;
  border: #d1e3f5 20px solid;
  border-radius: 50%;
  box-sizing: border-box;
  width: 90px;
  height: 90px;
  opacity: 0;
}
@-webkit-keyframes xboxloader {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  25% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 1;
  }
  50% {
    border-width: 0;
    opacity: 0;
    -webkit-transform: scale(1.3);
    transform: scale(1.3);
  }
}
@keyframes xboxloader {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  25% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 1;
  }
  50% {
    border-width: 0;
    opacity: 0;
    -webkit-transform: scale(1.3);
    transform: scale(1.3);
  }
}
.f_text {
  padding-top: 10px;
  text-align: center;
  font-size: 12px;
  color: gray;
}

.check {
  width: 100%;
  position: absolute;
  bottom: 0;
  height: 110px;
  background-color: white;
  box-sizing: border-box;
}
.check p {
  font-size: 13px;

  box-sizing: border-box;
}
.cardList {
  display: flex;
  align-items: center;
  justify-content: center;
}
.cardList .audio1 {
  width: 60px;
  height: 60px;
  position: relative;
  margin-right: 12px;
}
.cardList .audio1 span {
  // width: 18px;
  // height: 18px;
}

.cardList .audio1 > img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 5px;
}
.cardList .audio1 span {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.cardList .message {
  flex-grow: 1;
}
.message > div {
  margin: 0;
  padding: 0;
}
.message .title {
  font-size: 14px;
  color: black;
}
.message .intro{
  max-width: 60vw;
  overflow-x: hidden;
}
.message .intro,
.message .time {
  font-size: 13px;
  color: gray;
}
#Ascroll {
  padding-top: 10px;
}
</style>