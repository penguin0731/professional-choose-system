<template>
  <div class="chooseDirection">
    <cho-direct-table :table-data="tableData" />
  </div>
</template>

<script>
import choDirectTable from "./choDirectTable";
export default {
  components: {
    choDirectTable
  },
  data() {
    return {
      tableData: [
        {
          task_id: 1,
          start_time: "2019-11-01 12:00:00",
          end_time: "2019-11-07 12:00:00",
          task_state: '进行中',
          direction_name: '',
          selected_time: ''
        }
      ]
    };
  }
};
</script>

<style>
</style>