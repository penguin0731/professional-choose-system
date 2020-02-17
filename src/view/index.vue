<template>
  <el-container class="wrapper">
    <el-header>
      <my-header />
    </el-header>
    <el-container>
      <el-aside width="auto">
        <my-aside />
      </el-aside>
      <el-main>
        <my-main />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import myHeader from "@/components/Header";
import myAside from "@/components/Aside";
import myMain from "@/components/Main";
import { mapActions } from "vuex";
export default {
  components: {
    myAside,
    myHeader,
    myMain
  },
  mounted() {
    // 用户登录后进行的操场
    const { login_id, role_id } = this.$cookies.get("loginUser");
    // 查询登录用户的个人信息
    this.queryUserMsg({ login_id, role_id });
    // 查询登录用户权限所能操作的模块
    this.findLoginUserModule(role_id);
  },
  methods: {
    ...mapActions('loginUser', ['queryUserMsg']),
    ...mapActions('role', ['findLoginUserModule'])
  }
};
</script>

