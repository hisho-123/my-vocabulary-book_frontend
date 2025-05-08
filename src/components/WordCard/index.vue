<script setup lang="ts">
import { ref } from 'vue';
import { component } from '@/term/component';

interface Props {
  word: string;
  translation: string;
}

const props = defineProps<Props>();
const showTranslation = ref(false);

const toggleCard = () => {
  showTranslation.value = !showTranslation.value;
};
</script>

<template>
  <v-card
    class="word-card mx-auto"
    @click="toggleCard"
  >
    <v-card-text class="text-center">
      <div class="text-h4 mb-4">
        {{ showTranslation ? translation : word }}
      </div>
      <div class="text-caption">
        {{ showTranslation ? component.wordCard.tapToShowWord : component.wordCard.tapToShowTranslation }}
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.word-card {
  max-width: 600px;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s;
}

.word-card:hover {
  transform: scale(1.02);
}
</style>
