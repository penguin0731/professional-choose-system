<template>
  <div class="stuForm">
    <el-dialog
      :title="formTitle"
      :visible.sync="editFormVisible"
      :before-close="hanldeClose"
      :modal-append-to-body="false"
      width="500px"
      top="0"
    >
      <el-form :model="editForm" status-icon :rules="rules" ref="editForm" label-width="100px">
        <el-form-item label="学号" prop="login_id">
          <el-input v-model="editForm.login_id" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="editForm.name" :disabled="isDisabled"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="editForm.gender" placeholder="请选择" :disabled="isDisabled">
            <el-option label="男" :value="0" :class="{selected: editForm.gender == '男'}"></el-option>
            <el-option label="女" :value="1" :class="{selected: editForm.gender == '女'}"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年级" prop="grade_id">
          <el-select v-model="editForm.grade_id" placeholder="请选择" :disabled="isDisabled">
            <el-option
              v-for="item in gradeList"
              :key="item.grade_id"
              :label="item.grade_name"
              :value="item.grade_id"
              :class="{selected: editForm.grade_id == item.grade_id}"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业" prop="major_id">
          <el-select v-model="editForm.major_id" placeholder="请选择" :disabled="isDisabled">
            <el-option
              v-for="item in majorList"
              :key="item.major_id"
              :label="item.major_name"
              :value="item.major_id"
              :class="{selected: editForm.major_id == item.major_id}"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级" prop="classes">
          <el-input v-model="editForm.classes" :disabled="isDisabled"></el-input>
        </el-form-item>
        <el-form-item label="学籍状态" prop="student_status">
          <el-select v-model="editForm.student_status" placeholder="请选择" :disabled="isDisabled">
            <el-option
              v-for="item in studentStatusArr"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :class="{selected: editForm.student_status == item.label}"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学生状态" prop="person_status">
          <el-select v-model="editForm.person_status" placeholder="请选择" :disabled="isDisabled">
            <el-option
              v-for="item in personStatusArr"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :class="{selected: editForm.person_status == item.label}"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="!isDisabled">
          <el-button type="primary" @click.stop="submitForm('editForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  props: ["editFormVisible", "editForm", "isDisabled", "formTitle"],
  data() {
    return {
      studentStatusArr: [
        {
          label: "无学籍",
          value: 0
        },
        {
          label: "有学籍",
          value: 1
        }
      ],
      personStatusArr: [
        {
          label: "毕业",
          value: 0
        },
        {
          label: "在读",
          value: 1
        },
        {
          label: "休学",
          value: 2
        },
        {
          label: "退学",
          value: 3
        }
      ],
      rules: {
        login_id: [{ required: true, message: "请输入学号", trigger: "blur" }],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        gender: [{ required: true, message: "请选择性别", trigger: "change" }],
        grade_id: [
          { required: true, message: "请选择年级", trigger: "change" }
        ],
        major_id: [
          { required: true, message: "请选择专业", trigger: "change" }
        ],
        classes: [{ required: true, message: "请输入班级", trigger: "blur" }],
        student_status: [
          { required: true, message: "请选择学籍状态", trigger: "change" }
        ],
        person_status: [
          { required: true, message: "请选择学生状态", trigger: "change" }
        ]
      }
    };
  },
  computed: {
    ...mapState("grade", ["gradeList"]),
    ...mapState("major", ["majorList"])
  },
  methods: {
    ...mapActions("student", ["updateStudent"]),
    hanldeClose() {
      this.$emit("close", false);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) return;
        const {
          login_id,
          name,
          gender,
          phone,
          email,
          grade_id,
          major_id,
          student_status,
          person_status
        } = this.editForm;
        const params = {
          login_id,
          name,
          gender,
          phone,
          email,
          grade_id,
          major_id,
          student_status,
          person_status
        };
        console.log(params);
        this.updateStudent(params).then(res => {
          this.$message({
            message: res.msg,
            type: "success",
            duration: 2000,
            center: true
          });
        });
        this.$emit("close", false);
      });
    }
  }
};
</script>
