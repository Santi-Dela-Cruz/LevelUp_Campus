export type BodyGenderType = "male" | "female";

/**
 * "base" representa el personaje con ropa común universitaria (sin armadura pesada).
 * "set1".."set4" representan los 4 conjuntos de equipamiento RPG / Low-Poly.
 */
export type EquipmentSetId = "base" | "set1" | "set2" | "set3" | "set4";

export type EquipmentSlotKey = "head" | "chest" | "hands" | "legs";

export interface SlotColorTriplet {
  primary: string;
  secondary: string;
  power: string;
}

export interface PlayerAvatarConfig {
  bodyType: BodyGenderType;
  /** Colores anatómicos del personaje base */
  skinColor: string;
  hairColor: string;
  eyeColor: string;
  /** Equipamiento modular por ranura ("base" = ropa común, "set1".."set4" = conjuntos) */
  headEquip: EquipmentSetId;
  chestEquip: EquipmentSetId;
  handsEquip: EquipmentSetId;
  legsEquip: EquipmentSetId;
  /** Colores individuales por cada ranura (Color primario, secundario y poder) */
  slotColors: Record<EquipmentSlotKey, SlotColorTriplet>;
  /** Colores globales de referencia rápida */
  primaryColor: string;
  secondaryColor: string;
  energyColor: string;
}

export interface BadgeEntity {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  colorHex: string;
  iconName: "shield" | "sparkles" | "award" | "flame" | "compass" | "gem";
}

export interface StudentProgressEntity {
  studentName: string;
  semesterLabel: string;
  level: number;
  currentXp: number;
  nextLevelXp: number;
  streakDays: number;
  avatar: PlayerAvatarConfig;
}
