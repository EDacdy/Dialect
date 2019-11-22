<!--  -->
<template>
  <div>
    <div class="logo">
      <img src="../assets/logo1.png" @click="reload" />
    </div>
    <div class="myForm" id="myForm"></div>
  </div>
</template>

<script>
import { ConversationalForm } from "conversational-form";
export default {
  data() {
    return {
      regValue: null,
      email: null,
      value: null,
      formFields: [
        {
          tag: "fieldset",
          "cf-input-placeholder": "点击头像可回溯表单",
          "cf-questions":
            "你好&&欢迎来到乡音塾的登录/注册页面,马上体验我们的个性化操作吧",
          children: [
            {
              tag: "input",
              type: "radio",
              name: "intro",
              value: "1",
              "cf-label": "登录"
            },
            {
              tag: "input",
              type: "radio",
              name: "intro",
              value: "2",
              "cf-label": "注册"
            }
          ]
        },
        {
          tag: "fieldset",
          children: [
            {
              tag: "input",
              type: "text",
              name: "username",
              required: "required",
              "cf-error": "输入不能为空",
              "cf-conditional-intro": "1", //登录value 1
              "cf-questions": "请输入您的用户名",
              "cf-input-placeholder": "用户名或邮箱"
            },
            {
              tag: "input",
              type: "password",
              name: "password",
              required: "required",
              "cf-questions": " 请输入您的密码",
              "cf-input-placeholder": "密码",
              "cf-error": "密码不能为空",
              "cf-conditional-intro": "1" //登录value 1
            }
          ]
        },
        {
          tag: "fieldset",
          children: [
            {
              tag: "input",
              type: "email",
              name: "email",
              "cf-conditional-intro": "2",
              "cf-questions": "请输入注册邮箱",
              "cf-input-placeholder": "绑定后可用于登录和找回账户",
              "cf-error": "请输入正确的邮箱格式",
              required: "required"
            },
            {
              tag: "input",
              type: "text",
              name: "username",
              pattern: ".{3,10}",
              "cf-conditional-intro": "2",
              "cf-questions": "请输入用户名",
              "cf-input-placeholder": "不少于两个字符",
              "cf-error": "输入不能为空",
              required: "required"
            },
            {
              tag: "input",
              type: "password",
              name: "password",
              required: "required",
              "cf-error": "密码不能为空",
              "cf-conditional-intro": "2",
              "cf-questions": " 请输入您的密码"
            },
            {
              tag: "input",
              type: "password",
              name: "password",
              required: "required",
              "cf-error": "密码不能为空",
              "cf-conditional-intro": "2",
              "cf-questions": " 再次输入您的密码"
            }
          ]
        }
      ]
    };
  },
  methods: {
    reload() {
      window.location.reload();
    },
    setupForm() {
      this.cf = ConversationalForm.startTheConversation({
        options: {
          submitCallback: this.submitCallback,
          flowStepCallback: this.flowStepCallback,
          //防止自动对焦
          preventAutoFocus: false,
          animationsEnabled: true
          // formEl: document.getElementById("myForm"),
        },
        tags: this.formFields
      });
      this.$el.appendChild(this.cf.el);
      // this.cf.tags[0].elements[0].domElement.checked=false;
      // console.log( this.cf.tags[0].elements[0].domElement.checked);
    },
    flowStepCallback: function(dto, success, error) {
      var currentStep = this.cf.flowManager.getStep() + 1; // Steps are 0-based so we add 1
      var maxSteps = this.cf.flowManager.maxSteps; // This value is not 0-based
      var ga_action = "Step " + currentStep + "/" + maxSteps;
      var ga_label = dto.tag.name; // We only track actual field name for reference purpose. If you want to track the actual value you may do so.
      console.log(ga_action+" "+ga_label+" "+dto.tag.value[0]);
      if (dto.tag.value[0] === "2") {
        this.regValue = dto.tag.value[0];
        success();
      }else if (dto.tag.value[0] === "1") {
        this.regValue = dto.tag.value[0];
        // console.log(this.regValue);
        success();
      }
       else if (this.regValue == "2" && dto.tag.name == "email") {
        var data = new FormData();
        data.append("email", dto.tag.value);
        console.log(dto.tag.value);
        this.axios
          .post("/checkemail", data)
          .then(res => {
            if (res.data.data == true) {
              error();
              this.cf.addRobotChatResponse("该邮箱已被注册");
            } else {
              success();
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else if (this.regValue == "2" && dto.tag.name == "username") {
        var data = new FormData();
        data.append("username", dto.tag.value);
        console.log(dto.tag.value);
        this.axios
          .post("/checkusername", data)
          .then(res => {
            console.log(res);
            if (res.data.data == true) {
              error();
              this.cf.addRobotChatResponse("该用户名已存在");
            } else {
              success();
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        success();
      }
    },
    submitCallback() {
      var formDataSerialized = this.cf.getFormData(true);
      console.log("Formdata, obj:", formDataSerialized);
      this.cf.addRobotChatResponse("正在校验用户信息,稍后为您自动跳转!");

      //FromData方式提交
      // let data = {
      //   account: formDataSerialized.username,
      //   password: formDataSerialized.password
      // };
      //对数据进行格式化，将原本默认的contenttype变为x-www-form-urlencoded
      // let param = new URLSearchParams(data);

      //(formDataSerialized.intro[0] === "1"代表登录表单
      if (formDataSerialized.intro[0] === "1") {
        var data = new FormData();
        data.append("account", formDataSerialized.username);
        data.append("password", formDataSerialized.password);
        this.axios
          .post("/login", data)
          .then(res => {
            console.log(res);
            console.log(res.data.status);
            let that = this;
            if (res.data.status == "200") {
              //验证成功将信息存入本地localStorage
              var userData = res.data.data;
              var tmpUser = JSON.stringify(userData);
              localStorage.setItem("user", tmpUser);
              this.cf.addRobotChatResponse("登录成功,即将转到首页");
              setTimeout(function() {
                that.$router.push({ path: "/index" });
              }, 2000);
            } else if (res.data.status == "201") {
              this.cf.addRobotChatResponse("用户名不存在!");
              this.cf.addRobotChatResponse("即将为您回溯至用户名输入框");
              setTimeout(function() {
                that.cf.remapTagsAndStartFrom(1);
              }, 2000);
            } else if (res.data.status == "202") {
              this.cf.addRobotChatResponse("密码错误!");
              this.cf.addRobotChatResponse("即将为您回溯至密码输入框");
              setTimeout(function() {
                that.cf.remapTagsAndStartFrom(2);
              }, 2000);
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else if (formDataSerialized.intro[0] === "2") {
        var data = new FormData();
        data.append("email", formDataSerialized.email);
        data.append("username", formDataSerialized.username);
        data.append("password", formDataSerialized.password);
        this.axios
          .post("/register",data)
          .then(res => {
            console.log(res);
            let that = this;
            if (res.data.status == "200") {
              //注册成功将信息存入本地localStorage
              var userData = res.data.data;
              var tmpUser = JSON.stringify(userData);
              localStorage.setItem("user", tmpUser);
              this.cf.addRobotChatResponse("注册成功,即将转到首页");
              setTimeout(function() {
                that.$router.push({ path: "/index" });
              }, 1500);
            } else if (res.data.status == "201") {
              this.cf.addRobotChatResponse("用户名或邮箱已存在!");
              this.cf.addRobotChatResponse("即将为您回溯至账号输入框");
              setTimeout(function() {
                that.cf.remapTagsAndStartFrom(1);
              }, 2500);
            } else if (res.data.status == "202") {
              this.cf.addRobotChatResponse("用户名包含非法字符!");
              this.cf.addRobotChatResponse("即将为您回溯至账号输入框");
              setTimeout(function() {
                that.cf.remapTagsAndStartFrom(2);
              }, 2500);
            } else if (res.data.status == "203") {
              this.cf.addRobotChatResponse("密码长度不符合要求!");
              this.cf.addRobotChatResponse("即将为您回溯至密码输入框");
              setTimeout(function() {
                that.cf.remapTagsAndStartFrom(3);
              }, 2500);
            } else if (res.data.status == "204") {
              this.cf.addRobotChatResponse("邮箱格式错误!");
              this.cf.addRobotChatResponse("即将为您回溯至邮箱输入框");
              setTimeout(function() {
                that.cf.remapTagsAndStartFrom(1);
              }, 2500);
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    }

  },
  mounted() {
    this.setupForm();
  },
  deactivated() {
    //销毁实例，防止缓存
    this.$destroy(true);
  }
};
</script>

<style scoped lang="scss">
.logo {
  background-color: white;
  position: absolute;
  z-index: 1999;
  width: 100vw;
  animation: topIn 1s ease;
}
.logo img {
  max-width: 30%;
}
@keyframes topIn {
  from {
    transform: translateY(-50px);
    opacity: 0;
  }
  to {
    transform: translateY(0px);
    opacity: 1;
  }
}
.myForm {
  position: relative;
  height: 100vh;
  width: 100%;
}
::v-deep cf-chat-response text > p:not(:only-child):first-child {
  float: left;
}
cf-chat-response text > p:not(:only-child):not(:first-child) {
  float: left;
}
// ::v-deep cf-chat-response text > p:not(:only-child):last-child {
//   float: left;
// }
form {
  height: 100vh;
}
body {
  height: 100%;
  background: white;
  padding-top: 110px;
}
#cf-context {
  height: 620px;
  width: 480px;
  margin: auto;
  border: 1px solid #999;
  box-sizing: border-box;
}
</style>