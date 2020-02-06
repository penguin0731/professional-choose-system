<template>
  <div class="stuForm">
    <el-dialog
      title="添加"
      :visible.sync="addFormVisible"
      :before-close="handleClose"
      @closed="reset"
      :modal-append-to-body="false"
      width="500px"
      top="0"
    >
      <el-form :model="addForm" status-icon :rules="rules" ref="addForm" label-width="100px">
        <el-form-item label="学号" prop="login_id">
          <el-input v-model="addForm.login_id"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="addForm.gender" placeholder="请选择">
            <el-option label="男" :value="0"></el-option>
            <el-option label="女" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="addForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="年级" prop="grade_id">
          <el-select v-model="addForm.grade_id" placeholder="请选择">
            <el-option
              v-for="item in gradeList"
              :key="item.grade_id"
              :label="item.grade_name"
              :value="item.grade_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业" prop="major_id">
          <el-select v-model="addForm.major_id" placeholder="请选择">
            <el-option
              v-for="item in majorList"
              :key="item.major_id"
              :label="item.major_name"
              :value="item.major_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级" prop="classes">
          <el-input v-model="addForm.classes"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.stop="submitForm('addForm')">提交</el-button>
          <el-button @click.stop="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  props: ["addFormVisible", "addForm"],
  data() {
    return {
      rules: {
        login_id: [{ required: true, message: '请输入学号', trigger: "blur" }],
        name: [{ required: true, message: '请输入姓名', trigger: "blur" }],
        phone: [{ required: false, message: '请输入联系电话', trigger: "blur" }],
        email: [{ required: false, message: '请输入邮箱', trigger: "blur" }],
        gender: [{ required: true, message: '请选择性别', trigger: "change" }],
        grade_id: [{ required: true, message: '请选择年级', trigger: "change" }],
        major_id: [{ required: true, message: '请输入选择专业', trigger: "change" }],
        classes: [{ required: true, message: '请输入班级', trigger: "blur" }],
      }
    };
  },
  computed: {
    ...mapState("grade", ["gradeList"]),
    ...mapState("major", ["majorList"])
  },
  methods: {
    ...mapActions("student", ["addStudents"]),
    handleClose() {
      this.$emit("show", false);
    },
    reset() {
      this.$refs.addForm.resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        const arr = [this.addForm];
        console.log(arr);
        this.addStudents(arr);
        this.handleClose();
      });
    }
  }
};
</script>
