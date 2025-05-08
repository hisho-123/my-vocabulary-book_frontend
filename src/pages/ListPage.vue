<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { page, common } from '@/term';
import Button from '@/components/Button/index.vue';

const route = useRoute();
const router = useRouter();
const bookId = Number(route.params.id);

interface Word {
  id: number;
  word: string;
  translation: string;
}

const words = ref<Word[]>([
  { id: 1, word: 'apple', translation: 'りんご' },
  { id: 2, word: 'banana', translation: 'バナナ' },
  { id: 3, word: 'orange', translation: 'オレンジ' },
]);

const navigateToEdit = (wordId: number) => {
  router.push(`/edit/${wordId}`);
};

const navigateBack = () => {
  router.push(`/book/${bookId}`);
};

onMounted(() => {
  // TODO: APIから単語リストのデータを取得
});
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div class="d-flex justify-space-between align-center mb-4">
          <h1 class="text-h4">{{ page.list.title }}</h1>
          <Button
            color="white"
            :content="common.buttons.back"
            @firstClick="navigateBack"
          />
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-list>
          <v-list-item
            v-for="word in words"
            :key="word.id"
            @click="navigateToEdit(word.id)"
          >
            <v-list-item-title>{{ word.word }}</v-list-item-title>
            <v-list-item-subtitle>{{ word.translation }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.v-list-item {
  cursor: pointer;
  transition: background-color 0.2s;
}

.v-list-item:hover {
  background-color: rgba(0, 0, 0, 0.04);
}
</style> 