<template>
  <div class="student">
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
          <el-button
            v-if="showBtn.isImport"
            type="primary"
            size="small"
            @click="showUploadForm(true)"
          >
            <i class="el-icon-upload"></i>
            导入
          </el-button>
          <el-button type="primary" size="small">
            <i class="el-icon-download"></i>
            <a
              href="/api/export/exportStudent?isDefault=undefined"
              style="color:#fff;"
              download="学生信息"
            >导出</a>
          </el-button>
          <el-button type="primary" size="small">
            <i class="el-icon-download"></i>
            <a
              href="/api/export/exportStudent?isDefault=default"
              style="color:#fff;"
              download="学生信息"
            >导出模板</a>
          </el-button>
        </el-button-group>
      </div>
      <el-input v-model="input" placeholder="模糊查询"></el-input>
      <el-button type="primary" size="small" @click="search">查询</el-button>
    </div>
    <stu-table :stuModule="stuModule" />
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
import stuTable from "./stuTable";
import addForm from "./addForm";
import uploadForm from "./uploadForm";
import { mapState, mapMutations, mapActions } from "vuex";
import api from "@/api";
export default {
  components: {
    stuTable,
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
        major_id: "",
        grade_id: "",
        classes: ""
      },
      uploadFormVisible: false,
      stuModule: null,
      showBtn: {
        isAdd: false,
        isDel: false,
        isImport: false
      }
    };
  },
  created() {
    this.stuModule = this.showModuleList.filter(item => {
      if (item.label == "学生管理") {
        return true;
      } else {
        return false;
      }
    });
    this.stuModule[0].children.forEach(item => {
      if (item.label == "学生添加") {
        this.showBtn.isAdd = true;
      }
      if (item.label == "学生删除") {
        this.showBtn.isDel = true;
      }
      if (item.label == "学生导入") {
        this.showBtn.isImport = true;
      }
    });
  },
  mounted() {
    this.findByPage({ page: this.currentPage, pageSize: this.pageSize });
  },
  computed: {
    ...mapState("student", [
      "multipleSelection",
      "currentPage",
      "pageSize",
      "count"
    ]),
    ...mapState("student", ["stuList"]),
    ...mapState("role", ["showModuleList"])
  },
  methods: {
    ...mapMutations("student", ["setPage", "setPageSize"]),
    ...mapActions("student", ["findByPage", "delStudents", "searchStudents"]),
    //修改每页展示几条数据
    handleSizeChange(val) {
      this.setPageSize(val);
    },
    //修改当前页码
    handleCurrentChange(val) {
      this.setPage(val);
    },
    showAddForm(isShow) {
      this.addFormVisible = isShow;
    },
    del() {
      const length = this.multipleSelection.length;
      this.$confirm(`是否删除选中的${length}个学生信息?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.delStudents(this.multipleSelection).then(res => {
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
        this.searchStudents(this.input);
      }
    }
  }
};
</script>

<style>
</style>