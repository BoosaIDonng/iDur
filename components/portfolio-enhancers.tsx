"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

/**
 * 顶部滚动进度条（2px 黑线，跟随页面滚动从左到右填充）
 * 位置：fixed top:0，z-index 比导航高一级
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 22,
    mass: 0.2
  });
  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 right-0 h-[2px] bg-black z-[60] origin-left"
      style={{ scaleX }}
    />
  );
}

/**
 * 自定义跟随鼠标光点
 * - 默认：黑色小圆点跟随鼠标
 * - 悬浮在 button / a / [data-cursor="hover"] 时放大为空心圈
 * - 移动端（hover: none）自动隐藏，不影响触屏
 * - 使用 mix-blend-mode: difference 在白底 / 黑底上自动反色
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // 仅在支持 hover 的设备上启用（排除触屏）
    if (!window.matchMedia("(hover: hover)").matches) return;
    setEnabled(true);
    document.body.style.cursor = "none";

    let rafId = 0;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let dx = mx;
    let dy = my;
    let rx = mx;
    let ry = my;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const tick = () => {
      // 小点：紧贴鼠标
      dx += (mx - dx) * 0.9;
      dy += (my - dy) * 0.9;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dx - 4}px, ${dy - 4}px, 0)`;
      }
      // 圆环：有阻尼延迟
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    const isInteractive = (el: Element | null) => {
      if (!el) return false;
      return !!el.closest(
        "a, button, label.toggle-container, [data-cursor=\"hover\"], input, textarea"
      );
    };
    const onOver = (e: MouseEvent) => {
      setHovering(isInteractive(e.target as Element));
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.body.style.cursor = "";
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999] w-2 h-2 rounded-full bg-black"
        style={{ mixBlendMode: "difference" }}
      />
      <div
        ref={ringRef}
        aria-hidden
        className={`pointer-events-none fixed top-0 left-0 z-[9999] w-9 h-9 rounded-full border border-black transition-[width,height,margin,border-color,opacity] duration-200 ${
          hovering ? "scale-[1.6] opacity-100" : "scale-100 opacity-70"
        }`}
        style={{ mixBlendMode: "difference" }}
      />
    </>
  );
}
