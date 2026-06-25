/* =========================================================================
   content/coming-soon.js — 「準備中」教材のサンプル
   comingSoon: true を付けると、TOP に淡色の「準備中」カードとして並ぶ。
   今後ここを本物の教材ファイルに差し替える／別ファイルで追加していく想定。
   ========================================================================= */
(function () {
  'use strict';
  window.COURSES = window.COURSES || [];

  window.COURSES.push({
    id: 'python',
    title: 'Python',
    icon: 'python', // 教材アイコン（Python 公式ロゴ）。router 側で Icon(course.icon)。
    description: 'プログラミング言語の入門。準備中です。お楽しみに！',
    comingSoon: true,
    chapters: [] // 準備中なので中身は空でOK
  });
})();
