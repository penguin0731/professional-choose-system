<template>
  <div>
    <el-table
      border
      ref="multipleTable"
      :data="roleList"
      style="width: 100%"
      height="520"
      @selection-change="handleSelectionChange"
    >
      <el-table-column align="center" type="selection" width="55"></el-table-column>
      <el-table-column align="center" prop="role_id" label="ID" width="60"></el-table-column>
      <el-table-column align="center" prop="role_name" label="角色名称" width="160"></el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="success" size="mini">编辑</el-button>
          <el-button type="primary" size="mini">分配权限</el-button>
        </template>
      </el-table-column>
    </el-table>
    <edit-form :editFormVisible="editFormVisible" :editForm="editFormData" @close="closeEditForm" />
  </div>
</template>

<script>
import editForm from "./editForm";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    editForm
  },
  data() {
    return {
      loading: true,
      multipleSelection: [],
      editFormData: {
        role_id: "",
        role_name: ""
      },
      editFormVisible: false
    };
  },
  computed: {
    ...mapState("role", ["currentPage", "pageSize", "roleList"])
  },
  methods: {
    ...mapActions("role", ["findByPage"]),
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleClick(row) {
      this.editFormVisible = true;
      this.editFormData = { ...row };
    },
    closeEditForm(close) {
      this.editFormVisible = close;
    }
  }
};
</script>

<style>
</style>