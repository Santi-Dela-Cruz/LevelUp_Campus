"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CONSTRUCTED_SETS } from "./ConstructedSets";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  ChevronRight,
  Edit3,
  Maximize2,
  RotateCcw,
  Sparkles,
  X,
} from "lucide-react";
import {
  BodyGenderType,
  EquipmentSetId,
  EquipmentSlotKey,
  PlayerAvatarConfig,
  SlotColorTriplet,
  StudentProgressEntity,
} from "../../models/entities/UserProgress.model";
import {
  CrystalButton,
  CrystalPanel,
  CrystalProgressBar,
  CrystalTag,
} from "../components/LowPolyUI";

import { EQUIPMENT_OPTIONS_IDS, SETS_BASICS_CATALOG, getSetSlotLabel, getSetGeneralName, canEquipSet, createSetAvatar } from "../../models/avatar/AvatarEquipment.model";
import { CustomColorPicker } from "./CustomColorPicker";
export { hsvToHex } from "../../shared/colorPicker";
import { shadeHex } from "../../shared/avatarColor";
import { PlayerLowPolyAvatar, EquipmentPiecePreviewSvg } from "./AvatarArtwork";
export { PlayerLowPolyAvatar, EquipmentPiecePreviewSvg } from "./AvatarArtwork";
export { EQUIPMENT_OPTIONS_IDS, SETS_BASICS_CATALOG, getSetSlotLabel, getSetGeneralName } from "../../models/avatar/AvatarEquipment.model";
export type { SetCatalogMeta } from "../../models/avatar/AvatarEquipment.model";
export { shadeHex } from "../../shared/avatarColor";

export const SKIN_TONE_PRESETS = [
  "#FFE3C6",
  "#F3C39A",
  "#DFA678",
  "#B97C50",
  "#7B4B2A",
];

export const HAIR_AND_ACCENT_PRESETS = [
  "#4A2E1B",
  "#26150B",
  "#EAB308",
  "#7C3AED",
  "#2563EB",
  "#EC4899",
  "#CBD5E1",
];

export const EYE_COLOR_PRESETS = [
  "#35356D",
  "#4D5EA4",
  "#3F7A5A",
  "#6B4E2E",
  "#4A9BC5",
  "#7C3AED",
];

/* ============================================================================
 * 2. CÍRCULO DE COLOR LOW-POLY FACETADO (Fiel a Distributio_Personalite.png)
 * ============================================================================ */
export const FacetedColorSwatch: React.FC<{
  color: string;
  active?: boolean;
  onClick: () => void;
  title?: string;
  size?: "sm" | "md";
}> = ({ color, active = false, onClick, title, size = "md" }) => {
  const cLight = shadeHex(color, 1.2);
  const cDark = shadeHex(color, 0.78);
  const dim = size === "sm" ? "h-7 w-7" : "h-8 w-8";
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`group relative rounded-full p-0.5 transition-all ${
        active
          ? "ring-2 ring-cyan-400 ring-offset-2 ring-offset-[#090F24] scale-110 shadow-[0_0_14px_rgba(34,211,238,0.65)]"
          : "opacity-90 hover:opacity-100 hover:scale-105"
      }`}
    >
      <svg viewBox="0 0 36 36" className={`${dim} rounded-full overflow-hidden`}>
        <circle cx="18" cy="18" r="17" fill={color} />
        <polygon points="18,1 35,12 24,19 12,11" fill={cLight} opacity="0.7" />
        <polygon points="1,16 12,11 20,24 6,31" fill={color} />
        <polygon
          points="24,19 35,12 35,28 18,35 6,31 20,24"
          fill={cDark}
          opacity="0.75"
        />
        <circle
          cx="18"
          cy="18"
          r="16.5"
          fill="none"
          stroke="rgba(255,255,255,0.28)"
          strokeWidth="1"
        />
      </svg>
    </button>
  );
};

/* ============================================================================
 * Utilidades del inspector de color. El dibujo está en AvatarArtwork.
 * ============================================================================ */
function getSlotColor(
  config: PlayerAvatarConfig,
  slot: EquipmentSlotKey
): SlotColorTriplet {
  const slotId =
    slot === "head"
      ? config.headEquip
      : slot === "chest"
      ? config.chestEquip
      : slot === "hands"
      ? config.handsEquip
      : config.legsEquip;
  const fallback = SETS_BASICS_CATALOG[slotId].defaultColors[slot];
  return config.slotColors?.[slot] || fallback;
}

const SlotHexagonIconSvg: React.FC<{
  slot: EquipmentSlotKey;
  active: boolean;
}> = ({ slot, active }) => {
  const strokeColor = active ? "#22D3EE" : "#A855F7";
  const fillBg = active
    ? "rgba(6, 182, 212, 0.18)"
    : "rgba(124, 58, 237, 0.14)";
  const iconFill = active ? "#38BDF8" : "#C084FC";

  return (
    <svg viewBox="0 0 48 48" className="w-11 h-11 shrink-0 overflow-visible">
      <polygon
        points="24,3 43,13.5 43,34.5 24,45 5,34.5 5,13.5"
        fill={fillBg}
        stroke={strokeColor}
        strokeWidth="2.2"
      />
      <polygon
        points="24,6 40,15 40,33 24,42 8,33 8,15"
        fill="none"
        stroke="#FFFFFF"
        strokeOpacity="0.16"
        strokeWidth="1"
      />
      {slot === "head" && (
        <path
          d="M17 21C17 16.5 20 14 24 14C28 14 31 16.5 31 21V26C31 29.5 28 33 24 33C20 33 17 29.5 17 26V21Z"
          fill={iconFill}
        />
      )}
      {slot === "chest" && (
        <path
          d="M18 15L21 17H27L30 15L35 19L32 24L29 22V33H19V22L16 24L13 19L18 15Z"
          fill={iconFill}
        />
      )}
      {slot === "hands" && (
        <path
          d="M18 22V15.5C18 14.7 18.7 14 19.5 14C20.3 14 21 14.7 21 15.5V20H22V14.5C22 13.7 22.7 13 23.5 13C24.3 13 25 13.7 25 14.5V20H26V15.5C26 14.7 26.7 14 27.5 14C28.3 14 29 14.7 29 15.5V22.5L31 20.5C31.7 20 32.6 20.2 33 21C33.3 21.6 33.1 22.4 32.6 23L28.5 29.5C27.5 31 25.8 32 24 32H21.5C19.5 32 18 30.4 18 28.4V22Z"
          fill={iconFill}
        />
      )}
      {slot === "legs" && (
        <path
          d="M18 14H30L31.5 33H26L24.5 22H23.5L22 33H16.5L18 14Z"
          fill={iconFill}
        />
      )}
    </svg>
  );
};

const SubCategoryTabIconSvg: React.FC<{
  slot: EquipmentSlotKey;
  setId: EquipmentSetId;
  active: boolean;
}> = ({ slot, setId, active }) => {
  const c = active ? "#38BDF8" : "#94A3B8";
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4">
      {slot === "head" && setId === "base" && (
        <path
          d="M6 12C6 8.5 8.5 6 12 6C15.5 6 18 8.5 18 12V15H16V11H8V15H6V12Z"
          fill={c}
        />
      )}
      {slot === "head" && setId === "set1" && (
        <g stroke={c} strokeWidth="2" fill="none">
          <rect x="3" y="9" width="7" height="6" rx="1.5" />
          <rect x="14" y="9" width="7" height="6" rx="1.5" />
          <line x1="10" y1="12" x2="14" y2="12" />
        </g>
      )}
      {slot === "head" && setId === "set2" && (
        <path
          d="M5 14C5 9.5 8 7 12 7C16 7 19 9.5 19 14H22V16H5V14Z"
          fill={c}
        />
      )}
      {slot === "head" && setId === "set3" && (
        <polygon
          points="4,9 20,9 18,16 12,17 6,16"
          fill="none"
          stroke={c}
          strokeWidth="2"
        />
      )}
      {slot === "head" && setId === "set4" && (
        <path d="M2 16H22L19 13H17L15 8L12 9.5L9 8L7 13H5L2 16Z" fill={c} />
      )}
      {slot !== "head" && (
        <polygon
          points="12,3 20,8 20,16 12,21 4,16 4,8"
          fill="none"
          stroke={c}
          strokeWidth="2"
        />
      )}
    </svg>
  );
};

// ============================================================================
// 6. COMPONENTE DE VISTA: PERFIL DEL JUGADOR Y PERSONALIZACIÓN MODULAR 3D
//    (Inspirado a References/Distributio_Personalite.png y Sets_Basics.png)
// ============================================================================

export interface PlayerProfileViewProps {
  studentProgress: StudentProgressEntity;
  onUpdateAvatar: (partialAvatar: Partial<PlayerAvatarConfig>) => void;
  onUpdateStudentName: (newName: string) => void;
  onMascotTrigger?: (message: string) => void;
}

export const PlayerProfileView: React.FC<PlayerProfileViewProps> = ({
  studentProgress,
  onUpdateAvatar,
  onUpdateStudentName,
  onMascotTrigger,
}) => {
  const { avatar, studentName } = studentProgress;
  const [previewAvatar, setPreviewAvatar] = useState<PlayerAvatarConfig | null>(null);
  const displayAvatar = previewAvatar ?? avatar;
  useEffect(() => { setPreviewAvatar(null); }, [avatar]);
  const updateAppearance = (partial: Partial<PlayerAvatarConfig>) => {
    setPreviewAvatar(current => ({ ...(current ?? avatar), ...partial }));
    setSaveToastVisible(false);
    setSaveError("");
  };
  const catalogList = CONSTRUCTED_SETS.map(
    (id) => SETS_BASICS_CATALOG[id]
  );

  const [saveError, setSaveError] = useState("");
  const [saveToastVisible, setSaveToastVisible] = useState<boolean>(false);

  // Edición de nombre del jugador ("Santi")
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [tempName, setTempName] = useState<string>(studentName || "Santi");

  // Ranura modular activa en el panel izquierdo y en el inspector derecho
  const [activeSlot, setActiveSlot] = useState<EquipmentSlotKey>("head");

  // Modal de Lámina Oficial de Sets (Sets_Basics.png)
  const [showDesignSheetModal, setShowDesignSheetModal] =
    useState<boolean>(false);

  const [catalogGender, setCatalogGender] = useState<BodyGenderType>(avatar.bodyType);
  const dialogRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!showDesignSheetModal) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;
    dialog?.querySelector<HTMLButtonElement>("button")?.focus({ preventScroll: true });
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); setShowDesignSheetModal(false); }
      if (event.key !== "Tab" || !dialog) return;
      const items = Array.from(dialog.querySelectorAll<HTMLElement>("button:not(:disabled), input:not(:disabled), [tabindex='0']"));
      const first = items[0], last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => { document.removeEventListener("keydown", onKeyDown); previousFocus?.focus({ preventScroll: true }); };
  }, [showDesignSheetModal]);

  const getEquippedForSlot = (slot: EquipmentSlotKey): EquipmentSetId => {
    if (slot === "head") return displayAvatar.headEquip;
    if (slot === "chest") return displayAvatar.chestEquip;
    if (slot === "hands") return displayAvatar.handsEquip;
    return displayAvatar.legsEquip;
  };

  const activeVariantId = getEquippedForSlot(activeSlot);
  const activeSetMeta = SETS_BASICS_CATALOG[activeVariantId];
  const hasLockedEquipment = [displayAvatar.headEquip, displayAvatar.chestEquip, displayAvatar.handsEquip, displayAvatar.legsEquip]
    .some(setId => !canEquipSet(setId, studentProgress.level));

  const handleSelectSlot = (slot: EquipmentSlotKey) => setActiveSlot(slot);

  // Equipa una pieza de los 5 sets y carga su paleta oficial de Sets_Basics.png
  const handleSelectPieceVariant = (
    slot: EquipmentSlotKey,
    variantId: EquipmentSetId
  ) => {
    const key = { head: "headEquip", chest: "chestEquip", hands: "handsEquip", legs: "legsEquip" }[slot];
    setPreviewAvatar(current => {
      const next = current ?? avatar;
      return { ...next, [key]: variantId, slotColors: { ...next.slotColors, [slot]: { ...SETS_BASICS_CATALOG[variantId].defaultColors[slot] } } };
    });
    setSaveToastVisible(false);
  };

  const handleEquipFullSet = (setId: EquipmentSetId) => {
    if (!canEquipSet(setId, studentProgress.level)) return;
    setPreviewAvatar(createSetAvatar(setId, displayAvatar.bodyType, displayAvatar));
    setSaveToastVisible(false);
  };

  // Cambia entre Masculino y Femenino adaptando las paletas oficiales
  const handleSelectBodyGender = (gender: BodyGenderType) => {
    updateAppearance({
      bodyType: gender,
    });
  };

  // Restablece al Set Base Universitario gratuito
  const handleResetToBaseCharacter = () => {
    setPreviewAvatar(createSetAvatar("base", displayAvatar.bodyType));
    setSaveToastVisible(false);
  };

  const handleSaveName = () => {
    if (tempName.trim()) {
      onUpdateStudentName(tempName.trim());
    }
    setIsEditingName(false);
  };

  const handleSaveChanges = () => {
    if (hasLockedEquipment) return;
    const avatarToSave = previewAvatar ?? avatar;
    try {
      localStorage.setItem("player-avatar", JSON.stringify(avatarToSave));
    } catch {
      setSaveError("No se pudo guardar. Comprueba el almacenamiento del navegador e inténtalo de nuevo.");
      return;
    }
    onUpdateAvatar(avatarToSave);
    setSaveError("");
    setPreviewAvatar(null);
    setSaveToastVisible(true);
    if (onMascotTrigger) {
      onMascotTrigger("¡Tu equipamiento ha quedado guardado para la aventura!");
    }
    setTimeout(() => setSaveToastVisible(false), 2600);
  };

  const handleCancelChanges = () => {
    setPreviewAvatar(null);
    setSaveToastVisible(false);
    setSaveError("");
  };

  // Etiquetas de las 4 ranuras modulares (SIN subtítulos debajo, tal como pidió el usuario)
  const SLOT_LABELS: Record<EquipmentSlotKey, string> = {
    head: "Cabeza",
    chest: "Cuerpo",
    hands: "Manos",
    legs: "Pantalones",
  };

  return (
    <div className="profile-layout w-full grid grid-cols-12 gap-4 select-none">
      {/* =====================================================================
       * COLUMNA IZQUIERDA (4 cols): ESCENARIO DEL PERSONAJE + BOTONES INFERIORES
       * ===================================================================== */}
      <div className="lg:col-span-4 flex flex-col gap-3 h-full min-h-0">
        <CrystalPanel
          cornerDecor="none"
          className="flex-1 min-h-0"
          contentClassName="p-4 xl:p-5 flex flex-col justify-between h-full relative overflow-hidden"
        >
          {/* Cabecera Superior: Nombre "Santi" + Nivel 5 + Botones en Cápsula Derecha */}
          <div className="relative z-20 flex items-start justify-between gap-2 shrink-0">
            <div>
              {isEditingName ? (
                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSaveName()}
                    className="w-32 px-2.5 py-1 rounded-lg bg-[#0A0E24] border border-cyan-400/60 text-base font-display text-white focus:outline-none"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={handleSaveName}
                    className="px-2 py-1 rounded-md bg-cyan-500/25 border border-cyan-400/50 text-xs font-bold text-cyan-200"
                  >
                    ✓
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl xl:text-[28px] font-display text-white tracking-wide leading-none drop-shadow">
                    {studentName || "Santi"}
                  </h2>
                  <button
                    type="button"
                    onClick={() => {
                      setTempName(studentName || "Santi");
                      setIsEditingName(true);
                    }}
                    title="Editar nombre"
                    className="w-6 h-6 rounded-md bg-[#161E42]/90 hover:bg-cyan-500/20 border border-indigo-400/30 hover:border-cyan-400/50 flex items-center justify-center text-slate-300 hover:text-cyan-200 transition-colors"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="w-3.5 h-3.5 fill-none stroke-current"
                      strokeWidth="2"
                    >
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                  </button>
                </div>
              )}

              <p className="text-xs font-extrabold text-slate-200 mt-1.5 mb-1">
                Nivel {studentProgress.level}
              </p>
              <div className="w-28 xl:w-32">
                <CrystalProgressBar percent={studentProgress.currentXp / studentProgress.nextLevelXp * 100} variant="cyan" heightClass="h-2" />
              </div>
            </div>

            {/* Cápsula Vertical Derecha: Resetear Personaje Base y Ver Lámina 5 Sets */}
            <div className="flex flex-col rounded-xl bg-[#0D132E]/90 border border-indigo-400/30 shadow-lg overflow-hidden">
              <button
                type="button"
                onClick={handleResetToBaseCharacter}
                title="Restablecer al Set Base Universitario"
                className="w-9 h-9 flex items-center justify-center text-slate-300 hover:text-cyan-300 hover:bg-cyan-500/15 transition-colors border-b border-indigo-500/25"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 fill-none stroke-current"
                  strokeWidth="2.2"
                >
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setShowDesignSheetModal(true)}
                title="Ver Lámina de los sets construidos (Masculino y Femenino)"
                className="w-9 h-9 flex items-center justify-center text-slate-300 hover:text-cyan-300 hover:bg-cyan-500/15 transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 fill-none stroke-current"
                  strokeWidth="2.2"
                >
                  <polyline points="15 3 21 3 21 9" />
                  <polyline points="9 21 3 21 3 15" />
                  <line x1="21" y1="3" x2="14" y2="10" />
                  <line x1="3" y1="21" x2="10" y2="14" />
                </svg>
              </button>
            </div>
          </div>

          {/* =================================================================
           * CONTENEDOR CENTRAL DEL PERSONAJE + PEDESTAL (100% CENTRADO VERTICALMENTE)
           * ================================================================= */}
          <div className="relative z-10 flex-1 min-h-0 flex flex-col items-center justify-center my-auto py-2">
            <div className="relative flex flex-col items-center justify-center w-full max-w-[330px]">
              {/* Halo ambiental detrás del personaje */}
              <div
                className="w-52 h-52 rounded-full blur-3xl opacity-25 pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  backgroundColor: getSlotColor(displayAvatar, "chest").primary,
                }}
              />

              {/* Arte original del atlas de referencia. */}
              <motion.div
                key={`${displayAvatar.bodyType}-${displayAvatar.headEquip}-${displayAvatar.chestEquip}-${displayAvatar.handsEquip}-${displayAvatar.legsEquip}`}
                initial={{ scale: 0.96, opacity: 0.88 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="relative z-20 w-[215px] h-[255px] xl:w-[242px] xl:h-[285px] flex items-center justify-center -mb-7"
              >
                <PlayerLowPolyAvatar
                  config={displayAvatar}
                  className="w-full h-full"
                />
              </motion.div>

              {/* Pedestal de Roca y Cristales 3D Integrado con los Pies del Personaje */}
              <svg
                viewBox="0 0 360 110"
                className="w-full h-[88px] xl:h-[98px] relative z-10 pointer-events-none overflow-visible"
              >
                <defs>
                  <linearGradient
                    id="pedTopGrad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#1E3A8A" />
                    <stop offset="50%" stopColor="#2563EB" />
                    <stop offset="100%" stopColor="#1E1B4B" />
                  </linearGradient>
                </defs>

                {/* Cristales Púrpura/Cian Izquierdos */}
                <polygon
                  points="18,74 34,20 52,68"
                  fill="#6D28D9"
                  opacity="0.88"
                />
                <polygon points="34,20 52,68 42,72" fill="#4C1D95" />
                <polygon
                  points="38,76 52,38 66,72"
                  fill="#7C3AED"
                  opacity="0.92"
                />
                <polygon
                  points="56,64 68,50 76,68"
                  fill="#2563EB"
                  opacity="0.75"
                />

                {/* Cristales Púrpura/Azul Derechos */}
                <polygon
                  points="292,70 318,28 338,76"
                  fill="#5B21B6"
                  opacity="0.85"
                />
                <polygon
                  points="270,66 290,8 312,66"
                  fill="#312E81"
                  opacity="0.85"
                />
                <polygon points="290,8 312,66 296,68" fill="#1E1B4B" />
                <polygon
                  points="308,74 326,28 342,72"
                  fill="#6D28D9"
                  opacity="0.9"
                />

                {/* Plataforma Hexagonal Low-Poly */}
                <polygon
                  points="68,46 180,28 292,46 256,68 104,68"
                  fill="url(#pedTopGrad)"
                  stroke="#38BDF8"
                  strokeWidth="2.2"
                />
                {/* Sombra elíptica bajo las zapatillas */}
                <ellipse
                  cx="180"
                  cy="49"
                  rx="64"
                  ry="10"
                  fill="#050814"
                  opacity="0.6"
                />
                {/* Caras rocosas inferiores del pedestal */}
                <polygon points="68,46 104,68 116,92 84,78" fill="#1E1B4B" />
                <polygon
                  points="104,68 180,68 180,96 116,92"
                  fill="#17153B"
                />
                <polygon
                  points="180,68 256,68 244,92 180,96"
                  fill="#0F172A"
                />
                <polygon
                  points="256,68 292,46 276,78 244,92"
                  fill="#090D1A"
                />
              </svg>
            </div>
          </div>

          {/* Espaciador inferior sutil para equilibrar el centrado vertical */}
          <div className="h-2 shrink-0" />
        </CrystalPanel>

        {/* Botones Inferiores con nuestros componentes CrystalButton */}
        <div className="grid grid-cols-12 gap-2.5 shrink-0">
          <div className="col-span-5">
            <CrystalButton
              variant="dark"
              size="lg"
              fullWidth
              onClick={handleCancelChanges}
            >
              <span className="flex items-center gap-2 text-base">
                <RotateCcw className="w-5 h-5" />
                <span>Cancelar</span>
              </span>
            </CrystalButton>
          </div>
          <div className="col-span-7">
            <CrystalButton
              variant="cyan"
              size="lg"
              fullWidth
              title={hasLockedEquipment ? "Esta prenda todavía no está disponible" : "Guardar personalización"}
              onClick={handleSaveChanges}
              disabled={hasLockedEquipment}
              className="disabled:opacity-40"
            >
              <span className="flex items-center gap-2 text-base">
                <Check className="w-5 h-5" />
                <span>
                  {saveToastVisible
                    ? "¡Cambios guardados!"
                    : "Guardar cambios"}
                </span>
              </span>
            </CrystalButton>
          </div>
        </div>
        {saveError && <p role="alert" className="text-xs text-amber-200">{saveError}</p>}
      </div>

      {/* =====================================================================
       * COLUMNA DERECHA (8 cols): PANEL DE PERSONALIZACIÓN MODULAR
       *                           (Fiel a References/Distributio_Personalite.png)
       * ===================================================================== */}
      <CrystalPanel
        cornerDecor="crystals"
        className="lg:col-span-8 h-full min-h-0"
        contentClassName="p-4 xl:p-5 flex flex-col gap-3.5 h-full min-h-0"
      >
        {/* 1. BARRA SUPERIOR: Masculino / Femenino (CrystalButton) + Tono de Piel */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-indigo-500/25 shrink-0">
          {/* Botones de Género usando nuestro CrystalButton */}
          <div className="flex items-center gap-2.5">
            <CrystalButton
              variant={displayAvatar.bodyType === "male" ? "cyan" : "dark"}
              size="lg"
              onClick={() => handleSelectBodyGender("male")}
            >
              <span className="flex items-center gap-1.5">
                <span className="text-sm leading-none">♂</span>
                <span>Masculino</span>
              </span>
            </CrystalButton>
            <CrystalButton
              variant={displayAvatar.bodyType === "female" ? "cyan" : "dark"}
              size="lg"
              onClick={() => handleSelectBodyGender("female")}
            >
              <span className="flex items-center gap-1.5">
                <span className="text-sm leading-none">♀</span>
                <span>Femenino</span>
              </span>
            </CrystalButton>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-200">Tono de piel</span>
            <div className="flex items-center gap-2">
              {SKIN_TONE_PRESETS.map(color => (
                <FacetedColorSwatch
                  key={color}
                  color={color}
                  active={displayAvatar.skinColor === color}
                  onClick={() => updateAppearance({ skinColor: color })}
                  title={`Tono de piel ${color}`}
                  size="md"
                />
              ))}
              <CustomColorPicker color={displayAvatar.skinColor} onChange={color => updateAppearance({ skinColor: color })} label="Elegir tono de piel personalizado" />
            </div>
          </div>
        </div>

        {/* 2. ÁREA CENTRAL DE 2 SUB-COLUMNAS: 4 RANURAS (Izquierda) + INSPECTOR DE 5 SETS (Derecha) */}
        <div className="profile-inspector flex-1 min-h-0 grid grid-cols-12 gap-3.5">
          {/* SUB-COLUMNA IZQUIERDA (4 cols): Las 4 Tarjetas de Ranura SIN subtítulo debajo */}
          <div className="md:col-span-4 flex flex-col justify-between gap-2.5 h-full min-h-0">
            {(["head", "chest", "hands", "legs"] as EquipmentSlotKey[]).map(
              (slotKey) => {
                const isSelected = activeSlot === slotKey;
                const equippedVar = getEquippedForSlot(slotKey);
                const slotColors = getSlotColor(displayAvatar, slotKey);

                return (
                  <button
                    key={slotKey}
                    type="button"
                    onClick={() => handleSelectSlot(slotKey)}
                    className={`w-full flex-1 min-h-0 px-4 xl:px-5 py-3 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 relative overflow-hidden ${
                      isSelected
                        ? "bg-gradient-to-r from-[#132347] via-[#152042] to-[#1A1A40] border-cyan-400/90 shadow-[0_0_20px_rgba(34,211,238,0.22)]"
                        : "bg-[#0E1530]/90 hover:bg-[#141D3F] border-indigo-500/25 hover:border-indigo-400/45"
                    }`}
                  >
                    {/* Izquierda: Icono Hexagonal + ÚNICAMENTE el título de la ranura */}
                    <div className="flex items-center gap-3.5 min-w-0">
                      <SlotHexagonIconSvg slot={slotKey} active={isSelected} />
                      <p className="text-xl xl:text-[26px] font-display text-white tracking-wide leading-none">
                        {SLOT_LABELS[slotKey]}
                      </p>
                    </div>

                    {/* Derecha: Miniatura 3D de la pieza equipada + Chevron '>' */}
                    <div className="flex items-center gap-2.5 shrink-0">
                      <div
                        className={`w-16 h-16 xl:w-[76px] xl:h-[76px] rounded-xl bg-[#090E22] border flex items-center justify-center p-1.5 ${
                          isSelected
                            ? "border-cyan-400/80 shadow-[0_0_10px_rgba(34,211,238,0.25)]"
                            : "border-indigo-500/30"
                        }`}
                      >
                        <div className="w-14 h-14 xl:w-[68px] xl:h-[68px]">
                          <EquipmentPiecePreviewSvg
                            slot={slotKey}
                            setId={equippedVar}
                            gender={displayAvatar.bodyType}
                            skinColor={displayAvatar.skinColor}
                            hairColor={displayAvatar.hairColor}
                            eyeColor={displayAvatar.eyeColor}
                            colors={slotColors}
                          />
                        </div>
                      </div>
                      <span
                        className={`text-sm font-bold transition-transform ${
                          isSelected
                            ? "text-cyan-300 translate-x-0.5"
                            : "text-slate-500"
                        }`}
                      >
                        ❯
                      </span>
                    </div>
                  </button>
                );
              }
            )}
          </div>

          {/* SUB-COLUMNA DERECHA (8 cols): Inspector con SOLO 5 Cuadros Grandes y Selector de Color */}
          <div className="md:col-span-8 rounded-2xl bg-[#0B1026]/95 border border-indigo-500/30 p-4 xl:p-5 flex flex-col justify-start gap-3.5 h-full min-h-0">
            {/* Cabecera Limpia: Icono + Nombre de la Ranura ("Cabeza") + Botón Vestir Set */}
            <div className="flex items-center justify-between gap-2 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-cyan-500/15 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
                  <SubCategoryTabIconSvg
                    slot={activeSlot}
                    setId={activeVariantId}
                    active={true}
                  />
                </div>
                <h3 className="text-2xl xl:text-3xl font-display text-white tracking-wide leading-none">
                  {SLOT_LABELS[activeSlot]}
                </h3>
              </div>

              <CrystalButton
                variant="purple"
                size="lg"
                onClick={() => handleEquipFullSet(activeVariantId)}
                disabled={!canEquipSet(activeVariantId, studentProgress.level)}
                className="disabled:opacity-40"
              >
                Vestir {activeSetMeta.setName}
              </CrystalButton>
            </div>

            {/* ===============================================================
             * GRILLA DE SOLO 5 CUADROS GRANDES (Los 5 Sets Oficiales de Sets_Basics.png)
             * Las piezas futuras se pueden probar sin modificar el equipo guardado.
             * =============================================================== */}
            <div className="piece-options grid grid-cols-4 grid-rows-2 gap-2.5 shrink-0">
              {Array.from({ length: 8 }, (_, index) => catalogList[index] ?? null).map(
                (setItem, index) => {
                  if (!setItem) {
                    return (
                      <div
                        key={`empty-set-slot-${index}`}
                        aria-hidden="true"
                        className="rounded-2xl border border-dashed border-indigo-500/20 bg-[#0A1028]/55"
                      />
                    );
                  }

                  const isCardSelected = activeVariantId === setItem.id;
                  const cardColors = isCardSelected
                    ? getSlotColor(displayAvatar, activeSlot)
                    : setItem.defaultColors[activeSlot];

                  return (
                    <button
                      key={setItem.id}
                      type="button"
                      aria-label={`Equipar ${getSetSlotLabel(activeSlot, setItem.id, displayAvatar.bodyType)} · Uso libre`}
                      onClick={() =>
                        handleSelectPieceVariant(activeSlot, setItem.id)
                      }
                      className={`relative aspect-square min-h-0 rounded-2xl border p-2 flex flex-col items-center justify-center transition-all group ${
                        isCardSelected
                          ? "bg-gradient-to-b from-[#13294B] to-[#0D1632] border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.3)] scale-[1.01]"
                          : "bg-[#101735]/90 hover:bg-[#162046] border-indigo-500/25 hover:border-indigo-400/50"
                      }`}
                    >
                      {isCardSelected && (
                        <span className="w-5 h-5 rounded-full bg-cyan-400 text-[#061224] font-black text-[10px] flex items-center justify-center shadow-[0_0_10px_#22d3ee] absolute -top-2 -right-1.5 z-10">
                          ✓
                        </span>
                      )}
                      <div className="w-full min-h-0 flex-1 flex items-center justify-center">
                        <div className="w-20 h-20 xl:w-24 xl:h-24 transition-transform duration-200 group-hover:scale-105">
                          <EquipmentPiecePreviewSvg
                            slot={activeSlot}
                            setId={setItem.id}
                            gender={displayAvatar.bodyType}
                            skinColor={displayAvatar.skinColor}
                            hairColor={displayAvatar.hairColor}
                            eyeColor={displayAvatar.eyeColor}
                            colors={cardColors}
                          />
                        </div>
                      </div>
                    </button>
                  );
                }
              )}
            </div>

            <div className="mt-auto flex flex-col gap-2 shrink-0">
              <div className="flex w-full min-w-0 items-center gap-4 rounded-xl border border-indigo-500/25 bg-[#0E1532] px-3 py-2">
                <span className="w-32 shrink-0 text-sm font-semibold text-slate-200">Color de cabello</span>
                <div className="flex min-w-0 flex-1 items-center justify-end gap-1.5">
                {HAIR_AND_ACCENT_PRESETS.map(color => (
                  <FacetedColorSwatch
                    key={color}
                    color={color}
                    active={displayAvatar.hairColor === color}
                    onClick={() => updateAppearance({ hairColor: color })}
                    title={`Color de cabello ${color}`}
                    size="md"
                  />
                ))}
                <CustomColorPicker color={displayAvatar.hairColor} onChange={color => updateAppearance({ hairColor: color })} label="Elegir color de cabello personalizado" placement="up" />
                </div>
              </div>
              <div className="flex w-full min-w-0 items-center gap-4 rounded-xl border border-indigo-500/25 bg-[#0E1532] px-3 py-2">
                <span className="w-32 shrink-0 text-sm font-semibold text-slate-200">Color de ojos</span>
                <div className="flex min-w-0 flex-1 items-center justify-end gap-1.5">
                  {EYE_COLOR_PRESETS.map(color => (
                    <FacetedColorSwatch key={color} color={color} active={displayAvatar.eyeColor === color}
                      onClick={() => updateAppearance({ eyeColor: color })} title={`Color de ojos ${color}`} size="md" />
                  ))}
                  <CustomColorPicker color={displayAvatar.eyeColor} onChange={color => updateAppearance({ eyeColor: color })}
                    label="Elegir color de ojos personalizado" placement="up" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </CrystalPanel>

      {/* =====================================================================
       * MODAL DE LÁMINA OFICIAL DE DISEÑO DE PERSONAJES Y 5 SETS (Sets_Basics.png)
       * ===================================================================== */}
      {typeof document !== "undefined" && createPortal(<AnimatePresence>
        {showDesignSheetModal && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="absolute inset-0 z-50 bg-black/85 flex items-center justify-center"
          onClick={() => setShowDesignSheetModal(false)}>
          <div ref={dialogRef} role="dialog" aria-modal="true" aria-label="Colección de personajes" className="sets-dialog" onClick={event => event.stopPropagation()}>
            <div className="section-heading"><div><h3 className="font-display text-lg">Colección vectorial · Entregas 1 y 2</h3><p>{catalogList.length} sets · Hombre y mujer · 4 piezas modulares · Sin recortes de imagen</p></div>
              <CrystalButton variant="dark" size="sm" onClick={() => setShowDesignSheetModal(false)}>Cerrar ×</CrystalButton>
            </div>
            <div className="sets-gender-tabs" aria-label="Variante del personaje">
              {(["male", "female"] as BodyGenderType[]).map(gender => <button key={gender} type="button" aria-pressed={catalogGender === gender} onClick={() => setCatalogGender(gender)}>{gender === "male" ? "Masculino" : "Femenino"}</button>)}
            </div>
            <div className="set-catalog">{catalogList.map(setMeta => {
              const previewConfig = createSetAvatar(setMeta.id, catalogGender);
              const unlocked = canEquipSet(setMeta.id, studentProgress.level);
              return <div key={setMeta.id} data-set={setMeta.id} className="cut-card p-3 flex flex-col items-center justify-between gap-3">
                <h4 className="text-sm font-display text-center">{setMeta.setName}</h4>
                <CrystalTag label={unlocked ? "Uso libre" : setMeta.badgeLabel} variant={unlocked ? "cyan" : "amber"} />
                <div className="catalog-avatar"><PlayerLowPolyAvatar config={previewConfig} className="w-full h-full" /></div>
                <div className="catalog-pieces">{(["head", "chest", "hands", "legs"] as EquipmentSlotKey[]).map(slot => <div key={slot} className="flex flex-col items-center rounded border border-indigo-500/25 bg-[#090E22] p-1">
                  <div className="w-full h-12"><EquipmentPiecePreviewSvg slot={slot} setId={setMeta.id} gender={catalogGender} skinColor={previewConfig.skinColor} hairColor={previewConfig.hairColor} colors={setMeta.defaultColors[slot]} /></div>
                  <span className="text-[8px] text-slate-300">{SLOT_LABELS[slot]}</span>
                </div>)}</div>
                <CrystalButton variant="cyan" size="sm" fullWidth onClick={() => {
                  setPreviewAvatar(createSetAvatar(setMeta.id, catalogGender, displayAvatar));
                  setSaveToastVisible(false);
                  setShowDesignSheetModal(false);
                }}>{unlocked ? "Equipar conjunto" : "Probar conjunto"}</CrystalButton>
              </div>;
            })}</div>
            <p className="text-xs text-slate-400">Los cuatro conjuntos actuales son de uso libre. Confirma tu elección con Guardar cambios.</p>
          </div>
        </motion.div>}
      </AnimatePresence>, document.querySelector(".game-frame") ?? document.body)}
    </div>
  );
};
