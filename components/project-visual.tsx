"use client";

import { useLang } from "./i18n";

function DiagramIcon({ name }: { name: "file" | "stack" | "queue" | "database" | "model" | "shield" | "tool" | "feedback" }) {
  const paths = {
    file: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6M8 13h8M8 17h5" /></>,
    stack: <><path d="m12 3 10 5-10 5L2 8Zm-10 9 10 5 10-5M2 16l10 5 10-5" /></>,
    queue: <><rect x="3" y="3" width="5" height="5" rx="1" /><rect x="16" y="16" width="5" height="5" rx="1" /><path d="M8 5.5h7a4 4 0 0 1 4 4V12M16 18.5H9a4 4 0 0 1-4-4V12m11-3 3 3 3-3M2 15l3-3 3 3" /></>,
    database: <><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" /></>,
    model: <><path d="m12 3 3 6 6 3-6 3-3 6-3-6-6-3 6-3Z" /><path d="m20 2 .7 1.3L22 4l-1.3.7L20 6l-.7-1.3L18 4l1.3-.7Z" /></>,
    shield: <><path d="m12 2 8 4v6c0 5-8 10-8 10S4 17 4 12V6Z" /><path d="m8 12 3 3 5-6" /></>,
    tool: <><path d="m8 6-6 6 6 6m8-12 6 6-6 6m-3-14-2 16" /></>,
    feedback: <><path d="M3 11a9 9 0 1 1 3 7M3 4v7h7" /><path d="M12 7v5l3 2" /></>
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

export function ProjectVisual({ kind }: { kind: "coupon" | "agent" }) {
  const { t } = useLang();
  const coupon = kind === "coupon";
  const steps = coupon ? [
    { icon: "file", title: "流式解析", tech: "Excel / EasyExcel", desc: "逐行读取发券名单" },
    { icon: "stack", title: "库存预扣", tech: "Redis / Lua", desc: "原子校验与批次暂存" },
    { icon: "queue", title: "批次投递", tech: "RocketMQ", desc: "异步分发与消费重试" },
    { icon: "database", title: "事务落库", tech: "MySQL", desc: "条件更新与唯一约束" }
  ] as const : [
    { icon: "model", title: "模型决策", tech: "Model", desc: "理解任务，选择行动" },
    { icon: "shield", title: "权限校验", tech: "Permission", desc: "规则、路径与人工确认" },
    { icon: "tool", title: "工具执行", tech: "Tools", desc: "读取、搜索、编辑、命令" },
    { icon: "feedback", title: "反馈再规划", tech: "Feedback", desc: "结果回写与上下文管理" }
  ] as const;

  return (
    <figure className={`project-visual project-visual--${kind}`}>
      <figcaption className="project-visual__caption">
        <span className="project-visual__eyebrow">{coupon ? "ISSUANCE PIPELINE" : "AGENT LOOP"}</span>
        <span className="project-visual__label">{t("架构示意")}</span>
      </figcaption>

      <ol className="project-visual__steps">
        {steps.map((step, index) => (
          <li className="project-visual__step" key={step.tech}>
            <div className="project-visual__node-top">
              <span className="project-visual__icon"><DiagramIcon name={step.icon} /></span>
              <span className="project-visual__number">0{index + 1}</span>
            </div>
            <strong className="project-visual__title">{t(step.title)}</strong>
            <span className="project-visual__tech">{step.tech}</span>
            <span className="project-visual__desc">{t(step.desc)}</span>
          </li>
        ))}
      </ol>

      {coupon ? (
        <div className="project-visual__foot project-visual__foot--coupon">
          <span className="project-visual__foot-title">{t("可靠性贯穿链路")}</span>
          <span><i />{t("任务进度可追踪")}</span>
          <span><i />{t("消息消费幂等")}</span>
          <span><i />{t("落库唯一约束")}</span>
        </div>
      ) : (
        <div className="project-visual__agent-foot">
          <div className="project-visual__loop-line"><span aria-hidden="true">↶</span>{t("工具结果回写上下文，进入下一轮决策")}</div>
          <div className="project-visual__extensions">
            <span><b>MCP / Skills</b>{t("工具按需")}</span>
            <span><b>JSONL</b>{t("会话持久化")}</span>
            <span><b>Git Worktree</b>{t("并行协作")}</span>
          </div>
        </div>
      )}
    </figure>
  );
}
