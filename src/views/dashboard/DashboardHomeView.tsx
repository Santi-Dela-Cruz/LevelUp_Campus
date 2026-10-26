"use client";

import { BarChart3, BookOpen, ChevronRight, User } from "lucide-react";
import type { TopBarSection, useDashboardController } from "../../controllers/useDashboardController";
import { PlayerLowPolyAvatar } from "../avatar/AvatarArtwork";
import { CrystalButton, CrystalCircularProgress, CrystalGemIcon, CrystalPanel, CrystalProgressBar, CrystalTag } from "../components/LowPolyUI";

export type DashboardController = ReturnType<typeof useDashboardController>;

export function ProgressSummary({ controller }: { controller: DashboardController }) {
  const student = controller.studentProgress;
  const percent = Math.round(student.currentXp / student.nextLevelXp * 100);
  return <div className="progress-summary">
    <CrystalCircularProgress percent={percent} size={118} />
    <div><h3>Nivel {student.level}</h3><p>Siguiente nivel</p>
      <p className="xp-label">{student.currentXp.toLocaleString("es-EC")} / {student.nextLevelXp.toLocaleString("es-EC")} XP</p>
      <CrystalProgressBar percent={percent} variant="lime-amber" heightClass="h-3" />
    </div>
  </div>;
}

export function QuickStats({ controller }: { controller: DashboardController }) {
  const unlocked = controller.badges.filter(b => b.unlocked).length;
  const stats: { value: string | number; label: string; type: "purple" | "amber" | "cyan" | "star"; section: TopBarSection }[] = [
    { value: controller.modules.length, label: "Módulos activos", type: "purple", section: "modulos" },
    { value: unlocked, label: "Insignias obtenidas", type: "amber", section: "insignias" },
    { value: controller.studentProgress.streakDays, label: "Días de racha", type: "cyan", section: "estadisticas" },
    { value: `${unlocked} / ${controller.badges.length}`, label: "Logros", type: "star", section: "insignias" },
  ];
  return <div className="quick-stats">{stats.map(stat => <button key={stat.label} type="button" className="stat-card cut-card" onClick={() => controller.changeTopSection(stat.section)}>
    <CrystalGemIcon type={stat.type} size="md" /><span><strong>{stat.value}</strong><small>{stat.label}</small></span>
  </button>)}</div>;
}

export function DashboardHomeView({ controller }: { controller: DashboardController }) {
  const { studentProgress: student, modules } = controller;
  return <section className="dashboard-home" aria-label="Resumen de inicio">
    <div className="home-columns">
      <div className="home-left">
        <CrystalPanel className="hero-panel" cornerDecor="hero-crystals" contentClassName="hero-content">
          <div className="hero-character"><PlayerLowPolyAvatar config={student.avatar} className="hero-avatar" />
            <svg viewBox="0 0 260 65" className="hero-pedestal" aria-hidden="true">
              <polygon points="130,2 252,25 200,48 60,48 8,25" fill="#24B9E7" stroke="#85E5FC" strokeWidth="2" />
              <polygon points="8,25 60,48 80,63 28,50" fill="#383879" /><polygon points="60,48 200,48 180,65 80,63" fill="#1A2047" />
              <polygon points="200,48 252,25 230,49 180,65" fill="#382467" /><polygon points="8,25 130,2 110,35" fill="#2563A1" />
              <ellipse cx="130" cy="26" rx="62" ry="9" fill="#12214F" opacity=".6" />
            </svg>
          </div>
          <div className="hero-info"><p className="eyebrow">TU AVENTURA UNIVERSITARIA</p><h2>{student.studentName}</h2><p className="hero-level">Nivel {student.level}</p>
            <CrystalProgressBar percent={student.currentXp / student.nextLevelXp * 100} variant="lime-amber" heightClass="h-3" />
            <p className="xp-label">{student.currentXp.toLocaleString("es-EC")} / {student.nextLevelXp.toLocaleString("es-EC")} XP</p>
            <p className="hero-quote">“Cada avance cuenta,<br />¡sigue adelante!”</p>
            <CrystalButton variant="purple" onClick={() => controller.changeTopSection("perfil")}><User size={18} />Ver perfil</CrystalButton>
          </div>
        </CrystalPanel>
        <CrystalPanel className="subjects-panel" contentClassName="home-panel-content">
          <div className="panel-heading"><h2><BookOpen />Tu progreso por materia</h2><button onClick={() => controller.changeTopSection("modulos")}>Ver todas <ChevronRight /></button></div>
          <div className="subject-rows">{modules.map((mod, index) => {
            const level = mod.levels.find(item => item.levelNumber === mod.currentLevelNumber)!;
            return <button type="button" key={mod.id} className="subject-row cut-card" onClick={() => controller.openModuleProgressPath(mod.id)}>
              <CrystalGemIcon type={index ? "amber" : "purple"} size="md" />
              <span className="subject-info"><strong>{mod.name}</strong><small>{level.label} · {level.topicTitle}</small>
                <span className="subject-progress"><CrystalProgressBar percent={mod.progressPercent} variant={index ? "lime-amber" : "cyan"} heightClass="h-2.5" /><span>{mod.progressPercent}%</span></span>
              </span><CrystalTag label={mod.code} variant={index ? "amber" : "cyan"} /><ChevronRight size={19} />
            </button>;
          })}</div>
        </CrystalPanel>
      </div>
      <div className="home-right">
        <CrystalPanel cornerDecor="castle" contentClassName="home-panel-content">
          <div className="panel-heading"><h2><BarChart3 />Progreso general</h2><button onClick={() => controller.changeTopSection("estadisticas")}>Ver estadísticas <ChevronRight /></button></div>
          <ProgressSummary controller={controller} />
        </CrystalPanel>
        <CrystalPanel contentClassName="home-panel-content">
          <div className="panel-heading"><h2><BarChart3 />Estadísticas rápidas</h2><CrystalTag label="Racha" variant="amber" /></div>
          <QuickStats controller={controller} />
        </CrystalPanel>
      </div>
    </div>
  </section>;
}
