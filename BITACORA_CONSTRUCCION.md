# 📓 Bitácora y Documentación de Construcción del Proyecto (`BITACORA_CONSTRUCCION.md`)

**Proyecto:** Plataforma de Gamificación Académica con la Mascota **Dev'is**  
**Arquitectura:** MVC (Modelo - Vista - Controlador) Modular por Materia  
**Principios de UX/UI:** Leyes de Usabilidad de **Steve Krug** (*"No me hagas pensar"*, jerarquía visual limpia, omisión de palabras innecesarias) + Arte **Low-Poly Minimalista Profesional**  
**Materias Activas en el Prototipo:**
1. **Verificación y Validación de Software** (`verificacion-validacion-software`)
2. **Gestión de Procesos de Calidad** (`gestion-procesos-calidad`)
*(Más 2 submódulos prácticos en la cuadrícula 2x2: Práctica de Pruebas V&V y Estándares/Métricas ISO).*

---

## 🗂️ Índice de Secciones Construidas por Fecha

1. [Sección 1: Planificación, Arquitectura MVC y Sistema de Diseño Low-Poly](#sección-1-planificación-arquitectura-mvc-y-sistema-de-diseño-low-poly) — `2026-10-24 (17:56 - 18:02)`
2. [Sección 2: Configuración Base del Proyecto (Next.js, Tailwind CSS, GSAP, Framer Motion, Lottie)](#sección-2-configuración-base-del-proyecto-nextjs-tailwind-css-gsap-framer-motion-lottie) — `2026-10-24 (18:02 - 18:03)`
3. [Sección 3: Capa Modelo (Models) y Módulos por Materia](#sección-3-capa-modelo-models-y-módulos-por-materia) — `2026-10-24 (18:03 - 18:05)`
4. [Sección 4: Capa Controlador (Controllers) y Motor de Dev'is](#sección-4-capa-controlador-controllers-y-motor-de-devis) — `2026-10-24 (18:05 - 18:06)`
5. [Sección 5: Primera Iteración de Vistas](#sección-5-primera-iteración-de-vistas) — `2026-10-24 (18:06 - 18:09)`
6. [Sección 6: Instalación de Paquetes y Compilación Inicial](#sección-6-instalación-de-paquetes-y-compilación-inicial) — `2026-10-24 (18:10 - 18:13)`
7. [Sección 7: Rediseño Minimalista (Principios de Krug), Mascota Dev'is con Gafas y Camino de Progreso Isométrico](#sección-7-rediseño-minimalista-principios-de-krug-mascota-devis-con-gafas-y-camino-de-progreso-isométrico) — `2026-10-24 (18:27 - 18:35)`
8. [Sección 8: Movimiento Libre de Dev'is por Cualquier Parte de la Pantalla](#sección-8-movimiento-libre-de-devis-por-cualquier-parte-de-la-pantalla) — `2026-10-24 (18:38 - 18:40)`
9. [Sección 9: "Sobreviviendo a la Universidad", Dev'is Autónomo con Articulaciones, 2 Módulos y Personaje Personalizable](#sección-9-sobreviviendo-a-la-universidad-devis-autónomo-con-articulaciones-2-módulos-y-personaje-personalizable) — `2026-10-24 (18:46 - 18:55)`
10. [Sección 10: Esqueleto 2D Visible de Dev'is (Alzar Mano / Señalar), Posicionamiento en Extremos, Camino de Arriba a Abajo, Fuente Avolisse y 4 Variantes de Personaje](#sección-10-esqueleto-2d-visible-de-devis-alzar-mano--señalar-posicionamiento-en-extremos-camino-de-arriba-a-abajo-fuente-avolisse-y-4-variantes-de-personaje) — `2026-10-24 (19:11 - 19:21)`
11. [Sección 11: Integración de Rive (@rive-app/canvas) + Máquina de Estados en Lienzo HTML5, Seguimiento X/Y del Ratón, Acercamiento a Módulos, Barra Estática y Personajes Detallados](#sección-11-integración-de-rive-rive-appcanvas--máquina-de-estados-en-lienzo-html5-seguimiento-xy-del-ratón-acercamiento-a-módulos-barra-estática-y-personajes-detallados) — `2026-10-24 (19:31 - 19:40)`
12. [Sección 12: Conversación Progresiva Frase por Frase, Esqueleto de Cuerpo Completo (16 Huesos: Caminar, Saltar, Alzar Dos Manos) y Señalización Direccional Exacta](#sección-12-conversación-progresiva-frase-por-frase-esqueleto-de-cuerpo-completo-16-huesos-caminar-saltar-alzar-dos-manos-y-señalización-direccional-exacta) — `2026-10-24 (19:45 - 19:51)`

---

## 📅 Detalle de Construcción por Sección y Fecha

### Sección 1: Planificación, Arquitectura MVC y Sistema de Diseño Low-Poly
- **Fecha:** `2026-10-24` | **Hora:** `17:56 - 18:02 (GMT-5)`
- **Estado:** ✅ Completado
- **Archivos:** [`PLAN_PROYECTO.md`](./PLAN_PROYECTO.md)
- **Resumen:** Definición de la estructura MVC modular y extracción de la paleta cromática Low-Poly nocturna.

---

### Sección 2: Configuración Base del Proyecto (Next.js, Tailwind CSS, GSAP, Framer Motion, Lottie)
- **Fecha:** `2026-10-24` | **Hora:** `18:02 - 18:03 (GMT-5)`
- **Estado:** ✅ Completado
- **Archivos:** [`package.json`](./package.json), [`tsconfig.json`](./tsconfig.json), [`tailwind.config.ts`](./tailwind.config.ts), [`postcss.config.mjs`](./postcss.config.mjs), [`next.config.mjs`](./next.config.mjs).

---

### Sección 3: Capa Modelo (Models) y Módulos por Materia
- **Fecha:** `2026-10-24` | **Hora:** `18:03 - 18:05 (GMT-5)` (Actualizado en `18:28`)
- **Estado:** ✅ Completado
- **Archivos:**
  - [`src/models/entities/SubjectModule.model.ts`](./src/models/entities/SubjectModule.model.ts)
  - [`src/models/entities/UserProgress.model.ts`](./src/models/entities/UserProgress.model.ts)
  - [`src/models/entities/DevisMascot.model.ts`](./src/models/entities/DevisMascot.model.ts)
  - [`src/models/subjects/verificacion-validacion-software/module.model.ts`](./src/models/subjects/verificacion-validacion-software/module.model.ts)
  - [`src/models/subjects/gestion-procesos-calidad/module.model.ts`](./src/models/subjects/gestion-procesos-calidad/module.model.ts)
  - [`src/models/repositories/GamificationRepository.model.ts`](./src/models/repositories/GamificationRepository.model.ts)

---

### Sección 4: Capa Controlador (Controllers) y Motor de Dev'is
- **Fecha:** `2026-10-24` | **Hora:** `18:05 - 18:06 (GMT-5)` (Actualizado en `18:29`)
- **Estado:** ✅ Completado
- **Archivos:**
  - [`src/controllers/useDevisController.ts`](./src/controllers/useDevisController.ts)
  - [`src/controllers/useDashboardController.ts`](./src/controllers/useDashboardController.ts)

---

### Sección 5: Primera Iteración de Vistas
- **Fecha:** `2026-10-24` | **Hora:** `18:06 - 18:09 (GMT-5)`
- **Estado:** 🔄 Reemplazado por el Rediseño Limpio en la Sección 7.

---

### Sección 6: Instalación de Paquetes y Compilación Inicial
- **Fecha:** `2026-10-24` | **Hora:** `18:10 - 18:13 (GMT-5)`
- **Estado:** ✅ Completado

---

### Sección 7: Rediseño Minimalista (Principios de Krug), Mascota Dev'is con Gafas y Camino de Progreso Isométrico
- **Fecha:** `2026-10-24` | **Hora:** `18:27 - 18:35 (GMT-5)`
- **Estado:** ✅ Completado y Verificado
- **Archivos creados/actualizados:**
  - [`src/views/dashboard/DashboardMasterView.tsx`](./src/views/dashboard/DashboardMasterView.tsx)
  - [`src/views/dashboard/SubjectModulesGridView.tsx`](./src/views/dashboard/SubjectModulesGridView.tsx)
  - [`src/views/dashboard/BadgesAndLeaderboardView.tsx`](./src/views/dashboard/BadgesAndLeaderboardView.tsx)
  - [`src/views/mascot/DevisMascotView.tsx`](./src/views/mascot/DevisMascotView.tsx)
  - [`src/views/path/ModuleProgressPathView.tsx`](./src/views/path/ModuleProgressPathView.tsx)
- **Detalle técnico de las mejoras implementadas:**
  1. **Aplicación de los Principios de Usabilidad de Steve Krug (*"No me hagas pensar"*):**
     - Eliminación de saturación de texto y bloques innecesarios.
     - Maquetación idéntica al wireframe limpio:
       - **Arriba:** `Barra de opciones` minimalista (`Módulos`, `Camino`, `Insignias`).
       - **Izquierda (8 columnas):** Cuadrícula limpia 2x2 de **Módulos** (*Verificación y Validación de Software*, *Gestión de Procesos de Calidad* y 2 submódulos prácticos).
       - **Derecha (4 columnas):** Panel superior con **Datos del usuario, experiencia (1,053 XP), progreso e insignias**, y en la parte inferior derecha el **contenedor circular de Dev'is**.
  2. **Rediseño de la Mascota "Dev'is" (`DevisLowPolyCharacter`):**
     - Basado en la referencia del personaje Low-Poly tipo osito/robot facetado con **gafas poligonales**, orejas redondeadas, visor oscuro con ojos ovalados brillantes y bolsillo frontal en el pecho, integrado con la paleta de colores del proyecto.
     - **Animaciones interactivas:**
       - **Saludar (`wave`):** Articulación del brazo izquierdo que saluda suavemente y parpadeo de ojos.
       - **Moverse (`move`):** Desplazamiento físico en su contenedor, caminata alternando piernas y traslado animado entre las plataformas del camino de niveles.
       - **Modo Explicación (`explain`):** Las gafas y el núcleo de **Dev'is** se iluminan en amarillo rúnico (`#FACC15`).
  3. **Eliminación de Preguntas Tempranas:**
     - Se eliminó por completo la vista de preguntas (`src/views/quiz/`), dejando únicamente la estructura del prototipo lista para cuando se redacten los cuestionarios en fases posteriores.
  4. **Nuevo Camino de Progreso del Módulo (`ModuleProgressPathView.tsx`):**
     - Al hacer clic sobre cualquier tarjeta de módulo en el Dashboard, se despliega su **Camino de Progreso Isométrico en curva "S"**:
       - **HUD Superior Flotante:** Hexágono Low-Poly `XP` con `1,053 Puntos de Experiencia` a la izquierda, racha con llama Low-Poly y botón de retorno/menú a la derecha.
       - **Escenario Low-Poly Minimalista:** Islas de montañas flotantes facetadas a los lados sobre fondo nocturno limpio.
       - **5 Plataformas de Nivel (Nivel 1 a Nivel 5):**
         - `Nivel 1`: Isla inicial con bandera (`Completado`).
         - `Nivel 2`: Plataforma isométrica con check 3D `✓` (`Completado`).
         - `Nivel 3`: Plataforma activa con anillo circular de progreso, letrero isométrico `TEMA 3` y **Dev'is parado sobre la plataforma** (además, puedes hacer clic en los niveles desbloqueados para que **Dev'is** se mueva de una plataforma a otra).
         - `Nivel 4` y `Nivel 5`: Plataformas isométricas con candados 3D Low-Poly (`Bloqueados`).

---

### Sección 8: Movimiento Libre de Dev'is por Cualquier Parte de la Pantalla
- **Fecha:** `2026-10-24` | **Hora:** `18:38 - 18:40 (GMT-5)`
- **Estado:** ✅ Completado y Verificado
- **Archivos actualizados:**
  - [`src/models/entities/DevisMascot.model.ts`](./src/models/entities/DevisMascot.model.ts)
  - [`src/controllers/useDevisController.ts`](./src/controllers/useDevisController.ts)
  - [`src/views/mascot/DevisMascotView.tsx`](./src/views/mascot/DevisMascotView.tsx)
  - [`src/views/dashboard/DashboardMasterView.tsx`](./src/views/dashboard/DashboardMasterView.tsx)
- **Detalle técnico de lo construido:**
  - Se eliminó la caja contenedora que encerraba a **Dev'is**.
  - Ahora **Dev'is** ([`DevisFreeScreenCompanionView`](./src/views/mascot/DevisMascotView.tsx)) flota libremente sobre toda la pantalla:
    - **Arrastrar y soltar (`Drag & Drop`):** El usuario puede arrastrar a **Dev'is** con el cursor a cualquier rincón de la pantalla (activando automáticamente la animación de caminata mientras se mueve y saludando al soltarlo).
    - **Recorrido autónomo (`Caminar`):** Al pulsar *"Caminar"*, **Dev'is** recorre distintos puntos de la pantalla (los módulos de la izquierda, la barra superior, el centro, el panel de progreso o de regreso a su rincón base).
    - **Globo de diálogo plegable:** Se puede mostrar u ocultar con un clic para mantener siempre la limpieza visual.

---

### Sección 9: "Sobreviviendo a la Universidad", Dev'is Autónomo con Articulaciones, 2 Módulos y Personaje Personalizable
- **Fecha:** `2026-10-24` | **Hora:** `18:46 - 18:55 (GMT-5)`
- **Estado:** ✅ Completado y Verificado
- **Archivos creados/actualizados:**
  - [`src/views/mascot/DevisMascotView.tsx`](./src/views/mascot/DevisMascotView.tsx)
  - [`src/controllers/useDevisController.ts`](./src/controllers/useDevisController.ts)
  - [`src/views/avatar/PlayerAvatarView.tsx`](./src/views/avatar/PlayerAvatarView.tsx)
  - [`src/views/path/ModuleProgressPathView.tsx`](./src/views/path/ModuleProgressPathView.tsx)
  - [`src/views/dashboard/SubjectModulesGridView.tsx`](./src/views/dashboard/SubjectModulesGridView.tsx)
  - [`src/views/dashboard/DashboardMasterView.tsx`](./src/views/dashboard/DashboardMasterView.tsx)
  - [`src/models/repositories/GamificationRepository.model.ts`](./src/models/repositories/GamificationRepository.model.ts)
- **Detalle técnico de lo construido:**
  1. **Nueva Identidad y Barra Superior Limpia:**
     - Se eliminó el icono y el texto *"Game 2026B, Plataforma de Gamificación..."*.
     - Ahora el sitio lleva por título **"Sobreviviendo a la Universidad"** y la barra de opciones tiene únicamente: **Módulos**, **Perfil del Jugador** e **Insignias**.
  2. **Solo 2 Módulos Oficiales:**
     - Se eliminaron los submódulos de práctica/estándares para dejar exclusivamente **Verificación y Validación de Software** y **Gestión de Procesos de Calidad**.
  3. **Dev'is 100% Autónomo con Articulaciones Jerárquicas (`ArticulatedDevisCharacter`):**
     - Sin botones manuales ni necesidad de arrastrarlo: **Dev'is** actúa y camina por su cuenta por toda la pantalla.
     - **Esqueleto articulado:** Articulaciones anidadas de **Cuello/Cabeza + Orejas**, **Hombro -> Codo -> Muñeca/Mano** (ambos brazos) y **Cadera -> Rodilla -> Tobillo/Pie** (ambas piernas).
     - **Reacciones automáticas:** Recién se abre la app, **Dev'is** entra caminando y saluda; deambula libremente por la pantalla; y cuando pasas o eliges un módulo, nivel o sección, camina hacia allá y reacciona automáticamente.
  4. **Personaje Personalizable del Jugador en los Niveles (`PlayerLowPolyAvatar`):**
     - En las plataformas del Camino de Progreso (`Nivel 1` a `Nivel 5`) ahora se ubica el **Personaje del Jugador**, el cual se puede personalizar (color de traje, capa, visor y estilo superior) desde la pestaña **Perfil del Jugador**.

---

### Sección 10: Esqueleto 2D Visible de Dev'is (Alzar Mano / Señalar), Posicionamiento en Extremos, Camino de Arriba a Abajo, Fuente Avolisse y 4 Variantes de Personaje
- **Fecha:** `2026-10-24` | **Hora:** `19:11 - 19:21 (GMT-5)`
- **Estado:** ✅ Completado y Verificado
- **Archivos creados/actualizados:**
  - `public/fonts/avolisse/Avolisse.ttf`
  - [`src/app/globals.css`](./src/app/globals.css) y [`tailwind.config.ts`](./tailwind.config.ts)
  - [`src/views/mascot/DevisMascotView.tsx`](./src/views/mascot/DevisMascotView.tsx)
  - [`src/controllers/useDevisController.ts`](./src/controllers/useDevisController.ts)
  - [`src/views/path/ModuleProgressPathView.tsx`](./src/views/path/ModuleProgressPathView.tsx)
  - [`src/views/avatar/PlayerAvatarView.tsx`](./src/views/avatar/PlayerAvatarView.tsx)
  - [`src/models/subjects/verificacion-validacion-software/module.model.ts`](./src/models/subjects/verificacion-validacion-software/module.model.ts)
  - [`src/models/subjects/gestion-procesos-calidad/module.model.ts`](./src/models/subjects/gestion-procesos-calidad/module.model.ts)
- **Detalle técnico de las mejoras implementadas:**
  1. **Esqueleto 2D Real de Dev'is (Alzar la Mano y Señalar):**
     - Se reconstruyó el rig articular de **Dev'is** usando grupos SVG con origen de rotación exacto `(0,0)` en cada articulación (`Hombro` -> `Codo` -> `Muñeca/Dedos` y `Cadera` -> `Rodilla` -> `Tobillo`).
     - **Saludo (`greeting`):** El hombro rota `135°` hacia arriba alzando el brazo por encima de la cabeza mientras el codo y la mano abierta saludan.
     - **Señalar (`pointing`):** El hombro rota `92°` extendiendo el brazo horizontalmente con el dedo índice apuntando hacia el elemento relevante.
  2. **Posicionamiento Inteligente en los Extremos + Detección de Inactividad:**
     - Mientras el usuario está usando la app (moviendo el mouse, haciendo clic o desplazándose), **Dev'is** se ubica discretamente en el extremo inferior derecho (`92vw, 82vh`) para **no estorbar nunca la vista**.
     - Solo cuando el usuario lleva más de `6.5 segundos` sin registrar movimiento (`isUserIdle === true`) o cuando ocurre un evento importante que señalar, **Dev'is** sale a recorrer libremente la pantalla y regresa al extremo apenas el usuario vuelve a interactuar.
  3. **Mejoras en el Camino de Progreso (`ModuleProgressPathView.tsx`):**
     - **Recorrido de Arriba hacia Abajo:** `Nivel 1` inicia en la parte superior (`y: 13%`) y desciende progresivamente hasta el `Nivel 5` en la parte inferior (`y: 85%`).
     - **Eliminación de elementos:** Se quitó por completo la bandera/cartel de *"TEMA 3"* y el botón de menú de tres líneas (`☰`).
     - **Islas y Montañas Flotantes Mejoradas:** Se rediseñaron las 3 islas flotantes con conos rocosos multifaceta, cumbres nevadas Low-Poly, cristales bioluminiscentes, pinos geométricos y cascada turquesa.
     - **Personaje por encima de los textos:** El nodo con el personaje del usuario tiene prioridad de capa (`z-40`/`z-50`) sobre las etiquetas de nombre/nivel (`z-10`), evitando cualquier superposición de texto sobre el avatar.
  4. **Integración de la Fuente `Avolisse`:**
     - Se extrajo `avolisse.zip` en `public/fonts/avolisse/Avolisse.ttf` y se aplicó mediante `.font-avolisse` en el título principal (*"SOBREVIVIENDO A LA UNIVERSIDAD"*), títulos de módulos, niveles y contadores de XP.
  5. **4 Variantes de Personaje para el Usuario (`PlayerLowPolyAvatar`):**
     - Se añadieron 3 clases/variantes nuevas además del Centinela original (total 4 variantes seleccionables en **Perfil del Jugador**):
       1. **Centinela Cristal (`sentinel`):** Casco rúnico y capa.
       2. **Tecno-Mago Arcano (`mage`):** Sombrero puntiagudo Low-Poly, túnica y bastón con cristal flotante.
       3. **Cyber-Ninja (`ninja`):** Capucha, máscara con visor en V, bufanda energética y katanas cruzadas.
       4. **Paladín Valkiria (`paladin`):** Casco alado, armadura pesada y escudo hexagonal rúnico.

---

### Sección 11: Integración de Rive (@rive-app/canvas) + Máquina de Estados en Lienzo HTML5, Seguimiento X/Y del Ratón, Acercamiento a Módulos, Barra Estática y Personajes Detallados
- **Fecha:** `2026-10-24` | **Hora:** `19:31 - 19:40 (GMT-5)`
- **Estado:** ✅ Completado y Verificado
- **Archivos actualizados:**
  - [`package.json`](./package.json) (instalación de `@rive-app/canvas`)
  - [`src/views/mascot/DevisMascotView.tsx`](./src/views/mascot/DevisMascotView.tsx)
  - [`src/controllers/useDevisController.ts`](./src/controllers/useDevisController.ts)
  - [`src/views/avatar/PlayerAvatarView.tsx`](./src/views/avatar/PlayerAvatarView.tsx)
  - [`src/views/dashboard/DashboardMasterView.tsx`](./src/views/dashboard/DashboardMasterView.tsx)
  - [`src/views/dashboard/SubjectModulesGridView.tsx`](./src/views/dashboard/SubjectModulesGridView.tsx)
  - [`src/views/dashboard/BadgesAndLeaderboardView.tsx`](./src/views/dashboard/BadgesAndLeaderboardView.tsx)
- **Detalle técnico de las mejoras implementadas:**
  1. **Motor Rive (`@rive-app/canvas`) y Máquina de Estados sobre Lienzo HTML5 `<canvas>` (`DevisRiveCanvasCharacter`):**
     - Se instaló `@rive-app/canvas` y se montó un lienzo `<canvas>` a 60 FPS donde las piezas vectoriales separadas de **Dev'is** (cabeza, cuello, visor, gafas, torso, hombro → codo → muñeca/dedos, piernas) rotan mediante matrices cinemáticas directas (`ctx.translate` + `ctx.rotate`).
     - **Saludo real (`greeting`):** El hueso del hombro rota hacia arriba (`2.38 rad`) levantando el brazo completo por encima de la cabeza mientras el codo (`±0.65 rad`) y la mano abierta con dedos desplegados saludan de forma fluida.
     - **Máquina de estados con `isHovering` y seguimiento `X/Y` del ratón:** La cabeza, el cuello, el visor, los ojos y las gafas de **Dev'is** siguen en tiempo real las coordenadas `X/Y` del cursor, y los eventos `mouseenter`/`mouseleave` de las tarjetas de módulos y logros activan `isHovering` para transicionar suavemente entre *Respiración (Idle)* y *Señalar (Point)*.
  2. **Acercamiento a Módulos y Comportamiento en Juego:**
     - Al pasar el cursor o seleccionar un módulo en el Dashboard, **Dev'is** se acerca directamente al módulo, extiende su brazo para señalarlo y despliega la explicación del módulo.
     - Cuando el usuario entra a jugar al Camino de Niveles, **Dev'is** se mantiene alejado en una esquina (`92vw, 84vh`) para no estorbar la partida, acercándose únicamente cuando debe explicar un nivel o una respuesta.
  3. **Cuadros de Texto Mejorados:**
     - Rediseño del cuadro de diálogo flotante con barra superior luminosa en gradiente, insignia de contexto (`BIENVENIDA`, `EXPLICACIÓN DEL MÓDULO`, `LOGRO DESBLOQUEADO`), título en fuente `Avolisse` y cuerpo limpio.
  4. **Barra Principal Estática (`sticky top-0 z-40`):**
     - El encabezado principal de **SOBREVIVIENDO A LA UNIVERSIDAD** ahora permanece fijo en la parte superior de la ventana en todo momento.
  5. **Selección Limpia de Personajes y Mayor Nivel de Detalle:**
     - En **Perfil del Jugador** se eliminaron las etiquetas secundarias y el texto `"(4 Clases)"`, dejando únicamente la **previsualización en vivo del personaje y su nombre**.
     - Se incrementó el nivel de detalle geométrico de los 4 personajes (hombreras facetadas, petos biselados, espada de cristal en el Centinela, sombrero doblado y orbe con fragmentos orbitando en el Tecno-Mago, doble katana y shuriken en el Cyber-Ninja, y alas multi-pluma con lanza real y escudo hexagonal en el Paladín Valkiria).

---

### Sección 12: Conversación Progresiva Frase por Frase, Esqueleto de Cuerpo Completo (16 Huesos: Caminar, Saltar, Alzar Dos Manos) y Señalización Direccional Exacta
- **Fecha:** `2026-10-24` | **Hora:** `19:45 - 19:51 (GMT-5)`
- **Estado:** ✅ Completado y Verificado
- **Archivos actualizados:**
  - [`src/models/entities/DevisMascot.model.ts`](./src/models/entities/DevisMascot.model.ts)
  - [`src/controllers/useDevisController.ts`](./src/controllers/useDevisController.ts)
  - [`src/views/mascot/DevisMascotView.tsx`](./src/views/mascot/DevisMascotView.tsx)
  - [`src/views/dashboard/SubjectModulesGridView.tsx`](./src/views/dashboard/SubjectModulesGridView.tsx)
  - [`src/views/dashboard/BadgesAndLeaderboardView.tsx`](./src/views/dashboard/BadgesAndLeaderboardView.tsx)
  - [`src/views/path/ModuleProgressPathView.tsx`](./src/views/path/ModuleProgressPathView.tsx)
- **Detalle técnico de las mejoras implementadas:**
  1. **Conversación Progresiva (Frase por Frase Reemplazando lo Anterior):**
     - Se eliminaron los bloques largos de texto en el globo de **Dev'is**.
     - Ahora `runProgressiveInteraction` entrega las explicaciones como una **secuencia conversacional de frases cortas**: muestra una frase breve, y tras ~1.9 segundos **elimina la anterior** para mostrar la siguiente (con indicadores minimalistas de paso `• • •`).
  2. **Esqueleto de Cuerpo Completo (16 Huesos Articulados) y Repertorio Vivo de Animaciones:**
     - Todo el cuerpo de **Dev'is** ahora tiene huesos activos en el lienzo `<canvas>`:
       - **Pelvis/Raíz:** Rebote vertical, balanceo lateral de cadera y *Squash & Stretch* al saltar.
       - **Columna/Torso:** Inclinación dinámica hacia el objetivo o dirección de marcha.
       - **Cuello, Cabeza y Ambas Orejas:** Movimiento independiente de orejas con inercia y seguimiento ocular `X/Y`.
       - **Ambos Brazos (`Izquierdo` y `Derecho`):** `Hombro` → `Codo` → `Muñeca/Dedos`.
       - **Ambas Piernas (`Izquierda` y `Derecha`):** `Cadera (Muslo)` → `Rodilla (Pantorrilla)` → `Tobillo/Pie`.
     - **Nuevas animaciones de cuerpo completo:**
       - `cheer_both_hands`: **Alza las dos manos** por encima de la cabeza y da saltos flexionando ambas rodillas.
       - `walking`: Ciclo completo de caminata articulando muslos, rodillas, tobillos y balanceando ambos brazos cuando se traslada de un punto a otro.
       - `jumping`: Impulso con flexión de rodillas y salto acrobático en el aire.
       - `wave_hello`: Saludo alzando una mano con la otra apoyada en la cintura y balanceo de cadera.
       - `idle_alive`: Balanceo continuo de peso entre pierna izquierda y derecha para que nunca se vea estático.
  3. **Señalización Direccional Exacta hacia el Elemento Seleccionado (`atan2` + `getBoundingClientRect`):**
     - Las tarjetas de módulos, insignias y niveles envían su `DOMRect` real en pantalla (`pointTargetPx`).
     - **Dev'is** calcula el vector exacto `(dx, dy)` desde su posición hasta el centro del elemento seleccionado:
       - Si el elemento está a su **derecha** (`dx >= 0`, como las insignias del panel derecho), **usa automáticamente su brazo derecho** y lo rota en el ángulo exacto `Math.atan2(-dx, dy)` apuntando directamente hacia ese logro.
       - Si el elemento está a su **izquierda** o **arriba** (`dx < 0`), **usa su brazo izquierdo** apuntando en el ángulo exacto hacia la tarjeta correspondiente, mientras apoya la otra mano en su cintura.

---

### Sección 13: Barra Estática Independiente en el Camino de Progreso y Creador Modular de Personajes Estilo RPG / Elden Ring con Rueda de Color Interactiva y Nombre para Dev'is
- **Fecha:** `2026-10-24` | **Hora:** `20:01 - 20:10 (GMT-5)`
- **Estado:** ✅ Completado y Verificado
- **Archivos actualizados:**
  - [`src/models/entities/UserProgress.model.ts`](./src/models/entities/UserProgress.model.ts)
  - [`src/models/repositories/GamificationRepository.model.ts`](./src/models/repositories/GamificationRepository.model.ts)
  - [`src/controllers/useDevisController.ts`](./src/controllers/useDevisController.ts)
  - [`src/controllers/useDashboardController.ts`](./src/controllers/useDashboardController.ts)
  - [`src/views/path/ModuleProgressPathView.tsx`](./src/views/path/ModuleProgressPathView.tsx)
  - [`src/views/avatar/PlayerAvatarView.tsx`](./src/views/avatar/PlayerAvatarView.tsx)
  - [`src/views/dashboard/DashboardMasterView.tsx`](./src/views/dashboard/DashboardMasterView.tsx)
- **Detalle técnico de las mejoras implementadas:**
  1. **Barra Estática Independiente en el Camino del Personaje (`ModuleProgressPathView.tsx`):**
     - Se extrajo el HUD de estadísticas del camino (`1,053 XP`, indicador de nivel y barra de progreso del módulo, título de la materia con la fuente `Avolisse`, nombre del jugador, racha `🔥 7` y botón `← Módulos`) a una **barra superior separada y estática (`sticky top-[68px] z-30`)** fuera del contenedor del mapa.
     - Al hacer *scroll* a lo largo de todo el camino de niveles (`Nivel 1` a `Nivel 5`), la barra de estadísticas permanece fija y visible en todo momento con acabado translúcido profesional (`backdrop-blur-xl`).
  2. **Creador Modular de Personajes Estilo RPG / Elden Ring (`PlayerAvatarView.tsx`):**
     - **Selección de Tipo de Cuerpo Base:** Permite elegir entre **Hombre (`male`)** y **Mujer (`female`)**, ajustando la silueta anatómica Low-Poly, facciones y peinado base.
     - **Equipamiento Modular por Ranuras (4 Tipos de Equipación Combinables):**
       - Se implementaron 4 ranuras independientes: **Cabeza (`headEquip`)**, **Cuerpo (`chestEquip`)**, **Manos y Armas (`handsEquip`)** y **Pantalones y Grebas (`legsEquip`)**.
       - Cada ranura cuenta con **4 diferentes tipos de equipaciones (`set1` a `set4`)** que pueden combinarse libremente entre sí (*Set 01: Centinela Élite*, *Set 02: Tecno-Mago Arcano*, *Set 03: Cyber-Ninja Sombra*, *Set 04: Paladín Valkiria*), o el botón **Equipar Set Completo** para aplicar las 4 piezas de una misma armadura.
     - **Rueda de Color Interactiva de 360° (`InteractiveColorWheel`):**
       - Se reemplazaron los colores predefinidos por una **Rueda de Color HSV interactiva en `<canvas>`** con control deslizante de brillo/luminosidad y entrada hexadecimal en vivo.
       - El usuario puede aplicar cualquier color personalizado a 4 canales independientes del personaje: **Armadura Principal**, **Detalles / Capa**, **Energía / Armas** y **Tono de Piel**.
  3. **Nombre Personalizado con el que Dev'is Llama al Jugador:**
     - Se añadió un campo interactivo en el creador de personajes para ingresar el **Nombre con el que te llamará Dev'is** y guardarlo en tiempo real.
     - Al guardar el nombre, **Dev'is** salta alzando ambas manos (`cheer_both_hands`) y en todas sus conversaciones progresivas (bienvenida, explicación de módulos, logros y niveles) se dirige al usuario por el nombre elegido.

---

### Sección 14: Panel Lateral Derecho de Estadísticas en el Camino, Círculo de Progreso Dinámico y Flujo Dual de Perfil + Personalización con Personaje Base (Ropa Común) y Desplegable Horizontal
- **Fecha:** `2026-10-24` | **Hora:** `20:26 - 20:36 (GMT-5)`
- **Estado:** ✅ Completado y Verificado
- **Archivos actualizados:**
  - [`src/models/entities/UserProgress.model.ts`](./src/models/entities/UserProgress.model.ts)
  - [`src/models/repositories/GamificationRepository.model.ts`](./src/models/repositories/GamificationRepository.model.ts)
  - [`src/views/path/ModuleProgressPathView.tsx`](./src/views/path/ModuleProgressPathView.tsx)
  - [`src/views/avatar/PlayerAvatarView.tsx`](./src/views/avatar/PlayerAvatarView.tsx)
- **Detalle técnico de las mejoras implementadas:**
  1. **Corrección del Camino de Progreso (`ModuleProgressPathView.tsx`):**
     - **Eliminación del botón redundante `← Módulos`:** Se retiró el botón repetido del camino, ya que la barra superior estática cuenta siempre con la pestaña `Módulos`.
     - **Barra de Estadísticas Estática en la Parte Derecha (`lg:col-span-4 sticky top-24`):** Se reubicó el panel de estadísticas a la columna derecha para evitar que se superponga con el personaje al hacer *scroll*. Incluye la cabecera de la materia, tarjetas de `XP` y `Racha`, barra de progreso del módulo, tarjeta de posición actual y lista interactiva de los 5 nodos del camino.
     - **Círculo de Progreso Dinámico (`layoutId="player-level-progress-ring"`):** El anillo circular de progreso ahora sigue dinámicamente a `isPlayerHere` (`playerLevelNumber === level.levelNumber`) en lugar de quedar fijo en el Nivel 3. Cuando el usuario selecciona cualquier nivel, tanto el personaje como el círculo de progreso se desplazan suavemente a ese nodo exacto.
  2. **Flujo Dual en Perfil del Jugador y Personalización (`PlayerAvatarView.tsx`):**
     - **Vista 1 — Perfil del Jugador:**
       - **Columna Izquierda:** Tarjeta grande con la previsualización del personaje en vivo y debajo el botón principal **`Personalizar`**.
       - **Columna Derecha:** Bloque superior **`Nombre:`** (para configurar cómo nos llama **Dev'is**) y bloque inferior **`Estadísticas y Progreso`** con experiencia global, racha, insignias y avance por materia.
     - **Vista 2 — Panel de Personalización (al presionar `Personalizar`):**
       - **Personaje Base con Ropa Común (`"base"`):** Se diseñó el estado base con ropa común universitaria (buzo/camiseta casual, jeans, zapatillas, manos con reloj y cabeza descubierta con cabello Low-Poly masculino o femenino).
       - **Género, Piel y Cabello:** Selector `♂ Hombre` / `♀ Mujer` junto con selectores circulares para **Color de Piel** y **Color de Cabello**.
       - **4 Filas (`Cabeza`, `Cuerpo`, `Manos`, `Pantalones`) con Desplegable hacia la Derecha y 3 Círculos de Color por Ranura:**
         - Al hacer clic en el recuadro de cualquier ranura, se despliega hacia la derecha un carrusel con la **previsualización gráfica SVG (`EquipmentPiecePreviewSvg`)** de cada opción (`Ropa Común` + los 4 Conjuntos).
         - A la derecha de cada ranura se ubican sus **3 círculos de color independientes (`Color primario`, `Color secundario`, `Color poder`)**, que abren la **Rueda de Color Interactiva de 360°** al seleccionarlos.

---

### Sección 15: Camerino en Una Sola Pantalla (Cero Scroll bajo Principios de Krug), Rueda de Color y Desplegables Flotantes por Encima, y Rediseño Detallado de Personajes y Trajes
- **Fecha:** `2026-10-24` | **Hora:** `20:43 - 20:51 (GMT-5)`
- **Estado:** ✅ Completado y Verificado
- **Archivos actualizados:**
  - [`src/views/dashboard/DashboardMasterView.tsx`](./src/views/dashboard/DashboardMasterView.tsx)
  - [`src/views/avatar/PlayerAvatarView.tsx`](./src/views/avatar/PlayerAvatarView.tsx)
- **Detalle técnico de las mejoras implementadas:**
  1. **Diseño Responsivo de Pantalla Única sin Scroll (`lg:h-[calc(100vh-88px)]` — Leyes de Krug):**
     - Tanto el **Panel Principal del Perfil** como el **Panel de Personalización del Personaje** caben íntegramente en una sola vista (`100vh`) sin obligar al usuario a hacer *scroll* para ver la ranura de `Pantalones`, el selector de color o el botón `Guardar`.
     - El botón **`Guardar`** (y `Cancelar`) permanece siempre visible en la parte inferior izquierda debajo del pedestal 3D del personaje.
  2. **Rueda de Color Interactiva Flotante por Encima (`FloatingColorWheelModal` en `z-50`):**
     - Al hacer clic en **Color Piel**, **Color Cabello** o cualquiera de los círculos (`Color primario`, `Color secundario`, `Color poder`), el círculo de color **se abre en un modal flotante por encima de la interfaz** en lugar de aparecer abajo.
     - Para **Color de Piel**, incluye tanto la **Rueda de Color 360° + barra de Brillo** como accesos rápidos a tonos de piel naturales.
  3. **Desplegable de Equipamiento Flotante hacia la Derecha (`z-40`):**
     - Al seleccionar el recuadro de `Cabeza`, `Cuerpo`, `Manos` o `Pantalones`, el selector horizontal con las miniaturas de los 5 atuendos se despliega **flotando hacia la derecha sobre la fila** sin empujar los demás elementos hacia abajo.
  4. **Mayor Nivel de Detalle en Personajes, Cabello, Ojos y Trajes (`PlayerLowPolyAvatar`):**
     - **Rostro y Cabello en Capas:** Ojos expresivos con iris coloreado, doble brillo especular, pestañas y cejas definidas, rubor sutil, y cabello detallado con mechones frontales y caída trasera larga para `Mujer` o capas dinámicas para `Hombre` sobre un **Pedestal Cilíndrico 3D de Camerino**.
     - **Trajes Detallados:** Chaqueta universitaria con capucha, cordones, camiseta interior, jeans con dobladillo y sneakers bicolor en `Ropa Común`; armadura imperial con capa bordada y mandoble en `Centinela`; sombrero astral, halo rúnico y báculo en `Tecno-Mago`; máscara Oni con colmillos luminosos, katanas cruzadas y shuriken en `Cyber-Ninja`; y tiara alada con estrellas, alas multi-pluma de luz, lanza y escudo Égida en `Valkiria`.

---

### Sección 16: Unificación del Estilo Artístico Low-Poly Facetado con Dev'is, Dimorfismo Corporal Hombre/Mujer en Trajes, Reemplazo Fiel de Cabezas y Limpieza de Etiquetas
- **Fecha:** `2026-10-24` | **Hora:** `21:01 - 21:08 (GMT-5)`
- **Estado:** ✅ Completado y Verificado
- **Archivos actualizados:**
  - [`src/views/avatar/PlayerAvatarView.tsx`](./src/views/avatar/PlayerAvatarView.tsx)
- **Detalle técnico de las mejoras implementadas:**
  1. **Unificación Total del Estilo Artístico Low-Poly 3D con Dev'is:**
     - Se eliminaron las formas curvas de caricatura y rubores circulares, reconstruyendo todo el personaje y su pedestal con **planos poligonales facetados Low-Poly (luz, tono medio y sombra direccional)** para que comparta exactamente el mismo universo visual que la mascota **Dev'is**.
  2. **Diferenciación Anatómica Clara entre Hombre y Mujer (en Base y en Todos los Conjuntos):**
     - **Hombre (`male`):** Mandíbula cuadrada facetada, cejas rectas gruesas, espalda y hombros anchos (`46..154`), torso atlético en V, pantalones rectos y armaduras pectorales pesadas.
     - **Mujer (`female`):** Barbilla estilizada en V, pestañas y cejas arqueadas, hombros esbeltos, busto facetado 3D, cintura de avispa (`74..126`), falda-short plisada en ropa base, faldones acampanados/tácticos en conjuntos, coleta alta Kunoichi en `Cyber-Ninja` y silueta entallada en todas las armaduras.
  3. **Aplicación 100% Fiel de los Conjuntos de Cabeza (Ocultación del Rostro Base cuando Corresponde):**
     - Al seleccionar `Centinela`, `Tecno-Mago`, `Cyber-Ninja` o `Valkiria` en la ranura de `Cabeza`, **el rostro y cabello base desaparecen por completo**, mostrando el yelmo cerrado, el rostro arcano en sombra con ojos rúnicos luminosos, la capucha con máscara Oni o el yelmo alado de Valkiria tal como se ve en la previsualización.
  4. **Limpieza Visual de Textos y Opciones Redundantes:**
     - Se eliminó la barra inferior de `"Conjunto Completo"`.
     - Se eliminó el botón `"Personaje Base (Ropa Común)"` de la esquina superior del visor.
     - Se eliminaron todos los textos pequeños debajo de las ranuras (`"Ropa Común"`, `"Centinela"`, etc.) y dentro del desplegable, dejando únicamente las previsualizaciones gráficas limpias.

---

### Sección 17: Pulido Estético Low-Poly Simétrico, Selector de Color 100% Sólido, Siluetas de Género sin Texto, Evasión Automática de Dev'is y Canales de Color Dinámicos
- **Fecha:** `2026-10-24` | **Hora:** `21:19 - 21:29 (GMT-5)`
- **Estado:** ✅ Completado y Verificado
- **Archivos actualizados:**
  - [`src/controllers/useDevisController.ts`](./src/controllers/useDevisController.ts)
  - [`src/views/avatar/PlayerAvatarView.tsx`](./src/views/avatar/PlayerAvatarView.tsx)
- **Detalle técnico de las mejoras implementadas:**
  1. **Pulido Estético Low-Poly Simétrico (3 Planos de Luz sin Partir el Rostro a la Mitad):**
     - Se reemplazó el corte vertical central que daba aspecto rústico por un **plano frontal iluminado con biseles laterales simétricos** (exactamente como el pecho y la cabeza de **Dev'is**), ojos expresivos con doble reflejo de luz y proporciones mucho más limpias y estilizadas.
  2. **Fondo 100% Sólido y Opaco en el Selector de Color y Desplegables (`#11182B`):**
     - Se corrigió la transparencia del modal de la Rueda de Color y del desplegable de equipamiento aplicando color de fondo sólido (`style={{ backgroundColor: "#11182B" }}`) para que ningún texto o botón inferior se transparente.
  3. **Eliminación de la Barra de Zoom del Personaje:**
     - Se retiró por completo la barra deslizante de zoom del visor del personaje para mantener una interfaz más limpia.
  4. **Siluetas de Género en Lugar de Texto (`GenderBodySilhouetteSvg`):**
     - En la sección `Género:` se eliminaron las palabras `"Hombre"` y `"Mujer"`, mostrando únicamente las **siluetas corporales SVG** correspondientes a cada género.
  5. **Evasión Inteligente de Cursor para Dev'is (`useDevisController.ts`):**
     - Si el usuario acerca el cursor hacia donde se encuentra **Dev'is** (por ejemplo, para seleccionar los colores de `Manos` o `Pantalones` en la parte inferior derecha), **Dev'is camina automáticamente hacia una zona despejada** para no estorbar nunca la acción del usuario.
  6. **Canales de Color Dinámicos según lo que Realmente Lleva Cada Pieza (`getActiveColorChannelsForPiece`):**
     - Cada fila muestra **únicamente los círculos de color que utiliza la pieza equipada** (por ejemplo: 1 solo círculo en `Cabeza` base o `Manos` base; 2 círculos en piezas bitono como `Centinela` o `Valkiria`; y 3 círculos solo en las piezas que integran tres materiales/poder), además de ocultar el botón `Color Cabello` cuando el personaje lleva un casco cerrado.


---

## 19. Undécima Iteración: Reestructuración del Dashboard según `References/Dashboard_prototipe.png` y Corrección del Selector de Conjuntos

1. **Corrección del Selector Desplegable de Conjuntos en el Personalizador ([`src/views/avatar/PlayerAvatarView.tsx`](file:///d:/04_PERSONAL/Proyectos/Game_2026B/src/views/avatar/PlayerAvatarView.tsx)):**
   - Se eliminó la clase `clip-crystal-subcard` (`clip-path: polygon(...)`) de las 4 filas de ranuras (`Cabeza`, `Cuerpo`, `Manos`, `Pantalones`) y se habilitó `allowOverflow={true}` en el [`CrystalPanel`](file:///d:/04_PERSONAL/Proyectos/Game_2026B/src/views/components/LowPolyUI.tsx#L18-L96) derecho, garantizando que el menú desplegable con las 5 opciones de equipamiento se muestre **100% visible, opaco y en capa superior (`z-50`) sin ningún recorte vertical**.

2. **Reestructuración Completa del Dashboard ([`src/views/dashboard/DashboardMasterView.tsx`](file:///d:/04_PERSONAL/Proyectos/Game_2026B/src/views/dashboard/DashboardMasterView.tsx)):**
   - Siguiendo fielmente [`References/Dashboard_prototipe.png`](file:///d:/04_PERSONAL/Proyectos/Game_2026B/References/Dashboard_prototipe.png), se reorganizó la arquitectura de navegación y contenido para eliminar la saturación visual:
     - **Header Panorámico Superior:** Cumbre de cristales Low-Poly + `SOBREVIVIENDO A LA UNIVERSIDAD`, ilustración de cordillera y ciudadela de cristal en el fondo, barra de búsqueda (`Buscar...`), campana de notificaciones y cápsula de perfil (`Santi · Nivel 5`).
     - **Sidebar Vertical Izquierdo:** Navegación estructurada por pestañas (`Inicio`, `Mi Personaje`, `Misiones`, `Módulos`, `Logros`, `Estadísticas`) con indicador cian luminoso en la pestaña activa, ilustración inferior de caverna con cristales azules/ámbar y el lema *"EL CONOCIMIENTO TAMBIÉN ES UNA FORMA DE PODER"*.
     - **Vista Principal `Inicio` Descongestionada:**
       - **Columna Izquierda (7 cols):** Tarjeta Hero del jugador con su personaje Low-Poly sobre pedestal turquesa, barra de XP y botón `Ver perfil`; debajo, el panel **Tu progreso por materia** con las 2 materias oficiales (*Verificación y Validación de Software* y *Gestión de Procesos de Calidad*).
       - **Columna Derecha (5 cols):** Panel **Progreso General** (anillo cian del `70%`), panel **Estadísticas rápidas** (grilla `2x2` con gemas 3D) y panel **Tu próximo objetivo** (`Ver misión →`).
       - **Fila Inferior de 5 Accesos Rápidos:** Tarjetas horizontales para `Misiones`, `Módulos`, `Logros`, `Estadísticas` y `Personalización`.
     - **Pestañas Independientes para `Misiones` y `Logros`:** La sección de **Últimas Misiones** ahora vive en su propia pestaña `Misiones`, y **Logros e Insignias** ([`BadgesAndLeaderboardView.tsx`](file:///d:/04_PERSONAL/Proyectos/Game_2026B/src/views/dashboard/BadgesAndLeaderboardView.tsx)) tiene su propia pestaña `Logros`, evitando saturar el inicio y la vista de módulos ([`SubjectModulesGridView.tsx`](file:///d:/04_PERSONAL/Proyectos/Game_2026B/src/views/dashboard/SubjectModulesGridView.tsx)).



---

## 19. Undécima Iteración: Reestructuración del Dashboard según `References/Dashboard_prototipe.png` y Corrección del Selector de Conjuntos

1. **Corrección del Selector Desplegable de Conjuntos en el Personalizador ([`src/views/avatar/PlayerAvatarView.tsx`](file:///d:/04_PERSONAL/Proyectos/Game_2026B/src/views/avatar/PlayerAvatarView.tsx)):**
   - Se eliminó la clase `clip-crystal-subcard` (`clip-path: polygon(...)`) de las 4 filas de ranuras (`Cabeza`, `Cuerpo`, `Manos`, `Pantalones`) y se habilitó `allowOverflow={true}` en el [`CrystalPanel`](file:///d:/04_PERSONAL/Proyectos/Game_2026B/src/views/components/LowPolyUI.tsx#L18-L96) derecho, garantizando que el menú desplegable con las 5 opciones de equipamiento se muestre **100% visible, opaco y en capa superior (`z-50`) sin ningún recorte vertical**.

2. **Reestructuración Completa del Dashboard ([`src/views/dashboard/DashboardMasterView.tsx`](file:///d:/04_PERSONAL/Proyectos/Game_2026B/src/views/dashboard/DashboardMasterView.tsx)):**
   - Siguiendo fielmente [`References/Dashboard_prototipe.png`](file:///d:/04_PERSONAL/Proyectos/Game_2026B/References/Dashboard_prototipe.png), se reorganizó la arquitectura de navegación y contenido para eliminar la saturación visual:
     - **Header Panorámico Superior:** Cumbre de cristales Low-Poly + `SOBREVIVIENDO A LA UNIVERSIDAD`, ilustración de cordillera y ciudadela de cristal en el fondo, barra de búsqueda (`Buscar...`), campana de notificaciones y cápsula de perfil (`Santi · Nivel 5`).
     - **Sidebar Vertical Izquierdo:** Navegación estructurada por pestañas (`Inicio`, `Mi Personaje`, `Misiones`, `Módulos`, `Logros`, `Estadísticas`) con indicador cian luminoso en la pestaña activa, ilustración inferior de caverna con cristales azules/ámbar y el lema *"EL CONOCIMIENTO TAMBIÉN ES UNA FORMA DE PODER"*.
     - **Vista Principal `Inicio` Descongestionada:**
       - **Columna Izquierda (7 cols):** Tarjeta Hero del jugador con su personaje Low-Poly sobre pedestal turquesa, barra de XP y botón `Ver perfil`; debajo, el panel **Tu progreso por materia** con las 2 materias oficiales (*Verificación y Validación de Software* y *Gestión de Procesos de Calidad*).
       - **Columna Derecha (5 cols):** Panel **Progreso General** (anillo cian del `70%`), panel **Estadísticas rápidas** (grilla `2x2` con gemas 3D) y panel **Tu próximo objetivo** (`Ver misión →`).
       - **Fila Inferior de 5 Accesos Rápidos:** Tarjetas horizontales para `Misiones`, `Módulos`, `Logros`, `Estadísticas` y `Personalización`.
     - **Pestañas Independientes para `Misiones` y `Logros`:** La sección de **Últimas Misiones** ahora vive en su propia pestaña `Misiones`, y **Logros e Insignias** ([`BadgesAndLeaderboardView.tsx`](file:///d:/04_PERSONAL/Proyectos/Game_2026B/src/views/dashboard/BadgesAndLeaderboardView.tsx)) tiene su propia pestaña `Logros`, evitando saturar el inicio y la vista de módulos ([`SubjectModulesGridView.tsx`](file:///d:/04_PERSONAL/Proyectos/Game_2026B/src/views/dashboard/SubjectModulesGridView.tsx)).




---

## 20. Duodécima Iteración: Dashboard Compacto de Una Sola Pantalla (`100vh` Sin Scroll) con Componentes de `References/Referencias_componentes.png`

1. **Diseño Compacto y Responsivo en Una Sola Pantalla ([`src/views/dashboard/DashboardMasterView.tsx`](file:///d:/04_PERSONAL/Proyectos/Game_2026B/src/views/dashboard/DashboardMasterView.tsx)):**
   - El Header se compactó a `h-14` (`56px`) y el contenedor principal opera con `lg:h-[calc(100vh-56px)]` y `lg:overflow-hidden` en escritorio, logrando que el Sidebar izquierdo, la Tarjeta Hero del jugador, el panel **Tu progreso por materia**, **Progreso General**, **Estadísticas rápidas**, **Tu próximo objetivo** y la fila inferior de **5 accesos rápidos** se visualicen simultáneamente **sin necesidad de hacer scroll vertical**, manteniendo adaptabilidad completa en pantallas móviles y tablets.
   - Todas las pestañas (`Inicio`, `Mi Personaje`, `Misiones`, `Módulos`, `Logros`, `Estadísticas`) utilizan `h-full` y distribución proporcional (`flex-1 min-h-0`) para caber en una sola pantalla.

2. **Integración de los Componentes Tallados de [`References/Referencias_componentes.png`](file:///d:/04_PERSONAL/Proyectos/Game_2026B/References/Referencias_componentes.png) ([`src/views/components/LowPolyUI.tsx`](file:///d:/04_PERSONAL/Proyectos/Game_2026B/src/views/components/LowPolyUI.tsx)):**
   - Se restauraron y aplicaron los componentes tallados en roca/cristal de la hoja de referencia:
     - **Botones de Cristal Tallado (`.clip-crystal-btn`):** Pestaña activa del sidebar en cristal cian luminoso, botón `Ver Perfil` en cristal morado tallado (`variant="purple"`), botones `Continuar` e `Ir a Misión` en variantes `"purple"` y `"amber"`.
     - **Etiquetas Hexagonales (`.clip-crystal-tag`):** Tags `Módulo 01` (`"cyan"`), `Módulo 02` / `Racha` (`"amber"`), `Activo` (`"lime"`) y `Desbloqueados` (`"purple"`).
     - **Barras de Progreso Biseladas (`.clip-crystal-bar`) y Anillo Circular:** Aplicadas en la tarjeta Hero, `Progreso General` (con la ilustración del castillo Low-Poly) y `Tu progreso por materia`.
     - **Sub-tarjetas Biseladas (`.clip-crystal-subcard`) y Gemas 3D en Encastres Hexagonales (`CrystalGemIcon`):** Aplicadas en `Estadísticas rápidas`, `Tu progreso por materia`, `Tu próximo objetivo` y la barra inferior de accesos rápidos, manteniendo `allowOverflow={true}` en el personalizador de personajes para que los menús desplegables jamás se recorten.

---

## 21. Decimotercera Iteración: Fidelidad 100% a los Personajes y Sets Oficiales (`References/Sets_Basics.png`) y Nueva Distribución de Personalización (`References/Distributio_Personalite.png`)

1. **Rediseño 100% Fiel de los Personajes Masculino/Femenino y los 5 Sets Oficiales ([`src/views/avatar/PlayerAvatarView.tsx`](file:///d:/04_PERSONAL/Proyectos/Game_2026B/src/views/avatar/PlayerAvatarView.tsx) y [`src/models/repositories/GamificationRepository.model.ts`](file:///d:/04_PERSONAL/Proyectos/Game_2026B/src/models/repositories/GamificationRepository.model.ts)):**
   - Se reconstruyó por completo [`PlayerLowPolyAvatar`](file:///d:/04_PERSONAL/Proyectos/Game_2026B/src/views/avatar/PlayerAvatarView.tsx#L397-L958) y [`EquipmentPiecePreviewSvg`](file:///d:/04_PERSONAL/Proyectos/Game_2026B/src/views/avatar/PlayerAvatarView.tsx#L194-L392) siguiendo fielmente las proporciones, facetas 3D Low-Poly, peinados, rasgos faciales y prendas de [`References/Sets_Basics.png`](file:///d:/04_PERSONAL/Proyectos/Game_2026B/References/Sets_Basics.png) tanto para **Personaje Masculino** como para **Personaje Femenino**:
     - **`base` — Set Base (`Incluido`):** *Cabello corto* (M) / *Cabello recogido* con coletas laterales (F), *Chaqueta universitaria* azul con camiseta interior blanca, cuello/cordones de capucha, correas de mochila y emblema `"U"`, *Guantes ligeros* y *Pantalón vaquero* con zapatillas deportivas azules y blancas.
     - **`set1` — Set Académico (`Nivel 10`):** *Gafas académicas* oscuras de marco grueso, *Abrigo de estudiante* azul marino con solapas doradas, camisa blanca, corbata dorada y libro académico rojo con separador dorado en la mano izquierda, *Guantes de estudio* y *Pantalón de vestir* (M) / *Falda de uniforme* tableada con calcetas altas blancas (F) y zapatos formales.
     - **`set2` — Set Deportivo (`Nivel 20`):** *Gorra deportiva* azul/blanca con emblema de estrella dorada, *Sudadera deportiva* con auriculares al cuello (M) / *Top deportivo* atlético (F), *Guantes deportivos* sin dedos con muñequeras cian y *Pantalón jogger* con franjas laterales (M) / *Leggings* deportivos (F) con zapatillas de running.
     - **`set3` — Set Tecnológico (`Nivel 30`):** *Visor táctico* con máscara cyber (M) / *Visor tecnológico* con auriculares sci-fi (F) y lente de neón cian, *Chaqueta tecnológica* (M) / *Chaqueta futurista* (F) con circuitos luminosos y núcleo de energía cian en el pecho, *Guantes de energía* y *Pantalón táctico* con rodilleras luminosas.
     - **`set4` — Set Aventurero (`Nivel 40`):** *Sombrero explorador* tipo fedora de cuero marrón con cinta roja, *Capa de aventurero* (M) / *Chaqueta de viaje* (F) con poncho/bufanda roja de explorador, mochila de expedición y cinturón con hebilla dorada, *Guantes de montañismo* / *Guantes de trekking* y *Pantalón cargo* caqui con bolsillos laterales y botas de montaña.

2. **Nueva Distribución de la Interfaz de Personalización Basada en [`References/Distributio_Personalite.png`](file:///d:/04_PERSONAL/Proyectos/Game_2026B/src/views/avatar/PlayerAvatarView.tsx#L1614-L2766):**
   - Utilizando los componentes tallados en roca y cristal de [`References/Referencias_componentes.png`](file:///d:/04_PERSONAL/Proyectos/Game_2026B/References/Referencias_componentes.png) ([`CrystalPanel`](file:///d:/04_PERSONAL/Proyectos/Game_2026B/src/views/components/LowPolyUI.tsx#L18-L121), [`CrystalSubCard`](file:///d:/04_PERSONAL/Proyectos/Game_2026B/src/views/components/LowPolyUI.tsx#L127-L170), [`CrystalButton`](file:///d:/04_PERSONAL/Proyectos/Game_2026B/src/views/components/LowPolyUI.tsx#L193-L280), [`CrystalTag`](file:///d:/04_PERSONAL/Proyectos/Game_2026B/src/views/components/LowPolyUI.tsx#L285-L340) y [`CrystalProgressBar`](file:///d:/04_PERSONAL/Proyectos/Game_2026B/src/views/components/LowPolyUI.tsx#L345-L395)):
     - **Postura A-Stance 3D Low-Poly Lista para Rive ([`PlayerLowPolyAvatar`](file:///d:/04_PERSONAL/Proyectos/Game_2026B/src/views/avatar/PlayerAvatarView.tsx#L703-L1471)):** Personaje grande y heroico con piernas en postura A-stance, brazos ligeramente separados del torso con codos/manos/dedos articulados, ojos expresivos facetados y peinados en capas 3D (*Cabello corto* spiky 3D en masculino y *Cabello recogido* con coleta alta lateral en femenino).
     - **Columna Izquierda (Escenario del Personaje):** Nombre editable en esquina superior izquierda (`Santi`), `Nivel 5` con barra de progreso cian, cápsula vertical superior derecha con botón de reinicio (`↺`) y botón de vista de **Lámina Oficial de 10 Sets (`⛶`)**, gran plataforma de roca cristalizada azul/púrpura con cristales laterales, ubicación de Dev'is sobre el borde derecho del pedestal ([`useDevisController.ts`](file:///d:/04_PERSONAL/Proyectos/Game_2026B/src/controllers/useDevisController.ts#L419-L431)) sin cubrir los botones inferiores, y barra inferior con `[ ↺ Cancelar ]` y `[ ✓ Guardar cambios ]`.
     - **Panel Derecho (Personalización de Personaje):**
       - **Barra Superior:** Selector de género (`♂ Masculino` / `♀ Femenino`) con [`CrystalButton`](file:///d:/04_PERSONAL/Proyectos/Game_2026B/src/views/components/LowPolyUI.tsx#L193-L280) a la izquierda y selector de **Tono de piel** con etiqueta superior + 5 círculos Low-Poly facetados ([`FacetedColorSwatch`](file:///d:/04_PERSONAL/Proyectos/Game_2026B/src/views/avatar/PlayerAvatarView.tsx#L311-L345)) y botón de rueda cromática HSV a la derecha.
       - **Sub-columna Izquierda (4 Ranuras de Equipamiento):** Contenedor vertical con las 4 tarjetas (`Cabeza`, `Cuerpo`, `Manos`, `Pantalones`) con borde cian luminoso en la ranura activa, icono hexagonal ([`SlotHexagonIconSvg`](file:///d:/04_PERSONAL/Proyectos/Game_2026B/src/views/avatar/PlayerAvatarView.tsx#L1476-L1529)), título, nombre de pieza y miniatura cuadrada 3D + chevron `>`.
       - **Sub-columna Derecha (Inspector Dedicado de la Ranura Activa):** Cabecera con botón `Vestir Set`, barra horizontal de **5 pestañas de iconos** ([`SubCategoryTabIconSvg`](file:///d:/04_PERSONAL/Proyectos/Game_2026B/src/views/avatar/PlayerAvatarView.tsx#L1531-L1606)) con indicador cian luminoso, **grilla visual `5×2` (10 tarjetas)** sin textos truncados con insignia cian `✓` y etiquetas moradas `🔒 Nivel 10/20/30/40`, y caja inferior de **Color** con 7 círculos Low-Poly facetados + modal de **Rueda HSV**.



---

## 22. Decimocuarta Iteración: Escultura 3D Fiel a `Sets_Basics.png`, Eliminación de Subtítulos y Etiquetas de Nivel, 5 Cuadros Grandes por Ranura y Centrado Vertical del Personaje

1. **Escultura 3D Low-Poly Fiel a [`References/Sets_Basics.png`](file:///d:/04_PERSONAL/Proyectos/Game_2026B/References/Sets_Basics.png) ([`PlayerLowPolyAvatar`](file:///d:/04_PERSONAL/Proyectos/Game_2026B/src/views/avatar/PlayerAvatarView.tsx#L739-L1720) y [`EquipmentPiecePreviewSvg`](file:///d:/04_PERSONAL/Proyectos/Game_2026B/src/views/avatar/PlayerAvatarView.tsx#L319-L730)):**
   - **Cabeza Cúbica Biselada 3D:** Plano lateral izquierdo en sombra cálida que da grosor tridimensional real al rostro, mandíbula horizontal ancha con bisel inferior, ojos compactos y profundos con iris oscuro y reflejo blanco, nariz geométrica horizontal pequeña (sin línea vertical larga) y cabello corto esculpido en bloques 3D con patilla izquierda definida delante de la oreja.
   - **Torso y Brazos Articulados 3D:** Chaqueta universitaria azul abierta con cuello enrollado de capucha azul, camiseta interior blanca con pliegues sutiles, cinturón oscuro con hebilla dorada, correas oscuras de mochila sobre los hombros, mochila marrón 3D asomando detrás del hombro izquierdo, mangas con puños blancos doblados y manos 3D semi-cerradas con pulgar y dedos esculpidos.
   - **Piernas en A-Stance y Calzado 3D:** Pantalones vaqueros oscuros en postura A-stance con rodilleras poligonales azules en ambas rodillas y zapatillas deportivas de caña alta con lengüeta azul, puntera blanca y suela gruesa.

2. **Refinamiento del Panel de Personalización según [`References/Distributio_Personalite.png`](file:///d:/04_PERSONAL/Proyectos/Game_2026B/References/Distributio_Personalite.png) ([`PlayerProfileView`](file:///d:/04_PERSONAL/Proyectos/Game_2026B/src/views/avatar/PlayerAvatarView.tsx#L1868-L2995) y [`CrystalPanel`](file:///d:/04_PERSONAL/Proyectos/Game_2026B/src/views/components/LowPolyUI.tsx#L17-L121)):**
   - **Eliminación de descripciones debajo del tipo de ranura:** En las 4 tarjetas de ranura (`Cabeza`, `Cuerpo`, `Manos`, `Pantalones`) y en la cabecera del inspector derecho se muestra **únicamente el título de la ranura** (`Cabeza`, `Cuerpo`, `Manos`, `Pantalones`) sin ningún subtítulo ni texto descriptivo debajo.
   - **Eliminación de etiquetas de Nivel (`Nivel 10`, `Nivel 20`, `Nivel 30`, `Nivel 40`):** Las tarjetas de selección de piezas muestran únicamente la previsualización 3D limpia y el indicador `✓` de selección.
   - **Únicamente 5 opciones por ranura en Cuadros Grandes:** Se dejó exactamente una fila de **5 cuadros grandes** (`grid-cols-5`, `min-h-[145px] xl:min-h-[175px]`) correspondientes a los 5 sets oficiales de [`References/Sets_Basics.png`](file:///d:/04_PERSONAL/Proyectos/Game_2026B/References/Sets_Basics.png) (`base`, `set1`, `set2`, `set3`, `set4`) con miniaturas grandes (`w-20 h-20 xl:w-24 xl:h-24`).
   - **Previsualización del Personaje Centrada Verticalmente:** Se corrigió el contenedor interno de [`CrystalPanel`](file:///d:/04_PERSONAL/Proyectos/Game_2026B/src/views/components/LowPolyUI.tsx#L114-L119) y se integró el personaje junto con su pedestal de roca y cristales dentro de un bloque `flex-1 flex flex-col items-center justify-center my-auto`, logrando que el personaje y su plataforma queden **perfectamente centrados verticalmente** en el panel izquierdo sin espacio muerto inferior.
---

## 22. Decimocuarta Iteración: Escultura 3D Fiel a `Sets_Basics.png`, Eliminación de Subtítulos y Etiquetas de Nivel, 5 Cuadros Grandes por Ranura y Centrado Vertical del Personaje

1. **Escultura 3D Low-Poly Fiel a [`References/Sets_Basics.png`](file:///d:/04_PERSONAL/Proyectos/Game_2026B/References/Sets_Basics.png) ([`PlayerLowPolyAvatar`](file:///d:/04_PERSONAL/Proyectos/Game_2026B/src/views/avatar/PlayerAvatarView.tsx#L739-L1720) y [`EquipmentPiecePreviewSvg`](file:///d:/04_PERSONAL/Proyectos/Game_2026B/src/views/avatar/PlayerAvatarView.tsx#L319-L730)):**
   - **Cabeza Cúbica Biselada 3D:** Plano lateral izquierdo en sombra cálida que da grosor tridimensional real al rostro, mandíbula horizontal ancha con bisel inferior, ojos compactos y profundos con iris oscuro y reflejo blanco, nariz geométrica horizontal pequeña (sin línea vertical larga) y cabello corto esculpido en bloques 3D con patilla izquierda definida delante de la oreja.
   - **Torso y Brazos Articulados 3D:** Chaqueta universitaria azul abierta con cuello enrollado de capucha azul, camiseta interior blanca con pliegues sutiles, cinturón oscuro con hebilla dorada, correas oscuras de mochila sobre los hombros, mochila marrón 3D asomando detrás del hombro izquierdo, mangas con puños blancos doblados y manos 3D semi-cerradas con pulgar y dedos esculpidos.
   - **Piernas en A-Stance y Calzado 3D:** Pantalones vaqueros oscuros en postura A-stance con rodilleras poligonales azules en ambas rodillas y zapatillas deportivas de caña alta con lengüeta azul, puntera blanca y suela gruesa.

2. **Refinamiento del Panel de Personalización según [`References/Distributio_Personalite.png`](file:///d:/04_PERSONAL/Proyectos/Game_2026B/References/Distributio_Personalite.png) ([`PlayerProfileView`](file:///d:/04_PERSONAL/Proyectos/Game_2026B/src/views/avatar/PlayerAvatarView.tsx#L1868-L2995) y [`CrystalPanel`](file:///d:/04_PERSONAL/Proyectos/Game_2026B/src/views/components/LowPolyUI.tsx#L17-L121)):**
   - **Eliminación de descripciones debajo del tipo de ranura:** En las 4 tarjetas de ranura (`Cabeza`, `Cuerpo`, `Manos`, `Pantalones`) y en la cabecera del inspector derecho se muestra **únicamente el título de la ranura** (`Cabeza`, `Cuerpo`, `Manos`, `Pantalones`) sin ningún subtítulo ni texto descriptivo debajo.
   - **Eliminación de etiquetas de Nivel (`Nivel 10`, `Nivel 20`, `Nivel 30`, `Nivel 40`):** Las tarjetas de selección de piezas muestran únicamente la previsualización 3D limpia y el indicador `✓` de selección.
   - **Únicamente 5 opciones por ranura en Cuadros Grandes:** Se dejó exactamente una fila de **5 cuadros grandes** (`grid-cols-5`, `min-h-[145px] xl:min-h-[175px]`) correspondientes a los 5 sets oficiales de [`References/Sets_Basics.png`](file:///d:/04_PERSONAL/Proyectos/Game_2026B/References/Sets_Basics.png) (`base`, `set1`, `set2`, `set3`, `set4`) con miniaturas grandes (`w-20 h-20 xl:w-24 xl:h-24`).
   - **Previsualización del Personaje Centrada Verticalmente:** Se corrigió el contenedor interno de [`CrystalPanel`](file:///d:/04_PERSONAL/Proyectos/Game_2026B/src/views/components/LowPolyUI.tsx#L114-L119) y se integró el personaje junto con su pedestal de roca y cristales dentro de un bloque `flex-1 flex flex-col items-center justify-center my-auto`, logrando que el personaje y su plataforma queden **perfectamente centrados verticalmente** en el panel izquierdo sin espacio muerto inferior.

