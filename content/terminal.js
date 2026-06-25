/* =========================================================================
   content/terminal.js — 教材A 🖥️ ターミナルコマンド
   window.COURSES へ push する。データのみ（表示は render/router 側）。
   方針: 1ページ1コマンド／情報量少なめ／ですます調／用語は [[ ]] でチップ化。
   ========================================================================= */
(function () {
  'use strict';
  window.COURSES = window.COURSES || [];

  window.COURSES.push({
    id: 'terminal',
    title: 'ターミナルコマンド',
    emoji: '🖥️',
    description: '黒い画面（ターミナル）の基本操作。`pwd` `ls` `cd` など、まずはここから。',
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
      }
    ]
  });
})();
