import { createSetAvatar } from "../avatar/AvatarEquipment.model";
import { SubjectModuleEntity } from "../entities/SubjectModule.model";
import {
  BadgeEntity,
  StudentProgressEntity,
} from "../entities/UserProgress.model";
import { VERIFICACION_VALIDACION_MODULE } from "../subjects/verificacion-validacion-software/module.model";
import { GESTION_PROCESOS_CALIDAD_MODULE } from "../subjects/gestion-procesos-calidad/module.model";

export const SUBJECT_MODULES_CATALOG: SubjectModuleEntity[] = [
  VERIFICACION_VALIDACION_MODULE,
  GESTION_PROCESOS_CALIDAD_MODULE,
];

export const INITIAL_STUDENT_PROGRESS: StudentProgressEntity = {
  studentName: "Santi",
  semesterLabel: "Semestre 2026-B",
  level: 5,
  currentXp: 1053,
  nextLevelXp: 1500,
  streakDays: 7,
  avatar: createSetAvatar("base", "male"),
};

export const INITIAL_BADGES_CATALOG: BadgeEntity[] = [
  {
    id: "badge-vvs",
    title: "Inspector V&V",
    description: "Iniciaste el camino de Verificación y Validación de Software.",
    unlocked: true,
    colorHex: "#8B5CF6",
    iconName: "shield",
  },
  {
    id: "badge-gpc",
    title: "Gestor ISO",
    description: "Completaste el primer nivel de Gestión de Procesos de Calidad.",
    unlocked: true,
    colorHex: "#06B6D4",
    iconName: "award",
  },
  {
    id: "badge-streak",
    title: "Racha 7 Días",
    description: "Constancia semanal en LevelUp Campus.",
    unlocked: true,
    colorHex: "#FACC15",
    iconName: "flame",
  },
  {
    id: "badge-devis",
    title: "Compañero de Dev'is",
    description: "Recibiste la guía de tu mascota en el campus virtual.",
    unlocked: true,
    colorHex: "#84CC16",
    iconName: "sparkles",
  },
  {
    id: "badge-cmmi",
    title: "Maestro CMMI",
    description: "Completa los 5 niveles de Gestión de Procesos de Calidad.",
    unlocked: false,
    colorHex: "#F472B6",
    iconName: "compass",
  },
  {
    id: "badge-legend",
    title: "Centinela V&V",
    description: "Completa los 5 niveles de Verificación y Validación de Software.",
    unlocked: false,
    colorHex: "#38BDF8",
    iconName: "gem",
  },
];
