<template>
  <div class="stuForm">
    <el-dialog
      title="导入"
      :visible.sync="uploadFormVisible"
      :before-close="handleClose"
      @closed="reset"
      :modal-append-to-body="false"
      width="500px"
      top="0"
    >
      <el-form :model="uploadForm" status-icon :rules="rules" ref="uploadForm" label-width="100px">
        <el-form-item label="专业院系" prop="department_id">
          <el-select v-model="uploadForm.department_id" placeholder="请选择">
            <el-option
              v-for="item in deptList"
              :key="item.department_id"
              :label="item.department_name"
              :value="item.department_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="uploadExcel" size="small">上传文件</el-button>
          <span :style="filenameStyle">{{filename}}</span>
          <input
            v-show="false"
            type="file"
            ref="uploadExcel"
            @change="readExcel"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.stop="submitForm">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import XLSX from "xlsx";
export default {
  props: ["uploadFormVisible"],
  data() {
    return {
      filename: "",
      filenameStyle: "font-size:12px; margin-left:5px;",
      outdata: [],
      uploadForm: {
        department_id: "",
      },
      rules: {
        department_id: [{ required: true, message: "请选择专业院系", trigger: "change" }]
      }
    };
  },
  computed: {
    ...mapState("major", ["majorList"]),
    ...mapState("department", ["deptList"]),
    ...mapState("loginUser", ["user"])
  },
  methods: {
    ...mapActions("major", ["addMajors"]),
    handleClose() {
      this.$emit("close", false);
    },
    reset() {
      this.$refs.uploadForm.resetFields();
      //重置 file类型的input
      this.filename = "";
      this.filenameStyle = "font-size:12px; margin-left:5px;";
      this.$refs.uploadExcel.value = "";
    },
    uploadExcel() {
      this.$refs.uploadExcel.click();
    },
    readExcel(e) {
      const files = e.target.files[0];
      if (!files) return; //如果没有文件名
      this.filename = files.name;
      this.filenameStyle = "font-size:12px; margin-left:5px;"
      const fileReader = new FileReader();
      let wb; //读取excel的数据
      let outdata;
      fileReader.onload = f => {
        const data = f.target.result;
        wb = XLSX.read(data, {
          type: "binary"
        });
        var fromTo = ""; //表格的范围，用于判断表头数量是否正确
        if (wb.Sheets.hasOwnProperty(wb.SheetNames[0])) {
          fromTo = wb.Sheets[wb.SheetNames[0]]["!ref"]; // output: A1:C
          if (fromTo.includes("A") && fromTo.includes("C")) {
            outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
            outdata = outdata.map(item => {
              return {
                major_name: item["专业名称"] ? item["专业名称"] : "",
                major_year: item["专业学制"] ? +item["专业学制"] : "",
                major_detail: item["专业介绍"] ? item["专业介绍"] : ""
              };
            });
            this.outdata = outdata;
          }
        }
      };
      fileReader.readAsBinaryString(files);
    },
    submitForm() {
      this.$refs.uploadForm.validate(valid => {
        //判断是否选择文件
        if (this.filename == "") {
          this.filename = "请选择文件";
          this.filenameStyle = "font-size:12px; margin-left:5px; color:#F56C6C;";
        } else if (!valid) {
          //选择框规则校验若不通过
          return;
        } else {
          //满足所有选择条件
          const importData = this.outdata.map(item => {
            return {
              ...item,
              department_id: this.uploadForm.department_id,
              create_username: this.user.name
            };
          });
          // console.log(importData);
          if (this.testImportData(importData) || importData.length == 0) {
            //导入的数据包含已有的学生信息
            this.$message({
              message: "导入失败！",
              type: "error",
              duration: 2000,
              center: true
            });
          } else { //批量插入数据
            this.addMajors(importData);
          }
          this.handleClose();
        }
      });
    },
    // 检查已有的学生信息是否存在导入数据中
    testImportData(data) {
      const idArr = data.map(item => {
        return {
            major_name: item.major_name,
            department_id: item.department_id
        };
      });
      const length = idArr.length;
      const isHas = this.majorList.some(item => {
        for (let i = 0; i < length; i++) {
          if (item.major_name == idArr[i].major_name && item.department_id == idArr[i].department_id) {
            return true;
            break;
          } else {
            return false;
          }
        }
      });
      return isHas;
    }
  }
};
</script>

<style>
</style>