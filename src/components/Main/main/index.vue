<template>
  <div class="main">
    <div class="main-title">通知公告</div>
    <div class="message-list">
      <div class="message-item" v-for="(item,index) in showMesList" :key="index">
        <div class="message-title">{{item.message_title}}</div>
        <div class="message-content">{{item.message_detail}}</div>
        <div class="message-time">{{item.time}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  mounted() {
    this.findShowMes({ page: 1, pageSize: 4 });
  },
  computed: {
    ...mapState("message", ["showMesList"]),
  },
  methods: {
    ...mapActions("message", ["findShowMes"]),
  }
};
</script>
