<template>
  <div>
    <el-table
      v-loading="loading"
      border
      ref="multipleTable"
      :data="deptList"
      style="width: 100%"
      height="520"
      @selection-change="handleSelectionChange"
    >
      <el-table-column align="center" type="selection" width="55"></el-table-column>
      <el-table-column align="center" prop="department_id" label="ID" width="60"></el-table-column>
      <el-table-column align="center" prop="department_name" label="院系名称" width="180"></el-table-column>
      <el-table-column align="center" label="状态" width="120">
        <template slot-scope="scope">{{+scope.row.department_state == 1 ? '在用' : '弃用'}}</template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button v-if="showBtn.isEdit" @click="handleClick(scope.row)" type="success" size="mini">编辑</el-button>
          <el-button v-if="showBtn.isEdit" @click="changeState(scope.row)" type="primary" size="mini">修改状态</el-button>
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
  props: ["deptModule"],
  data() {
    return {
      multipleSelection: [],
      editFormData: {
        department_id: "",
        department_name: "",
        department_state: ""
      },
      editFormVisible: false,
      showBtn: {
        isEdit: false
      }
    };
  },
  mounted() {
    this.deptModule[0].children.forEach(item => {
      if (item.name == "院系修改") {
        this.showBtn.isEdit = true;
      }
    });
  },
  computed: {
    ...mapState("department", ["loading", "currentPage", "pageSize", "deptList"]),
  },
  methods: {
    ...mapActions("department", ["updateDept"]),
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    closeEditForm(close) {
      this.editFormVisible = close;
    },
    handleClick(row) {
      this.editFormVisible = true;
      this.editFormData = { ...row };
    },
    changeState(row) {
      const params = {
        department_id: row.department_id,
        department_state: row.department_state == 1 ? 0 : 1
      };
      this.updateDept(params);
    }
  }
};
</script>