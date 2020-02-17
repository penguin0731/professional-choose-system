<template>
  <div class="majForm">
    <el-dialog
      :title="formTitle"
      :visible.sync="directFormVisible"
      :before-close="hanldeClose"
      @closed="reset"
      :modal-append-to-body="false"
      width="500px"
      top="0"
    >
      <el-form :model="directForm" status-icon :rules="rules" ref="directForm" label-width="100px">
        <el-form-item label="方向名称" prop="direction_name">
          <el-input v-model="directForm.direction_name"></el-input>
        </el-form-item>
        <el-form-item label="年级" prop="grade_id">
          <el-select v-model="directForm.grade_id" placeholder="请选择">
            <el-option
              v-for="item in gradeList"
              :key="item.grade_id"
              :label="item.grade_name"
              :value="item.grade_id"
              :class="{selected: directForm.grade_id == item.grade_id}"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="限选人数" prop="limit_num">
          <el-input v-model.number="directForm.limit_num"></el-input>
        </el-form-item>
        <el-form-item label="方向介绍" prop="direction_detail">
          <el-input
            type="textarea"
            v-model="directForm.direction_detail"
            :rows="8"
            maxlength="300"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.stop="submitForm('directForm')">提交</el-button>
          <el-button v-if="formTitle=='添加'" @click.stop="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  props: ["directFormVisible", "directForm", "formTitle"],
  data() {
    return {
      rules: {
        direction_name: [
          { required: true, message: "请输入方向名称", trigger: "blur" }
        ],
        grade_id: [
          { required: true, message: "请选择所属年级", trigger: "blur" }
        ],
        limit_num: [
          { required: true, message: "请输入限选人数", trigger: "blur" },
          { type: "number", message: "限选人数必须为数字值", trigger: "blur" }
        ],
        direction_detail: [
          { required: true, message: "请输入方向介绍", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.findGradeList({ page: 1, pageSize: 9999 });
  },
  computed: {
    ...mapState("grade", ["gradeList"]),
    ...mapState("direction", ["major_id"]),
    ...mapState("loginUser", ["user"])
  },
  methods: {
    ...mapActions("grade", {
      findGradeList: "findByPage"
    }),
    ...mapActions("direction", ["addDirection", "updateDirection"]),
    hanldeClose() {
      this.$emit("close", false);
    },
    reset() {
      this.$refs.directForm.resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        const formData = {
          ...this.directForm,
          major_id: this.major_id,
          create_time: new Date().format("yyyy-MM-dd hh:mm:ss"),
          operation_username: this.user.name
        };
        if (this.formTitle == "编辑") {
          this.updateDirection(formData).then(res => {
            this.$message({
              message: res.msg,
              type: "success",
              duration: 2000,
              center: true
            });
          });
        } else if (this.formTitle == "添加") {
          this.addDirection(formData).then(res => {
            this.$message({
              message: res.msg,
              type: "success",
              duration: 2000,
              center: true
            });
          });
        }

        this.$emit("close", false);
      });
    }
  }
};
</script>
