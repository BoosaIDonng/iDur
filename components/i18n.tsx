"use client";

/**
 * 轻量国际化（中 / EN 双语）
 * - LangContext：跨组件共享语言状态
 * - TR 字典：中文原文 → 英文译文（命中即翻译，未命中原样返回）
 * - useT()：便捷 hook，返回 t(zh) 函数
 */

import { createContext, useContext, useState, type ReactNode } from "react";

export type Lang = "中" | "EN";

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (zh: string) => string;
}

const LangContext = createContext<LangCtx>({
  lang: "中",
  setLang: () => {},
  t: (zh) => zh
});

/** 中文原文到英文的映射表。L2 标准：导航 / 标题 / 技能 / 项目 / 荣誉 / 合作 / 联系 + 按钮 */
export const TR: Record<string, string> = {
  // 导航
  "首页": "Home",
  "关于": "About",
  "技能": "Skills",
  "项目": "Projects",
  "荣誉": "Honors",
  "合作": "Collab",
  "联系": "Contact",
  "陕西 西安": "Xi'an, Shaanxi",

  // 区块标题
  "关于我": "About",
  "专业技能": "Skills",
  "技能分类": "Skill Categories",
  "项目经历": "Projects",
  "荣誉证书": "Honors & Certificates",
  "与我合作": "Work With Me",
  "联系我": "Contact",

  // 关于我
  "个人档案": "PROFILE",
  "意向岗位：后端开发": "Target Role: Backend Developer",
  "求职方向：Java 后端开发": "Target Role: Java Backend Developer",
  "求职方向：JAVA / 全栈 / AI应用 / Agent开发": "Target Role: Java / Full Stack / AI Application / Agent Development",
  "电话": "Phone",
  "邮箱": "Email",
  "年龄": "Age",
  "性别": "Gender",
  "最高学历": "Education",
  "本科": "Bachelor",
  "23岁": "23",
  "男": "Male",
  "坐标": "Location",
  "计算机科学与技术 · 本科": "Computer Science and Technology · Bachelor",
  "教育经历": "EDUCATION",
  "在校期间系统学习计算机科学与技术相关课程，结合竞赛与项目实践积累了 Java 全栈、AI 应用、RAG 检索和 Agent 编排经验。":
    "Studied computer science and technology courses, and built experience in Java full-stack development, AI applications, RAG retrieval and Agent orchestration through competitions and project practice.",

  // 技能卡 · 标题 & 描述
  "Java 核心": "Java Core",
  "基础语法、面向对象与编码习惯": "Syntax, OOP basics and coding habits.",
  "基础语法、多线程基础与工程编码习惯": "Syntax, multithreading basics and engineering habits.",
  "Java 17/21、并发编程与 JVM 基础": "Java 17/21, concurrent programming and JVM basics.",
  "后端框架 & 数据": "Backend Framework & Data",
  "Spring Boot + MySQL / Redis 基础应用": "Basic use of Spring Boot, MySQL and Redis.",
  "Spring 生态 & 数据库": "Spring Ecosystem & Database",
  "Spring Boot、MyBatis、MySQL 与 SQL 排查": "Spring Boot, MyBatis, MySQL and SQL diagnostics.",
  "后端工程 & 中间件": "Backend Engineering & Middleware",
  "Spring 生态、数据库、缓存与消息队列": "Spring ecosystem, databases, cache and message queues.",
  "工程 & AI 能力": "Engineering & AI",
  "工具链、测试与 AI 辅助开发": "Toolchain, testing and AI-assisted development.",
  "缓存中间件 & 工具": "Cache Middleware & Tools",
  "Redis、Redisson、测试工具与部署环境": "Redis, Redisson, testing tools and runtime environment.",
  "AI 应用 & Agent": "AI Applications & Agents",
  "RAG、MCP、多 Agent 与 AI 工具链": "RAG, MCP, multi-Agent systems and AI toolchains.",

  // 技能卡 · stats 标签
  "年学习经验": "Years of study",
  "求职方向": "Target role",
  "学习实践项目": "Practice projects",
  "后端框架": "Backend frameworks",
  "基础增删改查": "Basic CRUD",
  "SQL 排查": "SQL diagnostics",
  "登录认证": "Login auth",
  "开发工具": "Dev tools",
  "接口测试工具": "API test tools",
  "辅助开发": "AI assisted",
  "缓存应用": "Cache usage",
  "基础压测": "Basic load testing",
  "运行环境": "Runtime environment",
  "Java 版本": "Java versions",
  "运行机制": "Runtime mechanics",
  "基础算法": "Basic algorithms",
  "服务框架": "Service frameworks",
  "性能优化": "Performance optimization",
  "异步解耦": "Async decoupling",
  "检索增强": "Retrieval augmentation",
  "工具调用": "Tool calling",
  "流程编排": "Workflow orchestration",

  // 技能卡 · items
  "Java 基础语法 / 集合 / 异常处理": "Java syntax, collections and exception handling",
  "Java 核心语法 / 集合 / IO 流": "Java core syntax, collections and IO streams",
  "多线程基础 / 线程池 / 常用设计模式": "Multithreading basics, thread pools and common design patterns",
  "多线程 / 并发编程 / 线程池": "Multithreading, concurrent programming and thread pools",
  "JVM 原理与 GC 算法": "JVM principles and GC algorithms",
  "Python 常见语法": "Common Python syntax",
  "代码阅读能力与编码习惯": "Code reading ability and coding habits",
  "基础业务模块开发与接口联调": "Basic business module development and API integration",
  "面向对象基础知识": "Object-oriented programming basics",
  "良好的编码能力和编码习惯": "Solid coding ability and habits",
  "简单业务接口开发": "Simple business API development",
  "Spring Boot / Spring MVC 基本使用": "Basic use of Spring Boot / Spring MVC",
  "Spring / Spring Boot / MyBatis 开发流程": "Spring, Spring Boot and MyBatis development workflow",
  "SpringBoot / MyBatis / MyBatis-Plus": "SpringBoot / MyBatis / MyBatis-Plus",
  "SpringCloudAlibaba 基础使用": "Basic SpringCloudAlibaba usage",
  "IoC / AOP 基本原理": "Basic principles of IoC and AOP",
  "MyBatis / MyBatis-Plus 接口开发": "API development with MyBatis / MyBatis-Plus",
  "MySQL 增删改查 / 表结构 / 索引 / 事务": "MySQL CRUD, table design, indexes and transactions",
  "MySQL 增删改查 / 联表查询 / 基础 SQL 优化": "MySQL CRUD, joins and basic SQL optimization",
  "MySQL 性能优化 / Redis 原理与缓存方案": "MySQL performance optimization, Redis principles and cache strategies",
  "RabbitMQ / ElasticSearch 使用与常见方案": "RabbitMQ / ElasticSearch usage and common solutions",
  "FastAPI / Flask 基础开发": "Basic development with FastAPI / Flask",
  "Explain / 慢 SQL 日志辅助定位问题": "Use Explain and slow SQL logs to locate issues",
  "JWT 登录认证与 Token 续约": "JWT login authentication and token renewal",
  "Redis 验证码 / 登录信息 / 常用数据缓存": "Redis for verification codes, login data and simple caching",
  "Redis 常用数据结构与缓存使用方式": "Common Redis data structures and cache usage",
  "缓存穿透 / 击穿 / 雪崩常见问题": "Common cache penetration, breakdown and avalanche issues",
  "Redisson 分布式锁基础使用场景": "Basic Redisson distributed lock scenarios",
  "RESTful 接口 / GET / POST": "RESTful APIs / GET / POST",
  "IDEA / Maven / Git 项目运行与依赖管理": "IDEA / Maven / Git for project running and dependency management",
  "Postman 接口测试": "Postman API testing",
  "Postman / JMeter 接口测试与基础压测": "Postman and JMeter API testing and basic load testing",
  "Git / IntelliJ IDEA / Nginx / MySQL": "Git / IntelliJ IDEA / Nginx / MySQL",
  "日志与断点调试基础问题": "Basic troubleshooting with logs and breakpoints",
  "DeepSeek / ChatGPT 辅助开发": "DeepSeek / ChatGPT assisted development",
  "LangChain4j / LangChain / RAG / Function Calling": "LangChain4j / LangChain / RAG / Function Calling",
  "Milvus / Chroma 向量库与混合检索": "Milvus / Chroma vector databases and hybrid retrieval",
  "Prompt / Skills / MCP / Dify / Coze / LangGraph": "Prompt / Skills / MCP / Dify / Coze / LangGraph",
  "ReAct / Plan-Execute-Replan 多 Agent 架构": "ReAct / Plan-Execute-Replan multi-Agent architecture",
  "Linux / Docker / Arthas / ELK / SkyWalking": "Linux / Docker / Arthas / ELK / SkyWalking",

  // 熟练度
  "掌握": "Solid",
  "熟悉": "Familiar",
  "了解": "Familiar",
  "能够": "Able",

  // 展开/收起
  "收起 −": "Collapse −",
  "展开 +": "Expand +",

  // 项目
  "后端开发": "Backend Dev",
  "后端开发学习实践": "Backend Dev Practice",
  "AI 应用开发": "AI Application Development",
  "Agent 开发": "Agent Development",
  "项目实践": "Project Practice",
  "Mall 商城": "Mall E-commerce Platform",
  "B2C 电商系统，覆盖商品、订单、会员、营销及运营管理等核心业务，支持 Docker 容器化部署，并接入大模型完成商品咨询、订单查询和售后问答。":
    "A B2C e-commerce system covering products, orders, members, marketing and operations management. It supports Docker deployment and integrates LLM capabilities for product consultation, order lookup and after-sales Q&A.",
  "利用 Redis Lua 脚本实现秒杀库存原子扣减，结合分布式锁与 MQ 异步解耦保证数据一致性。":
    "Used Redis Lua scripts for atomic stock deduction in flash-sale scenarios, combined with distributed locks and MQ async decoupling for data consistency.",
  "设计缓存穿透、击穿防护策略，通过缓存空对象、互斥锁和逻辑过期降低数据库请求压力。":
    "Designed cache penetration and breakdown protection using empty-object caching, mutex locks and logical expiration to reduce database pressure.",
  "采用 Gateway + Sentinel 实现限流、熔断与降级策略，支撑高并发访问场景。":
    "Used Gateway and Sentinel to implement rate limiting, circuit breaking and fallback strategies for high-concurrency access.",
  "负责 ElasticSearch 商品与攻略索引建模、查询性能优化及基于用户行为的智能推荐。":
    "Handled ElasticSearch index modeling for products and guides, query performance optimization and behavior-based intelligent recommendation.",
  "基于 DashScope 接入通义千问，结合 Chroma 实现商品咨询、订单查询和售后问题自动解答。":
    "Integrated Qwen through DashScope and used Chroma for automated product consultation, order lookup and after-sales Q&A.",
  "智旅云图": "Smart Travel Map",
  "旅游助手系统，用于解决旅游信息零散、行程规划繁琐问题，支持个性化智能行程生成与文旅信息问答服务。":
    "A travel assistant system for fragmented travel information and complex itinerary planning, supporting personalized itinerary generation and travel Q&A.",
  "基于通义千问与高德 MCP 自研 MCP-Service 工具基座，参与多角色协同旅游规划 Agent 系统设计。":
    "Designed a multi-role collaborative travel planning Agent system based on Qwen and an Amap MCP-Service tool foundation.",
  "基于 FastAPI 与 LangGraph 搭建多 Agent 工作流，实现景点、天气、酒店等 Agent 协同调度。":
    "Built a multi-Agent workflow with FastAPI and LangGraph to coordinate attraction, weather and hotel Agents.",
  "设计 Agent 检索纠错与工具重试机制，结合 RAG 进行结果校验与补全。":
    "Designed Agent retrieval correction and tool retry mechanisms, using RAG for result validation and completion.",
  "采用 SimHash、MinHash、TF-IDF 组合去重策略处理旅游知识库文本数据。":
    "Processed travel knowledge-base text with a SimHash, MinHash and TF-IDF deduplication strategy.",
  "结合 BM25、BGE-M3 混合检索、RRF 融合与 Rerank 精排，优化问答匹配效率。":
    "Improved Q&A matching with BM25, BGE-M3 hybrid retrieval, RRF fusion and Rerank refinement.",
  // 荣誉
  "证书": "CERTIFICATE",
  "颁发单位": "ISSUER",
  "计算机二级证书": "NCRE Level-2 Certificate",
  "软件设计与开发竞赛校级一等奖": "First Prize, Software Design and Development Competition",
  "学院程序设计竞赛一等奖": "First Prize, College Programming Competition",
  "校园实践大赛一等奖": "First Prize, Campus Practice Competition",
  "蓝桥杯一等奖": "First Prize, Lanqiao Cup",
  "校级": "University Level",
  "学院": "College Level",
  "软件开发类": "Software Development",
  "竞赛": "Competition",
  "蓝桥杯大赛组委会": "Lanqiao Cup Organizing Committee",
  "软件设计与开发竞赛一等奖，体现工程实现与项目交付能力。":
    "First prize in the software design and development competition, demonstrating engineering implementation and project delivery ability.",
  "程序设计竞赛一等奖，体现算法基础、编码能力与问题拆解能力。":
    "First prize in the programming competition, demonstrating algorithm basics, coding ability and problem decomposition.",
  "校园实践大赛软件开发类一等奖，体现项目实践与综合应用能力。":
    "First prize in the software development category of the campus practice competition, demonstrating project practice and applied engineering ability.",
  "蓝桥杯一等奖，体现程序设计基础与竞赛实践能力。":
    "First prize in the Lanqiao Cup, demonstrating programming fundamentals and competition practice.",
  "校级三好学生": "Outstanding Student (University)",
  "项目实战奖": "Project Practice Award",
  "教育部考试中心": "Ministry of Education Testing Center",
  "西安外事学院": "Xi'an International University",
  "计算机学院": "School of Computer Science",
  "全国计算机等级考试 Level 2，掌握基础编程与办公软件应用能力。":
    "NCRE Level 2 — demonstrated basic programming and office software skills.",
  "综合素质评价优秀，学业、品行与实践表现突出。":
    "Awarded for outstanding comprehensive performance in academics, conduct and practice.",
  "在多门实训课程中完成后端项目实战，获教师与同学好评。":
    "Completed backend project assignments across multiple practical courses with positive recognition.",

  // 合作
  "专注 Java 后端开发，熟悉 Spring Boot 生态与 MySQL / Redis 落地，擅长结合 AI 工具提升开发效率。欢迎校招机会与项目沟通。":
    "Focused on Java backend development with solid experience in Spring Boot, MySQL and Redis. Skilled at leveraging AI tooling for efficiency. Open to campus recruitment opportunities and project discussions.",
  "掌握 Java 后端开发基础，了解 Spring Boot、MyBatis、MySQL 等常用技术，能够从基础功能做起，持续提升代码能力与业务理解能力。欢迎校招机会与项目沟通。":
    "I have a foundation in Java backend development, understand common technologies such as Spring Boot, MyBatis and MySQL, and am ready to start from basic features while improving coding ability and business understanding. Open to campus recruitment opportunities and project discussions.",
  "希望从事 Java 后端开发岗位，参与过基础业务模块开发、接口联调、测试与问题排查，能够在项目中持续学习并配合完成开发任务。":
    "Seeking a Java backend development role. I have participated in basic business module development, API integration, testing and troubleshooting, and can keep learning while supporting delivery in real projects.",
  "面向 JAVA 全栈、AI 应用与 Agent 开发方向，能够围绕 Spring 生态、数据库缓存、消息队列、大模型应用和多 Agent 工作流参与项目建设。":
    "Focused on Java full-stack, AI application and Agent development, with the ability to contribute around the Spring ecosystem, databases, caching, message queues, LLM applications and multi-Agent workflows.",
  "后端接口开发": "Backend API Development",
  "能够按照 Controller、Service、Mapper 分层完成简单业务接口开发":
    "Able to build simple business APIs following the Controller, Service and Mapper layered structure.",
  "能够参与登录认证、商品、订单、预约等基础业务模块的接口开发与联调":
    "Able to participate in API development and integration for basic modules such as login authentication, products, orders and appointments.",
  "数据库与缓存": "Database & Cache",
  "能够完成 MySQL 基础增删改查、条件查询、分页查询与 Redis 简单缓存":
    "Able to complete basic MySQL CRUD, conditional queries, pagination and simple Redis caching.",
  "数据库与性能排查": "Database & Performance Diagnostics",
  "能够使用 MySQL、Explain、慢 SQL 日志定位部分查询问题并理解常见索引优化方式":
    "Able to use MySQL, Explain and slow SQL logs to locate selected query issues and understand common index optimization methods.",
  "AI 辅助开发": "AI-Assisted Dev",
  "能够合理使用 DeepSeek、ChatGPT 辅助代码编写、问题排查及技术方案梳理":
    "Able to use DeepSeek and ChatGPT reasonably for coding, troubleshooting and technical solution organization.",
  "测试与问题定位": "Testing & Troubleshooting",
  "能够使用 Postman、JMeter、日志分析和断点调试配合完成接口测试与问题排查":
    "Able to use Postman, JMeter, log analysis and breakpoint debugging for API testing and troubleshooting.",
  "Java 全栈开发": "Java Full-Stack Development",
  "能够围绕 Spring 生态完成后端接口、数据访问、缓存中间件与部分前端页面联调":
    "Able to build around the Spring ecosystem, covering backend APIs, data access, cache middleware and selected frontend integration.",
  "AI 应用落地": "AI Application Delivery",
  "能够结合大模型、向量库、RAG 与 Function Calling 构建业务问答和智能推荐能力":
    "Able to combine LLMs, vector databases, RAG and Function Calling to build business Q&A and intelligent recommendation capabilities.",
  "Agent 工作流": "Agent Workflows",
  "能够基于 LangGraph、MCP 与多 Agent 架构完成工具调用、任务编排和结果校验":
    "Able to use LangGraph, MCP and multi-Agent architectures for tool calling, task orchestration and result validation.",

  // 联系
  "期待与志同道合的团队一起，把每一行代码写扎实，做长期有价值的后端工程。":
    "Looking forward to joining a like-minded team to write solid code and build long-term backend engineering value.",
  "希望在实际工作中积累项目经验，提高代码能力和业务理解能力，持续提升后端开发能力。":
    "I hope to gain project experience in real work, improve coding ability and business understanding, and continue growing as a backend developer.",
  "期待在真实业务中继续积累后端开发经验，扎实完成接口开发、联调测试与问题排查。":
    "Looking to keep building backend development experience in real business scenarios through solid API development, integration testing and troubleshooting.",
  "期待围绕 Java 全栈、AI 应用和 Agent 工作流继续做有交付价值的项目，把后端工程能力和大模型应用能力结合起来。":
    "Looking forward to building deliverable projects around Java full-stack development, AI applications and Agent workflows, combining backend engineering with LLM application capability.",
  "意向岗位": "Target Role",
  "后端开发工程师": "Backend Developer",
  "Java 后端开发": "Java Backend Development",
  "JAVA / 全栈 / AI应用 / Agent开发": "Java / Full Stack / AI Application / Agent Development",
  "技能关键词": "Skill Keywords",
  "更多联系方式": "Other Channels",
  "微信、QQ 等渠道可在邮件 / 表单沟通后进一步交换。":
    "WeChat / QQ can be shared after initial contact via email or the form.",
  "快速联系": "Quick Contact",

  // 表单
  "您的姓名": "Your name",
  "邮箱地址": "Email address",
  "留言内容": "Your message",
  "请输入你的姓名。": "Please enter your name.",
  "请输入邮箱地址。": "Please enter your email address.",
  "请输入有效的邮箱地址。": "Please enter a valid email address.",
  "请输入留言内容。": "Please enter your message.",
  "发送": "Send",
  "发送中...": "Sending...",
  "发送失败": "Failed",
  "发送消息": "Send message",
  "消息已送达，我会尽快回复你。": "Message delivered. I'll get back to you soon.",
  "发送失败，请稍后再试或直接发送邮件。": "Failed to send. Please retry or email me directly.",
  "已发送": "Sent",

  // 页脚
  "© 2026 LEO. ALL RIGHTS RESERVED.": "© 2026 LEO. ALL RIGHTS RESERVED.",
  "Designed & Built with 黑白高级感": "Designed & Built with Monochrome Elegance"
};

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("中");
  const t = (zh: string) => (lang === "EN" ? TR[zh] ?? zh : zh);
  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
