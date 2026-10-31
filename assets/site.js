/* 主题切换、本地时间、论文筛选、相册灯箱、BibTeX 折叠。
   所有交互都在这里，页面本身保持静态。 */
(function () {
  'use strict';

  /* ---------- 主题 ---------- */
  var root = document.documentElement;

  function setTheme(theme) {
    root.dataset.theme = theme;
    try { localStorage.setItem('theme', theme); } catch (e) { /* ignore */ }
    document.querySelectorAll('.theme-option').forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(btn.dataset.themeValue === theme));
    });
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0f1113' : '#ffffff');
  }

  function currentTheme() {
    return root.dataset.theme === 'dark' ? 'dark' : 'light';
  }

  setTheme(currentTheme());

  document.querySelectorAll('.theme-option').forEach(function (btn) {
    btn.addEventListener('click', function () {
      setTheme(btn.dataset.themeValue === 'dark' ? 'dark' : 'light');
    });
  });

  /* ---------- 本地时间 ---------- */
  var clock = document.getElementById('localtime');
  if (clock) {
    var tick = function () {
      try {
        clock.textContent = new Intl.DateTimeFormat('zh-CN', {
          timeZone: 'Asia/Shanghai',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }).format(new Date());
      } catch (e) {
        clock.textContent = '';
      }
    };
    tick();
    setInterval(tick, 30000);
  }

  /* ---------- 当前页高亮 ---------- */
  var here = location.pathname.replace(/index\.html$/, '').replace(/\/$/, '/');
  document.querySelectorAll('.content-nav a[href]').forEach(function (a) {
    var href = a.getAttribute('href');
    if (!href || href.charAt(0) === '#' || /^https?:/.test(href)) return;
    var url;
    try { url = new URL(href, location.href); } catch (e) { return; }
    var path = url.pathname.replace(/index\.html$/, '').replace(/\/$/, '/');
    if (path === here) a.classList.add('active');
  });

  /* ---------- 论文按 CCF 分区筛选 ---------- */
  var rankSelect = document.getElementById('pub-rank');
  if (rankSelect) {
    var pubs = Array.prototype.slice.call(document.querySelectorAll('.pubs li'));
    var groupTitles = Array.prototype.slice.call(document.querySelectorAll('.group'));
    var counter = document.getElementById('pub-count');

    /* 编号只跟随可见条目，筛选后仍然连续 */
    var renumber = function () {
      var n = 0;
      pubs.forEach(function (li) {
        if (!li.hidden) li.setAttribute('data-num', String(++n));
      });
      return n;
    };

    var apply = function () {
      var want = rankSelect.value;
      pubs.forEach(function (li) {
        li.hidden = !(want === 'all' || li.dataset.rank === want);
      });
      /* 分组标题下若已无条目，则一并隐藏 */
      groupTitles.forEach(function (title) {
        var list = title.nextElementSibling;
        if (!list || !list.classList.contains('pubs')) return;
        var anyVisible = list.querySelector('li:not([hidden])');
        title.hidden = !anyVisible;
        list.hidden = !anyVisible;
      });
      var shown = renumber();
      if (counter) counter.textContent = String(shown);
    };

    rankSelect.addEventListener('change', apply);
    apply();
  }

  /* ---------- 相册灯箱 ---------- */
  var galleryImgs = document.querySelectorAll('.gallery img');
  if (galleryImgs.length) {
    var box = document.createElement('div');
    box.className = 'lightbox';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-label', '图片预览');
    var big = document.createElement('img');
    big.alt = '';
    box.appendChild(big);
    document.body.appendChild(box);

    var close = function () {
      box.classList.remove('open');
      big.removeAttribute('src');
    };

    galleryImgs.forEach(function (img) {
      img.addEventListener('click', function () {
        big.src = img.currentSrc || img.src;
        big.alt = img.alt || '';
        box.classList.add('open');
      });
    });

    box.addEventListener('click', close);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
  }

  /* ---------- 文献库检索（sdp） ---------- */
  window.toggleInfo = function (key) {
    var row = document.getElementById('bib_' + key);
    if (row) row.classList.toggle('noshow');
  };

  (function () {
    var field = document.getElementById('qs_field');
    if (!field) return;

    var rows = Array.prototype.slice.call(
      document.querySelectorAll('#qs_table tbody tr.entry')
    );
    var stat = document.getElementById('stat');
    var total = rows.length;

    var run = function () {
      var q = field.value.trim().toLowerCase();
      var hits = 0;
      rows.forEach(function (tr) {
        var hit = !q || tr.textContent.toLowerCase().indexOf(q) !== -1;
        tr.hidden = !hit;
        var bib = document.getElementById('bib_' + tr.id);
        if (bib) bib.hidden = !hit;
        if (hit) hits += 1;
      });
      if (stat) stat.textContent = String(hits);
    };

    field.addEventListener('input', run);
    field.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        field.value = '';
        run();
      }
    });

    var clear = document.getElementById('qs_clear');
    if (clear) {
      clear.addEventListener('click', function () {
        field.value = '';
        run();
        field.focus();
      });
    }

    run();
  })();

  /* ---------- BibTeX 折叠（老页面遗留） ---------- */
  window.toggleBibtex = function (articleid) {
    var bib = document.getElementById('bib_' + articleid);
    if (!bib) return;
    if (bib.className.indexOf('bibtex') !== -1) {
      bib.className = bib.className.indexOf('noshow') === -1
        ? 'bibtex noshow'
        : 'bibtex';
    }
  };
})();
