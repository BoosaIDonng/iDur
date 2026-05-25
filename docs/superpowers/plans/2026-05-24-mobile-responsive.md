# Mobile Responsive Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the portfolio usable and polished on mainstream phones around 360-430px wide.

**Architecture:** Keep the existing React components and data intact. Add scoped mobile rules to the hero CSS and targeted Tailwind class adjustments to navigation and section/card spacing.

**Tech Stack:** Next.js 14, React 18, Tailwind CSS, inline scoped CSS strings.

---

### Task 1: Mobile Hero And Navigation

**Files:**
- Modify: `components/huansen-styles.ts`
- Modify: `components/portfolio-sections.tsx`

- [ ] Add a mobile media query in `HUANSEN_CSS` that stacks hero text vertically, caps font sizes with `clamp`, reduces the 3D hover target, hides the hover translation layer on touch-sized screens, and keeps the scroll indicator inside the viewport.
- [ ] Replace the mobile hamburger-only nav with a compact two-row mobile header: brand/menu metadata on top, glass nav rail below with horizontal scrolling and the existing glider.
- [ ] Verify with a 390px viewport that the hero text does not overflow and the nav remains horizontally usable.

### Task 2: Compact Mobile Content Rhythm

**Files:**
- Modify: `components/portfolio-sections.tsx`
- Modify: `app/globals.css`

- [ ] Reduce mobile section top spacing and title size.
- [ ] Tighten card padding/radius on mobile while keeping desktop classes unchanged.
- [ ] Make skill, project, honors, collaboration, and contact sections use a compact single-column rhythm.
- [ ] Verify with 360px and 390px widths that there is no horizontal scrolling.

### Task 3: Verification

**Files:**
- Read: all modified files

- [ ] Run `npm run build`.
- [ ] Scan modified Chinese/Unicode files for replacement characters, suspicious mojibake, hidden bidi characters, zero-width characters, BOM, full-width spaces, and variation selectors.
- [ ] Browser-check desktop and mobile viewports.
