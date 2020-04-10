<template>
  <div class="teacher">
    <div class="tool-bar">
      <div class="btn-group">
        <el-button-group>
          <el-button type="primary" size="small" @click="showAddForm(true)">
            <i class="el-icon-plus"></i>
            添加
          </el-button>
          <el-button type="danger" size="small" @click="del">
            <i class="el-icon-delete"></i>
            删除
          </el-button>
          <el-button type="primary" size="small" @click="showUploadForm(true)">
            <i class="el-icon-upload"></i>
            导入
          </el-button>
          <el-button type="primary" size="small">
            <i class="el-icon-download"></i>
            <a
              href="/api/export/exportTeacher?isDefault=undefined"
              style="color:#fff;"
              download="教职工信息"
            >导出</a>
          </el-button>
          <el-button type="primary" size="small">
            <i class="el-icon-download"></i>
            <a
              href="/api/export/exportTeacher?isDefault=default"
              style="color:#fff;"
              download="教职工信息"
            >导出模板</a>
          </el-button>
        </el-button-group>
      </div>
      <el-input v-model="input" placeholder="模糊查询"></el-input>
      <el-button type="primary" size="small" @click="search">查询</el-button>
    </div>
    <teach-table :teachModule="teachModule" />
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
    <add-form :addFormVisible="addFormVisible" :addForm="addFormData" @close="showAddForm" />
    <upload-form :uploadFormVisible="uploadFormVisible" @close="showUploadForm" />
  </div>
</template>

<script>
import teachTable from "./teachTable";
import addForm from "./addForm";
import uploadForm from "./uploadForm";
import { mapState, mapMutations, mapActions } from "vuex";
import api from "@/api";
export default {
  components: {
    teachTable,
    addForm,
    uploadForm
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
      },
      uploadFormVisible: false,
      teachModule: null,
      showBtn: {
        isAdd: false,
        isDel: false,
        isImport: false
      }
    };
  },
  created() {
    this.teachModule = this.showModuleList.filter(item => {
      if (item.name == "教职工管理") {
        return true;
      } else {
        return false;
      }
    });
    this.teachModule[0].children.forEach(item => {
      switch(item.name) {
        case "教职工添加": this.showBtn.isAdd = true;break;
        case "教职工删除": this.showBtn.isDel = true;break;
        case "教职工导入": this.showBtn.isImport = true;break;
        default: break;
      }
    });
  },
  mounted() {
    this.findByPage({ page: this.currentPage, pageSize: this.pageSize });
  },
  computed: {
    ...mapState("teacher", [
      "multipleSelection",
      "currentPage",
      "pageSize",
      "count"
    ]),
    ...mapState("role", ["showModuleList"])
  },
  methods: {
    ...mapMutations("teacher", ["setPage", "setPageSize"]),
    ...mapActions("teacher", ["findByPage", "delTeachers", "searchTeachers"]),
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
          this.delTeachers(this.multipleSelection).then(res => {
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
    showUploadForm(isShow) {
      this.uploadFormVisible = isShow;
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