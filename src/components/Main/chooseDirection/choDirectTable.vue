<template>
  <div style="height: 100%">
    <el-table
      border
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      height="520"
      @selection-change="handleSelectionChange"
    >
      <el-table-column align="center" prop="task_id" label="ID" width="60"></el-table-column>
      <el-table-column align="center" prop="start_time" label="开始时间" width="160"></el-table-column>
      <el-table-column align="center" prop="end_time" label="结束时间" width="160"></el-table-column>
      <el-table-column align="center" prop="task_state" label="任务状态" width="120"></el-table-column>
      <el-table-column align="center" prop="direction_name" label="选择的方向名" width="140"></el-table-column>
      <el-table-column align="center" prop="selected_time" label="选报时间" width="160"></el-table-column>
      <el-table-column align="center" label="操作" width="160">
        <template slot-scope="scope">
          <el-button @click="showChooseForm(true, scope.row)" type="primary" size="mini">选报</el-button>
        </template>
      </el-table-column>
    </el-table>
    <chooseForm :chooseFormVisible="chooseFormVisible" @show="showChooseForm" />
  </div>
</template>

<script>
import chooseForm from './chooseForm';
export default {
  components: {
    chooseForm
  },
  props: ["tableData"],
  data() {
    return {
      multipleSelection: [],
      chooseFormVisible: false,
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    showChooseForm(isShow) {
      this.chooseFormVisible = isShow;
    },
  }
};
</script>

<style>
</style>