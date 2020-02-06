<template>
  <div class="teachForm">
    <el-dialog
      :title="formTitle"
      :visible.sync="editFormVisible"
      :before-close="hanldeClose"
      :modal-append-to-body="false"
      width="500px"
      top="0"
    >
      <el-form :model="editForm" status-icon :rules="rules" ref="editForm" label-width="100px">
        <el-form-item label="工号" prop="login_id">
          <el-input v-model="editForm.login_id" disabled autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="editForm.name" :disabled="isDisabled" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="editForm.gender" placeholder="请选择" :disabled="isDisabled">
            <el-option label="男" :value="0" :class="{selected: editForm.gender == '男'}"></el-option>
            <el-option label="女" :value="1" :class="{selected: editForm.gender == '女'}"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="院系" prop="dept_id">
          <el-select v-model="editForm.dept_id" placeholder="请选择" :disabled="isDisabled">
            <el-option
              v-for="item in deptList"
              :key="item.department_id"
              :label="item.department_name"
              :value="item.department_id"
              :class="{selected: editForm.dept_id == item.department_id}"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="身份" prop="role_id">
          <el-select v-model="editForm.role_id" placeholder="请选择" :disabled="isDisabled">
            <el-option
              v-for="item in teachRoleList"
              :key="item.role_id"
              :label="item.role_name"
              :value="item.role_id"
              :class="{selected: editForm.role_id == item.role_id}"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="person_status">
          <el-select v-model="editForm.person_status" placeholder="请选择" :disabled="isDisabled">
            <el-option
              v-for="item in personStatusArr"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :class="{selected: editForm.person_status == item.label}"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="!isDisabled">
          <el-button type="primary" @click.stop="submitForm('editForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  props: ["editFormVisible", "editForm", "isDisabled", "formTitle"],
  data() {
    return {
      personStatusArr: [
        {
          label: "离职",
          value: 0
        },
        {
          label: "在职",
          value: 1
        }
      ],
      rules: {
        login_id: [{ required: true, message: "请输入学号", trigger: "blur" }],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        gender: [{ required: true, message: "请选择性别", trigger: "change" }],
        dept_id: [{ required: true, message: "请选择院系", trigger: "change" }],
        role_id: [{ required: true, message: "请选择身份", trigger: "change" }],
        person_status: [{ required: true, message: "请选择状态", trigger: "change" }]
      }
    };
  },
  computed: {
    ...mapState("department", ["deptList"]),
    ...mapState("role", ["teachRoleList"])
  },
  methods: {
    ...mapActions("teacher", ["updateTeacher"]),
    hanldeClose() {
      this.$emit("close", false);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) return;
        const {
          login_id,
          name,
          gender,
          phone,
          email,
          dept_id,
          role_id,
          person_status
        } = this.editForm;
        const params = {
          login_id,
          name,
          gender,
          phone,
          email,
          dept_id,
          role_id,
          person_status
        };
        this.updateTeacher(params);
        this.$emit("close", false);
      });
    }
  }
};
</script>
