<template>
  <div class="chooseDirection">
    <cho-direct-table />
  </div>
</template>

<script>
import choDirectTable from "./choDirectTable";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    choDirectTable
  },
  created() {
    const { grade_id, major_id, login_id } = this.user;
    this.findTaskByUser({ grade_id, major_id, login_id });
  },
  computed: {
    ...mapState("loginUser", ["user"])
  },
  methods: {
    ...mapActions("taskSelected", ["findTaskByUser"])
  }
};
</script>

<style>
</style>