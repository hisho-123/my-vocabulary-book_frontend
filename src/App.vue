<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import Sidebar from "@/navigation/Sidebar.vue";
import Header from "@/navigation/Header.vue";

const route = useRoute();
const isLoginPage = computed(() => route.name === 'Login');
const isSidebarOpen = ref(true);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const checkScreenSize = () => {
  isSidebarOpen.value = window.innerWidth > 510;
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize);
});
</script>
<template>
  <div class="display" :class="{ 'login-layout': isLoginPage }">
    <template v-if="!isLoginPage">
      <div class="header">
        <v-btn
          icon="mdi-menu"
          class="menu-button"
          @click="toggleSidebar"
        />
        <Header />
      </div>
      <div class="main-content">
        <div class="sidebar" :class="{ 'sidebar-closed': !isSidebarOpen }">
          <Sidebar />
        </div>
        <div class="page" :class="{ 'page-expanded': !isSidebarOpen }">
          <div class="body">
            <router-view />
          </div>
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
  flex-direction: column;
  padding: 0 !important;

  &.login-layout {
    justify-content: center;
    align-items: center;
    background-color:rgb(100, 100, 100);
  }
}

.header {
  height: 64px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 16px;
  background-color: #000000;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.main-content {
  display: flex;
  flex: 1;
  overflow: hidden;
  position: relative;
}

.page {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 16px;
  transition: margin-left 0.3s ease;
  margin-left: 200px;

  &.page-expanded {
    margin-left: 0;
  }
}

.sidebar {
  position: absolute;
  left: 0;
  top: 0;
  background-color: #ffffff;
  height: 100%;
  width: 200px;
  transition: transform 0.3s ease;
  border-right: 1px solid rgba(0, 0, 0, 0.12);

  &.sidebar-closed {
    transform: translateX(-200px);
  }
}

.menu-button {
  margin-right: 16px;
}
</style>
