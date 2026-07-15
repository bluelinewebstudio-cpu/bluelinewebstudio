(function () {
  "use strict";

  var cfg = window.TFP_CONFIG || {};

  /* Wire up config-driven fields shared across pages */
  function applyConfig() {
    document.querySelectorAll("[data-phone-display]").forEach(function (el) {
      el.textContent = cfg.PRIMARY_PHONE_DISPLAY || "";
    });
    document.querySelectorAll("[data-phone-tel]").forEach(function (el) {
      el.setAttribute("href", "tel:" + (cfg.PRIMARY_PHONE_TEL || ""));
    });
    document.querySelectorAll("[data-license]").forEach(function (el) {
      el.textContent = cfg.LICENSE_NUMBER || "";
    });
    document.querySelectorAll("[data-review-count]").forEach(function (el) {
      el.textContent = cfg.REVIEW_COUNT || "";
    });
    document.querySelectorAll("[data-review-rating]").forEach(function (el) {
      el.textContent = cfg.REVIEW_RATING || "";
    });
    document.querySelectorAll("[data-facebook]").forEach(function (el) {
      el.setAttribute("href", (cfg.SOCIALS && cfg.SOCIALS.facebook) || "#");
    });
    document.querySelectorAll("[data-instagram]").forEach(function (el) {
      el.setAttribute("href", (cfg.SOCIALS && cfg.SOCIALS.instagram) || "#");
    });
    document.querySelectorAll("[data-youtube]").forEach(function (el) {
      el.setAttribute("href", (cfg.SOCIALS && cfg.SOCIALS.youtube) || "#");
    });
    document.querySelectorAll("[data-twitter]").forEach(function (el) {
      el.setAttribute("href", (cfg.SOCIALS && cfg.SOCIALS.twitter) || "#");
    });

    /* Render suburb chip cloud */
    document.querySelectorAll("[data-suburb-chips]").forEach(function (el) {
      if (!Array.isArray(cfg.SUBURBS)) return;
      el.innerHTML = cfg.SUBURBS.map(function (s) {
        return '<span class="chip">' + s + "</span>";
      }).join("");
    });

    /* Render location cards */
    document.querySelectorAll("[data-location-cards]").forEach(function (el) {
      if (!Array.isArray(cfg.LOCATIONS)) return;
      el.innerHTML = cfg.LOCATIONS.map(function (loc) {
        return (
          '<div class="card location-card reveal">' +
          '<h3><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>' + loc.name + "</h3>" +
          '<div class="location-detail"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg><span>' + loc.address1 + ", " + loc.address2 + "</span></div>" +
          '<div class="location-detail"><svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z"/></svg><a href="tel:' + loc.phoneTel + '">' + loc.phoneDisplay + "</a></div>" +
          '<a class="btn btn-outline btn-sm" href="' + loc.mapsUrl + '" target="_blank" rel="noopener">Get Directions</a>' +
          "</div>"
        );
      }).join("");
      initReveal();
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

  /* Reveal-on-scroll via IntersectionObserver (re-runnable for injected content) */
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

  /* Animated count-up for stat numbers, e.g. data-count-to="733" data-count-suffix="+" */
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

  /* Gallery / photo lightbox */
  function initLightbox() {
    var items = document.querySelectorAll("[data-lightbox-src]");
    var lightbox = document.querySelector(".lightbox");
    if (!items.length || !lightbox) return;
    var img = lightbox.querySelector("img");
    var closeBtn = lightbox.querySelector(".lightbox-close");

    function open(src, alt) {
      img.setAttribute("src", src);
      img.setAttribute("alt", alt || "");
      lightbox.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }
    function close() {
      lightbox.classList.remove("is-open");
      document.body.style.overflow = "";
    }
    items.forEach(function (item) {
      item.addEventListener("click", function () {
        open(item.getAttribute("data-lightbox-src"), item.getAttribute("data-lightbox-alt"));
      });
    });
    closeBtn.addEventListener("click", close);
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
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
          submitBtn.textContent = "Request Service";
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
    initLightbox();
    initContactForm();
    initAnchorScroll();
  });
})();
