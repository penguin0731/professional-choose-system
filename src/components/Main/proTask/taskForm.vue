<template>
  <div class="mesForm">
    <el-dialog
      title="添加"
      :visible.sync="taskFormVisible"
      :before-close="hanldeClose"
      :modal-append-to-body="false"
      width="500px"
      top="0"
    >
      <el-form :model="taskForm" status-icon :rules="rules" ref="taskForm" label-width="100px">
        <el-form-item label="开始时间" prop="start_time">
          <el-date-picker v-model="taskForm.start_time" type="datetime" placeholder="选择开始时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="end_time">
          <el-date-picker v-model="taskForm.end_time" type="datetime" placeholder="选择结束时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="年级" prop="grade">
          <el-select v-model="taskForm.grade" placeholder="请选择">
            <el-option label="2016级" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业" prop="major">
          <el-select v-model="taskForm.major" placeholder="请选择">
            <el-option label="软件工程" value="1"></el-option>
            <el-option label="网络工程" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.stop="submitForm('taskForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["taskFormVisible", "taskForm"],
  data() {
    return {
      rules: {
        start_time: [
          { required: true, message: "请选择开始时间", trigger: "blur" }
        ],
        end_time: [
          { required: true, message: "请选择结束时间", trigger: "blur" }
        ],
        grade: [{ required: true, message: "请选择年级", trigger: "blur" }],
        major: [{ required: true, message: "请选择专业", trigger: "blur" }]
      }
    };
  },
  methods: {
    hanldeClose() {
      this.$emit("show", false);
      this.$refs.taskForm.resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) return;
        console.log(valid);
        console.log(this.addForm);
      });
    }
  }
};
</script>
