/** Homepage styles, scoped to preserve the portfolio's sticky sections. */
export const HUANSEN_CSS = `
.hsn-scope {
  position: relative;
  width: 100%;
  background: #f8f8f4;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}
body { overflow-x: clip; }

.hsn-scope .hero-section {
  position: relative;
  width: min(calc(100% - 32px), 1800px);
  min-height: calc(100svh - 96px);
  margin: 80px auto 16px;
  overflow: hidden;
  background: #f6f5ef;
  border: 1px solid rgba(37, 43, 36, 0.08);
  border-radius: 28px;
  display: flex;
  color: #1b211e;
}
.hsn-scope .hero-section::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(90deg, rgba(246,245,239,0.98) 0%, rgba(246,245,239,0.9) 34%, rgba(246,245,239,0.45) 62%, rgba(246,245,239,0.04) 100%);
}
.hsn-scope .shader-animation {
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: 0;
  pointer-events: none;
  opacity: 0.49;
  mix-blend-mode: multiply;
}
.hsn-scope .shader-animation-fallback,
.hsn-scope .shader-animation-dithering,
.hsn-scope .shader-animation > *,
.hsn-scope .shader-animation canvas { display: block; width: 100%; height: 100%; }
.hsn-scope .hero-inner {
  position: relative;
  z-index: 2;
  width: min(100% - 112px, 1056px);
  margin: 0 auto;
  padding: 34px 0 26px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 40px;
}
.hsn-scope .hero-topline,
.hsn-scope .hero-bottomline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  font-size: 11px;
  line-height: 1.5;
  letter-spacing: 0.1em;
}
.hsn-scope .hero-edition { font-weight: 600; }
.hsn-scope .hero-edition > span { color: #7e8179; margin-left: 8px; font-weight: 400; }
.hsn-scope .hero-availability { display: inline-flex; align-items: center; gap: 8px; color: #505b50; letter-spacing: 0.04em; }
.hsn-scope .hero-availability i { width: 6px; height: 6px; border-radius: 50%; background: #748471; box-shadow: 0 0 0 4px rgba(116,132,113,0.09); }
.hsn-scope .hero-copy { padding: 12px 0 24px; }
.hsn-scope .hero-intro { margin: 0 0 16px; font-size: 18px; color: #50564e; letter-spacing: 0.04em; }
.hsn-scope .hero-copy h1 { margin: 0 0 24px -0.055em; font-size: clamp(68px, 8.8vw, 118px); line-height: 0.92; letter-spacing: -0.065em; font-weight: 800; }
.hsn-scope .hero-copy h1 > span { color: var(--portfolio-accent, #c45f3d); }
.hsn-scope .hero-role { margin: 0; font-size: clamp(25px, 2.7vw, 36px); font-weight: 650; line-height: 1.35; letter-spacing: -0.03em; }
.hsn-scope .hero-specialty { margin: 6px 0 0; color: var(--portfolio-accent, #c45f3d); font-size: 17px; line-height: 1.5; font-weight: 500; }
.hsn-scope .hero-description { max-width: 470px; margin: 20px 0 0; font-size: 15px; line-height: 1.9; color: #63685e; text-wrap: pretty; }
.hsn-scope .hero-actions { display: flex; gap: 12px; align-items: center; margin-top: 28px; }
.hsn-scope .hero-actions a { display: inline-flex; align-items: center; justify-content: space-between; gap: 32px; padding: 14px 21px; border-radius: 7px; font-size: 14px; font-weight: 600; transition: background 0.2s, transform 0.2s; }
.hsn-scope .hero-actions a > span { font-size: 18px; font-weight: 400; line-height: 1; transition: transform 0.2s; }
.hsn-scope .hero-actions a:hover > span { transform: translate(2px, -2px); }
.hsn-scope .hero-actions .hero-primary { background: #252e26; color: #fff; }
.hsn-scope .hero-actions .hero-primary:hover { background: var(--portfolio-accent, #c45f3d); }
.hsn-scope .hero-actions .hero-secondary { border: 1px solid rgba(37,46,38,0.2); background: rgba(255,255,255,0.25); }
.hsn-scope .hero-actions .hero-secondary:hover { background: rgba(255,255,255,0.72); }
.hsn-scope .hero-bottomline { padding-top: 20px; border-top: 1px solid rgba(37,43,36,0.12); color: #6c7167; font-size: 10px; }
.hsn-scope .hero-bottomline i { font-style: normal; color: #acafa5; padding: 0 10px; }
.hsn-scope .hero-bottomline a { display: inline-flex; align-items: center; gap: 15px; color: #414b3f; }
.hsn-scope .hero-bottomline a > span { font-size: 20px; }

@media (max-width: 767px) {
  .hsn-scope .hero-section { width: calc(100% - 20px); margin: 112px auto 10px; min-height: calc(100svh - 122px); border-radius: 20px; }
  .hsn-scope .hero-section::after { background: linear-gradient(90deg, rgba(246,245,239,0.96), rgba(246,245,239,0.82) 65%, rgba(246,245,239,0.4)); }
  .hsn-scope .hero-inner { width: calc(100% - 40px); padding: 24px 0 20px; gap: 32px; }
  .hsn-scope .hero-topline { font-size: 10px; letter-spacing: 0.04em; flex-wrap: wrap; gap: 12px; }
  .hsn-scope .hero-availability { font-size: 10px; }
  .hsn-scope .hero-copy { padding: 0; }
  .hsn-scope .hero-intro { font-size: 15px; margin-bottom: 17px; }
  .hsn-scope .hero-copy h1 { font-size: clamp(48px, 13.6vw, 88px); margin-bottom: 24px; }
  .hsn-scope .hero-role { font-size: 27px; }
  .hsn-scope .hero-specialty { font-size: 14px; margin-top: 5px; }
  .hsn-scope .hero-description { font-size: 13px; margin-top: 18px; max-width: 310px; line-height: 1.9; }
  .hsn-scope .hero-actions { gap: 10px; margin-top: 24px; }
  .hsn-scope .hero-actions a { padding: 13px 17px; gap: 22px; font-size: 13px; }
  .hsn-scope .hero-bottomline { font-size: 9px; letter-spacing: 0.03em; padding-top: 17px; }
  .hsn-scope .hero-bottomline i { padding: 0 4px; }
  .hsn-scope .hero-bottomline a { font-size: 0; gap: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .hsn-scope .hero-actions a,
  .hsn-scope .hero-actions a > span { transition: none; }
}
`;
