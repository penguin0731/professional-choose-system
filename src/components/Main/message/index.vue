<template>
  <div class="message">
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
    <msg-table :msgModule="msgModule" />
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
import msgTable from "./msgTable";
import addForm from "./addForm";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  components: {
    msgTable,
    addForm
  },
  data() {
    return {
      input: "",
      addFormData: {
        message_title: "",
        message_detail: ""
      },
      addFormVisible: false,
      msgModule: null,
      showBtn: {
        isAdd: false
      }
    };
  },
  created() {
    this.msgModule = this.showModuleList.filter(item => {
      if (item.name == "公告管理") {
        return true;
      } else {
        return false;
      }
    });
    this.msgModule[0].children.forEach(item => {
      if (item.name == "公告添加") {this.showBtn.isAdd = true;}
    });
  },
  mounted() {
    this.findByPage({ page: this.currentPage, pageSize: this.pageSize });
  },
  computed: {
    ...mapState("message", [
      "multipleSelection",
      "currentPage",
      "pageSize",
      "count"
    ]),
    ...mapState("role", ["showModuleList"])
  },
  methods: {
    ...mapMutations("message", ["setPage", "setPageSize"]),
    ...mapActions("message", ["findByPage", "searchMessages"]),
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
    search() {
      if (this.input == "") {
        this.findByPage({ page: this.currentPage, pageSize: this.pageSize });
      } else {
        this.searchMessages(this.input);
      }
    }
  }
};
</script>

<style>
</style>