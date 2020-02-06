<template>
  <div class="personMsg">
    <div>
      <el-input :placeholder="personMsg.sNo" :disabled="true">
        <template slot="prepend">{{'学号'}}</template>
      </el-input>
    </div>
    <div>
      <el-input :placeholder="personMsg.name" :disabled="true">
        <template slot="prepend">{{'姓名'}}</template>
      </el-input>
    </div>
    <div>
      <el-input :placeholder="personMsg.sex == 0 ? '女' : '男'" :disabled="true">
        <template slot="prepend">{{'性别'}}</template>
      </el-input>
    </div>
    <div>
      <el-input :placeholder="personMsg.phone" :disabled="true">
        <template slot="prepend">{{'联系电话'}}</template>
      </el-input>
    </div>
    <div>
      <el-input :placeholder="personMsg.grade" :disabled="true">
        <template slot="prepend">{{'年级'}}</template>
      </el-input>
    </div>
    <div>
      <el-input :placeholder="personMsg.department" :disabled="true">
        <template slot="prepend">{{'院系名称'}}</template>
      </el-input>
    </div>
    <div>
      <el-input :placeholder="personMsg.major" :disabled="true">
        <template slot="prepend">{{'专业'}}</template>
      </el-input>
    </div>
    <div>
      <el-input :placeholder="personMsg.class" :disabled="true">
        <template slot="prepend">{{'班级'}}</template>
      </el-input>
    </div>
    <div>
      <el-input :placeholder="personMsg.student_state" :disabled="true">
        <template slot="prepend">{{'学生状态'}}</template>
      </el-input>
    </div>
    <div>
      <el-input :placeholder="personMsg.student_status" :disabled="true">
        <template slot="prepend">{{'学籍状态'}}</template>
      </el-input>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      personMsg: {
        sNo: "16210120629",
        name: "张三",
        sex: 1,
        phone: "17765602401",
        grade: "2016级",
        department: "计算机学院",
        major: "软件工程",
        class: "1班",
        student_state: "在读",
        student_status: "有学籍"
      }
    };
  }
};
</script>

<style scope>
.el-input-group__prepend {
    color: #409EFF;
    width: 57px;
    text-align: center;
}
</style>