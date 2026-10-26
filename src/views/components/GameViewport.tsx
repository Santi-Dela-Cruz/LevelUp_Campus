"use client";

import React, { useLayoutEffect, useRef, useState } from "react";

/** A game canvas fits the available screen; scaling never crops controls. */
export function GameViewport({ children }: { children: React.ReactNode }) {
  const host = useRef<HTMLDivElement>(null);
  const [frame, setFrame] = useState({ width: 1440, scale: 1 });
  useLayoutEffect(() => {
    const resize = () => {
      const rect = host.current!.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      const scale = Math.min(rect.width / 1440, rect.height / 900);
      setFrame({ width: Math.max(1440, rect.width / scale), scale });
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(host.current!);
    return () => observer.disconnect();
  }, []);
  return <div ref={host} className="game-viewport">
    <div className="game-frame" style={{ width: frame.width, height: 900,
      transform: `translate(-50%, -50%) scale(${frame.scale})` }}>
      {children}
    </div>
  </div>;
}

/** Fits the existing detailed map without changing its node coordinates. */
export function FitContent({ children, width = 1180, height = 850 }: {
  children: React.ReactNode; width?: number; height?: number;
}) {
  const host = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useLayoutEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      setScale(Math.min(entry.contentRect.width / width, entry.contentRect.height / height));
    });
    observer.observe(host.current!);
    return () => observer.disconnect();
  }, [width, height]);
  return <div ref={host} className="fit-content"><div style={{ width, height,
    transform: `translateX(-50%) scale(${scale})`, transformOrigin: "top center" }}>{children}</div></div>;
}
