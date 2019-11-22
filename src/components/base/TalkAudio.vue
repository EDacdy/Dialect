<!--  -->
<template>
  <div>
    <div class="audiobox">
      <audio
        ref="audio"
        @pause="onPause"
        @play="onPlay"
        @timeupdate="onTimeupdate"
        @loadedmetadata="onLoadedmetadata"
        :src="audio.url"
      ></audio>
      <div
        class="slider"
        ref="sliderWidth"
        :style="{width:this.audio.currentTime/this.audio.maxTime*100+'%'}"
      ></div>
      <div class="startbutton" @click="startPlayOrPause">
        <!-- <img src="../../assets/play.png" /> -->
        <img :src="audio.playing ? audio.active : audio.normal" />
      </div>
      <div class="animate" :class="{ 'animateplay': audio.playing}">
        <!-- <img src="../../assets/tiao.png" /> -->
      </div>
      <div class="time">{{(audio.maxTime-audio.currentTime)|formatTime}}</div>
      <!-- <div class="time">{{slider}}</div> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    toUrl: String
  },
  data() {
    return {
      audio: {
        url: this.toUrl,
        // 音频是否处于播放状态的属性
        playing: false,
        normal: require("../../assets/play.png"),
        active: require("../../assets/stopaudio.png"),
        // 音频当前播放时长
        currentTime: 0,
        // 音频最大播放时长
        maxTime: 0
      }
    };
  },
  methods: {
    startPlayOrPause() {
      return this.audio.playing ? this.pause() : this.play();
    },
    play() {
      this.$refs.audio.play();
    },
    // 暂停音频
    pause() {
      this.$refs.audio.pause();
    },
    onPlay(res) {
      console.log(res);
      this.audio.playing = true;
      let target = res.target;
      let audios = document.getElementsByTagName("audio");
      [...audios].forEach(item => {
        if (item !== target) {
          item.pause();
        }
      });
    },
    onPause() {
      this.audio.playing = false;
    },
    onTimeupdate(res) {
      this.audio.currentTime = res.target.currentTime;
      console.log(this.audio.currentTime);
    },
    // 当加载语音流元数据完成后，会触发该事件的回调函数
    // 语音元数据主要是语音的长度之类的数据
    onLoadedmetadata(res) {
      this.audio.maxTime = parseInt(res.target.duration);
    }
  },
  filters: {
    formatTime: function(second) {
      // var secondType = typeof second;
      // if (secondType === "number" || secondType === "string") {
      //   second = parseInt(second);
      //   var mimute = Math.floor(second / 60);
      //   second = second - mimute * 60;
      //   return ("0" + mimute).slice(-2) + ":" + ("0" + second).slice(-2);
      // } else {
      //   return "00:00";
      // }

      // return value;

      //  if (secondType === "number" || secondType === "string"){
      //  second = parseInt(second);
      second = Math.ceil(second);
      var mimute = Math.floor(second / 60);
      if (mimute < 1) {
        if (second < 10) {
          return second + "秒";
        } else {
          return ("0" + second).slice(-2) + "秒";
        }
      } else {
        second = second - mimute * 60;
        return mimute + "分" + ("0" + second).slice(-2) + "秒";
      }
      return value;
    }
  }
};
</script>

<style scoped lang="scss">
.audiobox {
  margin-top: 5px;
  width: 100%;
  height: 42px;
  padding-left: 25px;
  box-sizing: border-box;
  background-color: #d9d1d1;
  border-radius: 25px;
  -moz-border-radius: 25px;
  position: relative;
  overflow: hidden;
}
.slider {
  width: 1%;
  height: 42px;
  // padding-left: 45px;
  box-sizing: border-box;
  background-color: black;
  border-radius: 0 25px 25px 0;
  -moz-border-radius: 0 25px 25px 0;
  -webkit-border-radius: 0 25px 25px 0;
  position: absolute;
  z-index: 1;
  transition: width 0.5s;
  -moz-transition: width 0.5s; /* Firefox 4 */
  -webkit-transition: width 0.5s; /* Safari 和 Chrome */
  -o-transition: width 0.5s;
}
.startbutton {
  position: absolute;
  left: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #fefefe;
  z-index: 1;
  border: 5px black solid;
  cursor: pointer;
}
.startbutton img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.time {
  position: absolute;
  right: 15px;
  top: 12px;
  font-size: 14px;
  color: white;
  z-index: 2;
}
.animate {
  width: 65px;
  height: 35px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  background-image: url(../../assets/repeat11.png);
  background-repeat: repeat-x;
}
.animateplay {
  -webkit-animation: 1s changeColor infinite;
  animation: 1s changeColor infinite;
}
@-webkit-keyframes changeColor {
  0% {
    background-image: url(../../assets/repeat22.png);
    opacity: 0.9;
  }
  25% {
    background-image: url(../../assets/repeat11.png);
  }
  50% {
    background-image: url(../../assets/repeat22.png);
  }
  75% {
    background-image: url(../../assets/repeat11.png);
  }
  100% {
    background-image: url(../../assets/repeat22.png);
  }
}
</style>