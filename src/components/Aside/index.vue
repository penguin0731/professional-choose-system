<template>
  <div class="m-aside">
    <div class="menu">
      <transition>
        <span v-if="!isCollapse" class="title">导航菜单</span>
      </transition>
      <span class="menu-btn" @click="show">
        <i :class="icon"></i>
      </span>
    </div>
    <el-menu
      :default-active="editableTabsValue"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      :unique-opened="true"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>系统管理</span>
        </template>
        <el-menu-item
          v-for="item in systemManage"
          :key="item.index"
          :index="item.index"
          @click="setTab(item)"
        >
          <i :class="item.icon"></i>
          <template>{{ item.label }}</template>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-tickets"></i>
          <span>信息查询</span>
        </template>
        <el-menu-item
          v-for="item in searchMsgArr"
          :key="item.index"
          :index="item.index"
          @click="item.label == '修改密码'? PwdFormVisible = true : setTab(item)"
        >
          <i :class="item.icon"></i>
          <template>{{ item.label }}</template>
        </el-menu-item>
      </el-submenu>
    </el-menu>
    <change-pwd :PwdFormVisible="PwdFormVisible" @click="changePwdFormVisible" />
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import changePwd from "@/components/Main/changePwd";
export default {
  components: {
    changePwd
  },
  data() {
    return {
      // 系统管理
      systemManage: [
        {
          label: "学生管理",
          name: "student",
          icon: "el-icon-user",
          index: "student"
        },
        {
          label: "教职工管理",
          name: "teacher",
          icon: "el-icon-s-custom",
          index: "teacher"
        },
        {
          label: "专业管理",
          name: "major",
          icon: "el-icon-collection",
          index: "major"
        },
        {
          label: "方向选报任务管理",
          name: "professional-task",
          icon: "el-icon-document-checked",
          index: "professional-task"
        },
        {
          label: "年级管理",
          name: "grade",
          icon: "el-icon-document-copy",
          index: "grade"
        },
        {
          label: "院系管理",
          name: "department",
          icon: "el-icon-office-building",
          index: "department"
        },
        {
          label: "角色管理",
          name: "role",
          icon: "el-icon-collection-tag",
          index: "role"
        },
        {
          label: "公告管理",
          name: "message",
          icon: "el-icon-chat-round",
          index: "message"
        }
      ],
      // 信息查询
      searchMsgArr: [
        {
          label: "修改密码",
          name: "change-pwd",
          icon: "el-icon-lock",
          index: "change-pwd"
        },
        {
          label: "个人信息",
          name: "person-msg",
          icon: "el-icon-view",
          index: "person-msg"
        },
        {
          label: "选报方向",
          name: "choose-direction",
          icon: "el-icon-edit-outline",
          index: "choose-direction"
        }
      ],
      isCollapse: false,
      icon: "el-icon-d-arrow-left",
      PwdFormVisible: false
    };
  },
  computed: {
    editableTabsValue: {
      get() {
        return this.$store.state.tabs.editableTabsValue;
      },
      set(val) {
        // this.$store.dispatch('setTab', val);
      }
    }
  },
  methods: {
    ...mapMutations('tabs', ["setTab"]),
    show() {
      if (this.isCollapse) {
        this.isCollapse = false;
        this.icon = "el-icon-d-arrow-left";
      } else {
        this.isCollapse = true;
        this.icon = "el-icon-d-arrow-right";
      }
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    changePwdFormVisible(isShow) {
      this.PwdFormVisible = isShow;
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/index/aside.scss";
</style>