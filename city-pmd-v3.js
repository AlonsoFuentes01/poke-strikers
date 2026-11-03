/* Poké Strikers — Estadio Ciudad V3: recursos reales del montaje aprobado.
   Solo sustituye las gráficas. Juego, redes, HUD, porteros y colisiones intactos.
   Todas las piezas están en un atlas WebP y conservan proporción de píxel original.
*/
(function(global){
'use strict';
const original=global.PMD_CITY;
const packed=global.PMD_CITY_ART_ATLAS;
if(!original || !packed){console.warn('City PMD V3: falta el atlas o el escenario');return;}
const rects=packed.manifest.items,AW=packed.manifest.atlasWidth,AH=packed.manifest.atlasHeight;
function build(o){
 const {THREE,cityG,HX,HZ,GW,apron,pitchMat,SCENIC_TEXTURES}=o;
 const root=new THREE.Group();root.name='CIUDAD_PMD_V3_ASSETS_2D';cityG.add(root);
 const makeBasic=(map,alpha=true)=>new THREE.MeshBasicMaterial({
  map,transparent:alpha,alphaTest:alpha?.035:0,side:THREE.DoubleSide,
  depthWrite:!alpha,fog:false,toneMapped:false
 });
 function addPlane(id,width,x,y,z,depth=0){
  const [ax,ay,w,h]=rects[id],height=width*h/w;
  // Exact source ratio (never set an independent height).
  const g=new THREE.PlaneGeometry(width,height),uv=g.attributes.uv;
  const u0=ax/AW,u1=(ax+w)/AW,v0=1-(ay+h)/AH,v1=1-ay/AH;
  uv.setXY(0,u0,v1);uv.setXY(1,u1,v1);uv.setXY(2,u0,v0);uv.setXY(3,u1,v0);uv.needsUpdate=true;
  const mesh=new THREE.Mesh(g,makeBasic(atlasTexture));
  mesh.position.set(x,y,z);mesh.renderOrder=depth;root.add(mesh);
  return mesh;
 }
 let atlasTexture;
 new THREE.TextureLoader().load(packed.src,(tex)=>{
  if(!cityG.children.includes(root)){tex.dispose();return;}
  atlasTexture=tex;tex.encoding=THREE.sRGBEncoding;
  tex.magFilter=tex.minFilter=THREE.NearestFilter;tex.generateMipmaps=false;
  tex.needsUpdate=true;SCENIC_TEXTURES.push(tex);
  // Far background first: no skyscrapers or scenery from the removed constructor.
  addPlane('sky',110,0,6,-49,-20);
  addPlane('city',100,0,9,-42,-19);
  // One coherent town square, not separated floating boards.
  addPlane('tree_big',8,-37,7.2,-31,-16);
  addPlane('tree_big',8,37,7.2,-31,-16);
  addPlane('tree_small',6,-43,5.5,-29,-15);
  addPlane('tree_small',6,43,5.5,-29,-15);
  addPlane('stairs_left',11,-25,6.1,-29.5,-13);
  addPlane('stairs_right',11,25,6.1,-29.5,-13);
  addPlane('pokemon_center',25.5,0,6.1,-29,-12);
  // Market stalls on either side of the central doors. No lamps on top of shops.
  addPlane('stall_red',10,-16.7,5.0,-25.6,-9);
  addPlane('stall_yellow',10,16.7,5.0,-25.6,-9);
  // Seat ledges in front of shops; real animated PMD crowd loaded separately.
  addPlane('stands_left',20,-34.3,3.35,-25.1,-8);
  addPlane('stands_right',20,34.3,3.35,-25.1,-8);
  addPlane('stands_center',17,0,2.7,-25.1,-8);
  // Flower rows and gates connect terraces to the playing field.
  for(const xx of [-37,-25,-11,11,25,37]){
    addPlane(xx<0?'flowers_pink':'flowers_yellow',5.0,xx,.75,-20.1,-6);
  }
  addPlane('lamp_large',3.3,-34,5,-23.4,-7);
  addPlane('lamp_large',3.3,34,5,-23.4,-7);
  addPlane('banners',8.8,-44,7,-30,-11);
  addPlane('banners',8.8,44,7,-30,-11);
  // Goal images reflect the V3 reference; gameplay goal volumes remain logical.
  addPlane('goal_left',5.0,-HX-.45,2.75,0,2);
  addPlane('goal_right',5.0,HX+.45,2.75,0,2);
  // Near wall sits outside the field and never blocks the active players.
  addPlane('front_wall',79,0,-3.2,HZ+12,4);
  for(const x of [-32,-15,15,32])
    addPlane('flower_bushes',6,x,-.5,HZ+9.4,5);
  // Ground and pitch use the original 1:1 stone tile, repeating at native ratio.
  const [tx,ty,tw,th]=rects.stone_tiles;
  const canvas=document.createElement('canvas');canvas.width=1024;canvas.height=614;
  const q=canvas.getContext('2d');q.imageSmoothingEnabled=false;
  function tiles(c,qq,w,h){
   qq.fillStyle='#927b96';qq.fillRect(0,0,w,h);
   const sx=175,sy=Math.round(sx*th/tw);
   for(let yy=0;yy<h;yy+=sy)for(let xx=0;xx<w;xx+=sx){
    qq.drawImage(tex.image,tx,ty,tw,th,xx,yy,sx,sy);
   }
  }
  tiles(canvas,q,1024,614);
  // New crisp field markings matched to the preserved 60 × 36 physics.
  q.strokeStyle='#fff6ea';q.lineWidth=6;q.lineCap='square';
  q.strokeRect(9,9,1006,596);
  q.beginPath();q.moveTo(512,9);q.lineTo(512,605);q.stroke();
  q.strokeRect(9,168,177,278);q.strokeRect(838,168,177,278);
  q.strokeRect(9,236,67,142);q.strokeRect(948,236,67,142);
  q.beginPath();q.arc(512,307,85,0,Math.PI*2);q.stroke();
  q.fillStyle='#fff6ea';q.fillRect(507,302,10,10);
  const ct=new THREE.CanvasTexture(canvas);ct.encoding=THREE.sRGBEncoding;
  ct.magFilter=ct.minFilter=THREE.NearestFilter;ct.generateMipmaps=false;
  ct.userData.pmdOwned=true;SCENIC_TEXTURES.push(ct);
  pitchMat.map=ct;pitchMat.color.setHex(0xffffff);pitchMat.needsUpdate=true;
  // Beyond the painted touchlines, a continuous stone plaza covers the whole arena.
  const apronCanvas=document.createElement('canvas');apronCanvas.width=1024;apronCanvas.height=1024;
  const aq=apronCanvas.getContext('2d');aq.imageSmoothingEnabled=false;tiles(apronCanvas,aq,1024,1024);
  const stoneTex=new THREE.CanvasTexture(apronCanvas);
  stoneTex.encoding=THREE.sRGBEncoding;stoneTex.magFilter=stoneTex.minFilter=THREE.NearestFilter;
  stoneTex.generateMipmaps=false;stoneTex.wrapS=stoneTex.wrapT=THREE.RepeatWrapping;
  stoneTex.repeat.set(2,2);SCENIC_TEXTURES.push(stoneTex);
  apron.material.map=stoneTex;apron.material.color.setHex(0xffffff);
  apron.material.needsUpdate=true;apron.visible=true;
  const outside=new THREE.Mesh(new THREE.PlaneGeometry(160,130),makeBasic(stoneTex,false));
  outside.rotation.x=-Math.PI/2;outside.position.set(0,-1.85,0);
  outside.renderOrder=-30;root.add(outside);
 },undefined,(error)=>{console.error('No se pudo cargar atlas de Ciudad V3',error)});
 return root;
}
global.PMD_CITY={...original,build};
})(window);
