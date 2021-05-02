<template>
  <div class="login-container">
    <div class="login-head"><h2>黑马头条号</h2></div>
    <!-- 配置 Form 表单验证：
        1.必须给el-form组件绑定model为表单数据对象 :model="user" //动态绑定v-bind
        2.给需要验证的表单项el-form-item绑定prop属性，prop的值为表单数据中的字段 prop="mobile"
          注意：prop属性需要指定表单对象中的数据名称
        3.通过el-form组件的rules属性配置验证规则 :rules="fotmRules"

        手动触发表单验证：
        1.给el-form设置ref起个名字
        2.通过ref获取el-form组件，调用组件的validate方法进行验证
     -->
    <el-form
      class="login-form"
      ref="login-form"
      :model="user"
      :rules="formRules"
    >
      <!-- v-model双向数据绑定：input中输入123，data的user.mobile中也显示123 -->
      <el-form-item prop="mobile">
        <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
      </el-form-item>
      <el-form-item prop="agree">
        <el-checkbox v-model="user.agree"
          >我已阅读并同意用户协议和隐私条款</el-checkbox
        >
      </el-form-item>
      <el-form-item>
        <el-button
          class="login-btn"
          type="primary"
          @click="onLogin"
          :loading="loginLoading"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import request from "@/utils/request";
// 加载封装好的login方法
import {login} from '@/api/user'
export default {
  name: "LoginIndex",
  data() {
    return {
      user: {
        mobile: "", //手机号
        code: "", //验证码
        agree: false, //是否同意协议
      },
      // checked: false, //是否同意协议的选中状态
      loginLoading: false, //登录的loading状态 //防止网络请求慢出现用户多次点击触发登录请求
      formRules: {
        //表单验证规则配置
        // 要验证的数据名称：规则列表[]
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          // 第一位是1，第二位是34789其中之一，后面9位任意
          {
            pattern: /^1[3|5|7|8|9]\d{9}$/,
            message: "请输入正确的号码格式",
            trigger: "blur",
          },
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          {
            pattern: /^\d{6}$/,
            message: "请输入正确的验证码格式",
            trigger: "blur",
          },
        ],
        // required校验的是数据是否有值，validator自定义校验规则-函数接收三个参数
        agree: [
          {
            // 自定义校验规则
            // 验证通过：callback()
            // 验证失败：callback(new Error('请再次输入密码'));
            validator: (rule, value, callback) => {
              console.log(value); //boolean
              if (value) {
                callback();
              } else {
                callback(new Error("请同意用户协议"));
              }
            },
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    onLogin() {
      // 获取表单数据(根据接口要求绑定数据)
      // const user = this.user;

      // 表单验证
      // validate方法是异步的
      this.$refs["login-form"].validate((valid) => {
        // console.log(valid) //boolean
        // 如果表单验证失败，停止请求提交
        if (!valid) {
          return;
        }
        // 验证通过，请求登录，调用login()方法
        this.login();
      });

      // 处理后端响应结果
      // 成功：xxx
      // 失败：xxx
    },

    login() {
      // 验证通过，提交登录
      this.loginLoading = true; //开启登录中loading
      // 对于代码中的请求操作
      // 1.接口请求可能需要重用
      // 2.实际工作中，接口非常容易变动，改起来麻烦，
      // 建议：把所有请求封装成函数然后统一的组织到模块中进行管理，这样做的好处：管理维护重用更方便
      login(this.user) //11.login()方法中的参数就是请求体中的this.user，
        .then((res) => {
          console.log(res);
          // 登录成功
          this.$message({
            message: "登录成功",
            type: "success",
          });

          this.loginLoading = false; //关闭登录中loading
        })
        .catch((err) => {
          console.log("登录失败！", err);
          // 登录失败
          this.$message.error("登录失败，手机号或验证码错误");
        });
    },
  },
};
</script>

<style lang="less" scoped>
.login-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex; //默认水平排列
  flex-direction: column; //设置垂直排列
  justify-content: center;
  align-items: center;
  background-color: #cfcfcf;
  .login-head {
    color: #409eff;
  }
  .login-form {
    background-color: #fff;
    padding: 50px;
    min-width: 300px;
  }
  .login-btn {
    width: 100%;
  }
}
</style>
