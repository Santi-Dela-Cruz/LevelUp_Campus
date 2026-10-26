export type DevisBehaviorState =
  | "cheer_both_hands" // Alza las DOS manos y da saltos de alegría
  | "wave_hello"       // Alza una mano por encima de la cabeza y saluda
  | "pointing"         // Apunta con ángulo exacto (atan2) hacia el elemento seleccionado
  | "walking"          // Camina flexionando caderas, rodillas, tobillos y ambos brazos
  | "jumping"          // Toma impulso flexionando rodillas y salta en el aire
  | "explaining"       // Gesticula con ambos brazos y torso mientras conversa
  | "idle_alive";      // Balancea el peso entre piernas, mueve orejas y sigue el ratón

export interface DevisMascotState {
  behavior: DevisBehaviorState;
  isHovering: boolean;
  /** Posición de Dev'is en pantalla (xVw, yVh) */
  screenPos: { xVw: number; yVh: number };
  /** Coordenada exacta en píxeles (x, y) del elemento al que Dev'is debe señalar */
  pointTargetPx: { x: number; y: number } | null;
  /** Frase corta actual de la conversación progresiva (reemplaza a la anterior) */
  currentLine: string | null;
  /** Paso actual dentro de la conversación (ej. 1/3, 2/3) */
  lineStepIndex: number;
  lineTotalSteps: number;
}

export const INITIAL_DEVIS_STATE: DevisMascotState = {
  behavior: "cheer_both_hands",
  isHovering: false,
  screenPos: { xVw: 52, yVh: 78 },
  pointTargetPx: null,
  currentLine: "¡Hola, Santi! 👋",
  lineStepIndex: 1,
  lineTotalSteps: 3,
};
