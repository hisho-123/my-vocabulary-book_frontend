import { defineStore } from 'pinia';

interface UserState {
  userId: string | null;
  token: string | null;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    userId: null,
    token: null,
  }),
  actions: {
    setUser(userId: string, token: string) {
      this.userId = userId;
      this.token = token;
      // ローカルストレージに保存
      localStorage.setItem('userId', userId);
      localStorage.setItem('token', token);
    },
    clearUser() {
      this.userId = null;
      this.token = null;
      // ローカルストレージから削除
      localStorage.removeItem('userId');
      localStorage.removeItem('token');
    },
    initializeFromStorage() {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      if (userId && token) {
        this.userId = userId;
        this.token = token;
      }
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
}); 
