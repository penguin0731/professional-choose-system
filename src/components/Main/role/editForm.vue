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
        <el-form-item label="角色名称" prop="role_name">
          <el-input v-model="editForm.role_name"></el-input>
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
        role_name: [
          { required: true, message: "请输入角色名称", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
      ...mapState("role", ["currentPage", "pageSize"]),
  },
  methods: {
      ...mapActions("role", ["findByPage", "updateRole"]),
    handleClose() {
      this.$emit("close", false);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) return;
        this.updateRole(this.editForm);
        this.$emit("close", false);
        this.findByPage({ page: this.currentPage, pageSize: this.pageSize });
      });
    }
  }
};
</script>
