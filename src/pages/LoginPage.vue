<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { page, common } from '@/term';
import Button from '@/components/Button/index.vue';
import { register, login } from '@/api/auth';
import { useUserStore } from '@/stores/user';

const router = useRouter();
const userStore = useUserStore();
const username = ref('');
const password = ref('');
const error = ref('');

// スナックバーの状態管理
const snackbar = ref(false);
const errorMessage = ref('');

// エラーメッセージを表示する関数
const showError = (message: string) => {
  errorMessage.value = message;
  snackbar.value = true;
};

const handleLogin = async () => {
  try {
    error.value = '';
    const response = await login(username.value, password.value);
    userStore.setUser(response.userId, response.token, username.value);
    router.push('/home');
  } catch (e) {
    error.value = 'ログインに失敗しました。';
  }
};

const handleSignIn = async () => {
  try {
    error.value = '';
    const response = await register(username.value, password.value);
    userStore.setUser(response.userId, response.token, username.value);
    router.push('/home');
  } catch (e) {
    if (e instanceof Error) {
      showError(e.message);
    } else {
      showError('サインインに失敗しました');
    }
  }
};
</script>

<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="elevation-12">
          <v-card-title class="text-center text-h5 py-4">
            {{ page.login.title }}
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent>
              <v-text-field
                v-model="username"
                :label="common.labels.username"
                prepend-icon="mdi-account"
                required
              />
              <v-text-field
                v-model="password"
                :label="common.labels.password"
                prepend-icon="mdi-lock"
                type="password"
                required
              />
            </v-form>
          </v-card-text>
          <v-card-actions class="justify-center pb-4">
            <Button
              color="primary"
              :content="common.buttons.login"
              secondBtn
              secondBtnColor="black"
              :secondBtnContent="common.buttons.signIn"
              @firstClick="handleLogin"
              @secondClick="handleSignIn"
            />
          </v-card-actions>
        </v-card>
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
</template>

<style scoped>
.v-card {
  border-radius: 8px;
}
</style>
