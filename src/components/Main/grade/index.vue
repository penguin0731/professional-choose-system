<template>
  <div class="grade">
    <div class="tool-bar">
      <div class="btn-group">
        <el-button v-if="showBtn.isAdd" type="primary" size="small" @click="showAddForm(true)">
          <i class="el-icon-plus"></i>
          添加
        </el-button>
      </div>
      <el-input v-model="input" placeholder="模糊查询"></el-input>
      <el-button type="primary" size="small" @click="search">查询</el-button>
    </div>
    <grade-table :gradeModule="gradeModule" />
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
    <add-form :addFormVisible="addFormVisible" @show="showAddForm" :addForm="addFormData" />
  </div>
</template>

<script>
import gradeTable from "./gradeTable";
import addForm from "./addForm";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  components: {
    gradeTable,
    addForm
  },
  data() {
    return {
      input: "",
      addFormVisible: false,
      addFormData: {
        grade_name: ""
      },
      gradeModule: null,
      showBtn: {
        isAdd: false
      }
    };
  },
  created() {
    this.gradeModule = this.showModuleList.filter(item => {
      if (item.name == "年级管理") {
        return true;
      } else {
        return false;
      }
    });
    this.gradeModule[0].children.forEach(item => {
      if (item.name == "年级添加") {this.showBtn.isAdd = true;}
    });
  },
  mounted() {
    this.findByPage({ page: this.currentPage, pageSize: this.pageSize });
  },
  computed: {
    ...mapState("grade", ["currentPage", "pageSize", "count"]),
    ...mapState("role", ["showModuleList"])
  },
  methods: {
    ...mapMutations("grade", ["setPageSize"]),
    ...mapActions("grade", ["findByPage", "searchGrades"]),
    handleSizeChange(val) {
      this.setPageSize(val);
    },
    handleCurrentChange(val) {},
    showAddForm(isShow) {
      this.addFormVisible = isShow;
    },
    search() {
      if (this.input == "") {
        this.findByPage({ page: this.currentPage, pageSize: this.pageSize });
      } else {
        this.searchGrades(this.input);
      }
    }
  }
};
</script>

<style>
</style>