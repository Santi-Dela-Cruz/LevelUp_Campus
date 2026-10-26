"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rive, Fit, Alignment, Layout } from "@rive-app/canvas";
import {
  DevisBehaviorState,
  DevisMascotState,
} from "../../models/entities/DevisMascot.model";

interface DevisRiveCanvasRigProps {
  behavior: DevisBehaviorState;
  isHovering: boolean;
  pointTargetPx: { x: number; y: number } | null;
}

/**
 * Esqueleto de Cuerpo Completo (16 Huesos Articulados) en HTML5 <canvas> + @rive-app/canvas:
 * - Pelvis/Raíz (Salto, Squash & Stretch, Balanceo de cadera)
 * - Columna/Torso (Inclinación lateral y respiración)
 * - Cuello/Cabeza + Oreja Izquierda + Oreja Derecha + Visor/Ojos/Gafas con seguimiento X/Y
 * - Brazo Izquierdo (Hombro -> Codo -> Muñeca/Dedos)
 * - Brazo Derecho (Hombro -> Codo -> Muñeca/Dedos)
 * - Pierna Izquierda (Cadera -> Rodilla -> Tobillo/Pie)
 * - Pierna Derecha (Cadera -> Rodilla -> Tobillo/Pie)
 * - Apuntado direccional exacto (atan2) hacia el objetivo real en pantalla (izquierda, derecha o arriba).
 */
export const DevisRiveCanvasCharacter: React.FC<DevisRiveCanvasRigProps> = ({
  behavior,
  isHovering,
  pointTargetPx,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const inputsRef = useRef({
    behavior,
    isHovering,
    pointTargetPx,
    mouseX: 0,
    mouseY: 0,
  });

  useEffect(() => {
    inputsRef.current.behavior = behavior;
    inputsRef.current.isHovering = isHovering;
    inputsRef.current.pointTargetPx = pointTargetPx;
  }, [behavior, isHovering, pointTargetPx]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      inputsRef.current.mouseX = e.clientX;
      inputsRef.current.mouseY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let riveInstance: Rive | null = null;
    const useExternalRivFile = false;
    if (useExternalRivFile) {
      riveInstance = new Rive({
        src: "/rive/devis.riv",
        canvas,
        autoplay: true,
        stateMachines: "DevisStateMachine",
        layout: new Layout({
          fit: Fit.Contain,
          alignment: Alignment.Center,
        }),
      });
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Estado interpolado de los 16 huesos del esqueleto
    const rig = {
      pelvisX: 0,
      pelvisY: 0,
      pelvisRot: 0,
      scaleX: 1,
      scaleY: 1,
      torsoRot: 0,
      neckRot: 0,
      lookX: 0,
      lookY: 0,
      earLRot: 0,
      earRRot: 0,
      // Brazo Izquierdo
      shoulderL: 0.3,
      elbowL: 0.2,
      wristL: 0,
      // Brazo Derecho
      shoulderR: -0.3,
      elbowR: -0.2,
      wristR: 0,
      // Pierna Izquierda
      hipL: 0,
      kneeL: 0,
      footL: 0,
      // Pierna Derecha
      hipR: 0,
      kneeR: 0,
      footR: 0,
    };

    let animFrameId: number;
    const startTime = performance.now();

    const lerp = (curr: number, target: number, factor = 0.16) =>
      curr + (target - curr) * factor;

    const drawPoly = (
      points: [number, number][],
      fill: string,
      stroke?: string,
      lineWidth = 1
    ) => {
      ctx.beginPath();
      ctx.moveTo(points[0][0], points[0][1]);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i][0], points[i][1]);
      }
      ctx.closePath();
      ctx.fillStyle = fill;
      ctx.fill();
      if (stroke) {
        ctx.strokeStyle = stroke;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
      }
    };

    const renderFrame = (now: number) => {
      const t = (now - startTime) / 1000;
      const {
        behavior: curBehavior,
        isHovering: curHover,
        pointTargetPx: targetPx,
        mouseX,
        mouseY,
      } = inputsRef.current;

      // Posición de Dev'is en la ventana para cálculo exacto de vectores
      const rect = canvas.getBoundingClientRect();
      const devisScreenX = rect.left + rect.width / 2;
      const devisScreenY = rect.top + rect.height / 2;

      // Vector hacia el objetivo señalado (o hacia el ratón si está libre)
      const focusX = targetPx ? targetPx.x : mouseX || devisScreenX;
      const focusY = targetPx ? targetPx.y : mouseY || devisScreenY;
      const dx = focusX - devisScreenX;
      const dy = focusY - devisScreenY;

      const normX = Math.max(-1, Math.min(1, dx / (window.innerWidth * 0.4)));
      const normY = Math.max(-1, Math.min(1, dy / (window.innerHeight * 0.4)));

      // Metas por defecto (Idle Vivo con balanceo de cuerpo completo)
      let tPelvisX = Math.sin(t * 2.2) * 3.5;
      let tPelvisY = Math.abs(Math.sin(t * 2.2)) * -4;
      let tPelvisRot = Math.sin(t * 2.2) * 0.04;
      let tScaleX = 1 + Math.sin(t * 4.4) * 0.015;
      let tScaleY = 1 - Math.sin(t * 4.4) * 0.015;
      let tTorsoRot = Math.sin(t * 2.2) * 0.05 + normX * 0.06;
      let tNeckRot = normX * 0.18 + Math.sin(t * 3.1) * 0.04;
      let tEarL = Math.sin(t * 4.2) * 0.12;
      let tEarR = -Math.sin(t * 4.2 + 0.5) * 0.12;

      // Piernas vivas en reposo (flexión alternada de rodillas y cadera)
      let tHipL = Math.sin(t * 2.2) * 0.12;
      let tKneeL = Math.max(0, Math.sin(t * 2.2)) * 0.22;
      let tFootL = -tHipL * 0.5;
      let tHipR = -Math.sin(t * 2.2) * 0.12;
      let tKneeR = Math.max(0, -Math.sin(t * 2.2)) * 0.22;
      let tFootR = -tHipR * 0.5;

      // Brazos vivos en reposo
      let tShoulderL = 0.26 + Math.sin(t * 2.5) * 0.08;
      let tElbowL = 0.22 + Math.cos(t * 2.5) * 0.08;
      let tWristL = Math.sin(t * 3) * 0.08;

      let tShoulderR = -0.26 - Math.sin(t * 2.5) * 0.08;
      let tElbowR = -0.22 - Math.cos(t * 2.5) * 0.08;
      let tWristR = -Math.sin(t * 3) * 0.08;

      let pointingSide: "left" | "right" | "none" = "none";

      // ==================== MÁQUINA DE ESTADOS DE CUERPO COMPLETO ====================
      if (curBehavior === "walking") {
        // CAMINATA DINÁMICA: Piernas, rodillas, tobillos, cadera, torso y ambos brazos
        const wSpeed = t * 11;
        tPelvisY = Math.abs(Math.sin(wSpeed)) * -11;
        tPelvisRot = Math.sin(wSpeed) * 0.09;
        tTorsoRot = Math.sin(wSpeed) * 0.11;
        tEarL = Math.sin(wSpeed * 2) * 0.22;
        tEarR = -Math.sin(wSpeed * 2) * 0.22;

        tHipL = Math.sin(wSpeed) * 0.62;
        tKneeL = Math.max(0, Math.cos(wSpeed)) * 0.68;
        tFootL = Math.sin(wSpeed) * 0.28;

        tHipR = -Math.sin(wSpeed) * 0.62;
        tKneeR = Math.max(0, -Math.cos(wSpeed)) * 0.68;
        tFootR = -Math.sin(wSpeed) * 0.28;

        tShoulderL = -Math.sin(wSpeed) * 0.58;
        tElbowL = 0.35 + Math.sin(wSpeed) * 0.25;
        tShoulderR = Math.sin(wSpeed) * 0.58;
        tElbowR = -0.35 + Math.sin(wSpeed) * 0.25;
      } else if (curBehavior === "cheer_both_hands") {
        // ALZAR LAS DOS MANOS Y SALTAR DE EMOCIÓN
        const jumpWave = Math.sin(t * 8.5);
        const isAirborne = jumpWave > 0;
        tPelvisY = isAirborne ? -jumpWave * 22 : jumpWave * 6;
        tScaleX = isAirborne ? 0.95 : 1.06;
        tScaleY = isAirborne ? 1.06 : 0.94;
        tTorsoRot = Math.sin(t * 6) * 0.08;
        tEarL = -0.25 + Math.sin(t * 12) * 0.2;
        tEarR = 0.25 - Math.sin(t * 12) * 0.2;

        // Ambos brazos bien arriba de la cabeza saludando
        tShoulderL = 2.48 + Math.sin(t * 10) * 0.22;
        tElbowL = Math.sin(t * 12) * 0.45;
        tWristL = Math.sin(t * 12) * 0.3;

        tShoulderR = -2.48 - Math.sin(t * 10) * 0.22;
        tElbowR = -Math.sin(t * 12) * 0.45;
        tWristR = -Math.sin(t * 12) * 0.3;

        // Piernas flexionan al saltar
        tHipL = isAirborne ? 0.28 : -0.22;
        tKneeL = isAirborne ? 0.45 : 0.35;
        tHipR = isAirborne ? -0.28 : 0.22;
        tKneeR = isAirborne ? -0.45 : -0.35;
      } else if (curBehavior === "jumping") {
        // SALTO ACROBÁTICO CON SQUASH & STRETCH
        const jPhase = Math.sin(t * 7.5);
        tPelvisY = jPhase > 0 ? -jPhase * 26 : jPhase * 8;
        tScaleX = jPhase > 0 ? 0.93 : 1.08;
        tScaleY = jPhase > 0 ? 1.08 : 0.92;
        tShoulderL = jPhase > 0 ? 2.1 : 0.5;
        tShoulderR = jPhase > 0 ? -2.1 : -0.5;
        tKneeL = jPhase > 0 ? 0.55 : 0.3;
        tKneeR = jPhase > 0 ? -0.55 : -0.3;
      } else if (curBehavior === "wave_hello") {
        // SALUDAR ALZANDO UNA MANO Y BALANCEANDO CADERA
        tPelvisX = Math.sin(t * 4) * 5;
        tPelvisRot = Math.sin(t * 4) * 0.07;
        tShoulderL = 2.42 + Math.sin(t * 8) * 0.18;
        tElbowL = Math.sin(t * 11) * 0.62;
        tWristL = Math.sin(t * 11 + 0.5) * 0.38;
        // Mano derecha en la cintura
        tShoulderR = -0.65;
        tElbowR = 0.85;
      } else if (curHover || curBehavior === "pointing") {
        // SEÑALAR DIRECCIONAL EXACTO HACIA EL OBJETIVO (Izquierda, Derecha o Arriba)
        // En nuestro sistema local, rotar un brazo por `atan2(-dx, dy)` apunta su eje +Y directamente hacia (dx, dy)
        const exactAimAngle = Math.atan2(-dx, dy);
        const pulse = Math.sin(t * 6) * 0.06;

        if (dx >= 0) {
          // El objetivo está a la DERECHA de Dev'is -> Usa el BRAZO DERECHO para apuntar hacia allá
          pointingSide = "right";
          tShoulderR = exactAimAngle + pulse;
          tElbowR = 0;
          tWristR = 0;
          // Brazo izquierdo se apoya en la cadera con estilo
          tShoulderL = 0.65;
          tElbowL = -0.75;
          tTorsoRot = 0.1;
          tPelvisX = 4;
          tHipR = -0.15;
          tKneeR = -0.25;
        } else {
          // El objetivo está a la IZQUIERDA de Dev'is -> Usa el BRAZO IZQUIERDO para apuntar hacia allá
          pointingSide = "left";
          tShoulderL = exactAimAngle + pulse;
          tElbowL = 0;
          tWristL = 0;
          // Brazo derecho se apoya en la cadera
          tShoulderR = -0.65;
          tElbowR = 0.75;
          tTorsoRot = -0.1;
          tPelvisX = -4;
          tHipL = 0.15;
          tKneeL = 0.25;
        }
      } else if (curBehavior === "explaining") {
        // CONVERSANDO / EXPLICANDO: Gesticula con ambos brazos, torso y piernas
        tPelvisY = Math.abs(Math.sin(t * 5)) * -5;
        tTorsoRot = Math.sin(t * 4) * 0.09;
        tShoulderL = 1.45 + Math.sin(t * 7) * 0.35;
        tElbowL = 0.4 + Math.cos(t * 7) * 0.3;
        tShoulderR = -1.45 - Math.cos(t * 7) * 0.35;
        tElbowR = -0.4 - Math.sin(t * 7) * 0.3;
      }

      // Interpolación suave de los 16 huesos
      rig.pelvisX = lerp(rig.pelvisX, tPelvisX, 0.18);
      rig.pelvisY = lerp(rig.pelvisY, tPelvisY, 0.22);
      rig.pelvisRot = lerp(rig.pelvisRot, tPelvisRot, 0.18);
      rig.scaleX = lerp(rig.scaleX, tScaleX, 0.2);
      rig.scaleY = lerp(rig.scaleY, tScaleY, 0.2);
      rig.torsoRot = lerp(rig.torsoRot, tTorsoRot, 0.16);
      rig.neckRot = lerp(rig.neckRot, tNeckRot, 0.16);
      rig.lookX = lerp(rig.lookX, normX * 12, 0.18);
      rig.lookY = lerp(rig.lookY, normY * 8, 0.18);
      rig.earLRot = lerp(rig.earLRot, tEarL, 0.2);
      rig.earRRot = lerp(rig.earRRot, tEarR, 0.2);

      rig.shoulderL = lerp(rig.shoulderL, tShoulderL, 0.18);
      rig.elbowL = lerp(rig.elbowL, tElbowL, 0.2);
      rig.wristL = lerp(rig.wristL, tWristL, 0.22);

      rig.shoulderR = lerp(rig.shoulderR, tShoulderR, 0.18);
      rig.elbowR = lerp(rig.elbowR, tElbowR, 0.2);
      rig.wristR = lerp(rig.wristR, tWristR, 0.22);

      rig.hipL = lerp(rig.hipL, tHipL, 0.2);
      rig.kneeL = lerp(rig.kneeL, tKneeL, 0.2);
      rig.footL = lerp(rig.footL, tFootL, 0.2);

      rig.hipR = lerp(rig.hipR, tHipR, 0.2);
      rig.kneeR = lerp(rig.kneeR, tKneeR, 0.2);
      rig.footR = lerp(rig.footR, tFootR, 0.2);

      // ==================== RENDERIZADO DEL ESQUELETO EN EL LIENZO ====================
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.translate(150, 165);

      // Sombra dinámica que reacciona a la altura del salto (pelvisY)
      ctx.save();
      ctx.translate(rig.pelvisX, 78);
      const shadowScale = Math.max(0.55, 1 + rig.pelvisY * 0.012);
      ctx.scale(shadowScale, shadowScale);
      ctx.beginPath();
      ctx.ellipse(0, 0, 44, 9, 0, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(5, 8, 17, 0.62)";
      ctx.fill();
      ctx.restore();

      // Transformación del Hueso Raíz (Pelvis + Squash & Stretch)
      ctx.translate(rig.pelvisX, rig.pelvisY);
      ctx.rotate(rig.pelvisRot);
      ctx.scale(rig.scaleX, rig.scaleY);

      // ---------------- PIERNA IZQUIERDA (Cadera -> Rodilla -> Pie) ----------------
      ctx.save();
      ctx.translate(-22, 30);
      ctx.rotate(rig.hipL);
      // Esfera de cadera + Muslo
      ctx.beginPath();
      ctx.arc(0, 0, 7, 0, Math.PI * 2);
      ctx.fillStyle = "#1E1B4B";
      ctx.fill();
      drawPoly(
        [
          [-11, 0],
          [11, 2],
          [9, 22],
          [-9, 22],
        ],
        "#CBD5E1"
      );
      // Articulación de Rodilla Izquierda (0, 22)
      ctx.translate(0, 22);
      ctx.rotate(rig.kneeL);
      ctx.beginPath();
      ctx.arc(0, 0, 6, 0, Math.PI * 2);
      ctx.fillStyle = "#1E1B4B";
      ctx.fill();
      drawPoly(
        [
          [-9, 0],
          [9, 0],
          [8, 18],
          [-8, 18],
        ],
        "#94A3B8"
      );
      // Articulación de Tobillo y Pie Izquierdo (0, 18)
      ctx.translate(0, 18);
      ctx.rotate(rig.footL);
      drawPoly(
        [
          [-14, -2],
          [11, -2],
          [13, 8],
          [-16, 8],
        ],
        "#1E1B4B"
      );
      ctx.restore();

      // ---------------- PIERNA DERECHA (Cadera -> Rodilla -> Pie) ----------------
      ctx.save();
      ctx.translate(22, 30);
      ctx.rotate(rig.hipR);
      ctx.beginPath();
      ctx.arc(0, 0, 7, 0, Math.PI * 2);
      ctx.fillStyle = "#1E1B4B";
      ctx.fill();
      drawPoly(
        [
          [-11, 2],
          [11, 0],
          [9, 22],
          [-9, 22],
        ],
        "#94A3B8"
      );
      // Articulación de Rodilla Derecha (0, 22)
      ctx.translate(0, 22);
      ctx.rotate(rig.kneeR);
      ctx.beginPath();
      ctx.arc(0, 0, 6, 0, Math.PI * 2);
      ctx.fillStyle = "#1E1B4B";
      ctx.fill();
      drawPoly(
        [
          [-9, 0],
          [9, 0],
          [8, 18],
          [-8, 18],
        ],
        "#64748B"
      );
      // Articulación de Tobillo y Pie Derecho (0, 18)
      ctx.translate(0, 18);
      ctx.rotate(rig.footR);
      drawPoly(
        [
          [-11, -2],
          [14, -2],
          [16, 8],
          [-13, 8],
        ],
        "#1E1B4B"
      );
      ctx.restore();

      // ---------------- COLUMNA Y TORSO ARTICULADO ----------------
      ctx.save();
      ctx.translate(0, 24);
      ctx.rotate(rig.torsoRot);
      ctx.translate(0, -24);

      // Pelvis / Base del torso
      drawPoly(
        [
          [-46, 20],
          [0, 34],
          [46, 20],
          [36, 38],
          [0, 44],
          [-36, 38],
        ],
        "#64748B"
      );
      // Cuerpo Low-Poly
      drawPoly(
        [
          [-42, -36],
          [0, -32],
          [0, 34],
          [-50, 18],
        ],
        "#CBD5E1"
      );
      drawPoly(
        [
          [0, -32],
          [42, -36],
          [50, 18],
          [0, 34],
        ],
        "#E2E8F0"
      );
      drawPoly(
        [
          [-25, -34],
          [0, -32],
          [25, -34],
          [32, 2],
          [-32, 2],
        ],
        "#F8FAFC"
      );
      // Collar del cuello
      drawPoly(
        [
          [-35, -40],
          [0, -33],
          [35, -40],
          [28, -31],
          [0, -26],
          [-28, -31],
        ],
        "#1E1B4B"
      );
      // Panel frontal del pecho
      drawPoly(
        [
          [-30, -4],
          [0, 0],
          [0, 30],
          [-24, 22],
        ],
        "#2E1A47"
      );
      drawPoly(
        [
          [0, 0],
          [30, -4],
          [24, 22],
          [0, 30],
        ],
        "#3B215D"
      );
      // Runa reactiva en el pecho
      const isExcited =
        curHover ||
        curBehavior === "pointing" ||
        curBehavior === "cheer_both_hands" ||
        curBehavior === "explaining";
      drawPoly(
        [
          [-4, 8],
          [4, 8],
          [0, 19],
        ],
        isExcited ? "#FACC15" : "#8B5CF6"
      );

      // ---------------- CUELLO, CABEZA Y OREJAS ARTICULADAS ----------------
      ctx.save();
      ctx.translate(0, -40);
      ctx.rotate(rig.neckRot);

      // Oreja Izquierda Articulada (-44, -56)
      ctx.save();
      ctx.translate(-44, -56);
      ctx.rotate(rig.earLRot);
      drawPoly(
        [
          [-18, 0],
          [-12, -24],
          [10, -22],
          [18, -10],
          [-8, 6],
        ],
        "#CBD5E1"
      );
      drawPoly(
        [
          [-10, 0],
          [-7, -17],
          [8, -15],
          [12, -8],
        ],
        "#2E1A47"
      );
      ctx.restore();

      // Oreja Derecha Articulada (44, -56)
      ctx.save();
      ctx.translate(44, -56);
      ctx.rotate(rig.earRRot);
      drawPoly(
        [
          [18, 0],
          [12, -24],
          [-10, -22],
          [-18, -10],
          [8, 6],
        ],
        "#E2E8F0"
      );
      drawPoly(
        [
          [10, 0],
          [7, -17],
          [-8, -15],
          [-12, -8],
        ],
        "#2E1A47"
      );
      ctx.restore();

      // Cabeza Low-Poly
      drawPoly(
        [
          [-50, -62],
          [0, -72],
          [50, -62],
          [66, -36],
          [56, -6],
          [0, 4],
          [-56, -6],
          [-66, -36],
        ],
        "#E2E8F0"
      );
      drawPoly(
        [
          [-50, -62],
          [0, -72],
          [0, 4],
          [-56, -6],
          [-66, -36],
        ],
        "#CBD5E1"
      );
      drawPoly(
        [
          [-36, -66],
          [0, -72],
          [36, -66],
          [46, -52],
          [-46, -52],
        ],
        "#F8FAFC"
      );

      // Visor Oscuro
      drawPoly(
        [
          [-50, -48],
          [0, -54],
          [50, -48],
          [54, -16],
          [0, -8],
          [-54, -16],
        ],
        "#111625"
      );

      // Seguimiento Ocular y de Gafas (X/Y)
      ctx.save();
      ctx.translate(rig.lookX, rig.lookY);

      const blink = t % 3.4 > 3.26 ? 0.12 : 1;
      const eyeColor = isExcited ? "#FACC15" : "#F8FAFC";

      ctx.save();
      ctx.translate(-21, -32);
      ctx.scale(1, blink);
      ctx.beginPath();
      ctx.ellipse(0, 0, 8, 11, 0, 0, Math.PI * 2);
      ctx.fillStyle = eyeColor;
      ctx.fill();
      ctx.restore();

      ctx.save();
      ctx.translate(21, -32);
      ctx.scale(1, blink);
      ctx.beginPath();
      ctx.ellipse(0, 0, 8, 11, 0, 0, Math.PI * 2);
      ctx.fillStyle = eyeColor;
      ctx.fill();
      ctx.restore();

      const glassesColor = isExcited ? "#FACC15" : "#6B3FA0";
      drawPoly(
        [
          [-52, -42],
          [-38, -52],
          [-13, -50],
          [-5, -38],
          [-9, -19],
          [-40, -17],
          [-52, -27],
        ],
        "rgba(0,0,0,0)",
        glassesColor,
        5
      );
      drawPoly(
        [
          [52, -42],
          [38, -52],
          [13, -50],
          [5, -38],
          [9, -19],
          [40, -17],
          [52, -27],
        ],
        "rgba(0,0,0,0)",
        glassesColor,
        5
      );
      ctx.beginPath();
      ctx.moveTo(-5, -36);
      ctx.lineTo(5, -36);
      ctx.strokeStyle = glassesColor;
      ctx.lineWidth = 5;
      ctx.stroke();

      ctx.restore(); // Fin de Look X/Y
      ctx.restore(); // Fin de Cabeza/Cuello

      // Función auxiliar para dibujar cualquiera de los 2 brazos articulados (Hombro -> Codo -> Muñeca/Mano)
      const drawArticulatedArm = (
        shoulderX: number,
        shoulderY: number,
        sRot: number,
        eRot: number,
        wRot: number,
        isPointingThisArm: boolean,
        isWavingThisArm: boolean
      ) => {
        ctx.save();
        ctx.translate(shoulderX, shoulderY);
        ctx.rotate(sRot);

        // Esfera del Hombro
        ctx.beginPath();
        ctx.arc(0, 0, 9, 0, Math.PI * 2);
        ctx.fillStyle = "#1E1B4B";
        ctx.fill();

        // Húmero / Brazo Superior
        drawPoly(
          [
            [-7.5, 0],
            [7.5, 0],
            [6.5, 28],
            [-6.5, 28],
          ],
          "#E2E8F0"
        );
        drawPoly(
          [
            [-7.5, 0],
            [0, 0],
            [0, 28],
            [-6.5, 28],
          ],
          "#CBD5E1"
        );

        // Articulación del Codo (0, 28)
        ctx.translate(0, 28);
        ctx.beginPath();
        ctx.arc(0, 0, 6, 0, Math.PI * 2);
        ctx.fillStyle = "#1E1B4B";
        ctx.fill();

        ctx.rotate(eRot);

        // Antebrazo
        drawPoly(
          [
            [-6.5, 0],
            [6.5, 0],
            [5.5, 24],
            [-5.5, 24],
          ],
          "#F8FAFC"
        );

        // Articulación de Muñeca y Mano (0, 24)
        ctx.translate(0, 24);
        ctx.rotate(wRot);

        // Palma
        drawPoly(
          [
            [-8.5, 0],
            [8.5, 0],
            [10, 11],
            [-10, 11],
          ],
          "#1E1B4B"
        );

        if (isPointingThisArm) {
          // Dedo índice extendido apuntando exactamente en la dirección del brazo
          drawPoly(
            [
              [-3.5, 10],
              [3.5, 10],
              [2.5, 28],
              [-2.5, 28],
            ],
            "#FACC15"
          );
        } else {
          // Dedos abiertos para saludar / animar
          const tipColor = isWavingThisArm ? "#FACC15" : "#1E1B4B";
          drawPoly(
            [
              [-8, 10],
              [-4, 10],
              [-5, 22],
              [-9, 22],
            ],
            tipColor
          );
          drawPoly(
            [
              [-2, 10],
              [2, 10],
              [2, 23],
              [-2, 23],
            ],
            "#1E1B4B"
          );
          drawPoly(
            [
              [4, 10],
              [8, 10],
              [9, 21],
              [4, 21],
            ],
            tipColor
          );
        }

        ctx.restore();
      };

      // ---------------- BRAZO IZQUIERDO ARTICULADO ----------------
      drawArticulatedArm(
        -45,
        -26,
        rig.shoulderL,
        rig.elbowL,
        rig.wristL,
        pointingSide === "left",
        curBehavior === "wave_hello" || curBehavior === "cheer_both_hands"
      );

      // ---------------- BRAZO DERECHO ARTICULADO ----------------
      drawArticulatedArm(
        45,
        -26,
        rig.shoulderR,
        rig.elbowR,
        rig.wristR,
        pointingSide === "right",
        curBehavior === "cheer_both_hands"
      );

      ctx.restore(); // Fin de Columna/Torso
      ctx.restore(); // Fin de Pelvis/Raíz

      animFrameId = requestAnimationFrame(renderFrame);
    };

    animFrameId = requestAnimationFrame(renderFrame);

    return () => {
      cancelAnimationFrame(animFrameId);
      if (riveInstance) {
        riveInstance.cleanup();
      }
    };
  }, []);

  return (
    <div className="relative h-52 w-52 select-none">
      <canvas
        ref={canvasRef}
        width={300}
        height={300}
        className="h-full w-full"
      />
    </div>
  );
};

interface DevisAutonomousOverlayProps {
  devisState: DevisMascotState;
}

export const DevisAutonomousOverlayView: React.FC<
  DevisAutonomousOverlayProps
> = ({ devisState }) => {
  return (
    <motion.div
      initial={{ left: "52vw", top: "78vh", opacity: 0 }}
      animate={{
        left: `${devisState.screenPos.xVw}vw`,
        top: `${devisState.screenPos.yVh}vh`,
        opacity: 1,
      }}
      transition={{
        left: { type: "spring", stiffness: 75, damping: 16 },
        top: { type: "spring", stiffness: 75, damping: 16 },
        opacity: { duration: 0.25 },
      }}
      className="pointer-events-none fixed z-50 flex flex-col items-center -translate-x-1/2 -translate-y-1/2"
    >
      {/* Cuadro de Conversación Progresiva estilo "Notificación" de Cristal (Referencias_componentes.png) */}
      <AnimatePresence mode="wait">
        {devisState.currentLine && (
          <motion.div
            key={devisState.currentLine}
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="clip-crystal-subcard relative -mb-3 max-w-[265px] p-[2px] shadow-[0_14px_34px_rgba(4,6,20,0.92)]"
            style={{
              background:
                "linear-gradient(135deg, #C084FC 0%, #6D28D9 50%, #38BDF8 100%)",
            }}
          >
            <div
              className="clip-crystal-subcard flex items-center gap-2.5 px-3.5 py-2.5 text-left"
              style={{
                background:
                  "linear-gradient(160deg, #241C54 0%, #15183B 60%, #0E112B 100%)",
              }}
            >
              {/* Cristal Amatista 3D Facetado (Como en "Notificación" de Referencias_componentes.png) */}
              <svg viewBox="0 0 42 46" className="h-9 w-9 shrink-0 drop-shadow">
                <polygon points="21,2 36,16 28,42 14,42 6,16" fill="#9333EA" />
                <polygon points="21,2 36,16 21,24" fill="#E9D5FF" />
                <polygon points="21,2 6,16 21,24" fill="#C084FC" />
                <polygon points="21,24 36,16 28,42" fill="#6B21A8" />
                <polygon points="6,28 12,20 15,38" fill="#38BDF8" />
                <polygon points="36,26 31,18 29,38" fill="#FACC15" />
              </svg>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold leading-snug text-white">
                  {devisState.currentLine}
                </p>

                {/* Indicador minimalista de progreso de la conversación (ej. • • •) */}
                {devisState.lineTotalSteps > 1 && (
                  <div className="mt-1.5 flex items-center gap-1">
                    {Array.from({ length: devisState.lineTotalSteps }).map(
                      (_, i) => (
                        <span
                          key={i}
                          className={`h-1 rounded-full transition-all ${
                            i + 1 === devisState.lineStepIndex
                              ? "w-3.5 bg-rune-yellow"
                              : "w-1.5 bg-white/30"
                          }`}
                        />
                      )
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Esqueleto de Cuerpo Completo (16 huesos) de Dev'is */}
      <DevisRiveCanvasCharacter
        behavior={devisState.behavior}
        isHovering={devisState.isHovering}
        pointTargetPx={devisState.pointTargetPx}
      />
    </motion.div>
  );
};
