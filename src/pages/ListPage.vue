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

const bookName = ref('単語帳1');
const isEditingBookName = ref(false);
const editedBookName = ref('');

const words = ref<Word[]>([
  { id: 1, word: 'apple', translation: 'りんご' },
  { id: 2, word: 'banana', translation: 'バナナ' },
  { id: 3, word: 'orange', translation: 'オレンジ' },
]);

const startEditingBookName = () => {
  editedBookName.value = bookName.value;
  isEditingBookName.value = true;
};

const saveBookName = () => {
  bookName.value = editedBookName.value;
  isEditingBookName.value = false;
  // TODO: APIで単語帳名を更新
};

const cancelEditingBookName = () => {
  isEditingBookName.value = false;
};

const navigateToEdit = (wordId: number) => {
  router.push(`/edit/${wordId}`);
};

const navigateBack = () => {
  router.push(`/book/${bookId}`);
};

const navigateToAdd = () => {
  router.push(`/edit/new`);
};

onMounted(() => {
  // TODO: APIから単語リストのデータを取得
});
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 mb-4">{{ page.list.title }}</h1>
        <div class="d-flex justify-space-between align-center mb-4">
          <div v-if="!isEditingBookName" class="d-flex align-center">
            <h2 class="text-h5 mr-2">{{ bookName }}</h2>
            <v-btn icon size="small" @click="startEditingBookName">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </div>
          <div v-else class="d-flex align-center">
            <v-text-field
              v-model="editedBookName"
              density="compact"
              hide-details
              class="mr-2"
              @keyup.enter="saveBookName"
            ></v-text-field>
            <v-btn icon size="small" color="success" @click="saveBookName">
              <v-icon>mdi-check</v-icon>
            </v-btn>
            <v-btn icon size="small" color="error" @click="cancelEditingBookName">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
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
        <div class="text-center mt-4">
          <Button
            color="primary"
            content="単語を追加"
            @firstClick="navigateToAdd"
          />
        </div>
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
