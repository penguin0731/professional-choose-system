<template>
  <div class="m-header">
    <div id="logo"></div>
    <div id="loginUser">
      <span>{{`欢迎：${this.user.name}`}}</span>
      <el-button type="text" @click="logout">退出登录</el-button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  data() {
    return {
      user: ''
    }
  },
  created() {
    const user = this.$cookies.get('loginUser');
    this.user = user;
  },
  methods: {
    ...mapMutations("tabs", ["resetTab"]),
    logout() {
      this.$router.push({name: 'Login'});
      this.$cookies.remove('loginUser');
      this.resetTab();
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/index/header.scss";
</style>