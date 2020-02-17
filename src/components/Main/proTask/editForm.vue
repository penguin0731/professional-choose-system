<template>
  <div class="mesForm">
    <el-dialog
      title="编辑"
      :visible.sync="editFormVisible"
      :before-close="hanldeClose"
      :modal-append-to-body="false"
      width="500px"
      top="0"
    >
      <el-form :model="editForm" status-icon :rules="rules" ref="editForm" label-width="100px">
        <el-form-item label="开始时间" prop="start_time">
          <el-date-picker v-model="editForm.start_time" type="datetime" placeholder="选择开始时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="end_time">
          <el-date-picker v-model="editForm.end_time" type="datetime" placeholder="选择结束时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="年级" prop="grade_id">
          <el-select v-model="editForm.grade_id" placeholder="请选择">
            <el-option
              v-for="item in gradeList"
              :key="item.grade_id"
              :label="item.grade_name"
              :value="item.grade_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业" prop="major_id">
          <el-select v-model="editForm.major_id" placeholder="请选择">
            <el-option
              v-for="item in majorList"
              :key="item.major_id"
              :label="item.major_name"
              :value="item.major_id"
            ></el-option>
          </el-select>
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
        start_time: [
          { required: true, message: "请选择开始时间", trigger: "blur" }
        ],
        end_time: [
          { required: true, message: "请选择结束时间", trigger: "blur" }
        ],
        grade_id: [{ required: true, message: "请选择年级", trigger: "blur" }],
        major_id: [{ required: true, message: "请选择专业", trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapState("grade", ["gradeList"]),
    ...mapState("major", ["majorList"]),
    ...mapState("loginUser", ["user"])
  },
  methods: {
    ...mapActions("task", ["updateTask"]),
    hanldeClose() {
      this.$emit("close", false);
    },
    async submitForm(formName) {
      const update_time = new Date().format("yyyy-MM-dd hh:mm:ss");
      this.$refs[formName].validate(valid => {
        if (!valid) return;
        const {
          task_id,
          start_time,
          end_time,
          grade_id,
          major_id
        } = this.editForm;
        const form = {
          start_time: new Date(start_time).format("yyyy-MM-dd hh:mm:ss"),
          end_time: new Date(end_time).format("yyyy-MM-dd hh:mm:ss"),
          task_id,
          grade_id,
          major_id,
          update_time,
          operation_username: this.user.name
        };
        this.updateTask(form).then(res => {
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
