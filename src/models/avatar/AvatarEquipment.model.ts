import type { BodyGenderType, EquipmentSetId, EquipmentSlotKey, PlayerAvatarConfig, SlotColorTriplet } from "../entities/UserProgress.model";

export const EQUIPMENT_OPTIONS_IDS: EquipmentSetId[] = [
  "base",
  "set1",
  "set2",
  "set3",
  "set4",
];

export interface SetCatalogMeta {
  id: EquipmentSetId;
  setName: string;
  shortTab: string;
  badgeLabel: string;
  unlockLevel: number;
  badgeColor: "cyan" | "purple" | "amber" | "lime";
  quoteMale: string;
  quoteFemale: string;
  defaultColors: Record<EquipmentSlotKey, SlotColorTriplet>;
  pieceNames: {
    male: Record<EquipmentSlotKey, string>;
    female: Record<EquipmentSlotKey, string>;
  };
}

export const SETS_BASICS_CATALOG: Record<EquipmentSetId, SetCatalogMeta> = {
  base: {
    id: "base",
    unlockLevel: 0,
    setName: "Set Universitario",
    shortTab: "Base",
    badgeLabel: "Gratuito",
    badgeColor: "cyan",
    quoteMale: "“El inicio de una gran aventura.”",
    quoteFemale: "“Pequeños pasos, grandes metas.”",
    defaultColors: {
      head: { primary: "#4338CA", secondary: "#1E293B", power: "#38BDF8" },
      chest: { primary: "#2563EB", secondary: "#F8FAFC", power: "#7C3A16" },
      hands: { primary: "#475569", secondary: "#CBD5E1", power: "#38BDF8" },
      legs: { primary: "#162038", secondary: "#2563EB", power: "#F8FAFC" },
    },
    pieceNames: {
      male: {
        head: "Cabello corto",
        chest: "Chaqueta universitaria",
        hands: "Guantes ligeros",
        legs: "Pantalón vaquero",
      },
      female: {
        head: "Cabello recogido",
        chest: "Chaqueta universitaria",
        hands: "Guantes ligeros",
        legs: "Pantalón vaquero",
      },
    },
  },
  set1: {
    id: "set1",
    unlockLevel: 10,
    setName: "Set Académico",
    shortTab: "Académico",
    badgeLabel: "Nivel 10",
    badgeColor: "purple",
    quoteMale: "“El conocimiento también es una forma de poder.”",
    quoteFemale: "“El estudio también es una forma de libertad.”",
    defaultColors: {
      head: { primary: "#1E1B4B", secondary: "#FACC15", power: "#38BDF8" },
      chest: { primary: "#1E2B5E", secondary: "#FACC15", power: "#DC2626" },
      hands: { primary: "#D97706", secondary: "#1E293B", power: "#FACC15" },
      legs: { primary: "#2E294E", secondary: "#1E1B4B", power: "#F8FAFC" },
    },
    pieceNames: {
      male: {
        head: "Gafas académicas",
        chest: "Abrigo de estudiante",
        hands: "Guantes de estudio",
        legs: "Pantalón de vestir",
      },
      female: {
        head: "Gafas académicas",
        chest: "Abrigo de estudiante",
        hands: "Guantes de estudio",
        legs: "Falda de uniforme",
      },
    },
  },
  set2: {
    id: "set2",
    unlockLevel: 20,
    setName: "Set Deportivo",
    shortTab: "Deportivo",
    badgeLabel: "Nivel 20",
    badgeColor: "cyan",
    quoteMale: "“Disciplina hoy, resultados mañana.”",
    quoteFemale: "“Cuerpo sano, mente fuerte.”",
    defaultColors: {
      head: { primary: "#2563EB", secondary: "#F8FAFC", power: "#FACC15" },
      chest: { primary: "#F8FAFC", secondary: "#2563EB", power: "#38BDF8" },
      hands: { primary: "#1D4ED8", secondary: "#F8FAFC", power: "#22D3EE" },
      legs: { primary: "#192340", secondary: "#F8FAFC", power: "#2563EB" },
    },
    pieceNames: {
      male: {
        head: "Gorra deportiva",
        chest: "Sudadera deportiva",
        hands: "Guantes deportivos",
        legs: "Pantalón jogger",
      },
      female: {
        head: "Gorra deportiva",
        chest: "Top deportivo",
        hands: "Guantes deportivos",
        legs: "Leggings",
      },
    },
  },
  set3: {
    id: "set3",
    unlockLevel: 30,
    setName: "Set Tecnológico",
    shortTab: "Tecnológico",
    badgeLabel: "Nivel 30",
    badgeColor: "amber",
    quoteMale: "“La tecnología también es un arma de estudio.”",
    quoteFemale: "“El futuro también se construye en la universidad.”",
    defaultColors: {
      head: { primary: "#0F172A", secondary: "#312E81", power: "#22D3EE" },
      chest: { primary: "#162038", secondary: "#2563EB", power: "#22D3EE" },
      hands: { primary: "#0F172A", secondary: "#1E3A8A", power: "#22D3EE" },
      legs: { primary: "#162038", secondary: "#312E81", power: "#22D3EE" },
    },
    pieceNames: {
      male: {
        head: "Visor táctico",
        chest: "Chaqueta tecnológica",
        hands: "Guantes tecnológicos",
        legs: "Pantalón táctico",
      },
      female: {
        head: "Visor tecnológico",
        chest: "Chaqueta futurista",
        hands: "Guantes tecnológicos",
        legs: "Pantalón táctico",
      },
    },
  },
  set4: {
    id: "set4",
    unlockLevel: 40,
    setName: "Set Aventurero",
    shortTab: "Aventurero",
    badgeLabel: "Nivel 40",
    badgeColor: "amber",
    quoteMale: "“A veces el mejor plan es explorar.”",
    quoteFemale: "“Nuevos caminos, mismas ganas.”",
    defaultColors: {
      head: { primary: "#7C4728", secondary: "#DC2626", power: "#FBBF24" },
      chest: { primary: "#9A4218", secondary: "#DC2626", power: "#F59E0B" },
      hands: { primary: "#5C3A21", secondary: "#B45309", power: "#FBBF24" },
      legs: { primary: "#9E7852", secondary: "#452714", power: "#D97706" },
    },
    pieceNames: {
      male: {
        head: "Sombrero explorador",
        chest: "Capa de aventurero",
        hands: "Guantes de montañismo",
        legs: "Pantalón cargo",
      },
      female: {
        head: "Sombrero explorador",
        chest: "Chaqueta de viaje",
        hands: "Guantes de trekking",
        legs: "Pantalón cargo",
      },
    },
  },
};

export function getSetSlotLabel(
  slot: EquipmentSlotKey,
  setId: EquipmentSetId,
  gender: BodyGenderType = "male"
): string {
  return SETS_BASICS_CATALOG[setId].pieceNames[gender][slot];
}

export function getSetGeneralName(setId: EquipmentSetId): string {
  return SETS_BASICS_CATALOG[setId].setName;
}

export const SLOT_LABELS: Record<EquipmentSlotKey, string> = {
  head: "Cabeza", chest: "Cuerpo", hands: "Manos", legs: "Pantalones",
};

export function canEquipSet(setId: EquipmentSetId, _level: number): boolean {
  // During the design phase the four constructed sets are freely available.
  return ["base", "set1", "set2", "set3"].includes(setId);
}

export function createSetAvatar(setId: EquipmentSetId, gender: BodyGenderType, appearance?: Pick<PlayerAvatarConfig, "skinColor" | "hairColor" | "eyeColor">): PlayerAvatarConfig {
  const colors = SETS_BASICS_CATALOG[setId].defaultColors;
  return {
    bodyType: gender, skinColor: appearance?.skinColor ?? "#F3C39A",
    hairColor: appearance?.hairColor ?? (gender === "female" ? "#493963" : "#4A3327"),
    eyeColor: appearance?.eyeColor ?? "#35356D",
    headEquip: setId, chestEquip: setId, handsEquip: setId, legsEquip: setId,
    primaryColor: colors.chest.primary, secondaryColor: colors.chest.secondary, energyColor: colors.chest.power,
    slotColors: { head: { ...colors.head }, chest: { ...colors.chest }, hands: { ...colors.hands }, legs: { ...colors.legs } },
  };
}
