<template>
  <div class="majForm">
    <el-dialog
      :title="formTitle"
      :visible.sync="majorFormVisible"
      :before-close="hanldeClose"
      @closed="reset"
      :modal-append-to-body="false"
      width="500px"
      top="0"
    >
      <el-form :model="majorForm" status-icon :rules="rules" ref="majorForm" label-width="100px">
        <el-form-item label="专业名称" prop="major_name">
          <el-input v-model="majorForm.major_name"></el-input>
        </el-form-item>
        <el-form-item label="专业学制" prop="major_year">
          <el-select v-model="majorForm.major_year" placeholder="请选择">
            <el-option label="4年" :value="4" :class="{selected: majorForm.major_year == 4}"></el-option>
            <el-option label="3年" :value="3" :class="{selected: majorForm.major_year == 3}"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业院系" prop="department_id">
          <el-select v-model="majorForm.department_id" placeholder="请选择">
            <el-option
              v-for="item in deptList"
              :key="item.department_id"
              :label="item.department_name"
              :value="item.department_id"
              :class="{selected: majorForm.department_id == item.department_id}"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业介绍" prop="major_detail">
          <el-input
            type="textarea"
            v-model="majorForm.major_detail"
            :rows="8"
            maxlength="300"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.stop="submitForm('majorForm')">提交</el-button>
          <el-button v-if="formTitle=='添加'" @click.stop="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  props: ["majorFormVisible", "majorForm", "formTitle"],
  data() {
    return {
      rules: {
        major_name: [
          { required: true, message: "请输入专业名称", trigger: "blur" }
        ],
        major_year: [
          { required: true, message: "请选择专业学制", trigger: "blur" }
        ],
        department_id: [
          { required: true, message: "请选择专业院系", trigger: "blur" }
        ],
        major_detail: [
          { required: true, message: "请输入专业介绍", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.findDeptList({ page: 1, pageSize: 9999 });
  },
  computed: {
    ...mapState("department", ["deptList"]),
    ...mapState("loginUser", ["user"])
  },
  methods: {
    ...mapActions("major", ["addMajors", "updateMajor"]),
    ...mapActions("department", {
      findDeptList: "findByPage"
    }),
    hanldeClose() {
      this.$emit("close", false);
    },
    reset() {
      this.$refs.majorForm.resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (this.formTitle == "编辑") {
          this.updateMajor(this.majorForm).then(res => {
            this.$message({
              message: res.msg,
              type: "success",
              duration: 2000,
              center: true
            });
          });
        } else if (this.formTitle == "添加") {
          const arr = [{ ...this.majorForm, create_username: this.user.name }];
          this.addMajors(arr).then(res => {
            this.$message({
              message: res.msg,
              type: "success",
              duration: 2000,
              center: true
            });
          });
        }
        this.$emit("close", false);
      });
    }
  }
};
</script>
