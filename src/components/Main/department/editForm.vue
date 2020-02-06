<template>
  <div class="mesForm">
    <el-dialog
      title="编辑"
      :visible.sync="editFormVisible"
      :before-close="handleClose"
      :modal-append-to-body="false"
      width="500px"
      top="0"
    >
      <el-form :model="editForm" status-icon :rules="rules" ref="editForm" label-width="100px">
        <el-form-item label="院系名称" prop="department_name">
          <el-input v-model="editForm.department_name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.stop="submitForm('editForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  props: ["editFormVisible", "editForm"],
  data() {
    return {
      rules: {
        department_name: [
          { required: true, message: "请输入院系名称", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    ...mapState("department", ["currentPage", "pageSize"])
  },
  methods: {
    ...mapActions("department", ["findByPage", "updateDept"]),
    handleClose() {
      this.$emit("close", false);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) return;
        this.updateDept(this.editForm);
        this.$emit("close", false);
      });
    }
  }
};
</script>
