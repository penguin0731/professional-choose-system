<template>
  <div>
    <div class="tool-bar">
      <div class="btn-group">
        <el-button type="text" size="small" @click="back">
          <i class="el-icon-back"></i>
          返回
        </el-button>
      </div>
      <el-input v-model="input" placeholder="模糊查询"></el-input>
      <el-button type="primary" size="small">查询</el-button>
    </div>
    <el-table
      border
      ref="multipleTable"
      :data="taskDetailList"
      :row-class-name="tableRowClassName"
      tooltip-effect="dark"
      style="width: 100%"
      height="520"
      @selection-change="handleSelectionChange"
    >
      <el-table-column align="center" prop="login_id" label="学号" width="160"></el-table-column>
      <el-table-column align="center" prop="name" label="姓名" width="160"></el-table-column>
      <el-table-column align="center" prop="classes" label="班级" width="120"></el-table-column>
      <el-table-column align="center" prop="direction_name" label="选报方向" width="160">
        <template
          slot-scope="scope"
        >{{scope.row.direction_name == null ? '未选报' : scope.row.direction_name}}</template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        :total="count"
        layout="total, sizes, prev, pager, next, jumper"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  components: {},
  data() {
    return {
      input: "",
      taskDetailFormData: {
        start_time: "",
        end_time: "",
        grade_name: "",
        major_name: ""
      },
      taskDetailFormVisible: false
    };
  },
  mounted() {
    this.findByPage({
      task_id: this.task_id,
      page: this.currentPage,
      pageSize: this.pageSize
    });
  },
  computed: {
    ...mapState("taskDetail", [
      "loading",
      "multipleSelection",
      "currentPage",
      "pageSize",
      "count",
      "task_id",
      "taskDetailList"
    ])
  },
  methods: {
    ...mapMutations("taskDetail", [
      "setLoading",
      "setPage",
      "setPageSize",
      "setSelection",
      "setTaskDetailList"
    ]),
    ...mapActions("taskDetail", ["findByPage"]),
    handleSizeChange(val) {
      this.setPageSize(val);
    },
    handleCurrentChange(val) {
      this.setPage(val);
    },
    handleSelectionChange(val) {
      this.setSelection(val);
    },
    // 返回到选报任务管理模块
    back() {
      this.$emit("show", true);
      this.setTaskDetailList(null);
      this.setLoading(true);
    },
    tableRowClassName({ row }) {
      if (!row.direction_name) {
        return "warning-row";
      }
      return '';
    }
  }
};
</script>

<style lang="scss">
.el-table .warning-row {
  background: oldlace;
}
</style>