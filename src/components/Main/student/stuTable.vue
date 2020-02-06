<template>
  <div>
    <el-table
      border
      ref="multipleTable"
      :data="stuList"
      tooltip-effect="dark"
      style="width: 100%"
      height="520"
      @selection-change="handleSelectionChange"
    >
      <el-table-column fixed align="center" type="selection" width="55"></el-table-column>
      <el-table-column align="center" prop="login_id" label="学号" width="120"></el-table-column>
      <el-table-column align="center" prop="name" label="姓名" width="120"></el-table-column>
      <el-table-column align="center" prop="gender" label="性别" width="80">
        <template slot-scope="scope">{{scope.row.gender == 0 ? '男' : '女'}}</template>
      </el-table-column>
      <el-table-column align="center" prop="phone" label="联系电话" width="120"></el-table-column>
      <el-table-column align="center" prop="email" label="邮箱" width="200"></el-table-column>
      <el-table-column align="center" prop="major_name" label="专业" width="120"></el-table-column>
      <el-table-column align="center" prop="grade_name" label="年级" width="120"></el-table-column>
      <el-table-column align="center" prop="classes" label="班级" width="120"></el-table-column>
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
        grade_name: "",
        major_name: "",
        student_status: "",
        person_status: ""
      },
      editFormVisible: false,
      isDisabled: false,
      formTitle: ""
    };
  },
  mounted() {
    this.findByPage({ page: this.currentPage, pageSize: this.pageSize });
    this.findGradeList({ page: 1, pageSize: 9999 });
    this.findMajorList({ page: 1, pageSize: 9999 });
  },
  computed: {
    ...mapState("student", ["multipleSelection", "currentPage", "pageSize", "stuList"]),
  },
  methods: {
    ...mapMutations("student", ["setSelection"]),
    ...mapActions("student", ["findByPage"]),
    ...mapActions("grade", {
      findGradeList: "findByPage"
    }),
    ...mapActions("major", {
      findMajorList: "findByPage"
    }),
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
      this.editFormData = { ...row };
    }
  }
};
</script>