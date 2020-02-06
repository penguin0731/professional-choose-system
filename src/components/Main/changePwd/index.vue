<template>
  <div class="changePwd">
    <el-dialog title="修改密码" :visible.sync="PwdFormVisible" :before-close="hanldeClose" width="500px" top="0">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="旧密码" prop="oldPass">
          <el-input type="password" v-model="ruleForm.oldPass" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPass">
          <el-input type="password" v-model="ruleForm.newPass" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.stop="submitForm('ruleForm')">提交</el-button>
          <el-button @click.stop="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["PwdFormVisible"],
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入旧密码"));
      } else {
        console.log("验证旧密码");
        // callback()
      }
    };
    var validatePass1 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.newPass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        oldPass: "",
        newPass: "",
        checkPass: ""
      },
      rules: {
        oldPass: [{ validator: validatePass, trigger: "blur" }],
        newPass: [{ validator: validatePass1, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("修改成功");
          this.$refs[formName].resetFields();
          this.$emit("click", false);
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    hanldeClose() {
      this.$emit('click', false);
      this.$refs.ruleForm.resetFields();
    }
  }
};
</script>
