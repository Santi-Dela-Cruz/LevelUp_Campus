"use client";

import React from "react";
import { motion } from "framer-motion";
import { Flag, Target } from "lucide-react";
import {
  LevelNodeEntity,
  SubjectModuleEntity,
} from "../../models/entities/SubjectModule.model";
import { BadgeEntity, StudentProgressEntity } from "../../models/entities/UserProgress.model";
import { PlayerLowPolyAvatar } from "../avatar/PlayerAvatarView";
import {
  CrystalGemIcon,
  CrystalBadgeMedal,
  CrystalPanel,
  CrystalProgressBar,
  CrystalSubCard,
  CrystalTag,
} from "../components/LowPolyUI";

interface ModuleProgressPathViewProps {
  module: SubjectModuleEntity;
  studentProgress: StudentProgressEntity;
  badges: BadgeEntity[];
  playerLevelNumber: number;
  onSelectLevel: (level: LevelNodeEntity, rect?: DOMRect) => void;
  onBackToDashboard?: () => void;
}

export const ModuleProgressPathView: React.FC<ModuleProgressPathViewProps> = ({
  module,
  studentProgress,
  badges,
  playerLevelNumber,
  onSelectLevel,
}) => {
  const activeSelectedLevel =
    module.levels.find((lvl) => lvl.levelNumber === playerLevelNumber) ||
    module.levels[0];

  const completedLevelsCount = module.levels.filter(
    (lvl) => lvl.status === "completed"
  ).length;
  const moduleBadges = badges.filter((badge) =>
    module.id.includes("verificacion")
      ? ["badge-vvs", "badge-legend"].includes(badge.id)
      : ["badge-gpc", "badge-cmmi"].includes(badge.id)
  );

  return (
    <div className="path-grid grid grid-cols-12 gap-6 items-start">
      {/* ================= 1. LIENZO DEL CAMINO DE NIVELES TALLADO EN CRISTAL (Izquierda - 8 Columnas) ================= */}
      <CrystalPanel
        cornerDecor="crystals"
        className="path-map-panel lg:col-span-8"
        contentClassName="path-map-panel-content p-6"
      >
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flag className="h-4 w-4 text-cyan-400" />
            <h2 className="font-avolisse text-base text-white sm:text-lg">
              Mi Camino de Aprendizaje
            </h2>
          </div>
          <CrystalTag label={module.code} variant="cyan" />
        </div>

        <div className="path-map-canvas relative mx-auto h-[740px] max-w-4xl select-none">
          <svg
            viewBox="0 0 900 740"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="pointer-events-none absolute inset-0 h-full w-full"
          >
            <defs>
              <linearGradient id="topDownPathGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="55%" stopColor="#06B6D4" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>

            {/* Estrellas y destellos de ambiente */}
            <circle cx="195" cy="90" r="2.5" fill="#E2E8F0" opacity="0.65" />
            <circle cx="720" cy="110" r="3" fill="#FACC15" opacity="0.8" />
            <circle cx="240" cy="370" r="2" fill="#38BDF8" opacity="0.6" />
            <circle cx="670" cy="560" r="2.5" fill="#E2E8F0" opacity="0.55" />
            <circle cx="155" cy="610" r="2.5" fill="#FACC15" opacity="0.65" />

            {/* =================================================================
                ISLA FLOTANTE LOW-POLY 1 (Arriba Izquierda - Santuario de Cristal)
               ================================================================= */}
            <g transform="translate(30, 75)">
              <polygon points="10,175 26,165 22,192" fill="#324175" />
              <polygon points="215,165 232,155 225,182" fill="#4A2574" />

              {/* Cono rocoso invertido multi-faceta */}
              <polygon points="18,118 75,142 62,218 32,175" fill="#1E1633" />
              <polygon points="75,142 135,148 112,242 62,218" fill="#161029" />
              <polygon points="135,148 212,114 168,205 112,242" fill="#0E0A1C" />

              {/* Borde de plataforma superior */}
              <polygon points="10,104 115,68 222,102 122,140" fill="#E2E8F0" />
              <polygon points="10,104 75,130 75,144 18,118" fill="#94A3B8" />
              <polygon points="75,130 135,136 135,150 75,144" fill="#CBD5E1" />
              <polygon points="135,136 222,102 212,116 135,150" fill="#64748B" />

              {/* Cordillera Low-Poly con cumbre nevada y cristales */}
              <polygon points="36,102 82,18 128,106" fill="#324175" />
              <polygon points="82,18 128,106 98,112" fill="#4A2574" />
              <polygon points="82,18 100,52 68,48" fill="#F8FAFC" />
              <polygon points="82,18 100,52 86,56" fill="#CBD5E1" />

              <polygon points="108,104 156,8 202,98" fill="#4A2574" />
              <polygon points="156,8 202,98 164,108" fill="#6B3FA0" />
              <polygon points="156,8 176,46 140,42" fill="#F8FAFC" />

              {/* Cristales bioluminiscentes y pinos Low-Poly */}
              <polygon points="52,104 60,76 68,104" fill="#22D3EE" />
              <polygon points="178,100 188,68 196,98" fill="#84CC16" />
              <polygon points="172,96 182,76 190,96" fill="#2D5A27" />
            </g>

            {/* =================================================================
                ISLA FLOTANTE LOW-POLY 2 (Centro Derecha - Cumbre Amatista)
               ================================================================= */}
            <g transform="translate(645, 220)">
              <polygon points="0,185 18,172 14,204" fill="#4A2574" />
              <polygon points="225,180 242,168 234,198" fill="#324175" />

              <polygon points="18,136 88,166 74,250 32,202" fill="#1E1633" />
              <polygon points="88,166 154,162 128,268 74,250" fill="#140E26" />
              <polygon points="154,162 226,128 182,224 128,268" fill="#0B0717" />

              <polygon points="8,122 120,82 234,116 126,156" fill="#E2E8F0" />
              <polygon points="8,122 88,152 88,166 18,136" fill="#94A3B8" />
              <polygon points="88,152 154,148 154,162 88,166" fill="#CBD5E1" />
              <polygon points="154,148 234,116 226,130 154,162" fill="#64748B" />

              <polygon points="34,120 84,34 136,124" fill="#324175" />
              <polygon points="84,34 136,124 104,130" fill="#4A2574" />
              <polygon points="84,34 102,66 70,64" fill="#F8FAFC" />

              <polygon points="106,122 166,4 218,114" fill="#4A2574" />
              <polygon points="166,4 218,114 176,126" fill="#8B5CF6" />
              <polygon points="166,4 188,52 148,48" fill="#F8FAFC" />
              <polygon points="166,4 188,52 168,58" fill="#CBD5E1" />

              <polygon points="62,124 70,92 78,124" fill="#FACC15" />
              <polygon points="190,118 200,88 208,116" fill="#C084FC" />
            </g>

            {/* =================================================================
                ISLA FLOTANTE LOW-POLY 3 (Abajo Izquierda - Mirador del Río)
               ================================================================= */}
            <g transform="translate(25, 420)">
              <polygon points="205,175 224,164 216,196" fill="#324175" />

              <polygon points="16,128 84,158 68,238 28,190" fill="#1E1633" />
              <polygon points="84,158 148,154 118,256 68,238" fill="#140E26" />
              <polygon points="148,154 214,122 170,214 118,256" fill="#0B0717" />

              <polygon points="8,114 112,78 220,110 116,148" fill="#CBD5E1" />
              <polygon points="8,114 84,144 84,158 16,128" fill="#94A3B8" />
              <polygon points="84,144 148,140 148,154 84,158" fill="#64748B" />
              <polygon
                points="96,142 122,140 114,218 90,210"
                fill="#06B6D4"
                opacity="0.8"
              />
              <polygon points="102,142 114,141 108,200 98,196" fill="#22D3EE" />

              <polygon points="34,114 92,12 152,118" fill="#324175" />
              <polygon points="92,12 152,118 116,124" fill="#6B3FA0" />
              <polygon points="92,12 114,56 76,52" fill="#F8FAFC" />

              <polygon points="126,116 168,42 204,108" fill="#4A2574" />
              <polygon points="168,42 204,108 178,114" fill="#8B5CF6" />

              <polygon points="48,114 60,80 72,114" fill="#84CC16" />
              <polygon points="60,80 72,114 62,116" fill="#2D5A27" />
            </g>

            {/* =================================================================
                CAMINO DESCENDENTE EN CURVA "S" (Nivel 1 arriba -> Nivel 5 abajo)
               ================================================================= */}
            <path
              d="M 414 102 C 520 150, 610 185, 576 235 C 535 295, 345 315, 378 376 C 410 435, 590 450, 558 508 C 525 565, 390 590, 342 634"
              stroke="#090C1D"
              strokeWidth="44"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M 414 96 C 520 144, 610 179, 576 229 C 535 289, 345 309, 378 370 C 410 429, 590 444, 558 502 C 525 559, 390 584, 342 628"
              stroke="#242C5E"
              strokeWidth="36"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Tramo iluminado cian que acompaña hasta el nivel seleccionado (Como en Referencias_componentes.png) */}
            <path
              d={
                playerLevelNumber <= 1
                  ? "M 414 96 L 414 98"
                  : playerLevelNumber === 2
                  ? "M 414 96 C 520 144, 610 179, 576 229"
                  : playerLevelNumber === 3
                  ? "M 414 96 C 520 144, 610 179, 576 229 C 535 289, 345 309, 378 370"
                  : playerLevelNumber === 4
                  ? "M 414 96 C 520 144, 610 179, 576 229 C 535 289, 345 309, 378 370 C 410 429, 590 444, 558 502"
                  : "M 414 96 C 520 144, 610 179, 576 229 C 535 289, 345 309, 378 370 C 410 429, 590 444, 558 502 C 525 559, 390 584, 342 628"
              }
              stroke="url(#topDownPathGrad)"
              strokeWidth="12"
              strokeLinecap="round"
            />
          </svg>

          {/* ================= NODOS DE NIVEL (Nivel 1 arriba a Nivel 5 abajo) ================= */}
          {module.levels.map((level) => {
            const isPlayerHere = playerLevelNumber === level.levelNumber;
            const isLocked = level.status === "locked";
            const isCompleted = level.status === "completed";

            return (
              <div
                key={level.id}
                style={{
                  left: `${level.coords.x}%`,
                  top: `${level.coords.y}%`,
                }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center ${
                  isPlayerHere ? "z-40" : "z-20"
                }`}
              >
                {/* Personaje del Jugador en capa z-50 por encima de cualquier etiqueta */}
                {isPlayerHere && (
                  <motion.div
                    layoutId="player-avatar-on-map"
                    transition={{ type: "spring", stiffness: 180, damping: 20 }}
                    className="pointer-events-none relative -mb-14 z-50 flex flex-col items-center"
                  >
                    <PlayerLowPolyAvatar
                      config={studentProgress.avatar}
                      size="md"
                    />
                  </motion.div>
                )}

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={(e) =>
                    onSelectLevel(
                      level,
                      e.currentTarget.getBoundingClientRect()
                    )
                  }
                  className="relative flex flex-col items-center focus:outline-none group"
                >
                  {/* CÍRCULO DE PROGRESO DINÁMICO: Se mueve exactamente al nivel donde está posicionado el jugador */}
                  {isPlayerHere && (
                    <motion.svg
                      layoutId="player-level-progress-ring"
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 22,
                      }}
                      viewBox="0 0 220 130"
                      className="pointer-events-none absolute -inset-x-10 -inset-y-4 z-10 h-36 w-56"
                    >
                      <ellipse
                        cx="110"
                        cy="68"
                        rx="92"
                        ry="44"
                        stroke="#252E63"
                        strokeWidth="7"
                        fill="none"
                      />
                      <ellipse
                        cx="110"
                        cy="68"
                        rx="92"
                        ry="44"
                        stroke={isLocked ? "#FACC15" : "#38BDF8"}
                        strokeWidth="8"
                        strokeDasharray="360 600"
                        strokeDashoffset="110"
                        strokeLinecap="round"
                        fill="none"
                      />
                    </motion.svg>
                  )}

                  {/* Plataforma Isométrica de Roca / Cristal Low-Poly (Como en "Mi Camino de Aprendizaje" de Referencias_componentes.png) */}
                  <svg
                    viewBox="0 0 180 125"
                    className="relative z-20 h-28 w-40 drop-shadow-[0_14px_18px_rgba(0,0,0,0.65)]"
                  >
                    <polygon
                      points="90,28 165,64 90,100 15,64"
                      fill={
                        isPlayerHere
                          ? "#38BDF8"
                          : isCompleted
                          ? "#84CC16"
                          : "#4F5B9E"
                      }
                    />
                    <polygon
                      points="15,64 90,100 90,118 15,82"
                      fill={
                        isPlayerHere
                          ? "#0284C7"
                          : isCompleted
                          ? "#4D7C0F"
                          : "#38417A"
                      }
                    />
                    <polygon
                      points="165,64 90,100 90,118 165,82"
                      fill={
                        isPlayerHere
                          ? "#0369A1"
                          : isCompleted
                          ? "#365314"
                          : "#242A57"
                      }
                    />

                    {/* Nivel 1 (Arriba): Bandera de Inicio */}
                    {level.nodeType === "start_flag" && !isPlayerHere && (
                      <g>
                        <polygon
                          points="90,32 132,52 90,72 48,52"
                          fill="#BEF264"
                        />
                        <rect
                          x="86"
                          y="6"
                          width="5"
                          height="46"
                          fill="#1E293B"
                        />
                        <polygon points="91,6 126,16 91,26" fill="#FACC15" />
                      </g>
                    )}

                    {/* Nivel 2: Checkmark 3D */}
                    {isCompleted &&
                      level.nodeType === "check_tile" &&
                      !isPlayerHere && (
                        <g>
                          <ellipse
                            cx="90"
                            cy="64"
                            rx="26"
                            ry="13"
                            fill="#ECFCCB"
                          />
                          <path
                            d="M 72 56 L 86 70 L 114 40"
                            stroke="#16A34A"
                            strokeWidth="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                          />
                        </g>
                      )}

                    {/* Niveles bloqueados: Candado 3D */}
                    {isLocked && !isPlayerHere && (
                      <g transform="translate(65, 10)">
                        <path
                          d="M 13 28 V 16 C 13 7, 37 7, 37 16 V 28"
                          stroke="#7C88E0"
                          strokeWidth="6"
                          fill="none"
                        />
                        <rect
                          x="6"
                          y="26"
                          width="38"
                          height="32"
                          rx="5"
                          fill="#2D356B"
                        />
                        <circle cx="25" cy="39" r="4" fill="#0F172A" />
                        <polygon
                          points="23,41 27,41 28,50 22,50"
                          fill="#0F172A"
                        />
                      </g>
                    )}
                  </svg>

                  {/* Etiquetas del Nivel en capa inferior (z-10) */}
                  <div className="relative z-10 mt-0.5 flex flex-col items-center">
                    <span
                      className={`font-avolisse text-sm tracking-wide ${
                        isPlayerHere
                          ? "text-rune-yellow"
                          : isLocked
                          ? "text-slate-400"
                          : "text-white"
                      }`}
                    >
                      {level.label}
                    </span>
                    <span className="text-[11px] font-medium text-slate-300 group-hover:text-white transition">
                      {level.topicTitle}
                    </span>
                  </div>
                </motion.button>
              </div>
            );
          })}
        </div>
      </CrystalPanel>

      {/* ================= 2. BARRA DE ESTADÍSTICAS ESTÁTICA EN LA PARTE DERECHA (4 Columnas, Bien Ordenada, Sin Botón Redundante) ================= */}
      <aside className="path-details-panel lg:col-span-4 sticky top-24 z-30">
        <CrystalPanel cornerDecor="crystals" contentClassName="p-5 space-y-4">
          {/* 1. Cabecera del Módulo */}
          <div className="border-b border-white/10 pb-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <CrystalTag label={module.code} variant="cyan" />
              <CrystalTag label="Activo" variant="lime" />
            </div>
            <h2 className="font-avolisse text-lg leading-snug text-white">
              {module.name}
            </h2>
            <p className="text-xs text-slate-300">
              Jugador activo:{" "}
              <span className="font-bold text-white">
                {studentProgress.studentName}
              </span>
            </p>
          </div>

          {/* 2. Tarjetas de XP y Racha en Grilla Ordenada con Gemas 3D */}
          <div className="grid grid-cols-2 gap-2.5">
            <CrystalSubCard>
              <div className="flex items-center gap-2.5">
                <CrystalGemIcon type="purple" size="sm" />
                <div>
                  <p className="font-avolisse text-base leading-none text-white">
                    {studentProgress.currentXp.toLocaleString("en-US")}
                  </p>
                  <p className="mt-1 text-[10px] font-medium text-slate-300">
                    Experiencia
                  </p>
                </div>
              </div>
            </CrystalSubCard>

            <CrystalSubCard>
              <div className="flex items-center gap-2.5">
                <CrystalGemIcon type="amber" size="sm" />
                <div>
                  <p className="font-avolisse text-base leading-none text-white">
                    {studentProgress.streakDays} días
                  </p>
                  <p className="mt-1 text-[10px] font-medium text-slate-300">
                    Racha Activa
                  </p>
                </div>
              </div>
            </CrystalSubCard>
          </div>

          {/* 3. Barra de Avance General del Módulo */}
          <CrystalSubCard>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-200">
                  Progreso de la Materia
                </span>
                <span className="font-avolisse text-sm text-cyan-300">
                  {module.progressPercent}%
                </span>
              </div>
              <CrystalProgressBar
                percent={module.progressPercent}
                variant="cyan"
                heightClass="h-3"
              />
              <div className="flex items-center justify-between text-[11px] text-slate-300">
                <span>{completedLevelsCount} completados</span>
                <span>{module.totalLevels} niveles en total</span>
              </div>
            </div>
          </CrystalSubCard>

          {/* 4. Nivel Seleccionado Actualmente (Donde está el Círculo de Progreso) */}
          <CrystalSubCard active>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-rune-yellow">
                  <Target className="h-3.5 w-3.5" />
                  Posición • {activeSelectedLevel.label}
                </span>
                <CrystalTag
                  label={`+${activeSelectedLevel.xpReward} XP`}
                  variant="amber"
                />
              </div>
              <p className="font-avolisse text-sm text-white">
                {activeSelectedLevel.topicTitle}
              </p>
              <p className="text-[11px] leading-relaxed text-slate-300">
                {activeSelectedLevel.topicBanner} •{" "}
                {activeSelectedLevel.status === "completed"
                  ? "Nivel completado con éxito"
                  : activeSelectedLevel.status === "current"
                  ? "Nivel en curso disponible"
                  : "Completa los niveles previos para desbloquear"}
              </p>
            </div>
          </CrystalSubCard>

          <div className="module-badges-section">
            <p className="module-badges-title">Insignias del módulo</p>
            <div className="module-badges-list">
              {moduleBadges.map((badge) => (
                <CrystalSubCard key={badge.id} active={badge.unlocked}>
                  <div className="module-badge-card">
                    <CrystalBadgeMedal
                      variant={badge.id === "badge-gpc" ? "amber" : badge.id === "badge-cmmi" ? "cyan" : "purple"}
                      unlocked={badge.unlocked}
                    />
                    <div>
                      <strong>{badge.title}</strong>
                      <span>{badge.description}</span>
                    </div>
                    <CrystalTag label={badge.unlocked ? "Obtenida" : "En curso"} variant={badge.unlocked ? "lime" : "cyan"} />
                  </div>
                </CrystalSubCard>
              ))}
            </div>
          </div>
        </CrystalPanel>
      </aside>
    </div>
  );
};
