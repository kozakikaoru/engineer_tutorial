/* =========================================================================
   router.js — hash ルーティング + 全画面の描画（window.App）
   ルート:
     #/                              TOP（教材選択）
     #/course/:courseId             章一覧
     #/page/:courseId/:chapterId/:pageId   学習ページ
     #/quiz/:courseId/:chapterId    クイズ（章テスト）
     #/review                       復習リスト
   データは window.COURSES（content/*.js が push 済み）から引く。
   ========================================================================= */
(function () {
  'use strict';

  var R = window.Render;
  var Store = window.Store;
  var COURSES = window.COURSES || [];

  // アイコン（icons.js が先に読み込まれている前提）。未ロードでも落ちない空文字フォールバック。
  function Icon(name, opts) { return window.Icon ? window.Icon(name, opts) : ''; }

  /* ---------- 配列ユーティリティ ---------- */
  // Fisher–Yates シャッフル（元配列は壊さずコピーを返す）。Math.random で十分（クライアント実行）。
  function shuffled(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  var rootEl; // #app

  /* ---------- データ参照ヘルパ ---------- */
  function getCourse(courseId) {
    for (var i = 0; i < COURSES.length; i++) {
      if (COURSES[i].id === courseId && !COURSES[i].comingSoon) return COURSES[i];
    }
    return null;
  }
  function getChapter(course, chapterId) {
    if (!course) return null;
    for (var i = 0; i < course.chapters.length; i++) {
      if (course.chapters[i].id === chapterId) return course.chapters[i];
    }
    return null;
  }
  function getPage(chapter, pageId) {
    if (!chapter) return null;
    for (var i = 0; i < chapter.pages.length; i++) {
      if (chapter.pages[i].id === pageId) return chapter.pages[i];
    }
    return null;
  }
  function pageIndex(chapter, pageId) {
    for (var i = 0; i < chapter.pages.length; i++) {
      if (chapter.pages[i].id === pageId) return i;
    }
    return -1;
  }

  /* ---------- テーマ（教材ごとのパステル配色）----------
     各教材に「テーマクラス」を割り当て、画面ルート要素に付与する。
     styles.css の .theme-terminal / .theme-git / .theme-python が
     --c-accent-course* トークンを上書きし、配下のコンポーネントが
     var(--c-accent-course, var(--c-brand)) 経由でその色を拾う。

     データ駆動で拡張可能:
       - 既定は course.id をそのまま使い "theme-<id>"（例 terminal→theme-terminal）。
       - course に theme（クラス名）または color（任意の識別子）を持たせれば、
         id と別のテーマ名にもできる（content/*.js 側で指定）。
       - 新しい教材を足すときは styles.css に .theme-<id> を1ブロック追加するだけ。
         未定義のテーマでもフォールバックで brand（ローズ）になり崩れない。 */
  function themeClass(course) {
    if (!course) return '';
    var name = course.theme || course.color || course.id;
    return name ? ('theme-' + name) : '';
  }
  // テーマクラスを付けた section の開きタグを返す（各 view 共通）。
  function sectionOpen(course, extra) {
    var cls = 'view screen';
    var t = themeClass(course);
    if (t) cls += ' ' + t;
    if (extra) cls += ' ' + extra;
    return '<section class="' + cls + '">';
  }

  /* ---------- 共通パーツ ---------- */
  function breadcrumb(items) {
    // items: [{label, href?}] 最後は現在地
    var html = items.map(function (it, i) {
      var sep = i > 0 ? '<span class="breadcrumb__sep" aria-hidden="true">›</span>' : '';
      if (it.href) return sep + '<a href="' + it.href + '">' + R.esc(it.label) + '</a>';
      return sep + '<span aria-current="page">' + R.esc(it.label) + '</span>';
    }).join('');
    return '<nav class="breadcrumb" aria-label="現在地">' + html + '</nav>';
  }

  function setHTML(html) {
    rootEl.innerHTML = html;
    window.scrollTo(0, 0);
  }

  /* =======================================================================
     ① TOP（教材選択）
     ======================================================================= */
  function viewTop() {
    var cards = COURSES.map(function (course) {
      // 各カードに自分の教材テーマを付与（TOPで水色/ピンク/黄色が同時に並ぶ）。
      var theme = themeClass(course);
      if (course.comingSoon) {
        // 準備中カードは淡色トーンが主役だが、ロゴタイルにはテーマ色を残して
        // 「この教材は黄色」など個性が伝わるようにする（--soon 側で彩度は控えめに）。
        return '' +
          '<article class="course-card course-card--soon' + (theme ? ' ' + theme : '') + '" aria-disabled="true">' +
            '<div class="course-card__emoji" aria-hidden="true">' + Icon(course.icon, { size: 30 }) + '</div>' +
            '<h2 class="course-card__title">' + R.esc(course.title) + '</h2>' +
            '<p class="course-card__desc">' + R.esc(course.description) + '</p>' +
            '<div class="course-card__foot">' +
              '<span class="badge badge--todo">準備中</span>' +
              '<button class="btn btn--ghost btn--sm" disabled>近日公開</button>' +
            '</div>' +
          '</article>';
      }
      var prog = Store.courseProgress(course);
      var started = prog.done > 0;
      var done = prog.done === prog.total && prog.total > 0;
      var badge = done
        ? '<span class="badge badge--done">' + Icon('check') + '全ページ読了</span>'
        : (started
            ? '<span class="badge badge--new">学習中</span>'
            : '<span class="badge badge--new">はじめる前</span>');
      var btnLabel = started ? '続きから' : 'はじめる';
      return '' +
        '<article class="course-card' + (theme ? ' ' + theme : '') + '">' +
          '<div class="course-card__emoji" aria-hidden="true">' + Icon(course.icon, { size: 30 }) + '</div>' +
          '<h2 class="course-card__title">' + R.esc(course.title) + '</h2>' +
          '<p class="course-card__desc">' + R.inline(course.description) + '</p>' +
          R.progress(prog.done, prog.total) +
          '<div class="course-card__foot">' +
            badge +
            '<a class="btn btn--primary btn--sm" href="#/course/' + course.id + '">' + btnLabel + ' ' + Icon('arrow-right') + '</a>' +
          '</div>' +
        '</article>';
    }).join('');

    setHTML(
      '<section class="view screen">' +
        '<div class="lead">' +
          '<h1>何から学びますか？</h1>' +
          '<p>エンジニアの第一歩、ターミナルと Git。<br>1ページ1コマンドの小さなステップで、怖がらずに進めます。</p>' +
        '</div>' +
        '<div class="course-grid">' + cards + '</div>' +
      '</section>'
    );
  }

  /* =======================================================================
     ② 章一覧
     ======================================================================= */
  function viewCourse(courseId) {
    var course = getCourse(courseId);
    if (!course) return viewNotFound();

    var cprog = Store.courseProgress(course);

    var chapters = course.chapters.map(function (ch, idx) {
      var p = Store.chapterProgress(course, ch);
      var allRead = p.done === p.total && p.total > 0;
      var summary = ch.summary || ch.pages.map(function (pg) { return pg.navTitle || pg.title; }).join(' / ');

      var side;
      if (allRead) {
        side = '<span class="badge badge--achievement">' + Icon('award') + 'クリア！</span>' +
               '<span class="progress__label" style="color:var(--c-success);">' + p.done + '/' + p.total + ' 読了</span>';
      } else if (p.done > 0) {
        side = '<span class="progress__label">' + p.done + '/' + p.total + ' 読了</span>' +
               '<span class="chapter-card__arrow" aria-hidden="true">' + Icon('arrow-right') + '</span>';
      } else {
        side = '<span class="progress__label" style="color:var(--c-text-faint);">未読</span>' +
               '<span class="chapter-card__arrow" aria-hidden="true">' + Icon('arrow-right') + '</span>';
      }

      var firstPageHref = '#/page/' + course.id + '/' + ch.id + '/' + ch.pages[0].id;
      var card =
        '<a class="chapter-card" href="' + firstPageHref + '">' +
          '<div class="chapter-card__num">' + (idx + 1) + '</div>' +
          '<div class="chapter-card__body">' +
            '<div class="chapter-card__title">' + R.esc(ch.title) + '</div>' +
            '<div class="chapter-card__meta">' + R.esc(summary) + ' ・ 全' + ch.pages.length + 'ページ</div>' +
          '</div>' +
          '<div class="chapter-card__side">' + side + '</div>' +
        '</a>';

      // テスト導線（全ページ読了で活性、それ以外は無効＋理由表示）
      var quizLink = '';
      if (ch.quiz && ch.quiz.length) {
        if (allRead) {
          quizLink = '<a class="btn btn--ghost btn--sm chapter-quiz-link" href="#/quiz/' + course.id + '/' + ch.id + '">' +
            Icon('doc') + ' 章' + (idx + 1) + ' テストを受ける（全' + ch.quiz.length + '問）</a>';
        } else {
          quizLink = '<button class="btn btn--ghost btn--sm chapter-quiz-link" disabled aria-disabled="true">' +
            Icon('lock', { title: 'ロック中' }) + ' テストは全ページ読了で受けられます</button>';
        }
      }
      return card + quizLink;
    }).join('');

    setHTML(
      sectionOpen(course) +
        breadcrumb([
          { label: '教材', href: '#/' },
          { label: course.title }
        ]) +
        '<div class="section-head">' +
          '<h1 class="section-head__title with-icon">' + Icon(course.icon, { size: 24 }) + R.esc(course.title) + '</h1>' +
          R.progress(cprog.done, cprog.total, { label: cprog.done + '/' + cprog.total + ' 読了' }) +
        '</div>' +
        '<div class="chapter-list">' + chapters + '</div>' +
      '</section>'
    );
  }

  /* =======================================================================
     ③ 学習ページ
     ======================================================================= */
  function chapterNavList(course, chapter, currentPageId) {
    var items = chapter.pages.map(function (pg) {
      var read = Store.isRead(course.id, chapter.id, pg.id);
      var current = pg.id === currentPageId;
      var cls = 'chapter-nav__link' + (current ? ' is-current' : '');
      var aria = current ? ' aria-current="page"' : '';
      var href = '#/page/' + course.id + '/' + chapter.id + '/' + pg.id;
      return '<li><a class="' + cls + '" href="' + href + '"' + aria + '>' +
        R.checkMark(read) + ' ' + R.esc(pg.navTitle || pg.title) + '</a></li>';
    }).join('');

    var quizItem = '';
    if (chapter.quiz && chapter.quiz.length) {
      quizItem = '<a class="chapter-nav__link chapter-nav__quiz" href="#/quiz/' + course.id + '/' + chapter.id + '">' +
        Icon('doc') + ' 章テストを受ける</a>';
    }
    return '<ul class="chapter-nav__list">' + items + '</ul>' + quizItem;
  }

  function viewPage(courseId, chapterId, pageId) {
    var course = getCourse(courseId);
    var chapter = getChapter(course, chapterId);
    var page = getPage(chapter, pageId);
    if (!course || !chapter || !page) return viewNotFound();

    var idx = pageIndex(chapter, pageId);
    var chapterNum = (function () {
      for (var i = 0; i < course.chapters.length; i++) if (course.chapters[i].id === chapterId) return i + 1;
      return '';
    })();
    var prog = Store.chapterProgress(course, chapter);
    var read = Store.isRead(course.id, chapter.id, page.id);

    // 前へ / 次へ（章をまたいで連続移動）
    var prevHref = null, nextHref = null;
    if (idx > 0) {
      prevHref = '#/page/' + course.id + '/' + chapter.id + '/' + chapter.pages[idx - 1].id;
    } else {
      // 前章の最後のページ
      var ci = course.chapters.indexOf(chapter);
      if (ci > 0) {
        var pc = course.chapters[ci - 1];
        prevHref = '#/page/' + course.id + '/' + pc.id + '/' + pc.pages[pc.pages.length - 1].id;
      }
    }
    if (idx < chapter.pages.length - 1) {
      nextHref = '#/page/' + course.id + '/' + chapter.id + '/' + chapter.pages[idx + 1].id;
    } else {
      // 章の最後 → クイズがあればクイズ、なければ次章の先頭、それも無ければ章一覧
      if (chapter.quiz && chapter.quiz.length) {
        nextHref = '#/quiz/' + course.id + '/' + chapter.id;
      } else {
        var ci2 = course.chapters.indexOf(chapter);
        if (ci2 < course.chapters.length - 1) {
          var nc = course.chapters[ci2 + 1];
          nextHref = '#/page/' + course.id + '/' + nc.id + '/' + nc.pages[0].id;
        } else {
          nextHref = '#/course/' + course.id;
        }
      }
    }
    var isLastPage = (idx === chapter.pages.length - 1);
    var nextLabel = isLastPage
      ? (chapter.quiz && chapter.quiz.length ? '章テストへ' : (course.chapters.indexOf(chapter) < course.chapters.length - 1 ? '次の章へ' : '章一覧へ'))
      : '次へ';

    var prevBtn = prevHref
      ? '<a class="btn btn--ghost" href="' + prevHref + '">' + Icon('arrow-left') + ' 前へ</a>'
      : '<a class="btn btn--ghost" href="#/course/' + course.id + '">' + Icon('arrow-left') + ' 章一覧</a>';
    var nextBtn = '<a class="btn btn--primary" href="' + nextHref + '">' + nextLabel + ' ' + Icon('arrow-right') + '</a>';

    var readBtn =
      '<button class="read-toggle' + (read ? ' is-done' : '') + '" type="button" aria-pressed="' + (read ? 'true' : 'false') + '"' +
        ' data-read-toggle data-course="' + course.id + '" data-chapter="' + chapter.id + '" data-page="' + page.id + '">' +
        R.checkMark(read) + '<span class="read-toggle__label">' + (read ? '読んだ' : '読んだことにする') + '</span>' +
      '</button>';

    var navList = chapterNavList(course, chapter, page.id);

    setHTML(
      sectionOpen(course).replace('>', ' style="padding-top:var(--space-5);">') +
        breadcrumb([
          { label: course.title, href: '#/course/' + course.id },
          { label: '章' + chapterNum + ' ' + chapter.title, href: '#/page/' + course.id + '/' + chapter.id + '/' + chapter.pages[0].id },
          { label: page.navTitle || page.title }
        ]) +

        // モバイル用 章ナビ（折りたたみ）
        '<details class="chapter-nav__mobile">' +
          '<summary>' + Icon('list') + ' 章' + chapterNum + ' のページ一覧（' + prog.done + '/' + prog.total + ' 読了）</summary>' +
          navList +
        '</details>' +

        '<div class="learn">' +
          '<nav class="chapter-nav" aria-label="章' + chapterNum + ' のページ">' +
            '<div class="chapter-nav__title">章' + chapterNum + ' ' + R.esc(chapter.title) + '</div>' +
            navList +
          '</nav>' +

          '<article class="content-card prose">' +
            '<h1>' + R.inline(page.title) + '</h1>' +
            R.blocks(page.blocks) +
            '<div class="page-foot">' +
              prevBtn +
              readBtn +
              nextBtn +
            '</div>' +
          '</article>' +
        '</div>' +
      '</section>'
    );

    // 読了トグルの挙動（再描画でナビ・ボタンに反映）
    var toggle = rootEl.querySelector('[data-read-toggle]');
    if (toggle) {
      toggle.addEventListener('click', function () {
        var now = Store.toggleRead(course.id, chapter.id, page.id);
        toggle.classList.toggle('is-done', now);
        toggle.setAttribute('aria-pressed', String(now));
        var mark = toggle.querySelector('.check');
        var label = toggle.querySelector('.read-toggle__label');
        if (now) { mark.className = 'check check--done'; mark.innerHTML = Icon('check'); if (label) label.textContent = '読んだ'; }
        else { mark.className = 'check check--todo'; mark.innerHTML = ''; if (label) label.textContent = '読んだことにする'; }
        // 章ナビのチェックも更新（PC・モバイル両方）
        updateNavChecks(course, chapter, page.id, now);
      });
    }
  }

  // ナビ内の現在ページのチェックマークだけ差し替える（全再描画を避ける軽量更新）
  function updateNavChecks(course, chapter, pageId, read) {
    var href = '#/page/' + course.id + '/' + chapter.id + '/' + pageId;
    rootEl.querySelectorAll('.chapter-nav__link[href="' + href + '"], .chapter-nav__mobile a[href="' + href + '"]').forEach(function (a) {
      var check = a.querySelector('.check');
      if (!check) return;
      if (read) { check.className = 'check check--done'; check.innerHTML = Icon('check'); }
      else { check.className = 'check check--todo'; check.innerHTML = ''; }
    });
  }

  /* =======================================================================
     ④ クイズ（章テスト）
     ======================================================================= */
  function viewQuiz(courseId, chapterId) {
    var course = getCourse(courseId);
    var chapter = getChapter(course, chapterId);
    if (!course || !chapter || !chapter.quiz || !chapter.quiz.length) return viewNotFound();

    var chapterNum = (function () {
      for (var i = 0; i < course.chapters.length; i++) if (course.chapters[i].id === chapterId) return i + 1;
      return '';
    })();

    // 章テストの「1回ぶん」を組み立てる。
    //  - 設問順を Fisher–Yates でシャッフル（元データ chapter.quiz は破壊しない）。
    //  - 各設問の選択肢順もシャッフルし、正解は「インデックス」ではなく
    //    「正解の選択肢の値」を基準に追従させて answer を再マップする。
    function buildQuiz() {
      return shuffled(chapter.quiz).map(function (src) {
        var correctValue = src.choices[src.answer];     // 正解の“値”を覚える
        var choices = shuffled(src.choices);            // 選択肢をシャッフル（コピー）
        return {
          q: src.q,
          explain: src.explain,
          topic: src.topic,
          pageId: src.pageId,
          choices: choices,
          answer: choices.indexOf(correctValue)         // シャッフル後の正解 index に再マップ
        };
      });
    }

    // state.quiz が「今回出題するシャッフル済みの問題列」。retry でも作り直す。
    var state = { quiz: buildQuiz(), i: 0, correct: 0, answered: false };

    function shell(inner) {
      return sectionOpen(course) +
        breadcrumb([
          { label: course.title, href: '#/course/' + course.id },
          { label: chapter.title, href: '#/page/' + course.id + '/' + chapter.id + '/' + chapter.pages[0].id },
          { label: '章' + chapterNum + ' テスト' }
        ]) + inner + '</section>';
    }

    function renderQuestion() {
      var quiz = state.quiz;
      var q = quiz[state.i];
      var choicesHtml = q.choices.map(function (c, ci) {
        var letter = String.fromCharCode(65 + ci); // A,B,C...
        return '<button class="choice" type="button" data-i="' + ci + '">' +
          '<span class="choice__marker">' + letter + '</span>' +
          '<span class="choice__text">' + R.inline(c) + '</span>' +
          '<span class="choice__result" aria-hidden="true"></span>' +
        '</button>';
      }).join('');

      setHTML(shell(
        '<div class="quiz">' +
          '<div class="quiz__meta">' +
            '<span>問 ' + (state.i + 1) + ' / ' + quiz.length + '</span>' +
            R.progress(state.i, quiz.length, { hideLabel: true, style: 'width:120px;' }) +
          '</div>' +
          '<h1 class="quiz__q">' + R.inline(q.q) + '</h1>' +
          '<div class="choice-list" id="quizChoices" role="group" aria-label="選択肢">' + choicesHtml + '</div>' +
          '<div class="quiz__feedback" id="quizFeedback" aria-live="polite"></div>' +
          '<div class="page-foot" style="border:none;padding-top:var(--space-5);margin-top:var(--space-4);justify-content:flex-end;">' +
            '<button class="btn btn--primary" id="quizNext" aria-disabled="true" disabled>' +
              (state.i === quiz.length - 1 ? '結果を見る' : '次の問題') + ' ' + Icon('arrow-right') + '</button>' +
          '</div>' +
        '</div>'
      ));

      state.answered = false;
      bindQuestion(q);
    }

    function bindQuestion(q) {
      var choices = rootEl.querySelectorAll('#quizChoices .choice');
      var feedback = rootEl.querySelector('#quizFeedback');
      var next = rootEl.querySelector('#quizNext');

      choices.forEach(function (choice) {
        choice.addEventListener('click', function () {
          if (state.answered) return;
          state.answered = true;
          var picked = Number(choice.getAttribute('data-i'));
          var isCorrect = picked === q.answer; // q.answer はシャッフル後に再マップ済み
          if (isCorrect) state.correct++;

          choices.forEach(function (c, ci) {
            c.disabled = true;
            var result = c.querySelector('.choice__result');
            // 正解の選択肢は常に check でハイライト、選んで外したものに close。色だけに頼らずアイコン併記。
            if (ci === q.answer) { c.classList.add('is-correct'); result.innerHTML = Icon('check'); }
            if (c === choice && !isCorrect) { c.classList.add('is-wrong'); result.innerHTML = Icon('close'); }
          });

          if (isCorrect) {
            feedback.className = 'quiz__feedback is-correct';
            feedback.innerHTML = '<strong>正解！</strong>' + R.inline(q.explain || '');
          } else {
            // 間違えたトピックを復習リストへ（topic/pageId はシャッフル後も設問に紐づくので正しい）
            Store.addReview({
              courseId: course.id,
              chapterId: chapter.id,
              pageId: q.pageId || null,
              topic: q.topic || (chapter.title + ' の問題')
            });
            feedback.className = 'quiz__feedback is-wrong';
            feedback.innerHTML = '<strong>おしい！</strong>' + R.inline(q.explain || '') +
              '<br>このトピック（<strong class="review-note">' + R.esc(q.topic || '') + '</strong>）を<strong class="review-note">復習リストに追加しました</strong>。';
          }
          next.disabled = false;
          next.removeAttribute('aria-disabled');
          next.focus();
        });
      });

      next.addEventListener('click', function () {
        if (state.i < state.quiz.length - 1) { state.i++; renderQuestion(); }
        else { renderResult(); }
      });
    }

    function renderResult() {
      var total = state.quiz.length;
      var score = state.correct;
      var perfect = score === total;
      var good = score >= Math.ceil(total * 0.7);
      // 紙吹雪 emoji は廃止（§8）。満点=trophy、それ以外は上品に sparkles で。
      var resultIcon = perfect ? Icon('trophy') : Icon('sparkles');
      var msg = perfect ? 'パーフェクト！この章はばっちりです。'
        : (good ? 'よくできました！あと少しで完璧です。'
                : '間違えたところは復習リストにまとめました。もう一度読んで再チャレンジしましょう。');
      var achievement = perfect
        ? '<div style="margin-bottom:var(--space-4);"><span class="badge badge--achievement">' + Icon('award') + '章' + chapterNum + ' 全問正解！</span></div>'
        : '';

      var reviewCount = Store.getReviews().length;
      var reviewBtn = reviewCount > 0
        ? '<a class="btn btn--ghost" href="#/review">復習リストを見る（' + reviewCount + '件）</a>'
        : '';

      setHTML(shell(
        '<div class="quiz-result">' +
          '<div class="quiz-result__emoji" aria-hidden="true">' + resultIcon + '</div>' +
          achievement +
          '<div class="quiz-result__score">正解 <b>' + score + '</b> / ' + total + '</div>' +
          '<p class="quiz-result__msg">' + msg + '</p>' +
          '<div class="quiz-result__actions">' +
            '<button class="btn btn--ghost" type="button" id="quizRetry">もう一度挑戦</button>' +
            reviewBtn +
            '<a class="btn btn--primary" href="#/course/' + course.id + '">章一覧へ ' + Icon('arrow-right') + '</a>' +
          '</div>' +
        '</div>'
      ));

      var retry = rootEl.querySelector('#quizRetry');
      if (retry) retry.addEventListener('click', function () {
        // 再挑戦のたびに出題順・選択肢順を新しくシャッフルする
        state = { quiz: buildQuiz(), i: 0, correct: 0, answered: false };
        renderQuestion();
      });
    }

    renderQuestion();
  }

  /* =======================================================================
     ⑤ 復習リスト
     ======================================================================= */
  function viewReview() {
    var reviews = Store.getReviews();

    var body;
    if (!reviews.length) {
      body =
        '<div class="review-empty">' +
          '<div class="review-empty__emoji" aria-hidden="true">' + Icon('sparkles') + '</div>' +
          '<p style="font-weight:700;color:var(--c-text);margin-top:var(--space-2);">復習リストは空っぽです！</p>' +
          '<p>苦手はぜんぶ克服しました。この調子でどんどん進みましょう。</p>' +
        '</div>';
    } else {
      var cards = reviews.map(function (r) {
        var course = getCourse(r.courseId);
        var chapter = course ? getChapter(course, r.chapterId) : null;
        var page = (course && chapter && r.pageId) ? getPage(chapter, r.pageId) : null;
        // 教材アイコン（ロゴ）。教材が見つからなければ既定の bookmark。
        var iconName = (course && course.icon) ? course.icon : 'bookmark';
        var chapterNum = '';
        if (course && chapter) {
          for (var i = 0; i < course.chapters.length; i++) if (course.chapters[i].id === chapter.id) chapterNum = (i + 1);
        }
        var src = (chapter ? ('章' + chapterNum + ' ' + chapter.title) : '') +
                  (page ? (' ・ 「' + (page.navTitle || page.title) + '」') : '');
        // ジャンプ先：ページがあればそのページ、無ければ章の先頭
        var href = (page)
          ? '#/page/' + r.courseId + '/' + r.chapterId + '/' + r.pageId
          : (chapter ? '#/page/' + r.courseId + '/' + r.chapterId + '/' + chapter.pages[0].id : '#/');

        return '' +
          '<div class="review-card">' +
            '<span class="review-card__icon" aria-hidden="true">' + Icon(iconName) + '</span>' +
            '<div class="review-card__body">' +
              '<span class="review-card__tag">' + Icon('flag') + '要復習</span>' +
              '<div class="review-card__topic">' + R.esc(r.topic) + '</div>' +
              '<div class="review-card__src">' + R.esc(src) + '</div>' +
            '</div>' +
            '<a class="btn btn--ghost btn--sm" href="' + href + '">もう一度読む ' + Icon('arrow-right') + '</a>' +
          '</div>';
      }).join('');
      body = '<div class="review-list">' + cards + '</div>';
    }

    setHTML(
      '<section class="view screen">' +
        breadcrumb([
          { label: '教材', href: '#/' },
          { label: '復習リスト' }
        ]) +
        '<div style="display:flex;align-items:baseline;gap:var(--space-3);margin-bottom:var(--space-2);">' +
          '<h1 class="section-head__title">復習リスト</h1>' +
          '<span class="progress__label">' + reviews.length + ' 件</span>' +
        '</div>' +
        '<p class="muted" style="font-size:var(--fs-sm);margin-bottom:var(--space-5);max-width:680px;">' +
          'テストで間違えた=まだ自信がないトピックです。もう一度読んで、テストに再チャレンジしましょう。' +
        '</p>' +
        body +
      '</section>'
    );
  }

  /* ---------- Not Found ---------- */
  function viewNotFound() {
    setHTML(
      '<section class="view screen">' +
        '<div class="review-empty">' +
          '<div class="review-empty__emoji" aria-hidden="true">' + Icon('compass') + '</div>' +
          '<p style="font-weight:700;color:var(--c-text);margin-top:var(--space-2);">ページが見つかりませんでした</p>' +
          '<p>URL が変わったか、まだ準備中のページかもしれません。</p>' +
          '<p style="margin-top:var(--space-4);"><a class="btn btn--primary" href="#/">教材選択へ戻る</a></p>' +
        '</div>' +
      '</section>'
    );
  }

  /* =======================================================================
     ルーター本体
     ======================================================================= */
  function parseHash() {
    var h = (window.location.hash || '').replace(/^#/, '');
    if (!h || h === '/') return { name: 'top' };
    var parts = h.replace(/^\//, '').split('/');
    switch (parts[0]) {
      case 'course':
        return { name: 'course', courseId: parts[1] };
      case 'page':
        return { name: 'page', courseId: parts[1], chapterId: parts[2], pageId: parts[3] };
      case 'quiz':
        return { name: 'quiz', courseId: parts[1], chapterId: parts[2] };
      case 'review':
        return { name: 'review' };
      default:
        return { name: 'top' };
    }
  }

  function route() {
    var r = parseHash();
    try {
      switch (r.name) {
        case 'top':    viewTop(); break;
        case 'course': viewCourse(r.courseId); break;
        case 'page':   viewPage(r.courseId, r.chapterId, r.pageId); break;
        case 'quiz':   viewQuiz(r.courseId, r.chapterId); break;
        case 'review': viewReview(); break;
        default:       viewTop();
      }
    } catch (e) {
      // 想定外のデータでも画面を白くしない
      if (window.console) console.error('route error:', e);
      viewNotFound();
    }
    // どの描画後でもヘッダーの復習件数を最新化（route 経由の再描画でも反映される）
    updateReviewBadge();
  }

  function start() {
    rootEl = document.getElementById('app');
    if (!rootEl) return;
    COURSES = window.COURSES || [];
    R.installDelegation();

    window.addEventListener('hashchange', route);
    route();
  }

  function updateReviewBadge() {
    var count = document.getElementById('reviewCount');
    var badge = document.getElementById('reviewBadge');
    if (!count || !badge) return;
    var n = Store.getReviews().length;
    count.textContent = n;
    badge.style.display = n > 0 ? '' : 'none';
  }

  window.App = { start: start, route: route };

  // DOM 準備後に起動（content/*.js は index.html で先に読み込む）
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
