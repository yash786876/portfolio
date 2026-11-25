// Ink-blot -> sharp text reveal on scroll. Usage: <h2 data-reveal>Text</h2>
(() => {
  const style = document.createElement("style");
  style.textContent = `
    [data-reveal] { filter: blur(14px) contrast(6); opacity: 0; transform: translateY(12px);
      transition: filter 1.1s var(--ease, ease), opacity .8s var(--ease, ease), transform 1s var(--ease, ease); }
    [data-reveal].is-in { filter: blur(0) contrast(1); opacity: 1; transform: none; }
    @media (prefers-reduced-motion: reduce) { [data-reveal] { filter: none; opacity: 1; transform: none; } }
  `;
  document.head.appendChild(style);

  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
  }, { threshold: 0.2 });
  document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
})();
