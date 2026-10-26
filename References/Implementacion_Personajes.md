# Implementación anterior: recortes de referencia (histórico)

**Sustituida para los sets universitario, académico, deportivo y tecnológico.** La construcción vigente y su progreso se documentan en [Construccion_Sets.md](./Construccion_Sets.md). Esos cuatro sets, masculino y femenino, ahora usan geometría vectorial propia. El contenido de este archivo describe la etapa anterior y no las nuevas entregas.

La implementación usa los píxeles de [Sets_Basics.png](./Sets_Basics.png), sin redibujar ni sustituir sus prendas. La textura servida por el juego es una copia idéntica del archivo original; las pruebas comparan su SHA-256.

## En el juego

En **Mi Personaje**, el botón de ampliar abre los diez conjuntos. El set base está incluido; académico, deportivo, tecnológico y aventurero corresponden a niveles 10, 20, 30 y 40. Todos pueden probarse. Las pruebas no cambian el personaje equipado hasta confirmarlas y cumplir el nivel.

Se mantienen los colores originales. Los controles de recoloración se han retirado de este modo para no presentar acciones que no modifican el arte.

## Implementación

- [AvatarArtwork.tsx](../src/views/avatar/AvatarArtwork.tsx) muestra la textura original mediante recortes SVG. Un conjunto completo conserva el dibujo y sus proporciones originales, con escala uniforme.
- [ReferenceAtlas.model.ts](../src/models/avatar/ReferenceAtlas.model.ts) describe posiciones, recortes de miniaturas y anclajes por variante.
- [ReferenceSilhouettes.json](../src/models/avatar/ReferenceSilhouettes.json) elimina el fondo alrededor de las figuras.
- [AvatarEquipment.model.ts](../src/models/avatar/AvatarEquipment.model.ts) conserva nombres, categorías y desbloqueos.
- [PlayerAvatarView.tsx](../src/views/avatar/PlayerAvatarView.tsx) integra la colección, las pruebas y las cuatro categorías de equipamiento.

Las combinaciones mezcladas alinean cabeza, cuerpo, manos y pantalones usando cuello, cintura y muñecas. Las zonas ocultas bajo los abrigos académicos necesitan una extensión de color para cerrar la unión: la referencia no contiene el dibujo de esas superficies ocultas.

## Exportaciones

[Ver colección](../public/avatars/collection.html) · [Lámina SVG](../public/avatars/collection.svg) · [Manifiesto](../public/avatars/manifest.json).

En [public/avatars](../public/avatars) hay diez personajes completos y cuarenta módulos. Cada variante y set contiene los archivos `character.svg`, `head.svg`, `chest.svg`, `hands.svg` y `legs.svg`.

Estas exportaciones son **recortes SVG de una textura PNG**, no ilustraciones vectoriales ni archivos Rive. Debe conservarse la carpeta `reference` junto a las carpetas de personajes, porque los SVG enlazan la textura con rutas relativas.

La fuente tiene 1312 × 1199 píxeles y cada personaje ocupa aproximadamente 170–185 píxeles de alto. Mostrarlo más grande conserva su diseño, pero no crea detalle adicional. Para animación articulada en Rive aún se necesitan las capas ocultas y el rig; aquí no se simula que esos recursos ya existan.

## Comprobaciones

```sh
npm run avatars:export
npm run test:avatars
npm run build
```

Las pruebas comprueban la identidad del archivo de referencia, los diez sprites completos, las cuarenta miniaturas, las 1.250 configuraciones de equipamiento, los límites de nivel y la ausencia de identificadores o enlaces de recorte SVG duplicados o rotos.
