"use client";

import React from "react";
import { Trophy } from "lucide-react";
import {
  BadgeEntity,
  StudentProgressEntity,
} from "../../models/entities/UserProgress.model";
import {
  CrystalBadgeMedal,
  CrystalPanel,
  CrystalSubCard,
  CrystalTag,
} from "../components/LowPolyUI";

interface UserSidebarSummaryViewProps {
  studentProgress: StudentProgressEntity;
  badges: BadgeEntity[];
  onBadgeMouseEnter?: (badge: BadgeEntity, rect: DOMRect) => void;
  onBadgeMouseLeave?: () => void;
}

export const BadgesAndLeaderboardView: React.FC<UserSidebarSummaryViewProps> = ({
  badges,
  onBadgeMouseEnter,
  onBadgeMouseLeave,
}) => {
  const unlockedCount = badges.filter((b) => b.unlocked).length;

  const badgeVariants: ("purple" | "amber" | "emerald" | "cyan")[] = [
    "purple",
    "amber",
    "emerald",
    "cyan",
  ];

  return (
    <CrystalPanel
      cornerDecor="crystals"
      className="h-full"
      contentClassName="badges-screen-content p-5 flex flex-col justify-between h-full"
    >
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2.5">
          <Trophy className="badges-header-icon h-5 w-5 text-rune-yellow" />
          <div>
            <h2 className="badges-header-title font-avolisse text-base text-white sm:text-lg">
              Logros e Insignias
            </h2>
            <p className="badges-header-description text-xs text-slate-300">
              Pasa el cursor sobre cualquier insignia para que Dev&apos;is se
              acerque y te explique cómo obtenerla.
            </p>
          </div>
        </div>
        <CrystalTag
          className="badges-header-tag"
          label={`${unlockedCount} / ${badges.length} Desbloqueados`}
          variant="purple"
        />
      </div>

      <div className="badge-grid badges-grid grid flex-1 min-h-0 grid-cols-3 gap-3 pt-3 content-evenly">
        {badges.map((badge, index) => {
          const medalVariant = badgeVariants[index % badgeVariants.length];
          const xpBonus = (index + 1) * 100;

          return (
            <CrystalSubCard
              key={badge.id}
              className="badge-card"
              innerClassName="badge-card-content p-4"
              onMouseEnter={(e) =>
                onBadgeMouseEnter?.(
                  badge,
                  e.currentTarget.getBoundingClientRect()
                )
              }
              onMouseLeave={() => onBadgeMouseLeave?.()}
              active={badge.unlocked}
            >
              <div className="flex items-center gap-3.5">
                <CrystalBadgeMedal
                  variant={medalVariant}
                  unlocked={badge.unlocked}
                />
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="badge-title font-avolisse text-xs text-white truncate">
                      {badge.title}
                    </h4>
                    <CrystalTag
                      className="badge-status"
                      label={badge.unlocked ? "Obtenida" : "En curso"}
                      variant={badge.unlocked ? "lime" : "cyan"}
                    />
                  </div>
                  <p className="text-[11px] leading-snug text-slate-300 line-clamp-2">
                    {badge.description}
                  </p>
                  <p className="font-avolisse text-xs text-rune-yellow">
                    +{xpBonus} XP
                  </p>
                </div>
              </div>
            </CrystalSubCard>
          );
        })}
      </div>
    </CrystalPanel>
  );
};
