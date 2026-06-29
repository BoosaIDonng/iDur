"use client";

import { Suspense, lazy } from "react";

const Dithering = lazy(() =>
  import("@paper-design/shaders-react").then((mod) => ({
    default: mod.Dithering
  }))
);

export function ShaderAnimation() {
  return (
    <div className="shader-animation" aria-hidden="true">
      <Suspense fallback={<div className="shader-animation-fallback" />}>
        <Dithering
          colorBack="#00000000"
          colorFront="#EC4E02"
          shape="warp"
          type="4x4"
          speed={0.2}
          className="shader-animation-dithering"
          minPixelRatio={1}
        />
      </Suspense>
    </div>
  );
}
