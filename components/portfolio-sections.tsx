"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type MouseEvent, type ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue, useTransform } from "framer-motion";
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
    desc: "Java 17/21、集合与并发基础、工程实践",
    stats: [
      { n: "17/21", l: "Java 版本" },
      { n: "API", l: "核心基础" },
      { n: "Tools", l: "工程实践" }
    ],
    items: [
      { name: "Java 常用语法与核心 API", level: "掌握" },
      { name: "集合框架 / I/O / 面向对象", level: "熟悉" },
      { name: "多线程 / 线程池 / 并发编程基础", level: "了解" },
      { name: "Python 基础语法", level: "掌握" },
      { name: "IntelliJ IDEA / Maven / Git / JMeter / ApiPost", level: "熟悉" },
      { name: "Linux / Docker 基础部署与日志排查", level: "能够" }
    ]
  },
  {
    badge: "BE",
    title: "后端工程 & 中间件",
    desc: "Spring 生态、数据库、缓存与消息队列",
    stats: [
      { n: "Spring", l: "服务框架" },
      { n: "MySQL", l: "性能优化" },
      { n: "MQ", l: "异步解耦" }
    ],
    items: [
      { name: "Spring Boot / MyBatis / MyBatis-Plus", level: "熟悉" },
      { name: "Spring Cloud / Spring Cloud Alibaba 常用组件", level: "了解" },
      { name: "MySQL / EXPLAIN / 基础 SQL 优化", level: "熟悉" },
      { name: "Redis 缓存 / 持久化 / 内存淘汰 / 分布式锁", level: "了解" },
      { name: "RocketMQ / RabbitMQ / 异步解耦与消费幂等", level: "了解" },
      { name: "XXL-Job 定时任务 / ShardingSphere 分库分表", level: "了解" }
    ]
  },
  {
    badge: "AI",
    title: "AI 应用 & Agent",
    desc: "编程 Agent、工具调用与 AI 辅助开发",
    stats: [
      { n: "ReAct", l: "任务循环" },
      { n: "MCP", l: "工具调用" },
      { n: "Agent", l: "协作编排" }
    ],
    items: [
      { name: "LangChain4j / RAG / Prompt 基本概念", level: "了解" },
      { name: "Agent Loop / ReAct / Function Calling", level: "了解" },
      { name: "MCP / Skills / 工具按需加载", level: "了解" },
      { name: "上下文管理 / Git Worktree / 多 Agent 协作", level: "了解" },
      { name: "Claude Code / Codex / Cursor 辅助编码与排查", level: "能够" },
      { name: "Vue 3 / JavaScript / Vite / Element Plus 基础联调", level: "能够" }
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
  link?: string;
  headline: string;
  flow: { title: string; desc: string }[];
  highlights: { title: string; insight: string; desc: string; tradeoff: string }[];
  notes: { title: string; desc: string }[];
}

const PROJECTS: ProjectDetail[] = [
  {
    idx: "01",
    year: "优惠券发行与履约",
    period: "个人项目实践",
    role: "Java 后端开发",
    title: "券流｜优惠券发行与履约引擎",
    tags: [
      "Java 17",
      "Spring Boot 3",
      "MyBatis-Plus",
      "MySQL",
      "Redis",
      "Redisson",
      "RocketMQ 5.x",
      "ShardingSphere",
      "EasyExcel",
      "XXL-Job"
    ],
    link: "https://github.com/BoosaIDonng/coupon-flow-platform",
    headline: "一份发券名单背后，是吞吐、库存与失败恢复的协同设计。",
    desc: "面向电商营销场景，串联商家模板管理、批量与定时发券、秒杀领取，以及预约提醒、锁定核销与退款。项目重点放在两条链路：大名单如何分批发得稳，并发领取如何尽早拦截无效请求。任务进度、消息状态与最终领券结果分别处理，让中断、重试和失败明细都有明确的落点。",
    flow: [
      {
        title: "任务触发",
        desc: "即时创建 / XXL-Job 调度"
      },
      {
        title: "流式解析",
        desc: "EasyExcel 逐行读取名单"
      },
      {
        title: "库存预扣",
        desc: "Redis Lua 校验并暂存"
      },
      {
        title: "批次投递",
        desc: "RocketMQ 解耦分发处理"
      },
      {
        title: "事务落库",
        desc: "MySQL 条件更新与唯一约束"
      }
    ],
    highlights: [
      {
        title: "批量分发",
        insight: "把大名单变成受控批次，减少逐条操作的往返开销。",
        desc: "使用 EasyExcel 流式读取 Excel，避免整份名单同时驻留内存。解析阶段通过 Lua 将库存预扣与待发用户写入 Redis Set 放在同一次执行中，累计到批次后发送分发消息，由消费者批量写入用户券记录；解析结束时补发完成标识，处理不足一批的尾部数据。",
        tradeoff: "流式读取解决内存占用，批处理减少网络与数据库调用，两者分别优化不同瓶颈。批次越大，单次事务与失败重试成本也越高，需要在吞吐和恢复成本之间取舍。"
      },
      {
        title: "续跑追踪",
        insight: "中断后有进度可循，失败后有原因可查。",
        desc: "以任务维度在 Redis 中保存已处理行号，重启解析时跳过已登记输入。将库存不足、重复领取等失败行号和原因记录下来，按任务批次生成错误明细。导出采用记录 ID 游标分批读取，避免 LIMIT 大偏移量反复扫描前面的记录。",
        tradeoff: "解析进度不代表发券已经落库。恢复点、消息消费状态和数据库结果需要分开判断，唯一索引与消费幂等共同处理重放；失败明细用于定位原因，并不自动等于补发。"
      },
      {
        title: "秒杀控制",
        insight: "缓存层尽早筛选，数据库保留最终写入约束。",
        desc: "将库存是否充足、用户是否超过限领次数放入 Redis Lua 原子执行，对无库存和超限请求直接返回。有效请求进入 RocketMQ 异步发券链路，数据库通过带库存条件的更新和用户券唯一索引处理扣减、重复领取等竞争场景。",
        tradeoff: "Lua 保证一次 Redis 执行的原子性，不能替代 Redis、消息队列与 MySQL 之间的状态协调。缓存负责前置拦截，数据库条件更新和唯一约束负责最终结果。"
      },
      {
        title: "消息幂等",
        insight: "重复消息要区分正在执行和已经完成，不能一律丢弃。",
        desc: "通过自定义注解、AOP 与 SpEL 生成业务幂等键，用 Redis 原子写入消费中标识。遇到正在处理的同键消息时抛出异常，让队列延迟重试；已完成的消息直接跳过。正常结束更新完成状态，业务异常则清理标识，配合过期时间释放异常占用。",
        tradeoff: "消费幂等用于控制重复执行，业务唯一索引仍要保留。状态过期后的重投、消费耗时和异常退出都需要纳入考虑，单个去重键并不构成端到端的恰好一次承诺。"
      },
      {
        title: "分库路由",
        insight: "围绕查询入口选择分片键，让分片真正服务于访问模式。",
        desc: "采用 ShardingSphere HashMod 方案，以 shop_number 组织优惠券模板数据。商家维度的查询显式携带店铺编号，使路由落到目标分片；用户券数据则围绕用户维度组织。分片设计结合常见查询条件考虑，避免仅按数据量拆表后再承担全路由查询。",
        tradeoff: "局部索引无法替代分片键。查询缺少路由条件时，分片内查询再快也可能需要访问多个节点；按店铺和用户组织数据，也意味着跨维度查询需要额外设计。"
      },
      {
        title: "缓存防护",
        insight: "把不存在的数据与热点失效分开处理。",
        desc: "模板查询组合布隆过滤器、空值缓存与 Redisson 分布式锁：过滤器先排除明确不存在的模板，空值缓存覆盖不存在记录及误判场景；热点缓存失效时，通过加锁与锁内二次检查减少并发回源。",
        tradeoff: "布隆过滤器可能误判存在，需要数据库和空值缓存继续确认；分布式锁只约束缓存重建路径，避免将所有正常命中请求也放进串行执行。"
      }
    ],
    notes: [
      {
        title: "可靠性的讨论，要落到具体状态。",
        desc: "这条链路最值得展开的是：任务解析到哪里、消息执行到哪里、用户最终拿到什么券。三类状态各有职责，排查和恢复才有依据。"
      },
      {
        title: "性能优化先找往返，再谈并发。",
        desc: "流式读取、Redis 批次暂存、数据库批量写入和游标导出，分别减少内存驻留、网络往返与无效扫描。更大的线程池并不天然意味着更快。"
      }
    ]
  },
  {
    idx: "02",
    year: "终端 AI 编程助手",
    period: "个人项目实践",
    role: "AI Agent 开发",
    title: "码序｜终端 AI 编程 Agent",
    tags: [
      "Agent Loop",
      "ReAct",
      "Function Calling",
      "MCP",
      "Skills",
      "JSONL",
      "Git Worktree"
    ],
    headline: "让模型调用工具之后，长任务、权限和协作才真正开始。",
    desc: "面向自然语言编程任务的终端助手，围绕模型决策、工具执行和结果反馈组织 Agent Loop。文件读取、搜索、编辑与命令执行提供基本行动能力；多模型适配、上下文管理、权限拦截与多 Agent 协作，进一步处理任务运行过程中遇到的协议差异、上下文膨胀和执行边界。",
    flow: [
      {
        title: "模型决策",
        desc: "理解目标并选择工具"
      },
      {
        title: "权限校验",
        desc: "规则、路径与人工确认"
      },
      {
        title: "工具执行",
        desc: "读取、编辑、搜索、命令"
      },
      {
        title: "反馈再规划",
        desc: "结果回写上下文并继续循环"
      }
    ],
    highlights: [
      {
        title: "安全拦截",
        insight: "执行权限由工具层落实，拒绝不能被另一条允许规则覆盖。",
        desc: "在工具真正运行前组合危险命令检测、路径范围校验、规则引擎、权限模式和人工确认。路径检查先解析符号链接得到真实路径，再判断是否越界；权限链采用拒绝优先，避免不同作用域的规则出现允许覆盖拒绝的冲突。",
        tradeoff: "字符串匹配无法覆盖所有命令组合，路径校验也属于应用层控制。多层检查的价值在于分别覆盖不同风险；进程级读写或网络隔离需要操作系统沙箱等独立机制。"
      },
      {
        title: "会话管理",
        insight: "摘要要节省上下文，也必须保住工具调用的配对边界。",
        desc: "先将过长工具输出落盘，在会话中保留摘要和文件引用；历史接近预算时再生成结构化摘要。会话通过 JSONL 持久化，并在恢复、压缩和用户中断后检查工具调用与结果是否配对，必要时退回最近的完整轮次，避免孤立调用导致下一轮请求失败。",
        tradeoff: "大结果落盘与历史摘要的损失程度不同，应先处理可回读的大输出。摘要请求本身同样消耗上下文预算，因此压缩触发点和空间不足时的退让策略也属于设计的一部分。"
      },
      {
        title: "协议归一",
        insight: "模型协议的差异留在客户端，Agent Loop 只消费统一事件。",
        desc: "Anthropic 以内容块组织流式响应，OpenAI 兼容协议中的多个工具调用增量可能交错到达。客户端按调用索引累计参数，在结束边界组装完整调用，并将文本增量、工具开始、参数片段与调用结束转换为统一事件，供上层循环和终端界面使用。",
        tradeoff: "适配层统一的是事件语义，模型特有能力仍需显式处理。工具参数在流式传输中通常是不完整 JSON，不能收到任意片段就解析执行；新增服务商应主要扩展解析器。"
      },
      {
        title: "并行协作",
        insight: "目录隔离解决文件干扰，消息类型解决任务误判。",
        desc: "每个子 Agent 使用独立 Git Worktree，文件邮箱负责异步传递任务与进度。Coordinator 拆分任务、分配工作并跟踪状态；通信中区分任务分配、进度更新和停止请求，让 Worker 依据消息类型响应，减少把其他 Agent 的状态描述当作新指令的情况。",
        tradeoff: "Worktree 分离工作目录，不能自动消除后续合并冲突，也不提供进程级安全隔离。适合拆分依赖较少的任务，最终结果仍需要合并与校验。"
      },
      {
        title: "工具按需",
        insight: "先让模型看到工具目录，需要时再支付完整定义的上下文成本。",
        desc: "MCP 工具先提供名称和简述，检索命中后再加入完整 Schema；客户端维护已发现工具集合，在后续请求中主动携带定义，适配缺少服务端工具引用展开能力的端点。Skills 同样采用元数据与指令正文分阶段加载，按任务引入所需规则和工具。",
        tradeoff: "按需加载减少初始上下文占用，但增加一次发现过程；工具被发现后仍占用后续请求预算。客户端管理定义，能减少对单一模型协议扩展的依赖。"
      }
    ],
    notes: [
      {
        title: "一个 Agent 的工程能力，体现在中断之后。",
        desc: "压缩、取消、断连与会话恢复都可能留下不完整状态。关注工具调用配对、输出引用和完整轮次，比只展示一次顺利的工具调用更能说明系统设计。"
      },
      {
        title: "把 AI 辅助开发落实为可解释的方案。",
        desc: "项目关注协议适配、上下文成本与权限边界这些可具体讨论的问题。工具辅助编码，技术选择仍需要结合约束说明原因，并通过运行结果判断是否成立。"
      }
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
    title: "Java 后端开发",
    desc: "围绕 Spring Boot、MyBatis-Plus 与 MySQL 完成业务接口、数据访问和前后端联调"
  },
  {
    icon: IconZap,
    title: "数据与异步",
    desc: "结合 Redis、RocketMQ 与定时任务处理缓存、批量分发、消费重试和业务幂等"
  },
  {
    icon: IconBot,
    title: "Agent 工程实践",
    desc: "围绕工具调用、上下文管理、权限控制与多 Agent 协作开展编程助手实践"
  }
];

const CONTACT_TAGS = [
  "Java",
  "Spring Boot",
  "MyBatis-Plus",
  "MySQL",
  "Redis",
  "RocketMQ",
  "Redisson",
  "ShardingSphere",
  "XXL-Job",
  "EasyExcel",
  "ReAct",
  "Function Calling",
  "MCP",
  "Skills",
  "Git Worktree",
  "Docker"
];

interface Honor {
  title: string;
  year: string;
  issuer: string;
  detail: string;
}
const HONORS: Honor[] = [
  {
    title: "软件设计与开发竞赛校级一等奖",
    year: "校级",
    issuer: "西安外事学院",
    detail: "软件设计与开发竞赛一等奖，体现工程实现与项目交付能力。"
  },
  {
    title: "学院程序设计竞赛一等奖",
    year: "学院",
    issuer: "计算机学院",
    detail: "程序设计竞赛一等奖，体现算法基础、编码能力与问题拆解能力。"
  },
  {
    title: "校园实践大赛（软件开发类）特等奖",
    year: "软件开发类",
    issuer: "西安外事学院",
    detail: "校园实践大赛软件开发类特等奖，体现项目实践与综合应用能力。"
  }
];

const PROFILE = {
  name: "杜泽民",
  intent: "求职方向：Java 后端开发｜AI 应用方向",
  bio: "专注 Java 后端开发，熟悉 Spring Boot、MyBatis-Plus、MySQL 与 Redis。通过券流和码序两个项目，实践异步任务、消息幂等、分库路由与 Agent 工程，关注代码实现、问题排查和方案取舍。",
  phone: "157-8078-5359",
  email: "354561650@qq.com",
  status: "随时到岗",
  edu: "本科",
  focus: "Java 后端 / AI Agent",
  school: "西安外事学院",
  major: "计算机科学与技术 · 本科",
  schoolPeriod: "2024—2026",
  location: "陕西"
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

.portfolio-nav--hero .glass-radio-group {
  background: rgba(255, 255, 255, 0.56);
  box-shadow:
    inset 1px 1px 2px rgba(255, 255, 255, 0.72),
    inset -1px -1px 2px rgba(0, 0, 0, 0.05),
    0 8px 24px rgba(0, 0, 0, 0.08);
}

.portfolio-nav--hero .glass-radio-item {
  color: rgba(18, 18, 18, 0.58);
}
.portfolio-nav--hero .glass-radio-item:hover { color: #111; }
.portfolio-nav--hero .glass-radio-item.is-active { color: #000; }

.portfolio-nav--hero .glass-glider {
  background: linear-gradient(135deg, rgba(255,255,255,0.98), rgba(242,242,238,0.9));
  box-shadow:
    0 8px 18px rgba(0, 0, 0, 0.1),
    inset 0 0 0 1px rgba(255, 255, 255, 0.75),
    inset 0 -2px 6px rgba(0, 0, 0, 0.04);
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
          ? "portfolio-nav--hero bg-white/[0.74] border-black/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]"
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
          className="text-xl font-black tracking-tight text-black transition-colors duration-500"
          aria-label={t("返回首页")}
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
          aria-label={t("主导航")}
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
            className="text-xs tracking-wider flex items-center gap-1.5 text-neutral-500 transition-colors duration-500"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {t("陕西 西安")}
          </span>
          <div className="flex items-center gap-2 text-xs">
            <span
              className={`transition-colors ${
                lang === "EN"
                  ? "text-black font-semibold"
                  : "text-neutral-400"
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
                  ? "text-black font-semibold"
                  : "text-neutral-400"
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
                ? "border-black/10 bg-white/[0.78] text-black"
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
          aria-label={t("主导航")}
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

      <div className="relative">
        <div className="grid md:grid-cols-[1fr_1.4fr] gap-7 md:gap-12">
          <div className="min-w-0">
            <div className="text-[11px] tracking-[0.2em] text-neutral-400">
              {t(data.period)} · {t(data.role)}
            </div>
            <h3 className="mt-4 text-balance text-2xl md:text-[28px] font-black text-black tracking-[-0.03em] leading-tight">
              {t(data.title)}
            </h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {data.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] tracking-wider px-2.5 py-1 rounded-full bg-black/[0.04] text-neutral-700 border border-black/5"
                >
                  {tag}
                </span>
              ))}
            </div>
            {data.link && (
              <a
                href={data.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-black underline underline-offset-4 hover:text-neutral-600"
              >
                {t("查看项目源码")} <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
          <div className="min-w-0">
            <div className="text-[11px] tracking-[0.2em] text-neutral-400">{t(data.year)}</div>
            <p className="mt-3 text-lg md:text-xl font-semibold leading-relaxed tracking-[-0.02em] text-black">
              {t(data.headline)}
            </p>
            <p className="mt-4 text-sm md:text-base text-neutral-600 leading-relaxed">
              {t(data.desc)}
            </p>
          </div>
        </div>

        <div className="mt-8 md:mt-10 rounded-2xl bg-neutral-50 border border-black/5 p-4 md:p-6">
          <h4 className="text-[11px] font-semibold tracking-[0.2em] text-neutral-500">{t("核心链路")}</h4>
          <ol className="mt-4 grid gap-3 sm:grid-cols-2 lg:flex">
            {data.flow.map((step, index) => (
              <li key={step.title} className="min-w-0 flex-1 rounded-xl bg-white border border-black/5 p-3.5">
                <span className="text-[10px] font-mono text-neutral-400">0{index + 1}</span>
                <div className="mt-1.5 text-sm font-semibold text-black">{t(step.title)}</div>
                <p className="mt-1 text-xs leading-relaxed text-neutral-500">{t(step.desc)}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-8 md:mt-10">
          <h4 className="text-base font-bold text-black">{t("方案拆解")}</h4>
          <p className="mt-2 text-xs md:text-sm leading-relaxed text-neutral-500">
            {t("先看核心链路，再展开感兴趣的技术细节。")}
          </p>
          <div className="mt-5 grid gap-3">
            {data.highlights.map((highlight, index) => (
              <details
                key={highlight.title}
                open={index === 0}
                className="group/detail rounded-2xl border border-black/10 bg-white open:border-black/20"
              >
                <summary className="flex cursor-pointer list-none items-start gap-3 p-4 md:p-5 rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black [&::-webkit-details-marker]:hidden">
                  <span className="mt-0.5 shrink-0 text-[11px] font-mono text-neutral-400">0{index + 1}</span>
                  <span className="min-w-0 flex-1">
                    <strong className="block text-sm md:text-base font-semibold text-black">{t(highlight.title)}</strong>
                    <span className="mt-1 block text-xs md:text-sm leading-relaxed text-neutral-500">{t(highlight.insight)}</span>
                  </span>
                  <span aria-hidden="true" className="shrink-0 text-xl leading-none text-neutral-500 transition-transform group-open/detail:rotate-45">+</span>
                </summary>
                <div className="border-t border-black/5 px-4 pb-5 pt-4 md:px-10 md:pb-6">
                  <p className="text-sm md:text-base leading-relaxed text-neutral-700">{t(highlight.desc)}</p>
                  <div className="mt-4 border-l-2 border-black/15 pl-4">
                    <h5 className="text-xs font-semibold text-black">{t("设计取舍")}</h5>
                    <p className="mt-1.5 text-xs md:text-sm leading-relaxed text-neutral-500">{t(highlight.tradeoff)}</p>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {data.notes.map((note) => (
            <div key={note.title} className="rounded-2xl bg-black/[0.035] p-5">
              <div className="text-[10px] tracking-[0.2em] text-neutral-400">{t("工程思考")}</div>
              <h4 className="mt-2 text-sm font-semibold leading-relaxed text-black">{t(note.title)}</h4>
              <p className="mt-2 text-xs md:text-sm leading-relaxed text-neutral-600">{t(note.desc)}</p>
            </div>
          ))}
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
              {t(data.year)}
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
              <p className="mt-5 text-sm leading-relaxed text-neutral-600">
                {t(PROFILE.bio)}
              </p>

              <dl className="mt-6 md:mt-8 grid grid-cols-2 gap-x-4 md:gap-x-6 gap-y-4 md:gap-y-5 text-sm">
                <ProfileItem label={t("电话")} value={PROFILE.phone} />
                <ProfileItem label={t("邮箱")} value={PROFILE.email} />
                <ProfileItem label={t("到岗状态")} value={t(PROFILE.status)} />
                <ProfileItem label={t("项目方向")} value={t(PROFILE.focus)} />
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
                  {t("学习计算机科学与技术相关课程，通过程序设计竞赛和个人项目积累编码经验，持续实践 Java 后端、数据库缓存、异步处理与 AI Agent 开发。")}
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
          <SectionTitle>{t("精选项目")}</SectionTitle>
          <p className="mt-5 max-w-2xl text-sm md:text-base leading-relaxed text-neutral-500">
            {t("从业务约束到技术选择，展开查看每个方案的实现思路与边界。")}
          </p>
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
              {t("以 Java 后端开发为主，关注接口设计、数据库缓存与异步任务处理，同时探索 AI Agent 工程。欢迎后端开发机会与项目交流，目前可随时到岗。")}
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
          <span>{t("© 2026 杜泽民. ALL RIGHTS RESERVED.")}</span>
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
          {t("希望加入重视工程实践的团队，围绕 Java 后端和 AI 应用，把接口、数据与任务流程做扎实。欢迎通过邮件或表单与我交流。")}
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
                  <div className="text-base text-black">{t("Java 后端开发｜AI 应用方向")}</div>
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
