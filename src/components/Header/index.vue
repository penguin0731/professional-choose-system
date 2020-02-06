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
import { mapState, mapMutations } from 'vuex'
export default {
  created() {
    const user = this.$cookies.get('loginUser');
    this.setUser(user);
  },
  computed: {
    ...mapState('loginUser', ['user'])
  },
  methods: {
    ...mapMutations('loginUser', ['setUser']),
    logout() {
      this.$router.push({name: 'Login'});
      this.$cookies.remove('loginUser');
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/index/header.scss";
</style>