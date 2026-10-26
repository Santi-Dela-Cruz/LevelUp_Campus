export type SubjectSlug =
  | "verificacion-validacion-software"
  | "gestion-procesos-calidad";

export type LevelNodeStatus = "completed" | "current" | "locked";

export interface LevelNodeEntity {
  id: string;
  levelNumber: number;
  label: string;
  topicBanner: string;
  topicTitle: string;
  status: LevelNodeStatus;
  xpReward: number;
  nodeType: "start_flag" | "check_tile" | "active_player" | "locked_padlock";
  coords: {
    x: number;
    y: number;
  };
}

export interface SubjectModuleEntity {
  id: SubjectSlug;
  code: string;
  name: string;
  shortName: string;
  accentColor: string;
  secondaryColor: string;
  progressPercent: number;
  currentLevelNumber: number;
  totalLevels: number;
  earnedXp: number;
  devisComment: string;
  levels: LevelNodeEntity[];
}
