import { defineStore } from 'pinia';

export type NotificationType = 'error' | 'success' | 'info' | 'warning';

interface NotificationState {
  visible: boolean;
  message: string;
  type: NotificationType;
  timeout: number;
}

export const useNotificationStore = defineStore('notification', {
  state: (): NotificationState => ({
    visible: false,
    message: '',
    type: 'info',
    timeout: 3000,
  }),
  actions: {
    showError(message: string, timeout = 3000) {
      this.message = message;
      this.type = 'error';
      this.timeout = timeout;
      this.visible = true;
    },
    showSuccess(message: string, timeout = 3000) {
      this.message = message;
      this.type = 'success';
      this.timeout = timeout;
      this.visible = true;
    },
    showInfo(message: string, timeout = 3000) {
      this.message = message;
      this.type = 'info';
      this.timeout = timeout;
      this.visible = true;
    },
    showWarning(message: string, timeout = 3000) {
      this.message = message;
      this.type = 'warning';
      this.timeout = timeout;
      this.visible = true;
    },
    hide() {
      this.visible = false;
    },
  },
});
