/**
 * Huansen 首页样式（极简黑白主题），作用域限定于 .hsn-scope。
 */
export const HUANSEN_CSS = `
/* 注意：不在 .hsn-scope 上加 overflow-x: hidden —— CSS 规范会将 overflow-y 隐式提升为 auto，
   这会把 .hsn-scope 变成 position:sticky 的滚动容器，导致内部 sticky 元素失效。
   横向溢出防护改由全局 body 兜底（见下）。 */
.hsn-scope { position: relative; width: 100%; background-color: #fafafa; font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; scroll-behavior: smooth; }
body { overflow-x: clip; }

.hsn-scope .hero-section {
  position: relative; width: 100%; height: 100vh; display: flex; justify-content: center; align-items: center;
  overflow: hidden; background: #000; left: auto; transform: none;
}

.hsn-scope .shader-animation {
  position: absolute; inset: 0; overflow: hidden; z-index: 0; pointer-events: none;
  background: #000;
}
.hsn-scope .shader-animation-canvas {
  display: block; width: 100%; height: 100%;
}

/* 首屏顶部收黑，让透明导航和深色背景衔接更干净 */
.hsn-scope .hero-fade-top {
  position: absolute; left: 0; right: 0; top: 0; height: 18vh;
  z-index: 0; pointer-events: none;
  background: linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.34) 46%, rgba(0,0,0,0) 100%);
}

.hsn-scope .layer { position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; perspective: 1000px; }
.hsn-scope .layer-base { background-color: transparent; z-index: 1; }
.hsn-scope .layer-base .text-thin, .hsn-scope .layer-base .text-bold { color: #fff; }

.hsn-scope .layer-hover {
  background-color: #fff; z-index: 2;
  clip-path: circle(var(--circle-size, 0px) at var(--mouse-x, -500px) var(--mouse-y, -500px));
  -webkit-clip-path: circle(var(--circle-size, 0px) at var(--mouse-x, -500px) var(--mouse-y, -500px));
  opacity: 0; transition: opacity 0.3s ease; pointer-events: none;
}
.hsn-scope .layer-hover .text-thin, .hsn-scope .layer-hover .text-bold, .hsn-scope .layer-hover .subtitle { color: #000; }

.hsn-scope .hero-group {
  position: relative; width: 96vw; height: 72vh; display: flex; flex-direction: column; justify-content: center; align-items: center;
  transform-style: preserve-3d; cursor: crosshair;
}
.hsn-scope .text-wrapper { display: flex; align-items: baseline; gap: 1.5vw; }
.hsn-scope .text-thin { font-size: 4vw; font-weight: 100; letter-spacing: -0.05em; white-space: nowrap; min-width: 18vw; text-align: right; }
.hsn-scope .text-bold { font-size: 11vw; font-weight: 900; letter-spacing: -0.05em; white-space: nowrap; }

.hsn-scope .subtitle {
  position: absolute; top: 75%; left: 0; width: 100%; text-align: center;
  font-size: 20px; font-weight: 300; letter-spacing: 0.4em; opacity: 0.7; transform: translateZ(30px); text-indent: 0.4em;
}

.hsn-scope .scroll-indicator { position: absolute; bottom: 4vh; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 10px; }
.hsn-scope .scroll-text { font-size: 11px; font-weight: 600; letter-spacing: 0.3em; text-transform: uppercase; transition: color 0.3s; }
.hsn-scope .scroll-line-box { width: 1px; height: 6vh; position: relative; overflow: hidden; }
.hsn-scope .scroll-line-inner { position: absolute; top: 0; left: 0; width: 100%; height: 50%; animation: scrollDown 2s cubic-bezier(0.77, 0, 0.175, 1) infinite; }

@keyframes scrollDown { 0% { transform: translateY(-100%); } 100% { transform: translateY(200%); } }

.hsn-scope #layerBase .scroll-text { color: #fff; }
.hsn-scope #layerBase .scroll-line-box { background-color: rgba(255,255,255,0.24); }
.hsn-scope #layerBase .scroll-line-inner { background-color: #fff; }
.hsn-scope #layerHover .scroll-text { color: #000; }
.hsn-scope #layerHover .scroll-line-box { background-color: rgba(0,0,0,0.12); }
.hsn-scope #layerHover .scroll-line-inner { background-color: #000; }

@media (max-width: 767px) {
  .hsn-scope .hero-section {
    height: 100svh;
    min-height: 620px;
  }

  .hsn-scope .layer-hover {
    display: none;
  }

  .hsn-scope .hero-group {
    width: min(88vw, 390px);
    height: auto;
    transform: none !important;
    align-items: flex-start;
    cursor: default;
  }

  .hsn-scope .text-wrapper {
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .hsn-scope .text-thin {
    min-width: 0;
    font-size: clamp(32px, 10vw, 44px);
    line-height: 0.95;
    text-align: left;
    letter-spacing: -0.04em;
  }

  .hsn-scope .text-bold {
    max-width: 100%;
    font-size: clamp(58px, 18vw, 78px);
    line-height: 0.86;
    white-space: normal;
    letter-spacing: -0.055em;
    overflow-wrap: anywhere;
  }

  .hsn-scope .subtitle {
    display: none;
  }

  .hsn-scope .scroll-indicator {
    bottom: 5vh;
    gap: 8px;
  }

  .hsn-scope .scroll-line-box {
    height: 44px;
  }
}
`;
