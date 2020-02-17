<template>
  <div>
    <el-table
      border
      ref="multipleTable"
      :data="gradeList"
      tooltip-effect="dark"
      style="width: 100%"
      height="520"
      @selection-change="handleSelectionChange"
    >
      <el-table-column align="center" type="selection" width="55"></el-table-column>
      <el-table-column align="center" prop="grade_id" label="ID" width="60"></el-table-column>
      <el-table-column align="center" prop="grade_name" label="年级" width="120"></el-table-column>
      <el-table-column align="center" prop="grade_state" label="状态" width="120">
        <template slot-scope="scope">{{+scope.row.grade_state == 1 ? '在用' : '弃用'}}</template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            v-if="showBtn.isEdit"
            @click="handleClick(scope.row)"
            type="success"
            size="mini"
          >编辑</el-button>
          <el-button
            v-if="showBtn.isEdit"
            @click="changeState(scope.row)"
            type="primary"
            size="mini"
          >修改状态</el-button>
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
  props: ["gradeModule"],
  data() {
    return {
      multipleSelection: [],
      editFormData: {
        grade_id: "",
        grade_name: ""
      },
      editFormVisible: false,
      showBtn: {
        isEdit: false
      }
    };
  },
  mounted() {
    this.gradeModule[0].children.forEach(item => {
      if (item.label == "年级修改") {
        this.showBtn.isEdit = true;
      }
    });
  },
  computed: {
    ...mapState("grade", ["currentPage", "pageSize", "gradeList"])
  },
  methods: {
    ...mapActions("grade", ["findByPage", "updateGrade"]),
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleClick(row) {
      this.editFormVisible = true;
      this.editFormData = { ...row };
    },
    changeState(row) {
      const params = {
        grade_id: row.grade_id,
        grade_state: row.grade_state == 1 ? 0 : 1
      };
      this.updateGrade(params).then(res => {
        this.$message({
          message: res.msg,
          type: "success",
          duration: 2000,
          center: true
        });
      });
    },
    closeEditForm(close) {
      this.editFormVisible = close;
    }
  }
};
</script>