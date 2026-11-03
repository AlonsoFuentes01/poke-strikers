# Poké Strikers · Mystery Dungeon Visual Edition

## Punto de retorno
La rama **`backup/pre-mystery-dungeon-2026-11-03`** conserva el contenido de `main` antes de esta actualización de arte. No reescribir esa rama. Para revertir, comparar primero con esa rama y crear un commit de reversión; evitar `push --force` sobre `main`.

## Restricciones conservadas
- Misma jugabilidad, física, equipos, cámara del partido y goles.
- Mismos botones y asignaciones de controles para PC y móvil, así como pestañas, asistente, ajustes, editor, sustituciones y flujo online.
- El sistema de clima automático por bioma se mantiene, sin selector manual.
- Los Pokémon en el campo se cargan primero desde SpriteCollab: `Walk-Anim.png` y `AnimData.xml`. Si no se dispone del recurso, se utiliza un sprite pixelado de PokeAPI, nunca arte oficial de alta resolución como sustituto.
- Se conservan las atribuciones del proyecto a los colaboradores de los sprites.

## Nuevas reglas visuales
- **HD-2D estilo Mystery Dungeon:** texturas 2D pixeladas, siluetas oscuras, colores cálidos/vivos y estructuras con perspectiva mediante volúmenes 3D pequeños.
- **Terreno propio para cada estadio:** `mdPaintPitch(mode)` produce texturas pixeladas distintas para Ciudad (pavimento), Clásico (césped), Atardecer (suelo cálido), Playa (césped costero), Volcán (roca calurosa), Glaciar (hielo), Espacio (paneles) y Desierto (arena/losas). Se mantienen las líneas del campo y el tamaño original.
- **Escenarios por capas:** `mdIllustratedWorld(mode)` genera un horizonte dibujado, estructuras intermedias, siluetas cercanas, nubes en movimiento y sombras ambientales. La geografía es específica para cada bioma.
- **Playa:** conserva `bBeachV4()`, con su mar, barco, rocas, faro, Centro Pokémon y sombras de nubes.
- **Ciudad:** conserva `buildCityV3()`, renovada con un edificio central de estilo Pokémon y el barrio con caminantes, balcones y comercios.
- **Otros seis estadios:** se apoyan en `buildWorldV31(mode)` más panorama específico, sin las antiguas capas genéricas que causaban superposiciones. Clásico y Atardecer usan igualmente este sistema.
- **Interfaz:** reemplazo estético solamente, sin reorganizar pestañas ni cambiar el tamaño o función de los botones. Las tarjetas de estadio muestran pequeñas miniaturas dibujadas mediante Canvas.
- **Animación:** nubes con desplazamiento suave, sombras sobre el campo, SpriteCollab para caminantes, efectos y celebraciones ya existentes.

## Pruebas pendientes antes de dar el arte por aprobado
- Inspección real de los ocho escenarios desde la cámara jugador-céntrica, incluidas porterías y bancas.
- Móvil horizontal (~760 × 340), botones visibles, FPS y uso de memoria al cambiar varias veces de estadio.
- Partidas local, 2 vs 2, online y celebración de gol para verificar invariantes jugables.
- Carga de los sprites PMD cuando una especie no está disponible y sustitución por pixel-art de PokeAPI.
- Confirmar visualmente que sombras y texturas no cubren líneas ni a los Pokémon.

**Importante:** el nuevo sistema genera arte integrado mediante Canvas y geometría 3D; no son copias exactas de los bocetos ilustrados. Los bocetos son la dirección estética y referencia para siguientes pulidos.
