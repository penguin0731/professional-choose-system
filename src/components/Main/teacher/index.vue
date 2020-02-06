<template>
  <div class="teacher">
    <div class="tool-bar">
      <div class="btn-group">
        <el-button type="primary" size="small" @click="showAddForm(true)">
          <i class="el-icon-plus"></i>
          添加
        </el-button>
        <el-button type="danger" size="small" @click="del">
          <i class="el-icon-delete"></i>
          删除
        </el-button>
        <el-button type="primary" size="small">
          <i class="el-icon-upload"></i>
          导入
        </el-button>
        <el-button type="primary" size="small">
          <i class="el-icon-download"></i>
          导出
        </el-button>
      </div>
      <el-input v-model="input" placeholder="模糊查询"></el-input>
      <el-button type="primary" size="small" @click="search">查询</el-button>
    </div>
    <teach-table />
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
    <add-form :addFormVisible="addFormVisible" :addForm="addFormData" @show="showAddForm" />
  </div>
</template>

<script>
import teachTable from "./teachTable";
import addForm from "./addForm";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  components: {
    teachTable,
    addForm
  },
  data() {
    return {
      input: "",
      addFormVisible: false,
      addFormData: {
        login_id: "",
        name: "",
        gender: "",
        phone: "",
        dept_id: "",
        department_name: "",
        role_id: "",
        role_name: ""
      }
    };
  },
  computed: {
    ...mapState("teacher", [
      "multipleSelection",
      "currentPage",
      "pageSize",
      "count"
    ])
  },
  methods: {
    ...mapMutations("teacher", ["setPage", "setPageSize"]),
    ...mapActions("teacher", [
      "findByPage",
      "delTeachers",
      "searchTeachers"
    ]),
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
      this.$confirm(`是否删除选中的${length}个教职工信息?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.delTeachers(this.multipleSelection);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    search() {
      if (this.input == "") {
        this.findByPage({ page: this.currentPage, pageSize: this.pageSize });
      } else {
        this.searchTeachers(this.input);
      }
    }
  }
};
</script>

<style>
</style>