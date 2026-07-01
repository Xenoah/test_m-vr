/* XenuyuVR 公式サイト — インタラクション */
(function () {
  'use strict';

  /* --- モバイルナビ開閉 --- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    // リンクタップで閉じる
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* --- スクロール連動フェードイン --- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          // 同一グループ内で少しずつ遅延
          entry.target.style.transitionDelay = (i % 4) * 80 + 'ms';
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* --- ヒエログリフの雨（背景） --- */
  var rain = document.querySelector('.glyph-rain');
  if (rain) {
    var glyphs = '𓀀𓁟𓂀𓃀𓄿𓅓𓆓𓇯𓈖𓉔𓊹𓋹𓌳𓍯𓎼𓏛'.split('');
    var lines = 14, cols = 40, out = '';
    for (var r = 0; r < lines; r++) {
      var line = '';
      for (var c = 0; c < cols; c++) {
        line += glyphs[Math.floor(Math.random() * glyphs.length)];
      }
      out += line + '\n';
    }
    rain.textContent = out;
  }

  /* --- メジェドの目：カーソル追従（微妙に） --- */
  var eyes = document.querySelector('.medjed-eyes');
  if (eyes && window.matchMedia('(pointer:fine)').matches) {
    window.addEventListener('mousemove', function (e) {
      var dx = (e.clientX / window.innerWidth - 0.5) * 6;
      var dy = (e.clientY / window.innerHeight - 0.5) * 4;
      eyes.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
    });
  }
})();
