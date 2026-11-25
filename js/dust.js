// Drifting dust particles. Usage: <canvas data-dust="dark"></canvas> or data-dust="light"
(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.querySelectorAll("canvas[data-dust]").forEach((canvas) => {
    const ctx = canvas.getContext("2d");
    const dark = canvas.dataset.dust !== "light";
    const color = dark ? "255,255,255" : "60,50,40";
    let w, h, parts = [];

    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round((w * h) / 900);
      parts = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        r: Math.random() * 1.4 + 0.2,
        a: Math.random() * 0.5 + 0.1,
        vx: (Math.random() - 0.5) * 0.15, vy: (Math.random() - 0.5) * 0.15,
      }));
    };

    let mx = -9999, my = -9999;
    canvas.addEventListener("pointermove", (e) => { const b = canvas.getBoundingClientRect(); mx = e.clientX - b.left; my = e.clientY - b.top; });
    canvas.addEventListener("pointerleave", () => { mx = my = -9999; });

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        const dx = p.x - mx, dy = p.y - my, d2 = dx * dx + dy * dy;
        if (d2 < 10000) { p.vx += dx / 4000; p.vy += dy / 4000; } // push away from cursor
        p.vx *= 0.98; p.vy *= 0.98;
        p.x = (p.x + p.vx + 0.05 + w) % w; p.y = (p.y + p.vy - 0.03 + h) % h;
        ctx.fillStyle = `rgba(${color},${p.a})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
      if (!reduce) requestAnimationFrame(draw);
    };

    resize(); addEventListener("resize", resize); draw();
  });
})();
