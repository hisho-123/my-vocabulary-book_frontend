<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { page, common } from '@/term';
import Button from '@/components/Button/index.vue';

const router = useRouter();
const vocabularyBooks = ref([
  { id: 1, title: '英単語帳1' },
  { id: 2, title: '英単語帳2' },
]);

const navigateToBook = (bookId: number) => {
  router.push(`/book/${bookId}`);
};

const navigateToReview = () => {
  // TODO: 復習する単語帳のIDを取得
  const reviewBookId = 1;
  router.push(`/book/${reviewBookId}`);
};

const navigateToEdit = () => {
  router.push('/list/1');
};
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-card class="mb-4">
          <v-card-title>復習する</v-card-title>
          <v-card-text>
            <p>{{ page.home.review.description }}</p>
          </v-card-text>
          <v-card-actions>
            <Button
              color="primary"
              :content="common.buttons.startReview"
              @firstClick="navigateToReview"
            />
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>単語帳を編集</v-card-title>
          <v-card-text>
            <p>{{ page.home.edit.description }}</p>
          </v-card-text>
          <v-card-actions>
            <Button
              color="primary"
              :content="common.buttons.startEdit"
              @firstClick="navigateToEdit"
            />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <h2 class="text-h5 mb-4">{{ page.home.bookList.title }}</h2>
        <v-row>
          <v-col
            v-for="book in vocabularyBooks"
            :key="book.id"
            cols="12"
            sm="6"
            md="4"
          >
            <v-card
              class="mx-auto"
              @click="navigateToBook(book.id)"
            >
              <v-card-title>{{ book.title }}</v-card-title>
              <v-card-text>
                <p>{{ page.home.bookList.description }}</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.v-card {
  cursor: pointer;
  transition: transform 0.2s;
}

.v-card:hover {
  transform: translateY(-4px);
}
</style> 