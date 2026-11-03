/* Poké Strikers — Estadio Volcán hecho con las hojas de recursos APROBADAS.
 * Recursos reales: assets/volcano-main.webp y assets/volcano-minor.webp.
 * Cada dibujo se recortó individualmente de las ilustraciones originales.
 * No se reutiliza ninguna casa, tienda, edificio o textura de Ciudad.
 * La física, la cancha 60x36, las porterías, la cámara y los Pokémon
 * continúan controlados por index.html.
 */
(function (global) {
 'use strict';
 const MAIN = {
  panorama:[0,0,512,94], fortress:[0,96,292,164],
  standLeft:[293,96,218,148], standRight:[293,246,218,148],
  pitch:[0,397,512,222], basalt:[0,245,252,88],
  lavafall:[0,337,156,56], ruin:[157,336,274,58],
  altar:[0,621,204,89], brazer:[208,621,72,95],
  crystal:[283,622,75,83], banner:[365,623,60,89],
  gate:[0,710,160,89], vent:[162,720,116,79],
  crack:[282,711,228,85]
 };
 const MINOR = {
  rocks:[0,0,99,62], rubble:[102,0,108,62],
  crystalSmall:[213,0,74,62], crystalMedium:[290,0,104,62],
  tileCrack:[397,0,58,62], tileCorner:[0,64,74,63],
  lavaCrack:[76,64,112,63], groundVent:[191,64,95,63],
  magmaGrate:[289,64,95,63], wallTorch:[387,64,71,63],
  wallSconce:[0,129,78,65], smallBrazer:[81,129,86,65],
  narrowBrazer:[170,129,80,81], chain:[254,129,44,81],
  brokenChain:[301,129,90,81], bannerShort:[394,129,78,81],
  bannerNarrow:[0,212,73,96], totem:[76,212,99,96],
  brokenPillar:[178,212,85,96], shortPillar:[266,212,67,96],
  arcFragment:[336,212,96,96], lavaOutlet:[0,310,107,96],
  shrine:[110,310,80,96], altarStone:[193,310,110,96],
  volcanoIdol:[306,310,112,94], shortStairs:[0,408,122,102],
  decorBlock:[125,408,134,102], stoneRail:[262,408,130,44],
  ropeBarrier:[395,405,117,98]
 };
 let current = null;
 function textureFrame(THREE, texture, rect, atlasWidth, atlasHeight, width, height) {
  const g = new THREE.PlaneGeometry(width, height);
  const uv = g.attributes.uv;
  for (let i=0;i<uv.count;i++) {
   const u=uv.getX(i),v=uv.getY(i);
   uv.setXY(i,(rect[0]+rect[2]*u)/atlasWidth,
    1-(rect[1]+rect[3]*(1-v))/atlasHeight);
  }
  uv.needsUpdate=true;
  const mat=new THREE.MeshBasicMaterial({map:texture,transparent:true,
   alphaTest:.025,side:THREE.DoubleSide,depthWrite:false,
   toneMapped:false,fog:false});
  const mesh=new THREE.Mesh(g,mat);
  return mesh;
 }
 function build(o) {
  const {THREE,cityG,HX,HZ,GW,apron,pitchMat,SCENIC_TEXTURES}=o;
  const scene=new THREE.Group();scene.name='VOLCAN_REAL_PIXEL_ART';cityG.add(scene);
  const cinematic=new THREE.Group();cinematic.name='VOLCAN_ENTRADA_PIXELES';scene.add(cinematic);
  const near=new THREE.Group();near.name='VOLCAN_PRIMER_PLANO';scene.add(near);
  const groundProps=new THREE.Group();groundProps.name='VOLCAN_DECORACION_MENOR';scene.add(groundProps);
  const loader=new THREE.TextureLoader();
  const getAtlas=(path)=>{
   const t=loader.load(path,undefined,undefined,(err)=>console.warn('[VOLCAN] No se pudo cargar',path,err));
   t.encoding=THREE.sRGBEncoding;
   t.magFilter=THREE.NearestFilter;t.minFilter=THREE.NearestFilter;
   t.generateMipmaps=false;
   SCENIC_TEXTURES.push(t);
   return t;
  };
  const main=getAtlas('./assets/volcano-main.webp?v=1');
  const minor=getAtlas('./assets/volcano-minor.webp?v=2');
  const A={THREE,main,minor};current=A;
  const embers=[];
  const mk=(name,w,h,x,y,z,opts={})=>{
   const small=opts.small===true;
   const region=(small?MINOR:MAIN)[name];
   if(!region)throw new Error('Textura volcánica desconocida: '+name);
   const mesh=textureFrame(THREE,small?minor:main,region,small?512:512,small?512:800,w,h);
   mesh.position.set(x,y,z);
   if(opts.horizontal)mesh.rotation.x=-Math.PI/2;
   mesh.renderOrder=opts.order||0;
   (opts.parent||scene).add(mesh);
   return mesh;
  };
  // I. PANORAMA — solo caldera, roca y lava. Es la ilustración aprobada.
  mk('panorama',124,29,0,-9,-63,{parent:cinematic});
  for(const side of [-1,1]){
   mk('basalt',35,12,side*56,1,-46,{parent:cinematic});
   mk('lavafall',10.5,13,side*58,1.5,-44,{parent:cinematic});
   mk('ruin',22,11,side*55,3.1,-36,{parent:cinematic});
  }
  // II. TRES MÓDULOS QUE COMPARTEN LAS MISMAS TEJAS Y LA MISMA PALETA.
  // Gradas al fondo: el público del juego usa sus sprites PMD encima.
  mk('standLeft',30.0,19.4,-36.7,10.1,-30.0,{parent:cinematic});
  mk('standRight',30.0,19.4,36.7,10.1,-30.0,{parent:cinematic});
  // Fortaleza central delante de los graderíos: no se recorta la puerta.
  mk('fortress',43.0,24.2,0,12.25,-29.3,{parent:cinematic,order:1});
  // Paredes de continuidad en la misma franja de la fortaleza.
  for(const side of [-1,1]){
   mk('basalt',15.5,8.0,side*55,3.75,-30.8,{parent:cinematic});
   mk('gate',7.8,5.2,side*47,2.8,-28.3,{parent:cinematic,order:1});
  }
  // III. DECORACIÓN DE PIEZA REAL. Todo queda FUERA del campo jugable.
  function standing(name,x,z,w,h,small=true,parent=groundProps,base=0) {
   return mk(name,w,h,x,base+h/2,z,{small,parent,order:2});
  }
  function ground(name,x,z,w,d,small=true,parent=groundProps,y=.065){
   return mk(name,w,d,x,y,z,{small,parent,horizontal:true,order:1});
  }
  const sideX=HX+5.8;
  for(const side of [-1,1]){
   const x=side*sideX;
   standing('altar',x,-12.0,7.8,4.4,false);
   standing('totem',x,0.0,3.4,5.4);
   standing('crystalMedium',x,10.1,4.2,3.2);
   standing('brokenPillar',side*(HX+8.0),-7.4,2.9,4.7);
   standing('smallBrazer',side*(HX+8),6.2,3,3.2);
   standing('bannerNarrow',side*(HX+7.5),-15.6,2.5,5.0);
   ground('lavaCrack',side*(HX+3.2),15,4.6,2.4);
   ground('groundVent',side*(HX+4.4),-2.8,3.1,2.7);
   standing('rocks',side*(HX+8.1),13.6,3.4,2.0);
   standing('decorBlock',side*(HX+6.3),-17.2,6.2,3.8);
  }
  // Primer plano monumental, solo durante la entrada cinematográfica.
  for(const side of [-1,1]){
   standing('ruin',side*53,HZ+7,16,8.1,false,near);
   standing('brazer',side*24,HZ+4.1,4.2,5.7,false,near);
   standing('crystal',side*38,HZ+7,5.1,5.0,false,near);
   standing('volcanoIdol',side*60,HZ+4,5.7,5.4,true,near);
   ground('crack',side*16,HZ+7.5,15,3.8,false,near,.075);
  }
  standing('shrine',0,HZ+6.5,7.2,5.9,true,near);
  standing('shortStairs',-10,HZ+5.5,6.4,4.5,true,near);
  standing('altarStone',10,HZ+5.5,5.9,4.5,true,near);
  // Un zócalo de cantería continua por fuera de la línea lateral.
  for(let x=-34;x<=34;x+=8.5){
   standing('stoneRail',x,HZ+2.1,9.3,1.45,true,groundProps);
   standing('stoneRail',x,-(HZ+4.9),9.3,1.45,true,groundProps);
  }
  for(let z=-13.5;z<=13.5;z+=9){
   ground('magmaGrate',HX+8.3,z,2.4,3.5);
   ground('magmaGrate',-(HX+8.3),z,2.4,3.5);
  }
  // Brillo sutil en los braseros ya ilustrados, sin sprites ajenos.
  for(const side of [-1,1]){
   const m=standing('narrowBrazer',side*11,HZ+3.8,3.1,4.8,true,near);
   embers.push({mesh:m,phase:side*1.8,base:4.8});
  }
  // IV. CANCHA: copiar la lámina real de obsidiana y agregar líneas de fútbol.
  // El shader climático del juego sigue aplicado a pitchMat/apron.
  function refreshPitch(img) {
   if(scene.parent!==cityG)return; // Evita mutar Ciudad si hubo un cambio rápido.
   const canvas=document.createElement('canvas');canvas.width=1024;canvas.height=614;
   const q=canvas.getContext('2d');q.imageSmoothingEnabled=false;
   const a=MAIN.pitch;
   q.drawImage(img,a[0],a[1],a[2],a[3],0,0,1024,614);
   // Líneas legibles sobre la piedra (reglas y medidas intactas).
   q.strokeStyle='#fff0dc';q.lineWidth=6;q.strokeRect(16,16,992,582);
   q.beginPath();q.moveTo(512,16);q.lineTo(512,598);q.stroke();
   q.strokeRect(16,169,156,276);q.strokeRect(852,169,156,276);
   q.strokeRect(16,237,52,140);q.strokeRect(956,237,52,140);
   q.beginPath();q.arc(512,307,86,0,Math.PI*2);q.stroke();
   for(const p of [[512,307],[104,307],[920,307]]){
    q.beginPath();q.arc(p[0],p[1],5,0,7);q.fillStyle='#fff0dc';q.fill();
   }
   const pitchTex=new THREE.CanvasTexture(canvas);
   pitchTex.encoding=THREE.sRGBEncoding;
   pitchTex.magFilter=THREE.NearestFilter;pitchTex.minFilter=THREE.NearestFilter;
   pitchTex.generateMipmaps=false;pitchTex.userData.pmdOwned=true;
   SCENIC_TEXTURES.push(pitchTex);
   pitchMat.map=pitchTex;pitchMat.color.setHex(0xffffff);pitchMat.needsUpdate=true;
   const outer=document.createElement('canvas');outer.width=512;outer.height=222;
   const oq=outer.getContext('2d');oq.imageSmoothingEnabled=false;
   oq.drawImage(img,a[0],a[1],a[2],a[3],0,0,512,222);
   oq.fillStyle='rgba(28,20,36,.18)';oq.fillRect(0,0,512,222);
   const outerTex=new THREE.CanvasTexture(outer);
   outerTex.encoding=THREE.sRGBEncoding;
   outerTex.magFilter=THREE.NearestFilter;outerTex.minFilter=THREE.NearestFilter;
   outerTex.wrapS=outerTex.wrapT=THREE.RepeatWrapping;
   outerTex.repeat.set((HX*2+16)/(HX*2),(HZ*2+18)/(HZ*2));
   outerTex.generateMipmaps=false;outerTex.userData.pmdOwned=true;
   SCENIC_TEXTURES.push(outerTex);
   apron.material.map=outerTex;apron.material.color.setHex(0xffffff);
   apron.material.needsUpdate=true;apron.visible=true;
  }
  // La carga es asíncrona; las piezas emplean directamente la textura compartida.
  // El suelo se crea desde la misma imagen cuando el atlas termina de decodificar.
  const imagePath='./assets/volcano-main.webp?v=1';
  const groundImage=new Image();
  groundImage.onload=()=>refreshPitch(groundImage);
  groundImage.onerror=()=>console.warn('[VOLCAN] No cargó el pavimento original:',imagePath);
  groundImage.src=imagePath;
  // Fondo temporal oscuro mientras se descarga el atlas, nunca el verde de Ciudad.
  pitchMat.color.setHex(0x66566c);apron.material.color.setHex(0x5b4a60);
  // Porterías perfectamente visibles desde arriba; no modifican colisiones.
  const white=new THREE.MeshBasicMaterial({color:0xfff5df,depthTest:false,depthWrite:false});
  const accent=[0xf17970,0x79c4ef].map(color=>new THREE.MeshBasicMaterial({color,depthTest:false,depthWrite:false}));
  function line(x,z,w,d,mat,yy=.16){
   const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,.012,d),mat);
   mesh.position.set(x,yy,z);mesh.renderOrder=10;scene.add(mesh);
  }
  for(const side of [-1,1]){
   const x=side*(HX+1.5);
   line(side*(HX+.15),0,.29,GW*2+.75,white);
   line(side*(HX+2.8),0,.27,GW*2+.75,white);
   for(const z of [-GW-.36,GW+.36]){
    line(x,z,3.1,.28,white);
    line(x,z,2.7,.10,accent[side<0?0:1],.18);
   }
  }
  scene.userData.pmdSetIntro=(mix)=>{
   const k=Math.max(0,Math.min(1,(mix-.43)/.35));
   near.visible=k<.99;
   near.position.y=-11*k;
  };
  scene.userData.pmdTick=(dt,t)=>{
   for(const e of embers){
    const pulse=Math.sin(t*.008+e.phase);
    e.mesh.scale.set(1+pulse*.045,1+Math.sin(t*.011+e.phase)*.06,1);
   }
  };
  return scene;
 }
 // Los suplentes del Volcán usan asientos dibujados desde el MISMO atlas.
 // Los Pokémon y entrenadores los construye el juego: aquí no hay personajes falsos.
 function buildBench(o){
  if(!current)return;
  const {THREE,dugG,cx,zSeat,team}=o;
  const {main,minor}=current;
  const seat=textureFrame(THREE,main,MAIN.altar,512,800,14.5,5.6);
  seat.position.set(cx,3.35,zSeat-1.8);
  seat.renderOrder=1;dugG.add(seat);
  const rail=textureFrame(THREE,minor,MINOR.stoneRail,512,512,15.8,1.35);
  rail.position.set(cx,.76,zSeat+1.6);rail.renderOrder=3;dugG.add(rail);
  for(const dx of [-5.2,5.2]){
   const b=textureFrame(THREE,minor,MINOR.smallBrazer,512,512,2.2,2.2);
   b.position.set(cx+dx,2.2,zSeat+.5);dugG.add(b);
  }
 }
 global.PMD_VOLCANO={build,buildBench};
})(window);