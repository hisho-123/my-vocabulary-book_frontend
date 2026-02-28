// API設定
import { useNotificationStore } from '@/stores/notification';
import { useUserStore } from '@/stores/user';
import { common } from '@/term/common';

export const API_BASE_URL = 'http://localhost:8080/api';

// 共通のAPIクライアント関数
const handleError = async (status: number) => {
  const notificationStore = useNotificationStore();

  switch (status) {
    case 400:
      notificationStore.showError(common.errors.badRequest.message);
      break;
    case 401:
      notificationStore.showError(common.errors.unauthorized.message);
      // ユーザー情報をクリアしてログイン画面へ
      const userStore = useUserStore();
      userStore.clearUser();
      const router = (await import("@/router")).default;
      await router.push("/login");
      break;
    case 403:
      notificationStore.showError(common.errors.forbidden.message);
      break;
    case 404:
      notificationStore.showError(common.errors.notFound.message);
      break;
    case 422:
      notificationStore.showError(common.errors.unprocessableEntity.message);
      break;
    case 500:
      notificationStore.showError(common.errors.serverError.message);
      break;
    default:
      notificationStore.showError(common.errors.otherError.message);
      break;
  }
};

export const apiClient = {
  get: async (endpoint: string, token?: string) => {
    const headers: Record<string, string> = {};
    if (token) {
      headers['Token'] = token;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      await handleError(response.status);
      throw new Error(`API request failed: ${response.status}`);
    }

    return response.json();
  },

  post: async (endpoint: string, data?: any, token?: string) => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Token'] = token;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers,
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      await handleError(response.status);
      throw new Error(`API request failed: ${response.status}`);
    }

    return response.json();
  },

  delete: async (endpoint: string, data?: any, token?: string) => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Token'] = token;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers,
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      await handleError(response.status);
      throw new Error(`API request failed: ${response.status}`);
    }
  },

  // ログイン専用: エラー時に自動遷移しない
  postForAuth: async (endpoint: string, data?: any) => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers,
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    return response.json();
  },
};
