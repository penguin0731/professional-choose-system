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
      :collapse="isCollapse"
      :unique-opened="true"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>系统管理</span>
        </template>
        <template v-for="item in systemManage">
          <el-menu-item
            v-if="item.isShow"
            :key="item.index"
            :index="item.index"
            @click="setTab(item)"
          >
            <i :class="item.icon"></i>
            <template>{{ item.label }}</template>
          </el-menu-item>
        </template>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-tickets"></i>
          <span>信息查询</span>
        </template>
        <template v-for="item in searchMsgArr">
          <el-menu-item
            v-if="item.isShow"
            :key="item.index"
            :index="item.index"
            @click="item.label == '修改密码'? PwdFormVisible = true : setTab(item)"
          >
            <i :class="item.icon"></i>
            <template>{{ item.label }}</template>
          </el-menu-item>
        </template>
      </el-submenu>
    </el-menu>
    <change-pwd :PwdFormVisible="PwdFormVisible" @click="changePwdFormVisible" />
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import changePwd from "@/components/Main/changePwd";
export default {
  components: {
    changePwd
  },
  data() {
    return {
      // 信息查询
      isCollapse: false,
      icon: "el-icon-d-arrow-left",
      PwdFormVisible: false
    };
  },
  computed: {
    ...mapState("loginUser", ["user"]),
    ...mapState("role", ["showModuleList"]),
    // 系统管理
    systemManage() {
      let arr = [
        {
          label: "学生管理",
          name: "student",
          icon: "el-icon-user",
          index: "student",
          isShow: true
        },
        {
          label: "教职工管理",
          name: "teacher",
          icon: "el-icon-s-custom",
          index: "teacher",
          isShow: true
        },
        {
          label: "专业管理",
          name: "major",
          icon: "el-icon-collection",
          index: "major",
          isShow: true
        },
        {
          label: "方向选报任务管理",
          name: "professional-task",
          icon: "el-icon-document-checked",
          index: "professional-task",
          isShow: true
        },
        {
          label: "年级管理",
          name: "grade",
          icon: "el-icon-document-copy",
          index: "grade",
          isShow: true
        },
        {
          label: "院系管理",
          name: "department",
          icon: "el-icon-office-building",
          index: "department",
          isShow: true
        },
        {
          label: "角色管理",
          name: "role",
          icon: "el-icon-collection-tag",
          index: "role",
          isShow: true
        },
        {
          label: "公告管理",
          name: "message",
          icon: "el-icon-chat-round",
          index: "message",
          isShow: true
        }
      ];
      if (!this.showModuleList) return;
      arr.forEach(item => {
        item.isShow = this.showModuleList.some(i => i.name == item.label);
      });
      return arr;
    },
    // 信息查询
    searchMsgArr() {
      let arr = [
        {
          label: "修改密码",
          name: "change-pwd",
          icon: "el-icon-lock",
          index: "change-pwd",
          isShow: true
        },
        {
          label: "个人信息",
          name: "person-msg",
          icon: "el-icon-view",
          index: "person-msg",
          isShow: true
        },
        {
          label: "选报方向",
          name: "choose-direction",
          icon: "el-icon-edit-outline",
          index: "choose-direction",
          isShow: true
        }
      ];
      if (!this.showModuleList) return;
      arr.forEach(item => {
        if (item.label == "修改密码") return;
        if (item.label == "个人信息" && this.user.role_id == 2) {
          item.isShow = false;
        }
        if (item.label == "选报方向") {
          item.isShow = this.showModuleList.some(i => i.name == item.label);
        }
      });
      return arr;
    },
    editableTabsValue: {
      get() {
        return this.$store.state.tabs.editableTabsValue;
      },
      set(val) {}
    }
  },
  methods: {
    ...mapMutations("tabs", ["setTab"]),
    show() {
      if (this.isCollapse) {
        this.isCollapse = false;
        this.icon = "el-icon-d-arrow-left";
      } else {
        this.isCollapse = true;
        this.icon = "el-icon-d-arrow-right";
      }
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