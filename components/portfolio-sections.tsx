"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type MouseEvent, type ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useLang } from "./i18n";

/* =========================================================================
 * 线性黑白图标（基于 Lucide 路径，内联 SVG，零依赖）
 * =======================================================================*/

function Icon({
  children,
  size = 22
}: {
  children: ReactNode;
  size?: number;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const IconPuzzle = (
  <Icon>
    <path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.077.877.528 1.073 1.01a2.5 2.5 0 1 0 3.259-3.259c-.482-.196-.933-.558-1.01-1.073-.05-.336.062-.676.303-.917l1.525-1.525A2.402 2.402 0 0 1 12 2c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02Z" />
  </Icon>
);

const IconZap = (
  <Icon>
    <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
  </Icon>
);

const IconBot = (
  <Icon>
    <path d="M12 8V4H8" />
    <rect width="16" height="12" x="4" y="8" rx="2" />
    <path d="M2 14h2" />
    <path d="M20 14h2" />
    <path d="M15 13v2" />
    <path d="M9 13v2" />
  </Icon>
);

const IconMapPin = (
  <Icon size={18}>
    <path d="M20 10c0 7-8 12-8 12s-8-5-8-12a8 8 0 0 1 16 0z" />
    <circle cx="12" cy="10" r="3" />
  </Icon>
);

const IconBriefcase = (
  <Icon size={18}>
    <rect width="20" height="14" x="2" y="7" rx="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </Icon>
);

const IconPhone = (
  <Icon size={18}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />
  </Icon>
);

const IconMail = (
  <Icon size={18}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </Icon>
);

/* =========================================================================
 * 数据配置（可直接修改以替换内容）
 * =======================================================================*/

const NAV_ITEMS = [
  { id: "heroSection", label: "首页" },
  { id: "about", label: "关于" },
  { id: "skills", label: "技能" },
  { id: "projects", label: "项目" },
  { id: "honors", label: "荣誉" },
  { id: "collab", label: "合作" },
  { id: "contact", label: "联系" }
] as const;

type SkillLevel = "掌握" | "熟悉" | "了解" | "能够";

interface SkillItem {
  name: string;
  level: SkillLevel;
}

interface Skill {
  badge: string;
  title: string;
  desc: string;
  stats: { n: string; l: string }[];
  items: SkillItem[];
}

const SKILLS: Skill[] = [
  {
    badge: "JV",
    title: "Java 核心",
    desc: "基础语法、面向对象与编码习惯",
    stats: [
      { n: "2+", l: "年学习经验" },
      { n: "14%", l: "专业排名" },
      { n: "2", l: "学习实践项目" }
    ],
    items: [
      { name: "Java 基础语法 / 集合 / 异常处理", level: "掌握" },
      { name: "面向对象基础知识", level: "了解" },
      { name: "良好的编码能力和编码习惯", level: "能够" },
      { name: "简单业务接口开发", level: "能够" }
    ]
  },
  {
    badge: "BE",
    title: "后端框架 & 数据",
    desc: "Spring Boot + MySQL / Redis 基础应用",
    stats: [
      { n: "4", l: "后端框架" },
      { n: "SQL", l: "基础增删改查" },
      { n: "JWT", l: "登录认证" }
    ],
    items: [
      { name: "Spring Boot / Spring MVC 基本使用", level: "了解" },
      { name: "MyBatis / MyBatis-Plus 接口开发", level: "了解" },
      { name: "MySQL 增删改查 / 表结构 / 索引 / 事务", level: "熟悉" },
      { name: "Redis 验证码 / 登录信息 / 常用数据缓存", level: "了解" },
      { name: "RESTful 接口 / GET / POST", level: "了解" }
    ]
  },
  {
    badge: "EN",
    title: "工程 & AI 能力",
    desc: "工具链、测试与 AI 辅助开发",
    stats: [
      { n: "IDEA", l: "开发工具" },
      { n: "Postman", l: "接口测试工具" },
      { n: "AI+", l: "辅助开发" }
    ],
    items: [
      { name: "IDEA / Maven / Git 项目运行与依赖管理", level: "能够" },
      { name: "Postman 接口测试", level: "能够" },
      { name: "日志与断点调试基础问题", level: "能够" },
      { name: "DeepSeek / ChatGPT 辅助开发", level: "能够" }
    ]
  }
];

interface Project {
  idx: string;
  year: string;
  title: string;
  tags: string[];
  desc: string;
}

interface ProjectDetail extends Project {
  role: string;
  period: string;
  highlights: string[];
}

const PROJECTS: ProjectDetail[] = [
  {
    idx: "01",
    year: "2025.08 — 2025.10",
    period: "2025.08 — 2025.10",
    role: "后端开发学习实践",
    title: "星评服务系统项目",
    tags: ["Spring Boot", "MySQL", "MyBatis", "Redis", "Postman"],
    desc:
      "该项目是一个点评类服务系统，主要包括用户登录、商户信息展示、笔记发布、点赞、关注等功能。用户可以查看商户信息，发布笔记内容，并对内容进行点赞和关注操作。",
    highlights: [
      "参与用户登录、商户查询、笔记发布、点赞关注等基础接口开发。",
      "使用 Spring Boot 编写后端接口，使用 MyBatis 操作 MySQL 数据库。",
      "完成用户表、商户表、笔记表、点赞表等相关数据的基础增删改查。",
      "使用 Redis 存储验证码、登录用户信息等简单数据。",
      "完成笔记发布、笔记列表查询、点赞笔记、关注用户等功能。",
      "使用 Postman 进行接口测试，对空指针、参数错误、SQL 错误等常见问题进行排查和修改。"
    ]
  },
  {
    idx: "02",
    year: "2025.04 — 2025.06",
    period: "2025.04 — 2025.06",
    role: "后端开发学习实践",
    title: "租满意租房平台",
    tags: ["Spring Boot", "MySQL", "MyBatis-Plus", "Redis", "JWT"],
    desc:
      "该项目是一个房屋租赁类平台，主要包括用户端和后台管理端。用户端支持房源浏览、公寓详情查看、预约申请；后台管理端支持房源、公寓、用户、预约信息等基础管理功能。",
    highlights: [
      "参与房源信息、公寓信息、预约信息等模块的后端接口开发。",
      "使用 Spring Boot 搭建基础后端服务，按照 Controller、Service、Mapper 分层结构完成代码编写。",
      "使用 MyBatis-Plus 完成数据库增删改查、条件查询和分页查询。",
      "根据业务需求维护部分数据表，如用户表、房源表、预约表等。",
      "使用 JWT 实现简单用户登录认证流程，完成登录后返回 token 的基础功能。",
      "使用 Redis 缓存部分常用数据，如房源分类、登录信息等。",
      "使用 Postman 测试接口，通过日志和断点调试排查并修改基础问题。"
    ]
  }
];

interface CollabCard {
  icon: ReactNode;
  title: string;
  desc: string;
}

const COLLAB_CARDS: CollabCard[] = [
  {
    icon: IconPuzzle,
    title: "后端接口开发",
    desc: "能够按照 Controller、Service、Mapper 分层完成简单业务接口开发"
  },
  {
    icon: IconZap,
    title: "数据库与缓存",
    desc: "能够完成 MySQL 基础增删改查、条件查询、分页查询与 Redis 简单缓存"
  },
  {
    icon: IconBot,
    title: "AI 辅助开发",
    desc: "能够合理使用 DeepSeek、ChatGPT 辅助代码编写、问题排查及技术方案梳理"
  }
];

const CONTACT_TAGS = [
  "Java",
  "Spring Boot",
  "MyBatis-Plus",
  "MySQL",
  "Redis",
  "JWT",
  "Postman",
  "Git"
];

interface Honor {
  title: string;
  year: string;
  issuer: string;
  detail: string;
}
const HONORS: Honor[] = [
  {
    title: "计算机二级证书",
    year: "2024",
    issuer: "教育部考试中心",
    detail: "全国计算机等级考试 Level 2，掌握基础编程与办公软件应用能力。"
  }
];

const PROFILE = {
  name: "杜泽民",
  intent: "意向岗位：后端开发",
  phone: "157-8078-5359",
  email: "354561650@qq.com",
  age: "23",
  edu: "本科",
  gender: "男",
  school: "西安外事学院",
  major: "计算机科学与技术 · 专业排名：前14%",
  schoolPeriod: "2024.09 — 2026.06",
  location: "陕西 西安"
};

/* =========================================================================
 * 顶部固定导航
 * =======================================================================*/

// Uiverse.io / njesenberger - lever toggle（拨杆开关）
// 未勾选 = EN，勾选 = 中
const TOGGLE_CSS = `
.toggle-container {
  --knob-size: 1.75em;
  display: flex;
  justify-content: center;
  position: relative;
  font-size: 10px; /* 控制整体大小，适配顶栏 64px */
  width: 3.5em;
  height: 1.125em;
  align-items: center;
}
.toggle-input {
  position: absolute;
  z-index: 2;
  bottom: 132.5%;
  border-radius: 50%;
  transform: rotate(-25deg);
  transform-origin: 50% 4.75em;
  width: var(--knob-size);
  height: var(--knob-size);
  opacity: 0;
  font: inherit;
  transition: transform .24s cubic-bezier(.65, 1.35, .5, 1);
  cursor: pointer;
  margin: 0;
}
.toggle-input:checked { transform: rotate(25deg); }

.toggle-handle-wrapper {
  position: absolute;
  z-index: 1;
  bottom: -135%;
  -webkit-mask-image: linear-gradient(to bottom, #000 62.125%, transparent 50%);
  mask-image: linear-gradient(to bottom, #000 62.125%, transparent 50%);
  width: 200%;
  overflow: hidden;
  pointer-events: none;
}
.toggle-handle {
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: rotate(-25deg);
  transform-origin: bottom center;
  transition: transform .24s cubic-bezier(.65, 1.35, .5, 1);
}
.toggle-input:checked + .toggle-handle-wrapper > .toggle-handle {
  transform: rotate(25deg);
}
.toggle-handle-knob {
  position: relative;
  z-index: 1;
  border-radius: 50%;
  width: var(--knob-size);
  height: var(--knob-size);
  background-image: radial-gradient(farthest-corner at 70% 30%, #fedee2 4%, #d63534 12% 24%, #a81a1a 50% 65%, #d63534 75%);
  transition: transform .24s cubic-bezier(.65, 1.35, .5, 1);
}
.toggle-input:checked + .toggle-handle-wrapper .toggle-handle-knob {
  transform: rotate(-90deg);
}
.toggle-handle-knob::after {
  content: '';
  position: absolute;
  top: 0; left: 0;
  border-radius: inherit;
  width: 100%; height: 100%;
  box-shadow: inset 0 0 8px 2px rgb(255 255 255 / .4);
  opacity: 0;
  transition: opacity .2s;
}
@media (hover: hover) {
  .toggle-input:hover + .toggle-handle-wrapper .toggle-handle-knob::after,
  .toggle-input:focus-visible + .toggle-handle-wrapper .toggle-handle-knob::after {
    opacity: 1;
  }
}
.toggle-handle-bar-wrapper {
  position: relative;
  width: .5em;
  height: 3em;
}
.toggle-handle-bar {
  position: absolute;
  top: calc(var(--knob-size) / 2 * -1);
  left: 0;
  width: 100%;
  height: calc(100% + var(--knob-size) / 2);
  background-image: linear-gradient(to right, #777475, #a4a4a4, #fff 45% 55%, #a4a4a4, #777475);
  background-position-x: .06125em;
  transition: background-position-x .24s cubic-bezier(.65, 1.35, .5, 1);
  box-shadow: inset 0 1em .25em rgb(0 0 0 / .4);
}
.toggle-input:checked + .toggle-handle-wrapper .toggle-handle-bar {
  background-position-x: -.06125em;
}
.toggle-base {
  position: relative;
  border-radius: 3.125em;
  padding: .25em;
  width: 3.5em;
  height: 1.125em;
  background-color: #fff;
  background-image: linear-gradient(to bottom, #fff, #d7d7d7);
  box-shadow: 0 -.25em .5em #fff, 0 .25em .5em #d7d7d7;
}
.toggle-base-inside {
  position: relative;
  border-radius: inherit;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to bottom, #a6a6a6, #7d7d7d);
  box-shadow:
    inset 0 .0625em rgb(255 255 255 / .2),
    inset 0 -.03125em rgb(255 255 255 / 1),
    inset 0 -.0625em .25em rgb(0 0 0 / .1);
}
.toggle-base-inside::after {
  content: '';
  position: absolute;
  border-radius: inherit;
  width: 100%; height: 100%;
  background-image: linear-gradient(to bottom, #5ab054, #438c3c);
  box-shadow: inherit;
  opacity: 0;
  transition: opacity .24s cubic-bezier(.65, 1.35, .5, 1);
}
.toggle-input:checked ~ .toggle-base .toggle-base-inside::after {
  opacity: 1;
}
`;

// 基于 Uiverse.io / chase2k25 的 glass-radio-group 改写：
// - 适配黑白主题（白色/玻璃态，替换原深色版）
// - 支持任意项数：glider 宽度 = 100% / var(--nav-count)
//   glider 位置 = translateX(var(--nav-index) * 100%)
const GLASS_NAV_CSS = `
.glass-radio-group {
  position: relative;
  background: rgba(0, 0, 0, 0.04);
  border-radius: 999px;
  padding: 4px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow:
    inset 1px 1px 2px rgba(255, 255, 255, 0.5),
    inset -1px -1px 2px rgba(0, 0, 0, 0.04),
    0 2px 10px rgba(0, 0, 0, 0.04);
  overflow: hidden;
}

.glass-radio-item {
  position: relative;
  z-index: 2;
  padding: 0.45rem 1rem;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: #6e6e6b;
  background: transparent;
  border: 0;
  cursor: pointer;
  border-radius: 999px;
  transition: color 0.3s ease;
  white-space: nowrap;
}
.glass-radio-item:hover { color: #111; }
.glass-radio-item.is-active { color: #000; }

.glass-glider {
  position: absolute;
  top: 4px;
  bottom: 4px;
  left: 4px;
  width: calc((100% - 8px) / var(--nav-count, 1));
  border-radius: 999px;
  background: linear-gradient(135deg, rgba(255,255,255,0.95), rgba(235,235,232,0.85));
  box-shadow:
    0 6px 14px rgba(0, 0, 0, 0.08),
    inset 0 0 0 1px rgba(255, 255, 255, 0.7),
    inset 0 -2px 6px rgba(0, 0, 0, 0.04);
  transform: translateX(calc(var(--nav-index, 0) * 100%));
  transition:
    transform 0.55s cubic-bezier(0.37, 1.3, 0.66, 1),
    width 0.4s ease,
    background 0.4s ease;
  z-index: 1;
  pointer-events: none;
}

.mobile-nav-strip {
  scrollbar-width: none;
}
.mobile-nav-strip::-webkit-scrollbar {
  display: none;
}
.mobile-nav-rail {
  display: flex;
  width: max-content;
  min-width: max-content;
  max-width: none;
}
.mobile-nav-rail .glass-radio-item {
  padding: 0.44rem 0.9rem;
  font-size: 12px;
}

.portfolio-nav--dark .glass-radio-group {
  background: rgba(255, 255, 255, 0.08);
  box-shadow:
    inset 1px 1px 2px rgba(255, 255, 255, 0.08),
    inset -1px -1px 2px rgba(0, 0, 0, 0.18),
    0 2px 14px rgba(0, 0, 0, 0.16);
}

.portfolio-nav--dark .glass-radio-item {
  color: rgba(255, 255, 255, 0.62);
}
.portfolio-nav--dark .glass-radio-item:hover { color: #fff; }
.portfolio-nav--dark .glass-radio-item.is-active { color: #fff; }

.portfolio-nav--dark .glass-glider {
  background: linear-gradient(135deg, rgba(255,255,255,0.22), rgba(255,255,255,0.09));
  box-shadow:
    0 8px 18px rgba(0, 0, 0, 0.22),
    inset 0 0 0 1px rgba(255, 255, 255, 0.16),
    inset 0 -2px 6px rgba(0, 0, 0, 0.16);
}
`;


export function PortfolioNav() {
  const [active, setActive] = useState<string>("heroSection");
  const { lang, setLang, t } = useLang();

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) setActive(id);
          });
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      io.observe(el);
      observers.push(io);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const onJump = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const isHeroActive = active === "heroSection";

  return (
    <header
      className={`portfolio-nav fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-500 ${
        isHeroActive
          ? "portfolio-nav--dark bg-black/[0.18] border-white/10 shadow-[inset_0_-1px_0_rgba(255,255,255,0.06)]"
          : "bg-white/[0.72] border-black/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]"
      }`}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: GLASS_NAV_CSS + TOGGLE_CSS
        }}
      />
      <div className="mx-auto max-w-[1180px] px-4 md:px-6 h-14 md:h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => onJump("heroSection")}
          className={`text-xl font-black tracking-tight transition-colors duration-500 ${
            isHeroActive ? "text-white" : "text-black"
          }`}
          aria-label="返回首页"
        >
          DUZEMIN
        </button>

        {/* 中间导航 - 桌面端：Uiverse 玻璃胶囊 + Glider 滑块 */}
        <nav
          className="hidden md:flex glass-radio-group"
          style={{
            ["--nav-count" as string]: NAV_ITEMS.length,
            ["--nav-index" as string]: Math.max(
              0,
              NAV_ITEMS.findIndex((it) => it.id === active)
            )
          }}
          role="tablist"
          aria-label="主导航"
        >
          {NAV_ITEMS.map((it) => {
            const isActive = active === it.id;
            return (
              <button
                key={it.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onJump(it.id)}
                className={`glass-radio-item ${isActive ? "is-active" : ""}`}
              >
                {t(it.label)}
              </button>
            );
          })}
          <span className="glass-glider" aria-hidden="true" />
        </nav>

        {/* 右侧：位置 + 语言 */}
        <div className="hidden md:flex items-center gap-4">
          <span
            className={`text-xs tracking-wider flex items-center gap-1.5 transition-colors duration-500 ${
              isHeroActive ? "text-white/[0.62]" : "text-neutral-500"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {t("陕西 西安")}
          </span>
          <div className="flex items-center gap-2 text-xs">
            <span
              className={`transition-colors ${
                lang === "EN"
                  ? `${isHeroActive ? "text-white" : "text-black"} font-semibold`
                  : `${isHeroActive ? "text-white/[0.42]" : "text-neutral-400"}`
              }`}
            >
              EN
            </span>
            <label
              className="toggle-container"
              aria-label="语言切换：EN / 中"
              title="EN / 中"
            >
              <input
                type="checkbox"
                className="toggle-input"
                checked={lang === "中"}
                onChange={(e) => setLang(e.target.checked ? "中" : "EN")}
              />
              <div className="toggle-handle-wrapper">
                <div className="toggle-handle">
                  <div className="toggle-handle-knob" />
                  <div className="toggle-handle-bar-wrapper">
                    <div className="toggle-handle-bar" />
                  </div>
                </div>
              </div>
              <div className="toggle-base">
                <div className="toggle-base-inside" />
              </div>
            </label>
            <span
              className={`transition-colors ${
                lang === "中"
                  ? `${isHeroActive ? "text-white" : "text-black"} font-semibold`
                  : `${isHeroActive ? "text-white/[0.42]" : "text-neutral-400"}`
              }`}
            >
              中
            </span>
          </div>
        </div>

        <div className="md:hidden flex items-center">
          <button
            type="button"
            onClick={() => setLang(lang === "EN" ? "中" : "EN")}
            className={`h-8 min-w-12 rounded-full border px-3 text-xs font-semibold transition-colors ${
              isHeroActive
                ? "border-white/15 bg-white/[0.08] text-white"
                : "border-black/10 bg-white/[0.74] text-black"
            }`}
            aria-label="语言切换：EN / 中"
          >
            {lang}
          </button>
        </div>
      </div>

      <div className="mobile-nav-strip md:hidden overflow-x-auto px-3 pb-3">
        <nav
          className="mobile-nav-rail glass-radio-group"
          style={{
            ["--nav-count" as string]: NAV_ITEMS.length,
            ["--nav-index" as string]: Math.max(
              0,
              NAV_ITEMS.findIndex((it) => it.id === active)
            )
          }}
          role="tablist"
          aria-label="主导航"
        >
          {NAV_ITEMS.map((it) => {
            const isActive = active === it.id;
            return (
              <button
                key={it.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onJump(it.id)}
                className={`glass-radio-item ${isActive ? "is-active" : ""}`}
              >
                {t(it.label)}
              </button>
            );
          })}
          <span className="glass-glider" aria-hidden="true" />
        </nav>
      </div>
    </header>
  );
}

/* =========================================================================
 * 通用小组件
 * =======================================================================*/

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative inline-block">
      <h2 className="text-3xl md:text-5xl font-black tracking-[-0.04em] text-black">
        {children}
      </h2>
      <span className="absolute -bottom-3 left-0 w-12 h-[3px] bg-black rounded-full" />
    </div>
  );
}

function ProfileItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] tracking-[0.2em] text-neutral-400">{label}</dt>
      <dd className="mt-1 text-neutral-800 break-all">{value}</dd>
    </div>
  );
}

function FadeIn({
  children,
  delay = 0
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* =========================================================================
 * 技能卡片
 * =======================================================================*/

/**
 * 专业技能展示：Aceternity "Features With Sticky Scroll" 风格
 * - 左侧：3 个分类标题 sticky 固定，根据滚动位置高亮当前项
 * - 右侧：对应内容卡逐张滚过，包含 stats + items 详情
 * - 移动端：左右两栏垂直堆叠，禁用 sticky 行为
 */
function SkillsStickyShowcase() {
  const { t } = useLang();
  const [active, setActive] = useState(0);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    // 以视口上方 35% 处为"阅读焦点线"：
    // 激活规则 = 顶部已越过焦点线的卡片中，最后一张（即正在被阅读的那张）
    // 若尚无卡片越线（滚动刚开始），则激活第 0 张
    const pivotRatio = 0.35;

    let rafId = 0;
    const compute = () => {
      rafId = 0;
      const cards = cardRefs.current.filter(Boolean) as HTMLElement[];
      if (!cards.length) return;
      const pivot = window.innerHeight * pivotRatio;
      let idx = 0;
      for (let i = 0; i < cards.length; i++) {
        const rect = cards[i].getBoundingClientRect();
        if (rect.top <= pivot) idx = i;
        else break;
      }
      setActive(idx);
    };
    const onScrollOrResize = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  return (
    <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-10 md:gap-16 items-start">
      {/* 左：sticky 分类标题列表 */}
      <aside className="md:sticky md:top-28 self-start">
        <div className="text-[11px] tracking-[0.25em] text-neutral-400 mb-6">
          {t("技能分类")}
        </div>
        <ul className="grid gap-5">
          {SKILLS.map((s, i) => {
            const isActive = active === i;
            return (
              <li key={s.title}>
                <button
                  type="button"
                  onClick={() =>
                    cardRefs.current[i]?.scrollIntoView({
                      behavior: "smooth",
                      block: "center"
                    })
                  }
                  className="group flex items-start gap-4 text-left w-full"
                  aria-current={isActive}
                >
                  <motion.div
                    animate={{
                      scale: isActive ? 1 : 0.9,
                      backgroundColor: isActive ? "#000" : "#ffffff",
                      color: isActive ? "#fff" : "#9a9a9a",
                      borderColor: isActive
                        ? "#000"
                        : "rgba(0,0,0,0.1)"
                    }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl border font-black grid place-items-center text-sm md:text-base tracking-wider"
                  >
                    {s.badge}
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <motion.h3
                      animate={{
                        color: isActive ? "#000" : "#c5c5c5"
                      }}
                      transition={{ duration: 0.4 }}
                      className="text-lg md:text-2xl font-bold tracking-[-0.02em] leading-tight"
                    >
                      {t(s.title)}
                    </motion.h3>
                    <motion.div
                      animate={{
                        opacity: isActive ? 1 : 0,
                        height: isActive ? "auto" : 0
                      }}
                      transition={{ duration: 0.4 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-2 text-sm text-neutral-500 leading-relaxed">
                        {t(s.desc)}
                      </p>
                      {/* 进度横线：仅激活项显示，宽度自适应文本列，永不溢出 */}
                      <motion.div
                        initial={false}
                        animate={{ scaleX: isActive ? 1 : 0 }}
                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                        style={{ transformOrigin: "left" }}
                        className="mt-4 h-px bg-black w-full"
                      />
                    </motion.div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* 右：滚动内容面板 */}
      <div className="grid gap-6">
        {SKILLS.map((s, i) => (
          <motion.article
            key={s.title}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            data-idx={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white rounded-2xl md:rounded-3xl border border-black/5 shadow-[0_20px_60px_rgba(0,0,0,0.05)] p-6 md:p-10"
          >
            {/* 顶部：分类 tag */}
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-8 rounded-lg bg-black text-white grid place-items-center text-[11px] font-black tracking-wider">
                {s.badge}
              </span>
              <span className="text-[11px] tracking-[0.25em] text-neutral-400">
                {t("专业技能")} · 0{i + 1}
              </span>
            </div>

            {/* 统计数字 */}
            <div className="grid grid-cols-3 gap-3 md:gap-6 pb-6 border-b border-black/5">
              {s.stats.map((it) => (
                <div key={it.l} className="text-center md:text-left">
                  <div className="text-[1.125rem] sm:text-2xl md:text-4xl font-black text-black leading-none tracking-normal md:tracking-[-0.04em] whitespace-nowrap">
                    {it.n}
                  </div>
                  <div className="mt-1 text-[10px] md:text-xs text-neutral-500 tracking-wider">
                    {t(it.l)}
                  </div>
                </div>
              ))}
            </div>

            {/* 技能项列表 */}
            <ul className="divide-y divide-black/5">
              {s.items.map((it) => (
                <li
                  key={it.name}
                  className="flex items-center justify-between py-3.5"
                >
                  <span className="min-w-0 pr-3 text-sm md:text-base leading-relaxed text-neutral-800">
                    {t(it.name)}
                  </span>
                  <span
                    className={[
                      "text-[11px] tracking-[0.15em] px-3 py-1 rounded-full border",
                      it.level === "掌握"
                        ? "bg-black text-white border-black"
                        : "bg-white text-neutral-600 border-black/10"
                    ].join(" ")}
                  >
                    {t(it.level)}
                  </span>
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </div>
  );
}

/* =========================================================================
 * 项目卡片
 * =======================================================================*/

function ProjectCard({ data }: { data: ProjectDetail }) {
  const { t } = useLang();
  const cardRef = useRef<HTMLDivElement>(null);
  // 鼠标相对卡片中心的偏移（-0.5 ~ 0.5）
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springCfg = { stiffness: 150, damping: 18, mass: 0.4 };
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), springCfg);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [4, -4]), springCfg);
  // 光泽位置（百分比）
  const shineX = useTransform(mx, [-0.5, 0.5], ["0%", "100%"]);
  const shineY = useTransform(my, [-0.5, 0.5], ["0%", "100%"]);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", transformPerspective: 1200 }}
      className="group relative overflow-hidden bg-white rounded-2xl md:rounded-3xl border border-black/5 p-6 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_80px_rgba(0,0,0,0.1)] transition-shadow duration-500 will-change-transform"
    >
      {/* 鼠标跟随的柔和光泽（跟随 mx, my 移动） */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useMotionTemplate`radial-gradient(400px circle at ${shineX} ${shineY}, rgba(0,0,0,0.08), transparent 60%)`
        }}
      />
      {/* 装饰大数字 */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-4 -top-4 md:-right-6 md:-top-10 text-[110px] md:text-[220px] font-black leading-none text-black/[0.035] select-none"
      >
        {data.idx}
      </span>

      <div className="relative grid md:grid-cols-[1fr_1.4fr] gap-6 md:gap-12">
        <div>
          <div className="text-[11px] tracking-[0.25em] text-neutral-400">
            {data.period}
          </div>
          <div className="mt-1.5 text-xs tracking-wider text-neutral-500">
            {t(data.role)}
          </div>
          <h3 className="mt-4 text-2xl md:text-3xl font-black text-black tracking-[-0.03em] leading-tight">
            {t(data.title)}
          </h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {data.tags.map((t) => (
              <span
                key={t}
                className="text-[11px] tracking-wider px-2.5 py-1 rounded-full bg-black/[0.04] text-neutral-700 border border-black/5"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-sm md:text-base text-neutral-600 leading-relaxed">
            {t(data.desc)}
          </p>
          <ul className="grid gap-2 mt-1">
            {data.highlights.map((h, i) => (
              <li
                key={i}
                className="flex gap-3 text-sm text-neutral-700 leading-relaxed"
              >
                <span className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-black" />
                <span>{t(h)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.article>
  );
}

/* =========================================================================
 * 荣誉 Flip Card（悬浮翻转奖章）
 * =======================================================================*/

function HonorFlipCard({ data, i }: { data: Honor; i: number }) {
  const { t } = useLang();
  const [flipped, setFlipped] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="honor-flip"
      onClick={() => setFlipped((v) => !v)}
      data-cursor="hover"
      role="button"
      tabIndex={0}
      aria-label={t(data.title)}
    >
      <div className={`honor-flip-inner ${flipped ? "is-flipped" : ""}`}>
        {/* 正面 */}
        <div className="honor-face honor-front">
          <div className="honor-medal" aria-hidden>
            <svg viewBox="0 0 48 48" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="24" cy="20" r="10" />
              <path d="M16 28 L12 44 L24 38 L36 44 L32 28" />
              <circle cx="24" cy="20" r="4" />
            </svg>
          </div>
          <div className="text-[11px] tracking-[0.25em] text-neutral-400 mt-4">
            {t("证书")}
          </div>
          <h3 className="mt-3 text-lg md:text-xl font-black tracking-[-0.02em] text-black">
            {t(data.title)}
          </h3>
          {data.year && (
            <div className="mt-2 text-xs tracking-[0.2em] text-neutral-500">
              {data.year}
            </div>
          )}
        </div>
        {/* 背面 */}
        <div className="honor-face honor-back">
          <div className="text-[11px] tracking-[0.25em] text-neutral-400 mb-3">
            {t("颁发单位")}
          </div>
          <div className="text-base font-bold text-white">
            {t(data.issuer)}
          </div>
          <p className="mt-4 text-sm text-neutral-300 leading-relaxed">
            {t(data.detail)}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* =========================================================================
 * 合作卡片
 * =======================================================================*/

function GlowCard({
  children,
  className = ""
}: {
  children: ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const syncPointer = (e: PointerEvent) => {
      const card = cardRef.current;
      if (!card) return;
      card.style.setProperty("--x", e.clientX.toFixed(2));
      card.style.setProperty("--xp", (e.clientX / window.innerWidth).toFixed(2));
      card.style.setProperty("--y", e.clientY.toFixed(2));
      card.style.setProperty("--yp", (e.clientY / window.innerHeight).toFixed(2));
    };

    document.addEventListener("pointermove", syncPointer);
    return () => document.removeEventListener("pointermove", syncPointer);
  }, []);

  return (
    <div
      ref={cardRef}
      data-glow-card
      className={`glow-card relative min-h-[112px] md:min-h-[320px] rounded-[14px] p-3 md:p-10 ${className}`}
    >
      <div data-glow-card aria-hidden />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function CollabItem({ data, i }: { data: CollabCard; i: number }) {
  const { t } = useLang();
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      className="group min-w-0"
    >
      <GlowCard>
        <div className="w-8 h-8 md:w-14 md:h-14 rounded-lg md:rounded-2xl bg-black text-white grid place-items-center transition-transform duration-500 group-hover:rotate-[8deg] group-hover:scale-105">
          {data.icon}
        </div>
        <h3 className="mt-3 md:mt-6 text-[12px] md:text-xl leading-snug font-black text-black tracking-normal md:tracking-[-0.02em]">
          {t(data.title)}
        </h3>
        <p className="hidden md:block mt-3 text-sm text-neutral-600 leading-relaxed">
          {t(data.desc)}
        </p>
      </GlowCard>
    </motion.div>
  );
}

/* =========================================================================
 * 联系表单
 * =======================================================================*/

function ContactForm() {
  const { t } = useLang();
  type Status = "idle" | "sending" | "sent" | "submitError";
  type ContactField = "name" | "email" | "message";
  type FormValues = Record<ContactField, string>;
  type FormErrors = Partial<Record<ContactField, string>>;

  const emptyValues: FormValues = {
    name: "",
    email: "",
    message: ""
  };
  const fieldOrder: ContactField[] = ["name", "email", "message"];

  const [status, setStatus] = useState<Status>("idle");
  const [values, setValues] = useState<FormValues>(emptyValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({});
  const statusTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (statusTimerRef.current) clearTimeout(statusTimerRef.current);
    };
  }, []);

  const scheduleStatusReset = (delay: number) => {
    if (statusTimerRef.current) clearTimeout(statusTimerRef.current);
    statusTimerRef.current = setTimeout(() => setStatus("idle"), delay);
  };

  const validateField = (field: ContactField, rawValue: string) => {
    const value = rawValue.trim();

    if (field === "name") {
      return value ? "" : "请输入你的姓名。";
    }

    if (field === "email") {
      if (!value) return "请输入邮箱地址。";
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "请输入有效的邮箱地址。";
    }

    return value ? "" : "请输入留言内容。";
  };

  const applyFieldError = (field: ContactField, nextError: string) => {
    setErrors((prev) => {
      if (!nextError) {
        if (!prev[field]) return prev;
        const { [field]: _omit, ...rest } = prev;
        return rest;
      }

      if (prev[field] === nextError) return prev;
      return { ...prev, [field]: nextError };
    });
  };

  const collectErrors = (nextValues: FormValues) => {
    const nextErrors: FormErrors = {};

    fieldOrder.forEach((field) => {
      const nextError = validateField(field, nextValues[field]);
      if (nextError) nextErrors[field] = nextError;
    });

    return nextErrors;
  };

  const handleChange =
    (field: ContactField) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const nextValue = e.target.value;

      setValues((prev) => ({
        ...prev,
        [field]: nextValue
      }));

      if (status !== "sending") setStatus("idle");

      if (touched[field]) {
        applyFieldError(field, validateField(field, nextValue));
      }
    };

  const handleBlur = (field: ContactField) => {
    setTouched((prev) => ({
      ...prev,
      [field]: true
    }));
    applyFieldError(field, validateField(field, values[field]));
  };

  const renderFieldError = (field: ContactField) => {
    const message = errors[field];
    if (!message) return null;

    return (
      <p
        id={`contact-${field}-error`}
        className="mt-2 ml-0.5 flex items-center gap-2 text-[12px] font-medium leading-5 tracking-[0.01em] text-neutral-500"
        role="alert"
        aria-live="polite"
      >
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-black/80" />
        <span>{t(message)}</span>
      </p>
    );
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget;
    const nextValues: FormValues = {
      name: values.name.trim(),
      email: values.email.trim(),
      message: values.message.trim()
    };
    const nextErrors = collectErrors(nextValues);

    setTouched({
      name: true,
      email: true,
      message: true
    });
    setErrors(nextErrors);

    const firstInvalid = fieldOrder.find((field) => nextErrors[field]);
    if (firstInvalid) {
      const el = form.elements.namedItem(firstInvalid);
      if (el instanceof HTMLElement) el.focus();
      setStatus("idle");
      return;
    }

    const key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    if (!key) {
      console.warn("[ContactForm] 缺少 NEXT_PUBLIC_WEB3FORMS_KEY，表单不会真正发送。");
      setStatus("submitError");
      scheduleStatusReset(3000);
      return;
    }

    // 访客内容以上面的自定义校验结果为准
    const visitorName = nextValues.name;
    const visitorEmail = nextValues.email;
    const visitorMessage = nextValues.message;

    // 扁平字段 — Web3Forms 默认模板会按 key 顺序渲染到邮件 body
    // 不用 html 字段（免费版不生效，会被当成普通文本）
    const payload: Record<string, string> = {
      access_key: key,
      subject: `【作品集新消息】来自 ${visitorName}`,
      from_name: `iDu Portfolio · ${visitorName}`,
      replyto: visitorEmail,
      botcheck: "",
      姓名: visitorName,
      邮箱: visitorEmail,
      留言: visitorMessage
    };

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(payload)
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && (json?.success ?? true)) {
        setStatus("sent");
        setValues(emptyValues);
        setErrors({});
        setTouched({});
      } else {
        console.error("[ContactForm] web3forms error:", json);
        setStatus("submitError");
      }
    } catch (err) {
      console.error("[ContactForm] network error:", err);
      setStatus("submitError");
    } finally {
      scheduleStatusReset(3500);
    }
  };

  const underline =
    "w-full bg-transparent border-0 border-b border-black/15 py-3 text-base text-black outline-none placeholder:text-neutral-400 focus:border-black transition-colors disabled:opacity-60";

  // 按钮显示文案
  const label =
    status === "sending" ? t("发送中...") :
    status === "sent"    ? `${t("已发送")} ✓` :
    status === "submitError" ? `${t("发送失败")} ✕` :
    t("发送");

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-6">
      <div className="space-y-1">
        <input
          name="name"
          value={values.name}
          onChange={handleChange("name")}
          onBlur={() => handleBlur("name")}
          className={`${underline} ${errors.name ? "border-black/90" : ""}`}
          placeholder={t("您的姓名")}
          aria-required="true"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          disabled={status === "sending"}
          autoComplete="name"
        />
        {renderFieldError("name")}
      </div>
      <div className="space-y-1">
        <input
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange("email")}
          onBlur={() => handleBlur("email")}
          className={`${underline} ${errors.email ? "border-black/90" : ""}`}
          placeholder={t("邮箱地址")}
          aria-required="true"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          disabled={status === "sending"}
          autoComplete="email"
        />
        {renderFieldError("email")}
      </div>
      <div className="space-y-1">
        <textarea
          name="message"
          rows={4}
          value={values.message}
          onChange={handleChange("message")}
          onBlur={() => handleBlur("message")}
          className={`${underline} min-h-[132px] resize-none align-top ${errors.message ? "border-black/90" : ""}`}
          placeholder={t("留言内容")}
          aria-required="true"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          disabled={status === "sending"}
        />
        {renderFieldError("message")}
      </div>
      {/* Web3Forms honeypot：人眼不可见；爬虫填写 → 自动丢弃 */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <button
        type="submit"
        className="fly-send-btn mt-2 self-start disabled:opacity-70"
        aria-label={t("发送消息")}
        disabled={status === "sending"}
      >
        <div className="svg-wrapper-1">
          <div className="svg-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                fill="currentColor"
                d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
              />
            </svg>
          </div>
        </div>
        <span>{label}</span>
      </button>

      {status === "submitError" && (
        <div
          className="relative -mt-1 overflow-hidden rounded-[16px] border border-black bg-black px-4 py-3 text-white shadow-[0_14px_30px_rgba(0,0,0,0.12)]"
          role="status"
          aria-live="polite"
        >
          <span className="absolute inset-x-0 top-0 h-px bg-white/20" />
          <p className="flex items-center gap-3 text-sm leading-6">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-white" />
            {t("发送失败，请稍后再试或直接发送邮件。")}
          </p>
        </div>
      )}
      {status === "sent" && (
        <div
          className="relative -mt-1 overflow-hidden rounded-[16px] border border-black/10 bg-[#f6f6f3] px-4 py-3 shadow-[0_12px_26px_rgba(0,0,0,0.06)]"
          role="status"
          aria-live="polite"
        >
          <span className="absolute inset-x-0 top-0 h-[3px] bg-black/75" />
          <p className="flex items-center gap-3 text-sm leading-6 text-black">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-black" />
            {t("消息已送达，我会尽快回复你。")}
          </p>
        </div>
      )}
    </form>
  );
}

/* =========================================================================
 * 主组合：首页 Hero 之后的所有区块
 * =======================================================================*/

function PortfolioHighlightBackground({ children }: { children: ReactNode }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({
    currentTarget,
    clientX,
    clientY
  }: MouseEvent<HTMLDivElement>) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const dotPattern = (color: string) => ({
    backgroundImage: `radial-gradient(circle, ${color} 1px, transparent 1px)`,
    backgroundSize: "16px 16px"
  });

  return (
    <div
      className="group relative bg-white text-black"
      onMouseMove={handleMouseMove}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-70"
        style={dotPattern("rgb(212 212 212)")}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          ...dotPattern("rgb(99 102 241)"),
          WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
          maskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function PortfolioSections() {
  const { t } = useLang();
  return (
    <PortfolioHighlightBackground>

      {/* 关于我：个人档案 + 教育经历 */}
      <section id="about" className="relative mx-auto max-w-[1100px] px-5 md:px-6 pt-20 md:pt-40">
        <FadeIn>
          <SectionTitle>{t("关于我")}</SectionTitle>
        </FadeIn>

        <div className="mt-9 md:mt-12 grid md:grid-cols-[1fr_1.1fr] gap-8 md:gap-16">
          {/* 左：档案（Uiverse adamgiebl 新拟态卡） */}
          <FadeIn>
            <div
              className="rounded-[22px] md:rounded-[30px] p-6 md:p-10"
              style={{
                background: "#f4f4f2",
                boxShadow:
                  "14px 14px 32px #e0e0de, -14px -14px 32px #ffffff"
              }}
            >
              <div className="text-[11px] tracking-[0.25em] text-neutral-400 mb-2">
                {t("个人档案")}
              </div>
              <h3 className="text-3xl font-black tracking-[-0.03em] text-black">
                {PROFILE.name}
              </h3>
              <div className="mt-1 text-sm text-neutral-500">
                {t(PROFILE.intent)}
              </div>

              <dl className="mt-6 md:mt-8 grid grid-cols-2 gap-x-4 md:gap-x-6 gap-y-4 md:gap-y-5 text-sm">
                <ProfileItem label={t("电话")} value={PROFILE.phone} />
                <ProfileItem label={t("邮箱")} value={PROFILE.email} />
                <ProfileItem label={t("年龄")} value={PROFILE.age} />
                <ProfileItem label={t("性别")} value={t(PROFILE.gender)} />
                <ProfileItem label={t("最高学历")} value={t(PROFILE.edu)} />
                <ProfileItem label={t("坐标")} value={t(PROFILE.location)} />
              </dl>
            </div>
          </FadeIn>

          {/* 右：教育经历 */}
          <FadeIn delay={0.1}>
            <div>
              <div className="text-[11px] tracking-[0.25em] text-neutral-400 mb-4">
                {t("教育经历")}
              </div>
              <div className="relative pl-6 border-l border-black/10">
                <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-black" />
                <div className="text-xs tracking-[0.2em] text-neutral-500">
                  {PROFILE.schoolPeriod}
                </div>
                <h4 className="mt-2 text-xl md:text-2xl font-black tracking-[-0.02em] text-black">
                  {t(PROFILE.school)}
                </h4>
                <div className="mt-1 text-sm text-neutral-600">
                  {t(PROFILE.major)}
                </div>
                <p className="mt-5 text-sm text-neutral-600 leading-relaxed">
                  {t("在校期间系统学习 Java、数据库、Web 后端开发等课程，专业排名前14%。通过两个后端学习实践项目，积累了接口开发、数据库增删改查、Redis 简单缓存、登录认证与接口测试经验。")}
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 专业技能 */}
      <section id="skills" className="relative mx-auto max-w-[1100px] px-5 md:px-6 pt-24 md:pt-48">
        <FadeIn>
          <SectionTitle>{t("专业技能")}</SectionTitle>
        </FadeIn>
        <div className="mt-10 md:mt-20">
          <SkillsStickyShowcase />
        </div>
      </section>

      {/* 项目经历 */}
      <section
        id="projects"
        className="relative mx-auto max-w-[1100px] px-5 md:px-6 pt-24 md:pt-48"
      >
        <FadeIn>
          <SectionTitle>{t("项目经历")}</SectionTitle>
        </FadeIn>
        <div className="mt-10 md:mt-20 grid gap-5 md:gap-8">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.idx} data={p} />
          ))}
        </div>
      </section>

      {/* 荣誉证书 */}
      <section
        id="honors"
        className="relative mx-auto max-w-[1100px] px-5 md:px-6 pt-24 md:pt-48"
      >
        <FadeIn>
          <SectionTitle>{t("荣誉证书")}</SectionTitle>
        </FadeIn>
        <div className="mt-10 md:mt-16 grid sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
          {HONORS.map((h, i) => (
            <HonorFlipCard key={h.title} data={h} i={i} />
          ))}
        </div>
      </section>

      {/* 与我合作 */}
      <section
        id="collab"
        className="relative mx-auto max-w-[1100px] px-5 md:px-6 pt-24 md:pt-48"
      >
        <div className="grid md:grid-cols-[auto_1fr] gap-6 md:gap-16 items-end">
          <FadeIn>
            <SectionTitle>{t("与我合作")}</SectionTitle>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-base md:text-lg text-neutral-600 leading-relaxed max-w-xl">
              {t("掌握 Java 后端开发基础，了解 Spring Boot、MyBatis、MySQL 等常用技术，能够从基础功能做起，持续提升代码能力与业务理解能力。欢迎实习、校招机会与合作沟通。")}
            </p>
          </FadeIn>
        </div>
        <div className="collab-card-strip mt-8 md:mt-16 grid grid-cols-3 gap-2 md:gap-8">
          {COLLAB_CARDS.map((c, i) => (
            <CollabItem key={c.title} data={c} i={i} />
          ))}
        </div>
      </section>

      {/* 联系我 */}
      <ContactSection />

      {/* 页脚 */}
      <footer className="relative mt-24 md:mt-32 border-t border-black/5">
        <div className="mx-auto max-w-[1100px] px-5 md:px-6 py-8 md:py-10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-neutral-500 tracking-wider">
          <span>{t("© 2026 LEO. ALL RIGHTS RESERVED.")}</span>
          <span>{t("Designed & Built with 黑白高级感")}</span>
        </div>
      </footer>
    </PortfolioHighlightBackground>
  );
}

/* =========================================================================
 * 联系我（含装饰图形）
 * =======================================================================*/

function ContactSection() {
  const { t } = useLang();
  return (
    <section
      id="contact"
      className="relative mx-auto max-w-[1100px] px-5 md:px-6 pt-24 md:pt-48 pb-20 md:pb-24"
    >
      {/* 极淡几何装饰 */}
      <svg
        aria-hidden
        className="pointer-events-none absolute -z-10 top-32 right-4 w-56 h-56 opacity-40"
        viewBox="0 0 200 200"
      >
        <circle cx="100" cy="100" r="90" fill="none" stroke="black" strokeOpacity="0.08" />
        <circle cx="100" cy="100" r="60" fill="none" stroke="black" strokeOpacity="0.06" />
      </svg>
      <svg
        aria-hidden
        className="pointer-events-none absolute -z-10 bottom-20 left-0 w-48 h-48 opacity-40"
        viewBox="0 0 200 200"
      >
        <polygon points="100,20 180,170 20,170" fill="none" stroke="black" strokeOpacity="0.07" />
      </svg>
      <svg
        aria-hidden
        className="pointer-events-none absolute -z-10 top-52 left-1/2 w-40 h-40 opacity-40"
        viewBox="0 0 200 200"
      >
        <rect x="20" y="20" width="160" height="160" fill="none" stroke="black" strokeOpacity="0.06" />
      </svg>

      <FadeIn>
        <SectionTitle>{t("联系我")}</SectionTitle>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p className="mt-8 md:mt-10 text-base md:text-lg text-neutral-600 leading-relaxed max-w-2xl">
          {t("希望在实际工作中积累项目经验，提高代码能力和业务理解能力，持续提升后端开发能力。")}
        </p>
      </FadeIn>

      <div className="mt-10 md:mt-14 grid md:grid-cols-[1.1fr_1fr] gap-10 md:gap-20">
        {/* 左：信息 */}
        <FadeIn>
          <div>
            <div className="grid gap-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-black text-white grid place-items-center">
                  {IconMapPin}
                </div>
                <div>
                  <div className="text-[11px] tracking-[0.25em] text-neutral-400">{t("坐标")}</div>
                  <div className="text-base text-black">{t(PROFILE.location)}</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-black text-white grid place-items-center">
                  {IconBriefcase}
                </div>
                <div>
                  <div className="text-[11px] tracking-[0.25em] text-neutral-400">{t("意向岗位")}</div>
                  <div className="text-base text-black">{t("Java 后端开发")}</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-black text-white grid place-items-center">
                  {IconPhone}
                </div>
                <div>
                  <div className="text-[11px] tracking-[0.25em] text-neutral-400">{t("电话")}</div>
                  <a
                    href={`tel:${PROFILE.phone}`}
                    className="text-base text-black underline-offset-4 hover:underline"
                  >
                    {PROFILE.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-black text-white grid place-items-center">
                  {IconMail}
                </div>
                <div>
                  <div className="text-[11px] tracking-[0.25em] text-neutral-400">{t("邮箱")}</div>
                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="text-base text-black underline-offset-4 hover:underline"
                  >
                    {PROFILE.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <div className="text-[11px] tracking-[0.25em] text-neutral-400 mb-3">{t("技能关键词")}</div>
              <div className="flex flex-wrap gap-2">
                {CONTACT_TAGS.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-3 py-1.5 rounded-full border border-black/10 bg-white text-neutral-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-12">
              <div className="text-[11px] tracking-[0.25em] text-neutral-400 mb-3">{t("更多联系方式")}</div>
              <div className="text-sm text-neutral-500 leading-relaxed">
                {t("微信、QQ 等渠道可在邮件 / 表单沟通后进一步交换。")}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* 右：表单 */}
        <FadeIn delay={0.12}>
          <div className="glass-card p-6 md:p-10">
            <div className="text-[11px] tracking-[0.25em] text-neutral-500 mb-6">
              {t("快速联系")}
            </div>
            <ContactForm />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
