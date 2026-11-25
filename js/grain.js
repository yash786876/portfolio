// Film grain + vignette overlay. Include once per page: <script src="js/grain.js" defer></script>
(() => {
  const style = document.createElement("style");
  style.textContent = `
    .fx-grain, .fx-vignette { position: fixed; inset: 0; pointer-events: none; z-index: 100; }
    .fx-grain { opacity: .12; mix-blend-mode: multiply; background-image: url("assets/grain.svg"); animation: fx-grain 0.6s steps(4) infinite; }
    body.is-dark .fx-grain { mix-blend-mode: screen; opacity: .08; }
    .fx-vignette { box-shadow: inset 0 0 160px 40px rgba(0,0,0,.55); border-radius: 18px; }
    @keyframes fx-grain { 0%{transform:translate(0,0)} 25%{transform:translate(-3%,2%)} 50%{transform:translate(2%,-3%)} 75%{transform:translate(-2%,-1%)} 100%{transform:translate(0,0)} }
    @media (prefers-reduced-motion: reduce) { .fx-grain { animation: none; } }
  `;
  document.head.appendChild(style);
  for (const cls of ["fx-grain", "fx-vignette"]) {
    const el = document.createElement("div");
    el.className = cls;
    el.setAttribute("aria-hidden", "true");
    document.body.appendChild(el);
  }
})();
