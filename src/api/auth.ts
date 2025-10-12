import { apiClient } from './config';

interface RegisterResponse {
  userId: string;
  token: string;
}

interface LoginResponse {
  userId: string;
  token: string;
}

export const register = async (userName: string, password: string): Promise<RegisterResponse> => {
  try {
    return await apiClient.post('/register', { userName, password });
  } catch (error) {
    if (error instanceof Error && error.message.includes('400')) {
      throw new Error("不正な入力があります");
    }
    throw new Error('ユーザー登録に失敗しました');
  }
};

export const login = async (userName: string, password: string): Promise<LoginResponse> => {
  try {
    return await apiClient.post('/login', { userName, password });
  } catch (error) {
    throw new Error('Login failed');
  }
};

export const deleteUser = async (token: string): Promise<void> => {
  try {
    await apiClient.delete('/user-delete', undefined, token);
  } catch (error) {
    throw new Error('User deletion failed');
  }
};
