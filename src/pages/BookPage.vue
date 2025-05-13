<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import WordCard from '@/components/WordCard/index.vue';
import Button from '@/components/Button/index.vue';

const route = useRoute();
const router = useRouter();
const bookId = Number(route.params.id);
const bookName = ref('');

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

const currentIndex = ref(0);
const currentWord = ref(words.value[0]);
const showTranslation = ref(false);

const nextWord = () => {
  if (currentIndex.value < words.value.length - 1) {
    currentIndex.value++;
    currentWord.value = words.value[currentIndex.value];
    showTranslation.value = false;
  }
};

const previousWord = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
    currentWord.value = words.value[currentIndex.value];
    showTranslation.value = false;
  }
};

const navigateToEdit = () => {
  router.push(`/list/${bookId}`);
};

onMounted(async () => {
  // TODO: APIから単語帳のデータを取得
  // 仮のデータとして単語帳の名前を設定
  bookName.value = `単語帳 ${bookId}`;
});
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div class="d-flex justify-space-between align-center mb-4">
          <h1 class="text-h4">{{ bookName }}</h1>
          <Button
            color="primary"
            content="編集"
            @firstClick="navigateToEdit"
          />
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <WordCard
          :word="currentWord.word"
          :translation="currentWord.translation"
          v-model:showTranslation="showTranslation"
        />
      </v-col>
    </v-row>
    <v-row class="mt-4">
      <v-col cols="12" class="d-flex justify-center">
        <Button
          color="primary"
          content=""
          :disabled="currentIndex === words.length - 1"
          icon="mdi-chevron-right"
          :secondBtn="true"
          secondBtnContent=""
          secondBtnColor="primary"
          :secondBtnDisabled="currentIndex === 0"
          secondBtnIcon="mdi-chevron-left"
          @firstClick="nextWord"
          @secondClick="previousWord"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="text-center">
        <span class="text-body-2">
          {{ currentIndex + 1 }} / {{ words.length }}
        </span>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
</style> 
