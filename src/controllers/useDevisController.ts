"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import {
  DevisBehaviorState,
  DevisMascotState,
  INITIAL_DEVIS_STATE,
} from "../models/entities/DevisMascot.model";
import {
  LevelNodeEntity,
  SubjectModuleEntity,
} from "../models/entities/SubjectModule.model";
import { BadgeEntity } from "../models/entities/UserProgress.model";

export function useDevisController(studentName: string) {
  const [devisState, setDevisState] =
    useState<DevisMascotState>(INITIAL_DEVIS_STATE);

  const playerNameRef = useRef(studentName);
  useEffect(() => {
    playerNameRef.current = studentName || "Guardián";
  }, [studentName]);

  const lineIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const walkTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idleAnimIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null
  );

  const clearAllTimers = useCallback(() => {
    if (lineIntervalRef.current) {
      clearInterval(lineIntervalRef.current);
      lineIntervalRef.current = null;
    }
    if (walkTimeoutRef.current) {
      clearTimeout(walkTimeoutRef.current);
      walkTimeoutRef.current = null;
    }
  }, []);

  const runProgressiveInteraction = useCallback(
    (options: {
      targetPos: { xVw: number; yVh: number };
      arrivalBehavior: DevisBehaviorState;
      isHovering: boolean;
      pointTargetPx: { x: number; y: number } | null;
      lines: string[];
      lineDurationMs?: number;
    }) => {
      clearAllTimers();
      const {
        targetPos,
        arrivalBehavior,
        isHovering,
        pointTargetPx,
        lines,
        lineDurationMs = 2100,
      } = options;

      setDevisState((prev) => {
        const dist = Math.hypot(
          prev.screenPos.xVw - targetPos.xVw,
          prev.screenPos.yVh - targetPos.yVh
        );
        const shouldWalkFirst = dist > 6;

        if (shouldWalkFirst) {
          walkTimeoutRef.current = setTimeout(() => {
            setDevisState((curr) => ({
              ...curr,
              behavior: arrivalBehavior,
            }));
          }, 550);
        }

        return {
          ...prev,
          behavior: shouldWalkFirst ? "walking" : arrivalBehavior,
          isHovering,
          screenPos: targetPos,
          pointTargetPx,
          currentLine: lines[0] ?? null,
          lineStepIndex: 1,
          lineTotalSteps: lines.length,
        };
      });

      if (lines.length > 1) {
        let idx = 1;
        lineIntervalRef.current = setInterval(() => {
          if (idx < lines.length) {
            const nextText = lines[idx];
            const stepNum = idx + 1;
            idx += 1;
            setDevisState((prev) => ({
              ...prev,
              currentLine: nextText,
              lineStepIndex: stepNum,
              behavior:
                prev.isHovering && prev.pointTargetPx
                  ? "pointing"
                  : idx % 2 === 0
                  ? "explaining"
                  : arrivalBehavior,
            }));
          } else {
            clearAllTimers();
            setDevisState((prev) => ({
              ...prev,
              currentLine: null,
              behavior: prev.isHovering ? "pointing" : "idle_alive",
            }));
          }
        }, lineDurationMs);
      } else if (lines.length === 1) {
        walkTimeoutRef.current = setTimeout(() => {
          setDevisState((prev) => ({
            ...prev,
            currentLine: null,
            behavior: prev.isHovering ? "pointing" : "idle_alive",
          }));
        }, lineDurationMs);
      }
    },
    [clearAllTimers]
  );

  /** 1. Saludo inicial al abrir la app usando el nombre del jugador */
  useEffect(() => {
    const name = playerNameRef.current;
    runProgressiveInteraction({
      targetPos: { xVw: 50, yVh: 78 },
      arrivalBehavior: "cheer_both_hands",
      isHovering: false,
      pointTargetPx: null,
      lines: [
        `¡Hola, ${name}! 👋`,
        "Bienvenido a LevelUp Campus.",
        "Acércate a un módulo y te lo explico.",
      ],
      lineDurationMs: 2000,
    });
    return () => clearAllTimers();
  }, [runProgressiveInteraction, clearAllTimers]);

  /** 2. Ciclo de vida autónomo en reposo */
  useEffect(() => {
    idleAnimIntervalRef.current = setInterval(() => {
      setDevisState((prev) => {
        if (prev.isHovering || prev.currentLine !== null) return prev;
        const idleCycle: DevisBehaviorState[] = [
          "idle_alive",
          "jumping",
          "idle_alive",
          "wave_hello",
          "idle_alive",
          "cheer_both_hands",
        ];
        const randomNext =
          idleCycle[Math.floor(Math.random() * idleCycle.length)];
        return {
          ...prev,
          behavior: randomNext,
        };
      });
    }, 3800);

    return () => {
      if (idleAnimIntervalRef.current)
        clearInterval(idleAnimIntervalRef.current);
    };
  }, []);

  /**
   * 2.5 Evasión Inteligente de Cursor (Auto-Dodge):
   * Si el usuario acerca el ratón a donde está Dev'is (por ejemplo, para elegir
   * el color de poder de los pantalones en la esquina inferior derecha),
   * Dev'is camina automáticamente hacia un punto libre para no estorbar la vista ni la acción.
   */
  useEffect(() => {
    let dodgeCooldown = false;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (dodgeCooldown) return;

      setDevisState((prev) => {
        // Si Dev'is está señalando activamente un módulo o insignia bajo hover, no evadir
        if (prev.isHovering) return prev;

        const devisPxX = (prev.screenPos.xVw / 100) * window.innerWidth;
        const devisPxY = (prev.screenPos.yVh / 100) * window.innerHeight;
        const distPx = Math.hypot(e.clientX - devisPxX, e.clientY - devisPxY);

        if (distPx < 155) {
          dodgeCooldown = true;
          setTimeout(() => {
            dodgeCooldown = false;
          }, 950);

          // Candidatos seguros donde Dev'is puede desplazarse lejos del cursor
          const safeCandidates = [
            { xVw: 38.5, yVh: 64 },
            { xVw: 10, yVh: 80 },
            { xVw: 91, yVh: 82 },
            { xVw: 40, yVh: 22 },
          ];

          let bestSpot = safeCandidates[0];
          let maxDist = -1;

          for (const spot of safeCandidates) {
            const sx = (spot.xVw / 100) * window.innerWidth;
            const sy = (spot.yVh / 100) * window.innerHeight;
            const d = Math.hypot(e.clientX - sx, e.clientY - sy);
            if (d > maxDist) {
              maxDist = d;
              bestSpot = spot;
            }
          }

          setTimeout(() => {
            setDevisState((curr) => ({
              ...curr,
              behavior: "idle_alive",
            }));
          }, 520);

          return {
            ...prev,
            behavior: "walking",
            screenPos: bestSpot,
          };
        }

        return prev;
      });
    };

    window.addEventListener("mousemove", handleGlobalMouseMove, {
      passive: true,
    });
    return () =>
      window.removeEventListener("mousemove", handleGlobalMouseMove);
  }, []);

  /** 3. Al pasar el cursor sobre un Módulo */
  const onModuleMouseEnter = useCallback(
    (module: SubjectModuleEntity, index: number, rect?: DOMRect) => {
      const name = playerNameRef.current;
      const targetCenterPx = rect
        ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
        : {
            x: index === 0 ? window.innerWidth * 0.22 : window.innerWidth * 0.5,
            y: window.innerHeight * 0.36,
          };

      const devisX = index === 0 ? 22 : 48;
      const devisY = 78;

      const shortLines =
        module.id === "verificacion-validacion-software"
          ? [
              `¡Mira, ${name}! Es V&V de Software ✨`,
              "Practicaremos pruebas estáticas y dinámicas.",
              "¡Ya tienes el 60% completado!",
            ]
          : [
              `¡Gestión de Procesos de Calidad, ${name}! 🚀`,
              "Dominarás normas ISO 25010, CMMI y SQA.",
              "¡Haz clic para abrir tu camino!",
            ];

      runProgressiveInteraction({
        targetPos: { xVw: devisX, yVh: devisY },
        arrivalBehavior: "pointing",
        isHovering: true,
        pointTargetPx: targetCenterPx,
        lines: shortLines,
        lineDurationMs: 1950,
      });
    },
    [runProgressiveInteraction]
  );

  const onModuleMouseLeave = useCallback(() => {
    clearAllTimers();
    setDevisState((prev) => ({
      ...prev,
      isHovering: false,
      pointTargetPx: null,
      currentLine: null,
      behavior: "idle_alive",
    }));
  }, [clearAllTimers]);

  /** 4. Al pasar el cursor sobre una Insignia */
  const onBadgeMouseEnter = useCallback(
    (badge: BadgeEntity, rect?: DOMRect) => {
      const name = playerNameRef.current;
      const targetCenterPx = rect
        ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
        : { x: window.innerWidth * 0.82, y: window.innerHeight * 0.52 };

      runProgressiveInteraction({
        targetPos: { xVw: 60, yVh: 76 },
        arrivalBehavior: "pointing",
        isHovering: true,
        pointTargetPx: targetCenterPx,
        lines: [
          `Insignia: ${badge.title} 🏆`,
          badge.description,
          badge.unlocked
            ? `¡Ya es tuya, ${name}!`
            : `¡Pronto la ganarás, ${name}!`,
        ],
        lineDurationMs: 1900,
      });
    },
    [runProgressiveInteraction]
  );

  const onBadgeMouseLeave = useCallback(() => {
    clearAllTimers();
    setDevisState((prev) => ({
      ...prev,
      isHovering: false,
      pointTargetPx: null,
      currentLine: null,
      behavior: "idle_alive",
    }));
  }, [clearAllTimers]);

  /** 5. Cuando el usuario cambia su nombre en la forja de personaje */
  const celebrateNameUpdate = useCallback(
    (newName: string) => {
      const clean = newName.trim() || "Guardián";
      runProgressiveInteraction({
        targetPos: { xVw: 88, yVh: 78 },
        arrivalBehavior: "cheer_both_hands",
        isHovering: false,
        pointTargetPx: null,
        lines: [
          `¡Encantado, ${clean}! 🙌`,
          `A partir de ahora te llamaré ${clean}.`,
        ],
        lineDurationMs: 2000,
      });
    },
    [runProgressiveInteraction]
  );

  /** 6. Cuando entras a jugar al Camino de Niveles */
  const enterPlayingMode = useCallback(
    (module: SubjectModuleEntity) => {
      const name = playerNameRef.current;
      runProgressiveInteraction({
        targetPos: { xVw: 90, yVh: 82 },
        arrivalBehavior: "cheer_both_hands",
        isHovering: false,
        pointTargetPx: null,
        lines: [
          `¡Adelante, ${name}! 🎯`,
          "Me quedaré en la esquina mientras juegas.",
        ],
        lineDurationMs: 1900,
      });
    },
    [runProgressiveInteraction]
  );

  /** 7. Al tocar un nivel dentro del camino */
  const explainDuringGame = useCallback(
    (level: LevelNodeEntity, rect?: DOMRect) => {
      const name = playerNameRef.current;
      const targetCenterPx = rect
        ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
        : { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 };

      if (level.status === "locked") {
        runProgressiveInteraction({
          targetPos: { xVw: 82, yVh: 74 },
          arrivalBehavior: "pointing",
          isHovering: true,
          pointTargetPx: targetCenterPx,
          lines: [
            `${level.label} bloqueado, ${name} 🔒`,
            `Supera el nivel anterior para abrir "${level.topicTitle}".`,
          ],
          lineDurationMs: 2000,
        });
      } else {
        runProgressiveInteraction({
          targetPos: { xVw: 84, yVh: 76 },
          arrivalBehavior: "jumping",
          isHovering: true,
          pointTargetPx: targetCenterPx,
          lines: [
            `¡Vamos por ${level.label}, ${name}! ⚡`,
            `Tema: ${level.topicTitle}.`,
          ],
          lineDurationMs: 1900,
        });
      }
    },
    [runProgressiveInteraction]
  );

  const reactToNavSection = useCallback(
    (
      section:
        | "inicio"
        | "modulos"
        | "misiones"
        | "perfil"
        | "insignias"
        | "estadisticas"
        | "configuracion"
    ) => {
      const name = playerNameRef.current;
      if (section === "perfil") {
        runProgressiveInteraction({
          targetPos: { xVw: 38.5, yVh: 64 },
          arrivalBehavior: "wave_hello",
          isHovering: false,
          pointTargetPx: null,
          lines: [
            `¡Armería de ${name}! 🛡️`,
            "Personaliza tu personaje y equipa tus conjuntos.",
          ],
          lineDurationMs: 1900,
        });
      } else if (section === "insignias") {
        runProgressiveInteraction({
          targetPos: { xVw: 84, yVh: 78 },
          arrivalBehavior: "cheer_both_hands",
          isHovering: false,
          pointTargetPx: null,
          lines: [
            `¡Tus logros e insignias, ${name}! ✨`,
            "Pasa el cursor por cualquiera para analizarla.",
          ],
          lineDurationMs: 1900,
        });
      } else if (section === "misiones") {
        runProgressiveInteraction({
          targetPos: { xVw: 84, yVh: 78 },
          arrivalBehavior: "pointing",
          isHovering: false,
          pointTargetPx: null,
          lines: [
            `¡Tus últimas misiones, ${name}! 🚩`,
            "Elige una misión activa para ir a su camino.",
          ],
          lineDurationMs: 1900,
        });
      } else if (section === "estadisticas") {
        runProgressiveInteraction({
          targetPos: { xVw: 86, yVh: 78 },
          arrivalBehavior: "explaining",
          isHovering: false,
          pointTargetPx: null,
          lines: [
            `¡Tus métricas académicas, ${name}! 📊`,
            "Cada avance cuenta para subir de nivel.",
          ],
          lineDurationMs: 1900,
        });
      } else {
        runProgressiveInteraction({
          targetPos: { xVw: 88, yVh: 78 },
          arrivalBehavior: "wave_hello",
          isHovering: false,
          pointTargetPx: null,
          lines: [`¡Listo para avanzar, ${name}! 👋`],
          lineDurationMs: 1800,
        });
      }
    },
    [runProgressiveInteraction]
  );

  return {
    devisState,
    onModuleMouseEnter,
    onModuleMouseLeave,
    onBadgeMouseEnter,
    onBadgeMouseLeave,
    celebrateNameUpdate,
    enterPlayingMode,
    explainDuringGame,
    reactToNavSection,
  };
}
