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
        <el-form-item label="角色名称" prop="role_name">
          <el-input v-model="addForm.role_name"></el-input>
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
        role_name: [
          { required: true, message: "请输入角色名称", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    ...mapState("role", ["currentPage", "pageSize"])
  },
  methods: {
    ...mapActions("role", ["findByPage", "addRole"]),
    handleClose() {
      this.$emit("show", false);
    },
    reset() {
      this.$refs.addForm.resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) return;
        this.addRole(this.addForm);
        this.handleClose();
      });
    }
  }
};
</script>
