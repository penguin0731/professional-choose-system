<template>
  <div>
    <div class="tool-bar">
      <div class="btn-group">
        <el-button type="text" size="small" @click="back">
          <i class="el-icon-back"></i>
          返回
        </el-button>
        <span style="color: #ddd; margin: 0 5px;">|</span>
        <el-button-group>
          <el-button v-if="showBtn.isAdd" type="primary" size="small" @click="showDirectForm(true)">
            <i class="el-icon-plus"></i>
            添加
          </el-button>
          <el-button v-if="showBtn.isDel" type="danger" size="small" @click="del">
            <i class="el-icon-delete"></i>
            删除
          </el-button>
        </el-button-group>
      </div>
      <el-input v-model="input" placeholder="模糊查询"></el-input>
      <el-button type="primary" size="small" @click="search">查询</el-button>
    </div>
    <el-table
      v-loading="loading"
      border
      ref="multipleTable"
      :data="directionList"
      tooltip-effect="dark"
      style="width: 100%"
      height="520"
      @selection-change="handleSelectionChange"
    >
      <el-table-column fixed align="center" type="selection" width="55"></el-table-column>
      <el-table-column align="center" prop="direction_id" label="ID" width="60"></el-table-column>
      <el-table-column align="center" prop="direction_name" label="方向名称" width="120"></el-table-column>
      <el-table-column align="center" prop="direction_detail" label="方向描述" width="200">
        <template slot-scope="scope">
          <el-popover
            width="500"
            trigger="click"
            placement="top"
          >
            <div v-for="item in (scope.row.direction_detail.split('\n'))" :key="item" class="text item">
              {{ item }}
            </div>
            <div slot="reference" class="nowrap">{{ scope.row.direction_detail }}</div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="grade_name" label="所属年级" width="120"></el-table-column>
      <el-table-column align="center" prop="limit_num" label="限选人数" width="120"></el-table-column>
      <el-table-column align="center" prop="selected_num" label="已选人数" width="120"></el-table-column>
      <el-table-column align="center" prop="create_time" label="创建时间" width="160"></el-table-column>
      <el-table-column align="center" prop="update_time" label="更新时间" width="160"></el-table-column>
      <el-table-column align="center" prop="operation_username" label="操作用户名" width="120"></el-table-column>
      <el-table-column fixed="right" align="center" label="操作" min-width="270">
        <template slot-scope="scope">
          <el-button
            v-if="showBtn.isEdit"
            @click="showDirectForm(true, scope.row, $event)"
            type="success"
            size="mini"
          >编辑</el-button>
          <el-button v-else type="info" size="mini" disabled>无操作权限</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[1, 2, 3, 4]"
        :page-size="pageSize"
        :total="count"
        layout="total, sizes, prev, pager, next, jumper"
      ></el-pagination>
    </div>
    <directForm
      :directFormVisible="directFormVisible"
      @close="showDirectForm"
      :directForm="directForm"
      :formTitle="formTitle"
    />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import directForm from "./directForm";
export default {
  components: {
    directForm
  },
  data() {
    return {
      input: "",
      directFormVisible: false,
      directForm: {
        direction_name: "",
        direction_detail: "",
        grade_id: "",
        limit_num: "",
        selected_num: "",
        create_time: "",
        update_time: "",
        operation_username: ""
      },
      formTitle: "",
      directModule: null,
      showBtn: {
        isAdd: false,
        isDel: false,
        isEdit: false
      }
    };
  },
  created() {
    this.directModule = this.showModuleList.filter(item => {
      if (item.name == "专业管理") {
        return true;
      } else {
        return false;
      }
    });
    this.directModule = this.directModule[0].children.filter(item => {
      if (item.name == "方向管理") {
        return true;
      } else {
        return false;
      }
    });
    if (this.directModule[0].children) {
      this.directModule[0].children.forEach(item => {
        if (item.name == "方向添加") {
          this.showBtn.isAdd = true;
        }
        if (item.name == "方向删除") {
          this.showBtn.isDel = true;
        }
        if (item.name == "方向修改") {
          this.showBtn.isEdit = true;
        }
      });
    }
  },
  mounted() {
    this.findByPage({
      id: this.major_id,
      page: this.currentPage,
      pageSize: this.pageSize
    });
  },
  computed: {
    ...mapState("direction", [
      "loading",
      "multipleSelection",
      "currentPage",
      "pageSize",
      "count",
      "major_id",
      "directionList"
    ]),
    ...mapState("role", ["showModuleList"])
  },
  methods: {
    ...mapMutations("direction", [
      "setLoading",
      "setPage",
      "setPageSize",
      "setSelection",
      "setDirectionList"
    ]),
    ...mapActions("direction", ["findByPage", "delDirections", "searchDirections"]),
    //修改每页展示几条数据
    handleSizeChange(val) {
      this.setPageSize(val);
    },
    //修改当前页码
    handleCurrentChange(val) {
      this.setPage(val);
    },
    // 选中item的数组
    handleSelectionChange(val) {
      this.setSelection(val);
    },
    // 返回到专业管理模块
    back() {
      this.$emit("show", true);
      this.setDirectionList(null);
      this.setLoading(true);
    },
    showDirectForm(isShow, row, e) {
      this.directFormVisible = isShow;
      if(e) {
        this.formTitle = "编辑";
        this.directForm = { ...row };
      }else {
        this.formTitle = "添加"; 
      }
    },
    del() {
      const length = this.multipleSelection.length;
      const formData = this.multipleSelection.map(item => ({
        direction_id: item.direction_id
      }));
      this.$confirm(`是否删除选中的${length}个方向信息?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.delDirections(formData).then(res => {
            this.$message({
              message: res.msg,
              type: "success",
              duration: 2000,
              center: true
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    search() {
      if (this.input == "") {
        this.findByPage({ id: this.major_id, page: this.currentPage, pageSize: this.pageSize });
      } else {
        this.searchDirections(this.input);
      }
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