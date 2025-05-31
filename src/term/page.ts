export const test = {
  test: 'テスト',
  test2: 'テストテスト'
}

export const page = {
  home: {
    title: 'ホーム',
    review: {
      title: '復習する',
      description: '復習タイミングとして最適な単語を抽出します。'
    },
    edit: {
      title: '単語帳を編集',
      description: '単語帳の編集や新しい単語の追加ができます。'
    },
    bookList: {
      title: '単語帳一覧',
      description: '単語を学習する'
    }
  },
  login: {
    title: 'ログイン / サインイン'
  },
  book: {
    title: '単語帳'
  },
  list: {
    title: '単語リスト'
  },
  edit: {
    title: '単語の編集'
  },
  create: {
    title: '単語帳を作成する'
  }
} as const;
