<template>
  <div class="mesForm">
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
        <el-form-item label="院系名称" prop="department_name">
          <el-input v-model="addForm.department_name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.stop="submitForm('addForm')">提交</el-button>
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
        department_name: [
          { required: true, message: "请输入院系名称", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    ...mapActions("department", ["addDept"]),
    handleClose() {
      this.$emit("show", false);
    },
    reset() {
      this.$refs.addForm.resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) return;
        this.addDept(this.addForm).then(res => {
          this.$message({
            message: res.msg,
            type: "success",
            duration: 2000,
            center: true
          });
        });
        this.handleClose();
      });
    }
  }
};
</script>
