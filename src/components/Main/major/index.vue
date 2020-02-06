<template>
  <div class="major">
    <major-table v-if="isShowMajor" @show="show" :tableData="majorTableData" />
    <direct-table v-else @show="show" :tableData="directTableData" />
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
      majorTableData: [
        {
          major_id: 1,
          major_name: "软件工程",
          major_year: '4年',
          department: '计算机院',
          create_username: "admin",
          major_detail:
            "既系统掌握软件工程理论、知识，技能和方法，又掌握最新的软件开发技术和软件项目管理方法，又能熟练使用流行的软件开发平台与工具，同时拥有良好的软件开发实践能力和软件工程素养，且拥有较强的创新创业意识和能力，成为充分适应IT行业发展的应用型高级技术人才。"
        },
        {
          major_id: 2,
          major_name: "商务英语",
          major_year: '4年',
          department: '商务管理学院',
          create_username: "admin",
          major_detail:
            "既系统掌握软件工程理论、知识，技能和方法，又掌握最新的软件开发技术和软件项目管理方法，又能熟练使用流行的软件开发平台与工具，同时拥有良好的软件开发实践能力和软件工程素养，且拥有较强的创新创业意识和能力，成为充分适应IT行业发展的应用型高级技术人才。"
        },
        {
          major_id: 3,
          major_name: "电子商务",
          major_year: '4年',
          department: '计算机院',
          create_username: "admin",
          major_detail:
            "既系统掌握软件工程理论、知识，技能和方法，又掌握最新的软件开发技术和软件项目管理方法，又能熟练使用流行的软件开发平台与工具，同时拥有良好的软件开发实践能力和软件工程素养，且拥有较强的创新创业意识和能力，成为充分适应IT行业发展的应用型高级技术人才。"
        },
        {
          major_id: 4,
          major_name: "软件工程",
          major_year: '4年',
          department: '计算机院',
          create_username: "admin",
          major_detail:
            "既系统掌握软件工程理论、知识，技能和方法，又掌握最新的软件开发技术和软件项目管理方法，又能熟练使用流行的软件开发平台与工具，同时拥有良好的软件开发实践能力和软件工程素养，且拥有较强的创新创业意识和能力，成为充分适应IT行业发展的应用型高级技术人才。"
        }
      ],
      directTableData: [
        {
          direction_id: 1,
          direction_name: "安卓",
          direction_detail:
            "安卓描述安卓描述安卓描述安卓描述安卓描述安卓描述安卓描述安卓描述安卓描述",
          grade: "2016级",
          limit_num: 100,
          selected_num: 32,
          create_time: "2019-01-01 09:50:20",
          update_time: "2019-01-01 09:50:20",
          operation_username: "admin"
        }
      ]
    };
  },
  mounted() {

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