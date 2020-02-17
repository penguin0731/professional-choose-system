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
        <el-form-item label="标题" prop="message_title">
          <el-input
            v-model="addForm.message_title"
            autocomplete="off"
            maxlength="100"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="详情" prop="message_detail">
          <el-input
            type="textarea"
            v-model="addForm.message_detail"
            autocomplete="off"
            :rows="10"
            maxlength="300"
            show-word-limit
          ></el-input>
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
        message_title: [
          { required: true, message: "请输入标题", trigger: "blur" }
        ],
        message_detail: [
          { required: true, message: "请输入详情", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    ...mapState("loginUser", ["user"])
  },
  methods: {
    ...mapActions("message", ["addMessage"]),
    handleClose() {
      this.$emit("show", false);
    },
    reset() {
      this.$refs.addForm.resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) return;
        const data = {
          ...this.addForm,
          release_time: new Date().format("yyyy-MM-dd hh:mm:ss"),
          message_username: this.user.name
        };
        // console.log(data);
        this.addMessage(data).then(res => {
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
