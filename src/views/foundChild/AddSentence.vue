<!--  -->
<template>
  <div>
    <div style="padding-top:46px;">
      <NavBar>
        <div slot="left-screen" @click="onReturn">
          <img src="../../assets/return.png" />
          <span style="position:relative;top:-3px;">返回</span>
        </div>
        <div slot="title-screen">添加句子</div>
        <div slot="right-screen">
          <img src="../../assets/more.png" />
        </div>
      </NavBar>
    </div>
    <van-cell-group>
      <van-field v-model="title" clearable label="标题" placeholder="篇名或来源(不需要加《》)" autofocus />
      <van-field
        readonly
        clickable
        label="类别"
        :value="value"
        label-align="left"
        placeholder="选择句子类别"
        @click="showPicker = true"
      />

      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @cancel="showPicker = false"
          @confirm="onConfirm"
        />
      </van-popup>
      <van-field
        v-model="content"
        label="内容"
        type="textarea"
        placeholder="请输入内容(自动过滤空格)"
        rows="3"
        autosize
      />
    </van-cell-group>
    <van-button :disabled="disabled" type="info" size="normal" ref="submitbutton" @click="submit">提交</van-button>
  </div>
</template>

<script>
import NavBar from "@/components/base/NavBar.vue";
export default {
  data() {
    return {
      value: null,
      title: "",
      content: "",
      showPicker: false,
      columns: ["诗词", "日常", "俗语", "台词"]
    };
  },
  components: {
    NavBar
  },
  methods: {
    onReturn() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    onConfirm(value) {
      this.value = value;
      this.showPicker = false;
      console.log(value + this.value);
    },
    submit() {
      //添加语料句子
      var data = new FormData();
      data.append("title", this.title);
      data.append("type", this.value);
      data.append("content", this.content);
      data.append("id", JSON.parse(localStorage.getItem("user")).id);
      this.axios
        .post("/addSentence", data)
        .then(res => {
          console.log(res);
          this.$toast("提交成功，审核通过后将展示");
          this.$router.go(-1); //回到上级页面
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  watch: {
    content: function(val) {
      this.content = val.replace(/\s*/g, "");
    }
  },
  computed: {
    disabled: function() {
      console.log(!this.value + " " + !this.title + " " + !this.content);
      return this.value && this.title && this.content ? false : true;
    }
  },
   deactivated() {
    //销毁实例，防止缓存
    this.$destroy(true);
  }
};
</script>
<style scoped lang="scss">
::v-deep .van-cell {
  line-height: 40px;
  font-size: 15px;
}
::v-deep .van-button {
  width: 75%;
  margin-top: 20px;
}
::v-deep .van-field__control {
  max-height: 120px;
}
::v-deep .van-cell:not(:last-child)::after {
  right: 15px;
}
</style>
