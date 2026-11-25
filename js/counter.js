// Count-up numbers. Usage: <span class="big-number" data-count="50" data-suffix="+">0</span>
(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const run = (el) => {
    const end = Number(el.dataset.count), suffix = el.dataset.suffix || "";
    if (reduce) { el.textContent = end + suffix; return; }
    const t0 = performance.now(), dur = 1400;
    const tick = (t) => {
      const k = Math.min((t - t0) / dur, 1), eased = 1 - Math.pow(1 - k, 3);
      el.textContent = Math.round(end * eased) + (k === 1 ? suffix : "");
      if (k < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { run(e.target); io.unobserve(e.target); }
  }, { threshold: 0.5 });
  document.querySelectorAll("[data-count]").forEach((el) => io.observe(el));
})();
