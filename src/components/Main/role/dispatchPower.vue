<template>
  <div class="mesForm">
    <el-dialog
      title="分配权限"
      :visible.sync="dispatchFormVisible"
      :before-close="hanldeClose"
      @closed="reset"
      :modal-append-to-body="false"
      width="350px"
      top="260px"
    >
      <el-form label-width="80px">
        <el-form-item>
          <el-tree
            ref="tree"
            node-key="resource_id"
            :data="moduleList"
            :default-checked-keys="checkedList"
            :expand-on-click-node="false"
            :props="defaultProps"
            @check="nodeCheck"
            check-strictly
            show-checkbox
            check-on-click-node
            default-expand-all
          ></el-tree>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.stop="submit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  props: ["dispatchFormVisible", "role_id"],
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "name"
      }
    };
  },
  computed: {
    ...mapState("role", ["moduleList", "checkedList"]),
    checkedNodesArr() {
      return this.$refs.tree.getCheckedNodes().map(item => item.resource_id);
    }
  },
  methods: {
    ...mapMutations("role", ["setCheckedList"]),
    ...mapActions("role", ["dispatchPower"]),
    hanldeClose() {
      this.$emit("close", false);
    },
    reset() {
      this.$refs.tree.setCheckedKeys([]);
    },
    nodeCheck(data) {
      //若勾选子节点,则自动勾选父节点
      if (!this.checkedNodesArr.includes(data.resource_id) && data.resource_parent_id == 1) {
        data.children.forEach(item => {
          this.$refs.tree.setChecked(item.resource_id, false);
        });
      };
      this.$refs.tree.setChecked(data.resource_parent_id, true);
    },
    submit() {
      const form = this.getRoleResourceList();
      if (form[0].length != 0 || form[1].length != 0) {
        this.dispatchPower(form).then(res => {
          this.$message({
            message: res.msg,
            type: "success",
            duration: 2000,
            center: true
          });
        });
      }
      this.hanldeClose();
    },
    getRoleResourceList() {
      // const checkedNodes = this.$refs.tree.getCheckedNodes();
      // const checkedNodesArr = checkedNodes.map(item => item.id);
      let addPowerForm = this.checkedNodesArr.filter(item => {
        //获取新增的权限
        if (!this.checkedList.includes(item)) return true;
      });
      let delPowerForm = this.checkedList.filter(item => {
        //获取撤销的权限
        if (!this.checkedNodesArr.includes(item)) return true;
      });
      addPowerForm = addPowerForm.map(item => ({
        id: item,
        role_id: this.role_id
      }));
      delPowerForm = delPowerForm.map(item => ({
        id: item,
        role_id: this.role_id
      }));
      return [addPowerForm, delPowerForm];
    }
  }
};
</script>

<style>
</style>