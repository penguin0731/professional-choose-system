<template>
  <div>
    <el-table
      border
      ref="multipleTable"
      :data="messageList"
      tooltip-effect="dark"
      style="width: 100%"
      height="520"
      @selection-change="handleSelectionChange"
    >
      <el-table-column fixed align="center" type="selection" width="55"></el-table-column>
      <el-table-column align="center" prop="id" label="ID" width="60"></el-table-column>
      <el-table-column align="center" prop="message_title" label="标题" min-width="200">
        <template slot-scope="scope">
          <el-popover
            width="200"
            trigger="click"
            :content="scope.row.message_title"
            placement="top"
          >
            <div slot="reference" class="nowrap">{{ scope.row.message_title }}</div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="message_detail" label="详情" min-width="300">
        <template slot-scope="scope">
          <el-popover
            width="500"
            trigger="click"
            :content="scope.row.message_detail"
            placement="top"
          >
            <div slot="reference" class="nowrap">{{ scope.row.message_detail }}</div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="message_username" label="操作用户" width="120"></el-table-column>
      <el-table-column align="center" prop="release_time" label="创建时间" width="160"></el-table-column>
      <el-table-column align="center" prop="message_state" label="状态" width="120">
        <template slot-scope="scope">{{ scope.row.message_state == 1 ? '公示' : '下架' }}</template>
      </el-table-column>
      <el-table-column fixed="right" align="center" label="操作" min-width="200">
        <template slot-scope="scope">
          <el-button
            v-if="showBtn.isEdit"
            @click="handleClick(scope.row)"
            type="success"
            size="mini"
          >编辑</el-button>
          <el-button
            v-if="showBtn.isEdit"
            type="primary"
            size="mini"
            @click="changeState(scope.row)"
          >修改状态</el-button>
          <el-button v-else type="info" size="mini" disabled>无操作权限</el-button>
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
  props: ["msgModule"],
  data() {
    return {
      editFormData: {
        message_title: "",
        message_detail: "",
        release_time: "",
        message_username: ""
      },
      editFormVisible: false,
      showBtn: {
        isEdit: false
      }
    };
  },
  mounted() {
    this.msgModule[0].children.forEach(item => {
      if (item.name == "公告修改") {
        this.showBtn.isEdit = true;
      }
    });
    this.findByPage({ page: this.currentPage, pageSize: this.pageSize });
  },
  computed: {
    ...mapState("message", [
      "multipleSelection",
      "currentPage",
      "pageSize",
      "messageList"
    ])
  },
  methods: {
    ...mapActions("message", ["findByPage", "updateMessage"]),
    handleSelectionChange(val) {
      this.setSelection(val);
    },
    closeEditForm(close) {
      this.editFormVisible = close;
    },
    handleClick(row) {
      this.editFormVisible = true;
      this.editFormData = { ...row };
    },
    changeState(row) {
      console.log(row);
      const params = {
        id: row.id,
        message_state: row.message_state == 1 ? 0 : 1
      };
      this.updateMessage(params);
    }
  }
};
</script>

<style scoped>
.nowrap {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>