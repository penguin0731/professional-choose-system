<template>
  <div class="teachForm">
    <el-dialog
      title="编辑"
      :visible.sync="editFormVisible"
      :before-close="hanldeClose"
      :modal-append-to-body="false"
      width="500px"
      top="0"
    >
      <el-form :model="editForm" status-icon :rules="rules" ref="editForm" label-width="100px">
        <el-form-item label="年级名称" prop="grade_name">
          <el-input v-model="editForm.grade_name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.stop="submitForm('editForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["editFormVisible", "editForm"],
  data() {
    return {
      rules: {
        grade_name: [
          { required: true, message: "请输入年级名称", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    ...mapActions("grade", ["updateGrade"]),
    hanldeClose() {
      this.$emit("close", false);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) return;
        this.updateGrade(this.editForm).then(res => {
          this.$message({
            message: res.msg,
            type: "success",
            duration: 2000,
            center: true
          });
        });
        this.hanldeClose();
      });
    }
  }
};
</script>
