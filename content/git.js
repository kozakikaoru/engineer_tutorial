/* =========================================================================
   content/git.js — 教材B 🌿 Git
   window.COURSES へ push する。データのみ。
   方針: 最新の git 基準（switch/restore を主役、checkout は補足程度）。
         1ページ1コマンド／ですます調／用語は [[ ]] でチップ化／常用のみ。
   ========================================================================= */
(function () {
  'use strict';
  window.COURSES = window.COURSES || [];

  window.COURSES.push({
    id: 'git',
    title: 'Git',
    emoji: '🌿',
    description: '変更履歴を残す仕組み。「なぜ使う？」から PR がマージされるまでを、やさしく。',
    chapters: [

      /* =================================================================
         章1 はじめに
         ================================================================= */
      {
        id: 'intro',
        title: 'はじめに',
        summary: 'バージョン管理とは / git とは / なぜ使う / GitHub との違い / 初期設定',
        pages: [
          {
            id: 'what-is-vcs',
            title: 'バージョン管理ってなに？',
            navTitle: 'バージョン管理とは',
            blocks: [
              { type: 'text', html: 'レポートを書くとき、`report_最新.docx`、`report_最新2.docx`、`report_本当に最新.docx`…とファイルが増えていった経験はありませんか？ どれが本物かわからなくなりがちです。' },
              { type: 'text', html: '[[バージョン管理]]とは、こうした「変更の歴史」をきちんと記録して、いつでも前の状態に戻せるようにする仕組みです。ゲームの「セーブポイント」をたくさん作れるイメージです。' },
              { type: 'callout', variant: 'hint', html: 'バージョン管理を使うと、ファイルは1つのまま「いつ・誰が・何を変えたか」の歴史が中に積み重なっていきます。コピーを量産する必要がなくなります。' }
            ]
          },
          {
            id: 'what-is-git',
            title: 'git ってなに？',
            navTitle: 'git とは',
            blocks: [
              { type: 'text', html: '[[Git]]は、いま世界でいちばん使われている[[バージョン管理]]ツールです。プログラムのコードはもちろん、文章や設定ファイルなど、テキストの変更履歴を細かく記録できます。' },
              { type: 'text', html: 'git の特徴は「分散型」であることです。歴史のすべてのコピーが、あなたのパソコンの中（[[ローカル]]）にもまるごと入ります。インターネットにつながっていなくても、記録を残したり過去を見たりできます。' },
              { type: 'callout', variant: 'hint', html: '「分散型」＝みんなが歴史の完全なコピーを持っている、ということ。だから誰か1台が壊れても、ほかから歴史を復元できます。' }
            ]
          },
          {
            id: 'why-git',
            title: 'なぜ git を使うの？',
            navTitle: 'なぜ使う',
            blocks: [
              { type: 'text', html: '手作業でフォルダをコピーして残す方法（`report_最新2` のような…）と比べると、git の良さがはっきりします。' },
              { type: 'heading', text: '手作業コピーのつらいところ' },
              { type: 'list', items: [
                'どれが最新か、すぐわからなくなる。',
                '「いつ・なぜ変えたか」が残らない。',
                '複数人で同じファイルを編集すると、上書きでケンカになる。'
              ]},
              { type: 'heading', text: 'git だとこうなる' },
              { type: 'list', items: [
                '歴史が1本にまとまり、最新がいつも明確。',
                '[[コミット]]ごとに「いつ・誰が・なぜ」が記録される。',
                '[[ブランチ]]で安全に分かれて作業し、あとで合流できる。',
                '前の状態にいつでも戻せるので、思いきって変更を試せる。'
              ]},
              { type: 'callout', variant: 'hint', html: 'git のいちばんの価値は「安心して変更できること」。失敗してもすぐ戻せるとわかっていると、こわがらずに手を動かせます。' }
            ]
          },
          {
            id: 'git-vs-github',
            title: 'git と GitHub の違い',
            navTitle: 'git と GitHub',
            blocks: [
              { type: 'text', html: 'よく混同されますが、[[Git]]と[[GitHub]]は別物です。ここをはっきりさせておきましょう。' },
              { type: 'list', items: [
                '**git** … あなたのパソコンで動く「ツール（道具）」。変更履歴を記録します。',
                '**GitHub** … git の記録をインターネット上に置いて共有・共同作業できる「サービス（場所）」です。'
              ]},
              { type: 'text', html: 'たとえるなら、git は「文章を書くワープロ」、GitHub は「書いたものを置いて共有するクラウド」のような関係です。git だけでも使えますが、チームで使うときに GitHub のような[[リモート]]置き場が活躍します。' },
              { type: 'callout', variant: 'hint', html: '似たサービスに GitLab や Bitbucket もあります。どれも「git の置き場＋共同作業の道具」という点は同じです。' }
            ]
          },
          {
            id: 'git-config',
            title: '初期設定 `git config`',
            navTitle: '初期設定',
            blocks: [
              { type: 'text', html: 'git を使い始める前に、「あなたが誰か」を一度だけ登録します。これは[[コミット]]に名前とメールを記録するためで、最初の1回だけ設定すればOKです。' },
              { type: 'terminal', title: 'bash', lines: [
                { cmd: 'git config --global user.name "あなたの名前"' },
                { cmd: 'git config --global user.email "you@example.com"' },
                { out: '# --global は「このパソコン全体の設定」という意味です' }
              ]},
              { type: 'text', html: 'あわせて、新しく作る[[リポジトリ]]の最初の[[ブランチ]]名を `main` にそろえておくと安心です。最近の標準は `main` です（昔は `master` でした）。' },
              { type: 'terminal', title: 'bash', lines: [
                { cmd: 'git config --global init.defaultBranch main' }
              ]},
              { type: 'callout', variant: 'hint', html: 'いま設定されている内容は `git config --list` で確認できます。名前やメールはあとから同じコマンドで変えられます。' }
            ]
          }
        ],
        quiz: [
          {
            q: 'バージョン管理の説明として正しいのはどれ？',
            choices: [
              'ファイルを自動でメール送信する仕組み',
              '変更の歴史を記録し、前の状態に戻せるようにする仕組み',
              'ファイルを暗号化して見えなくする仕組み'
            ],
            answer: 1,
            explain: 'バージョン管理は「変更履歴を記録し、いつでも前に戻せる」仕組みです。セーブポイントをたくさん作るイメージです。',
            topic: 'バージョン管理とは', pageId: 'what-is-vcs'
          },
          {
            q: 'git が「分散型」と呼ばれるのはなぜ？',
            choices: [
              'サーバーにしか歴史が無いから',
              'みんなのパソコンに歴史の完全なコピーが入るから',
              'インターネットが必須だから'
            ],
            answer: 1,
            explain: '分散型＝歴史の完全なコピーが各自の手元（ローカル）にある、ということ。オフラインでも記録や閲覧ができます。',
            topic: 'git とは（分散）', pageId: 'what-is-git'
          },
          {
            q: 'git と GitHub の関係として正しいのはどれ？',
            choices: [
              'git はサービス、GitHub は手元のツール',
              'git は手元で動くツール、GitHub はその記録を共有するサービス',
              '2つはまったく同じもの'
            ],
            answer: 1,
            explain: 'git は手元で動く道具、GitHub はその記録を置いて共有・共同作業するサービスです。別物です。',
            topic: 'git と GitHub の違い', pageId: 'git-vs-github'
          },
          {
            q: '初期設定で名前とメールを登録するコマンドはどれ？',
            choices: [
              '`git config --global user.name "..."`',
              '`git init --user "..."`',
              '`git name --set "..."`'
            ],
            answer: 0,
            explain: '`git config --global user.name` と `user.email` で、コミットに記録される名前とメールを登録します。',
            topic: 'git config（初期設定）', pageId: 'git-config'
          },
          {
            q: '最近の標準である、最初のブランチ名は？',
            choices: ['`master`', '`main`', '`trunk`'],
            answer: 1,
            explain: '最近は `main` が標準です。`git config --global init.defaultBranch main` でそろえられます。',
            topic: 'defaultBranch main', pageId: 'git-config'
          }
        ]
      },

      /* =================================================================
         章2 gitの基本
         ================================================================= */
      {
        id: 'basics',
        title: 'gitの基本',
        summary: 'init / status / 3つのエリア / add / commit / log / diff / .gitignore',
        pages: [
          {
            id: 'git-init',
            title: 'リポジトリを作る `git init`',
            navTitle: 'git init',
            blocks: [
              { type: 'text', html: 'あるフォルダを git で管理し始めるには、その中で `git init` を実行します。これでフォルダが[[リポジトリ]]（履歴を記録できる入れ物）になります。' },
              { type: 'terminal', title: 'bash — ~/projects/my-app', lines: [
                { cmd: 'git init' },
                { out: 'Initialized empty Git repository in ~/projects/my-app/.git/' }
              ]},
              { type: 'callout', variant: 'hint', html: '実行すると、フォルダの中に `.git` というかくしフォルダができます。ここに歴史が保存されます。`.git` は基本さわりません。' }
            ]
          },
          {
            id: 'git-status',
            title: '状態を見る `git status`',
            navTitle: 'git status',
            blocks: [
              { type: 'text', html: 'いま git から見て「何が変わっているか」を教えてくれるのが `git status` です。迷ったらまずこれ、というくらいよく使います。' },
              { type: 'terminal', title: 'bash — ~/projects/my-app', lines: [
                { cmd: 'git status' },
                { out: 'Untracked files:' },
                { out: '  index.html' },
                { out: '# まだ git に追跡されていない新しいファイルがある、という意味' }
              ]},
              { type: 'callout', variant: 'hint', html: '`git status` は次に何をすべきかのヒント（add すべき／commit すべき など）も一緒に出してくれます。こまめに見る習慣をつけましょう。' }
            ]
          },
          {
            id: 'three-areas',
            title: '3つのエリア（作業ツリー・ステージ・リポジトリ）',
            navTitle: '3つのエリア',
            blocks: [
              { type: 'text', html: 'git を理解するカギは「変更が3つの場所を順番に進む」というイメージです。ここだけは図のように覚えてください。' },
              { type: 'list', ordered: true, items: [
                '[[作業ツリー]] … いま実際に編集しているファイルそのもの。',
                '[[ステージ]] … 次のコミットに含めたい変更を、いったん乗せておく準備スペース。',
                '[[リポジトリ]] … コミットとして確定し、歴史に刻まれた状態。'
              ]},
              { type: 'terminal', title: '変更が進む流れ', lines: [
                { out: '  作業ツリー  ──(git add)──▶  ステージ  ──(git commit)──▶  リポジトリ' },
                { out: '  編集する          選んで乗せる        確定して歴史に残す' }
              ]},
              { type: 'text', html: 'つまり、編集しただけではまだ記録されません。`git add` で[[ステージ]]に乗せ、`git commit` で確定して、はじめて歴史に残ります。' },
              { type: 'callout', variant: 'hint', html: 'ステージがあるおかげで「この変更だけ先にコミット」と小分けにできます。最初はピンと来なくてOK。add → commit を何度かやると体で覚えます。' }
            ]
          },
          {
            id: 'git-add',
            title: 'ステージに乗せる `git add`',
            navTitle: 'git add',
            blocks: [
              { type: 'text', html: '編集した変更を[[ステージ]]に乗せる（[[ステージング]]する）コマンドが `git add` です。コミットに含めたいものを選ぶ作業です。' },
              { type: 'terminal', title: 'bash — ~/projects/my-app', lines: [
                { cmd: 'git add index.html' },
                { out: '# index.html をステージに乗せました（画面には何も出ません）' }
              ]},
              { type: 'text', html: '変更したものを全部まとめて乗せたいときは、「ここ（カレントディレクトリ）の変更すべて」を表す `.` を使います。' },
              { type: 'terminal', title: 'bash — ~/projects/my-app', lines: [
                { cmd: 'git add .' }
              ]},
              { type: 'callout', variant: 'hint', html: '何を乗せたか不安なときは `git status` を。ステージに乗ったファイルは緑色などで「これからコミットされる」と表示されます。' }
            ]
          },
          {
            id: 'git-commit',
            title: '記録を確定する `git commit`',
            navTitle: 'git commit',
            blocks: [
              { type: 'text', html: '[[ステージ]]に乗せた変更を、歴史として確定するのが `git commit` です。`-m` のうしろに「何をしたか」のメッセージを書きます。' },
              { type: 'terminal', title: 'bash — ~/projects/my-app', lines: [
                { cmd: 'git commit -m "トップページを追加"' },
                { out: '[main 1a2b3c4] トップページを追加' },
                { out: ' 1 file changed, 10 insertions(+)' }
              ]},
              { type: 'heading', text: 'メッセージの書き方のコツ' },
              { type: 'list', items: [
                '「何をしたか」が一目でわかる短い文にします（例：「ログイン機能を追加」）。',
                'あとから歴史を見る自分やチームのための説明です。「修正」だけだと何の修正かわかりません。',
                '1コミット＝1つのまとまった変更にすると、あとで追いやすくなります。'
              ]},
              { type: 'callout', variant: 'hint', html: '`add` → `commit` がセーブの基本リズムです。区切りのいいところでこまめにコミットすると、戻したいときに戻しやすくなります。' }
            ]
          },
          {
            id: 'git-log',
            title: '歴史を見る `git log`',
            navTitle: 'git log',
            blocks: [
              { type: 'text', html: 'これまでの[[コミット]]の歴史を一覧で見るのが `git log` です。いつ・誰が・どんなメッセージで記録したかが新しい順に並びます。' },
              { type: 'terminal', title: 'bash — ~/projects/my-app', lines: [
                { cmd: 'git log' },
                { out: 'commit 1a2b3c4... (HEAD -> main)' },
                { out: 'Author: あなたの名前 <you@example.com>' },
                { out: 'Date:   ...' },
                { out: '    トップページを追加' }
              ]},
              { type: 'text', html: '情報が多くて見づらいときは `--oneline` を付けると、1コミット1行のすっきり表示になります。' },
              { type: 'terminal', title: 'bash — ~/projects/my-app', lines: [
                { cmd: 'git log --oneline' },
                { out: '1a2b3c4 トップページを追加' },
                { out: '0f9e8d7 最初のコミット' }
              ]},
              { type: 'callout', variant: 'hint', html: 'ログ表示から抜けられなくなったら、キーボードの `q`（quit）を押すと戻れます。あわてず `q` です。' }
            ]
          },
          {
            id: 'git-diff',
            title: '変更点を見る `git diff`',
            navTitle: 'git diff',
            blocks: [
              { type: 'text', html: '「前の状態とくらべて、どこを変えたか」を確認するのが `git diff` です。コミットする前に、自分の変更を見直すのに使います。' },
              { type: 'terminal', title: 'bash — ~/projects/my-app', lines: [
                { cmd: 'git diff' },
                { out: '+ <h1>ようこそ</h1>' },
                { out: '- <h1>Hello</h1>' },
                { out: '# + が追加した行、- が消した行です' }
              ]},
              { type: 'callout', variant: 'hint', html: 'すでに `git add` でステージに乗せた変更の差分を見たいときは `git diff --staged` を使います。コミット直前の最終チェックに便利です。' }
            ]
          },
          {
            id: 'gitignore',
            title: '記録しないものを決める `.gitignore`',
            navTitle: '.gitignore',
            blocks: [
              { type: 'text', html: 'git に記録させたくないファイルもあります。たとえばパスワードを書いた設定ファイルや、自動で作られる一時ファイルなどです。これらは[[.gitignore|gitignore]]というファイルに書いておくと、git が無視してくれます。' },
              { type: 'terminal', title: '.gitignore の中身（例）', lines: [
                { out: '# 行ごとに「無視するもの」を書きます' },
                { out: 'node_modules/      # 自動で作られる大きなフォルダ' },
                { out: '.env               # パスワードなど秘密の設定' },
                { out: '*.log              # ログファイルすべて' }
              ]},
              { type: 'callout', variant: 'warn', html: 'パスワードや API キーなどの秘密情報は、うっかりコミットすると[[リモート]]に残ってしまい危険です。最初に `.gitignore` で除外しておきましょう。' }
            ]
          }
        ],
        quiz: [
          {
            q: 'フォルダを git で管理し始める（リポジトリにする）コマンドは？',
            choices: ['`git start`', '`git init`', '`git new`'],
            answer: 1,
            explain: '`git init` でそのフォルダがリポジトリになり、`.git` フォルダができて履歴を記録できるようになります。',
            topic: 'git init', pageId: 'git-init'
          },
          {
            q: '変更が歴史に残るまでの正しい順番は？',
            choices: [
              'リポジトリ → ステージ → 作業ツリー',
              '作業ツリー →（add）→ ステージ →（commit）→ リポジトリ',
              'ステージ → 作業ツリー → リポジトリ'
            ],
            answer: 1,
            explain: '編集（作業ツリー）→ git add でステージへ → git commit でリポジトリ（歴史）へ、の順に進みます。',
            topic: '3つのエリア', pageId: 'three-areas'
          },
          {
            q: '編集した変更をステージに乗せるコマンドは？',
            choices: ['`git add`', '`git commit`', '`git push`'],
            answer: 0,
            explain: '`git add` でコミットに含めたい変更をステージに乗せます。全部まとめてなら `git add .`。',
            topic: 'git add', pageId: 'git-add'
          },
          {
            q: 'ステージの変更を「メッセージ付きで」歴史に確定するコマンドは？',
            choices: [
              '`git save -m "..."`',
              '`git commit -m "..."`',
              '`git log -m "..."`'
            ],
            answer: 1,
            explain: '`git commit -m "メッセージ"` で確定します。メッセージは「何をしたか」が一目でわかる短い文にします。',
            topic: 'git commit', pageId: 'git-commit'
          },
          {
            q: 'コミットの歴史を1行ずつすっきり表示するには？',
            choices: ['`git log --oneline`', '`git status -s`', '`git diff --short`'],
            answer: 0,
            explain: '`git log --oneline` で1コミット1行になります。表示から抜けるときは `q` です。',
            topic: 'git log --oneline', pageId: 'git-log'
          },
          {
            q: '`.gitignore` の役割は？',
            choices: [
              'コミットを自動で作る',
              'git に記録させたくないファイルを指定する',
              'ファイルを暗号化する'
            ],
            answer: 1,
            explain: '`.gitignore` に書いたファイルは git が無視します。パスワードや一時ファイルを除外するのに使います。',
            topic: '.gitignore', pageId: 'gitignore'
          }
        ]
      },

      /* =================================================================
         章3 ブランチ
         ================================================================= */
      {
        id: 'branch',
        title: 'ブランチ',
        summary: 'ブランチとは / branch / switch / merge / コンフリクト',
        pages: [
          {
            id: 'what-is-branch',
            title: 'ブランチってなに？',
            navTitle: 'ブランチとは',
            blocks: [
              { type: 'text', html: '[[ブランチ]]とは、作業を枝分かれさせて記録する「線」のことです。木の幹から枝が分かれるイメージで、英語の branch（枝）が由来です。' },
              { type: 'text', html: '中心となる本流が[[mainブランチ]]です。新しい機能を試したいときは main から枝を分け、その枝の上で作業します。こうすれば、本流をこわさずに安全に変更を試せます。' },
              { type: 'terminal', title: 'ブランチのイメージ', lines: [
                { out: 'main      ●───●───●' },
                { out: '               \\' },
                { out: 'feature         ●───●   ← ここで安全に作業' }
              ]},
              { type: 'callout', variant: 'hint', html: 'うまくいったら枝の変更を本流に合流（[[マージ]]）し、ダメなら枝ごと捨てればOK。失敗しても本流は無傷、というのがブランチの安心ポイントです。' }
            ]
          },
          {
            id: 'git-branch',
            title: '一覧を見る `git branch`',
            navTitle: 'git branch',
            blocks: [
              { type: 'text', html: 'いまあるブランチの一覧を見るのが `git branch` です。`*` が付いているのが、いま自分がいるブランチです。' },
              { type: 'terminal', title: 'bash — ~/my-app', lines: [
                { cmd: 'git branch' },
                { out: '* main' },
                { out: '  feature/login' }
              ]},
              { type: 'callout', variant: 'hint', html: 'ブランチ名には `feature/login` のように `/` を使った分類をよく付けます（feature＝機能追加など）。名前だけで何の作業かわかると親切です。' }
            ]
          },
          {
            id: 'git-switch',
            title: '切り替える `git switch`',
            navTitle: 'git switch',
            blocks: [
              { type: 'text', html: '作業する[[ブランチ]]を移動するには `git switch` を使います。たとえば `feature/login` に移りたいときは次のように打ちます。' },
              { type: 'terminal', title: 'bash — ~/my-app', lines: [
                { cmd: 'git switch feature/login' },
                { ok: "Switched to branch 'feature/login'" }
              ]},
              { type: 'text', html: '新しいブランチを作って、同時にそこへ移動したいときは `-c` を付けます。`-c` は create（作る）の頭文字です。' },
              { type: 'terminal', title: 'bash — ~/my-app', lines: [
                { cmd: 'git switch -c feature/signup' },
                { ok: "Switched to a new branch 'feature/signup'" }
              ]},
              { type: 'callout', variant: 'warn', html: '昔は[[git checkout|git checkout]]という1つのコマンドで切り替えていました。今でも他の人の資料で見かけるかもしれませんが、紛らわしさを減らすため、切り替えは `switch`・ファイルを元に戻すのは `restore` に分かれました。これから覚えるなら `switch` でOKです。' }
            ]
          },
          {
            id: 'git-merge',
            title: '取り込む `git merge`',
            navTitle: 'git merge',
            blocks: [
              { type: 'text', html: '枝で進めた作業を本流に合流させるのが[[マージ]]です。`git merge` は「いまいるブランチに、指定したブランチの変更を取り込む」コマンドです。' },
              { type: 'text', html: 'たとえば `feature/login` の成果を `main` に取り込むときは、まず取り込み先である `main` に移動してから merge します。' },
              { type: 'terminal', title: 'bash — ~/my-app', lines: [
                { cmd: 'git switch main' },
                { cmd: 'git merge feature/login' },
                { ok: 'Merge made by the \'recursive\' strategy.' }
              ]},
              { type: 'callout', variant: 'hint', html: 'ポイントは「取り込み先に移動してから merge する」こと。merge のうしろに書くのは「持ってくる側」のブランチ名です。' }
            ]
          },
          {
            id: 'conflict',
            title: 'コンフリクトってなに？',
            navTitle: 'コンフリクト',
            blocks: [
              { type: 'text', html: '[[マージ]]のとき、同じファイルの同じ場所を別々に変えていると、git は「どちらを採用すべきか」を決められません。これが[[コンフリクト]]（衝突）です。エラーではなく、「人間が選んでね」というお願いです。' },
              { type: 'terminal', title: 'コンフリクトの表示（ファイルの中）', lines: [
                { out: '<<<<<<< HEAD' },
                { out: 'いまのブランチ側の内容' },
                { out: '=======' },
                { out: '取り込もうとした側の内容' },
                { out: '>>>>>>> feature/login' }
              ]},
              { type: 'heading', text: '最小の解決手順' },
              { type: 'list', ordered: true, items: [
                '`<<<<<<<` `=======` `>>>>>>>` の記号がある場所を開きます。',
                'どちらを残すか（または両方を合わせるか）を決め、記号も含めて正しい内容に書き直します。',
                '直したら `git add ファイル名` で「解決済み」にします。',
                '最後に `git commit` で合流を確定します。'
              ]},
              { type: 'callout', variant: 'hint', html: 'コンフリクトは慣れた人でも起きる、ふつうのことです。あわてず、記号を消して内容を整え、add → commit。これだけで解決できます。' }
            ]
          }
        ],
        quiz: [
          {
            q: 'ブランチの説明として正しいのはどれ？',
            choices: [
              'ファイルを削除する機能',
              '作業を枝分かれさせ、本流をこわさず変更を試せる仕組み',
              'コミットメッセージのこと'
            ],
            answer: 1,
            explain: 'ブランチは作業を枝分かれさせる「線」。本流（main）を守りながら、別の場所で安全に試せます。',
            topic: 'ブランチとは', pageId: 'what-is-branch'
          },
          {
            q: 'いまいるブランチから `feature/login` へ移動するコマンドは？',
            choices: [
              '`git branch feature/login`',
              '`git switch feature/login`',
              '`git merge feature/login`'
            ],
            answer: 1,
            explain: '移動には `git switch`。`git branch` は一覧・作成、`git merge` は取り込みです。',
            topic: 'git switch', pageId: 'git-switch'
          },
          {
            q: '新しいブランチを作って同時に移動するには？',
            choices: [
              '`git switch -c 新しい名前`',
              '`git switch -m 新しい名前`',
              '`git branch -d 新しい名前`'
            ],
            answer: 0,
            explain: '`-c`（create）を付けると、作成と移動を同時に行えます。`-d` は削除なので要注意です。',
            topic: 'git switch -c', pageId: 'git-switch'
          },
          {
            q: '`feature/login` の変更を `main` に取り込むときの正しい流れは？',
            choices: [
              '`feature/login` にいる状態で `git merge main`',
              '`main` に移動してから `git merge feature/login`',
              'どこにいても `git merge` だけでよい'
            ],
            answer: 1,
            explain: '取り込み先（main）に移動してから、持ってくる側（feature/login）を merge します。',
            topic: 'git merge', pageId: 'git-merge'
          },
          {
            q: 'コンフリクトが起きたあと、内容を直したら次にすることは？',
            choices: [
              'パソコンを再起動する',
              '直したファイルを `git add` して `git commit` する',
              '何もしなくてよい'
            ],
            answer: 1,
            explain: '記号を消して内容を整えたら、`git add` で解決済みにし、`git commit` で合流を確定します。',
            topic: 'コンフリクトの解決', pageId: 'conflict'
          }
        ]
      },

      /* =================================================================
         章4 GitHubと連携
         ================================================================= */
      {
        id: 'github',
        title: 'GitHubと連携',
        summary: 'GitHub とは / clone / remote / push / pull・fetch / 認証',
        pages: [
          {
            id: 'what-is-github',
            title: 'GitHub ってなに？',
            navTitle: 'GitHub とは',
            blocks: [
              { type: 'text', html: '[[GitHub]]は、git の記録（[[リポジトリ]]）をインターネット上に置いて、共有・共同作業できるようにするサービスです。手元のパソコンの外にある置き場なので[[リモート]]と呼びます。' },
              { type: 'text', html: 'GitHub に上げておくと、別のパソコンからも続きが作業でき、チームのメンバーと同じリポジトリを共有できます。バックアップ代わりにもなります。' },
              { type: 'callout', variant: 'hint', html: '手元にあるリポジトリを[[ローカル]]、GitHub 上のものを[[リモートリポジトリ]]と呼びます。この2つを行き来させるのが、次に出てくる push と pull です。' }
            ]
          },
          {
            id: 'git-clone',
            title: 'コピーしてくる `git clone`',
            navTitle: 'git clone',
            blocks: [
              { type: 'text', html: 'GitHub などにある[[リモートリポジトリ]]を、まるごと手元にコピーしてくるのが[[クローン|git clone]]です。歴史ごと全部ダウンロードされ、すぐ作業を始められます。' },
              { type: 'terminal', title: 'bash — ~/projects', lines: [
                { cmd: 'git clone https://github.com/user/my-app.git' },
                { out: "Cloning into 'my-app'..." },
                { out: '# my-app フォルダができ、その中に歴史ごと入ります' }
              ]},
              { type: 'callout', variant: 'hint', html: 'clone は最初の1回だけ。一度クローンすれば、あとは pull で最新を取り込みます。コピー元 URL は GitHub のページの「Code」ボタンから取得できます。' }
            ]
          },
          {
            id: 'git-remote',
            title: 'つながり先を見る `git remote`',
            navTitle: 'git remote',
            blocks: [
              { type: 'text', html: 'いまのリポジトリがどの[[リモート]]とつながっているかを確認するのが `git remote` です。`-v` を付けると URL まで表示されます。' },
              { type: 'terminal', title: 'bash — ~/projects/my-app', lines: [
                { cmd: 'git remote -v' },
                { out: 'origin  https://github.com/user/my-app.git (fetch)' },
                { out: 'origin  https://github.com/user/my-app.git (push)' }
              ]},
              { type: 'text', html: 'ここに出てくる[[origin]]は、つながり先リモートに付けられた既定の「あだ名」です。clone するとふつう自動で `origin` という名前が付きます。' },
              { type: 'callout', variant: 'hint', html: '自分で作ったローカルリポジトリを GitHub につなぐときは `git remote add origin <URL>` で「あだ名 origin ＝ この URL」と登録します。' }
            ]
          },
          {
            id: 'git-push',
            title: '送る `git push`',
            navTitle: 'git push',
            blocks: [
              { type: 'text', html: '手元（[[ローカル]]）の[[コミット]]を、GitHub などの[[リモート]]へ送ってアップロードするのが[[プッシュ|git push]]です。これでチームに変更が共有されます。' },
              { type: 'text', html: '初めてそのブランチを push するときは `-u` を付けて、「このローカルブランチは origin のこのブランチとつながっている」と覚えさせます。' },
              { type: 'terminal', title: 'bash — ~/projects/my-app', lines: [
                { cmd: 'git push -u origin main' },
                { out: '# 以降はこのブランチで `git push` だけで送れるようになります' }
              ]},
              { type: 'callout', variant: 'hint', html: '`-u` は最初の1回だけでOK。2回目からは `git push` と打つだけで、つながり先へ送られます。' }
            ]
          },
          {
            id: 'pull-fetch',
            title: '`git pull` と `git fetch` の違い',
            navTitle: 'pull と fetch',
            blocks: [
              { type: 'text', html: '[[リモート]]の最新を手元に取り込む方法は2つあります。似ていますが、ファイルに反映するかどうかが違います。' },
              { type: 'list', items: [
                '[[フェッチ|git fetch]] … 最新の情報を「取ってくるだけ」。手元のファイルはまだ変わりません。中身を確認してから取り込みたいとき向けです。',
                '[[プル|git pull]] … 取ってきて、さらに手元のブランチに合流まで行います（fetch + merge）。すぐ最新に合わせたいとき向けです。'
              ]},
              { type: 'terminal', title: 'bash — ~/projects/my-app', lines: [
                { cmd: 'git pull' },
                { out: '# リモートの最新を取得して、いまのブランチに取り込みます' }
              ]},
              { type: 'callout', variant: 'hint', html: 'ふだんは `git pull` で十分です。「まず内容だけ見たい」ときに `git fetch` を思い出せれば大丈夫です。' }
            ]
          },
          {
            id: 'auth',
            title: '認証ざっくり',
            navTitle: '認証',
            blocks: [
              { type: 'text', html: 'GitHub に push するときなどは、「あなたが本人か」を確かめる[[認証]]が必要です。ここは深入りせず、要点だけおさえます。' },
              { type: 'callout', variant: 'warn', html: '以前はパスワードで認証できましたが、**いまは GitHub のパスワード認証は廃止**されています。パスワードをそのまま使うことはできません。' },
              { type: 'text', html: 'いまの主な方法は次の2つです。最初はどちらか一方を用意すればOKです。' },
              { type: 'list', items: [
                'HTTPS ＋ [[PAT]] … パスワードの代わりに「個人用アクセストークン」という長い合言葉を使います。GitHub の設定画面で発行します。',
                '[[SSH]] … あらかじめ「鍵」を作って GitHub に登録しておく方法です。一度設定すれば、以降は合言葉の入力が不要になります。'
              ]},
              { type: 'callout', variant: 'hint', html: '細かい手順は使う環境で変わります。まずは「パスワードではなく、PAT か SSH を使う」とだけ覚えておけば十分です。' }
            ]
          }
        ],
        quiz: [
          {
            q: 'リモートリポジトリを、歴史ごと手元にコピーしてくるコマンドは？',
            choices: ['`git copy`', '`git clone`', '`git pull`'],
            answer: 1,
            explain: '`git clone <URL>` でリモートをまるごと手元に複製します。最初の1回だけ使います。',
            topic: 'git clone', pageId: 'git-clone'
          },
          {
            q: 'clone したときにリモートへ自動で付く既定の「あだ名」は？',
            choices: ['`main`', '`origin`', '`remote`'],
            answer: 1,
            explain: 'ふつう `origin` という名前が付きます。`git remote -v` でつながり先の URL を確認できます。',
            topic: 'origin / git remote', pageId: 'git-remote'
          },
          {
            q: '手元のコミットをリモート（GitHub）へ送るコマンドは？',
            choices: ['`git push`', '`git pull`', '`git fetch`'],
            answer: 0,
            explain: '`git push` で手元のコミットをリモートへアップロードします。初回は `-u origin ブランチ名` を付けます。',
            topic: 'git push', pageId: 'git-push'
          },
          {
            q: '`git fetch` と `git pull` の違いとして正しいのは？',
            choices: [
              'fetch は取ってくるだけ、pull は取ってきて合流まで行う',
              'fetch は送信、pull は受信',
              '2つはまったく同じ'
            ],
            answer: 0,
            explain: 'fetch は「取ってくるだけ」、pull は「fetch ＋ merge（合流）」です。ふだんは pull で十分です。',
            topic: 'pull と fetch の違い', pageId: 'pull-fetch'
          },
          {
            q: 'いまの GitHub の認証について正しいのは？',
            choices: [
              'パスワードをそのまま使う',
              'パスワード認証は廃止され、PAT か SSH を使う',
              '認証はもう不要になった'
            ],
            answer: 1,
            explain: 'パスワード認証は廃止されました。HTTPS＋PAT（個人用アクセストークン）か SSH を使います。',
            topic: '認証（PAT / SSH）', pageId: 'auth'
          }
        ]
      },

      /* =================================================================
         章5 PRがマージされるまで
         ================================================================= */
      {
        id: 'pr',
        title: 'PRがマージされるまで',
        summary: 'PR とは / 全体の流れ / branch→commit→push / PR作成 / レビュー対応 / マージ / 後片付け',
        pages: [
          {
            id: 'what-is-pr',
            title: 'プルリクエスト（PR）ってなに？',
            navTitle: 'PR とは',
            blocks: [
              { type: 'text', html: '[[プルリクエスト]]（[[PR]]）とは、「自分のブランチの変更を、本流（main など）に取り込んでください」と GitHub 上でお願いし、取り込む前に[[レビュー]]してもらうための仕組みです。Pull Request を略して PR と呼びます。' },
              { type: 'text', html: 'いきなり main に直接[[マージ]]するのではなく、PR を挟むことで「他の人が変更を確認し、コメントし、納得してから取り込む」という流れを作れます。チーム開発の中心になる仕組みです。' },
              { type: 'callout', variant: 'hint', html: 'PR は「変更の提案書」のようなもの。何を・なぜ変えたかを書いておくと、レビューする人が読みやすくなります。' }
            ]
          },
          {
            id: 'pr-flow',
            title: '全体の流れ',
            navTitle: '全体の流れ',
            blocks: [
              { type: 'text', html: 'PR がマージされるまでの大きな流れを、先に地図として見ておきましょう。1つずつは次のページから説明します。' },
              { type: 'list', ordered: true, items: [
                '作業用の[[ブランチ]]を作る（main から枝分かれ）。',
                'コードを変更して[[コミット]]する。',
                'ブランチを GitHub に[[プッシュ|push]]する。',
                'GitHub で[[PR]]を作る。',
                '[[レビュー]]を受け、コメントに対応する（必要なら直して push）。',
                'OK が出たら[[マージ]]して、本流に取り込む。',
                '使い終わったブランチを片付ける。'
              ]},
              { type: 'terminal', title: '流れのイメージ', lines: [
                { out: 'branch → commit → push → PR作成 → レビュー対応 → マージ → 後片付け' }
              ]},
              { type: 'callout', variant: 'hint', html: '最初の3つ（branch → commit → push）は手元の git 操作、後半（PR作成 → マージ）は GitHub の画面での操作、という分担です。' }
            ]
          },
          {
            id: 'branch-commit-push',
            title: 'ブランチ作成 → コミット → push',
            navTitle: 'branch→commit→push',
            blocks: [
              { type: 'text', html: 'まず手元で、作業用ブランチを作って変更を記録し、GitHub に送るところまでを行います。ここは章2・章3・章4で習ったコマンドの組み合わせです。' },
              { type: 'terminal', title: 'bash — ~/projects/my-app', lines: [
                { out: '# 1. 作業用ブランチを作って移動' },
                { cmd: 'git switch -c feature/login' },
                { out: '# 2. ファイルを編集したら、変更を記録' },
                { cmd: 'git add .' },
                { cmd: 'git commit -m "ログイン画面を追加"' },
                { out: '# 3. GitHub に送る（初回は -u を付ける）' },
                { cmd: 'git push -u origin feature/login' }
              ]},
              { type: 'callout', variant: 'hint', html: 'push が終わると、GitHub の画面に「Compare & pull request」というボタンが出ます。これが次の PR 作成への入り口です。' }
            ]
          },
          {
            id: 'create-pr',
            title: 'GitHub で PR を作る',
            navTitle: 'PR を作る',
            blocks: [
              { type: 'text', html: 'ここからは GitHub の画面での操作です。push したあとにリポジトリのページを開くと、PR を作るためのボタンが表示されます。' },
              { type: 'heading', text: '作成の手順' },
              { type: 'list', ordered: true, items: [
                '「Compare & pull request」ボタンを押します。',
                '取り込み先（base）が `main`、取り込む側（compare）が自分のブランチになっているか確認します。',
                'タイトルと説明に「何を・なぜ変えたか」を書きます。',
                '「Create pull request」を押すと PR ができ上がります。'
              ]},
              { type: 'callout', variant: 'hint', html: '説明欄に、確認してほしいポイントや動作確認の結果を書いておくと、レビューがスムーズに進みます。スクリーンショットを貼るのも効果的です。' }
            ]
          },
          {
            id: 'review',
            title: 'レビューとコメント対応',
            navTitle: 'レビュー対応',
            blocks: [
              { type: 'text', html: 'PR を作ると、チームのメンバーが変更を[[レビュー]]し、コメントを付けてくれます。「ここはこう直したほうがよい」といった指摘に対応していきます。' },
              { type: 'text', html: '修正のしかたは簡単です。**同じブランチで直してコミットし、もう一度 push するだけ**。PR は同じブランチを見ているので、push した内容が自動で PR に反映されます。新しく PR を作り直す必要はありません。' },
              { type: 'terminal', title: 'bash — ~/projects/my-app（feature/login にいる状態）', lines: [
                { out: '# 指摘を直したら、同じようにコミットして push' },
                { cmd: 'git add .' },
                { cmd: 'git commit -m "レビュー指摘: ボタンの色を修正"' },
                { cmd: 'git push' },
                { out: '# → PR に自動で反映されます' }
              ]},
              { type: 'callout', variant: 'hint', html: 'コメントには返信もできます。「直しました」「ここはこういう理由でこのままにしました」と一言添えると、やり取りがスムーズです。' }
            ]
          },
          {
            id: 'merge',
            title: 'マージする',
            navTitle: 'マージ',
            blocks: [
              { type: 'text', html: 'レビューで OK（承認）が出たら、いよいよ[[マージ]]です。GitHub の PR ページの「Merge pull request」ボタンで、変更を本流に取り込みます。' },
              { type: 'text', html: 'マージのしかたには3種類あり、ボタンから選べます。違いを一言ずつおさえておきましょう。' },
              { type: 'list', items: [
                '**Merge commit** … 枝の歴史をそのまま残し、合流の記録（[[マージコミット]]）を1つ作ります。',
                '**Squash** … 枝のコミットを1つにまとめてから取り込みます。歴史がすっきりします。',
                '**Rebase** … 枝のコミットを本流の先につなぎ直し、一本道の歴史にします（[[リベース]]）。'
              ]},
              { type: 'callout', variant: 'hint', html: 'どれを使うかはチームの方針によります。迷ったら、まわりに合わせればOK。初学者のうちは「3種類あるんだな」とわかっていれば十分です。' }
            ]
          },
          {
            id: 'cleanup',
            title: 'マージ後の後片付け',
            navTitle: '後片付け',
            blocks: [
              { type: 'text', html: 'マージが終わったら、役目を終えたブランチを片付けます。これで次の作業を気持ちよく始められます。' },
              { type: 'heading', text: '片付けの手順' },
              { type: 'list', ordered: true, items: [
                'GitHub の PR ページで「Delete branch」を押し、リモートの作業ブランチを消します。',
                '手元でも本流に戻ります（`git switch main`）。',
                'マージされた最新を取り込みます（`git pull`）。'
              ]},
              { type: 'terminal', title: 'bash — ~/projects/my-app', lines: [
                { cmd: 'git switch main' },
                { cmd: 'git pull' },
                { out: '# これで手元の main が最新になりました' }
              ]},
              { type: 'callout', variant: 'hint', html: '手元に残った作業ブランチは `git branch -d feature/login` で消せます。次の機能はまた `git switch -c` で新しい枝を作るところから。これがチーム開発の基本サイクルです。' }
            ]
          }
        ],
        quiz: [
          {
            q: 'プルリクエスト（PR）の説明として正しいのはどれ？',
            choices: [
              'ファイルを削除する操作',
              '変更を本流に取り込む前に、レビューしてもらうための仕組み',
              'パソコンを再起動するコマンド'
            ],
            answer: 1,
            explain: 'PR は「この変更を取り込んでください」とお願いし、取り込む前にレビューを受けるための仕組みです。',
            topic: 'PR とは', pageId: 'what-is-pr'
          },
          {
            q: 'PR を作るまでの、手元での操作の正しい順番は？',
            choices: [
              'push → commit → branch',
              'ブランチ作成 → commit → push',
              'commit → push → ブランチ作成'
            ],
            answer: 1,
            explain: '作業用ブランチを作り（switch -c）→ 変更を commit → push、の順です。push 後に GitHub で PR を作ります。',
            topic: 'branch→commit→push', pageId: 'branch-commit-push'
          },
          {
            q: 'レビューで指摘を受けたとき、修正を PR に反映するには？',
            choices: [
              '新しい PR を作り直す',
              '同じブランチで直してコミットし、もう一度 push する',
              '何もしなくてよい'
            ],
            answer: 1,
            explain: '同じブランチで commit して push すれば、その内容が自動で PR に反映されます。作り直しは不要です。',
            topic: 'レビュー対応', pageId: 'review'
          },
          {
            q: 'マージの方法「Squash」の説明として正しいのはどれ？',
            choices: [
              '枝のコミットを1つにまとめてから取り込む',
              'ブランチを削除する',
              '変更を取り消す'
            ],
            answer: 0,
            explain: 'Squash は枝の複数コミットを1つにまとめて取り込み、歴史をすっきりさせる方法です。',
            topic: 'マージの種類', pageId: 'merge'
          },
          {
            q: 'マージ後の後片付けとして正しい流れは？',
            choices: [
              '作業ブランチに残り続ける',
              '`git switch main` で本流に戻り、`git pull` で最新を取り込む',
              'リポジトリごと削除する'
            ],
            answer: 1,
            explain: '不要になったブランチを削除し、`git switch main` → `git pull` で手元の本流を最新にします。',
            topic: 'マージ後の後片付け', pageId: 'cleanup'
          }
        ]
      }
    ]
  });
})();
