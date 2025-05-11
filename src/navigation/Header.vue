<script setup lang="ts">
import { ref, onMounted } from "vue";
import { applicationName } from "./navigation.ts";
import { useUserStore } from '@/stores/user';
import Button from '@/components/Button/index.vue';
import { common } from '@/term';

const userStore = useUserStore();
const showDeleteDialog = ref(false);

const handleDeleteClick = () => {
  showDeleteDialog.value = true;
};

const handleDeleteCancel = () => {
  showDeleteDialog.value = false;
};

const handleDeleteConfirm = () => {
  // TODO: ユーザー削除APIの呼び出し
  showDeleteDialog.value = false;
};
</script>
<template>
  <div class="header">
    <div class="title">{{ applicationName }}</div>
    <div class="user-section">
      <Button
        v-if="userStore.isAuthenticated"
        icon="mdi-delete-forever"
        :content="userStore.userName"
        @firstClick="handleDeleteClick"
      />
      <v-dialog
        v-model="showDeleteDialog"
        max-width="400"
      >
        <v-card>
          <v-card-title class="text-h5">
            アカウントを削除しますか？
          </v-card-title>
          <v-card-text>
            <p>{{ userStore.userName }}</p>
            <p class="text-caption text-red">この操作は取り消せません。</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <Button
              color="primary"
              :content="common.buttons.delete"
              :secondBtn="true"
              secondBtnColor="error"
              :secondBtnContent="common.buttons.cancel"
              @firstClick="handleDeleteCancel"
              @secondClick="handleDeleteConfirm"
            />
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.header {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
}

.title {
  font-size: 24px;
  color: white;
}

.user-section {
  display: flex;
  align-items: center;
  gap: 8px;

  :deep(.v-btn__content) {
    text-transform: none;
  }
}
</style>
