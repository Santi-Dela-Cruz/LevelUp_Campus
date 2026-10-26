"use client";

import { useState, useCallback, useEffect } from "react";
import {
  LevelNodeEntity,
  SubjectModuleEntity,
  SubjectSlug,
} from "../models/entities/SubjectModule.model";
import { PlayerAvatarConfig } from "../models/entities/UserProgress.model";
import { canEquipSet } from "../models/avatar/AvatarEquipment.model";
import {
  INITIAL_BADGES_CATALOG,
  INITIAL_STUDENT_PROGRESS,
  SUBJECT_MODULES_CATALOG,
} from "../models/repositories/GamificationRepository.model";
import { useDevisController } from "./useDevisController";

export type TopBarSection =
  | "inicio"
  | "perfil"
  | "misiones"
  | "modulos"
  | "insignias"
  | "estadisticas"
  | "configuracion";

export function useDashboardController() {
  const [modules] = useState<SubjectModuleEntity[]>(SUBJECT_MODULES_CATALOG);
  const [selectedSubjectId, setSelectedSubjectId] = useState<SubjectSlug>(
    "verificacion-validacion-software"
  );
  const [activeSection, setActiveSection] = useState<TopBarSection>("inicio");
  const [isInsideModulePath, setIsInsideModulePath] = useState<boolean>(false);
  const [studentProgress, setStudentProgress] = useState(
    INITIAL_STUDENT_PROGRESS
  );
  useEffect(() => {
    try {
      const savedAvatar = localStorage.getItem("player-avatar");
      if (savedAvatar) {
        const avatar = JSON.parse(savedAvatar) as PlayerAvatarConfig;
        setStudentProgress((prev) => ({ ...prev, avatar: { ...prev.avatar, ...avatar, eyeColor: avatar.eyeColor ?? prev.avatar.eyeColor ?? "#35356D" } }));
      }
    } catch {
      // Ignore malformed local data and keep the repository defaults.
    }
  }, []);
  const [badges] = useState(INITIAL_BADGES_CATALOG);

  /** Nivel donde se encuentra parado el Personaje del Jugador en el Camino */
  const [playerLevelNumber, setPlayerLevelNumber] = useState<number>(3);

  const devis = useDevisController(studentProgress.studentName);

  const activeModule =
    modules.find((m) => m.id === selectedSubjectId) ?? modules[0];

  const openModuleProgressPath = useCallback(
    (subjectId: SubjectSlug) => {
      const target =
        modules.find((m) => m.id === subjectId) ?? modules[0];
      setSelectedSubjectId(subjectId);
      setActiveSection("modulos");
      setPlayerLevelNumber(target.currentLevelNumber);
      setIsInsideModulePath(true);
      devis.enterPlayingMode(target);
    },
    [modules, devis]
  );

  const closeModuleProgressPath = useCallback(() => {
    setIsInsideModulePath(false);
    setActiveSection("modulos");
    devis.reactToNavSection("modulos");
  }, [devis]);

  const changeTopSection = useCallback(
    (section: TopBarSection) => {
      setIsInsideModulePath(false);
      setActiveSection(section);
      devis.reactToNavSection(section);
    },
    [devis]
  );

  const selectLevelNode = useCallback(
    (level: LevelNodeEntity, rect?: DOMRect) => {
      devis.explainDuringGame(level, rect);
      if (level.status !== "locked") {
        setPlayerLevelNumber(level.levelNumber);
      }
    },
    [devis]
  );

  const updatePlayerAvatar = useCallback(
    (partialAvatar: Partial<PlayerAvatarConfig>) => {
      setStudentProgress((prev) => {
        const equipment = [
          partialAvatar.headEquip, partialAvatar.chestEquip,
          partialAvatar.handsEquip, partialAvatar.legsEquip,
        ];
        if (equipment.some(id => id && !canEquipSet(id, prev.level))) return prev;
        return {
          ...prev,
          avatar: { ...prev.avatar, ...partialAvatar },
        };
      });
    },
    []
  );

  const updateStudentName = useCallback(
    (newName: string) => {
      setStudentProgress((prev) => ({
        ...prev,
        studentName: newName,
      }));
      if (newName.trim().length >= 2) {
        devis.celebrateNameUpdate(newName);
      }
    },
    [devis]
  );

  return {
    modules,
    activeModule,
    selectedSubjectId,
    activeSection,
    isInsideModulePath,
    studentProgress,
    badges,
    playerLevelNumber,
    openModuleProgressPath,
    closeModuleProgressPath,
    changeTopSection,
    selectLevelNode,
    updatePlayerAvatar,
    updateStudentName,
    devis,
  };
}
