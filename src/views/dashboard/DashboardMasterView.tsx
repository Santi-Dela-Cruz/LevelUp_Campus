"use client";

import React, { useEffect, useRef, useState } from "react";
import { BarChart3, Bell, BookOpen, CalendarDays, ChevronDown, ChevronRight, Flag, Home, Search, Settings, Sparkles, Trophy, User, X } from "lucide-react";
import { TopBarSection, useDashboardController } from "../../controllers/useDashboardController";
import { SubjectModulesGridView } from "./SubjectModulesGridView";
import { BadgesAndLeaderboardView } from "./BadgesAndLeaderboardView";
import { DashboardHomeView, ProgressSummary, QuickStats } from "./DashboardHomeView";
import { DevisAutonomousOverlayView } from "../mascot/DevisMascotView";
import { ModuleProgressPathView } from "../path/ModuleProgressPathView";
import { PlayerLowPolyAvatar, PlayerProfileView } from "../avatar/PlayerAvatarView";
import { CrystalButton, CrystalCircularProgress, CrystalGemIcon, CrystalMountainCrestSvg, CrystalPanel, CrystalProgressBar, CrystalTag } from "../components/LowPolyUI";
import { FitContent, GameViewport } from "../components/GameViewport";

const navigation: { id: TopBarSection; label: string; icon: typeof Home }[] = [
  { id: "inicio", label: "Inicio", icon: Home },
  { id: "perfil", label: "Mi Personaje", icon: User },
  { id: "misiones", label: "Misiones", icon: Flag },
  { id: "modulos", label: "Módulos", icon: BookOpen },
  { id: "insignias", label: "Logros", icon: Trophy },
  { id: "estadisticas", label: "Estadísticas", icon: BarChart3 },
  { id: "configuracion", label: "Configuración", icon: Settings },
];

function PlayerAttributesRadar() {
  const attributes = [
    { label: "Inteligencia", value: 90, color: "#22D3EE" },
    { label: "Velocidad", value: 82, color: "#818CF8" },
    { label: "Constancia", value: 80, color: "#A855F7" },
    { label: "Dominio", value: 70, color: "#8B5CF6" },
    { label: "Resolución", value: 80, color: "#38BDF8" },
    { label: "Disciplina", value: 90, color: "#06B6D4" },
  ];
  const center = 130;
  const radius = 92;
  const point = (index: number, value: number, scale = radius) => {
    const angle = -Math.PI / 2 + index * (Math.PI * 2 / attributes.length);
    const distance = scale * value / 100;
    return `${center + Math.cos(angle) * distance},${center + Math.sin(angle) * distance}`;
  };
  const outline = Array.from({ length: 6 }, (_, index) => point(index, 100)).join(" ");
  const values = attributes.map((attribute, index) => point(index, attribute.value)).join(" ");
  return <div className="attributes-layout">
    <div className="radar-wrap">
      <svg viewBox="0 0 260 260" className="radar-chart" role="img" aria-label="Radar de atributos del jugador">
        {[20, 40, 60, 80, 100].map(level => <polygon key={level} points={Array.from({ length: 6 }, (_, index) => point(index, level)).join(" ")} fill="none" stroke="#5268B2" strokeWidth="1" opacity=".7" />)}
        {attributes.map((_, index) => <line key={index} x1={center} y1={center} x2={point(index, 100).split(",")[0]} y2={point(index, 100).split(",")[1]} stroke="#5268B2" strokeWidth="1" opacity=".7" />)}
        <polygon points={outline} fill="none" stroke="#5268B2" strokeWidth="1.5" />
        <polygon points={values} fill="url(#radarFill)" stroke="#22D3EE" strokeWidth="2" />
        <defs><linearGradient id="radarFill" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#06B6D4" stopOpacity=".72" /><stop offset="1" stopColor="#7C3AED" stopOpacity=".72" /></linearGradient></defs>
        {attributes.map((attribute, index) => {
          const [x, y] = point(index, attribute.value).split(",");
          return <circle key={attribute.label} cx={x} cy={y} r="4" fill={attribute.color} stroke="#D9F9FF" strokeWidth="1" />;
        })}
      </svg>
      <div className="radar-label radar-label-top">Inteligencia<strong>90</strong></div>
      <div className="radar-label radar-label-right-top">Velocidad<strong>82</strong></div>
      <div className="radar-label radar-label-right-bottom">Constancia<strong>80</strong></div>
      <div className="radar-label radar-label-bottom">Dominio<strong>70</strong></div>
      <div className="radar-label radar-label-left-bottom">Resolución<strong>80</strong></div>
      <div className="radar-label radar-label-left-top">Disciplina<strong>90</strong></div>
    </div>
    <div className="attribute-legend">{attributes.map(attribute => <div className="attribute-row" key={attribute.label}><i style={{ background: attribute.color }} /><span>{attribute.label}</span><strong>{attribute.value}</strong></div>)}</div>
  </div>;
}

function CampusScenery({ cave = false }: { cave?: boolean }) {
  return <svg viewBox={cave ? "0 0 220 300" : "0 0 1440 100"} preserveAspectRatio="none" aria-hidden="true" className="campus-scenery">
    {cave ? <>
      <polygon points="0,300 0,20 78,100 60,240" fill="#201B50" /><polygon points="220,300 220,45 152,120 145,260" fill="#2E2265" />
      <polygon points="0,275 55,115 102,180 70,280" fill="#30256A" /><polygon points="95,280 161,72 215,285" fill="#1D2451" />
      <polygon points="28,267 111,235 211,273 95,298" fill="#454171" /><polygon points="28,267 95,298 5,298" fill="#141A38" />
      <polygon points="74,188 107,131 131,192 109,250 75,227" fill="#078EC6" /><polygon points="74,188 107,131 105,209" fill="#34D5F7" />
      <polygon points="107,131 131,192 105,209" fill="#BBF3FF" /><polygon points="105,209 131,192 109,250" fill="#08649E" />
      <polygon points="126,259 145,209 163,251 144,274" fill="#DEAA24" /><polygon points="145,209 163,251 144,247" fill="#FFF083" />
      <polygon points="44,245 60,210 71,251" fill="#9147E6" />
    </> : <>
      <polygon points="0,0 240,0 180,100 0,100" fill="#252858" />
      <polygon points="400,100 500,12 590,100" fill="#202551" /><polygon points="500,12 590,100 540,100" fill="#34306B" />
      <polygon points="550,100 660,0 755,100" fill="#171D47" /><polygon points="660,0 755,100 700,100" fill="#27296C" />
      <polygon points="690,100 780,20 875,100" fill="#35206B" /><polygon points="780,20 875,100 815,100" fill="#211C51" />
      <rect x="805" y="30" width="12" height="65" fill="#7E38D7" /><polygon points="805,30 811,15 817,30" fill="#C076F5" />
      <rect x="824" y="48" width="10" height="48" fill="#27C9E7" /><polygon points="824,48 829,33 834,48" fill="#B2EEFF" />
      <rect x="787" y="57" width="11" height="40" fill="#3C5BE6" /><polygon points="787,57 792,43 798,57" fill="#1DCCED" />
      <polygon points="900,100 1010,20 1140,100" fill="#232955" />
    </>}
  </svg>;
}

export const DashboardMasterView: React.FC = () => {
  const controller = useDashboardController();
  const { studentProgress, activeModule } = controller;
  const [searchQuery, setSearchQuery] = useState("");
  const [guideEnabled, setGuideEnabled] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const query = normalize(searchQuery.trim());
  const searchResults = [
    ...navigation.map(item => ({ label: item.label, run: () => controller.changeTopSection(item.id) })),
    ...controller.modules.map(mod => ({ label: mod.name, run: () => controller.openModuleProgressPath(mod.id) })),
  ].filter(item => query && normalize(item.label).includes(query));
  const navigate = (section: TopBarSection) => {
    setSearchQuery("");
    controller.changeTopSection(section);
  };
  useEffect(() => {
    mainRef.current?.focus({ preventScroll: true });
  }, [controller.activeSection, controller.isInsideModulePath]);
  useEffect(() => {
    const closeSearch = (event: PointerEvent) => {
      if (!searchRef.current?.contains(event.target as Node)) setSearchQuery("");
    };
    document.addEventListener("pointerdown", closeSearch);
    return () => document.removeEventListener("pointerdown", closeSearch);
  }, []);
  useEffect(() => {
    try {
      const settings = JSON.parse(localStorage.getItem("university-display") || "{}");
      setGuideEnabled(settings.guideEnabled !== false);
      setReducedMotion(settings.reducedMotion === true);
    } catch { /* An invalid saved preference must not prevent opening the game. */ }
  }, []);
  const updatePreferences = (guide: boolean, motion: boolean) => {
    setGuideEnabled(guide); setReducedMotion(motion);
    try { localStorage.setItem("university-display", JSON.stringify({ guideEnabled: guide, reducedMotion: motion })); } catch { /* Preferences still work for this session. */ }
  };

  return <>
    <GameViewport>
      <div className={`dashboard-shell ${reducedMotion ? "reduce-motion" : ""}`}>
        <header className="dashboard-header">
          <CampusScenery />
          <button type="button" className="brand" onClick={() => navigate("inicio")} aria-label="LevelUp Campus · Inicio">
            <CrystalMountainCrestSvg className="brand-crest" />
            <h1>LEVELUP<br />CAMPUS</h1>
          </button>
          <div className="header-actions">
            <div ref={searchRef} className="dashboard-search">
              <form role="search" onSubmit={event => { event.preventDefault(); if (searchResults[0]) { searchResults[0].run(); setSearchQuery(""); } }}>
                <Search size={20} /><input aria-label="Buscar secciones o materias" value={searchQuery} onChange={event => setSearchQuery(event.target.value)}
                  onKeyDown={event => { if (event.key === "Escape") setSearchQuery(""); }} placeholder="Buscar..." autoComplete="off" />
                {searchQuery && <button type="button" aria-label="Limpiar búsqueda" onClick={() => setSearchQuery("")}><X size={16} /></button>}
              </form>
              {query && <div className="search-results" aria-label="Resultados de búsqueda">
                {searchResults.length ? searchResults.map(item => <button key={item.label} onClick={() => { item.run(); setSearchQuery(""); }}>{item.label}<ChevronRight size={16} /></button>) : <p role="status">No se encontraron resultados.</p>}
              </div>}
            </div>
            <button type="button" className="notification-button" aria-label="Ver misiones activas" onClick={() => navigate("misiones")}><Bell /><i /></button>
            <button type="button" className="profile-button cut-card" onClick={() => navigate("perfil")} aria-label={`Abrir perfil de ${studentProgress.studentName}`}>
              <PlayerLowPolyAvatar config={studentProgress.avatar} className="header-avatar" /><span><strong>{studentProgress.studentName}</strong><small>Nivel {studentProgress.level}</small></span><ChevronDown size={18} />
            </button>
          </div>
        </header>
        <div className="dashboard-body">
          <aside className="dashboard-sidebar">
            <nav aria-label="Navegación principal">
              {navigation.map(({ id, label, icon: Icon }) => <button key={id} type="button" data-section={id}
                aria-current={controller.activeSection === id ? "page" : undefined} onClick={() => navigate(id)}>
                <Icon /><span>{label}</span>
              </button>)}
            </nav>
            <div className="sidebar-landscape"><CampusScenery cave /><p>EL CONOCIMIENTO<br />TAMBIÉN ES<br />UNA FORMA<br />DE PODER.</p></div>
          </aside>
          <main ref={mainRef} tabIndex={-1} className="dashboard-main" aria-label={navigation.find(item => item.id === controller.activeSection)?.label}>
            {controller.isInsideModulePath ? <div className="module-screen">
              <div className="section-heading"><h2>{activeModule.name}</h2><CrystalButton size="sm" variant="dark" onClick={controller.closeModuleProgressPath}>← Volver a módulos</CrystalButton></div>
              <FitContent width={1440}><ModuleProgressPathView module={activeModule} studentProgress={studentProgress} badges={controller.badges} playerLevelNumber={controller.playerLevelNumber}
                onSelectLevel={controller.selectLevelNode} onBackToDashboard={controller.closeModuleProgressPath} /></FitContent>
            </div> : <>
              {controller.activeSection === "inicio" && <DashboardHomeView controller={controller} />}
              {controller.activeSection === "perfil" && <FitContent width={1440} height={760}><PlayerProfileView studentProgress={studentProgress} onUpdateAvatar={controller.updatePlayerAvatar} onUpdateStudentName={controller.updateStudentName} /></FitContent>}
              {controller.activeSection === "modulos" && <SubjectModulesGridView modules={controller.modules} selectedSubjectId={controller.selectedSubjectId} onOpenModulePath={controller.openModuleProgressPath} onHoverModule={controller.devis.onModuleMouseEnter} onLeaveModule={controller.devis.onModuleMouseLeave} />}
              {controller.activeSection === "insignias" && <BadgesAndLeaderboardView studentProgress={studentProgress} badges={controller.badges} onBadgeMouseEnter={controller.devis.onBadgeMouseEnter} onBadgeMouseLeave={controller.devis.onBadgeMouseLeave} />}
              {controller.activeSection === "misiones" && <CrystalPanel className="h-full" contentClassName="mission-screen">
                <div className="section-heading"><div><h2><Flag />Misiones y objetivos</h2><p>Continúa tu aventura en cada materia.</p></div><CrystalTag className="mission-count-tag" label={`${controller.modules.length} misiones activas`} variant="cyan" /></div>
                <div className="mission-list">{controller.modules.map((mod, index) => {
                  const level = mod.levels.find(item => item.levelNumber === mod.currentLevelNumber)!;
                  return <div className="mission-card cut-card" key={mod.id}><CrystalGemIcon type={index ? "amber" : "purple"} size="md" />
                    <div><h3>{mod.name}</h3><p>{level.label} · {level.topicTitle}</p><CrystalProgressBar percent={mod.progressPercent} variant={index ? "lime-amber" : "cyan"} /><small>{mod.progressPercent}% completado · +{level.xpReward} XP</small></div>
                    <CrystalButton className="mission-action" size="sm" onClick={() => controller.openModuleProgressPath(mod.id)}>Ir a misión <ChevronRight size={16} /></CrystalButton>
                  </div>;
                })}</div>
                <p className="section-note"><Sparkles size={18} />Cada nivel completado te acerca a tu próximo conjunto.</p>
              </CrystalPanel>}
              {controller.activeSection === "estadisticas" && <section className="statistics-screen">
                <div className="statistics-heading"><BarChart3 /><h2>Estadísticas</h2></div>
                <div className="statistics-top">
                  <CrystalPanel cornerDecor="castle" contentClassName="statistics-progress-panel">
                    <div className="statistics-panel-title"><BarChart3 /><h3>Progreso general</h3></div>
                    <div className="statistics-progress-main"><CrystalCircularProgress percent={70} size={190} strokeWidth={13} /><div><h4>Nivel {studentProgress.level}</h4><p className="statistics-xp">{studentProgress.currentXp.toLocaleString("es-EC")} / {studentProgress.nextLevelXp.toLocaleString("es-EC")} XP</p><CrystalProgressBar percent={studentProgress.currentXp / studentProgress.nextLevelXp * 100} variant="lime-amber" heightClass="h-3" /><p className="semester-label"><CalendarDays />{studentProgress.semesterLabel}</p></div></div>
                  </CrystalPanel>
                  <CrystalPanel contentClassName="statistics-attributes-panel">
                    <div className="statistics-panel-title"><Trophy /><h3>Atributos del jugador</h3></div><PlayerAttributesRadar />
                  </CrystalPanel>
                </div>
                <div className="statistics-metrics"><QuickStats controller={controller} /></div>
              </section>}
              {controller.activeSection === "configuracion" && <CrystalPanel className="h-full" contentClassName="settings-screen">
                <div className="section-heading"><div><h2><Settings />Configuración</h2><p>Personaliza tu experiencia en el campus.</p></div></div>
                <label className="setting-row cut-card"><span><strong>Guía de Dev’is</strong><small>Muestra al compañero y sus consejos durante la aventura.</small></span><input type="checkbox" checked={guideEnabled} onChange={event => updatePreferences(event.target.checked, reducedMotion)} /></label>
                <label className="setting-row cut-card"><span><strong>Reducir movimiento</strong><small>Reduce las animaciones de la interfaz y oculta al guía animado.</small></span><input type="checkbox" checked={reducedMotion} onChange={event => updatePreferences(guideEnabled, event.target.checked)} /></label>
                <p className="section-note">Tus preferencias se guardan automáticamente en este navegador.</p>
                <CrystalButton variant="purple" onClick={() => navigate("perfil")}><User size={18} />Personalizar mi personaje</CrystalButton>
              </CrystalPanel>}
            </>}
          </main>
        </div>
      </div>
    </GameViewport>
    {guideEnabled && !reducedMotion && controller.activeSection !== "perfil" && controller.activeSection !== "misiones" && controller.activeSection !== "insignias" && <DevisAutonomousOverlayView devisState={controller.devis.devisState} />}
  </>;
};
