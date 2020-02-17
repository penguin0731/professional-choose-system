<template>
  <div class="login">
    <div class="login_box">
      <div class="login_logo"></div>
      <el-form :model="loginForm" :rules="rules" ref="loginForm" class="login_form">
        <el-form-item prop="login_id">
          <el-input
            v-model="loginForm.login_id"
            autocomplete="off"
            prefix-icon="el-icon-user"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            autocomplete="off"
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
            @keyup.enter.native="submitForm"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <span v-show="isLogin" style="color: #F56C6C">用户名或密码错误！</span>
          <el-button class="login_btn" type="primary" @click.stop="submitForm($event)" >登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import api from "@/api";
import { mapMutations, mapActions } from "vuex";
import md5 from "md5";
export default {
  data() {
    var validateUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    var checkPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      isLogin: false,
      loginForm: {
        login_id: "",
        password: ""
      },
      rules: {
        login_id: [{ validator: validateUser, trigger: "blur" }],
        password: [{ validator: checkPass, trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapMutations('loginUser', ['setUser']),
    ...mapActions('loginUser', ['queryUserByLoginId']),
    submitForm() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.queryUserByLoginId(this.loginForm).then(res => {
            if (md5(this.loginForm.password) === res[0].password) {
              this.isLogin = false;
              const user = JSON.stringify(res[0]);
              this.$cookies.set("loginUser", user, "0");
              this.$router.push({ path: "/" });
            } else {
              this.isLogin = true;
            }
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/login";
</style>