"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Play } from "lucide-react";
import {
  SubjectModuleEntity,
  SubjectSlug,
} from "../../models/entities/SubjectModule.model";
import {
  CrystalButton,
  CrystalMountainCrestSvg,
  CrystalPanel,
  CrystalProgressBar,
  CrystalTag,
} from "../components/LowPolyUI";

interface SubjectModulesGridViewProps {
  modules: SubjectModuleEntity[];
  selectedSubjectId: SubjectSlug;
  onOpenModulePath: (subjectId: SubjectSlug) => void;
  onHoverModule: (
    module: SubjectModuleEntity,
    index: number,
    rect: DOMRect
  ) => void;
  onLeaveModule: () => void;
}

export const SubjectModulesGridView: React.FC<SubjectModulesGridViewProps> = ({
  modules,
  selectedSubjectId,
  onOpenModulePath,
  onHoverModule,
  onLeaveModule,
}) => {
  return (
    <section className="modules-screen">
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <BookOpen className="modules-header-icon h-5 w-5 text-cyan-400" />
          <div>
            <h2 className="modules-header-title font-avolisse text-base text-white sm:text-lg">
              Módulos por Materia
            </h2>
            <p className="modules-header-description text-xs text-slate-300">
              Pasa el cursor para que Dev&apos;is señale y explique el módulo, o
              haz clic para abrir su camino de niveles.
            </p>
          </div>
        </div>
        <CrystalTag className="modules-header-tag" label={`${modules.length} Materias`} variant="cyan" />
      </div>

      <div className="module-grid">
        {modules.map((mod, idx) => {
          const isSelected = mod.id === selectedSubjectId;
          const tagVariant = idx === 0 ? "cyan" : "amber";
          const barVariant = idx === 0 ? "cyan" : "lime-amber";
          const currentLvl =
            mod.levels.find((l) => l.levelNumber === mod.currentLevelNumber) ||
            mod.levels[0];

          return (
            <motion.div
              key={mod.id}
              whileHover={{ y: -3, scale: 1.005 }}
              whileTap={{ scale: 0.995 }}
              onMouseEnter={(e) =>
                onHoverModule(
                  mod,
                  idx,
                  e.currentTarget.getBoundingClientRect()
                )
              }
              onMouseLeave={onLeaveModule}

              className="module-card-shell"
            >
              <CrystalPanel
                cornerDecor="crystals"
                className={`module-card ${
                  isSelected
                    ? "ring-2 ring-cyan-400/70 shadow-[0_14px_38px_rgba(34,211,238,0.2)]"
                    : "hover:brightness-105"
                }`}
                contentClassName="module-card-content"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <CrystalTag label={mod.code} variant={tagVariant} />
                    <CrystalTag
                      label={`Nivel ${mod.currentLevelNumber} de ${mod.totalLevels}`}
                      variant="lime"
                    />
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <h3 className="font-avolisse text-lg leading-snug text-white">
                        {mod.name}
                      </h3>
                      <p className="text-xs text-slate-300">
                        Actual: {currentLvl.label} · {currentLvl.topicTitle}
                      </p>
                    </div>

                    <CrystalMountainCrestSvg className="h-14 w-20 shrink-0 opacity-95" />
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <CrystalProgressBar
                        percent={mod.progressPercent}
                        variant={barVariant}
                        heightClass="h-3"
                      />
                    </div>
                    <span className="font-avolisse w-11 text-right text-sm text-white">
                      {mod.progressPercent}%
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs font-semibold text-slate-300">
                      {mod.earnedXp} XP acumulados
                    </span>
                    <CrystalButton
                      variant={idx === 0 ? "purple" : "amber"}
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenModulePath(mod.id);
                      }}
                    >
                      <span>Continuar</span>
                      <Play className="h-3 w-3 fill-current" />
                    </CrystalButton>
                  </div>
                </div>
              </CrystalPanel>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
