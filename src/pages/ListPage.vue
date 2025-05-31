<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { page, common } from '@/term';
import Button from '@/components/Button/index.vue';
import { getBook, createBook } from '@/api/book';
import { eventBus } from '@/eventBus';

const route = useRoute();
const router = useRouter();
const bookId = Number(route.params.id);

// スナックバーの状態管理
const snackbar = ref(false);
const errorMessage = ref('');

// エラーメッセージを表示する関数
const showError = (message: string) => {
  errorMessage.value = message;
  snackbar.value = true;
};

interface Word {
  wordId: number;
  word: string;
  translated: string;
}

const bookName = ref('');
const isEditingBookName = ref(false);
const editedBookName = ref('');
const words = ref<Word[]>([]);
const showAddDialog = ref(false);
const newWord = ref({
  wordId: 0,
  word: '',
  translated: '',
});
const showEditDialog = ref(false);
const editingWord = ref<Word>({
  wordId: 0,
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
};

const cancelEditingBookName = () => {
  isEditingBookName.value = false;
};

const navigateBack = () => {
  router.push(`/home`);
};

const navigateToAdd = () => {
  router.push({
    path: '/edit/new',
    query: { bookId: bookId.toString() }
  });
};

const handleSave = async () => {
  if (route.path === '/create') {

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.error('ユーザーIDが取得できません');
        return;
      }

      // wordIdを除外した単語リストを作成
      const wordsWithoutId = words.value.map(({ word, translated }) => ({
        word,
        translated
      }));

      const response = await createBook(
        token,
        parseInt(userId, 10),
        bookName.value,
        wordsWithoutId
      );

      // 単語帳更新イベントを発火
      eventBus.emit('book-updated');

      // 保存成功後、ホーム画面に遷移
      router.push('/home');
    } catch (error) {
      if (error instanceof Error) {
        showError(error.message);
      } else {
        showError('単語帳の保存に失敗しました');
      }
    }
  }
};

const openAddDialog = () => {
  newWord.value = {
    wordId: 0,
    word: '',
    translated: '',
  };
  showAddDialog.value = true;
};

const closeAddDialog = () => {
  showAddDialog.value = false;
};

const addWord = () => {
  if (!newWord.value.word || !newWord.value.translated) return;

  // 新しい単語をリストに追加
  const newId = words.value.length > 0
    ? Math.max(...words.value.map(w => w.wordId)) + 1
    : 1;

  words.value.push({
    wordId: newId,
    word: newWord.value.word,
    translated: newWord.value.translated,
  });

  // フォームをリセットしてダイアログを閉じる
  newWord.value = {
    word: '',
    translated: '',
  };
  closeAddDialog();
};

const openEditDialog = (word: Word) => {
  // オブジェクトのディープコピーを作成
  editingWord.value = {
    wordId: word.wordId,
    word: word.word,
    translated: word.translated
  };
  showEditDialog.value = true;
};

const closeEditDialog = () => {
  showEditDialog.value = false;
  editingWord.value = {
    wordId: 0,
    word: '',
    translated: '',
  };
};

const updateWord = () => {
  if (!editingWord.value.word || !editingWord.value.translated) return;

  // 既存の単語を更新
  const index = words.value.findIndex(w => w.wordId === editingWord.value.wordId);

  if (index !== -1) {
    // 新しいオブジェクトを作成して更新
    const updatedWord = {
      wordId: editingWord.value.wordId,
      word: editingWord.value.word,
      translated: editingWord.value.translated
    };

    // 配列の更新方法を変更
    words.value = [
      ...words.value.slice(0, index),
      updatedWord,
      ...words.value.slice(index + 1)
    ];
  }

  closeEditDialog();
};

onMounted(async () => {
  // URLパスが/createの場合は何もしない
  if (route.path === '/create') {
    return;
  }

  try {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    const response = await getBook(token, bookId.toString());
    bookName.value = response.bookName;
    words.value = response.words;
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
              <v-icon color="primary">mdi-pencil</v-icon>
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
            :key="word.wordId"
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

  <!-- スナックバーコンポーネント -->
  <v-snackbar
    v-model="snackbar"
    color="error"
    timeout="3000"
  >
    {{ errorMessage }}
    <template v-slot:actions>
      <v-btn
        color="white"
        variant="text"
        @click="snackbar = false"
      >
        閉じる
      </v-btn>
    </template>
  </v-snackbar>

  <v-dialog v-model="showAddDialog" max-width="500">
    <v-card>
      <v-card-title>{{ page.edit.title }}</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="addWord">
          <v-text-field
            v-model="newWord.word"
            :label="common.labels.word"
            required
            :rules="[v => !!v || '単語を入力してください']"
          />
          <v-text-field
            v-model="newWord.translated"
            :label="common.labels.translation"
            required
            :rules="[v => !!v || '翻訳を入力してください']"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <Button
          color="primary"
          :content="common.buttons.save"
          secondBtn
          secondBtnColor="red"
          :secondBtnContent="common.buttons.cancel"
          @firstClick="addWord"
          @secondClick="closeAddDialog"
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
            :rules="[v => !!v || '単語を入力してください']"
          />
          <v-text-field
            v-model="editingWord.translated"
            :label="common.labels.translation"
            required
            :rules="[v => !!v || '翻訳を入力してください']"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <Button
          color="primary"
          :content="common.buttons.save"
          secondBtn
          secondBtnColor="red"
          :secondBtnContent="common.buttons.cancel"
          @firstClick="updateWord"
          @secondClick="closeEditDialog"
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
