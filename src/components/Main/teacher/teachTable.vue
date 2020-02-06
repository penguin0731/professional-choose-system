<template>
  <div>
    <el-table
      border
      ref="multipleTable"
      :data="teachList"
      tooltip-effect="dark"
      style="width: 100%"
      height="520"
      @selection-change="handleSelectionChange"
    >
      <el-table-column fixed align="center" type="selection" width="55"></el-table-column>
      <el-table-column align="center" prop="login_id" label="工号" width="120"></el-table-column>
      <el-table-column align="center" prop="name" label="姓名" width="120"></el-table-column>
      <el-table-column align="center" prop="gender" label="性别" width="80">
        <template slot-scope="scope">{{scope.row.gender == 0 ? '男' : '女'}}</template>
      </el-table-column>
      <el-table-column align="center" prop="phone" label="联系电话" width="120"></el-table-column>
      <el-table-column align="center" prop="email" label="邮箱" width="200"></el-table-column>
      <el-table-column align="center" prop="department_name" label="院系" width="120"></el-table-column>
      <el-table-column align="center" prop="role_name" label="身份" width="120"></el-table-column>
      <el-table-column align="center" prop="person_state" label="状态" width="120">
        <template slot-scope="scope">{{scope.row.person_state == 0 ? '离职' : '在职'}}</template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="handleClick($event, scope.row)" type="success" size="mini">编辑</el-button>
          <el-button @click="handleClick($event, scope.row)" type="primary" size="mini">查看全部</el-button>
        </template>
      </el-table-column>
    </el-table>
    <edit-form
      :editFormVisible="editFormVisible"
      :editForm="editFormData"
      @close="closeEditForm"
      :isDisabled="isDisabled"
      :formTitle="formTitle"
    />
  </div>
</template>

<script>
import editForm from "./editForm";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  components: {
    editForm
  },
  data() {
    return {
      editFormData: {
        login_id: "",
        name: "",
        gender: "",
        department_name: "",
        role_name: "",
        phone: "",
        email: "",
        person_state: ""
      },
      editFormVisible: false,
      isDisabled: false,
      formTitle: ''
    };
  },
  mounted() {
    this.findByPage({ page: this.currentPage, pageSize: this.pageSize });
    this.findDeptList({ page: 1, pageSize: 9999 });
    this.findTeach({ page: 1, pageSize: 9999 })
  },
  computed: {
    ...mapState("teacher", ["multipleSelection", "currentPage", "pageSize", "teachList"]),
  },
  methods: {
    ...mapMutations("teacher", ["setSelection"]),
    ...mapActions("teacher", ["findByPage", "updateTeacher"]),
    ...mapActions("department", {
      findDeptList: "findByPage"
    }),
    ...mapActions("role", ["findTeach"]),
    handleSelectionChange(val) {
      this.setSelection(val);
    },
    closeEditForm(close) {
      this.editFormVisible = close;
    },
    handleClick(e, row) {
      console.log(e.target.innerText);
      e.target.innerText == "查看全部"
        ? (this.isDisabled = true)
        : (this.isDisabled = false);
      this.formTitle = e.target.innerText;
      this.editFormVisible = true;
      this.editFormData = {...row};
    }
  }
};
</script>