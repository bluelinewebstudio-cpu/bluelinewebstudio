(function () {
  "use strict";

  var cfg = window.PE_CONFIG || {};

  /* Wire up config-driven fields shared across pages */
  function applyConfig() {
    document.querySelectorAll("[data-phone-display]").forEach(function (el) {
      el.textContent = cfg.PRIMARY_PHONE_DISPLAY || "";
    });
    document.querySelectorAll("[data-phone-tel]").forEach(function (el) {
      el.setAttribute("href", "tel:" + (cfg.PRIMARY_PHONE_TEL || ""));
    });
    document.querySelectorAll("[data-emergency-display]").forEach(function (el) {
      el.textContent = cfg.EMERGENCY_PHONE_DISPLAY || "";
    });
    document.querySelectorAll("[data-emergency-tel]").forEach(function (el) {
      el.setAttribute("href", "tel:" + (cfg.EMERGENCY_PHONE_TEL || ""));
    });
    document.querySelectorAll("[data-email]").forEach(function (el) {
      el.textContent = cfg.EMAIL || "";
      if (el.tagName === "A") el.setAttribute("href", "mailto:" + (cfg.EMAIL || ""));
    });

    /* Render suburb chip cloud */
    document.querySelectorAll("[data-suburb-chips]").forEach(function (el) {
      if (!Array.isArray(cfg.SUBURBS)) return;
      el.innerHTML = cfg.SUBURBS.map(function (s) {
        return '<span class="chip">' + s + "</span>";
      }).join("");
    });
  }

  /* Mobile nav toggle */
  function initNav() {
    var toggle = document.querySelector(".nav-toggle");
    var links = document.querySelector(".nav-links");
    if (!toggle || !links) return;
    toggle.addEventListener("click", function () {
      var open = toggle.classList.toggle("is-open");
      links.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        toggle.classList.remove("is-open");
        links.classList.remove("is-open");
        document.body.style.overflow = "";
      });
    });
  }

  /* Solidify header on scroll */
  function initHeaderScroll() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* Reveal-on-scroll via IntersectionObserver */
  function initReveal() {
    var targets = document.querySelectorAll(".reveal:not(.is-observed), .reveal-stagger:not(.is-observed), .reveal-scale:not(.is-observed)");
    if (!targets.length) return;
    if (!("IntersectionObserver" in window)) {
      targets.forEach(function (t) { t.classList.add("is-visible", "is-observed"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    targets.forEach(function (t) { t.classList.add("is-observed"); io.observe(t); });
  }

  /* Split hero heading words into spans for staggered entrance */
  function initHeroWords() {
    document.querySelectorAll("[data-hero-split]").forEach(function (el) {
      var words = el.textContent.trim().split(/\s+/);
      el.innerHTML = words.map(function (w, i) {
        return '<span class="hero-word"><span style="animation-delay:' +
          (0.15 + i * 0.06) + 's">' + w + "&nbsp;</span></span>";
      }).join("");
    });
  }

  /* Animated count-up for stat numbers, e.g. data-count-to="45" data-count-suffix="+" */
  function initCounters() {
    var counters = document.querySelectorAll("[data-count-to]");
    if (!counters.length || !("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        io.unobserve(entry.target);
        var el = entry.target;
        var to = parseInt(el.getAttribute("data-count-to"), 10) || 0;
        var suffix = el.getAttribute("data-count-suffix") || "";
        var dur = 1400;
        var start = null;
        function step(ts) {
          if (start === null) start = ts;
          var progress = Math.min((ts - start) / dur, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * to) + suffix;
          if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.4 });
    counters.forEach(function (c) { io.observe(c); });
  }

  /* Contact form: static success state (no backend wired yet) */
  function initContactForm() {
    var form = document.querySelector("[data-contact-form]");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var submitBtn = form.querySelector('button[type="submit"]');
      var success = form.querySelector(".form-success");
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending…";
      }
      window.setTimeout(function () {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Request a Quote";
        }
        if (success) success.classList.add("is-visible");
        form.reset();
      }, 700);
    });
  }

  /* Smooth-scroll for in-page anchor links, accounting for fixed header */
  function initAnchorScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener("click", function (e) {
        var id = a.getAttribute("href").slice(1);
        var target = id && document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        var top = target.getBoundingClientRect().top + window.scrollY - 84;
        window.scrollTo({ top: top, behavior: "smooth" });
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    applyConfig();
    initNav();
    initHeaderScroll();
    initReveal();
    initHeroWords();
    initCounters();
    initContactForm();
    initAnchorScroll();
  });
})();
