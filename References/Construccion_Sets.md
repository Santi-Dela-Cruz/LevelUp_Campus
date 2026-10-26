# Construcción de sets desde cero

## Acuerdo de trabajo

La referencia visual es `Sets_Basics.png`. La implementación anterior recortaba esa imagen: no cumplía el objetivo de construir personajes editables. Esta nueva entrega dibuja geometría SVG propia en código, sin incrustar imágenes ni usar recortes de la referencia en los conjuntos reconstruidos.

Se trabaja por entregas de **dos sets, cada uno masculino y femenino**. Después de cada entrega se solicita aprobación antes de continuar. La semejanza se revisa visualmente; no se afirma una identidad del 100 % con una imagen que contiene perspectiva, iluminación y detalles pintados.

## Entrega 1 — universitario y académico

Estado: **entregas 1 y 2 implementadas, revisión 3; pendiente de revisión visual del usuario.** La entrega 2 se inició por la petición «Añade los dos sets más». Se conserva la perspectiva a tres cuartos y se refina el detalle de los primeros conjuntos.

| Variante | Prendas y rasgos de referencia | Estado |
| --- | --- | --- |
| Universitario masculino | Pelo corto castaño; chaqueta azul con mangas azules, camisa clara, tirantes marrones; vaqueros oscuros y zapatillas azules/blancas | Construido e integrado |
| Universitario femenino | Pelo violeta recogido; chaqueta azul, camisa clara y mochila; vaqueros oscuros y zapatillas azules/blancas | Construido e integrado |
| Académico masculino | Pelo castaño y gafas; abrigo azul marino con ribetes dorados, corbata; pantalón formal y zapatos oscuros | Construido e integrado |
| Académico femenino | Pelo violeta oscuro y gafas; abrigo azul marino y dorado; falda plisada, calcetines claros y zapatos burdeos | Construido e integrado |

### Registro

1. Revisada la implementación anterior: personajes y miniaturas usaban `<image>` y máscaras sobre el PNG. Es necesario sustituir también las miniaturas, no solo el avatar grande.
2. Definida una base común de 240 × 340 unidades: cuello, hombros, codos, muñecas, pelvis, caderas, rodillas y tobillos. Las prendas compartirán esos puntos.
3. La entrega será ilustración vectorial 2D con facetas que sugieren volumen low-poly. **No es una malla 3D ni un archivo `.riv`.** Se preparan grupos y pivotes para el trabajo de animación posterior, sin prometer que ya exista un esqueleto de Rive.
4. Construidos los cuatro personajes con polígonos y trazos propios. Se diferencian pelo corto / coleta / pelo suelto académico, gafas, chaqueta azul, abrigo marino con ribetes dorados, guantes, vaqueros, pantalón formal y falda plisada con calcetines y zapatos burdeos.
5. La jerarquía reúne 16 pivotes: raíz, pelvis, columna, cuello, dos hombros, dos codos, dos muñecas, dos caderas, dos rodillas y dos tobillos. Las manos cuelgan de sus muñecas dentro de la cadena del brazo; los zapatos pertenecen a sus tobillos.
6. Sustituidos el avatar del inicio, el retrato del perfil, los personajes del mapa, las miniaturas y la colección para los sets `base` y `set1`. El catálogo visible de esta etapa solo presenta esos dos sets, en ambas variantes. Los otros tres diseños no se reconstruyen ni se presentan como terminados.
7. Generados cuatro SVG completos y dieciséis SVG de piezas independientes en `public/avatars/constructed`. No requieren el PNG de referencia ni otros archivos gráficos para verse.
8. Primera revisión visual: ensanchada la cabeza para acercarla a las proporciones compactas, acortado el rostro y diferenciado el pelo suelto del set académico femenino respecto a la coleta universitaria. Se conserva una postura neutral común para facilitar la modularidad; el libro y la pose de la referencia femenina académica no forman parte del equipamiento en esta etapa.
9. Verificación técnica: cuatro personajes, dieciséis módulos, treinta y dos combinaciones entre prendas, dieciséis pivotes únicos por personaje y reglas de desbloqueo. Los SVG reconstruidos no contienen `<image>`, máscaras, recortes ni enlaces al PNG.
10. Verificación en navegador: se bloqueó `sets-basics.png` durante la prueba. Inicio, perfil, mapa y colección siguieron funcionando; se comprobaron las dos variantes, prueba del académico bloqueado, cancelar, cerrar con Escape y navegación sin scroll a 1440×900, 1303×643 y 1024×768. Compilación de producción correcta.
11. Exportados nombres de grupo estables en los SVG individuales para identificar prendas y articulaciones al trabajar en un editor vectorial. Los nombres no equivalen a huesos o restricciones de Rive ya configurados.

### Revisión visual pendiente del usuario

#### Revisión 2 — correcciones solicitadas

- Rehacer la proyección a tres cuartos hacia la derecha: oreja cercana visible, plano lateral de la cara, ojos desplazados hacia la cara frontal y ojo lejano más estrecho.
- Eliminar la simetría por espejo de brazos y piernas. Dibujar por separado los lados cercano y lejano, con distinta anchura, orientación de calzado y reparto de luz.
- Ensanchar cabeza, hombros, mangas y pantalones; sustituir el mentón puntiagudo y la sonrisa marcada por mandíbula compacta y expresión de la referencia.
- Rehacer la chaqueta con cuello elevado, azul más oscuro, tirantes de mochila casi negros, costuras y bajos azules (sin las franjas blancas ajenas a la referencia).
- Usar la misma proyección para las cuatro variantes de esta entrega y sus piezas; actualizar pivotes y exportaciones.

La revisión 2 mantiene las prendas, los accesorios principales y las facetas mediante geometría vectorial propia, ahora en tres cuartos hacia la derecha. Aún necesita tu aprobación de parecido: no se certifica una coincidencia del 100 %. El acabado tiene sombras por caras planas; no es una malla tridimensional. Antes de continuar se pueden ajustar rostro, proporciones, volumen y detalles de estos dos sets.

#### Registro de implementación de la revisión 2

1. Rehecha la cabeza: plano lateral sombreado separado de la cara frontal, oreja visible solo del lado cercano, mandíbula corta, ojos de distinto ancho y posiciones coherentes con el giro. Se sustituyeron la sonrisa y el peinado excesivamente puntiagudo.
2. Rehecho el torso: hombros más anchos, camisa con planos gris azulado, cuello elevado de la chaqueta, bajos azules, bolsillos inclinados y tirantes oscuros. Se quitaron las franjas blancas del bajo que no correspondían a la referencia.
3. Rehechos brazos y manos con geometrías independientes por lado. Se eliminó el espejo `scale(-1,1)` que hacía frontal y simétrica la figura.
4. Rehechas piernas y zapatos: pierna cercana inclinada, parche azul únicamente en esa rodilla, pierna lejana más vertical y zapatillas dibujadas con orientaciones distintas. Actualizados los dieciséis pivotes y las miniaturas para que el calzado no se recorte.
5. Aplicada la misma proyección a universitario y académico, en hombre y mujer. Se mantienen coleta / cabello académico suelto, gafas, ribetes dorados y falda plisada.
6. Muestreados colores directamente del PNG mediante lectura de píxeles (sin incorporar la imagen al dibujo): cabello masculino `(112,207)` → `#221814`; piel `(122,230)` → `#FDCF94`; chaqueta masculina `(134,271)` → `#344B8C`; chaqueta femenina `(112,811)` → `#2E6FE9`. Las otras caras usan tonos de luz y sombra próximos a esas muestras.
7. Regenerada la lámina y los veinte SVG individuales: cuatro personajes y dieciséis módulos. Continúan sin imágenes externas, máscaras ni recortes rasterizados.
8. Verificación de la revisión 2: compilación correcta; treinta y dos combinaciones modulares y dieciséis articulaciones únicas verificadas; recorrido del dashboard con el PNG bloqueado en tres resoluciones. Revisadas visualmente la lámina y la vista del personaje dentro del juego. La semejanza artística queda pendiente de la revisión del usuario.

### Reproducir exportaciones y verificaciones

```sh
npm run avatars:export
npm run test:avatars
npm run build
```

La prueba de interfaz `node scripts/test-dashboard.cjs` requiere el servidor local activo y una instancia de Chromium/Edge de pruebas con CDP en el puerto 9222. Comprueba también la descarga del JavaScript y CSS, para detectar la regresión que causó la pantalla blanca.

### Archivos de esta entrega

- Dibujo y pivotes: [ConstructedSets.tsx](../src/views/avatar/ConstructedSets.tsx).
- Integración: [AvatarArtwork.tsx](../src/views/avatar/AvatarArtwork.tsx).
- [Lámina de la entrega 1](../public/avatars/constructed/delivery-1.html).
- [Lámina vectorial SVG](../public/avatars/constructed/delivery-1.svg).
- [Manifiesto de prendas y pivotes](../public/avatars/constructed/manifest.json).

### Preparación para animación

Los grupos contienen `data-bone`, `data-pivot`, `data-slot` y `data-part`, con transformaciones anidadas. Se conserva un único pivote por articulación en cada personaje completo. Es una base de organización para el rig futuro: aún falta construir el esqueleto y las restricciones en Rive, comprobar deformaciones en poses extremas y crear las animaciones. Los atributos personalizados pueden requerir conversión a nombres de capas al importar en otro editor.

### Compatibilidad con el trabajo anterior

El código de atlas antiguo permanece únicamente para los IDs todavía no reconstruidos y las exportaciones anteriores se conservan. No se usa para dibujar los cuatro personajes de esta entrega. La exportación vigente (`npm run avatars:export`) produce exclusivamente la colección vectorial nueva; las carpetas antiguas de `public/avatars` no deben confundirse con esta entrega.

## Entrega 2 — deportivo y tecnológico

1. Construidos desde cero cuatro personajes adicionales con polígonos SVG, sin imágenes incrustadas ni recortes de la referencia.
2. Deportivo masculino: gorra azul con visera en perspectiva, chaqueta blanca y azul, auriculares al cuello, guantes deportivos, pantalón oscuro con líneas laterales y zapatillas azules/blancas.
3. Deportivo femenino: gorra con panel blanco, cabello recogido, top blanco con banda azul, guantes claros, leggings violeta marino y zapatillas deportivas.
4. Tecnológico masculino y femenino: visor facetado cian con marco oscuro, chaqueta azul y negra con paneles cian, guantes segmentados, pantalones tácticos, rodilleras y botas. La variante femenina mantiene brazos descubiertos y brazales, como en la referencia.
5. Conservados los dieciséis pivotes comunes y las cuatro categorías independientes. Las prendas nuevas se pueden mezclar con universitario y académico sin cambiar el cuerpo base. La animación y el rig de Rive siguen pendientes.
6. Refinados universitario y académico: planos del cabello, costuras, cremalleras, hebillas, ribetes, dedos y detalles del calzado.
7. Aislados los filtros de color por instancia para que un personaje no altere los otros. Los colores predeterminados conservan la paleta dibujada; se mantienen los controles personalizados existentes.
8. Integrados cuatro sets en la colección del perfil. La cuadrícula muestra los cuatro conjuntos por género. Las pruebas de prendas bloqueadas se pueden cancelar; guardar comprueba el nivel de todas las piezas y no registra equipamiento bloqueado.
9. Exportados ocho personajes completos y treinta y dos piezas. Verificadas 512 combinaciones modulares, dieciséis articulaciones únicas, desbloqueos y ausencia de imágenes rasterizadas en los dibujos nuevos.
10. Validación final: compilación de producción y TypeScript correctos. Prueba de navegador en 1440×900, 1303×643 y 1024×768: siete secciones, navegación, búsqueda, colección, prueba de los nuevos conjuntos en ambos géneros, cancelar y Escape; sin scroll del dashboard ni controles fuera de pantalla. Se bloqueó el PNG antiguo durante las pruebas. Revisada visualmente la lámina exportada de la entrega 2.

### Láminas y archivos actualizados

- [Entrega 2: deportivo y tecnológico](../public/avatars/constructed/delivery-2.html).
- [Entrega 2 en SVG](../public/avatars/constructed/delivery-2.svg).
- [Colección de ocho personajes](../public/avatars/constructed/collection.html).
- [Colección en SVG](../public/avatars/constructed/collection.svg).
- [Manifiesto con piezas y pivotes](../public/avatars/constructed/manifest.json).

El atlas anterior solo permanece para el set aventurero pendiente. Los cuatro sets reconstruidos usan geometría propia. La semejanza artística sigue sujeta a revisión; estos SVG no son mallas 3D ni archivos Rive animados.

## Corrección de personalización — colores y guardado

Por indicación del usuario, el trabajo se mantiene en los cuatro sets actuales. Universitario, académico, deportivo y tecnológico son ahora **de uso libre**, sin requisitos de nivel. El aventurero no se añade en esta etapa.

- Sustituidos los filtros multiplicativos por colores de polígonos individuales. Piel, cabello e iris conservan sus facetas sin teñir prendas, guantes, blancos de los ojos ni otros personajes. La piel incluye orejas, cuello, brazos, abdomen y piernas descubiertas. Las miniaturas reciben la misma apariencia que el personaje.
- Rediseñado el botón de color como gema facetada y el selector como panel marino/violeta con acentos cian, siguiendo `Referencias_componentes.png`.
- Corregida la correspondencia entre posición de la rueda y matiz. La distancia al centro controla saturación; se añaden controles de matiz, saturación, luminosidad de 0 a 100 y entrada hexadecimal validada. Permite ratón, arrastre táctil y controles de teclado. Aplicar confirma el color; Cancelar, Escape y cerrar descartan el cambio del selector.
- Unificado el borrador de personalización: prendas individuales, conjunto completo, género, colores y restablecer no modifican el avatar guardado hasta confirmar. Cancelar descarta el borrador. Guardar persiste la configuración completa y muestra un error si el navegador impide escribir en almacenamiento.
- Verificadas las 512 combinaciones y cambios de color independientes en los ocho personajes, incluyendo tonos claros, oscuros y saturados; las prendas y otros rasgos conservan sus colores. Verificados guardado de prendas mezcladas y tres colores, recarga, cancelar, selector y navegación sin scroll en tres resoluciones. Compilación de producción correcta.

### Siguiente entrega — aplazada por el usuario

- Aventurero, hombre y mujer; revisión conjunta de los cinco sets y combinaciones.

No iniciar la siguiente entrega sin respuesta del usuario.
