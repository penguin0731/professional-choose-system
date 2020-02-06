<template>
  <div class="main-content">
    <el-tabs 
      v-model="editableTabsValue" 
      type="card" 
      @tab-click="changeEditableTabsValue" 
      @tab-remove="removeTab" >
      <el-tab-pane
        v-for="item in editableTabs"
        :key="item.name"
        :label="item.label"
        :name="item.name"
        :closable="item.close"
      >
        <keep-alive>
          <component :is="item.name" />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import myMain from '@/components/Main/main';
import Student from '@/components/Main/student';
import Teacher from '@/components/Main/teacher';
import Major from '@/components/Main/major';
import professionalTask from '@/components/Main/proTask';
import Grade from '@/components/Main/grade';
import Department from '@/components/Main/department';
import Role from '@/components/Main/role';
import Message from '@/components/Main/message';
import PersonMsg from '@/components/Main/personMsg';
import ChooseDirection from '@/components/Main/chooseDirection';

import axios from 'axios';
import { mapState, mapMutations, mapActions } from "vuex";
export default {
    components: {
      myMain,
      Student,
      Teacher,
      Major,
      professionalTask,
      Grade,
      Department,
      Role,
      Message,
      PersonMsg,
      ChooseDirection,
    },
  data() {
    return {};
  },
  computed: {
    ...mapState('tabs', ["editableTabs"]),
    editableTabsValue: {
        get() {
            return this.$store.state.tabs.editableTabsValue;
        },
        set(val) {}
    },
  },
  methods: {
    ...mapMutations('tabs', ["changeEditableTabsValue", "setTab", "removeTab"]),
  }
};
</script>

<style lang="scss">
@import "@/assets/css/index/main.scss";
</style>
