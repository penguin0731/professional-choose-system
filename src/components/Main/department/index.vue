<template>
  <div class="department">
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
    <dept-table :deptModule="deptModule" />
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
    <add-form :addFormVisible="addFormVisible" :addForm="addFormData" @show="showAddForm" />
  </div>
</template>

<script>
import deptTable from "./deptTable";
import addForm from "./addForm";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  components: {
    deptTable,
    addForm
  },
  data() {
    return {
      input: "",
      addFormVisible: false,
      addFormData: {
        department_name: ""
      },
      deptModule: null,
      showBtn: {
        isAdd: false
      }
    };
  },
  created() {
    this.deptModule = this.showModuleList.filter(item => {
      if (item.name == "院系管理") {
        return true;
      } else {
        return false;
      }
    });
    this.deptModule[0].children.forEach(item => {
      if (item.name == "院系添加") {this.showBtn.isAdd = true;}
    });
  },
  mounted() {
    this.findByPage({ page: this.currentPage, pageSize: this.pageSize });
  },
  computed: {
    ...mapState("department", ["currentPage", "pageSize", "count"]),
    ...mapState("role", ["showModuleList"])
  },
  methods: {
    ...mapMutations("department", ["setPage", "setPageSize"]),
    ...mapActions("department", ["findByPage", "searchDept"]),
    handleSizeChange(val) {
      this.setPageSize(val);
    },
    handleCurrentChange(val) {
      this.setPage(val);
    },
    showAddForm(isShow) {
      this.addFormVisible = isShow;
    },
    search() {
      if (this.input == "") {
        this.findByPage({ page: this.currentPage, pageSize: this.pageSize });
      } else {
        this.searchDept(this.input);
      }
    }
  }
};
</script>

<style>
</style>