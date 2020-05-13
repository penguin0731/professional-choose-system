<template>
  <div>
    <div class="tool-bar">
      <div class="btn-group">
        <el-button-group>
          <el-button v-if="showBtn.isAdd" type="primary" size="small" @click="showMajorForm(true)">
            <i class="el-icon-plus"></i>
            添加
          </el-button>
          <el-button v-if="showBtn.isDel" type="danger" size="small" @click="del">
            <i class="el-icon-delete"></i>
            删除
          </el-button>
          <el-button
            v-if="showBtn.isImport"
            type="primary"
            size="small"
            @click="showUploadForm(true)"
          >
            <i class="el-icon-upload"></i>
            导入
          </el-button>
          <el-button type="primary" size="small">
            <i class="el-icon-download"></i>
            <a
              href="/api/export/exportMajor?isDefault=undefined"
              style="color:#fff;margin-left:5px"
              download="专业信息"
            >导出</a>
          </el-button>
          <el-button type="primary" size="small">
            <i class="el-icon-download"></i>
            <a
              href="/api/export/exportMajor?isDefault=default"
              style="color:#fff;margin-left:5px"
              download="专业信息"
            >导出模板</a>
          </el-button>
        </el-button-group>
      </div>
      <el-input v-model="input" placeholder="模糊查询"></el-input>
      <el-button type="primary" size="small" @click="search">查询</el-button>
    </div>
    <el-table
      border
      ref="multipleTable"
      :data="majorList"
      tooltip-effect="dark"
      style="width: 100%"
      height="520"
      @selection-change="handleSelectionChange"
    >
      <el-table-column fixed align="center" type="selection" width="55"></el-table-column>
      <el-table-column align="center" prop="major_id" label="ID" width="60"></el-table-column>
      <el-table-column align="center" prop="major_name" label="专业名称" width="120"></el-table-column>
      <el-table-column align="center" prop="major_year" label="专业学制" width="100"></el-table-column>
      <el-table-column align="center" prop="department_name" label="专业院系" width="120"></el-table-column>
      <el-table-column align="center" prop="major_detail" label="专业介绍" min-width="300">
        <template slot-scope="scope">
          <el-popover width="500" trigger="click" :content="scope.row.major_detail" placement="top">
            <div slot="reference" class="nowrap">{{ scope.row.major_detail }}</div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="create_username" label="上传者" width="120"></el-table-column>
      <el-table-column fixed="right" align="center" label="操作" min-width="270">
        <template slot-scope="scope">
          <el-button
            v-if="showBtn.isEdit"
            @click="showMajorForm(true, scope.row, $event)"
            type="success"
            size="mini"
          >编辑</el-button>
          <el-button
            v-if="showBtn.isShowDirect"
            @click="toDirectManage(scope.row)"
            type="primary"
            size="mini"
          >方向管理</el-button>
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
    <majorForm
      :majorFormVisible="majorFormVisible"
      @close="showMajorForm"
      :majorForm="majorForm"
      :formTitle="formTitle"
    />
    <upload-form :uploadFormVisible="uploadFormVisible" @close="showUploadForm" />
  </div>
</template>

<script>
import majorForm from "./majorForm";
import uploadForm from "./uploadForm";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  components: {
    majorForm,
    uploadForm
  },
  data() {
    return {
      input: "",
      majorFormVisible: false,
      majorForm: {
        major_name: "",
        major_year: "",
        department_id: "",
        major_detail: ""
      },
      uploadFormVisible: false,
      formTitle: "",
      majorModule: null,
      showBtn: {
        isAdd: false,
        isDel: false,
        isImport: false,
        isEdit: false,
        isShowDirect: false
      }
    };
  },
  created() {
    this.majorModule = this.showModuleList.filter(item => {
      if (item.name == "专业管理") {
        return true;
      } else {
        return false;
      }
    });
    this.majorModule[0].children.forEach(item => {
      switch (item.name) {
        case "专业添加":
          this.showBtn.isAdd = true;
          break;
        case "专业删除":
          this.showBtn.isDel = true;
          break;
        case "专业导入":
          this.showBtn.isImport = true;
          break;
        case "专业修改":
          this.showBtn.isEdit = true;
          break;
        case "方向管理":
          this.showBtn.isShowDirect = true;
          break;
        default:
          break;
      }
    });
  },
  mounted() {
    this.findByPage({ page: this.currentPage, pageSize: this.pageSize });
  },
  computed: {
    ...mapState("major", [
      "multipleSelection",
      "currentPage",
      "pageSize",
      "count",
      "majorList"
    ]),
    ...mapState("role", ["showModuleList"])
  },
  methods: {
    ...mapMutations("major", ["setPage", "setPageSize", "setSelection"]),
    ...mapActions("major", [
      "findByPage",
      "delMajors",
      "searchMajors",
      "updateMajor"
    ]),
    ...mapMutations("direction", ["setMajorId"]),
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
    // 展示专业表单
    showMajorForm(isShow, row, e) {
      this.majorFormVisible = isShow;
      if(e) {
        this.formTitle = "编辑";
        this.majorForm = { ...row };
      }else {
        this.formTitle = "添加";
      }
    },
    // 展示方向管理模块
    toDirectManage(row) {
      this.setMajorId(row.major_id);
      this.$emit("show", false);
    },
    del() {
      const length = this.multipleSelection.length;
      this.$confirm(`是否删除选中的${length}个专业信息?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.delMajors(this.multipleSelection).then(res => {
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
    showUploadForm(isShow) {
      this.uploadFormVisible = isShow;
    },
    search() {
      if (this.input == "") {
        this.findByPage({ page: this.currentPage, pageSize: this.pageSize });
      } else {
        this.searchMajors(this.input);
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