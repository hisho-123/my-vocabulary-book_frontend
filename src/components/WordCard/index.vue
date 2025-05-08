<script setup lang="ts">
import { ref } from 'vue';
import { component } from '@/term/component';

interface Props {
  word: string;
  translation: string;
  showTranslation?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showTranslation: false
});

const emit = defineEmits<{
  (e: 'update:showTranslation', value: boolean): void
}>();

const toggleCard = () => {
  emit('update:showTranslation', !props.showTranslation);
};
</script>

<template>
  <v-card
    class="word-card mx-auto"
    @click="toggleCard"
  >
    <v-card-text class="text-center">
      <div class="text-h4 mb-4">
        {{ props.showTranslation ? translation : word }}
      </div>
      <div class="text-caption">
        {{ props.showTranslation ? component.wordCard.tapToShowWord : component.wordCard.tapToShowTranslation }}
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
