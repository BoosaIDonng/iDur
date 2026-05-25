"use client";

import { useEffect, useRef, useState } from "react";
import { HUANSEN_CSS } from "./huansen-styles";
import { PortfolioNav, PortfolioSections } from "./portfolio-sections";
import { LangProvider } from "./i18n";
import { ScrollProgress } from "./portfolio-enhancers";
import { ShaderAnimation } from "./shader-animation";

const INTRO_SPLASH_CSS = `
.intro-splash {
  position: fixed;
  inset: 0;
  z-index: 120;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background:
    radial-gradient(circle at top, rgba(0, 0, 0, 0.06), transparent 42%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.985), rgba(243, 243, 239, 0.96));
  opacity: 1;
  visibility: visible;
  transition:
    opacity 0.8s ease,
    visibility 0.8s ease;
}

.intro-splash::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(0, 0, 0, 0.13) 1.6px, transparent 0);
  background-size: 30px 30px;
  background-position: -6px -6px;
  opacity: 0.25;
}

.intro-splash.is-fading {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

.intro-splash-panel {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  min-width: min(92vw, 360px);
  padding: 34px 32px 30px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.78);
  box-shadow:
    0 28px 60px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
}

.intro-splash-kicker {
  font-size: 11px;
  letter-spacing: 0.34em;
  text-transform: uppercase;
  color: #8d8d88;
}

.intro-splash-title {
  font-size: clamp(28px, 5vw, 38px);
  font-weight: 900;
  letter-spacing: -0.04em;
  color: #111111;
}

.intro-splash-copy {
  margin: 0;
  font-size: 14px;
  letter-spacing: 0.08em;
  color: #71716c;
}

.intro-hand-shell {
  position: relative;
  width: 180px;
  height: 120px;
  display: grid;
  place-items: center;
}

.intro-hand-loader {
  --skin-color: #d6c39b;
  --tap-speed: 0.6s;
  --tap-stagger: 0.1s;
  position: relative;
  width: 80px;
  height: 60px;
  margin-left: 56px;
}

.intro-hand-loader::before {
  content: "";
  display: block;
  width: 180%;
  height: 75%;
  position: absolute;
  top: 70%;
  right: 20%;
  background-color: #000000;
  border-radius: 40px 10px;
  filter: blur(10px);
  opacity: 0.18;
}

.intro-hand-palm {
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: var(--skin-color);
  border-radius: 10px 40px;
}

.intro-hand-thumb {
  position: absolute;
  width: 120%;
  height: 38px;
  background-color: var(--skin-color);
  bottom: -18%;
  right: 1%;
  transform-origin: calc(100% - 20px) 20px;
  transform: rotate(-20deg);
  border-radius: 30px 20px 20px 10px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  border-left: 2px solid rgba(0, 0, 0, 0.1);
}

.intro-hand-thumb::after {
  width: 20%;
  height: 60%;
  content: "";
  background-color: rgba(255, 255, 255, 0.3);
  position: absolute;
  bottom: -8%;
  left: 5px;
  border-radius: 60% 10% 10% 30%;
  border-right: 2px solid rgba(0, 0, 0, 0.05);
}

.intro-hand-finger {
  position: absolute;
  width: 80%;
  height: 35px;
  background-color: var(--skin-color);
  bottom: 32%;
  right: 64%;
  transform-origin: 100% 20px;
  animation-duration: calc(var(--tap-speed) * 2);
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  transform: rotate(10deg);
}

.intro-hand-finger::before {
  content: "";
  position: absolute;
  width: 140%;
  height: 30px;
  background-color: var(--skin-color);
  bottom: 8%;
  right: 65%;
  transform-origin: calc(100% - 20px) 20px;
  transform: rotate(-60deg);
  border-radius: 20px;
}

.intro-hand-finger:nth-child(1) {
  animation-delay: 0s;
  filter: brightness(70%);
  animation-name: intro-tap-upper-1;
}

.intro-hand-finger:nth-child(2) {
  animation-delay: var(--tap-stagger);
  filter: brightness(80%);
  animation-name: intro-tap-upper-2;
}

.intro-hand-finger:nth-child(3) {
  animation-delay: calc(var(--tap-stagger) * 2);
  filter: brightness(90%);
  animation-name: intro-tap-upper-3;
}

.intro-hand-finger:nth-child(4) {
  animation-delay: calc(var(--tap-stagger) * 3);
  filter: brightness(100%);
  animation-name: intro-tap-upper-4;
}

@keyframes intro-tap-upper-1 {
  0%, 50%, 100% {
    transform: rotate(10deg) scale(0.4);
  }

  40% {
    transform: rotate(50deg) scale(0.4);
  }
}

@keyframes intro-tap-upper-2 {
  0%, 50%, 100% {
    transform: rotate(10deg) scale(0.6);
  }

  40% {
    transform: rotate(50deg) scale(0.6);
  }
}

@keyframes intro-tap-upper-3 {
  0%, 50%, 100% {
    transform: rotate(10deg) scale(0.8);
  }

  40% {
    transform: rotate(50deg) scale(0.8);
  }
}

@keyframes intro-tap-upper-4 {
  0%, 50%, 100% {
    transform: rotate(10deg) scale(1);
  }

  40% {
    transform: rotate(50deg) scale(1);
  }
}

@media (max-width: 640px) {
  .intro-splash-panel {
    min-width: 0;
    width: 100%;
    padding: 30px 24px 26px;
    border-radius: 24px;
  }

  .intro-hand-shell {
    width: 156px;
    height: 104px;
  }

  .intro-hand-loader {
    transform: scale(0.92);
    margin-left: 46px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .intro-splash {
    transition-duration: 0.45s;
  }

  .intro-hand-finger {
    animation: none;
  }
}
`;

/**
 * 极简风交互首页（React Client Component）。
 * 视频请放入 /public/videos/1.mp4 ~ 3.mp4，缺失时显示渐变背景占位。
 */
export function HuansenPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [introState, setIntroState] = useState<"visible" | "fading" | "hidden">("visible");

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const fadeTimer = window.setTimeout(() => {
      setIntroState("fading");
    }, 1500);

    const hideTimer = window.setTimeout(() => {
      setIntroState("hidden");
      document.body.style.overflow = previousOverflow;
    }, 2300);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(hideTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const $ = <T extends HTMLElement = HTMLElement>(sel: string) =>
      root.querySelector(sel) as T | null;

    // ---------- 1. 第一屏 3D 弹簧 ----------
    const heroSection = $("#heroSection");
    const layerHover = $("#layerHover");
    const groupBase = $("#groupBase");
    const groupHover = $("#groupHover");
    const transPrefix = $("#transPrefix");
    const transName = $("#transName");

    let hoverInterval: ReturnType<typeof setInterval> | null = null;
    let isHovering = false;
    let targetRotateX = 0,
      targetRotateY = 0,
      currentRotateX = 0,
      currentRotateY = 0,
      velocityX = 0,
      velocityY = 0;
    const tension = 0.04,
      friction = 0.82;
    let currentRadius = 0,
      targetRadius = 0;
    let lastClientX = -1000,
      lastClientY = -1000,
      globalMouseX = -1000,
      globalMouseY = -1000;
    let heroWidth = window.innerWidth,
      heroHeight = window.innerHeight;
    let rafId = 0;
    let disposed = false;

    const animate3D = () => {
      if (disposed) return;
      velocityX += (targetRotateX - currentRotateX) * tension;
      velocityY += (targetRotateY - currentRotateY) * tension;
      velocityX *= friction;
      velocityY *= friction;
      currentRotateX += velocityX;
      currentRotateY += velocityY;
      const tr = `rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg)`;
      if (groupBase) groupBase.style.transform = tr;
      if (groupHover) groupHover.style.transform = tr;
      currentRadius += (targetRadius - currentRadius) * 0.15;
      if (layerHover) {
        layerHover.style.setProperty("--circle-size", `${currentRadius}px`);
        const rx = Math.max(
          currentRadius,
          Math.min(heroWidth - currentRadius, globalMouseX)
        );
        const ry = Math.max(
          currentRadius,
          Math.min(heroHeight - currentRadius, globalMouseY)
        );
        layerHover.style.setProperty("--mouse-x", `${rx}px`);
        layerHover.style.setProperty("--mouse-y", `${ry}px`);
      }
      rafId = requestAnimationFrame(animate3D);
    };
    rafId = requestAnimationFrame(animate3D);

    const languageCombos = [
      { prefix: "你好，我是", name: "DUZEMIN" },
      { prefix: "안녕하세요, 저는", name: "DUZEMIN" },
      { prefix: "Привет, я", name: "DUZEMIN" },
      { prefix: "こんにちは、私は", name: "杜泽民" },
      { prefix: "Hello, I am", name: "杜泽民" }
    ];
    const changeLanguage = () => {
      const c = languageCombos[Math.floor(Math.random() * languageCombos.length)];
      if (transPrefix) transPrefix.innerText = c.prefix;
      if (transName) transName.innerText = c.name;
    };

    const handleInteraction = (clientX: number, clientY: number) => {
      if (!heroSection || !layerHover) return;
      const r = heroSection.getBoundingClientRect();
      heroWidth = r.width;
      heroHeight = r.height;
      globalMouseX = clientX - r.left;
      globalMouseY = clientY - r.top;
      const gw = r.width * 0.96,
        gh = r.height * 0.72;
      const gl = (r.width - gw) / 2,
        gr = gl + gw;
      const gt = (r.height - gh) / 2,
        gb = gt + gh;
      const safe = 145;
      const minX = Math.max(gl, safe),
        maxX = Math.min(gr, r.width - safe);
      const minY = Math.max(gt, safe),
        maxY = Math.min(gb, r.height - safe);
      const inBounds =
        globalMouseX >= minX &&
        globalMouseX <= maxX &&
        globalMouseY >= minY &&
        globalMouseY <= maxY;
      if (inBounds) {
        const cx = r.left + r.width / 2,
          cy = r.top + r.height / 2;
        targetRotateX = (cy - clientY) / 25;
        targetRotateY = (clientX - cx) / 25;
        if (!isHovering) {
          layerHover.style.opacity = "1";
          targetRadius = 140;
          isHovering = true;
          changeLanguage();
          hoverInterval = setInterval(changeLanguage, 750);
        }
      } else {
        targetRotateX = 0;
        targetRotateY = 0;
        if (isHovering) {
          layerHover.style.opacity = "0";
          targetRadius = 0;
          isHovering = false;
          if (hoverInterval) clearInterval(hoverInterval);
        }
      }
    };

    const onMove = (e: MouseEvent) => {
      lastClientX = e.clientX;
      lastClientY = e.clientY;
      handleInteraction(lastClientX, lastClientY);
    };
    const onScroll = () => {
      if (lastClientX !== -1000) handleInteraction(lastClientX, lastClientY);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll);

    // ---------- 清理 ----------
    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      if (hoverInterval) clearInterval(hoverInterval);
    };
  }, []);

  return (
    <LangProvider>
      {introState !== "hidden" && (
        <div
          className={`intro-splash ${introState === "fading" ? "is-fading" : ""}`}
          role="status"
          aria-live="polite"
        >
          <div className="intro-splash-panel">
            <div className="intro-splash-kicker">iDu Portfolio</div>
            <div className="intro-hand-shell" aria-hidden="true">
              <div className="intro-hand-loader">
                <div className="intro-hand-finger" />
                <div className="intro-hand-finger" />
                <div className="intro-hand-finger" />
                <div className="intro-hand-finger" />
                <div className="intro-hand-palm" />
                <div className="intro-hand-thumb" />
              </div>
            </div>
            <div className="intro-splash-title">iDur</div>
            <p className="intro-splash-copy">作品集正在载入</p>
          </div>
        </div>
      )}
      <ScrollProgress />
      <PortfolioNav />
      <div ref={rootRef} className="hsn-scope">
        <style dangerouslySetInnerHTML={{ __html: HUANSEN_CSS + INTRO_SPLASH_CSS }} />

        {/* ===== 第一屏 Hero ===== */}
      <section className="hero-section" id="heroSection">
        <ShaderAnimation />
        {/* 顶部收黑，弱化导航玻璃层和首屏黑底之间的灰边 */}
        <div className="hero-fade-top" aria-hidden="true" />

        <div className="layer layer-base" id="layerBase">
          <div className="hero-group" id="groupBase">
            <div className="text-wrapper">
              <span className="text-thin">Hello, I am</span>
              <span className="text-bold">DUZEMIN</span>
            </div>
          </div>
          <div className="scroll-indicator">
            <div className="scroll-text">Scroll</div>
            <div className="scroll-line-box">
              <div className="scroll-line-inner" />
            </div>
          </div>
        </div>

        <div className="layer layer-hover" id="layerHover">
          <div className="hero-group" id="groupHover">
            <div className="text-wrapper">
              <span className="text-thin" id="transPrefix">
                你好，我是
              </span>
              <span className="text-bold" id="transName">
                杜泽民
              </span>
            </div>
            <div className="subtitle">
              Java 后端开发 ｜ 西安外事学院 · 计算机科学与技术 · 专业排名前14%
            </div>
          </div>
          <div className="scroll-indicator">
            <div className="scroll-text">Scroll</div>
            <div className="scroll-line-box">
              <div className="scroll-line-inner" />
            </div>
          </div>
        </div>
      </section>

        <PortfolioSections />
      </div>
    </LangProvider>
  );
}
