/**
 * ポインタに反応して要素をわずかに傾ける。
 *
 * 触れる面が平らなままだと、静止画を眺めている感じが抜けない。
 * 角度は最大 6 度に抑えてあり、ページ全体が揺れる印象にはならない。
 */
export function initTilt(selector = "[data-tilt]") {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  // 指で操作する端末では、押した瞬間に傾いても嬉しくない
  if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  for (const el of document.querySelectorAll<HTMLElement>(selector)) {
    el.addEventListener(
      "pointermove",
      (e) => {
        const r = el.getBoundingClientRect();
        const rx = ((e.clientY - r.top) / r.height - 0.5) * -6;
        const ry = ((e.clientX - r.left) / r.width - 0.5) * 6;
        el.style.transition = "transform 80ms var(--ease-out)";
        el.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
      },
      { passive: true },
    );

    el.addEventListener("pointerleave", () => {
      el.style.transition = "transform 500ms var(--ease-out)";
      el.style.transform = "";
    });
  }
}
