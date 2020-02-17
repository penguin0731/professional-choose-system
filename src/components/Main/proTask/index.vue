<template>
  <div class="professionalTask">
    <div class="tool-bar">
      <div class="btn-group">
        <el-button-group>
          <el-button v-if="showBtn.isAdd" type="primary" size="small" @click="showAddForm(true)">
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
    <pro-task-table :taskModule="taskModule" />
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
    <addForm :addFormVisible="addFormVisible" @show="showAddForm" :addForm="addFormData" />
  </div>
</template>

<script>
import proTaskTable from "./proTaskTable";
import addForm from "./addForm";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  components: {
    proTaskTable,
    addForm
  },
  data() {
    return {
      addFormData: {
        start_time: "",
        end_time: "",
        grade_id: "",
        major_id: ""
      },
      addFormVisible: false,
      taskModule: null,
      showBtn: {
        isAdd: false,
        isDel: false
      }
    };
  },
  created() {
    this.taskModule = this.showModuleList.filter(item => {
      if (item.label == "方向选报任务管理") {
        return true;
      } else {
        return false;
      }
    });
    this.taskModule[0].children.forEach(item => {
      if (item.label == "添加方向选报任务") {
        this.showBtn.isAdd = true;
      }
      if (item.label == "删除方向选报任务") {
        this.showBtn.isDel = true;
      }
    });
  },
  mounted() {
    this.findByPage({ page: this.currentPage, pageSize: this.pageSize });
  },
  computed: {
    ...mapState("task", [
      "multipleSelection",
      "currentPage",
      "pageSize",
      "count"
    ]),
    ...mapState("role", ["showModuleList"])
  },
  methods: {
    ...mapMutations("task", ["setPage", "setPageSize"]),
    ...mapActions("task", ["findByPage", "delTasks"]),
    handleSizeChange(val) {
      this.setPageSize(val);
    },
    handleCurrentChange(val) {
      this.setPage(val);
    },
    showAddForm(isShow) {
      this.addFormVisible = isShow;
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
    }
  }
};
</script>

<style>
</style>