# TermLearn — git & ターミナル 学習チュートリアル

エンジニア1年生向けに、**ターミナルの基本コマンド**と **Git** を「1ページ1コマンド」の小さなステップでやさしく学べる学習サイトです。

- ビルド不要の **素の HTML / CSS / JavaScript**（フレームワーク・npm・バンドラなし）
- **GitHub Pages でそのまま公開**でき、`index.html` を**ダブルクリックで開いても動く**
- 進捗・読了・復習リストは **localStorage** に保存（端末内のみ・サーバー送信なし）

---

## 動かし方

### ローカルで開く（最速）
`index.html` をダブルクリックするだけです。ビルドもサーバーも不要です。

> 補足: ローカル（`file://`）ではコマンドのコピーが古い方式（`execCommand`）で動きます。
> 通常どおりコピーできますが、ブラウザによっては許可ダイアログが出ることがあります。
> GitHub Pages（https）では新しい Clipboard API を使います。

### 簡易サーバーで開く（任意）
`file://` 特有の挙動を避けたい場合は、リポジトリ直下で以下のいずれか:

```bash
python3 -m http.server 8000
# → ブラウザで http://localhost:8000 を開く
```

---

## GitHub Pages で公開する手順

1. このリポジトリを GitHub に push します（リポジトリ直下に `index.html` がある状態）。
   ```bash
   git init
   git add .
   git commit -m "TermLearn 初版"
   git branch -M main
   git remote add origin https://github.com/<あなたのユーザー名>/<リポジトリ名>.git
   git push -u origin main
   ```
2. GitHub のリポジトリページで **Settings → Pages** を開きます。
3. **Build and deployment** の **Source** を **Deploy from a branch** にします。
4. **Branch** を `main` ／ フォルダを `/ (root)` に設定して **Save**。
5. 1〜2分待つと `https://<ユーザー名>.github.io/<リポジトリ名>/` で公開されます。

> リポジトリ直下に空ファイル **`.nojekyll`** を置いています。これにより GitHub Pages の
> Jekyll 処理がスキップされ、`js/` や `content/` のファイルがそのまま配信されます。

---

## ファイル構成

```
index.html          エントリ。<script> を依存順に読み込み、グローバル連携
.nojekyll           GitHub Pages の Jekyll 処理を無効化（空ファイル）
styles.css          デザインシステム（CSS 変数・全コンポーネント）
js/
  glossary.js       用語集（window.GLOSSARY）。[[用語]] でチップ化
  store.js          localStorage 進捗管理（window.Store）
  render.js         データ→HTML レンダラ／コピー・チップ挙動（window.Render）
  router.js         hash ルーティング＋全5画面の描画（window.App）
content/
  terminal.js       🖥️ ターミナルコマンド 教材（window.COURSES.push）
  git.js            🌿 Git 教材（window.COURSES.push）
```

---

## コンテンツの増やし方（拡張）

データ構造は **教材(course) → 章(chapter) → ページ(page)** の3階層です。
コンテンツは JavaScript のデータとして `content/*.js` に定義し、`window.COURSES.push(...)` で登録します。

### 新しい教材を1つ足す
1. `content/python.js` のようなファイルを作り、course オブジェクトを `window.COURSES.push({...})` します。
2. `index.html` の `<script src="content/git.js"></script>` の下に
   `<script src="content/python.js"></script>` を1行足します。
3. これだけで TOP に教材カードが増え、章一覧・学習ページ・クイズ・復習リストすべてに自動で載ります。

### course オブジェクトの形

```js
window.COURSES.push({
  id: 'git', title: 'Git', emoji: '🌿', description: '…',
  chapters: [{
    id: 'basics', title: 'gitの基本',
    summary: '章一覧カードに出る一言（省略可。省略時はページ名の連結）',
    pages: [{
      id: 'git-add',
      title: 'git add — 変更をステージに上げる',   // ページ見出し（`code` 可）
      navTitle: 'git add',                          // 章ナビ用の短い名前（省略可）
      blocks: [
        { type: 'text', html: '本文。`code` と [[リポジトリ]] が使えます。' },
        { type: 'terminal', title: 'bash — ~/my-app', lines: [
          { cmd: 'git add .' },
          { out: '# 何も表示されなければ成功' },
          { ok:  'done' }            // 緑のハイライト行
        ]},
        { type: 'callout', variant: 'hint', html: '💡 …' },   // variant: 'hint' | 'warn'
        { type: 'heading', text: '小見出し' },
        { type: 'list', ordered: false, items: ['項目1', '項目2'] }
      ]
    }],
    quiz: [
      { q: '問題文（`code` 可）',
        choices: ['選択肢A', '選択肢B', '選択肢C'],
        answer: 1,                 // 正解の choices インデックス（0始まり）
        explain: '解説（正誤どちらでも表示）',
        topic: 'git add',          // 復習リストに出るトピック名
        pageId: 'git-add' }        // 間違えたとき戻る該当ページ
    ]
  }]
});
```

### 用語チップ
本文・コールアウト・選択肢などの中で `[[リポジトリ]]` と書くと、`js/glossary.js` の
説明文を引いて点線下線のチップになります。表示文字を変えたいときは `[[リポ|リポジトリ]]`。
新しい用語は `js/glossary.js` に `'用語': '説明'` を1行足すだけです。

---

## 設計メモ

- **ルーティングは hash ベース**（`#/course/git`, `#/page/git/basics/git-add`, `#/quiz/git/basics`, `#/review`）。
  リロードしても状態が復元でき、GitHub Pages とも相性が良いです。
- **データとレンダラを分離**。`content/*.js` はデータのみ、表示は `js/render.js` / `js/router.js` が担当します。
- **アクセシビリティ**: フォーカスリング常設、色だけに頼らない正誤表示（✓/✕＋テキスト）、
  用語チップ・コピー・クイズはキーボード操作可、`prefers-reduced-motion` 尊重。
