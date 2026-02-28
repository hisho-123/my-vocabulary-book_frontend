import { API_BASE_URL } from './config';

/**
 * ホームページの認証チェック
 * バックエンドの GET /api/home エンドポイントを呼び出してトークンを検証
 * @returns HTTPステータスコード
 */
export const checkHomeAuth = async (token: string): Promise<number> => {
  const response = await fetch(`${API_BASE_URL}/home`, {
    method: 'GET',
    headers: {
      Token: token,
    },
  });

  return response.status;
};
