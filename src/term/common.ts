export const common = {
  buttons: {
    back: '戻る',
    save: '保存',
    edit: '編集',
    delete: '削除',
    cancel: 'キャンセル',
    close: '閉じる',
    startReview: '復習を始める',
    startEdit: '編集を始める',
    signIn: 'サインイン',
    login: 'ログイン',
    logout: 'ログアウト'
  },
  labels: {
    username: 'ユーザー名',
    password: 'パスワード',
    word: '単語',
    translation: '翻訳'
  },
  messages: {
    deleteWordConfirm: 'この単語を削除してもよろしいですか？',
    deleteBookConfirm: 'この単語帳を削除してもよろしいですか？',
    tapToShowWord: 'タップして単語を表示',
    tapToShowTranslation: 'タップして翻訳を表示'
  },
  errors: {
    loginAuthFailed: 'ユーザー名・パスワードに誤りがあります。',
    badRequest: {
      title: '400 - Bad Request',
      message: '処理に失敗しました。再度お試しください。'
    },
    unauthorized: {
      title: '401 - Unauthorized',
      message: '有効な認証情報が見つかりませんでした。'
    },
    forbidden: {
      title: '403 - Forbidden',
      message: '許可されていないアクセスがありました。'
    },
    notFound: {
      title: '404 - Not Found',
      message: 'お探しのページまたはリソースが見つかりませんでした。'
    },
    unprocessableEntity: {
      title: '422 - Unprocessable Entity',
      message: '入力上限を超えています。'
    },
    serverError: {
      title: '500 - Internal Server Error',
      message: 'しばらくしてから再度お試しください。'
    },
    otherError: {
      title: 'エラーが発生しました',
      message: '予期せぬエラーが発生しました。しばらくしてから再度お試しください。'
    },
    backToHome: 'ホームへ戻る',
    backToLogin: 'ログイン画面へ戻る'
  }
} as const; 