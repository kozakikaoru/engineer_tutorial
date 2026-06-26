/* =========================================================================
   js/icons.js — インラインSVGアイコンヘルパー（emoji 全廃の受け皿）
   -------------------------------------------------------------------------
   使い方（配線はエンジニア担当）:
     Icon('check')                       → '<svg ...>...</svg>'
     Icon('arrow-right', { size: 18 })   → サイズ指定
     Icon('git', { class: 'course-card__logo-svg' }) → 追加クラス
     文字列を返すので innerHTML / テンプレート連結にそのまま差し込めます。

   方針:
     - 既定で aria-hidden="true"（装飾扱い）。意味は必ず隣のテキストで担保する
       （色だけ・アイコンだけに意味を乗せない＝アクセシビリティ）。
       ラベルを持たせたい場合は opts.title / opts.label を渡すと
       role="img" + <title> を付与する。
     - 既定 size = 24。opts.size で px 指定。opts.class で追加クラス。
     - 装飾アイコンは currentColor を継承（stroke 系UIアイコン / fill 系ロゴ）。
       文脈の色（ピンク=brand / 情報青 / 警告 / 成功 など）にそのまま染まる。
     - UIアイコンは 24x24・stroke 方式・round join で統一トーン。
     - ロゴ（git/github/python）は公式の Simple Icons パス（単色 fill）。
       パステルUIに馴染むよう色は currentColor 任せ、ただし“認識できること”を最優先。

   ─────────────────────────────────────────────────────────────────────────
   アイコン名 一覧（エンジニア配線時の参照）
   ─────────────────────────────────────────────────────────────────────────
   ロゴ系（公式ロゴ / 認識性優先, fill=currentColor）:
     git        … Git 公式ロゴ                    （教材B カード / 文中の git）
     github     … GitHub マーク                   （フッター / GitHub 言及）
     terminal   … ターミナル窓アイコン            （ヘッダーのロゴマーク ⌘置換 / 教材A カード）
     python     … Python ロゴ                     （coming-soon 教材カード）

   UI線アイコン（モノクロ / stroke=currentColor, 24x24）:
     copy        (📋)  コピー（ターミナルのコピーボタン）
     hint / bulb (💡)  ヒント（callout--hint）         ※ hint は bulb の別名
     warning     (⚠️)  注意（callout--warn）
     check       (✓)   正解 / 読了 / 達成チェック
     close       (✕)   不正解 / 閉じる
     lock        (🔒)  テスト未解放（読了前）
     doc / test  (📝)  章テストを受ける導線           ※ test は doc の別名
     list        (📑)  章のページ一覧（モバイル章ナビ summary）
     award/medal (🏅)  章クリア達成バッジ             ※ medal は award の別名
     trophy      (🏆)  クイズ満点 結果演出
     bookmark    (📌)  ブックマーク / 復習カード既定アイコン
     flag        (●)   要復習マーカー（git.js のブランチ図など）
     arrow-right (→)   次へ / 進む
     arrow-left  (←)   前へ / 戻る
     sparkles    (✨)  お祝い / 空状態（復習なし）の上品演出
     compass     (🧭)  空状態（まだ復習がない／探索の示唆）
     home        (⌂)   ホーム/カテゴリ選択（サイドバー nav・パンくず）
     book        (📖)  カテゴリカードの「はじめる前に」ボタン
     menu        (☰)   レッスンページのハンバーガー（グローバルメニューをドロワーで開く）
     chevron-down(˅)   メイン上部アバターの装飾シェブロン
     map / settings / flame … 現在UI未使用（過去の連続記録カード/メニューの名残・定義は保持）

   装飾モチーフ（ふんわりパステル v3。意味を持たない＝既定 aria-hidden）:
     spark       (✦)   ぷっくり4方向星。きらめき装飾（ヒーロー/バッジ/見出し脇）
     star4       (✧)   細い小さな4点星。タイトル脇の控えめ装飾
     cloud       (☁)   ふわふわ雲。ヒーロー隅のうっすら装飾（横長 viewBox）
     cumulonimbus(☁)   巨大積乱雲の上側。サイドバー下部からはみ出してクリップする装飾（縦長 viewBox）
   ─────────────────────────────────────────────────────────────────────────
   ========================================================================= */
(function () {
  'use strict';

  // ---- SVG パス定義 ---------------------------------------------------------
  // kind: 'stroke'（線アイコン, 24x24, fill:none）/ 'logo'（fill:currentColor, viewBox 24固定）
  // body: <svg> の中身。currentColor で色を継承する。

  var ICONS = {
    /* ===== 装飾モチーフ（ふんわりパステル v3。emoji 禁止の受け皿） =====
       prototype.html の <symbol id="i-spark/star4/cloud"> を移植（fill=currentColor）。
       既定で aria-hidden（装飾）。文脈の色（ピンク/白/インク等）に染まる。 */
    // 4方向にとがった“ぷっくり星”（sparkle）。要所のきらめき装飾。viewBox 24
    spark: { kind: 'logo', body:
      '<path fill="currentColor" d="M12 1.6c.5 3.9 1.9 6.0 4.4 7.1 2.4 1.0 3.9 1.5 6.0 1.7-3.9.5-6.0 1.9-7.1 4.4-1.0 2.4-1.5 4.0-1.7 6.0-.5-3.9-1.9-6.0-4.4-7.1C6.8 12.7 5.3 12.2 3.2 12c3.9-.5 6.0-1.9 7.1-4.4C11.3 5.2 11.8 3.7 12 1.6Z"/>' },
    // 小さな星（4点・細）。タイトル脇の小装飾。viewBox 24
    star4: { kind: 'logo', body:
      '<path fill="currentColor" d="M12 3c.4 3 1.2 4.5 3.3 5.4 1.6.7 2.9 1.1 4.7 1.6-1.8.5-3.1.9-4.7 1.6C13.2 12.5 12.4 14 12 17c-.4-3-1.2-4.5-3.3-5.4C7.1 11 5.8 10.6 4 10c1.8-.5 3.1-.9 4.7-1.6C10.8 7.5 11.6 6 12 3Z"/>' },
    // ふわふわ雲（ヒーロー隅のうっすら装飾）。横長 viewBox（個別指定）
    cloud: { kind: 'logo', viewBox: '0 0 120 80', body:
      '<path fill="currentColor" d="M30 64c-13 0-23-9-23-21 0-11 8-19 19-20 3-11 13-19 25-19 13 0 24 9 26 22 9 1 16 8 16 18 0 11-9 20-21 20H30Z"/>' },
    // 巨大積乱雲（cumulonimbus）の“上側”。サイドバー下部からはみ出してクリップさせる装飾。
    //  幅広いもくもくの稜線（上半分）だけを描き、下端は viewBox 外まで伸ばして“切れて続く”印象に。
    //  縦長 viewBox（個別指定）。色は currentColor 任せ（パステル）。
    cumulonimbus: { kind: 'logo', viewBox: '0 0 200 160', body:
      '<path fill="currentColor" d="M16 160c-6 0-9-8-4-12 1-1 1-2 0-4-7-9-3-23 8-26-3-13 7-25 20-25 4 0 8 1 11 3 3-12 14-21 27-21 14 0 26 10 28 24 2-1 5-2 8-2 11 0 20 8 21 19 11 1 19 10 19 21 0 3-1 6-2 8 6 3 8 11 3 16-1 1-1 2 0 3 4 4 1 11-5 11H16Z"/>' },

    /* ===== ロゴ（公式 / Simple Icons パス, fill=currentColor） ===== */
    // Git 公式ロゴ
    git: { kind: 'logo', body:
      '<path fill="currentColor" d="M23.546 10.93 13.067.452a1.55 1.55 0 0 0-2.188 0L8.708 2.627l2.76 2.76a1.838 1.838 0 0 1 2.327 2.341l2.658 2.66a1.838 1.838 0 0 1 1.9 3.039 1.837 1.837 0 0 1-2.6 0 1.846 1.846 0 0 1-.404-1.996L12.86 11.59v6.452a1.84 1.84 0 1 1-1.515-.062V11.47a1.846 1.846 0 0 1-1.003-2.42L7.626 6.39l-6.18 6.18a1.55 1.55 0 0 0 0 2.188L11.927 25.24a1.55 1.55 0 0 0 2.188 0l10.43-10.43a1.55 1.55 0 0 0 0-2.188l-.999.308Z"/>' },
    // GitHub マーク
    github: { kind: 'logo', body:
      '<path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.5 11.5 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.598 24 12.297c0-6.627-5.373-12-12-12"/>' },
    // Python ロゴ（単色シルエット。準備中カードで使用）
    python: { kind: 'logo', body:
      '<path fill="currentColor" d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z"/>' },
    // ターミナル窓（ロゴ枠 / ヘッダーマーク用。stroke ではなく塗りで“窓”を表現）
    terminal: { kind: 'logo', body:
      '<path fill="currentColor" d="M3 4h18a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 2v12h18V6H3zm2.3 2.3 3.4 3.4-3.4 3.4L4 15.7l2.1-2-2.1-2 1.3-1.4zM11 14h5v1.5h-5V14z"/>' },

    /* ===== UI 線アイコン（24x24, stroke=currentColor） ===== */
    copy: { kind: 'stroke', body:
      '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h8"/>' },
    bulb: { kind: 'stroke', body:
      '<path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0-4 10.5c.6.7 1 1.4 1 2.5h6c0-1.1.4-1.8 1-2.5A6 6 0 0 0 12 3z"/>' },
    warning: { kind: 'stroke', body:
      '<path d="M12 3 1.5 21h21L12 3z"/><path d="M12 9.5v5"/><path d="M12 18h.01"/>' },
    check: { kind: 'stroke', body:
      '<path d="M5 12.5 10 17.5 19.5 7"/>' },
    close: { kind: 'stroke', body:
      '<path d="M6 6l12 12"/><path d="M18 6 6 18"/>' },
    lock: { kind: 'stroke', body:
      '<rect x="4.5" y="10.5" width="15" height="10" rx="2"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/><path d="M12 14.5v2.5"/>' },
    doc: { kind: 'stroke', body:
      '<path d="M7 3h7l5 5v13a0 0 0 0 1 0 0H7a0 0 0 0 1 0 0V3z"/><path d="M14 3v5h5"/><path d="M9.5 13h6"/><path d="M9.5 16.5h6"/>' },
    list: { kind: 'stroke', body:
      '<path d="M9 6h11"/><path d="M9 12h11"/><path d="M9 18h11"/><path d="M4.5 6h.01"/><path d="M4.5 12h.01"/><path d="M4.5 18h.01"/>' },
    award: { kind: 'stroke', body:
      '<circle cx="12" cy="9" r="5.5"/><path d="M8.5 13.5 7 21l5-2.5L17 21l-1.5-7.5"/>' },
    trophy: { kind: 'stroke', body:
      '<path d="M7 4h10v5a5 5 0 0 1-10 0V4z"/><path d="M7 6H4.5a2.5 2.5 0 0 0 2.5 4"/><path d="M17 6h2.5a2.5 2.5 0 0 1-2.5 4"/><path d="M12 14v3"/><path d="M9 20h6"/><path d="M10 17h4l.5 3h-5l.5-3z"/>' },
    bookmark: { kind: 'stroke', body:
      '<path d="M6 4h12a1 1 0 0 1 1 1v15l-7-4-7 4V5a1 1 0 0 1 1-1z"/>' },
    flag: { kind: 'stroke', body:
      '<path d="M6 21V4"/><path d="M6 4h11l-2 3.5L17 11H6"/>' },
    home: { kind: 'stroke', body:
      '<path d="M4 11 12 4l8 7"/><path d="M6 10v9h12v-9"/>' },
    'arrow-right': { kind: 'stroke', body:
      '<path d="M4 12h15"/><path d="m13 6 6 6-6 6"/>' },
    'arrow-left': { kind: 'stroke', body:
      '<path d="M20 12H5"/><path d="m11 6-6 6 6 6"/>' },
    sparkles: { kind: 'stroke', body:
      '<path d="M12 4l1.6 4.4L18 10l-4.4 1.6L12 16l-1.6-4.4L6 10l4.4-1.6L12 4z"/><path d="M18.5 14.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8z"/>' },
    compass: { kind: 'stroke', body:
      '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5 5-2z"/>' },
    // 学習ロードマップ（折れた地図。サイドバーの「近日」項目で使用）
    map: { kind: 'stroke', body:
      '<path d="M9 4 4 6v14l5-2 6 2 5-2V4l-5 2-6-2z"/><path d="M9 4v14"/><path d="M15 6v14"/>' },
    // 設定（歯車。サイドバーのメニュー項目で使用）
    settings: { kind: 'stroke', body:
      '<circle cx="12" cy="12" r="3"/><path d="M12 2.5v2.2M12 19.3v2.2M21.5 12h-2.2M4.7 12H2.5M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6M18.7 18.7l-1.6-1.6M6.9 6.9 5.3 5.3"/>' },
    // 炎（学習の連続記録カード。サイドバー下部の streak で使用）。stroke 線アイコンで currentColor 継承。
    flame: { kind: 'stroke', body:
      '<path d="M12 3c0 3-3 4-3 7a3 3 0 0 0 6 0c0-1-.3-1.8-.8-2.5C15.7 9 17 11 17 13.5a5 5 0 0 1-10 0C7 9.5 10 6.5 12 3z"/>' },
    // 下向きシェブロン（メイン上部のアバター装飾。aria-hidden）
    'chevron-down': { kind: 'stroke', body:
      '<path d="M5 9l7 7 7-7"/>' },
    // 本（カテゴリカードの「はじめる前に」ボタン）。線アイコン。
    book: { kind: 'stroke', body:
      '<path d="M5 4h9a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H5z"/><path d="M16 6a2 2 0 0 1 2-2h1v14h-1a2 2 0 0 0-2 2"/>' },
    // ハンバーガー（レッスンページのみ・グローバルメニューをドロワーで開く）。線アイコン。
    menu: { kind: 'stroke', body:
      '<path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/>' }
  };

  // ---- 別名 -----------------------------------------------------------------
  var ALIAS = {
    hint: 'bulb',
    test: 'doc',
    medal: 'award'
  };

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /**
   * Icon(name, opts) -> SVG 文字列
   * @param {string} name  アイコン名（上記一覧 / 別名可）
   * @param {object} [opts]
   *   size  {number}  px。既定 24
   *   class {string}  追加クラス（.icon に併記）
   *   title {string}  指定すると role="img" + <title>（意味を持つアイコン用）
   *   label {string}  title の別名
   */
  function Icon(name, opts) {
    opts = opts || {};
    var key = ALIAS[name] || name;
    var def = ICONS[key];
    if (!def) {
      // 未定義名は黙って空文字（配線ミスでレイアウトを壊さない）。開発時に気付けるよう警告。
      if (typeof console !== 'undefined' && console.warn) {
        console.warn('[Icon] unknown icon name: "' + name + '"');
      }
      return '';
    }

    var size = opts.size != null ? Number(opts.size) : 24;
    var cls = 'icon' + (opts.class ? ' ' + esc(opts.class) : '');
    var label = opts.title || opts.label;

    // a11y: ラベル指定があれば role="img" + <title>、なければ装飾として aria-hidden。
    var a11y = label
      ? ' role="img" aria-label="' + esc(label) + '"'
      : ' aria-hidden="true" focusable="false"';
    var titleEl = label ? '<title>' + esc(label) + '</title>' : '';

    // 線アイコン共通属性（round join で統一トーン）。ロゴは fill のみ。
    var commonStroke = def.kind === 'stroke'
      ? ' fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"'
      : ' fill="currentColor"';

    // viewBox は既定 24x24。装飾 cloud のように横長のものは def.viewBox で個別指定。
    var viewBox = def.viewBox || '0 0 24 24';

    return (
      '<svg class="' + cls + '" viewBox="' + viewBox + '" width="' + size + '" height="' + size + '"' +
      commonStroke + a11y + '>' + titleEl + def.body + '</svg>'
    );
  }

  // 利用可能なアイコン名（別名含む）を配列で返す補助（配線時の確認用）
  Icon.names = function () {
    return Object.keys(ICONS).concat(Object.keys(ALIAS)).sort();
  };

  window.Icon = Icon;
})();
