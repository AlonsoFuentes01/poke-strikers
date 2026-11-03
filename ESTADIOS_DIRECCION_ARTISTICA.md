# Poké Strikers · Dirección de arte de estadios (2.5D)

## Referencia aprobada de estilo

**Un entorno tridimensional con apariencia de ilustración bidimensional.** Se conserva la cancha, los controles, la cámara de partido y los sprites 2D de los Pokémon. Los edificios y grandes elementos del terreno tienen profundidad real, con superficies ilustradas/pixeladas. Nunca se busca un fondo formado solo por prismas o árboles low-poly.

La **Ciudad V3** en `index.html` (`buildCityV3()`) es la **base de organización y calidad**, no una plantilla geométrica que se copia en los demás biomas.

## Ciudad V3 · Criterios de composición

- Base continua: calzada asfaltada, veredas, bordillos, baldosas, intersecciones y pasos peatonales. Nada debe parecer suspendido en el aire.
- Manzanas: fachadas alineadas hacia una calle continua; huecos entre manzanas son calles reales, no fallas del telón.
- Profundidad: skyline lejano ilustrado, edificios en segunda fila, comercios y balcones cercanos con volumen, aceras y mobiliario urbano.
- Materiales: texturas Canvas con ventanas, negocios, cornisas, toldos, balcones, desgaste y señales. No rascacielos futuristas.
- Vegetación: árboles pixel-art alineados con la vía, jardineras y parques en posiciones coherentes.
- Vida: Meowth ocasional en un balcón, vehículos por la calzada y charcos que reflejan la lluvia intermitente.
- **Regla crítica:** ningún muro, graderío, placa o edificio tapa toda la vista del barrio ni invade bancos, público o cancha.

## Reglas para el resto de biomas (no copiar los edificios de Ciudad)

| Estadio | Suelo y masa 3D | Fachada/capa 2D | Eventos |
| --- | --- | --- | --- |
| Clásico | Accesos, explanadas, portones, gradas pequeñas | Banderines, carteles, aficionados | Celebración, Pokémon espectador, lluvia ocasional |
| Atardecer | Calles de barrio, casas bajas, plaza | Fachadas cálidas, tejados, faroles | Luces encendidas, aves, niebla pasajera |
| Playa | Arena y paseo costero, kioscos, muelle | Mar, palmeras, toldos y veleros | Wingull, olas, viento y lluvia tropical breve |
| Volcán | Mesetas, basalto, grietas y caminos volcánicos | Lava, humo, paredes de roca | Cenizas, Slugma, chispas; **no casas urbanas** |
| Glaciar | Suelo de hielo, bloques, senderos y refugios lógicos | Pinos nevados, montañas y grietas | Spheal, brillo del hielo y nevada temporal |
| Espacio | Plataforma tecnológica, módulos conectados y pasarelas | Estrellas, planetas, paneles técnicos | Rotom, meteoros y destellos; **sin lluvia/nieve atmosférica** |
| Desierto | Dunas, caminos arenosos y ruinas conectadas | Cactus, rocas, textiles, murales | Trapinch/Sandile y remolinos; **sin nieve** |

## Reglas técnicas para iteraciones

1. Definir primero la geografía del bioma y los caminos o superficies continuos.
2. Modelar solo grandes volúmenes 3D con siluetas claras, **materiales ilustrados en 2D** y detalles arquitectónicos apropiados.
3. Añadir segundo plano y horizonte con profundidad; conservar visibilidad en las cámaras reales de partido.
4. Asegurar que sprites, balcones, puertas y personajes están anclados a su arquitectura y no flotan.
5. Usar clima automático por fases breves y coherentes. Los eventos ambientales son intermitentes, no permanentes.
6. Eliminar previamente los generadores antiguos que se superponen; no duplicar filas de edificios o murallas para «llenar» el fondo.
7. Reutilizar geometría y texturas; limpiar recursos al cambiar de estadio y respetar móviles.
8. **Comprobar en juego** a 16:9 y móvil horizontal (~760×340): ver suelo, profundidad, calles/caminos, cielo, bancos, público, personajes y FPS.
9. La validación de sintaxis JavaScript **no equivale** a probar renderizado, rendimiento ni composición.

## Estado

- Ciudad V3 reconstruida en `main` con `buildCityV3()`.
- Los otros siete estadios **aún requieren** reconstrucción individual bajo esta dirección artística.
- Ciudad requiere **validación visual en navegador y dispositivo móvil** antes de declarar aprobada la referencia.
