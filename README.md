# Poké Strikers

Fútbol arcade con Pokémon, hecho en un solo archivo HTML (Three.js). Sin build ni dependencias que instalar.

## Modos
- 1 jugador contra la IA
- 2 vs 2 local (4 jugadores): teclados A/B y hasta 4 mandos
- Online 1 vs 1 por código de sala (WebRTC con PeerJS)

## Controles (1 jugador)
Mouse o WASD · Shift correr · clic izq. tiro (mantén) · clic der. pase · F pase aéreo · E cambiar · Q poder · Mando Xbox compatible.

## Ejecutar en local
Abre `index.html` en el navegador, o sirve la carpeta con cualquier servidor estático:

    npx serve .

## Publicar en Vercel
1. Sube esta carpeta a un repositorio de GitHub.
2. En vercel.com: Add New → Project → importa el repositorio.
3. Framework Preset: **Other**. Sin comando de build ni carpeta de salida. Deploy.

## Créditos y licencias
- Three.js (MIT) y PeerJS (MIT), cargados desde jsDelivr.
- Sprites estilo Pokémon Mystery Dungeon: PMD SpriteCollab y sus artistas, licencia **CC BY-NC 4.0** (solo uso no comercial). https://github.com/PMDCollab/SpriteCollab
- Artwork y datos de Pokémon: PokeAPI.
- Pokémon y sus nombres son marcas de Nintendo, Game Freak y The Pokémon Company. Proyecto de fans sin fines de lucro, sin relación con ellos.

**Uso no comercial.** No monetizar ni publicar en tiendas sin reemplazar los personajes y sprites con material propio.
