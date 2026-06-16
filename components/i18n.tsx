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
  "电话": "Phone",
  "邮箱": "Email",
  "年龄": "Age",
  "性别": "Gender",
  "最高学历": "Education",
  "本科": "Bachelor",
  "23岁": "23",
  "男": "Male",
  "坐标": "Location",
  "计算机科学与技术 · 专业排名：前14%": "Computer Science and Technology · Top 14% in major",
  "计算机科学与技术 · 本科 · 专业排名：前10%": "Computer Science and Technology · Bachelor · Top 10% in major",
  "教育经历": "EDUCATION",
  "在校期间系统学习 Java、数据库、Web 后端开发等课程，专业排名前14%。通过两个后端学习实践项目，积累了接口开发、数据库增删改查、Redis 简单缓存、登录认证与接口测试经验。":
    "Studied Java, databases and web backend development, ranking in the top 14% of the major. Through two backend practice projects, gained experience in API development, database CRUD, simple Redis caching, login authentication and API testing.",
  "在校期间系统学习 Java、数据库、Web 后端开发等课程，专业排名前10%。通过项目实践积累了业务模块开发、接口联调、测试与问题排查经验。":
    "Studied Java, databases and web backend development, ranking in the top 10% of the major. Built practical experience in business module development, API integration, testing and troubleshooting.",

  // 技能卡 · 标题 & 描述
  "Java 核心": "Java Core",
  "基础语法、面向对象与编码习惯": "Syntax, OOP basics and coding habits.",
  "基础语法、多线程基础与工程编码习惯": "Syntax, multithreading basics and engineering habits.",
  "后端框架 & 数据": "Backend Framework & Data",
  "Spring Boot + MySQL / Redis 基础应用": "Basic use of Spring Boot, MySQL and Redis.",
  "Spring 生态 & 数据库": "Spring Ecosystem & Database",
  "Spring Boot、MyBatis、MySQL 与 SQL 排查": "Spring Boot, MyBatis, MySQL and SQL diagnostics.",
  "工程 & AI 能力": "Engineering & AI",
  "工具链、测试与 AI 辅助开发": "Toolchain, testing and AI-assisted development.",
  "缓存中间件 & 工具": "Cache Middleware & Tools",
  "Redis、Redisson、测试工具与部署环境": "Redis, Redisson, testing tools and runtime environment.",

  // 技能卡 · stats 标签
  "年学习经验": "Years of study",
  "求职方向": "Target role",
  "专业排名": "Major rank",
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

  // 技能卡 · items
  "Java 基础语法 / 集合 / 异常处理": "Java syntax, collections and exception handling",
  "多线程基础 / 线程池 / 常用设计模式": "Multithreading basics, thread pools and common design patterns",
  "代码阅读能力与编码习惯": "Code reading ability and coding habits",
  "基础业务模块开发与接口联调": "Basic business module development and API integration",
  "面向对象基础知识": "Object-oriented programming basics",
  "良好的编码能力和编码习惯": "Solid coding ability and habits",
  "简单业务接口开发": "Simple business API development",
  "Spring Boot / Spring MVC 基本使用": "Basic use of Spring Boot / Spring MVC",
  "Spring / Spring Boot / MyBatis 开发流程": "Spring, Spring Boot and MyBatis development workflow",
  "IoC / AOP 基本原理": "Basic principles of IoC and AOP",
  "MyBatis / MyBatis-Plus 接口开发": "API development with MyBatis / MyBatis-Plus",
  "MySQL 增删改查 / 表结构 / 索引 / 事务": "MySQL CRUD, table design, indexes and transactions",
  "MySQL 增删改查 / 联表查询 / 基础 SQL 优化": "MySQL CRUD, joins and basic SQL optimization",
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
  "智享生活平台": "Zhixiang Life Platform",
  "项目包含后台管理端和用户端，支持商品管理、订单处理、优惠券发放、菜品浏览、下单、支付等功能。":
    "A platform with admin and user sides, supporting product management, order handling, coupon distribution, dish browsing, ordering and payment.",
  "参与登录认证、商品管理、购物车、下单等模块的后端接口开发。":
    "Participated in backend API development for login authentication, product management, shopping cart and ordering modules.",
  "基于 JWT 完成登录认证和 Token 续约；在项目中接触 AES 加密、接口限流等安全处理方式。":
    "Implemented JWT-based login authentication and token renewal; worked with security approaches such as AES encryption and API rate limiting.",
  "使用 Spring Task 实现超时订单自动关闭，使用 WebSocket 完成来单提醒等消息推送功能。":
    "Used Spring Task to automatically close timed-out orders and WebSocket for incoming-order notifications.",
  "结合慢 SQL 日志和 Explain 排查部分查询性能问题，了解联合索引、覆盖索引等常见优化方式。":
    "Used slow SQL logs and Explain to diagnose selected query performance issues, learning common optimizations such as composite and covering indexes.",
  "参与接口测试、异常处理和问题排查，配合 Spring AOP 统一返回错误码。":
    "Participated in API testing, exception handling and troubleshooting, and worked with Spring AOP for unified error codes.",
  "星评服务系统项目": "Star Review Service Project",
  "该项目是一个点评类服务系统，主要包括用户登录、商户信息展示、笔记发布、点赞、关注等功能。用户可以查看商户信息，发布笔记内容，并对内容进行点赞和关注操作。":
    "A review service system covering user login, merchant information display, note publishing, likes and follow actions. Users can view merchants, publish notes, and like or follow content.",
  "参与用户登录、商户查询、笔记发布、点赞关注等基础接口开发。":
    "Participated in basic API development for user login, merchant lookup, note publishing, likes and follow actions.",
  "使用 Spring Boot 编写后端接口，使用 MyBatis 操作 MySQL 数据库。":
    "Built backend APIs with Spring Boot and operated MySQL through MyBatis.",
  "完成用户表、商户表、笔记表、点赞表等相关数据的基础增删改查。":
    "Completed basic CRUD for user, merchant, note and like tables.",
  "使用 Redis 存储验证码、登录用户信息等简单数据。":
    "Used Redis to store simple data such as verification codes and logged-in user information.",
  "完成笔记发布、笔记列表查询、点赞笔记、关注用户等功能。":
    "Completed note publishing, note list querying, note liking and user follow features.",
  "使用 Postman 进行接口测试，对空指针、参数错误、SQL 错误等常见问题进行排查和修改。":
    "Used Postman for API testing and fixed common issues such as null pointers, parameter errors and SQL errors.",

  "租满意租房平台": "ZuManYi Rental Platform",
  "项目面向租房场景，提供房源搜索、在线预约等用户功能，并支持后台房源管理、订单处理和用户管理。":
    "A rental platform for housing scenarios, providing listing search and online appointments for users, with admin support for listing, order and user management.",
  "参与公寓信息管理、用户管理、租赁信息管理，以及找房信息、公寓详情、预约等模块开发。":
    "Participated in modules for apartment information management, user management, lease information, listing search, apartment details and appointments.",
  "基于 JWT 完成登录认证功能，了解敏感数据处理和接口限流的基本思路。":
    "Implemented JWT-based login authentication and learned basic approaches for sensitive data handling and API rate limiting.",
  "使用 MyBatis-Plus QueryWrapper 构建动态 SQL，结合 Spring 事务完成基础业务逻辑开发。":
    "Used MyBatis-Plus QueryWrapper to build dynamic SQL and Spring transactions for basic business logic.",
  "使用 Explain 与索引优化方式排查房源统计、报表查询中的部分性能问题。":
    "Used Explain and index optimization methods to diagnose selected performance issues in listing statistics and report queries.",
  "了解 Redisson 在接口幂等、防止重复预约场景中的基本使用方式。":
    "Learned basic Redisson usage in API idempotency and duplicate appointment prevention scenarios.",
  "使用 Postman、JMeter 进行接口测试和基础压测，通过日志分析、断点调试协助定位问题。":
    "Used Postman and JMeter for API testing and basic load testing, locating issues through log analysis and breakpoint debugging.",
  "该项目是一个房屋租赁类平台，主要包括用户端和后台管理端。用户端支持房源浏览、公寓详情查看、预约申请；后台管理端支持房源、公寓、用户、预约信息等基础管理功能。":
    "A rental platform with user and admin sides. The user side supports listing browsing, apartment details and appointment requests; the admin side supports basic management of listings, apartments, users and appointments.",
  "参与房源信息、公寓信息、预约信息等模块的后端接口开发。":
    "Participated in backend API development for listing, apartment and appointment modules.",
  "使用 Spring Boot 搭建基础后端服务，按照 Controller、Service、Mapper 分层结构完成代码编写。":
    "Built basic backend services with Spring Boot and followed the Controller, Service and Mapper layered structure.",
  "使用 MyBatis-Plus 完成数据库增删改查、条件查询和分页查询。":
    "Used MyBatis-Plus for CRUD, conditional queries and pagination.",
  "根据业务需求维护部分数据表，如用户表、房源表、预约表等。":
    "Maintained selected data tables such as users, listings and appointments according to business needs.",
  "使用 JWT 实现简单用户登录认证流程，完成登录后返回 token 的基础功能。":
    "Implemented a simple JWT login authentication flow and returned a token after login.",
  "使用 Redis 缓存部分常用数据，如房源分类、登录信息等。":
    "Used Redis to cache common data such as listing categories and login information.",
  "使用 Postman 测试接口，通过日志和断点调试排查并修改基础问题。":
    "Tested APIs with Postman and used logs and breakpoints to locate and fix basic issues.",

  // 荣誉
  "证书": "CERTIFICATE",
  "颁发单位": "ISSUER",
  "计算机二级证书": "NCRE Level-2 Certificate",
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
  "专注 Java 后端开发，熟悉 Spring Boot 生态与 MySQL / Redis 落地，擅长结合 AI 工具提升开发效率。欢迎实习、校招机会与合作沟通。":
    "Focused on Java backend development with solid experience in Spring Boot, MySQL and Redis. Skilled at leveraging AI tooling for efficiency. Open to internships, new-grad offers and collaborations.",
  "掌握 Java 后端开发基础，了解 Spring Boot、MyBatis、MySQL 等常用技术，能够从基础功能做起，持续提升代码能力与业务理解能力。欢迎实习、校招机会与合作沟通。":
    "I have a foundation in Java backend development, understand common technologies such as Spring Boot, MyBatis and MySQL, and am ready to start from basic features while improving coding ability and business understanding. Open to internships, campus recruiting opportunities and collaboration.",
  "希望从事 Java 后端开发岗位，参与过基础业务模块开发、接口联调、测试与问题排查，能够在项目中持续学习并配合完成开发任务。":
    "Seeking a Java backend development role. I have participated in basic business module development, API integration, testing and troubleshooting, and can keep learning while supporting delivery in real projects.",
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

  // 联系
  "期待与志同道合的团队一起，把每一行代码写扎实，做长期有价值的后端工程。":
    "Looking forward to joining a like-minded team to write solid code and build long-term backend engineering value.",
  "希望在实际工作中积累项目经验，提高代码能力和业务理解能力，持续提升后端开发能力。":
    "I hope to gain project experience in real work, improve coding ability and business understanding, and continue growing as a backend developer.",
  "期待在真实业务中继续积累后端开发经验，扎实完成接口开发、联调测试与问题排查。":
    "Looking to keep building backend development experience in real business scenarios through solid API development, integration testing and troubleshooting.",
  "意向岗位": "Target Role",
  "后端开发工程师": "Backend Developer",
  "Java 后端开发": "Java Backend Development",
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
