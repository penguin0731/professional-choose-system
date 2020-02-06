<template>
  <div class="teachForm">
    <el-dialog
      title="修改"
      :visible.sync="editFormVisible"
      :before-close="hanldeClose"
      :modal-append-to-body="false"
      width="500px"
      top="0"
    >
      <el-form :model="editForm" status-icon :rules="rules" ref="editForm" label-width="100px">
        <el-form-item label="标题" prop="message_title">
          <el-input
            v-model="editForm.message_title"
            autocomplete="off"
            maxlength="100"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="详情" prop="message_detail">
          <el-input
            type="textarea"
            v-model="editForm.message_detail"
            autocomplete="off"
            :rows="10"
            maxlength="300"
            show-word-limit
          ></el-input>
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
        message_title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        message_detail: [{ required: true, message: "请输入详情", trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapActions("message", ["updateMessage"]),
    hanldeClose() {
      this.$emit("close", false);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        this.updateMessage(this.editForm);
        this.hanldeClose();
      });
    }
  }
};
</script>
