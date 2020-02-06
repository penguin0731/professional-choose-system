<template>
  <div class="mesForm">
    <el-dialog
      title="选报方向"
      :visible.sync="chooseFormVisible"
      :before-close="hanldeClose"
      :modal-append-to-body="false"
      width="500px"
      top="0"
    >
      <el-form :model="chooseForm" status-icon :rules="rules" ref="chooseForm" label-width="100px">
        <el-form-item label="专业方向" prop="direction_id">
          <el-select v-model="chooseForm.direction_id" placeholder="请选择">
            <el-option label="移动开发" :value="1"></el-option>
            <el-option label="游戏开发" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.stop="submitForm('chooseForm')">选择方向</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["chooseFormVisible"],
  data() {
    return {
      chooseForm: {
        task_id: "",
        login_id: "",
        direction_id: "",
        selected_time: ""
      },
      rules: {
        direction_name: [
          { required: true, message: "请选择专业方向", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    hanldeClose() {
      this.$emit("show", false);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) return;
        const selected_time = new this.$myDate().format("yyyy-MM-dd hh:mm:ss");
        console.log(valid);
        this.chooseForm = {
          ...this.chooseForm,
          selected_time
        };
        console.log(this.chooseForm);
      });
    }
  }
};
</script>
