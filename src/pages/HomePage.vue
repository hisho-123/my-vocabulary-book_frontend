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

const navigateToCreate = () => {
  router.push('/create');
};
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-card class="mb-4" style>
          <v-card-title>{{ page.home.review.title }}</v-card-title>
          <v-card-text>
            <p>{{ page.home.review.description }}</p>
          </v-card-text>
          <v-card-actions>
            <Button
              color="primary"
              :content="common.buttons.startReview"
              :disabled=true
              @firstClick="navigateToReview"
            />
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>{{ page.home.edit.title }}</v-card-title>
          <v-card-text>
            <p>{{ page.home.edit.description }}</p>
          </v-card-text>
          <v-card-actions>
            <Button
              color="primary"
              :content="common.buttons.startEdit"
              :disabled=true
              @firstClick="navigateToEdit"
            />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
       <div class="text-center mt-4">
          <Button
            color="primary"
            size="large"
            :content="page.create.title"
            @firstClick="navigateToCreate"
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.v-card {
  cursor: pointer;
  transition: transform 0.2s;
  background-color: gray;
}

.v-card:hover {
  transform: translateY(-4px);
}
</style> 
