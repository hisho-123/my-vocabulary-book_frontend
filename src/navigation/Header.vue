<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";

const route = useRoute();
const bookTitle = ref("");

const title = computed(() => {
  if (route.path === "/home") {
    return "ホーム";
  }
  if (route.path.startsWith("/book/")) {
    return bookTitle.value;
  }
  return route.path.substring(1);
});

onMounted(() => {
  // TODO: APIから単語帳の情報を取得
  // 仮の実装
  bookTitle.value = "英単語帳1";
});
</script>
<template>
  <div class="header">{{ title }}</div>
</template>
<style lang="scss" scoped>
.header {
  height: 100%;
  font-size: 36px;
}
</style>
