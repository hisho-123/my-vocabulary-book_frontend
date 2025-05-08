<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { applicationName } from './navigation.ts';

const route = useRoute();
const router = useRouter();

interface VocabularyBook {
  id: number;
  title: string;
}

const vocabularyBooks = ref<VocabularyBook[]>([
  { id: 1, title: '英単語帳1' },
  { id: 2, title: '英単語帳2' },
  { id: 3, title: '英単語帳3' },
]);

const navigateToBook = (bookId: number) => {
  router.push(`/book/${bookId}`);
};

const navigateToHome = () => {
  router.push('/home');
};

const isCurrentBook = (bookId: number) => {
  return route.params.id === String(bookId);
};

const isHome = () => {
  return route.path === '/home';
};

onMounted(() => {
  // TODO: APIから単語帳リストを取得
});
</script>

<template>
  <div class="sidebar">
    <div class="appName">{{ applicationName }}</div>
    <div class="book-list">
      <div
        v-for="book in vocabularyBooks"
        :key="book.id"
        class="book-item"
        :class="{ 'active': isCurrentBook(book.id) }"
        @click="navigateToBook(book.id)"
      >
        <span class="material-symbols-outlined" :class="{ 'fill': isCurrentBook(book.id) }">
          menu_book
        </span>
        <div class="book-title">{{ book.title }}</div>
      </div>
    </div>
    <div class="home-button">
      <div
        class="book-item"
        :class="{ 'active': isHome() }"
        @click="navigateToHome"
      >
        <span class="material-symbols-outlined" :class="{ 'fill': isHome() }">
          home
        </span>
        <div class="book-title">ホーム</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.appName {
  height: 50px;
  font-size: 20px;
  padding: 16px;
  font-weight: bold;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  color: #000000;
}

.sidebar {
  width: 100%;
  height: 100%;
  text-align: left;
  background-color: #ffffff;
  color: #000000;
  display: flex;
  flex-direction: column;
}

.book-list {
  padding: 8px;
  flex-grow: 1;
}

.home-button {
  padding: 8px;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
}

.book-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.2s;
  color: #000000;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }

  &.active {
    background-color: rgba(var(--v-theme-primary), 0.1);
    color: rgb(var(--v-theme-primary));
  }
}

.material-symbols-outlined {
  margin-right: 12px;
  font-size: 20px;
  color: inherit;

  &.fill {
    font-variation-settings: "FILL" 1;
  }
}

.book-title {
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: inherit;
}
</style>
