<template>
  <div>
    <div class="tool-bar">
      <div class="btn-group">
        <el-button-group>
          <el-button
            v-if="showBtn.isAdd"
            type="primary"
            size="small"
            @click="showProTaskForm(true)"
          >
            <i class="el-icon-plus"></i>
            添加
          </el-button>
          <el-button v-if="showBtn.isDel" type="danger" size="small" @click="del">
            <i class="el-icon-delete"></i>
            删除
          </el-button>
        </el-button-group>
      </div>
    </div>
    <el-table
      border
      ref="multipleTable"
      :data="taskList"
      tooltip-effect="dark"
      style="width: 100%"
      height="520"
      @selection-change="handleSelectionChange"
    >
      <el-table-column fixed align="center" type="selection" width="55"></el-table-column>
      <el-table-column align="center" prop="task_id" label="ID" width="55"></el-table-column>
      <el-table-column align="center" prop="start_time" label="开始时间" width="160"></el-table-column>
      <el-table-column align="center" prop="end_time" label="结束时间" width="160"></el-table-column>
      <el-table-column align="center" prop="major_name" label="专业名称" width="120"></el-table-column>
      <el-table-column align="center" prop="grade_name" label="年级" width="120"></el-table-column>
      <el-table-column align="center" prop="task_state" label="任务状态" width="120">
        <template
          slot-scope="scope"
        >{{+scope.row.task_state == 0 ? '未开始' : +scope.row.task_state == 1 ? '进行中' : '已结束'}}</template>
      </el-table-column>
      <el-table-column align="center" prop="operation_username" label="用户" width="120"></el-table-column>
      <el-table-column align="center" prop="create_time" label="创建时间" width="160"></el-table-column>
      <el-table-column align="center" prop="update_time" label="更新时间" width="160"></el-table-column>
      <el-table-column fixed="right" align="center" label="操作" min-width="200">
        <template slot-scope="scope">
          <el-button
            v-if="showBtn.isEdit"
            @click="showProTaskForm(true, scope.row, $event)"
            type="success"
            size="mini"
          >编辑</el-button>
          <el-button
            v-if="showBtn.isShowDetail"
            @click="toTaskDetail(scope.row)"
            type="primary"
            size="mini"
          >选报详情</el-button>
          <el-button
            v-if="!showBtn.isEdit && !showBtn.isShowDetail"
            type="info"
            size="mini"
            disabled
          >无操作权限</el-button>
        </template>
      </el-table-column>
    </el-table>
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
    <proTaskForm
      :proTaskFormVisible="proTaskFormVisible"
      :proTaskForm="proTaskFormData"
      @close="showProTaskForm"
      :formTitle="formTitle"
    />
  </div>
</template>

<script>
import proTaskForm from "./proTaskForm";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  components: {
    proTaskForm
  },
  data() {
    return {
      proTaskFormVisible: false,
      proTaskFormData: {
        start_time: "",
        end_time: "",
        grade_name: "",
        major_name: ""
      },
      formTitle: "",
      taskModule: null,
      showBtn: {
        isAdd: false,
        isDel: false,
        isEdit: false,
        isShowDetail: false
      }
    };
  },
  created() {
    this.taskModule = this.showModuleList.filter(item => {
      if (item.name == "方向选报任务管理") {
        return true;
      } else {
        return false;
      }
    });
    if (this.taskModule[0].children) {
      this.taskModule[0].children.forEach(item => {
        switch (item.name) {
          case "添加方向选报任务":
            this.showBtn.isAdd = true;
            break;
          case "删除方向选报任务":
            this.showBtn.isDel = true;
            break;
          case "修改方向选报任务":
            this.showBtn.isEdit = true;
            break;
          case "选报详情":
            this.showBtn.isShowDetail = true;
            break;
          default:
            break;
        }
      });
    }
  },
  mounted() {
    this.findByPage({ page: this.currentPage, pageSize: this.pageSize });
    this.findGradeList({ page: 1, pageSize: 9999 });
    this.findMajorList({ page: 1, pageSize: 9999 });
  },
  computed: {
    ...mapState("task", [
      "multipleSelection",
      "currentPage",
      "pageSize",
      "count",
      "taskList"
    ]),
    ...mapState("role", ["showModuleList"])
  },
  methods: {
    ...mapMutations("task", ["setPage", "setPageSize", "setSelection"]),
    ...mapMutations("taskDetail", ["setTaskId"]),
    ...mapActions("task", ["findByPage", "delTasks"]),
    ...mapActions("grade", {
      findGradeList: "findByPage"
    }),
    ...mapActions("major", {
      findMajorList: "findByPage"
    }),
    handleSizeChange(val) {
      this.setPageSize(val);
    },
    handleCurrentChange(val) {
      this.setPage(val);
    },
    handleSelectionChange(val) {
      this.setSelection(val);
    },
    showProTaskForm(isShow, row, e) {
      this.proTaskFormVisible = isShow;
      e ? (this.formTitle = "编辑") : (this.formTitle = "添加");
      if (row) {
        this.proTaskFormData = { ...row };
      }
    },
    // 展示任务详情模块
    toTaskDetail(row) {
      this.setTaskId(row.task_id);
      this.$emit("show", false);
    },
    del() {
      const length = this.multipleSelection.length;
      this.$confirm(`是否删除选中的${length}个任务?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.delTasks(this.multipleSelection).then(res => {
            this.$message({
              message: res.msg,
              type: "success",
              duration: 2000,
              center: true
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleClick(row) {
      this.editFormVisible = true;
      this.editFormData = { ...row };
    }
  }
};
</script>