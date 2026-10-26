"use client";

import React, { useId } from "react";
import {
  BodyGenderType,
  EquipmentSetId,
  EquipmentSlotKey,
  PlayerAvatarConfig,
  SlotColorTriplet,
} from "../../models/entities/UserProgress.model";

/* ============================================================================
 * PERSONAJES Y PIEZAS 100% FIELES A References/Sets_Basics.png
 * ----------------------------------------------------------------------------
 * En lugar de redibujar a mano (lo que nunca iguala el render 3D low-poly de la
 * referencia), los personajes y las miniaturas se recortan directamente de la
 * lámina oficial `public/avatars/reference/sets-basics.png` (copia idéntica de
 * References/Sets_Basics.png). Así el diseño, la paleta y la perspectiva son
 * exactamente los de la referencia.
 *
 * Modularidad: el avatar se compone en 4 capas recortadas (pantalones, cuerpo,
 * manos y cabeza) tomadas del personaje del set equipado en cada ranura. Si las
 * 4 ranuras usan el mismo set, se muestra el render original completo.
 * ============================================================================ */

export const SETS_SHEET_SRC = "/avatars/reference/sets-basics.png";
const SHEET_W = 1312;
const SHEET_H = 1199;

/** Tamaño del recorte de cada personaje completo dentro de la lámina. */
const CHAR_W = 120;
const CHAR_H = 194;

/** Centro horizontal de cada personaje en la lámina (px). */
const CHAR_CENTER_X: Record<BodyGenderType, Record<EquipmentSetId, number>> = {
  male: { base: 117, set1: 380, set2: 632, set3: 883, set4: 1133 },
  female: { base: 115, set1: 380, set2: 632, set3: 880, set4: 1133 },
};

/** Línea inferior (bajo las zapatillas) de cada fila de personajes. */
const CHAR_FEET_Y: Record<BodyGenderType, number> = {
  male: 378,
  female: 898,
};

/** Margen superior a ocultar (evita el rótulo "SET BASE" de la lámina). */
const CHAR_TOP_SAFE: Record<BodyGenderType, Record<EquipmentSetId, number>> = {
  male: { base: 5, set1: 0, set2: 0, set3: 0, set4: 0 },
  female: { base: 12, set1: 0, set2: 0, set3: 0, set4: 0 },
};

/** Cortes anatómicos (en unidades del recorte 120×194) para componer capas. */
const BODY_CUTS: Record<
  BodyGenderType,
  { neck: number; waist: number; handTop: number; handBottom: number; inner: number }
> = {
  male: { neck: 48, waist: 108, handTop: 98, handBottom: 138, inner: 36 },
  female: { neck: 56, waist: 106, handTop: 104, handBottom: 146, inner: 37 },
};

/** Miniaturas de piezas (Cabeza, Cuerpo, Manos, Pantalones) en la lámina. */
const THUMB_W = 60;
const THUMB_H = 40;
const THUMB_CENTER_X: Record<EquipmentSetId, number> = {
  base: 87,
  set1: 351,
  set2: 605,
  set3: 853,
  set4: 1103,
};
const THUMB_CENTER_Y_MALE: Record<EquipmentSetId, Record<EquipmentSlotKey, number>> = {
  base: { head: 400, chest: 457, hands: 516, legs: 573 },
  set1: { head: 398, chest: 457, hands: 516, legs: 573 },
  set2: { head: 395, chest: 455, hands: 515, legs: 573 },
  set3: { head: 395, chest: 455, hands: 515, legs: 572 },
  set4: { head: 397, chest: 457, hands: 517, legs: 576 },
};
const FEMALE_ROW_OFFSET_Y = 522;

function charOrigin(gender: BodyGenderType, setId: EquipmentSetId) {
  return {
    x: CHAR_CENTER_X[gender][setId] - CHAR_W / 2,
    y: CHAR_FEET_Y[gender] - CHAR_H,
  };
}

function thumbOrigin(
  gender: BodyGenderType,
  setId: EquipmentSetId,
  slot: EquipmentSlotKey
) {
  const offset = gender === "female" ? FEMALE_ROW_OFFSET_Y : 0;
  return {
    x: THUMB_CENTER_X[setId] - THUMB_W / 2,
    y: THUMB_CENTER_Y_MALE[setId][slot] + offset - THUMB_H / 2,
  };
}

function safeId(raw: string) {
  return raw.replace(/[^a-zA-Z0-9_-]/g, "");
}

/** Máscara de bordes suaves para integrar el recorte con nuestros paneles. */
const EdgeMaskDefs: React.FC<{
  id: string;
  w: number;
  h: number;
  fadeX: number;
  fadeY: number;
}> = ({ id, w, h, fadeX, fadeY }) => (
  <>
    <linearGradient id={`${id}-fx`} x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stopColor="#fff" stopOpacity="0" />
      <stop offset={fadeX} stopColor="#fff" stopOpacity="1" />
      <stop offset={1 - fadeX} stopColor="#fff" stopOpacity="1" />
      <stop offset="1" stopColor="#fff" stopOpacity="0" />
    </linearGradient>
    <linearGradient id={`${id}-fy`} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#fff" stopOpacity="0" />
      <stop offset={fadeY} stopColor="#fff" stopOpacity="1" />
      <stop offset={1 - fadeY} stopColor="#fff" stopOpacity="1" />
      <stop offset="1" stopColor="#fff" stopOpacity="0" />
    </linearGradient>
    <mask id={`${id}-my`} maskUnits="userSpaceOnUse" x="0" y="0" width={w} height={h}>
      <rect x="0" y="0" width={w} height={h} fill={`url(#${id}-fy)`} />
    </mask>
    <mask id={`${id}-edge`} maskUnits="userSpaceOnUse" x="0" y="0" width={w} height={h}>
      <rect
        x="0"
        y="0"
        width={w}
        height={h}
        fill={`url(#${id}-fx)`}
        mask={`url(#${id}-my)`}
      />
    </mask>
  </>
);

/* ============================================================================
 * MINIATURA DE PIEZA (idéntica a las miniaturas de la lámina oficial)
 * ============================================================================ */
export const EquipmentPiecePreviewSvg: React.FC<{
  slot: EquipmentSlotKey;
  setId: EquipmentSetId;
  colors?: SlotColorTriplet;
  skinColor?: string;
  hairColor?: string;
  gender?: BodyGenderType;
  isolatedHeadgear?: boolean;
  className?: string;
}> = ({ slot, setId, gender = "male", className = "w-full h-full" }) => {
  const id = safeId(`thumb${useId()}`);
  const o = thumbOrigin(gender, setId, slot);
  return (
    <svg
      viewBox={`0 0 ${THUMB_W} ${THUMB_H}`}
      preserveAspectRatio="xMidYMid meet"
      className={`${className} select-none`}
      aria-hidden="true"
    >
      <defs>
        <EdgeMaskDefs id={id} w={THUMB_W} h={THUMB_H} fadeX={0.08} fadeY={0.1} />
      </defs>
      <g mask={`url(#${id}-edge)`}>
        <image
          href={SETS_SHEET_SRC}
          x={-o.x}
          y={-o.y}
          width={SHEET_W}
          height={SHEET_H}
          preserveAspectRatio="none"
        />
      </g>
    </svg>
  );
};

/* ============================================================================
 * PERSONAJE COMPLETO MODULAR (render original de Sets_Basics.png)
 * ============================================================================ */
export const PlayerLowPolyAvatar: React.FC<{
  config: PlayerAvatarConfig;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}> = ({ config, size = "md", className }) => {
  const id = safeId(`avatar${useId()}`);
  const gender: BodyGenderType =
    config.bodyType === "female" ? "female" : "male";

  const sizeClassMap: Record<"xs" | "sm" | "md" | "lg" | "xl", string> = {
    xs: "w-10 h-14",
    sm: "w-16 h-24",
    md: "w-28 h-40",
    lg: "w-44 h-64",
    xl: "w-56 h-80",
  };
  const resolvedClass = className || sizeClassMap[size];

  const c = BODY_CUTS[gender];
  const W = CHAR_W;
  const H = CHAR_H;

  const sheetImage = (setId: EquipmentSetId) => {
    const o = charOrigin(gender, setId);
    return (
      <image
        href={SETS_SHEET_SRC}
        x={-o.x}
        y={-o.y}
        width={SHEET_W}
        height={SHEET_H}
        preserveAspectRatio="none"
      />
    );
  };

  const allSame =
    config.headEquip === config.chestEquip &&
    config.chestEquip === config.handsEquip &&
    config.handsEquip === config.legsEquip;

  const headTop = CHAR_TOP_SAFE[gender][config.headEquip];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMax meet"
      className={`${resolvedClass} select-none overflow-visible`}
      role="img"
      aria-label="Personaje del jugador"
    >
      <defs>
        <EdgeMaskDefs id={id} w={W} h={H} fadeX={0.06} fadeY={0.025} />
        <clipPath id={`${id}-full`}>
          <rect x="0" y={headTop} width={W} height={H - headTop} />
        </clipPath>
        <clipPath id={`${id}-legs`}>
          <rect x="0" y={c.waist} width={W} height={H - c.waist} />
        </clipPath>
        <clipPath id={`${id}-chest`}>
          <polygon
            points={[
              `0,${c.neck}`,
              `${W},${c.neck}`,
              `${W},${c.handBottom}`,
              `${W - c.inner},${c.handBottom}`,
              `${W - c.inner},${c.waist}`,
              `${c.inner},${c.waist}`,
              `${c.inner},${c.handBottom}`,
              `0,${c.handBottom}`,
            ].join(" ")}
          />
        </clipPath>
        <clipPath id={`${id}-hands`}>
          <rect x="0" y={c.handTop} width={c.inner} height={c.handBottom - c.handTop} />
          <rect
            x={W - c.inner}
            y={c.handTop}
            width={c.inner}
            height={c.handBottom - c.handTop}
          />
        </clipPath>
        <clipPath id={`${id}-head`}>
          <rect x="0" y={headTop} width={W} height={c.neck - headTop} />
        </clipPath>
      </defs>

      <g mask={`url(#${id}-edge)`}>
        {allSame ? (
          <g clipPath={`url(#${id}-full)`}>{sheetImage(config.chestEquip)}</g>
        ) : (
          <>
            <g clipPath={`url(#${id}-legs)`}>{sheetImage(config.legsEquip)}</g>
            <g clipPath={`url(#${id}-chest)`}>{sheetImage(config.chestEquip)}</g>
            <g clipPath={`url(#${id}-hands)`}>{sheetImage(config.handsEquip)}</g>
            <g clipPath={`url(#${id}-head)`}>{sheetImage(config.headEquip)}</g>
          </>
        )}
      </g>
    </svg>
  );
};

