/* =========================================================================
   content/terminal.js — 教材A シェルコマンド（アイコン: terminal）
   window.COURSES へ push する。データのみ（表示は render/router 側）。
   方針: 1ページ1コマンド／情報量少なめ／ですます調／用語は [[ ]] でチップ化。
   ========================================================================= */
(function () {
  'use strict';
  window.COURSES = window.COURSES || [];

  window.COURSES.push({
    id: 'terminal',
    title: 'シェルコマンド',
    icon: 'terminal', // 教材アイコン（ターミナル窓ロゴ）。router 側で Icon(course.icon)。
    description: 'ターミナルで使う基本のシェルコマンド。`pwd` `ls` `cd` などから、よく使う `vi` まで。',
    chapters: [

      /* =================================================================
         章1 ターミナルの基本
         ================================================================= */
      {
        id: 'basics',
        title: 'ターミナルの基本',
        summary: 'ターミナルとは / pwd / ls / cd',
        pages: [
          {
            id: 'what-is-terminal',
            title: 'ターミナルってなに？',
            navTitle: 'ターミナルとは',
            blocks: [
              { type: 'text', html: '[[ターミナル]]とは、キーボードで文字を打ってコンピュータに指示を出すためのアプリです。ふだんマウスでアイコンをクリックして行う操作を、文字の[[コマンド]]で行います。' },
              { type: 'text', html: '最初は「黒い画面」に少しドキドキするかもしれません。でも、やることは「短い言葉を打って Enter を押す」だけ。1つずつ覚えれば、こわくありません。' },
              { type: 'terminal', title: 'ターミナルの見た目', lines: [
                { out: '# $ のうしろにコマンドを打って Enter を押します' },
                { cmd: 'pwd' },
                { out: '/Users/you' }
              ]},
              { type: 'callout', variant: 'hint', html: '行頭の `$` は「ここからコマンドを打ってね」という目印（プロンプト）です。`$` 自体は打ちません。このサイトでも `$` のうしろの部分だけを打ちます。' }
            ]
          },
          {
            id: 'pwd',
            title: 'いまどこ？を確かめる `pwd`',
            navTitle: 'pwd',
            blocks: [
              { type: 'text', html: 'ターミナルでは、つねに「自分がどの[[ディレクトリ|ディレクトリ]]（フォルダ）にいるか」が決まっています。これを[[カレントディレクトリ]]といいます。' },
              { type: 'text', html: 'いまいる場所を確かめるコマンドが `pwd` です。print working directory（作業中のディレクトリを表示）の頭文字です。' },
              { type: 'terminal', title: 'bash — ~', lines: [
                { cmd: 'pwd' },
                { out: '/Users/you/projects' }
              ]},
              { type: 'callout', variant: 'hint', html: '迷子になったと感じたら、まず `pwd`。いまの[[パス]]（住所）がわかれば落ち着けます。' }
            ]
          },
          {
            id: 'ls',
            title: '中身を見る `ls`',
            navTitle: 'ls',
            blocks: [
              { type: 'text', html: 'いまいるディレクトリの中に何があるかを一覧表示するのが `ls` です。list（リスト）の略です。' },
              { type: 'terminal', title: 'bash — ~/projects', lines: [
                { cmd: 'ls' },
                { out: 'app.js   README.md   images' }
              ]},
              { type: 'text', html: 'うしろに[[オプション]]を付けると表示を変えられます。よく使う2つだけ覚えておきましょう。' },
              { type: 'list', items: [
                '`ls -l` … 縦に1つずつ、サイズや更新日などくわしく表示します。',
                '`ls -a` … 先頭が `.` の「かくしファイル」も表示します（`.gitignore` など）。'
              ]},
              { type: 'terminal', title: 'bash — ~/projects', lines: [
                { cmd: 'ls -a' },
                { out: '.   ..   .gitignore   app.js   README.md   images' }
              ]},
              { type: 'callout', variant: 'hint', html: 'オプションはまとめて `ls -la` のように書けます。最初は「くわしく＋かくしファイルも」の `ls -la` を覚えておくと便利です。' }
            ]
          },
          {
            id: 'cd',
            title: '移動する `cd`',
            navTitle: 'cd',
            blocks: [
              { type: 'text', html: 'ディレクトリ（フォルダ）を移動するコマンドが `cd` です。change directory（ディレクトリを変える）の略です。うしろに行きたい場所の名前を書きます。' },
              { type: 'terminal', title: 'bash — ~', lines: [
                { cmd: 'cd projects' },
                { out: '# projects フォルダの中に入りました（何も表示されなければ成功）' },
                { cmd: 'pwd' },
                { out: '/Users/you/projects' }
              ]},
              { type: 'heading', text: '覚えておくと便利な書き方' },
              { type: 'list', items: [
                '`cd ..` … 1つ上のディレクトリに戻ります（`..` が「親」を表します）。',
                '`cd ~` … [[ホームディレクトリ]]（自分の作業フォルダ）に戻ります。`~`（チルダ）だけでもOK。',
                '`cd /` … [[ルートディレクトリ]]（一番上）に移動します。'
              ]},
              { type: 'heading', text: '相対パスと絶対パス' },
              { type: 'text', html: '行き先の書き方には2種類あります。いまいる場所を基準にするのが[[相対パス]]、一番上から全部書くのが[[絶対パス]]です。' },
              { type: 'terminal', title: 'bash', lines: [
                { out: '# 相対パス：いまいる場所から見た書き方' },
                { cmd: 'cd images' },
                { out: '# 絶対パス：一番上から全部書く（どこにいても同じ場所へ）' },
                { cmd: 'cd /Users/you/projects/images' }
              ]},
              { type: 'callout', variant: 'hint', html: '名前を全部打たなくても、途中まで打って Tab キーを押すと続きを自動で補完してくれます（タブ補完）。打ち間違いも減るのでおすすめです。' }
            ]
          }
        ],
        quiz: [
          {
            q: 'いま自分がどのディレクトリにいるかを表示するコマンドは？',
            choices: ['`ls`', '`pwd`', '`cd`'],
            answer: 1,
            explain: '`pwd`（print working directory）でいまいる場所がわかります。`ls` は中身の一覧、`cd` は移動です。',
            topic: 'pwd', pageId: 'pwd'
          },
          {
            q: 'いまいるディレクトリの中身（ファイルやフォルダ）を一覧で見るコマンドは？',
            choices: ['`ls`', '`pwd`', '`cd ..`'],
            answer: 0,
            explain: '`ls`（list）で中身を一覧表示できます。',
            topic: 'ls', pageId: 'ls'
          },
          {
            q: '`ls -a` を使うとどうなりますか？',
            choices: [
              'ファイルをサイズ順に並べる',
              '先頭が `.` のかくしファイルも表示する',
              'ファイルをすべて削除する'
            ],
            answer: 1,
            explain: '`-a`（all）で `.gitignore` のようなかくしファイルも表示されます。くわしく見たいときの `-l` とよく一緒に使います。',
            topic: 'ls のオプション', pageId: 'ls'
          },
          {
            q: '1つ上のディレクトリに戻るコマンドは？',
            choices: ['`cd ~`', '`cd /`', '`cd ..`'],
            answer: 2,
            explain: '`..` は「親ディレクトリ」を表すので、`cd ..` で1つ上に戻れます。`~` はホーム、`/` はルートです。',
            topic: 'cd（上に戻る）', pageId: 'cd'
          },
          {
            q: '「いまいる場所を基準にした住所」の書き方を何と呼びますか？',
            choices: ['絶対パス', '相対パス', 'ホームパス'],
            answer: 1,
            explain: 'いまいる場所が基準なら「相対パス」。一番上から全部書くのが「絶対パス」です。',
            topic: '相対パスと絶対パス', pageId: 'cd'
          }
        ]
      },

      /* =================================================================
         章2 ファイルとフォルダの操作
         ================================================================= */
      {
        id: 'files',
        title: 'ファイルとフォルダの操作',
        summary: 'mkdir / touch / cp / mv / rm / パスの考え方',
        pages: [
          {
            id: 'mkdir',
            title: 'フォルダを作る `mkdir`',
            navTitle: 'mkdir',
            blocks: [
              { type: 'text', html: '新しいフォルダ（[[ディレクトリ]]）を作るコマンドが `mkdir` です。make directory（ディレクトリを作る）の略です。うしろに作りたい名前を書きます。' },
              { type: 'terminal', title: 'bash — ~/projects', lines: [
                { cmd: 'mkdir my-app' },
                { out: '# my-app フォルダができました' },
                { cmd: 'ls' },
                { out: 'my-app' }
              ]},
              { type: 'callout', variant: 'hint', html: 'フォルダ名にスペースは入れないのが無難です。区切りたいときは `my-app` のようにハイフンか、`my_app` のようにアンダースコアを使いましょう。' }
            ]
          },
          {
            id: 'touch',
            title: '空ファイルを作る `touch`',
            navTitle: 'touch',
            blocks: [
              { type: 'text', html: '空っぽのファイルを新しく作るときは `touch` を使います。うしろにファイル名を書きます。' },
              { type: 'terminal', title: 'bash — ~/projects/my-app', lines: [
                { cmd: 'touch index.html' },
                { cmd: 'ls' },
                { out: 'index.html' }
              ]},
              { type: 'callout', variant: 'hint', html: '`touch` はもともと「ファイルの更新日時を今にする」コマンドですが、ファイルが無ければ新しく作ってくれます。とりあえず空ファイルを用意したいときに便利です。' }
            ]
          },
          {
            id: 'cp',
            title: 'コピーする `cp`',
            navTitle: 'cp',
            blocks: [
              { type: 'text', html: 'ファイルをコピーするコマンドが `cp` です。copy の略で、`cp コピー元 コピー先` の順に書きます。' },
              { type: 'terminal', title: 'bash — ~/projects/my-app', lines: [
                { cmd: 'cp index.html backup.html' },
                { out: '# index.html を backup.html という名前で複製しました' },
                { cmd: 'ls' },
                { out: 'index.html   backup.html' }
              ]},
              { type: 'callout', variant: 'hint', html: 'フォルダごとコピーしたいときは `cp -r 元 先` のように `-r`（recursive＝中身も全部）を付けます。' }
            ]
          },
          {
            id: 'mv',
            title: '移動・名前変更する `mv`',
            navTitle: 'mv',
            blocks: [
              { type: 'text', html: 'ファイルを別の場所へ移動するコマンドが `mv` です。move の略で、`mv 元 先` の順に書きます。' },
              { type: 'terminal', title: 'bash — ~/projects/my-app', lines: [
                { cmd: 'mv backup.html old/' },
                { out: '# backup.html を old フォルダの中へ移動しました' }
              ]},
              { type: 'text', html: '同じ場所で名前だけを変えたいときも `mv` を使います。「移動先の名前」を変えると、結果として名前変更になります。' },
              { type: 'terminal', title: 'bash — ~/projects/my-app', lines: [
                { cmd: 'mv index.html home.html' },
                { out: '# index.html の名前を home.html に変えました' }
              ]},
              { type: 'callout', variant: 'hint', html: '`mv` は「移動」と「名前変更」を1つでこなします。コピーは残さず元が移るので、`cp`（複製が残る）との違いに注意しましょう。' }
            ]
          },
          {
            id: 'rm',
            title: '削除する `rm`',
            navTitle: 'rm',
            blocks: [
              { type: 'text', html: 'ファイルを削除するコマンドが `rm` です。remove の略です。' },
              { type: 'terminal', title: 'bash — ~/projects/my-app', lines: [
                { cmd: 'rm old.html' },
                { out: '# old.html を削除しました' }
              ]},
              { type: 'callout', variant: 'warn', html: '`rm` で消したファイルは**ゴミ箱に入りません**。元に戻すのはとても難しいです。**実行する前に、消す名前が合っているか必ず確認**してください。' },
              { type: 'text', html: 'とくに `rm -r`（フォルダごと中身も削除）や、すべてを意味する `*` との組み合わせは強力です。`rm -rf` のように打つと、中身を確認せずまとめて消えてしまいます。初学者のうちは1つずつ慎重に消すのがおすすめです。' },
              { type: 'callout', variant: 'warn', html: '`rm -rf /` のような「一番上から全部消す」コマンドは、コンピュータを壊しかねません。ネットで見かけても、意味がわからないコマンドは絶対に打たないでください。' }
            ]
          },
          {
            id: 'path-summary',
            title: 'パスの考え方まとめ',
            navTitle: 'パスの考え方',
            blocks: [
              { type: 'text', html: 'ここまでのコマンドはどれも「どのファイル／フォルダを対象にするか」を[[パス]]（住所）で指定してきました。最後にパスの考え方を整理します。' },
              { type: 'heading', text: '2種類のパス' },
              { type: 'list', items: [
                '[[相対パス]] … いまいる場所が基準。`images/logo.png`、1つ上は `../`。',
                '[[絶対パス]] … 一番上（`/`）から全部書く。`/Users/you/projects/images/logo.png`。どこにいても同じ場所を指します。'
              ]},
              { type: 'heading', text: 'よく使う記号' },
              { type: 'list', items: [
                '`.` … いまいるディレクトリそのもの。',
                '`..` … 1つ上の（親）ディレクトリ。',
                '`~` … [[ホームディレクトリ]]（自分の作業フォルダ）。',
                '`/` … [[ルートディレクトリ]]（一番上）。'
              ]},
              { type: 'terminal', title: 'bash', lines: [
                { out: '# 例：いまの場所を基準に、1つ上の docs にある file を指す' },
                { cmd: 'cp ../docs/file.txt .' },
                { out: '# 最後の . は「ここ（カレントディレクトリ）へ」の意味' }
              ]},
              { type: 'callout', variant: 'hint', html: 'パスがあやしいと感じたら `pwd` で現在地を確認 → `ls` で中身を確認。この2つを挟むだけで操作ミスがぐっと減ります。' }
            ]
          }
        ],
        quiz: [
          {
            q: '新しいフォルダ（ディレクトリ）を作るコマンドは？',
            choices: ['`touch`', '`mkdir`', '`cp`'],
            answer: 1,
            explain: '`mkdir`（make directory）でフォルダを作れます。`touch` は空ファイル、`cp` はコピーです。',
            topic: 'mkdir', pageId: 'mkdir'
          },
          {
            q: '空っぽのファイルを新しく作るのに使えるコマンドは？',
            choices: ['`touch index.html`', '`mkdir index.html`', '`rm index.html`'],
            answer: 0,
            explain: '`touch ファイル名` で空ファイルを作れます。',
            topic: 'touch', pageId: 'touch'
          },
          {
            q: '`mv index.html home.html` を実行するとどうなりますか？',
            choices: [
              'index.html をコピーして home.html も残る',
              'index.html の名前が home.html に変わる',
              'index.html と home.html の両方が消える'
            ],
            answer: 1,
            explain: '`mv` は移動と名前変更を兼ねます。同じ場所で名前を変えると、結果として「名前変更」になります（元の index.html は残りません）。',
            topic: 'mv（名前変更）', pageId: 'mv'
          },
          {
            q: '`rm` について正しいのはどれ？',
            choices: [
              '消したファイルはゴミ箱に入るので安心',
              '消すと元に戻すのは難しいので、実行前に名前を確認する',
              '実行すると確認画面が必ず出る'
            ],
            answer: 1,
            explain: '`rm` はゴミ箱を経由せずに消えてしまいます。とくに `-r` や `*` との組み合わせは強力なので、実行前の確認が大切です。',
            topic: 'rm（削除の注意）', pageId: 'rm'
          },
          {
            q: '相対パスでいまいる場所の「1つ上のフォルダ」を表す記号は？',
            choices: ['`~`', '`..`', '`/`'],
            answer: 1,
            explain: '`..` が親（1つ上）を表します。`~` はホーム、`/` はルートです。',
            topic: 'パスの記号', pageId: 'path-summary'
          },
          {
            q: 'フォルダごと（中身もまとめて）コピーしたいときに付けるオプションは？',
            choices: ['`cp -a`', '`cp -r`', '`cp -l`'],
            answer: 1,
            explain: '`-r`（recursive＝中身も再帰的に）を付けると、フォルダごとコピーできます。',
            topic: 'cp -r', pageId: 'cp'
          }
        ]
      },

      /* =================================================================
         章3 ファイルの中身を見る
         ================================================================= */
      {
        id: 'view-files',
        title: 'ファイルの中身を見る',
        summary: 'cat / less / head・tail / grep',
        pages: [
          {
            id: 'cat',
            title: 'まるごと表示する `cat`',
            navTitle: 'cat',
            blocks: [
              { type: 'text', html: 'ファイルの中身をそのまま画面に表示するコマンドが `cat` です。concatenate（つなげる）の略で、うしろに見たいファイル名を書きます。' },
              { type: 'terminal', title: 'bash — ~/projects/my-app', lines: [
                { cmd: 'cat README.md' },
                { out: '# My App' },
                { out: '' },
                { out: 'これはサンプルのアプリです。' }
              ]},
              { type: 'callout', variant: 'hint', html: '`cat` は中身を一気に全部出します。短いファイルを「ちらっと確認したい」ときにぴったりです。' },
              { type: 'callout', variant: 'warn', html: '長いファイルに `cat` を使うと、画面が一気に流れて読みづらくなります。長いファイルは次の `less` で見るのがおすすめです。' }
            ]
          },
          {
            id: 'less',
            title: 'スクロールして見る `less`',
            navTitle: 'less',
            blocks: [
              { type: 'text', html: '長いファイルを少しずつスクロールしながら読むには `less` を使います。画面に収まる分だけ表示し、キー操作で前後に動けます。' },
              { type: 'terminal', title: 'bash — ~/projects/my-app', lines: [
                { cmd: 'less log.txt' },
                { out: '# 上下キーや矢印でスクロールして読みます' }
              ]},
              { type: 'heading', text: 'less の中での操作' },
              { type: 'list', items: [
                '上下の矢印キー … 1行ずつスクロールします。',
                'スペースキー … 1画面分、下に進みます。',
                '`q` … `less` を終了して、いつものターミナルに戻ります。'
              ]},
              { type: 'callout', variant: 'hint', html: '`less` を抜けられなくなったら `q` を押せばOKです。「見るのをやめる＝`q`（quit）」と覚えておきましょう。' }
            ]
          },
          {
            id: 'head-tail',
            title: '先頭・末尾を見る `head` / `tail`',
            navTitle: 'head / tail',
            blocks: [
              { type: 'text', html: 'ファイルの「先頭だけ」を見るのが `head`、「末尾だけ」を見るのが `tail` です。どちらも初期設定では先頭/末尾の10行を表示します。' },
              { type: 'terminal', title: 'bash — ~/projects/my-app', lines: [
                { cmd: 'head log.txt' },
                { out: '# ファイルの先頭10行が表示されます' },
                { cmd: 'tail log.txt' },
                { out: '# ファイルの末尾10行が表示されます' }
              ]},
              { type: 'text', html: '行数を変えたいときは[[オプション]] `-n` を付けます。`-n 3` なら3行だけ表示します。' },
              { type: 'terminal', title: 'bash — ~/projects/my-app', lines: [
                { cmd: 'head -n 3 log.txt' },
                { out: '# 先頭3行だけ表示されます' },
                { cmd: 'tail -n 3 log.txt' },
                { out: '# 末尾3行だけ表示されます' }
              ]},
              { type: 'callout', variant: 'hint', html: 'ログの最新の数行をすぐ見たいときは `tail`、ファイルの種類を冒頭でさっと確かめたいときは `head` が便利です。' }
            ]
          },
          {
            id: 'grep',
            title: '文字列を検索する `grep`',
            navTitle: 'grep',
            blocks: [
              { type: 'text', html: 'ファイルの中から「ある文字列が含まれる行」だけを探し出すのが `grep` です。`grep 探したい文字 ファイル名` の順に書きます。' },
              { type: 'terminal', title: 'bash — ~/projects/my-app', lines: [
                { cmd: 'grep error log.txt' },
                { out: '[12:00] error: failed to connect' },
                { out: '[12:05] error: timeout' }
              ]},
              { type: 'text', html: '探した文字を含む行だけが表示されます。大量の行から目当ての箇所を見つけたいときにとても役立ちます。' },
              { type: 'callout', variant: 'hint', html: '大文字・小文字を区別せずに探したいときは[[オプション]] `-i` を付けて `grep -i error log.txt` のように書きます。`Error` も `ERROR` もまとめて見つかります。' }
            ]
          }
        ],
        quiz: [
          {
            q: 'ファイルの中身をまるごと画面に表示するコマンドは？',
            choices: ['`cat`', '`mkdir`', '`cd`'],
            answer: 0,
            explain: '`cat` でファイルの中身をそのまま表示できます。短いファイルの確認に向いています。',
            topic: 'cat', pageId: 'cat'
          },
          {
            q: '`less` でファイルを見ているとき、終了して元のターミナルに戻るキーは？',
            choices: ['`q`', '`x`', 'Enter'],
            answer: 0,
            explain: '`less` は `q`（quit）で終了します。「見るのをやめる＝q」と覚えておくと安心です。',
            topic: 'less（終了）', pageId: 'less'
          },
          {
            q: 'ファイルの「末尾10行」を表示するコマンドは？',
            choices: ['`head`', '`tail`', '`grep`'],
            answer: 1,
            explain: '末尾は `tail`、先頭は `head` です。どちらも初期設定では10行を表示します。',
            topic: 'head / tail', pageId: 'head-tail'
          },
          {
            q: '`head -n 3 log.txt` を実行するとどうなりますか？',
            choices: [
              'log.txt の先頭3行を表示する',
              'log.txt の末尾3行を表示する',
              'log.txt を3個コピーする'
            ],
            answer: 0,
            explain: '`-n` は表示する行数の指定です。`head -n 3` なら先頭3行だけ表示します。',
            topic: 'head の -n', pageId: 'head-tail'
          },
          {
            q: 'ファイルの中から、ある文字列を含む行を探すコマンドは？',
            choices: ['`grep`', '`touch`', '`ls`'],
            answer: 0,
            explain: '`grep 文字 ファイル` で、その文字を含む行だけを表示できます。',
            topic: 'grep', pageId: 'grep'
          }
        ]
      },

      /* =================================================================
         章4 テキストエディタ vi
         ================================================================= */
      {
        id: 'vi',
        title: 'テキストエディタ vi',
        summary: 'vi とは / 2つのモード / 入力 / 保存して終了 / 保存せず終了',
        pages: [
          {
            id: 'what-is-vi',
            title: 'vi ってなに？',
            navTitle: 'vi とは',
            blocks: [
              { type: 'text', html: '[[vi]]（ヴィアイ）は、ターミナルの中で動くテキストエディタです。マウスを使わず、キーボードだけでファイルを書き換えられます。' },
              { type: 'text', html: 'いちばんの強みは「どこにでも入っている」こと。多くのサーバーやパソコンに最初から用意されているので、いざというときに必ず使えます。だから基本だけでも覚えておくと安心です。' },
              { type: 'callout', variant: 'hint', html: '最近は `vi` の高機能版である `vim`（ヴィム）が使われることも多いです。基本の操作はほぼ同じなので、ここで覚えたことはそのまま `vim` でも通用します。' }
            ]
          },
          {
            id: 'vi-open-modes',
            title: 'vi を開く＆2つのモード',
            navTitle: '2つのモード',
            blocks: [
              { type: 'text', html: '`vi` でファイルを開くには、うしろにファイル名を書きます。ファイルが無ければ新しく作られます。' },
              { type: 'terminal', title: 'bash — ~/projects/my-app', lines: [
                { cmd: 'vi memo.txt' },
                { out: '# memo.txt が vi で開きます（画面いっぱいにエディタが表示されます）' }
              ]},
              { type: 'text', html: '`vi` を使ううえで最初の山場が「2つの[[モード]]」です。いまどちらのモードにいるかで、キーの意味が変わります。' },
              { type: 'heading', text: '2つのモード' },
              { type: 'list', items: [
                '[[ノーマルモード]] … 開いた直後はこちら。文字を打っても入力にならず、移動・削除・保存などの「操作」を行うモードです。',
                '[[挿入モード]] … 文字をそのまま打ち込めるモードです。ふだんのメモ帳のように入力できます。'
              ]},
              { type: 'callout', variant: 'hint', html: '迷ったら `Esc`（エスケープ）キー。`Esc` を押すと、どのモードからでも必ずノーマルモードに戻れます。「困ったら Esc」と覚えておきましょう。' }
            ]
          },
          {
            id: 'vi-insert',
            title: '文字を入力する',
            navTitle: '文字を入力する',
            blocks: [
              { type: 'text', html: '文字を入力するには、ノーマルモードで `i` を押して[[挿入モード]]に入ります。`i` は insert（挿入）の頭文字です。' },
              { type: 'heading', text: '入力の3ステップ' },
              { type: 'list', items: [
                '`i` を押す … 挿入モードに切り替わります（画面の下に `-- INSERT --` と出ます）。',
                '文字を打つ … ふつうのメモ帳のように、そのまま入力できます。',
                '`Esc` を押す … 入力を終えてノーマルモードに戻ります。'
              ]},
              { type: 'terminal', title: 'vi — memo.txt', lines: [
                { out: '# i を押す → -- INSERT -- と表示されたら入力できます' },
                { out: 'これはテストのメモです' },
                { out: '# 入力が終わったら Esc を押してノーマルモードへ戻ります' }
              ]},
              { type: 'callout', variant: 'hint', html: '入力した文字を保存するのは、このあとの `:wq` です。`Esc` を押しただけではまだ保存されていません。「入力 → Esc → 保存」の順を意識しましょう。' }
            ]
          },
          {
            id: 'vi-save-quit',
            title: '保存して終了する `:wq`',
            navTitle: '保存して終了',
            blocks: [
              { type: 'text', html: '入力した内容を保存して `vi` を閉じるには、ノーマルモードで `:wq` と打って Enter を押します。`w` は write（保存）、`q` は quit（終了）の意味です。' },
              { type: 'heading', text: '保存して終了する手順' },
              { type: 'list', items: [
                'まず `Esc` を押してノーマルモードに戻ります。',
                '`:wq` と打って Enter を押します。',
                'ファイルが保存され、ターミナルに戻ります。'
              ]},
              { type: 'terminal', title: 'vi — memo.txt', lines: [
                { out: '# Esc でノーマルモードに戻ってから、画面下にコロンから入力します' },
                { cmd: ':wq' },
                { out: '# 保存して vi を終了し、ターミナルに戻りました' }
              ]},
              { type: 'callout', variant: 'hint', html: '`:wq` と同じ働きをする `:x` という短い書き方もあります。どちらも「保存して終了」です。打ちやすいほうを使いましょう。' }
            ]
          },
          {
            id: 'vi-quit-nosave',
            title: '保存せず終了する `:q!`',
            navTitle: '保存せず終了',
            blocks: [
              { type: 'text', html: '変更を保存せずに `vi` を閉じたいときは、ノーマルモードで `:q!` と打って Enter を押します。最後の `!`（エクスクラメーション）が「変更を捨てて、強制的に終了する」という合図です。' },
              { type: 'terminal', title: 'vi — memo.txt', lines: [
                { out: '# Esc でノーマルモードに戻ってから入力します' },
                { cmd: ':q!' },
                { out: '# 変更を保存せずに vi を終了し、ターミナルに戻りました' }
              ]},
              { type: 'callout', variant: 'hint', html: 'いじっているうちに画面がおかしくなって「もうやり直したい」ときは、まず `Esc` を押してから `:q!`。変更を捨てて安全に抜けられます。困ったときの合言葉です。' },
              { type: 'callout', variant: 'warn', html: '`:q!` は入力した内容を保存せずに捨てます。せっかく書いた変更が消えるので、「残したいときは `:wq`」「捨てたいときは `:q!`」をしっかり区別しましょう。' }
            ]
          }
        ],
        quiz: [
          {
            q: 'vi を開いた直後のモードはどれですか？',
            choices: ['挿入モード', 'ノーマルモード', '検索モード'],
            answer: 1,
            explain: 'vi は開いた直後はノーマルモードです。この状態で文字を打っても入力にはならず、操作の指示になります。',
            topic: 'vi のモード', pageId: 'vi-open-modes'
          },
          {
            q: 'どのモードからでもノーマルモードに戻れるキーは？',
            choices: ['`Esc`', 'Enter', '`i`'],
            answer: 0,
            explain: '`Esc` を押すと必ずノーマルモードに戻れます。「困ったら Esc」が合言葉です。',
            topic: 'Esc キー', pageId: 'vi-open-modes'
          },
          {
            q: '文字を入力できる「挿入モード」に切り替えるキーは？',
            choices: ['`i`', '`q`', '`w`'],
            answer: 0,
            explain: 'ノーマルモードで `i`（insert）を押すと挿入モードになり、文字を打ち込めます。',
            topic: 'vi の入力', pageId: 'vi-insert'
          },
          {
            q: '入力した内容を保存して vi を終了するコマンドは？',
            choices: ['`:q!`', '`:wq`', '`Esc`'],
            answer: 1,
            explain: '`:wq`（write＋quit）で保存して終了します。`:x` でも同じです。',
            topic: 'vi 保存して終了', pageId: 'vi-save-quit'
          },
          {
            q: '変更を保存せずに vi を終了するコマンドは？',
            choices: ['`:wq`', '`:q!`', '`:x`'],
            answer: 1,
            explain: '`:q!` は変更を捨てて強制終了します。末尾の `!` が「保存せず終了」の合図です。',
            topic: 'vi 保存せず終了', pageId: 'vi-quit-nosave'
          },
          {
            q: 'vi で操作に迷ってしまったときの安全な抜け方は？',
            choices: [
              'とりあえず文字を打ち続ける',
              '`Esc` を押してから `:q!` で抜ける',
              'パソコンの電源を切る'
            ],
            answer: 1,
            explain: 'まず `Esc` でノーマルモードに戻り、`:q!` で変更を捨てて終了するのが安全です。困ったときの合言葉として覚えておきましょう。',
            topic: 'vi 困ったとき', pageId: 'vi-quit-nosave'
          }
        ]
      },

      /* =================================================================
         章5 知っておくと便利
         ================================================================= */
      {
        id: 'handy',
        title: '知っておくと便利',
        summary: 'man / clear / history / echo',
        pages: [
          {
            id: 'man',
            title: '使い方を調べる `man`',
            navTitle: 'man',
            blocks: [
              { type: 'text', html: 'コマンドの使い方やオプションを調べたいときは `man` を使います。manual（説明書）の略で、`man 調べたいコマンド名` の順に書きます。' },
              { type: 'terminal', title: 'bash — ~', lines: [
                { cmd: 'man ls' },
                { out: '# ls の説明書が表示されます（スクロールして読めます）' }
              ]},
              { type: 'callout', variant: 'hint', html: '`man` の画面は `less` と同じ操作で読めます。上下キーでスクロールし、読み終わったら `q` で元のターミナルに戻ります。' }
            ]
          },
          {
            id: 'clear',
            title: '画面をすっきりさせる `clear`',
            navTitle: 'clear',
            blocks: [
              { type: 'text', html: 'これまでの表示で画面がごちゃごちゃしてきたら `clear` を打ちます。画面の表示が消えて、すっきりした状態から再開できます。' },
              { type: 'terminal', title: 'bash — ~', lines: [
                { cmd: 'clear' },
                { out: '# 画面の表示が消えて、上のほうにプロンプトだけが残ります' }
              ]},
              { type: 'callout', variant: 'hint', html: '`clear` は表示を消すだけで、ファイルや入力した内容には影響しません。気分を切り替えたいときに気軽に使えます。`Ctrl + L` でも同じことができます。' }
            ]
          },
          {
            id: 'history',
            title: '過去のコマンドを見る `history`',
            navTitle: 'history',
            blocks: [
              { type: 'text', html: 'これまでに打ったコマンドの一覧を表示するのが `history` です。「さっき何を打ったっけ？」を思い出したいときに便利です。' },
              { type: 'terminal', title: 'bash — ~', lines: [
                { cmd: 'history' },
                { out: '  1  pwd' },
                { out: '  2  ls -la' },
                { out: '  3  cd projects' }
              ]},
              { type: 'callout', variant: 'hint', html: '1つ前に打ったコマンドは、上の矢印キーを押すだけで呼び出せます。何度か押せばさらに前のコマンドもたどれます。打ち直す手間が省けて便利です。' }
            ]
          },
          {
            id: 'echo',
            title: '文字や変数を表示する `echo`',
            navTitle: 'echo',
            blocks: [
              { type: 'text', html: '打った文字をそのまま画面に表示するのが `echo` です。うしろに書いた言葉を、そのまま出力します。' },
              { type: 'terminal', title: 'bash — ~', lines: [
                { cmd: 'echo Hello' },
                { out: 'Hello' }
              ]},
              { type: 'text', html: '`$` から始まる[[変数]]の中身を確かめるのにもよく使います。たとえば `$HOME` は[[ホームディレクトリ]]の場所が入った変数です。' },
              { type: 'terminal', title: 'bash — ~', lines: [
                { cmd: 'echo $HOME' },
                { out: '/Users/you' }
              ]},
              { type: 'callout', variant: 'hint', html: '`echo` は「いまこの変数に何が入っているか」をのぞくのに便利です。設定がうまくいっているか確認したいときによく使います。' }
            ]
          }
        ],
        quiz: [
          {
            q: 'コマンドの使い方や説明書を表示するコマンドは？',
            choices: ['`man`', '`echo`', '`clear`'],
            answer: 0,
            explain: '`man コマンド名`（manual）でそのコマンドの説明書を読めます。`q` で終了します。',
            topic: 'man', pageId: 'man'
          },
          {
            q: '`man` の画面を読み終えて、元のターミナルに戻るキーは？',
            choices: ['`q`', 'Enter', '`i`'],
            answer: 0,
            explain: '`man` は `less` と同じ操作で、`q` を押すと終了して元の画面に戻ります。',
            topic: 'man（終了）', pageId: 'man'
          },
          {
            q: '画面の表示をすっきり消すコマンドは？',
            choices: ['`history`', '`clear`', '`rm`'],
            answer: 1,
            explain: '`clear` で画面の表示を消せます。ファイルには影響しません（`Ctrl + L` でも同じ）。',
            topic: 'clear', pageId: 'clear'
          },
          {
            q: 'これまでに打ったコマンドの一覧を表示するコマンドは？',
            choices: ['`history`', '`man`', '`echo`'],
            answer: 0,
            explain: '`history` で過去に打ったコマンドの一覧を確認できます。',
            topic: 'history', pageId: 'history'
          },
          {
            q: '`echo $HOME` を実行するとどうなりますか？',
            choices: [
              '文字 `$HOME` がそのまま表示される',
              '変数 HOME の中身（ホームディレクトリの場所）が表示される',
              'ホームディレクトリが削除される'
            ],
            answer: 1,
            explain: '`echo` は変数の中身を表示します。`$HOME` にはホームディレクトリの場所が入っているので、そのパスが表示されます。',
            topic: 'echo（変数）', pageId: 'echo'
          }
        ]
      }
    ]
  });
})();
