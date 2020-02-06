<template>
  <el-table
    border
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    height="520"
    @selection-change="handleSelectionChange"
  >
    <el-table-column fixed align="center" type="selection" width="55"></el-table-column>
    <el-table-column align="center" prop="id" label="ID" width="55"></el-table-column>
    <el-table-column align="center" prop="start_time" label="开始时间" width="160"></el-table-column>
    <el-table-column align="center" prop="end_time" label="结束时间" width="160"></el-table-column>
    <el-table-column align="center" prop="major" label="专业名称" width="120"></el-table-column>
    <el-table-column align="center" prop="grade" label="年级" width="120"></el-table-column>
    <el-table-column align="center" prop="task_state" label="任务状态" width="120"></el-table-column>
    <el-table-column align="center" prop="operation_username" label="用户" width="120"></el-table-column>
    <el-table-column align="center" prop="create_time" label="创建时间" width="160"></el-table-column>
    <el-table-column align="center" prop="update_time" label="更新时间" width="160"></el-table-column>
    <el-table-column fixed="right" align="center" label="操作" min-width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="success" size="mini">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: ["tableData"],
  data() {
    return {
      multipleSelection: []
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleClick(row) {
      console.log(row);
      this.$emit('show', true, row)
    }
  }
};
</script>