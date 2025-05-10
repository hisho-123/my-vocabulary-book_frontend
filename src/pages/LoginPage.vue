<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { page, common } from '@/term';
import Button from '@/components/Button/index.vue';
import { register } from '@/api/auth';
import { useUserStore } from '@/stores/user';

const router = useRouter();
const userStore = useUserStore();
const username = ref('');
const password = ref('');
const error = ref('');

const handleLogin = () => {
  // TODO: ログイン処理の実装
  router.push('/home');
};

const handleSignIn = async () => {
  try {
    error.value = '';
    const response = await register(username.value, password.value);
    userStore.setUser(response.userId, response.token);
    router.push('/home');
  } catch (e) {
    error.value = 'サインインに失敗しました。';
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
              <v-alert
                v-if="error"
                type="error"
                class="mt-2"
              >
                {{ error }}
              </v-alert>
            </v-form>
          </v-card-text>
          <v-card-actions class="justify-center pb-4">
            <Button
              color="white"
              :content="common.buttons.signIn"
              @firstClick="handleSignIn"
            />
            <Button
              color="primary"
              :content="common.buttons.login"
              @firstClick="handleLogin"
            />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.v-card {
  border-radius: 8px;
}
</style>
