<template>
  <div class="major">
    <major-table v-if="isShowMajor" @show="show" />
    <direct-table v-else @show="show" />
  </div>
</template>

<script>
import majorTable from "./majorTable";
import directTable from "./directTable";
export default {
  components: {
    majorTable,
    directTable
  },
  data() {
    return {
      isShowMajor: true,
    };
  },
  methods: {
    show(val) {
      this.isShowMajor = val;
    }
  }
};
</script>

<style>
</style>