/* =========================================================================
   store.js — localStorage で進捗を管理するグローバルストア
   window.Store として公開。ES Modules は使わない（file:// での CORS 回避）。

   保存するもの:
     - read:    読了したページ ("courseId/chapterId/pageId" の集合)
     - review:  復習リスト（テストで間違えたトピック）の集合
   キーは接頭辞付き（el_progress_v1）で衝突回避。
   壊れた JSON でも落ちないよう try/catch。localStorage 不可環境（プライベート
   ブラウズ等）でもメモリ上で動くフォールバックあり。
   ========================================================================= */
(function () {
  'use strict';

  var KEY = 'el_progress_v1';

  // 既定の状態
  function emptyState() {
    return {
      read: {},   // "course/chapter/page": true
      review: {}  // "course/chapter/page||topic": {courseId,chapterId,pageId,topic}
    };
  }

  // localStorage が使えるか（プライベートモード等で例外になることがある）
  var storageOK = (function () {
    try {
      var t = '__el_test__';
      window.localStorage.setItem(t, '1');
      window.localStorage.removeItem(t);
      return true;
    } catch (e) {
      return false;
    }
  })();

  var memoryFallback = emptyState(); // localStorage 不可時の保存先

  function load() {
    if (!storageOK) return memoryFallback;
    try {
      var raw = window.localStorage.getItem(KEY);
      if (!raw) return emptyState();
      var parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object') return emptyState();
      // 形が壊れていても安全側に倒す
      return {
        read: (parsed.read && typeof parsed.read === 'object') ? parsed.read : {},
        review: (parsed.review && typeof parsed.review === 'object') ? parsed.review : {}
      };
    } catch (e) {
      // 壊れた JSON 等。初期化して握りつぶす。
      return emptyState();
    }
  }

  function save(state) {
    if (!storageOK) { memoryFallback = state; return; }
    try {
      window.localStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) {
      // 容量超過など。メモリにだけ残す。
      memoryFallback = state;
    }
  }

  // ページの一意キー
  function pageKey(courseId, chapterId, pageId) {
    return courseId + '/' + chapterId + '/' + pageId;
  }
  // 復習トピックの一意キー（同じページの同じトピックは1件に集約）
  function reviewKey(courseId, chapterId, pageId, topic) {
    return courseId + '/' + chapterId + '/' + (pageId || '-') + '||' + topic;
  }

  var Store = {
    /* ---- 読了 ---- */
    isRead: function (courseId, chapterId, pageId) {
      var s = load();
      return !!s.read[pageKey(courseId, chapterId, pageId)];
    },
    setRead: function (courseId, chapterId, pageId, value) {
      var s = load();
      var k = pageKey(courseId, chapterId, pageId);
      if (value) s.read[k] = true;
      else delete s.read[k];
      save(s);
    },
    toggleRead: function (courseId, chapterId, pageId) {
      var next = !this.isRead(courseId, chapterId, pageId);
      this.setRead(courseId, chapterId, pageId, next);
      return next;
    },

    /* ---- 集計（進捗バー用） ---- */
    // 章の読了ページ数 / 全ページ数
    chapterProgress: function (course, chapter) {
      var done = 0;
      var s = load();
      for (var i = 0; i < chapter.pages.length; i++) {
        if (s.read[pageKey(course.id, chapter.id, chapter.pages[i].id)]) done++;
      }
      return { done: done, total: chapter.pages.length };
    },
    // 教材全体の読了ページ数 / 全ページ数
    courseProgress: function (course) {
      var done = 0, total = 0;
      var s = load();
      for (var c = 0; c < course.chapters.length; c++) {
        var ch = course.chapters[c];
        for (var p = 0; p < ch.pages.length; p++) {
          total++;
          if (s.read[pageKey(course.id, ch.id, ch.pages[p].id)]) done++;
        }
      }
      return { done: done, total: total };
    },

    /* ---- 復習リスト ---- */
    addReview: function (item) {
      // item: {courseId, chapterId, pageId, topic}
      if (!item || !item.topic) return;
      var s = load();
      s.review[reviewKey(item.courseId, item.chapterId, item.pageId, item.topic)] = {
        courseId: item.courseId,
        chapterId: item.chapterId,
        pageId: item.pageId || null,
        topic: item.topic
      };
      save(s);
    },
    removeReview: function (courseId, chapterId, pageId, topic) {
      var s = load();
      delete s.review[reviewKey(courseId, chapterId, pageId, topic)];
      save(s);
    },
    getReviews: function () {
      var s = load();
      var out = [];
      for (var k in s.review) {
        if (Object.prototype.hasOwnProperty.call(s.review, k)) out.push(s.review[k]);
      }
      return out;
    },

    /* ---- ユーティリティ ---- */
    storageAvailable: storageOK,
    pageKey: pageKey,
    _reset: function () { save(emptyState()); } // テスト/デバッグ用
  };

  window.Store = Store;
})();
