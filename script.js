/* KNICE Digital Academy — shared site behaviour */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initMobileNav();
    initLanguage();
    initBlogAccordion();
    initFilterTabs();
    initContactForm();
    initYear();
  });

  /* ---------------- Mobile navigation ---------------- */
  function initMobileNav() {
    var toggle = document.querySelector('.menu-toggle');
    var links = document.querySelector('.nav-links');
    if (!toggle || !links) return;

    toggle.addEventListener('click', function () {
      var isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------------- Language toggle (EN / HA) ---------------- */
  function initLanguage() {
    var buttons = document.querySelectorAll('[data-lang]');
    if (!buttons.length) return;

    var saved = localStorage.getItem('knice-lang') || 'en';
    setLanguage(saved);

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        setLanguage(btn.getAttribute('data-lang'));
      });
    });

    function setLanguage(lang) {
      document.body.classList.toggle('lang-ha', lang === 'ha');
      document.documentElement.setAttribute('lang', lang === 'ha' ? 'ha' : 'en');
      buttons.forEach(function (b) {
        b.classList.toggle('active', b.getAttribute('data-lang') === lang);
      });
      localStorage.setItem('knice-lang', lang);
    }
  }

  /* ---------------- Blog accordion ---------------- */
  function initBlogAccordion() {
    var posts = document.querySelectorAll('.post');
    if (!posts.length) return;

    posts.forEach(function (post) {
      var head = post.querySelector('.post-head');
      if (!head) return;
      head.addEventListener('click', function () {
        var wasOpen = post.classList.contains('open');
        posts.forEach(function (p) { p.classList.remove('open'); });
        if (!wasOpen) post.classList.add('open');
      });
    });
  }

  /* ---------------- Portfolio / course filter tabs ---------------- */
  function initFilterTabs() {
    var filterRow = document.querySelector('.filter-row');
    if (!filterRow) return;

    var buttons = filterRow.querySelectorAll('.filter-btn');

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        buttons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var filter = btn.getAttribute('data-filter');
        // Queried fresh on every click so CMS-added cards (appended after
        // page load) are included, not just the cards present at load time.
        var items = document.querySelectorAll('[data-category]');

        items.forEach(function (item) {
          var show = filter === 'all' || item.getAttribute('data-category') === filter;
          item.style.display = show ? '' : 'none';
        });
      });
    });
  }

  /* ---------------- Contact form (static-site friendly) ---------------- */
  function initContactForm() {
    var form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      var note = document.getElementById('form-status');
      var name = form.querySelector('[name="name"]');
      if (name && !name.value.trim()) {
        e.preventDefault();
        if (note) note.textContent = 'Please enter your name / Da fatan a rubuta suna.';
        return;
      }
      // Netlify Forms handles the actual submission (data-netlify="true").
      if (note) note.textContent = 'Sending…';
    });
  }

  /* ---------------- Footer year ---------------- */
  function initYear() {
    var el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
  }
})();
