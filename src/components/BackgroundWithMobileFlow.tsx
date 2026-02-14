"use client";

import { useEffect, useState } from "react";
import {
  Background,
  opacity,
  RevealFx,
  SpacingToken,
} from "@once-ui-system/core";
import type { EffectsConfig } from "@/types";

type BackgroundWithMobileFlowProps = {
  effects: EffectsConfig;
};

function usePrefersTouch() {
  const [prefersTouch, setPrefersTouch] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    setPrefersTouch(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersTouch(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return prefersTouch;
}

export default function BackgroundWithMobileFlow({ effects }: BackgroundWithMobileFlowProps) {
  const prefersTouch = usePrefersTouch();
  const maskCursor = effects.mask.cursor && !prefersTouch;

  return (
    <RevealFx fill position="absolute">
      <Background
        mask={{
          x: effects.mask.x,
          y: effects.mask.y,
          radius: effects.mask.radius,
          cursor: maskCursor,
        }}
        gradient={{
          display: effects.gradient.display,
          opacity: effects.gradient.opacity as opacity,
          x: effects.gradient.x,
          y: effects.gradient.y,
          width: effects.gradient.width,
          height: effects.gradient.height,
          tilt: effects.gradient.tilt,
          colorStart: effects.gradient.colorStart,
          colorEnd: effects.gradient.colorEnd,
        }}
        dots={{
          display: effects.dots.display,
          opacity: effects.dots.opacity as opacity,
          size: effects.dots.size as SpacingToken,
          color: effects.dots.color,
        }}
        grid={{
          display: effects.grid.display,
          opacity: effects.grid.opacity as opacity,
          color: effects.grid.color,
          width: effects.grid.width,
          height: effects.grid.height,
        }}
        lines={{
          display: effects.lines.display,
          opacity: effects.lines.opacity as opacity,
          size: effects.lines.size as SpacingToken,
          thickness: effects.lines.thickness,
          angle: effects.lines.angle,
          color: effects.lines.color,
        }}
      />
      {prefersTouch && <div className="mobile-background-flow" aria-hidden />}
    </RevealFx>
  );
}
