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
            node-key="id"
            :data="moduleList"
            :default-checked-keys="checkedList"
            :expand-on-click-node="false"
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
  computed: {
    ...mapState("role", ["moduleList", "checkedList"])
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
      if (!data.parent_id) return;
      this.$refs.tree.setChecked(data.parent_id, true);
    },
    submit() {
      const checkedNodes = this.$refs.tree.getCheckedNodes();
      const form = checkedNodes.map(item => {
        return {
          ...item,
          role_id: this.role_id
        };
      });
      this.dispatchPower(form).then(res => {
        this.$message({
          message: res.msg,
          type: "success",
          duration: 2000,
          center: true
        });
      });
      this.hanldeClose();
    }
  }
};
</script>

<style>
</style>