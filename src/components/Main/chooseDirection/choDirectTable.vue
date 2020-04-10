<template>
  <div style="height: 100%">
    <el-table
      border
      ref="multipleTable"
      :data="taskList"
      tooltip-effect="dark"
      style="width: 100%"
      height="520"
    >
      <el-table-column align="center" prop="task_id" label="ID" width="60"></el-table-column>
      <el-table-column align="center" prop="start_time" label="开始时间" width="160"></el-table-column>
      <el-table-column align="center" prop="end_time" label="结束时间" width="160"></el-table-column>
      <el-table-column align="center" prop="task_state" label="任务状态" width="120">
        <template slot-scope="scope">
          {{+scope.row.task_state == 0 ? '未开始' : +scope.row.task_state == 1 ? '进行中' : '已结束'}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="direction_name" label="选择的方向名" width="140"></el-table-column>
      <el-table-column align="center" prop="selected_time" label="选报时间" width="160"></el-table-column>
      <el-table-column align="center" label="操作" width="160">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="primary" size="mini">选报</el-button>
        </template>
      </el-table-column>
    </el-table>
    <chooseForm :chooseFormVisible="chooseFormVisible" @close="showChooseForm" :chooseForm="chooseFormData" />
  </div>
</template>

<script>
import chooseForm from "./chooseForm";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    chooseForm
  },
  data() {
    return {
      chooseFormVisible: false,
      chooseFormData: {
        direction_id: ""
      }
    };
  },
  computed: {
    ...mapState("taskSelected", ["taskList"])
  },
  methods: {
    ...mapActions("task", ["updateTask"]),
    showChooseForm(isShow) {
      this.chooseFormVisible = isShow;
    },
    handleClick(row) {
      const now = new Date().format("yyyy-MM-dd hh:mm:ss");
      if (now < row.start_time) {
        this.$message({
          message: '选报任务未开始',
          type: "warning",
          duration: 2000,
          center: true
        });
        return;
      }else if(now > row.end_time) {
        const form = {task_id: row.task_id, task_state: 2}
        this.$message({
          message: '选报任务已结束',
          type: "warning",
          duration: 2000,
          center: true
        });
        this.updateTask(form);
        return;
      }
      const form = {task_id: row.task_id, task_state: 1}
      this.updateTask(form);
      this.chooseFormData = {...row};
      this.showChooseForm(true);
    }
  }
};
</script>

<style>
</style>