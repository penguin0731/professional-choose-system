<template>
  <div class="professionalTask">
    <proTaskTable v-if="isShowProTask" @show="show" />
    <taskDetailTable v-else @show="show" />
  </div>
</template>

<script>
import proTaskTable from "./proTaskTable";
import taskDetailTable from "./taskDetailTable";
export default {
  components: {
    proTaskTable,
    taskDetailTable
  },
  data() {
    return {
      isShowProTask: true,
    };
  },
  methods: {
    show(val) {
      this.isShowProTask = val;
    }
  }
};
</script>

<style>
</style>