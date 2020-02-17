<template>
  <div class="personMsg">
    <div>
      <el-input :value="user.login_id" :disabled="true">
        <template slot="prepend">{{user.role_id==1 ? '学号' : '工号'}}</template>
      </el-input>
    </div>
    <div>
      <el-input :value="user.name" :disabled="true">
        <template slot="prepend">{{'姓名'}}</template>
      </el-input>
    </div>
    <div>
      <el-input :value="user.gender == 0 ? '男' : '女'" :disabled="true">
        <template slot="prepend">{{'性别'}}</template>
      </el-input>
    </div>
    <div>
      <el-input :value="user.phone" :disabled="true">
        <template slot="prepend">{{'联系电话'}}</template>
      </el-input>
    </div>
    <div>
      <el-input v-if="user.role_id==1" :value="user.grade_name" :disabled="true">
        <template slot="prepend">{{'年级'}}</template>
      </el-input>
    </div>
    <div>
      <el-input v-if="user.role_id!=1" :value="user.department_name" :disabled="true">
        <template slot="prepend">{{'所属院系'}}</template>
      </el-input>
    </div>
    <div>
      <el-input v-if="user.role_id==1" :value="user.major_name" :disabled="true">
        <template slot="prepend">{{'专业'}}</template>
      </el-input>
    </div>
    <div>
      <el-input v-if="user.role_id==1" :value="user.classes" :disabled="true">
        <template slot="prepend">{{'班级'}}</template>
      </el-input>
    </div>
    <div>
      <el-input
        v-if="user.role_id==1"
        :value="user.student_status == 0 ? '无学籍' : '有学籍'"
        :disabled="true"
      >
        <template slot="prepend">{{'学籍状态'}}</template>
      </el-input>
    </div>
    <div>
      <el-input
        :value="user.role_id == 1 ? user.person_status == 0 ? '毕业' : user.person_status == 1 ? '在读' : user.person_status == 2 ? '休学' : '退学' : user.person_status == 0 ? '离职' : '在职'"
        :disabled="true"
      >
        <template slot="prepend">{{'状态'}}</template>
      </el-input>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("loginUser", ["user"])
  }
};
</script>

<style scope>
.el-input-group__prepend {
  color: #409eff;
  width: 57px;
  text-align: center;
}
</style>