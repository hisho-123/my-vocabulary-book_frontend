# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

Vue 3、Vuetify、TypeScriptで構築された単語帳アプリケーションのフロントエンド。ユーザーは単語帳を作成し、フラッシュカードで単語を学習し、エビングハウスの忘却曲線に基づいた復習スケジュールを追跡できる。

## 開発コマンド

```bash
# 依存パッケージのインストール
npm i

# 開発サーバーの起動
npm run dev

# 本番用ビルド
npm run build

# 本番ビルドのプレビュー
npm run preview

# Lint と Format
npm run lint        # ESLintによる自動修正
npm run format      # Prettierによるフォーマット
npm run fix         # formatとlintの両方を実行

# Storybook（コンポーネント開発）
npm run storybook
npm run build-storybook
```

## アーキテクチャ

### ディレクトリ構造

- **`src/pages/`** - vue-routerによって読み込まれるトップレベルのページコンポーネント。データ取得とルートレベルのロジックを扱う。
- **`src/navigation/`** - アプリ全体のナビゲーション用のHeaderとSidebarコンポーネント。
- **`src/components/`** - 再利用可能なUIコンポーネント（Button、Dialog、WordCard）。
- **`src/api/`** - APIクライアントの設定とエンドポイント関数。
- **`src/stores/`** - グローバル状態管理用のPiniaストア。
- **`src/errors/`** - 各HTTPステータスコード用のエラーページコンポーネント。
- **`src/term/`** - 日本語テキスト定数とラベルの一元管理。
- **`src/router/`** - Vue Routerの設定。

### 状態管理（Pinia）

**ユーザーストア** (`src/stores/user.ts`)
- 認証状態を管理: `userId`, `token`, `userName`
- localStorageに永続化
- `useUserStore()`でアクセス

**通知ストア** (`src/stores/notification.ts`)
- グローバルなスナックバー通知
- メソッド: `showError()`, `showSuccess()`, `showInfo()`, `showWarning()`
- App.vueで自動的に表示される

### APIクライアント

**設定** (`src/api/config.ts`)
- ベースURL: `http://localhost:8080/api`
- 自動通知とルートリダイレクトを伴う一元化されたエラーハンドリング
- メソッド:
  - `apiClient.get(endpoint, token?)` - エラーハンドリング付き標準GET
  - `apiClient.post(endpoint, data?, token?)` - エラーハンドリング付き標準POST
  - `apiClient.delete(endpoint, data?, token?)` - エラーハンドリング付きDELETE
  - `apiClient.postForAuth(endpoint, data?)` - ログイン・登録専用POST（エラー時の自動リダイレクトなし）
- トークンは`Token`ヘッダーで渡す（`Authorization`ではない）

**エラーハンドリングの動作**
- 401: ユーザーストアをクリアして`/login`にリダイレクト
- 403: `/forbidden`エラーページにリダイレクト（スナックバーなし）
- その他のエラー（400, 404, 422, 500）: スナックバー通知のみ表示
- ログインページ（`/login`）は自動リダイレクトを避けるため`postForAuth()`を使用

### ルーティングとレイアウト

**ルートメタデータ**
- `meta: { hideLayout: true }`を持つルートはHeaderとSidebarを非表示にする
- 適用対象: ログインページとすべてのエラーページ
- App.vueは`route.meta.hideLayout`に基づいてレイアウトを条件付きレンダリング

**エラーページ**
- 各HTTPステータス用の専用ルート: `/bad-request`, `/forbidden`, `/not-found`, `/unauthorized`, `/server-error`, `/unprocessable-entity`
- すべてのエラーページでheader/sidebarは非表示

### テキスト定数

ユーザー向けの日本語テキストは`src/term/common.ts`に一元管理:
- `common.buttons` - ボタンラベル
- `common.labels` - フォームフィールドラベル
- `common.messages` - ユーザーメッセージ
- `common.errors` - タイトルとメッセージプロパティを持つエラーメッセージ

日本語テキストをハードコーディングせず、常にこれらの定数をインポートして使用すること。

### レスポンシブサイドバー

サイドバーは画面幅510px以下で自動的に折りたたまれる。ヘッダーのトグルボタンでサイドバーの表示/非表示を制御。App.vueでリサイズリスナーを使用して実装。

## 重要な実装詳細

### 認証フロー
1. ユーザーが`LoginPage.vue`でログイン
2. APIが`userId`, `token`, `userName`を返す
3. Piniaユーザーストアに保存（localStorageに自動永続化）
4. 以降のAPI呼び出しで`Token`ヘッダーにトークンを含める
5. 401エラー時、ユーザーストアをクリアしてログインにリダイレクト

### エラーハンドリング戦略
- **ログインページ**: エラーはページ内にインライン表示、自動遷移なし
- **その他のページ**: 403はエラーページに遷移、他のエラーはスナックバー通知を表示
- エラーメッセージは`src/term/common.ts`で定義され、一貫した日本語メッセージング
- 各HTTPステータスコードに専用のエラーページコンポーネントがある

### コンポーネント構成
- ページはデータ取得とルートレベルのロジックを含む
- コンポーネントは汎用的で再利用可能なUI要素
- featuresディレクトリ（現在は最小限）は、他に適合しないページ固有のロジック用

## 設定メモ

- **パスエイリアス**: `@`はvite.config.tsで`src/`にエイリアスされている
- **Vuetify**: vite-plugin-vuetifyで自動インポートが有効
- **TypeScript**: Strictモードが有効
- **スタイリング**: VuetifyのMaterial DesignコンポーネントでSCSSを使用
