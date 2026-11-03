# Poké Strikers — Dirección visual Mystery Dungeon (cinco estadios restantes)

Estado: especificación visual para continuar la migración. No altera lógica, física, controles, red, jugadores, cámara, banquillos ni sonidos.

## Base
- Seguir usando Three.js r147 como capa técnica 2.5D. No reemplazar motor lógico.
- Geometría de cancha HX=30 HZ=18 y porterías de 5.5 sin cambios.
- Usar pixel art coherente: texturas a resolución baja, `NearestFilter`, sprites orientados a cámara, capas de profundidad en planos y arquitectura liviana.
- Los Pokémon jugadores y NPC usan PMDCollab/SpriteCollab cuando haya Walk-Anim.png y AnimData.xml, con fallback de PokeAPI; verificar visualmente dirección, recortes, anclaje y tamaño de cada especie.
- Los entrenadores siguen siendo imágenes reales de Showdown, nunca recreaciones IA.
- Respetar paneles, controles táctiles, personalización UI, online y 2 vs 2.

## 1. Atardecer — Arena del Ocaso (`sunset`)
- Piso: piedra cálida con desgaste, señalización clara y bordes rojizos.
- Lejanía: montañas lavanda, cielo naranja, nubes 2D.
- Gradas: madera, piedra rosada, tejados de teja, farolas y puestos del pueblo.
- Movimiento: nubes lentas, estandartes agitados, luces de farolas titilantes y público PMD animado.
- Paleta: melocotón, teja, violeta y dorado.

## 2. Clásico — Estadio de la Liga (`classic`)
- Piso: césped pixelado con franjas y desgaste, sin alterar colisiones ni marcación.
- Lejanía: colinas, árboles, cielo azul.
- Gradas: madera y piedra, banderas, escudos y flores en las barandas.
- Movimiento: público, banderines, hojas y brillos de pequeñas lámparas.
- Paleta: verde oliva, crema, turquesa apagado y oro.

## 3. Playa — Bahía Coral (`beach`)
- Piso: arena firme y piedra clara con líneas de alto contraste.
- Lejanía: océano turquesa, arrecifes, islotes y nubes.
- Gradas: muelle de madera, tiendas, palmeras y conchas.
- Movimiento: olas cíclicas, espuma, hojas de palmeras, aves lejanas y público.
- Paleta: arena, aguamarina, marino y coral.

## 4. Ártico — Arena Glaciar (`arctic`)
- Piso: hielo mate y nieve compacta, marcas visibles; la superficie es visual y no cambia fricción de juego.
- Lejanía: pinos nevados, montañas azules y cielo frío.
- Gradas: madera nevada, barandas heladas, faroles, casetas.
- Movimiento: copos, viento, vapor ligero y reflejos pixelados.
- Paleta: blanco hielo, azul cielo, cian y pizarra.

## 5. Espacio — Coliseo Astral (`space`)
- Piso: losas minerales con líneas celestes contrastantes.
- Lejanía: nebulosas, cielo estrellado, islas flotantes y cristales.
- Gradas: piedra astral, plataformas suspendidas y cristales luminosos.
- Movimiento: estrellas, cristales pulsantes, polvo estelar y meteoros remotos.
- Paleta: índigo, violeta, azul hielo y lavanda.

## Referencias recibidas
Ciudad, Desierto y Volcán: usar los tres bocetos proporcionados por el usuario como referencia de arquitectura, cámara, escala, paleta y profundidad. Son bocetos, no atlas de texturas listos para el juego.

## Requisitos y verificación
1. Preservar las ocho opciones y sus identificadores: city, sunset, classic, beach, volcano, arctic, space, desert.
2. Verificar FPS, carga de texturas y consumo de memoria en iPhone horizontal (760x340) y PC.
3. Validar que no haya planos que tapen pelota, porterías, Pokémon o banquillos.
4. Verificar ciclo completo menú -> partido -> final en modo local y online, más controles táctiles.
5. Confirmar uso adecuado/licencia CC BY-NC 4.0 y créditos por artistas de PMDCollab; no asumir que todos los sprites están completos.
6. Mantener una rama de respaldo para cambios grandes. Implementar reemplazos visuales de estadio por iteraciones verificables.
