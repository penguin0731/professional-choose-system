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
          <el-button
            v-if="showBtn.isEdit"
            @click="handleEdit(scope.row)"
            type="success"
            size="mini"
          >编辑</el-button>
          <el-button
            v-if="user.role_id == 2"
            @click="handleClick(scope.row)"
            type="primary"
            size="mini"
          >分配权限</el-button>
          <el-button
            v-if="!showBtn.isEdit && user.role_id != 2"
            type="info"
            size="mini"
            disabled
          >无操作权限</el-button>
        </template>
      </el-table-column>
    </el-table>
    <edit-form :editFormVisible="editFormVisible" :editForm="editFormData" @close="closeEditForm" />
    <dispatch-power
      :dispatchFormVisible="dispatchFormVisible"
      :role_id="role_id"
      @close="closeDispatchForm"
    />
  </div>
</template>

<script>
import editForm from "./editForm";
import dispatchPower from "./dispatchPower";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    editForm,
    dispatchPower
  },
  props: ["roleModule"],
  data() {
    return {
      loading: true,
      multipleSelection: [],
      editFormData: {
        role_id: "",
        role_name: ""
      },
      editFormVisible: false,
      dispatchFormVisible: false,
      role_id: "",
      showBtn: {
        isEdit: false
      }
    };
  },
  mounted() {
    this.roleModule[0].children.forEach(item => {
      if (item.name == "角色修改") {
        this.showBtn.isEdit = true;
      }
    });
  },
  computed: {
    ...mapState("role", ["currentPage", "pageSize", "roleList"]),
    ...mapState("loginUser", ["user"])
  },
  methods: {
    ...mapActions("role", ["findByPage", "findCheckedModule"]),
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleEdit(row) {
      this.editFormVisible = true;
      this.editFormData = { ...row };
    },
    closeEditForm(close) {
      this.editFormVisible = close;
    },
    handleClick(row) {
      this.dispatchFormVisible = true;
      this.role_id = row.role_id;
      this.findCheckedModule(row.role_id);
    },
    closeDispatchForm(close) {
      this.dispatchFormVisible = close;
    }
  }
};
</script>

<style>
</style>