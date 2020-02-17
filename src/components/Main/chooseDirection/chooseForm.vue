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
            <el-option
              v-for="item in directForUserList"
              :key="item.direction_id"
              :label="item.direction_name"
              :value="item.direction_id"
              :disabled="item.selected_num == item.limit_num"
              :class="{selected: chooseForm.direction_id == item.direction_id}"
            >
              <span style="float: left">{{ item.direction_name }}</span>
              <span
                style="float: right; color: #8492a6; font-size: 13px"
              >{{ `限选人数：${item.limit_num} 已选人数：${item.selected_num}` }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.stop="submitForm">选择方向</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import md5 from 'md5';
export default {
  props: ["chooseFormVisible", "chooseForm"],
  data() {
    return {
      rules: {
        direction_id: [
          { required: true, message: "请选择专业方向", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    const { grade_id, major_id } = this.user;
    if (grade_id != "" && major_id != "") {
      this.findDirectByUser({ grade_id, major_id });
    }
  },
  computed: {
    ...mapState("direction", ["directForUserList"]),
    ...mapState("loginUser", ["user"])
  },
  methods: {
    ...mapActions("direction", ["findDirectByUser"]),
    ...mapActions("taskSelected", ["selectedDirect", "updateSelectedNum"]),
    ...mapActions("task", ["updateTask"]),
    hanldeClose() {
      this.$emit("close", false);
    },
    submitForm(formName) {
      let form;
      const selected_time = new Date().format("yyyy-MM-dd hh:mm:ss");
      if (selected_time > this.chooseForm.end_time) {
        //判断任务是否结束了
        let form = { task_id: this.chooseForm.task_id, task_state: 2 };
        this.$message({
          message: "选报任务已结束",
          type: "error",
          duration: 2000,
          center: true
        });
        this.updateTask(form);
        this.hanldeClose();
        return;
      }
      this.$refs.chooseForm.validate(valid => {
        if (!valid) return;
        console.log(this.chooseForm);
        if (this.chooseForm.id == "") {
          form = {
            task_id: this.chooseForm.task_id,
            direction_id: this.chooseForm.direction_id,
            login_id: this.user.login_id,
            selected_time
          };
        } else {
          form = {
            id: this.chooseForm.id,
            direction_id: this.chooseForm.direction_id
          };
        }
        console.log(form);
        this.selectedDirect(form).then(res => {
          this.$message({
            message: res.msg,
            type: "success",
            duration: 2000,
            center: true
          });
          this.updateSelectedNum(this.directForUserList);
        });
        this.hanldeClose();
      });
    }
  }
};
</script>
