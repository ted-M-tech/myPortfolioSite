/**
 * スクロールで要素を現す処理と、数値のカウントアップ。
 *
 * CSS の animation-timeline: view() は使わない。理由は global.css のリビール節に
 * 書いたとおりで、要素の高さ次第で progress が進まず消えたままになる事故を踏んだ。
 * IntersectionObserver は全ブラウザで同じ挙動をするぶん、結果的に手がかからない。
 */

const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

export function initReveal() {
  const targets = document.querySelectorAll<HTMLElement>(".reveal");

  if (reduced) {
    // 動きを求められていない。終わった状態を配って終了
    for (const el of targets) el.classList.add("is-in");
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add("is-in");
        io.unobserve(e.target);
      }
    },
    { threshold: 0.12 },
  );

  for (const el of targets) io.observe(el);
}

export function initCounters() {
  const nums = document.querySelectorAll<HTMLElement>("[data-count]");

  if (reduced) {
    // 最終値をそのまま出す
    for (const el of nums) el.textContent = formatValue(el);
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        countUp(e.target as HTMLElement);
        io.unobserve(e.target);
      }
    },
    { threshold: 0.6 },
  );

  for (const el of nums) io.observe(el);
}

function formatValue(el: HTMLElement) {
  return Number(el.dataset.count ?? 0).toLocaleString();
}

function countUp(el: HTMLElement) {
  const to = Number(el.dataset.count ?? 0);
  const duration = 1100;
  const start = performance.now();

  const step = (now: number) => {
    const p = Math.min(1, (now - start) / duration);
    // ease-out cubic。終わりに向かって減速する
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(to * eased).toLocaleString();
    if (p < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}
