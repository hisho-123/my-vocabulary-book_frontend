<script setup lang="ts">
import { ref, onMounted } from "vue";
import { applicationName } from "./navigation.ts";

const bookTitle = ref("");

onMounted(() => {
  // TODO: APIから単語帳の情報を取得
  // 仮の実装
  bookTitle.value = "英単語帳1";
});
</script>
<template>
  <div class="header">{{ applicationName }}</div>
</template>
<style lang="scss" scoped>
.header {
  height: 100%;
  font-size: 36px;
}
</style>
