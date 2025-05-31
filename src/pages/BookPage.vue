<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import WordCard from '@/components/WordCard/index.vue';
import Button from '@/components/Button/index.vue';
import { getBook, deleteBook as deleteBookApi } from '@/api/book';
import { common } from '@/term';

const route = useRoute();
const router = useRouter();
const bookId = ref(Number(route.params.id));
const bookName = ref('');

interface Word {
  word: string;
  translated: string;
}

const words = ref<Word[]>([]);
const currentIndex = ref(0);
const currentWord = ref<Word | null>(null);
const showTranslation = ref(false);
const showDeleteDialog = ref(false);

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
  router.push(`/list/${bookId.value}`);
};

const deleteBook = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    await deleteBookApi(token, bookId.value);
    router.push('/home');
  } catch (error) {
    console.error('単語帳の削除に失敗しました:', error);
  }
};

const fetchBookData = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    const response = await getBook(token, bookId.value.toString());
    bookName.value = response.bookName;
    words.value = response.words;
    if (words.value.length > 0) {
      currentWord.value = words.value[0];
    }
  } catch (error) {
    console.error('単語の取得に失敗しました:', error);
  }
};

watchEffect(() => {
  const newBookId = Number(route.params.id);
  if (newBookId !== bookId.value) {
    bookId.value = newBookId;
    fetchBookData();
  }
});

onMounted(fetchBookData);
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div class="d-flex justify-space-between align-center mb-4">
          <h1 class="text-h4">{{ bookName }}</h1>
          <Button
            color="primary"
            :content="common.buttons.delete"
            @firstClick="showDeleteDialog = true"
          />
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <WordCard
          :word="currentWord?.word"
          :translation="currentWord?.translated"
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

  <v-dialog v-model="showDeleteDialog" max-width="400">
    <v-card>
      <v-card-title>{{ bookName }}</v-card-title>
      <v-card-text>
        {{ common.messages.deleteBookConfirm }}
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <Button
          color="red"
          :content="common.buttons.cancel"
          @firstClick="showDeleteDialog = false"
        />
        <Button
          color="primary"
          :content="common.buttons.delete"
          @firstClick="deleteBook"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
</style> 
