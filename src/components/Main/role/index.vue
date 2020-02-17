<template>
  <div class="role">
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
    <role-table :roleModule="roleModule" />
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
import roleTable from "./roleTable";
import addForm from "./addForm";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  components: {
    roleTable,
    addForm
  },
  data() {
    return {
      input: "",
      addFormVisible: false,
      addFormData: {
        role_name: ""
      },
      roleModule: null,
      showBtn: {
        isAdd: false
      }
    };
  },
  created() {
    this.roleModule = this.showModuleList.filter(item => {
      if (item.label == "角色管理") {
        return true;
      } else {
        return false;
      }
    });
    this.roleModule[0].children.forEach(item => {
      if (item.label == "角色添加") {this.showBtn.isAdd = true;}
    });
  },
  mounted() {
    this.findByPage({ page: this.currentPage, pageSize: this.pageSize });
    this.findModule();
  },
  computed: {
    ...mapState("role", ["currentPage", "pageSize", "count", "showModuleList"])
  },
  methods: {
    ...mapMutations("role", ["setPageSize"]),
    ...mapActions("role", ["findByPage", "searchRoles"]),
    ...mapActions("role", ["findModule"]),
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
        this.searchRoles(this.input);
      }
    }
  }
};
</script>

<style>
</style>