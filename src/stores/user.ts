import { defineStore } from 'pinia';

interface UserState {
  userId: string | null;
  token: string | null;
  userName: string | null;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    userId: null,
    token: null,
    userName: null,
  }),
  actions: {
    setUser(userId: string, token: string, userName: string) {
      this.userId = userId;
      this.token = token;
      this.userName = userName;
      // ローカルストレージに保存
      localStorage.setItem('userId', userId);
      localStorage.setItem('token', token);
      localStorage.setItem('userName', userName);
    },
    clearUser() {
      this.userId = null;
      this.token = null;
      this.userName = null;
      // ローカルストレージから削除
      localStorage.removeItem('userId');
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
    },
    initializeFromStorage() {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      const userName = localStorage.getItem('userName');
      if (userId && token && userName) {
        this.userId = userId;
        this.token = token;
        this.userName = userName;
      }
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
}); 
