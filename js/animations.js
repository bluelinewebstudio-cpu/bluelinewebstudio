// BlueLine Web Studio — GSAP animation layer
// Degrades gracefully: if GSAP fails to load (no network), content is still
// fully visible and usable because every animated element is visible by default
// and JS only adds motion on top, never hides content via inline styles.
(function () {
  "use strict";
  if (typeof gsap === "undefined") return;

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  gsap.registerPlugin(ScrollTrigger);

  if (prefersReduced) {
    // Respect the user's OS setting: skip motion, keep instant, fully-visible state.
    gsap.set("[data-reveal], [data-reveal-group] > *", { opacity: 1, y: 0, clearProps: "transform" });
    return;
  }

  var ease = "power3.out";

  /* ---------------- Hero entrance ---------------- */
  var heroTl = gsap.timeline({ defaults: { ease: ease } });
  if (document.querySelector(".hero-content")) {
    heroTl
      .from(".hero-eyebrow", { y: 16, opacity: 0, duration: 0.6 })
      .from(".hero-content h1 .line", { y: "110%", opacity: 0, duration: 0.9, stagger: 0.08 }, "-=0.3")
      .from(".hero-content .lede", { y: 20, opacity: 0, duration: 0.7 }, "-=0.45")
      .from(".hero-actions .btn", { y: 16, opacity: 0, duration: 0.6, stagger: 0.1 }, "-=0.4")
      .from(".hero-meta", { y: 16, opacity: 0, duration: 0.6 }, "-=0.35")
      .from(".scroll-cue", { opacity: 0, duration: 0.6 }, "-=0.2");
  }

  /* ---------------- Hero line-draw (blueprint path) ---------------- */
  var heroLine = document.querySelector(".hero-line");
  if (heroLine && heroLine.getTotalLength) {
    var len = heroLine.getTotalLength();
    gsap.set(heroLine, { strokeDasharray: len, strokeDashoffset: len });
    gsap.to(heroLine, { strokeDashoffset: 0, duration: 2.2, ease: "power2.inOut", delay: 0.3 });
  }

  /* ---------------- Hero parallax on scroll ---------------- */
  if (document.querySelector(".hero")) {
    gsap.to(".hero-skyline", {
      yPercent: 12,
      ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.6 },
    });
    gsap.to(".hero-glow", {
      yPercent: 24,
      ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.6 },
    });
  }

  /* ---------------- Generic scroll reveal ---------------- */
  gsap.utils.toArray("[data-reveal]").forEach(function (el) {
    gsap.from(el, {
      y: 32,
      opacity: 0,
      duration: 0.8,
      ease: ease,
      scrollTrigger: { trigger: el, start: "top 85%" },
    });
  });

  gsap.utils.toArray("[data-reveal-group]").forEach(function (group) {
    gsap.from(group.children, {
      y: 28,
      opacity: 0,
      duration: 0.7,
      ease: ease,
      stagger: 0.12,
      scrollTrigger: { trigger: group, start: "top 85%" },
    });
  });

  /* ---------------- Stat counters ---------------- */
  gsap.utils.toArray("[data-count-to]").forEach(function (el) {
    var target = parseFloat(el.dataset.countTo);
    var suffix = el.dataset.suffix || "";
    var decimals = el.dataset.countTo.includes(".") ? 1 : 0;
    var counter = { val: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      once: true,
      onEnter: function () {
        gsap.to(counter, {
          val: target,
          duration: 1.6,
          ease: "power2.out",
          onUpdate: function () {
            el.textContent = counter.val.toFixed(decimals) + suffix;
          },
        });
      },
    });
  });

  /* ---------------- Process timeline stagger ---------------- */
  gsap.utils.toArray(".process-item").forEach(function (item, i) {
    gsap.from(item, {
      opacity: 0,
      y: 24,
      duration: 0.7,
      ease: ease,
      scrollTrigger: { trigger: item, start: "top 88%" },
    });
  });

  /* ---------------- Magnetic primary buttons (desktop only) ---------------- */
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    document.querySelectorAll(".btn-primary").forEach(function (btn) {
      var strength = 14;
      btn.addEventListener("mousemove", function (e) {
        var r = btn.getBoundingClientRect();
        var x = e.clientX - r.left - r.width / 2;
        var y = e.clientY - r.top - r.height / 2;
        gsap.to(btn, { x: (x / r.width) * strength, y: (y / r.height) * strength, duration: 0.3, ease: "power2.out" });
      });
      btn.addEventListener("mouseleave", function () {
        gsap.to(btn, { x: 0, y: 0, duration: 0.4, ease: "elastic.out(1, 0.4)" });
      });
    });
  }

  /* ---------------- Marquee pause on hover ---------------- */
  var marquee = document.querySelector(".marquee-track");
  if (marquee) {
    marquee.addEventListener("mouseenter", function () { marquee.style.animationPlayState = "paused"; });
    marquee.addEventListener("mouseleave", function () { marquee.style.animationPlayState = "running"; });
  }

  /* ---------------- Page fade-in on load ---------------- */
  gsap.from("body", { opacity: 0, duration: 0.5, ease: "power1.out" });
})();
