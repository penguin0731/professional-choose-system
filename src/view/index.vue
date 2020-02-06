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
export default {
  components: {
    myAside,
    myHeader,
    myMain
  }
};
</script>

