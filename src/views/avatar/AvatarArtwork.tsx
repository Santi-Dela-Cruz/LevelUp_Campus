"use client";

import React, { useId } from "react";
import { AppearancePalette, ConstructedCharacter, ConstructedModule, isConstructedSet } from "./ConstructedSets";
import type { BodyGenderType, EquipmentSetId, EquipmentSlotKey, PlayerAvatarConfig, SlotColorTriplet } from "../../models/entities/UserProgress.model";
import { SETS_BASICS_CATALOG, SLOT_LABELS } from "../../models/avatar/AvatarEquipment.model";
import { getReference, REFERENCE_ATLAS_SIZE, REFERENCE_ATLAS_URL, type Point, type Rect, type ReferenceCharacter } from "../../models/avatar/ReferenceAtlas.model";

/** Common registration for mixed equipment; complete outfits retain the original proportions. */
export const AVATAR_RIG = {
  viewBox: "0 0 240 340", neck: [120, 103], waist: [120, 190],
  wristLeft: [62, 198], wristRight: [178, 198], feet: [120, 325],
} as const;

export const PIECE_VIEWBOX: Record<EquipmentSlotKey, string> = {
  head: "18 6 204 120", chest: "10 90 220 170",
  hands: "24 181 192 64", legs: "42 182 156 156",
};

interface PieceProps {
  setId: EquipmentSetId; gender: BodyGenderType; colors: SlotColorTriplet;
  skinColor: string; hairColor: string;
}
const sourceImage = <image href={REFERENCE_ATLAS_URL} width={REFERENCE_ATLAS_SIZE.width}
  height={REFERENCE_ATLAS_SIZE.height} preserveAspectRatio="none" />;
const rectanglePath = ([x, y, width, height]: Rect) => `M${x} ${y}h${width}v${height}h-${width}Z`;

function handRect(reference: ReferenceCharacter, side: number, gender: BodyGenderType, setId: EquipmentSetId): Rect {
  if (gender === "female" && setId === "set1" && side === 1) return [398, 779, 38, 36];
  if (gender === "male" && setId === "set1" && side === 0) return [336, 291, 26, 30];
  const [x, y] = reference.wrists[side];
  return [x - 9, y - 2, 19, 25];
}

/** Source pixels, clipped to the silhouette and the selected garment. No replacement illustration. */
function ReferencePixels({ reference, region, subtract, part }: {
  reference: ReferenceCharacter; region?: string; subtract?: string; part: string;
}) {
  const id = useId().replace(/:/g, "");
  return <g data-part={part} data-source="Sets_Basics.png">
    <defs>
      <clipPath id={"silhouette-" + id} clipPathUnits="userSpaceOnUse">
        <path d={reference.outline} clipRule="evenodd" />
      </clipPath>
      {region && <clipPath id={"region-" + id} clipPathUnits="userSpaceOnUse"><path d={region} /></clipPath>}
      {subtract && <mask id={"cut-" + id} maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse"
        x={reference.center - 90} y={reference.top - 2} width="180" height={reference.bottom - reference.top + 5}>
        <rect x={reference.center - 90} y={reference.top - 2} width="180" height={reference.bottom - reference.top + 5} fill="white" />
        <path d={subtract} fill="black" />
      </mask>}
    </defs>
    <g clipPath={"url(#silhouette-" + id + ")"}>
      <g clipPath={region ? "url(#region-" + id + ")" : undefined}
        mask={subtract ? "url(#cut-" + id + ")" : undefined}>{sourceImage}</g>
    </g>
  </g>;
}

function bodyTransform(reference: ReferenceCharacter) {
  const sy = 87 / (reference.waist - reference.neck);
  return "translate(" + (120 - reference.center * 1.65) + " " + (103 - reference.neck * sy) + ") scale(1.65 " + sy + ")";
}
function normalizedWrist(reference: ReferenceCharacter, side: number): Point {
  const [x, y] = reference.wrists[side];
  return [120 + (x - reference.center) * 1.65, 103 + (y - reference.neck) * 87 / (reference.waist - reference.neck)];
}

export function AvatarModule({ slot, attachTo, ...props }: PieceProps & { slot: EquipmentSlotKey; attachTo?: EquipmentSetId }) {
  const { setId, gender, skinColor, hairColor } = props;
  if (isConstructedSet(setId)) return <g data-construction="vector" data-gender={gender}><AppearancePalette.Provider value={{skinColor, hairColor}}><ConstructedModule slot={slot} setId={setId} gender={gender} /></AppearancePalette.Provider></g>;
  const r = getReference(gender, setId);
  const c = r.center;
  const leftHand = rectanglePath(handRect(r, 0, gender, setId));
  const rightHand = rectanglePath(handRect(r, 1, gender, setId));
  if (slot === "hands") {
    const body = getReference(gender, attachTo ?? setId);
    return <g data-slot={slot} data-set={setId} data-gender={gender}>
      {([0, 1] as const).map(side => {
        const [sx, sy] = r.wrists[side];
        const [tx, ty] = normalizedWrist(body, side);
        return <g key={side} data-joint={side === 0 ? "wrist-left" : "wrist-right"}
          transform={"translate(" + (tx - sx * 1.65) + " " + (ty - sy * 1.65) + ") scale(1.65)"}>
          <ReferencePixels reference={r} region={side === 0 ? leftHand : rightHand}
            part={side === 0 ? "hand-left" : "hand-right"} />
        </g>;
      })}
    </g>;
  }
  let region: string, transform: string;
  if (slot === "head") {
    region = r.head;
    transform = "translate(" + (120 - c * 1.65) + " " + (103 - r.neck * 1.65) + ") scale(1.65)";
  } else if (slot === "chest") {
    const lowerLeft = setId === "set4" && gender === "male" ? [c - 45, r.waist, 23, r.coatBottom - r.waist] : null;
    const lowerRight = setId === "set4" && gender === "male" ? [c + 22, r.waist, 23, r.coatBottom - r.waist] : null;
    const belowWaist = lowerLeft && lowerRight
      ? rectanglePath(lowerLeft as unknown as Rect) + rectanglePath(lowerRight as unknown as Rect)
      : rectanglePath([c - 45, r.waist, 90, r.coatBottom - r.waist]);
    region = rectanglePath([c - 80, r.neck - 5, 160, r.waist - r.neck + 5]) + belowWaist;
    transform = bodyTransform(r);
  } else {
    region = "M" + (c - 27) + " " + (r.waist - 2) + "H" + (c + 27) + "L" + (c + 48) + " " + (r.bottom + 1) + "H" + (c - 48) + "Z";
    const sy = 135 / (r.bottom - r.waist);
    transform = "translate(" + (120 - c * 1.65) + " " + (190 - r.waist * sy) + ") scale(1.65 " + sy + ")";
  }
  return <g data-slot={slot} data-set={setId} data-gender={gender} transform={transform}>
    {slot === "legs" && r.hiddenLegTop && <path data-part="occluded-waist"
      d={"M" + (c - 23) + " " + (r.waist - 1) + "H" + (c + 23) + "L" + (c + 28) + " " + (r.hiddenLegTop.bottom + 2) + "H" + (c - 28) + "Z"}
      fill={r.hiddenLegTop.color} />}
    <ReferencePixels reference={r} part={slot} region={region}
      subtract={slot === "chest" ? r.head + leftHand + rightHand
        : slot === "legs" && r.hiddenLegTop ? rectanglePath([c - 55, r.waist - 3, 110, r.hiddenLegTop.bottom - r.waist + 3]) : undefined} />
  </g>;
}

export function EquipmentPiecePreviewSvg({ slot, setId, gender = "male", skinColor, hairColor, eyeColor }: {
  slot: EquipmentSlotKey; setId: EquipmentSetId; colors: SlotColorTriplet;
  skinColor?: string; hairColor?: string; eyeColor?: string; gender?: BodyGenderType; isolatedHeadgear?: boolean;
}) {
  const id = useId().replace(/:/g, "");
  if (isConstructedSet(setId)) return <svg xmlns="http://www.w3.org/2000/svg" viewBox={PIECE_VIEWBOX[slot]}
    className="h-full w-full" role="img" data-vector-preview={slot} data-set={setId}
    aria-label={SLOT_LABELS[slot] + " · " + SETS_BASICS_CATALOG[setId].pieceNames[gender][slot]}>
    <AppearancePalette.Provider value={{skinColor, hairColor, eyeColor}}><ConstructedModule slot={slot} setId={setId} gender={gender} /></AppearancePalette.Provider>
  </svg>;
  const [x, y, width, height] = getReference(gender, setId).icons[slot];
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox={[x, y, width, height].join(" ")}
    className="h-full w-full" role="img" data-reference-preview={slot} data-set={setId}
    aria-label={SLOT_LABELS[slot] + " · " + SETS_BASICS_CATALOG[setId].pieceNames[gender][slot]}>
    <defs><clipPath id={"icon-" + id}><rect x={x} y={y} width={width} height={height} /></clipPath></defs>
    <g clipPath={"url(#icon-" + id + ")"}>{sourceImage}</g>
  </svg>;
}

export function PlayerLowPolyAvatar({ config, size = "md", className }: {
  config: PlayerAvatarConfig; size?: "xs" | "sm" | "md" | "lg" | "xl"; className?: string;
}) {
  const sizes = { xs: "w-10 h-12", sm: "w-16 h-20", md: "w-28 h-32", lg: "w-44 h-56", xl: "w-56 h-72" };
  const tintId = useId().replace(/:/g, "");
  const equipped: Record<EquipmentSlotKey, EquipmentSetId> = {
    head: config.headEquip, chest: config.chestEquip, hands: config.handsEquip, legs: config.legsEquip,
  };
  const complete = Object.values(equipped).every(set => set === config.headEquip);
  if (Object.values(equipped).every(isConstructedSet)) return <svg xmlns="http://www.w3.org/2000/svg" viewBox={AVATAR_RIG.viewBox}
    className={(className || sizes[size]) + " select-none"} role="img"
    aria-label={"Personaje " + (config.bodyType === "female" ? "femenino" : "masculino") + " construido con geometría vectorial modular"}
    data-avatar-body={config.bodyType} data-palette={tintId} data-renderer="constructed-vector" data-complete-set={complete ? config.headEquip : undefined}>
    <g>
      <ConstructedCharacter config={config} />
    </g>
  </svg>;
  const reference = getReference(config.bodyType, config.headEquip);
  const scale = 300 / (reference.bottom - reference.top);
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox={AVATAR_RIG.viewBox}
    className={(className || sizes[size]) + " select-none"} role="img"
    aria-label={"Personaje " + (config.bodyType === "female" ? "femenino" : "masculino") + " con vestimenta modular"}
    data-avatar-body={config.bodyType} data-renderer="reference-atlas" data-complete-set={complete ? config.headEquip : undefined}>
    {complete
      ? <g transform={"translate(" + (120 - reference.center * scale) + " " + (325 - reference.bottom * scale) + ") scale(" + scale + ")"}>
          <ReferencePixels reference={reference} part="complete-reference-character" />
        </g>
      : (["legs", "head", "chest", "hands"] as EquipmentSlotKey[]).map(slot =>
        <AvatarModule key={slot} slot={slot} setId={equipped[slot]} attachTo={config.chestEquip}
          gender={config.bodyType} colors={config.slotColors?.[slot] ?? SETS_BASICS_CATALOG[equipped[slot]].defaultColors[slot]}
          skinColor={config.skinColor} hairColor={config.hairColor} />)}
  </svg>;
}
