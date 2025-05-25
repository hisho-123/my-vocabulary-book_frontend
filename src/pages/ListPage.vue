<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { page, common } from '@/term';
import Button from '@/components/Button/index.vue';
import { getBook } from '@/api/book';

const route = useRoute();
const router = useRouter();
const bookId = Number(route.params.id);

interface Word {
  id: number;
  word: string;
  translated: string;
}

const bookName = ref('');
const isEditingBookName = ref(false);
const editedBookName = ref('');
const words = ref<Word[]>([]);
const showAddDialog = ref(false);
const newWord = ref({
  word: '',
  translation: '',
});
const showEditDialog = ref(false);
const editingWord = ref<Word>({
  id: 0,
  word: '',
  translated: '',
});

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

const navigateBack = () => {
  router.push(`/book/${bookId}`);
};

const navigateToAdd = () => {
  router.push({
    path: '/edit/new',
    query: { bookId: bookId.toString() }
  });
};

const handleSave = () => {
  // TODO: Implement the logic to save the book
};

const openAddDialog = () => {
  newWord.value = {
    word: '',
    translation: '',
  };
  showAddDialog.value = true;
};

const closeAddDialog = () => {
  showAddDialog.value = false;
};

const addWord = () => {
  // TODO: APIで単語を追加
  words.value.push({
    id: words.value.length + 1, // 仮のID
    word: newWord.value.word,
    translated: newWord.value.translation,
  });
  closeAddDialog();
};

const openEditDialog = (word: Word) => {
  editingWord.value = { ...word };
  showEditDialog.value = true;
};

const closeEditDialog = () => {
  showEditDialog.value = false;
  editingWord.value = {
    id: 0,
    word: '',
    translated: '',
  };
};

const updateWord = () => {
  if (!editingWord.value) return;
  // TODO: APIで単語を更新
  const index = words.value.findIndex(w => w.id === editingWord.value?.id);
  if (index !== -1) {
    words.value[index] = { ...editingWord.value };
  }
  closeEditDialog();
};

onMounted(async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    const response = await getBook(token, bookId.toString());
    bookName.value = response.bookName;
    words.value = response.words;
    console.log(words.value);
  } catch (error) {
    console.error('単語の取得に失敗しました:', error);
  }
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
            color="primary"
            :content="common.buttons.save"
            secondBtn
            secondBtnColor="white"
            :secondBtnContent="common.buttons.back"
            @firstClick="handleSave"
            @secondClick="navigateBack"
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
            @click="openEditDialog(word)"
          >
            <v-list-item-title>{{ word.word }}</v-list-item-title>
            <v-list-item-subtitle>{{ word.translated }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>
        <div class="text-center mt-4">
          <Button
            color="primary"
            content="単語を追加"
            @firstClick="openAddDialog"
          />
        </div>
      </v-col>
    </v-row>
  </v-container>

  <v-dialog v-model="showAddDialog" max-width="500">
    <v-card>
      <v-card-title>{{ page.edit.title }}</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="addWord">
          <v-text-field
            v-model="newWord.word"
            :label="common.labels.word"
            required
          />
          <v-text-field
            v-model="newWord.translation"
            :label="common.labels.translation"
            required
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <Button
          color="white"
          :content="common.buttons.cancel"
          @firstClick="closeAddDialog"
        />
        <Button
          color="primary"
          :content="common.buttons.save"
          @firstClick="addWord"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- 編集用ダイアログ -->
  <v-dialog v-model="showEditDialog" max-width="500">
    <v-card>
      <v-card-title>{{ page.edit.title }}</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="updateWord">
          <v-text-field
            v-model="editingWord.word"
            :label="common.labels.word"
            required
          />
          <v-text-field
            v-model="editingWord.translated"
            :label="common.labels.translation"
            required
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <Button
          color="white"
          :content="common.buttons.cancel"
          @firstClick="closeEditDialog"
        />
        <Button
          color="primary"
          :content="common.buttons.save"
          @firstClick="updateWord"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
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
