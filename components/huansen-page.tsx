"use client";

import { HUANSEN_CSS } from "./huansen-styles";
import { PortfolioNav, PortfolioSections } from "./portfolio-sections";
import { LangProvider, useLang } from "./i18n";
import { ScrollProgress } from "./portfolio-enhancers";
import { ShaderAnimation } from "./shader-animation";

function Hero() {
  const { t } = useLang();

  return (
    <section className="hero-section" id="heroSection" aria-labelledby="hero-name">
      <ShaderAnimation />
      <div className="hero-inner">
        <div className="hero-topline">
          <span className="hero-edition">{t("个人作品集")} <span>/ 2026</span></span>
          <span className="hero-availability"><i aria-hidden="true" />{t("开放工作机会 · 随时到岗")}</span>
        </div>

        <div className="hero-copy">
          <p className="hero-intro">{t("你好，我是杜泽民")}</p>
          <h1 id="hero-name">DUZEMIN<span aria-hidden="true">.</span></h1>
          <p className="hero-role">{t("Java 后端开发")}</p>
          <p className="hero-specialty">{t("AI 应用与 Agent 工程实践")}</p>
          <p className="hero-description">
            {t("围绕接口、数据与异步任务构建后端，探索 AI Agent 的工具调用与协作。")}
          </p>
          <div className="hero-actions">
            <a className="hero-primary" href="#projects">{t("查看项目")}<span aria-hidden="true">↗</span></a>
            <a className="hero-secondary" href="#contact">{t("联系我")}<span aria-hidden="true">↗</span></a>
          </div>
        </div>

        <div className="hero-bottomline">
          <span>JAVA 17/21 <i>/</i> SPRING BOOT <i>/</i> AI AGENT</span>
          <a href="#projects" aria-label={t("查看项目")}>SCROLL TO EXPLORE <span aria-hidden="true">↓</span></a>
        </div>
      </div>
    </section>
  );
}

export function HuansenPage() {
  return (
    <LangProvider>
      <ScrollProgress />
      <PortfolioNav />
      <div className="hsn-scope">
        <style dangerouslySetInnerHTML={{ __html: HUANSEN_CSS }} />
        <Hero />
        <PortfolioSections />
      </div>
    </LangProvider>
  );
}
