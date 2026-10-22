"use client";

/**
 * Lightweight Chinese / English translations for the portfolio.
 * Missing keys fall back to the original content.
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

export const TR: Record<string, string> = {
  // Navigation and section headings
  "首页": "Home",
  "关于": "About",
  "技能": "Skills",
  "项目": "Projects",
  "荣誉": "Honors",
  "合作": "Collab",
  "联系": "Contact",
  "返回首页": "Back to home",
  "主导航": "Main navigation",
  "陕西 西安": "Xi'an, Shaanxi",
  "陕西": "Shaanxi",
  "关于我": "About",
  "专业技能": "Skills",
  "技能分类": "Skill Categories",
  "项目经历": "Projects",
  "荣誉证书": "Honors & Certificates",
  "与我合作": "Work With Me",
  "联系我": "Contact",

  // Profile
  "个人档案": "PROFILE",
  "求职方向：Java 后端开发｜AI 应用方向": "Target Role: Java Backend / AI Applications",
  "Java 后端开发｜AI 应用方向": "Java Backend / AI Applications",
  "Java 后端开发 ｜ AI 应用与 Agent 工程实践": "Java Backend Development / AI Applications & Agents",
  "专注 Java 后端开发，熟悉 Spring Boot、MyBatis-Plus、MySQL 与 Redis。通过券流和码序两个项目，实践异步任务、消息幂等、分库路由与 Agent 工程，关注代码实现、问题排查和方案取舍。":
    "I focus on Java backend development with Spring Boot, MyBatis-Plus, MySQL and Redis. My CouponFlow and MaXu projects explore asynchronous tasks, message idempotency, database sharding and Agent engineering, with an emphasis on implementation, troubleshooting and design trade-offs.",
  "电话": "Phone",
  "邮箱": "Email",
  "到岗状态": "Availability",
  "随时到岗": "Available immediately",
  "项目方向": "Project Focus",
  "Java 后端 / AI Agent": "Java Backend / AI Agents",
  "最高学历": "Education",
  "本科": "Bachelor's Degree",
  "坐标": "Location",
  "教育经历": "EDUCATION",
  "西安外事学院": "Xi'an International University",
  "计算机学院": "School of Computer Science",
  "计算机科学与技术 · 本科": "Computer Science and Technology · Bachelor's Degree",
  "学习计算机科学与技术相关课程，通过程序设计竞赛和个人项目积累编码经验，持续实践 Java 后端、数据库缓存、异步处理与 AI Agent 开发。":
    "Studied computer science and gained coding experience through programming competitions and personal projects, focusing on Java backend development, databases, caching, asynchronous processing and AI Agents.",

  // Skill categories and labels
  "Java 核心": "Java Core",
  "Java 17/21、集合与并发基础、工程实践": "Java 17/21, collections, concurrency basics and engineering practice.",
  "后端工程 & 中间件": "Backend Engineering & Middleware",
  "Spring 生态、数据库、缓存与消息队列": "Spring ecosystem, databases, caching and message queues.",
  "AI 应用 & Agent": "AI Applications & Agents",
  "编程 Agent、工具调用与 AI 辅助开发": "Coding Agents, tool calling and AI-assisted development.",
  "Java 版本": "Java Versions",
  "核心基础": "Core APIs",
  "工程实践": "Engineering",
  "服务框架": "Frameworks",
  "性能优化": "SQL Optimization",
  "异步解耦": "Async Messaging",
  "任务循环": "Agent Loop",
  "工具调用": "Tool Calling",
  "协作编排": "Coordination",
  "Java 常用语法与核心 API": "Java syntax and core APIs",
  "集合框架 / I/O / 面向对象": "Collections / I/O / object-oriented programming",
  "多线程 / 线程池 / 并发编程基础": "Multithreading / thread pools / concurrency basics",
  "Python 基础语法": "Python syntax basics",
  "IntelliJ IDEA / Maven / Git / JMeter / ApiPost": "IntelliJ IDEA / Maven / Git / JMeter / ApiPost",
  "Linux / Docker 基础部署与日志排查": "Linux / Docker deployment and log diagnostics",
  "Spring Boot / MyBatis / MyBatis-Plus": "Spring Boot / MyBatis / MyBatis-Plus",
  "Spring Cloud / Spring Cloud Alibaba 常用组件": "Common Spring Cloud / Spring Cloud Alibaba components",
  "MySQL / EXPLAIN / 基础 SQL 优化": "MySQL / EXPLAIN / basic SQL optimization",
  "Redis 缓存 / 持久化 / 内存淘汰 / 分布式锁": "Redis caching / persistence / eviction / distributed locks",
  "RocketMQ / RabbitMQ / 异步解耦与消费幂等": "RocketMQ / RabbitMQ / async processing and consumer idempotency",
  "XXL-Job 定时任务 / ShardingSphere 分库分表": "XXL-Job scheduling / ShardingSphere database sharding",
  "LangChain4j / RAG / Prompt 基本概念": "LangChain4j / RAG / prompt fundamentals",
  "Agent Loop / ReAct / Function Calling": "Agent Loop / ReAct / Function Calling",
  "MCP / Skills / 工具按需加载": "MCP / Skills / on-demand tool loading",
  "上下文管理 / Git Worktree / 多 Agent 协作": "Context management / Git Worktree / multi-Agent collaboration",
  "Claude Code / Codex / Cursor 辅助编码与排查": "AI-assisted coding and diagnostics with Claude Code / Codex / Cursor",
  "Vue 3 / JavaScript / Vite / Element Plus 基础联调": "Basic frontend integration with Vue 3 / JavaScript / Vite / Element Plus",
  "掌握": "Proficient",
  "熟悉": "Familiar",
  "了解": "Basic",
  "能够": "Practical",

  // CouponFlow
  "个人项目实践": "Personal Project",
  "Java 后端开发": "Java Backend Development",
  "AI Agent 开发": "AI Agent Development",
  "优惠券发行与履约": "Coupon Issuance & Redemption",
  "券流｜优惠券发行与履约引擎": "CouponFlow | Coupon Issuance & Redemption Engine",
  "面向电商营销场景，覆盖优惠券模板管理、批量与定时发券、秒杀领券、预约提醒及核销退款，重点处理大批量发券效率、任务中断恢复和并发领取下的库存与幂等问题。":
    "An e-commerce coupon platform covering templates, batch and scheduled issuance, flash-sale claims, reminders, redemption and refunds. It focuses on batch efficiency, interrupted-task recovery, stock control and idempotency under concurrent requests.",
  "批量分发": "Batch Distribution",
  "EasyExcel 流式解析名单，XXL-Job 调度定时发券，RocketMQ 解耦任务与分发处理；Redis Lua 原子预扣库存并暂存待发记录，消费者分批写入 MySQL，减少逐条操作的网络与写入开销。":
    "Stream user lists with EasyExcel, schedule issuance with XXL-Job and decouple distribution through RocketMQ. Redis Lua atomically reserves stock and stages records for batched MySQL writes, reducing per-record network and write overhead.",
  "续跑追踪": "Recovery & Tracking",
  "Redis 记录任务进度，中断后按已登记行号续跑；库存不足、重复领取等失败原因落库，按记录 ID 游标分批读取并导出明细，避免大偏移量分页的扫描开销。":
    "Record task progress in Redis and resume from recorded row positions after interruptions. Persist claim failures and export details in batches using an ID cursor to avoid large-offset pagination scans.",
  "秒杀控制": "Concurrent Claim Control",
  "Redis Lua 原子校验库存和用户限领，提前拦截库存不足及超限请求；RocketMQ 异步发券，结合 MySQL 条件扣减与用户券唯一索引，控制超卖和重复领取风险。":
    "Atomically check stock and claim limits with Redis Lua, rejecting unavailable or over-limit requests early. Process issuance asynchronously through RocketMQ, with conditional MySQL updates and unique indexes to control overselling and duplicate claims.",
  "消息幂等": "Message Idempotency",
  "通过自定义注解、AOP 与 SpEL 抽象消费幂等组件，Redis 区分消费中和已完成状态；结合超时过期、异常清理与消息重试，处理并发重复投递及消费失败场景。":
    "Encapsulate consumer idempotency with annotations, AOP and SpEL. Redis tracks processing and completed states; expiration, cleanup on failure and message retries handle concurrent redelivery and consumer failures.",
  "分库路由": "Shard Routing",
  "ShardingSphere 按店铺编号 shop_number 对优惠券模板进行 HashMod 分库分表；查询携带分片键，减少全路由查询与跨库扫描。":
    "Shard coupon templates by shop_number using ShardingSphere HashMod. Include the shard key in queries to reduce broadcast routing and cross-database scans.",
  "查看项目源码": "View Source Code",

  // MaXu
  "终端 AI 编程助手": "Terminal AI Coding Assistant",
  "码序｜终端 AI 编程 Agent": "MaXu | Terminal AI Coding Agent",
  "面向开发者的终端编程助手，基于 ReAct 思路组织模型决策、工具执行与结果反馈循环，调用文件读取、搜索、编辑和命令执行工具完成多步任务，支持多模型接入、会话管理与多 Agent 协作。":
    "A terminal coding assistant that follows a ReAct loop of model decisions, tool execution and feedback. It reads, searches and edits files and runs commands for multi-step tasks, with multi-provider support, session management and Agent collaboration.",
  "安全拦截": "Permission Controls",
  "组合危险命令检测、真实路径校验、规则优先级、权限模式与人工确认；按拒绝优先原则处理权限冲突，并解析符号链接的实际路径，降低越界访问风险。":
    "Combine command checks, real-path validation, rule priorities, permission modes and human approval. Resolve conflicts with deny-first rules and resolve symbolic links before path checks to reduce out-of-scope access.",
  "会话管理": "Context Management",
  "采用大结果落盘与历史摘要两层策略管理上下文；压缩和会话恢复时校验工具调用与结果的配对关系，避免截断不完整轮次导致协议错误。":
    "Manage context with large-output persistence and history summarization. Validate tool-call and result pairs during compression and session recovery to avoid protocol errors caused by incomplete turns.",
  "协议归一": "Protocol Normalization",
  "适配 Anthropic 与 OpenAI 兼容协议，将文本增量、工具参数片段和调用结束等响应统一为事件接口，降低上层 Agent Loop 对模型服务商的耦合。":
    "Normalize Anthropic and OpenAI-compatible responses into shared events for text deltas, tool argument fragments and call completion, reducing provider coupling in the Agent Loop.",
  "并行协作": "Parallel Collaboration",
  "Git Worktree 隔离子 Agent 工作目录，文件邮箱异步通信，Coordinator 拆分任务并跟踪进度；区分任务指令与状态通知，减少文件干扰和消息误判。":
    "Isolate Agent working directories with Git Worktree and communicate asynchronously through file mailboxes. A Coordinator assigns tasks and tracks progress, separating instructions from status updates to reduce interference and misinterpretation.",
  "工具按需": "On-Demand Tools",
  "MCP 工具与 Skills 分阶段加载，先提供简要描述，再加载所需定义；客户端维护已发现工具并补充请求 Schema，减少上下文占用并适配不同模型端点。":
    "Load MCP tools and Skills progressively, starting with short descriptions and loading full definitions when needed. The client tracks discovered tools and adds their schemas to requests, reducing context usage across model endpoints.",

  // Honors
  "证书": "AWARD",
  "颁发单位": "ISSUER",
  "软件设计与开发竞赛校级一等奖": "First Prize, University Software Design & Development Competition",
  "学院程序设计竞赛一等奖": "First Prize, College Programming Competition",
  "校园实践大赛（软件开发类）特等奖": "Grand Prize, Campus Practice Competition — Software Development",
  "校级": "University Level",
  "学院": "College Level",
  "软件开发类": "Software Development",
  "软件设计与开发竞赛一等奖，体现工程实现与项目交付能力。":
    "First prize in software design and development, recognizing implementation and project delivery skills.",
  "程序设计竞赛一等奖，体现算法基础、编码能力与问题拆解能力。":
    "First prize in programming, recognizing algorithms, coding and problem-solving skills.",
  "校园实践大赛软件开发类特等奖，体现项目实践与综合应用能力。":
    "Grand prize in the software development category, recognizing project practice and applied engineering skills.",

  // Collaboration and contact
  "以 Java 后端开发为主，关注接口设计、数据库缓存与异步任务处理，同时探索 AI Agent 工程。欢迎后端开发机会与项目交流，目前可随时到岗。":
    "My primary focus is Java backend development: API design, databases, caching and asynchronous tasks. I also explore AI Agent engineering. Open to backend opportunities and project discussions, and available immediately.",
  "围绕 Spring Boot、MyBatis-Plus 与 MySQL 完成业务接口、数据访问和前后端联调":
    "Build business APIs, data access and frontend integration with Spring Boot, MyBatis-Plus and MySQL.",
  "数据与异步": "Data & Async Processing",
  "结合 Redis、RocketMQ 与定时任务处理缓存、批量分发、消费重试和业务幂等":
    "Use Redis, RocketMQ and scheduled jobs for caching, batch distribution, consumer retries and business idempotency.",
  "Agent 工程实践": "Agent Engineering",
  "围绕工具调用、上下文管理、权限控制与多 Agent 协作开展编程助手实践":
    "Explore coding assistants through tool calling, context management, permission controls and multi-Agent collaboration.",
  "希望加入重视工程实践的团队，围绕 Java 后端和 AI 应用，把接口、数据与任务流程做扎实。欢迎通过邮件或表单与我交流。":
    "I am looking for a team that values engineering practice, building reliable APIs, data flows and task processing around Java backend and AI applications. Feel free to reach out by email or the form.",
  "意向岗位": "Target Role",
  "技能关键词": "Skill Keywords",
  "更多联系方式": "Other Channels",
  "微信、QQ 等渠道可在邮件 / 表单沟通后进一步交换。":
    "WeChat and QQ details can be shared after initial contact by email or the form.",
  "快速联系": "Quick Contact",

  // Contact form
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

  "精选项目":
    "Selected Projects",
  "方案拆解":
    "Inside the Design",
  "核心链路":
    "Core Flow",
  "设计取舍":
    "Design Trade-offs",
  "工程思考":
    "Engineering Notes",
  "从业务约束到技术选择，展开查看每个方案的实现思路与边界。":
    "From constraints to technical decisions: explore the implementation and limits of each design.",
  "先看核心链路，再展开感兴趣的技术细节。":
    "Start with the core flow, then explore the details that interest you.",
  "一份发券名单背后，是吞吐、库存与失败恢复的协同设计。":
    "Behind every issuance list: throughput, stock control and failure recovery.",
  "面向电商营销场景，串联商家模板管理、批量与定时发券、秒杀领取，以及预约提醒、锁定核销与退款。项目重点放在两条链路：大名单如何分批发得稳，并发领取如何尽早拦截无效请求。任务进度、消息状态与最终领券结果分别处理，让中断、重试和失败明细都有明确的落点。":
    "An e-commerce coupon platform spanning merchant templates, batch and scheduled issuance, flash-sale claims, reminders, redemption and refunds. It focuses on reliable list processing and early rejection of invalid concurrent claims. Input progress, message state and final claim results are handled separately so interruptions, retries and failures have explicit recovery paths.",
  "任务触发":
    "Trigger",
  "即时创建 / XXL-Job 调度":
    "Immediate task / XXL-Job",
  "流式解析":
    "Stream",
  "EasyExcel 逐行读取名单":
    "Read rows with EasyExcel",
  "库存预扣":
    "Reserve",
  "Redis Lua 校验并暂存":
    "Validate and stage in Redis",
  "批次投递":
    "Queue",
  "RocketMQ 解耦分发处理":
    "Dispatch through RocketMQ",
  "事务落库":
    "Persist",
  "MySQL 条件更新与唯一约束":
    "Conditional updates and constraints",
  "把大名单变成受控批次，减少逐条操作的往返开销。":
    "Turn large lists into bounded batches to reduce per-record round trips.",
  "使用 EasyExcel 流式读取 Excel，避免整份名单同时驻留内存。解析阶段通过 Lua 将库存预扣与待发用户写入 Redis Set 放在同一次执行中，累计到批次后发送分发消息，由消费者批量写入用户券记录；解析结束时补发完成标识，处理不足一批的尾部数据。":
    "Read Excel incrementally with EasyExcel instead of retaining the whole list in memory. A Lua script reserves stock and stages recipients in a Redis Set. Once a batch is ready, a distribution message triggers batched coupon writes. An end-of-input signal flushes the final partial batch.",
  "流式读取解决内存占用，批处理减少网络与数据库调用，两者分别优化不同瓶颈。批次越大，单次事务与失败重试成本也越高，需要在吞吐和恢复成本之间取舍。":
    "Streaming addresses memory use; batching addresses network and database overhead. Larger batches also increase transaction and retry costs, so batch size balances throughput against recovery cost.",
  "中断后有进度可循，失败后有原因可查。":
    "Resume from recorded progress and make failures explainable.",
  "以任务维度在 Redis 中保存已处理行号，重启解析时跳过已登记输入。将库存不足、重复领取等失败行号和原因记录下来，按任务批次生成错误明细。导出采用记录 ID 游标分批读取，避免 LIMIT 大偏移量反复扫描前面的记录。":
    "Store processed row positions in Redis per task and skip recorded input when parsing resumes. Record row numbers and reasons for failures such as insufficient stock or duplicate claims. Export records in ID-cursor batches rather than repeatedly scanning large LIMIT offsets.",
  "解析进度不代表发券已经落库。恢复点、消息消费状态和数据库结果需要分开判断，唯一索引与消费幂等共同处理重放；失败明细用于定位原因，并不自动等于补发。":
    "Parsed input is not the same as committed issuance. Recovery positions, message states and database results must be checked separately; consumer idempotency and unique indexes handle replays. Failure reports explain outcomes without implying automatic reissuance.",
  "缓存层尽早筛选，数据库保留最终写入约束。":
    "Reject invalid claims early and retain database-level write constraints.",
  "将库存是否充足、用户是否超过限领次数放入 Redis Lua 原子执行，对无库存和超限请求直接返回。有效请求进入 RocketMQ 异步发券链路，数据库通过带库存条件的更新和用户券唯一索引处理扣减、重复领取等竞争场景。":
    "Use Redis Lua to atomically check stock and per-user claim limits, rejecting unavailable or over-limit requests early. Valid requests enter asynchronous issuance through RocketMQ. Conditional stock updates and unique coupon indexes constrain competing writes in MySQL.",
  "Lua 保证一次 Redis 执行的原子性，不能替代 Redis、消息队列与 MySQL 之间的状态协调。缓存负责前置拦截，数据库条件更新和唯一约束负责最终结果。":
    "Lua makes one Redis execution atomic; cross-system coordination still involves Redis, the queue and MySQL. Cache checks protect the entry path, while database conditions and unique constraints protect committed results.",
  "重复消息要区分正在执行和已经完成，不能一律丢弃。":
    "Distinguish processing messages from completed ones when handling duplicates.",
  "通过自定义注解、AOP 与 SpEL 生成业务幂等键，用 Redis 原子写入消费中标识。遇到正在处理的同键消息时抛出异常，让队列延迟重试；已完成的消息直接跳过。正常结束更新完成状态，业务异常则清理标识，配合过期时间释放异常占用。":
    "Use annotations, AOP and SpEL to derive a business idempotency key and atomically mark it as processing in Redis. Concurrent duplicates trigger queue retries, while completed messages are skipped. Successful handling marks completion; errors remove the marker, with expiration recovering abandoned entries.",
  "消费幂等用于控制重复执行，业务唯一索引仍要保留。状态过期后的重投、消费耗时和异常退出都需要纳入考虑，单个去重键并不构成端到端的恰好一次承诺。":
    "Consumer idempotency limits repeated execution but does not replace business uniqueness constraints. Redelivery after expiration, long-running handlers and crashes remain relevant; one deduplication key does not guarantee end-to-end exactly-once execution.",
  "围绕查询入口选择分片键，让分片真正服务于访问模式。":
    "Choose shard keys around query paths rather than storage alone.",
  "采用 ShardingSphere HashMod 方案，以 shop_number 组织优惠券模板数据。商家维度的查询显式携带店铺编号，使路由落到目标分片；用户券数据则围绕用户维度组织。分片设计结合常见查询条件考虑，避免仅按数据量拆表后再承担全路由查询。":
    "Use ShardingSphere HashMod with shop_number for coupon templates. Merchant queries carry the shop identifier to reach the target shard, while user coupons follow user-oriented access. Sharding is designed around query predicates instead of splitting storage first and accepting broadcast queries later.",
  "局部索引无法替代分片键。查询缺少路由条件时，分片内查询再快也可能需要访问多个节点；按店铺和用户组织数据，也意味着跨维度查询需要额外设计。":
    "A local index cannot substitute for a shard key. Missing routing predicates can still cause multi-node queries, and organizing data by merchant or user requires additional design for cross-dimension access.",
  "缓存防护":
    "Cache Protection",
  "把不存在的数据与热点失效分开处理。":
    "Handle nonexistent keys and hot-cache misses separately.",
  "模板查询组合布隆过滤器、空值缓存与 Redisson 分布式锁：过滤器先排除明确不存在的模板，空值缓存覆盖不存在记录及误判场景；热点缓存失效时，通过加锁与锁内二次检查减少并发回源。":
    "Combine a Bloom filter, negative caching and Redisson locks for template queries. The filter rejects definite misses, negative caching handles missing records and false positives, and locking with a second cache check reduces concurrent database reloads after hot-key expiration.",
  "布隆过滤器可能误判存在，需要数据库和空值缓存继续确认；分布式锁只约束缓存重建路径，避免将所有正常命中请求也放进串行执行。":
    "Bloom filters can report false positives, so database checks and negative caching still matter. Lock only the cache rebuild path so ordinary cache hits remain concurrent.",
  "可靠性的讨论，要落到具体状态。":
    "Reliability starts with explicit states.",
  "这条链路最值得展开的是：任务解析到哪里、消息执行到哪里、用户最终拿到什么券。三类状态各有职责，排查和恢复才有依据。":
    "The useful questions are where parsing stopped, how far a message progressed and which coupon was committed. Keeping those states distinct makes troubleshooting and recovery actionable.",
  "性能优化先找往返，再谈并发。":
    "Find round trips before adding concurrency.",
  "流式读取、Redis 批次暂存、数据库批量写入和游标导出，分别减少内存驻留、网络往返与无效扫描。更大的线程池并不天然意味着更快。":
    "Streaming, Redis staging, batched writes and cursor exports address memory, network and scan costs separately. A larger thread pool is not automatically faster.",
  "让模型调用工具之后，长任务、权限和协作才真正开始。":
    "Tool calling is the start; long tasks, permissions and collaboration come next.",
  "面向自然语言编程任务的终端助手，围绕模型决策、工具执行和结果反馈组织 Agent Loop。文件读取、搜索、编辑与命令执行提供基本行动能力；多模型适配、上下文管理、权限拦截与多 Agent 协作，进一步处理任务运行过程中遇到的协议差异、上下文膨胀和执行边界。":
    "A terminal assistant for natural-language coding tasks, built around an Agent Loop of model decisions, tool execution and feedback. File reading, searching, editing and command execution provide actions; provider adaptation, context management, permissions and Agent collaboration address protocol differences, growing context and execution boundaries.",
  "模型决策":
    "Decide",
  "理解目标并选择工具":
    "Interpret the task and choose tools",
  "权限校验":
    "Authorize",
  "规则、路径与人工确认":
    "Check rules, paths and approval",
  "工具执行":
    "Execute",
  "读取、编辑、搜索、命令":
    "Read, edit, search and run commands",
  "反馈再规划":
    "Replan",
  "结果回写上下文并继续循环":
    "Feed results back into the loop",
  "执行权限由工具层落实，拒绝不能被另一条允许规则覆盖。":
    "Enforce permissions at execution time and preserve deny decisions.",
  "在工具真正运行前组合危险命令检测、路径范围校验、规则引擎、权限模式和人工确认。路径检查先解析符号链接得到真实路径，再判断是否越界；权限链采用拒绝优先，避免不同作用域的规则出现允许覆盖拒绝的冲突。":
    "Before running a tool, combine command checks, path validation, a rule engine, permission modes and human approval. Resolve symbolic links to real paths before checking boundaries. Deny-first evaluation prevents an allow rule in another scope from overriding a rejection.",
  "字符串匹配无法覆盖所有命令组合，路径校验也属于应用层控制。多层检查的价值在于分别覆盖不同风险；进程级读写或网络隔离需要操作系统沙箱等独立机制。":
    "String matching cannot cover every command combination, and path checks remain application-level controls. Layers address different risks; process-level filesystem or network isolation requires a separate OS sandbox mechanism.",
  "摘要要节省上下文，也必须保住工具调用的配对边界。":
    "Compress context without breaking tool-call and result boundaries.",
  "先将过长工具输出落盘，在会话中保留摘要和文件引用；历史接近预算时再生成结构化摘要。会话通过 JSONL 持久化，并在恢复、压缩和用户中断后检查工具调用与结果是否配对，必要时退回最近的完整轮次，避免孤立调用导致下一轮请求失败。":
    "Persist large tool outputs first and retain summaries and file references in context. Summarize history when it approaches the budget. Store sessions as JSONL and validate tool-call/result pairs after restoration, compression and interruption, rolling back to a complete turn when needed.",
  "大结果落盘与历史摘要的损失程度不同，应先处理可回读的大输出。摘要请求本身同样消耗上下文预算，因此压缩触发点和空间不足时的退让策略也属于设计的一部分。":
    "Persisting retrievable output and summarizing history have different information costs. Handle large outputs first. Summarization itself consumes context, so trigger thresholds and low-budget fallback behavior are part of the design.",
  "模型协议的差异留在客户端，Agent Loop 只消费统一事件。":
    "Keep provider differences in the client and expose a shared event stream.",
  "Anthropic 以内容块组织流式响应，OpenAI 兼容协议中的多个工具调用增量可能交错到达。客户端按调用索引累计参数，在结束边界组装完整调用，并将文本增量、工具开始、参数片段与调用结束转换为统一事件，供上层循环和终端界面使用。":
    "Anthropic streams content blocks, while OpenAI-compatible streams may interleave deltas for several tool calls. Accumulate arguments by call index and assemble complete calls at their boundaries, normalizing text, call starts, argument fragments and completion into shared events.",
  "适配层统一的是事件语义，模型特有能力仍需显式处理。工具参数在流式传输中通常是不完整 JSON，不能收到任意片段就解析执行；新增服务商应主要扩展解析器。":
    "Normalize event semantics while handling provider-specific capabilities explicitly. Streamed tool arguments are often incomplete JSON and must not be executed from arbitrary fragments. New providers should primarily extend the parser layer.",
  "目录隔离解决文件干扰，消息类型解决任务误判。":
    "Separate working directories and give coordination messages explicit types.",
  "每个子 Agent 使用独立 Git Worktree，文件邮箱负责异步传递任务与进度。Coordinator 拆分任务、分配工作并跟踪状态；通信中区分任务分配、进度更新和停止请求，让 Worker 依据消息类型响应，减少把其他 Agent 的状态描述当作新指令的情况。":
    "Give each worker its own Git Worktree and exchange tasks and progress through file mailboxes. A Coordinator divides work and tracks status. Typed task assignments, progress updates and shutdown requests reduce the chance of workers treating another Agent's status as a new instruction.",
  "Worktree 分离工作目录，不能自动消除后续合并冲突，也不提供进程级安全隔离。适合拆分依赖较少的任务，最终结果仍需要合并与校验。":
    "Worktree separates directories but does not automatically resolve later merge conflicts or provide process-level security isolation. It suits loosely coupled tasks whose results still need merging and validation.",
  "先让模型看到工具目录，需要时再支付完整定义的上下文成本。":
    "Expose a tool catalog first and load full definitions only when needed.",
  "MCP 工具先提供名称和简述，检索命中后再加入完整 Schema；客户端维护已发现工具集合，在后续请求中主动携带定义，适配缺少服务端工具引用展开能力的端点。Skills 同样采用元数据与指令正文分阶段加载，按任务引入所需规则和工具。":
    "Expose MCP tool names and short descriptions before adding full schemas on discovery. Track discovered tools on the client and include definitions in later requests, including endpoints without server-side reference expansion. Skills likewise load metadata before task-specific instructions and tools.",
  "按需加载减少初始上下文占用，但增加一次发现过程；工具被发现后仍占用后续请求预算。客户端管理定义，能减少对单一模型协议扩展的依赖。":
    "Deferred loading reduces initial context use but adds a discovery step, and discovered tools still consume later request budgets. Client-managed schemas reduce dependence on one provider's protocol extensions.",
  "一个 Agent 的工程能力，体现在中断之后。":
    "Agent engineering shows up after interruptions.",
  "压缩、取消、断连与会话恢复都可能留下不完整状态。关注工具调用配对、输出引用和完整轮次，比只展示一次顺利的工具调用更能说明系统设计。":
    "Compression, cancellation, disconnection and restoration can leave partial state. Tool/result pairing, output references and complete turn boundaries reveal more about the design than one successful tool call.",
  "把 AI 辅助开发落实为可解释的方案。":
    "Make AI-assisted development explainable.",
  "项目关注协议适配、上下文成本与权限边界这些可具体讨论的问题。工具辅助编码，技术选择仍需要结合约束说明原因，并通过运行结果判断是否成立。":
    "The project focuses on concrete questions: protocol adaptation, context cost and permission boundaries. Coding tools assist implementation; technical choices still need reasons tied to constraints and validation against runtime behavior.",

  // Footer
  "© 2026 杜泽民. ALL RIGHTS RESERVED.": "© 2026 ZEMIN DU. ALL RIGHTS RESERVED.",
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
