"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Check, Palette, X } from "lucide-react";
import { hexToHsv, hsvToHex } from "../../shared/colorPicker";
import { CrystalButton } from "../components/LowPolyUI";

/** Paleta rápida inspirada en References/Referencias_componentes.png. */
const DEFAULT_PRESETS = [
  "#4A2E1B", "#1E1B4B", "#2563EB", "#22D3EE",
  "#7C3AED", "#EC4899", "#FACC15", "#84CC16",
  "#DC2626", "#F8FAFC", "#64748B", "#0F172A",
];

const isHex = (value: string) => /^#[0-9a-f]{6}$/i.test(value);

/**
 * Selector de color con estética de cristal tallado (paneles, botones,
 * barras de progreso e inputs de References/Referencias_componentes.png).
 */
export function CustomColorPicker({ color, onChange, label, presets = DEFAULT_PRESETS }: {
  color: string;
  onChange: (color: string) => void;
  label: string;
  placement?: "up" | "down";
  presets?: string[];
}) {
  const [open, setOpen] = useState(false);
  const [hsv, setHsv] = useState<[number, number, number]>(() => hexToHsv(color));
  const [hex, setHex] = useState(color);
  const trigger = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const selected = hsvToHex(hsv[0], hsv[1] / 100, hsv[2] / 100);
  const pureHue = hsvToHex(hsv[0], 1, 1);
  const fullSat = hsvToHex(hsv[0], 1, hsv[2] / 100);
  const fullVal = hsvToHex(hsv[0], hsv[1] / 100, 1);

  const change = (value: [number, number, number]) => {
    setHsv(value);
    setHex(hsvToHex(value[0], value[1] / 100, value[2] / 100));
  };

  const pickPreset = (value: string) => {
    setHsv(hexToHsv(value));
    setHex(value.toUpperCase());
  };

  useEffect(() => {
    if (!open) return;
    const panel = dialog.current!;
    panel.querySelector<HTMLButtonElement>("button")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); setOpen(false); }
      if (event.key !== "Tab") return;
      const nodes = Array.from(panel.querySelectorAll<HTMLElement>('button:not(:disabled), input, [tabindex="0"]'));
      const first = nodes[0], last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("keydown", onKey); trigger.current?.focus({ preventScroll: true }); };
  }, [open]);

  const point = (event: React.PointerEvent<HTMLDivElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - box.left - box.width / 2, y = event.clientY - box.top - box.height / 2;
    const hue = (Math.atan2(y, x) * 180 / Math.PI + 450) % 360;
    change([hue, Math.min(100, Math.hypot(x, y) / (box.width / 2) * 100), hsv[2]]);
  };

  const channels: { name: string; max: number; unit: string; track: string }[] = [
    { name: "Matiz", max: 359, unit: "°", track: "linear-gradient(90deg,#f00,#ff0,#0f0,#0ff,#00f,#f0f,#f00)" },
    { name: "Saturación", max: 100, unit: "%", track: `linear-gradient(90deg,${hsvToHex(hsv[0], 0, hsv[2] / 100)},${fullSat})` },
    { name: "Brillo", max: 100, unit: "%", track: `linear-gradient(90deg,#000,${fullVal})` },
  ];

  return <>
    <button ref={trigger} type="button" className="color-crystal-trigger" aria-label={label} title={label}
      aria-haspopup="dialog" aria-expanded={open} onClick={() => { setHsv(hexToHsv(color)); setHex(color); setOpen(true); }}>
      <svg viewBox="0 0 44 44" aria-hidden="true">
        <path d="M12 2H32L42 12V32L32 42H12L2 32V12Z" fill="#222356" stroke="#8684D5" />
        <path d="M12 2H32L37 8H15L8 15L2 12Z" fill="#7162B3" />
        <path d="M22 8L34 15L22 22Z" fill="#A56AF4" /><path d="M34 15V29L22 22Z" fill="#3AC7ED" />
        <path d="M34 29L22 36V22Z" fill="#6DD6B1" /><path d="M22 36L10 29L22 22Z" fill="#F4D355" />
        <path d="M10 29V15L22 22Z" fill="#EF8B69" /><path d="M10 15L22 8V22Z" fill="#DA76CF" />
        <path d="M22 15L29 19V26L22 30L15 26V19Z" fill={color} stroke="#EEF3FF" strokeWidth="1.5" />
        <path d="M35 3V11M31 7H39" stroke="#D2FAFF" strokeWidth="2" />
      </svg>
    </button>
    {open && createPortal(<div className="color-picker-backdrop" onPointerDown={event => { if (event.target === event.currentTarget) setOpen(false); }}>
      <div ref={dialog} className="color-crystal-panel" role="dialog" aria-modal="true" aria-label={label}>
        <div className="color-crystal-inner">
          {/* Cabecera estilo panel tallado: gema + título + cerrar */}
          <div className="color-picker-heading">
            <span className="color-picker-gem" aria-hidden="true"><Palette size={18} /></span>
            <div><small>PERSONALIZACIÓN</small><h3>{label}</h3></div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Cerrar selector"><X size={18} /></button>
          </div>

          <div className="color-picker-body">
            {/* Rueda dentro de un engaste octogonal de cristal */}
            <div className="color-wheel-socket">
              <div className="color-wheel" onPointerDown={event => { event.currentTarget.setPointerCapture(event.pointerId); point(event); }}
                onPointerMove={event => { if (event.currentTarget.hasPointerCapture(event.pointerId)) point(event); }}
                onPointerUp={event => { event.currentTarget.releasePointerCapture(event.pointerId); }}
                style={{ background: `linear-gradient(rgba(0,0,0,${1 - hsv[2] / 100}),rgba(0,0,0,${1 - hsv[2] / 100})),radial-gradient(circle,white,transparent 70%),conic-gradient(red,#ff0,#0f0,#0ff,#00f,#f0f,red)` }}>
                <span className="color-wheel-marker" style={{ left: `${50 + Math.sin(hsv[0] * Math.PI / 180) * hsv[1] / 2}%`, top: `${50 - Math.cos(hsv[0] * Math.PI / 180) * hsv[1] / 2}%`, background: selected }} />
              </div>
            </div>

            <div className="color-picker-side">
              {/* Comparación Actual / Nuevo como sub-tarjeta biselada */}
              <div className="color-compare">
                <div><span style={{ background: color }} /><small>Actual</small></div>
                <div><span style={{ background: isHex(hex) ? selected : color }} /><small>Nuevo</small></div>
              </div>

              {/* Canales con pistas de color estilo barra de progreso de cristal */}
              {channels.map((channel, index) => <label className="color-channel" key={channel.name}>
                <span>{channel.name}<output>{Math.round(hsv[index])}{channel.unit}</output></span>
                <input aria-label={channel.name + " del color"} type="range" min="0" max={channel.max} value={hsv[index]}
                  style={{ background: channel.track, ["--thumb" as string]: index === 0 ? pureHue : selected }}
                  onChange={event => { const next = [...hsv] as [number, number, number]; next[index] = Number(event.target.value); change(next); }} />
              </label>)}
            </div>
          </div>

          {/* Paleta rápida de esferas facetadas */}
          <div className="color-presets" role="group" aria-label="Colores sugeridos">
            {presets.map(preset => <button key={preset} type="button" title={preset} aria-label={`Usar ${preset}`}
              aria-pressed={selected.toUpperCase() === preset.toUpperCase()} onClick={() => pickPreset(preset)}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 1H17L23 7V17L17 23H7L1 17V7Z" fill={preset} />
                <path d="M7 1H17L23 7L12 12L1 7Z" fill="#fff" opacity=".28" />
                <path d="M1 17L12 12L23 17L17 23H7Z" fill="#000" opacity=".22" />
              </svg>
            </button>)}
          </div>

          {/* Input HEX estilo "Inputs / Formularios" */}
          <label className="color-hex"><span className="color-sample" style={{ background: isHex(hex) ? selected : color }} /><span>HEX</span>
            <input aria-label="Código hexadecimal" value={hex} maxLength={7} spellCheck={false} aria-invalid={!isHex(hex)}
              onChange={event => { const value = event.target.value.toUpperCase(); setHex(value); if (isHex(value)) setHsv(hexToHsv(value)); }} /></label>

          <div className="color-picker-actions">
            <CrystalButton variant="dark" size="md" onClick={() => setOpen(false)}><X size={15} /> Cancelar</CrystalButton>
            <CrystalButton variant="cyan" size="md" disabled={!isHex(hex)} onClick={() => { onChange(hex.toUpperCase()); setOpen(false); }}><Check size={15} /> Aplicar</CrystalButton>
          </div>
        </div>
      </div>
    </div>, document.body)}
  </>;
}
