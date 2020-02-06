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
        <el-form-item label="年级名称" prop="grade_name">
          <el-input v-model="addForm.grade_name"></el-input>
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
        grade_name: [
          { required: true, message: "请输入年级名称", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    ...mapState("grade", ["currentPage", "pageSize"])
  },
  methods: {
    ...mapActions("grade", ["findByPage", "addGrade"]),
    handleClose() {
      this.$emit("show", false);
    },
    reset() {
      this.$refs.addForm.resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) return;
        this.addGrade(this.addForm);
        this.handleClose();
      });
    }
  }
};
</script>
