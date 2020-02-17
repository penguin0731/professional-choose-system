<template>
  <div class="mesForm">
    <el-dialog
      title="添加"
      :visible.sync="addFormVisible"
      :before-close="hanldeClose"
      @closed="reset"
      :modal-append-to-body="false"
      width="500px"
      top="0"
    >
      <el-form :model="addForm" status-icon :rules="rules" ref="addForm" label-width="100px">
        <el-form-item label="开始时间" prop="start_time">
          <el-date-picker v-model="addForm.start_time" type="datetime" placeholder="选择开始时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="end_time">
          <el-date-picker v-model="addForm.end_time" type="datetime" placeholder="选择结束时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="年级" prop="grade_id">
          <el-select v-model="addForm.grade_id" placeholder="请选择">
            <el-option
              v-for="item in gradeList"
              :key="item.grade_id"
              :label="item.grade_name"
              :value="item.grade_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业" prop="major_id">
          <el-select v-model="addForm.major_id" placeholder="请选择">
            <el-option
              v-for="item in majorList"
              :key="item.major_id"
              :label="item.major_name"
              :value="item.major_id"
            ></el-option>
          </el-select>
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
    var self = this;
    var now = new Date();
    var validateStart = function(rule, value, callback) {
      if (value !== "") {
        if (self.addForm.end_time !== "") {
          self.$refs.addForm.validateField("end_time");
        }
        callback();
      }
    };
    var validateEnd = function(rule, value, callback) {
      if (value !== "" && value < self.addForm.start_time) {
        callback(new Error("结束时间不得早于开始时间"));
      }else if(value < now) {
        callback(new Error("结束时间不得早于当前时间"));
      }else {
        callback();
      }
    };
    return {
      rules: {
        start_time: [
          { required: true, message: "请选择开始时间", trigger: "blur" },
          { validator: validateStart, trigger: "blur" }
        ],
        end_time: [
          { required: true, message: "请选择结束时间", trigger: "blur" },
          { validator: validateEnd, trigger: "blur" }
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
    ...mapActions("task", ["addTask"]),
    hanldeClose() {
      this.$emit("show", false);
    },
    reset() {
      this.$refs.addForm.resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) return;
        const formData = {
          ...this.addForm,
          start_time: new Date(this.addForm.start_time).format(
            "yyyy-MM-dd hh:mm:ss"
          ),
          end_time: new Date(this.addForm.end_time).format(
            "yyyy-MM-dd hh:mm:ss"
          ),
          create_time: new Date().format("yyyy-MM-dd hh:mm:ss"),
          operation_username: this.user.name
        };
        this.addTask(formData).then(res => {
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
