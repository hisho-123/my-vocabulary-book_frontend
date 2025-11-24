// API設定
export const API_BASE_URL = 'http://localhost:8080/api';

// 共通のAPIクライアント関数
const handleError = async (status: number) => {
  const router = (await import("@/router")).default;
  switch (status) {
    case 400:
      await router.push("/bad-request");
      break;
    case 401:
      await router.push("/unauthorized");
      break;
    case 403:
      await router.push("/forbidden");
      break;
    case 404:
      await router.push("/not-found");
      break;
    case 422:
      await router.push("/unprocessable-entity");
      break;
    case 500:
      await router.push("/server-error");
      break;
    default:
      await router.push("/error");
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
};
