<template>
  <div>
    <el-table
      border
      ref="multipleTable"
      :data="taskList"
      tooltip-effect="dark"
      style="width: 100%"
      height="520"
      @selection-change="handleSelectionChange"
    >
      <el-table-column fixed align="center" type="selection" width="55"></el-table-column>
      <el-table-column align="center" prop="task_id" label="ID" width="55"></el-table-column>
      <el-table-column align="center" prop="start_time" label="开始时间" width="160"></el-table-column>
      <el-table-column align="center" prop="end_time" label="结束时间" width="160"></el-table-column>
      <el-table-column align="center" prop="major_name" label="专业名称" width="120"></el-table-column>
      <el-table-column align="center" prop="grade_name" label="年级" width="120"></el-table-column>
      <el-table-column align="center" prop="task_state" label="任务状态" width="120">
        <template
          slot-scope="scope"
        >{{+scope.row.task_state == 0 ? '未开始' : +scope.row.task_state == 1 ? '进行中' : '已结束'}}</template>
      </el-table-column>
      <el-table-column align="center" prop="operation_username" label="用户" width="120"></el-table-column>
      <el-table-column align="center" prop="create_time" label="创建时间" width="160"></el-table-column>
      <el-table-column align="center" prop="update_time" label="更新时间" width="160"></el-table-column>
      <el-table-column fixed="right" align="center" label="操作" min-width="100">
        <template slot-scope="scope">
          <el-button
            v-if="showBtn.isEdit"
            @click="handleClick(scope.row)"
            type="success"
            size="mini"
          >编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <edit-form :editFormVisible="editFormVisible" :editForm="editFormData" @close="closeEditForm" />
  </div>
</template>

<script>
import editForm from "./editForm";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  components: {
    editForm
  },
  props: ["taskModule"],
  data() {
    return {
      editFormData: {
        start_time: "",
        end_time: "",
        grade_name: "",
        major_name: ""
      },
      editFormVisible: false,
      showBtn: {
        isEdit: false
      }
    };
  },
  mounted() {
    this.taskModule[0].children.forEach(item => {
      if (item.label == "修改方向选报任务") {
        this.showBtn.isEdit = true;
      }
    });
    this.findGradeList({ page: 1, pageSize: 9999 });
    this.findMajorList({ page: 1, pageSize: 9999 });
  },
  computed: {
    ...mapState("task", ["taskList"])
  },
  methods: {
    ...mapMutations("task", ["setSelection"]),
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
    handleClick(row) {
      this.editFormVisible = true;
      this.editFormData = { ...row };
    }
  }
};
</script>