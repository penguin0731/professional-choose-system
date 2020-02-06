<template>
  <div class="professionalTask">
    <div class="tool-bar">
      <div class="btn-group">
        <el-button type="primary" size="small" @click="showTaskForm(true)">
          <i class="el-icon-plus"></i>
          添加
        </el-button>
        <el-button type="danger" size="small">
          <i class="el-icon-delete"></i>
          删除
        </el-button>
      </div>
    </div>
    <pro-task-table :table-data="tableData" @show="showTaskForm" />
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[1, 2, 3, 4]"
        :page-size="pageSize"
        :total="count"
        layout="total, sizes, prev, pager, next, jumper"
      ></el-pagination>
    </div>
    <taskForm :taskFormVisible="taskFormVisible" @show="showTaskForm" :taskForm="taskForm" />
  </div>
</template>

<script>
import proTaskTable from "./proTaskTable";
import taskForm from "./taskForm";
export default {
  components: {
    proTaskTable,
    taskForm
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 1,
      data: [],
      tableData: [
        {
          id: 1,
          grade: "2016级",
          major: "软件工程",
          start_time: "2019-11-01 12:00:00",
          end_time: "2019-11-07 12:00:00",
          create_time: "2019-10-25 10:50:45",
          update_time: "2019-11-03 09:42:21",
          operation_username: "admin",
          task_state: "进行中"
        }
      ],
      taskForm: {
        start_time: "",
        end_time: "",
        grade: "",
        major: ""
      },
      taskFormVisible: false
    };
  },
  mounted() {
    this.tableData.forEach((v, i) => {
      if (i + 1 == this.pageSize) {
        this.data.push(v);
      }
    });
  },
  computed: {
    count() {
      return this.tableData.length;
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(val);
      this.data = [];
      this.tableData.forEach((v, i) => {
        if (i + 1 > val) return;
        this.data.push(v);
      });
    },
    handleCurrentChange(val) {},
    showTaskForm(isShow, row) {
      this.taskFormVisible = isShow;
      if (row) {
        this.taskForm = {
          ...row,
          start_time: new Date(row.start_time),
          end_time: new Date(row.start_time)
        };
      } 
      // else {
      //   this.taskForm = {
      //     start_time: "",
      //     end_time: "",
      //     grade: "",
      //     major: ""
      //   };
      // }
    }
  }
};
</script>

<style>
</style>