<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { page, common } from '@/term';
import Button from '@/components/Button/index.vue';

const route = useRoute();
const router = useRouter();
const wordId = Number(route.params.id);

interface Word {
  id: number;
  word: string;
  translation: string;
}

const word = ref<Word>({
  id: wordId,
  word: '',
  translation: '',
});

const showDeleteDialog = ref(false);

const saveWord = () => {
  // TODO: APIで単語を保存
  router.push('/list/1');
};

const deleteWord = () => {
  // TODO: APIで単語を削除
  router.push('/list/1');
};

const navigateBack = () => {
  router.push('/list/1');
};

onMounted(() => {
  // TODO: APIから単語のデータを取得
  word.value = {
    id: wordId,
    word: 'apple',
    translation: 'りんご',
  };
});
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div class="d-flex justify-space-between align-center mb-4">
          <h1 class="text-h4">{{ page.edit.title }}</h1>
          <div>
            <Button
              color="white"
              :content="common.buttons.delete"
              @firstClick="showDeleteDialog = true"
            />
            <Button
              color="white"
              :content="common.buttons.back"
              @firstClick="navigateBack"
            />
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-form @submit.prevent="saveWord">
          <v-text-field
            v-model="word.word"
            :label="common.labels.word"
            required
          />
          <v-text-field
            v-model="word.translation"
            :label="common.labels.translation"
            required
          />
          <Button
            color="primary"
            :content="common.buttons.save"
            @firstClick="saveWord"
          />
        </v-form>
      </v-col>
    </v-row>

    <v-dialog v-model="showDeleteDialog" max-width="400">
      <v-card>
        <v-card-title>{{ page.edit.title }}</v-card-title>
        <v-card-text>
          {{ common.messages.deleteWordConfirm }}
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <Button
            color="white"
            :content="common.buttons.cancel"
            @firstClick="showDeleteDialog = false"
          />
          <Button
            color="primary"
            :content="common.buttons.delete"
            @firstClick="deleteWord"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style scoped>
.v-form {
  max-width: 600px;
  margin: 0 auto;
}
</style> 