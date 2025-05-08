<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Sidebar from "@/navigation/Sidebar.vue";
import Header from "@/navigation/Header.vue";

const route = useRoute();
const isLoginPage = computed(() => route.name === 'Login');
</script>
<template>
  <div class="display" :class="{ 'login-layout': isLoginPage }">
    <template v-if="!isLoginPage">
      <div class="sidebar">
        <Sidebar />
      </div>
      <div class="page">
        <div class="header">
          <Header />
        </div>
        <div class="body">
          <router-view />
        </div>
      </div>
    </template>
    <template v-else>
      <router-view />
    </template>
  </div>
</template>
<style lang="scss">
.display {
  height: 100vh;
  width: 100vw;
  display: flex;
  padding: 0 !important;

  &.login-layout {
    justify-content: center;
    align-items: center;
    background-color: #f5f5f5;
  }
}
.page {
  width: calc(100% - 200px);
  display: flex;
  flex-direction: column;
  padding-left: 32px;
}
.header {
  height: calc(100% / 10);
}
.sidebar {
  background-color: aliceblue;
  height: 100%;
  width: 200px;
}
</style>
