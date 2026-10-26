"use client";

import React from "react";

/* ============================================================================
 * 1. PANEL PRINCIPAL TALLADO EN ROCA / CRISTAL (Tarjetas / Paneles)
 *    Inspirado fielmente en References/Referencias_componentes.png
 * ============================================================================ */
interface CrystalPanelProps {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  cornerDecor?: "crystals" | "mountains" | "castle" | "hero-crystals" | "none";
  allowOverflow?: boolean;
}

export const CrystalPanel: React.FC<CrystalPanelProps> = ({
  children,
  className = "",
  contentClassName = "p-4",
  cornerDecor = "crystals",
  allowOverflow = false,
}) => {
  return (
    <div
      className={`crystal-panel relative rounded-[16px] p-[2px] shadow-[0_12px_32px_rgba(3,5,16,0.85)] ${className}`}
      style={{
        background:
          "linear-gradient(165deg, #5865BA 0%, #2E3675 38%, #1D224F 75%, #3B2D7A 100%)",
      }}
    >
      {/* Superficie interior de roca cristalina */}
      <div
        className={`relative h-full w-full rounded-[14px] ${
          allowOverflow ? "overflow-visible" : "overflow-hidden"
        }`}
        style={{
          background:
            "linear-gradient(160deg, #1B204A 0%, #131738 55%, #0D1029 100%)",
        }}
      >
        {/* Capa decorativa recortada para las facetas de roca y cristales de esquina */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[14px]">
          <svg
            viewBox="0 0 400 240"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full opacity-25"
          >
            <polygon points="0,0 130,0 85,65 0,45" fill="#2B336E" />
            <polygon points="130,0 280,0 220,50 85,65" fill="#222859" />
            <polygon points="280,0 400,0 400,80 310,60" fill="#2D2566" />
            <polygon points="0,240 110,175 210,240" fill="#181C42" />
            <polygon points="260,240 340,165 400,190 400,240" fill="#251C57" />
            {/* Brillo especular de arista superior tipo roca tallada */}
            <polyline
              points="2,10 16,2 145,2 165,5 295,2 384,2 398,10"
              fill="none"
              stroke="#818CF8"
              strokeWidth="1.5"
              opacity="0.75"
            />
          </svg>

          {cornerDecor === "hero-crystals" && (
            <>
              <svg
                viewBox="0 0 220 200"
                className="absolute left-1 bottom-0 h-36 w-36 opacity-50"
              >
                <polygon points="24,200 62,38 112,200" fill="#3B2178" />
                <polygon points="62,38 112,200 88,200" fill="#5B21B6" />
                <polygon points="90,200 136,64 180,200" fill="#1E295E" />
                <polygon points="14,175 26,138 40,175" fill="#8B5CF6" />
                <polygon points="44,185 52,155 62,185" fill="#FACC15" />
              </svg>
              <svg
                viewBox="0 0 180 130"
                className="absolute right-0 bottom-0 h-28 w-36 opacity-55"
              >
                <polygon points="60,130 110,28 152,130" fill="#3B1D7A" />
                <polygon points="110,28 152,130 130,130" fill="#6D28D9" />
                <polygon points="132,130 162,58 180,130" fill="#9333EA" />
                <polygon points="92,130 104,84 116,130" fill="#FACC15" />
              </svg>
            </>
          )}

          {cornerDecor === "crystals" && (
            <svg
              viewBox="0 0 120 90"
              className="absolute -bottom-2 -right-2 h-16 w-24 opacity-45"
            >
              <polygon points="75,90 92,22 108,90" fill="#7C3AED" />
              <polygon points="92,22 108,90 98,90" fill="#A855F7" />
              <polygon points="52,90 66,46 82,90" fill="#4C1D95" />
              <polygon points="66,46 74,38 72,58" fill="#FACC15" />
              <polygon points="96,90 110,48 120,90" fill="#06B6D4" />
            </svg>
          )}

          {cornerDecor === "castle" && (
            <svg
              viewBox="0 0 220 90"
              className="absolute bottom-0 right-0 h-16 w-40 opacity-45"
            >
              <polygon points="10,90 55,42 98,90" fill="#1E295E" />
              <polygon points="70,90 125,32 175,90" fill="#2B2266" />
              <polygon points="155,90 162,34 184,34 190,90" fill="#4C1D95" />
              <polygon points="173,34 184,34 190,90 173,90" fill="#6D28D9" />
              <rect x="171" y="18" width="2.5" height="16" fill="#FACC15" />
              <polygon points="173.5,18 190,23 173.5,28" fill="#FACC15" />
              <rect x="170" y="44" width="5" height="7" fill="#FACC15" />
            </svg>
          )}
        </div>

        <div className={`relative z-10 h-full w-full ${contentClassName}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
 * 2. SUB-TARJETA POLIGONAL BISELADA (Usada en Estadísticas, Misiones y Módulos)
 *    Inspirada en las sub-tarjetas de Referencias_componentes.png
 * ============================================================================ */
export const CrystalSubCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseEnter?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: () => void;
  active?: boolean;
}> = ({
  children,
  className = "",
  innerClassName = "px-3 py-2.5",
  onClick,
  onMouseEnter,
  onMouseLeave,
  active = false,
}) => {
  return (
    <div
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (event) => {
        if (event.target === event.currentTarget && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          event.currentTarget.click();
        }
      } : undefined}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`clip-crystal-subcard relative p-[1.5px] transition-all ${
        onClick ? "cursor-pointer hover:brightness-110" : ""
      } ${className}`}
      style={{
        background: active
          ? "linear-gradient(135deg, #38BDF8 0%, #A855F7 100%)"
          : "linear-gradient(135deg, #3B4582 0%, #222856 100%)",
      }}
    >
      <div
        className={`clip-crystal-subcard relative h-full w-full ${innerClassName}`}
        style={{
          background: active
            ? "linear-gradient(160deg, #1E285C 0%, #141A3F 100%)"
            : "linear-gradient(160deg, #13183B 0%, #0D1029 100%)",
        }}
      >
        {children}
      </div>
    </div>
  );
};

/* ============================================================================
 * 3. BOTONES DE CRISTAL TALLADO (Sección "Botones" de Referencias_componentes.png)
 *    - "purple": Ver Perfil / Continuar / Personalizar
 *    - "cyan": Guardar / Inicio activo
 *    - "amber": Ver detalle / Ver recompensa
 *    - "dark": Cancelar / Opciones
 * ============================================================================ */
export type CrystalButtonVariant =
  | "purple"
  | "cyan"
  | "amber"
  | "dark"
  | "outline";

interface CrystalButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: CrystalButtonVariant;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export const CrystalButton: React.FC<CrystalButtonProps> = ({
  variant = "purple",
  size = "md",
  fullWidth = false,
  className = "",
  children,
  ...props
}) => {
  const effectiveVariant: Exclude<CrystalButtonVariant, "outline"> =
    variant === "outline" ? "purple" : variant;

  const stylesByVariant: Record<
    Exclude<CrystalButtonVariant, "outline">,
    {
      outerBorder: string;
      innerBg: string;
      topFacet: string;
      textColor: string;
      glow: string;
    }
  > = {
    purple: {
      outerBorder:
        "linear-gradient(180deg, #E9D5FF 0%, #7E22CE 50%, #4C1D95 100%)",
      innerBg:
        "linear-gradient(180deg, #A855F7 0%, #7E22CE 65%, #6B21A8 100%)",
      topFacet: "#C084FC",
      textColor: "text-white",
      glow: "shadow-[0_5px_18px_rgba(147,51,234,0.45)] hover:shadow-[0_7px_22px_rgba(168,85,247,0.65)]",
    },
    cyan: {
      outerBorder:
        "linear-gradient(180deg, #E0F2FE 0%, #0284C7 50%, #0369A1 100%)",
      innerBg:
        "linear-gradient(180deg, #38BDF8 0%, #06B6D4 65%, #0891B2 100%)",
      topFacet: "#7DD3FC",
      textColor: "text-[#071126]",
      glow: "shadow-[0_5px_18px_rgba(6,182,212,0.45)] hover:shadow-[0_7px_22px_rgba(56,189,248,0.65)]",
    },
    amber: {
      outerBorder:
        "linear-gradient(180deg, #FEF9C3 0%, #CA8A04 50%, #854D0E 100%)",
      innerBg:
        "linear-gradient(180deg, #FACC15 0%, #EAB308 65%, #CA8A04 100%)",
      topFacet: "#FEF08A",
      textColor: "text-[#0F1429]",
      glow: "shadow-[0_5px_18px_rgba(234,179,8,0.4)] hover:shadow-[0_7px_22px_rgba(250,204,21,0.6)]",
    },
    dark: {
      outerBorder:
        "linear-gradient(180deg, #56619E 0%, #272E5C 50%, #151936 100%)",
      innerBg:
        "linear-gradient(180deg, #262D59 0%, #191E40 65%, #121630 100%)",
      topFacet: "#3E4882",
      textColor: "text-slate-200",
      glow: "shadow-[0_4px_14px_rgba(0,0,0,0.5)] hover:brightness-115",
    },
  };

  const s = stylesByVariant[effectiveVariant];
  const sizePadding =
    size === "sm"
      ? "px-3.5 py-1.5 text-[11px]"
      : size === "lg"
      ? "px-5 py-3 text-sm"
      : "px-4 py-2 text-xs";

  return (
    <button
      type="button"
      className={`clip-crystal-btn group relative inline-flex items-center justify-center p-[2px] font-bold transition-all active:scale-[0.98] ${
        fullWidth ? "w-full" : ""
      } ${s.glow} ${className}`}
      style={{ background: s.outerBorder }}
      {...props}
    >
      <span
        className={`clip-crystal-btn relative inline-flex w-full items-center justify-center gap-2 font-avolisse tracking-wide ${sizePadding} ${s.textColor}`}
        style={{ background: s.innerBg }}
      >
        <span
          className="pointer-events-none absolute inset-x-3 top-0.5 h-[2px] opacity-70"
          style={{ backgroundColor: s.topFacet }}
        />
        {children}
      </span>
    </button>
  );
};

/* ============================================================================
 * 4. TAGS / ETIQUETAS HEXAGONALES (Sección "Tags / Etiquetas" de Referencias_componentes.png)
 * ============================================================================ */
export type CrystalTagVariant = "cyan" | "lime" | "amber" | "purple";

export const CrystalTag: React.FC<{
  label: string;
  variant?: CrystalTagVariant;
  className?: string;
}> = ({ label, variant = "cyan", className = "" }) => {
  const map: Record<
    CrystalTagVariant,
    { bg: string; border: string; text: string }
  > = {
    cyan: {
      border: "#67E8F9",
      bg: "linear-gradient(180deg, #06B6D4 0%, #0E7490 100%)",
      text: "text-white",
    },
    lime: {
      border: "#BEF264",
      bg: "linear-gradient(180deg, #84CC16 0%, #4D7C0F 100%)",
      text: "text-[#081C08]",
    },
    amber: {
      border: "#FEF08A",
      bg: "linear-gradient(180deg, #FACC15 0%, #CA8A04 100%)",
      text: "text-[#121629]",
    },
    purple: {
      border: "#D8B4FE",
      bg: "linear-gradient(180deg, #9333EA 0%, #581C87 100%)",
      text: "text-white",
    },
  };

  const st = map[variant];

  return (
    <span
      className={`clip-crystal-tag inline-flex shrink-0 items-center justify-center p-[1px] ${className}`}
      style={{ backgroundColor: st.border }}
    >
      <span
        className={`clip-crystal-tag px-2.5 py-0.5 text-[10px] font-extrabold tracking-wider uppercase ${st.text}`}
        style={{ background: st.bg }}
      >
        {label}
      </span>
    </span>
  );
};

/* ============================================================================
 * 5. BARRA DE PROGRESO BISELADA (Sección "Barra de progreso" de Referencias_componentes.png)
 * ============================================================================ */
export type CrystalProgressVariant = "lime-amber" | "cyan" | "purple" | "amber";

export const CrystalProgressBar: React.FC<{
  percent: number;
  variant?: CrystalProgressVariant;
  heightClass?: string;
}> = ({ percent, variant = "cyan", heightClass = "h-2.5" }) => {
  const clamped = Math.max(0, Math.min(100, percent));

  const gradients: Record<CrystalProgressVariant, string> = {
    "lime-amber": "linear-gradient(90deg, #84CC16 0%, #FACC15 100%)",
    cyan: "linear-gradient(90deg, #0891B2 0%, #38BDF8 65%, #A5F3FC 100%)",
    purple: "linear-gradient(90deg, #6D28D9 0%, #A855F7 70%, #E9D5FF 100%)",
    amber: "linear-gradient(90deg, #D97706 0%, #FACC15 70%, #FEF08A 100%)",
  };

  return (
    <div
      className={`clip-crystal-bar relative w-full p-[1.5px] ${heightClass}`}
      style={{
        background: "linear-gradient(180deg, #2E376E 0%, #1A2046 100%)",
      }}
    >
      <div className="clip-crystal-bar relative h-full w-full overflow-hidden bg-[#090C1F]">
        <div
          className="clip-crystal-bar h-full transition-all duration-500"
          style={{
            width: `${clamped}%`,
            background: gradients[variant],
          }}
        />
      </div>
    </div>
  );
};

/* ============================================================================
 * 6. ANILLO CIRCULAR DE PROGRESO GENERAL (Sección "Progreso General" de Referencias_componentes.png)
 * ============================================================================ */
export const CrystalCircularProgress: React.FC<{
  percent: number;
  size?: number;
  strokeWidth?: number;
}> = ({ percent, size = 84, strokeWidth = 9 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset =
    circumference -
    (Math.min(100, Math.max(0, percent)) / 100) * circumference;

  return (
    <div
      className="relative flex shrink-0 items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id="crystalCyanRingGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#1B224B"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#crystalCyanRingGrad)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="drop-shadow-[0_0_8px_rgba(56,189,248,0.55)] transition-all duration-500"
        />
      </svg>
      <span className="font-avolisse absolute text-lg text-white">
        {Math.round(percent)}%
      </span>
    </div>
  );
};

/* ============================================================================
 * 7. ICONO DE GEMA LOW-POLY EN ENCASTRE HEXAGONAL (Sección "Estadísticas" y "Últimas Misiones")
 * ============================================================================ */
export const CrystalGemIcon: React.FC<{
  type: "purple" | "amber" | "cyan" | "star";
  size?: "sm" | "md";
}> = ({ type, size = "md" }) => {
  const dim = size === "sm" ? "h-10 w-10" : "h-11 w-11";

  return (
    <div className={`relative flex shrink-0 items-center justify-center ${dim}`}>
      <svg viewBox="0 0 64 64" className="h-full w-full drop-shadow">
        <polygon
          points="32,2 58,17 58,47 32,62 6,47 6,17"
          fill="#0C1026"
          stroke="#35407D"
          strokeWidth="2.5"
        />

        {type === "purple" && (
          <g>
            <polygon points="32,10 48,24 32,54 16,24" fill="#9333EA" />
            <polygon points="32,10 48,24 32,28" fill="#D8B4FE" />
            <polygon points="32,10 16,24 32,28" fill="#C084FC" />
            <polygon points="32,28 48,24 32,54" fill="#6B21A8" />
          </g>
        )}

        {type === "amber" && (
          <g>
            <polygon points="32,10 46,32 32,54 18,32" fill="#EAB308" />
            <polygon points="32,10 46,32 32,32" fill="#FEF08A" />
            <polygon points="32,10 18,32 32,32" fill="#FACC15" />
            <polygon points="32,32 46,32 32,54" fill="#CA8A04" />
          </g>
        )}

        {type === "cyan" && (
          <g>
            <polygon
              points="32,12 48,18 44,40 32,52 20,40 16,18"
              fill="#0284C7"
              stroke="#38BDF8"
              strokeWidth="1.5"
            />
            <polygon
              points="32,16 43,21 40,38 32,47 24,38 21,21"
              fill="#38BDF8"
            />
            <polygon points="32,16 43,21 32,32" fill="#BAE6FD" />
          </g>
        )}

        {type === "star" && (
          <g>
            <polygon
              points="32,10 48,22 42,48 22,48 16,22"
              fill="#6D28D9"
            />
            <polygon
              points="32,15 36,26 47,26 38,33 41,44 32,37 23,44 26,33 17,26 28,26"
              fill="#F5F3FF"
            />
          </g>
        )}
      </svg>
    </div>
  );
};

/* ============================================================================
 * 8. MEDALLA ESCUDO HEXAGONAL PARA LOGROS (Sección "Logros Recientes" de Referencias_componentes.png)
 * ============================================================================ */
export const CrystalBadgeMedal: React.FC<{
  variant: "purple" | "amber" | "emerald" | "cyan";
  unlocked?: boolean;
}> = ({ variant, unlocked = true }) => {
  const palette = {
    purple: {
      rimOuter: "#C084FC",
      rimInner: "#6B21A8",
      core: "#9333EA",
      coreLight: "#E9D5FF",
    },
    amber: {
      rimOuter: "#FACC15",
      rimInner: "#B45309",
      core: "#0284C7",
      coreLight: "#FEF08A",
    },
    emerald: {
      rimOuter: "#4ADE80",
      rimInner: "#15803D",
      core: "#7E22CE",
      coreLight: "#C084FC",
    },
    cyan: {
      rimOuter: "#38BDF8",
      rimInner: "#0369A1",
      core: "#06B6D4",
      coreLight: "#BAE6FD",
    },
  }[variant];

  return (
    <svg
      viewBox="0 0 68 72"
      className={`h-12 w-12 shrink-0 drop-shadow-md ${
        unlocked ? "" : "grayscale opacity-50"
      }`}
    >
      <polygon
        points="34,2 62,16 58,50 34,68 10,50 6,16"
        fill={palette.rimInner}
        stroke={palette.rimOuter}
        strokeWidth="3"
      />
      <polygon
        points="34,9 55,20 52,47 34,61 16,47 13,20"
        fill="#111633"
        stroke={palette.rimOuter}
        strokeWidth="1.2"
      />
      <polygon
        points="34,15 48,26 44,44 34,54 24,44 20,26"
        fill={palette.core}
      />
      <polygon points="34,15 48,26 34,34" fill={palette.coreLight} />
      <polygon
        points="34,21 38,31 47,34 38,37 34,47 30,37 21,34 30,31"
        fill="#FFFFFF"
        opacity="0.85"
      />
    </svg>
  );
};

/* ============================================================================
 * 9. ILUSTRACIÓN DE CUMBRE DE CRISTALES LOW-POLY
 * ============================================================================ */
export const CrystalMountainCrestSvg: React.FC<{ className?: string }> = ({
  className = "h-10 w-14",
}) => (
  <svg viewBox="0 0 110 75" className={className}>
    <polygon points="6,68 55,56 104,68 55,74" fill="#84CC16" />
    <polygon points="55,56 104,68 55,74" fill="#4D7C0F" />
    <polygon points="18,65 36,22 52,65" fill="#2563EB" />
    <polygon points="36,22 52,65 42,65" fill="#60A5FA" />
    <polygon points="36,66 56,6 78,66" fill="#4F46E5" />
    <polygon points="56,6 78,66 62,66" fill="#38BDF8" />
    <polygon points="56,6 64,26 48,24" fill="#F8FAFC" />
    <polygon points="66,66 84,26 98,66" fill="#7C3AED" />
    <polygon points="84,26 98,66 88,66" fill="#C084FC" />
    <polygon points="22,66 28,44 36,66" fill="#06B6D4" />
  </svg>
);
