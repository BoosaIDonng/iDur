"use client";

import { useEffect, useRef } from "react";
import { HUANSEN_CSS } from "./huansen-styles";
import { PortfolioNav, PortfolioSections } from "./portfolio-sections";
import { LangProvider } from "./i18n";
import { ScrollProgress } from "./portfolio-enhancers";
import { ShaderAnimation } from "./shader-animation";

/**
 * 极简风交互首页（React Client Component）。
 * 视频请放入 /public/videos/1.mp4 ~ 3.mp4，缺失时显示渐变背景占位。
 */
export function HuansenPage() {
  const rootRef = useRef<HTMLDivElement>(null);

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
      <ScrollProgress />
      <PortfolioNav />
      <div ref={rootRef} className="hsn-scope">
        <style dangerouslySetInnerHTML={{ __html: HUANSEN_CSS }} />

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
              Java 后端开发 ｜ 西安· 计算机科学与技术 · 专业排名前14%
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
