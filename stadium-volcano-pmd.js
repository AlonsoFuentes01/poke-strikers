/* Poké Strikers — Estadio Volcán, fase 1: escenografía cinematográfica.
   Solo arte y ambientación, sin cambios de colisiones ni jugabilidad. */
(function(global){
'use strict';
function build(o){
 const {THREE,cityG,HX,HZ,SCENIC_TEXTURES}=o;
 const group=new THREE.Group();group.name='ESTADIO_VOLCAN_FASE_1';cityG.add(group);
 let seed=1337;const rnd=()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483647};
 const C={sky:'#37243c',sky2:'#c06560',ash:'#251d2d',cliff:'#3a2d3e',
  rock:'#423847',edge:'#766174',highlight:'#98808a',lava:'#ef5930',hot:'#ffb244',
  bright:'#ffe0a0',ink:'#211b2a',banner:'#ae514b',gold:'#f9be73',smoke:'#92747c'};
 const canvas=(w,h,fn)=>{const c=document.createElement('canvas');c.width=w;c.height=h;const q=c.getContext('2d');q.imageSmoothingEnabled=false;fn(q,w,h);return c;};
 const fill=(q,x,y,w,h,color)=>{q.fillStyle=color;q.fillRect(Math.round(x),Math.round(y),Math.ceil(w),Math.ceil(h));};
 const poly=(q,points,color)=>{q.fillStyle=color;q.beginPath();q.moveTo(points[0][0],points[0][1]);for(let i=1;i<points.length;i++)q.lineTo(points[i][0],points[i][1]);q.closePath();q.fill();};
 const tex=c=>{const t=new THREE.CanvasTexture(c);t.encoding=THREE.sRGBEncoding;t.magFilter=THREE.NearestFilter;t.minFilter=THREE.NearestFilter;t.generateMipmaps=false;SCENIC_TEXTURES.push(t);return t;};
 function plane(c,w,h,x,y,z){const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),
  new THREE.MeshBasicMaterial({map:tex(c),transparent:true,alphaTest:.015,side:THREE.DoubleSide,depthWrite:false,toneMapped:false,fog:false}));
  m.position.set(x,y,z);group.add(m);return m;}
 const backdrop=canvas(1536,740,(q)=>{
  const grad=q.createLinearGradient(0,0,0,740);
  grad.addColorStop(0,C.ash);grad.addColorStop(.43,C.sky);grad.addColorStop(.78,C.sky2);grad.addColorStop(1,'#df8c63');
  q.fillStyle=grad;q.fillRect(0,0,1536,740);
  // Ceniza, estrellas calientes y nubes volcánicas.
  for(let i=0;i<170;i++){
   const x=rnd()*1536,y=rnd()*360;
   fill(q,x,y,2+rnd()*8,2+rnd()*5,i%4===0?'#dc8971':'#5c3c51');
  }
  for(let i=0;i<16;i++){
   const x=rnd()*1536,y=80+rnd()*170,w=120+rnd()*190;
   fill(q,x,y,w,14+rnd()*12,i%2?'#4c3548':'#573b50');
   fill(q,x+26,y-11,w*.65,13,'#493246');
  }
  // Silueta distante de crestas montañosas.
  poly(q,[[0,590],[0,385],[80,350],[154,402],[250,311],[336,410],[441,365],[510,444],[626,338],[780,420],[927,316],[1050,410],[1182,329],[1346,417],[1485,328],[1536,360],[1536,590]],'#332b3d');
  poly(q,[[490,540],[560,418],[655,362],[698,264],[743,240],[786,281],[822,374],[926,442],[1005,540]],'#231d2e');
  poly(q,[[560,475],[673,340],[703,261],[744,250],[769,319],[824,401],[890,476]],'#594055');
  // Fulgor de la boca del volcán y ríos de lava.
  poly(q,[[685,274],[712,256],[742,248],[766,267],[746,277],[710,281]],C.hot);
  poly(q,[[702,269],[724,260],[744,255],[755,268],[743,272]],C.bright);
  const rivers=[[699,284,665,432,627,534],[762,282,793,391,829,530]];
  for(const [x0,y0,x1,y1,x2,y2] of rivers){
   q.strokeStyle='#832e35';q.lineWidth=29;q.beginPath();q.moveTo(x0,y0);q.lineTo(x1,y1);q.lineTo(x2,y2);q.stroke();
   q.strokeStyle=C.lava;q.lineWidth=15;q.stroke();
   q.strokeStyle=C.hot;q.lineWidth=5;q.stroke();
  }
  // Cascadas de lava al fondo, de dos alturas y con reflejos.
  for(const [x,y,w,h] of [[100,370,61,215],[1325,320,80,285],[378,430,38,156],[1105,420,43,173]]){
   fill(q,x-7,y,w+14,h+9,'#6e3243');fill(q,x,y,w,h,C.lava);
   for(let i=0;i<7;i++)fill(q,x+5+i*(w-8)/7,y+(i%3)*7,3,h-(i%4)*18,C.hot);
   fill(q,x-4,y+h,w+8,10,'#ffb05b');
  }
  // Roquedos inferiores escalonados.
  poly(q,[[0,740],[0,595],[90,555],[173,596],[285,517],[360,602],[506,550],[595,640],[722,553],[884,619],[1012,540],[1103,605],[1276,523],[1392,615],[1536,545],[1536,740]],C.cliff);
  for(let i=0;i<155;i++){const x=rnd()*1536,y=520+rnd()*220;
   fill(q,x,y,9+rnd()*26,2+rnd()*5,i%4?C.rock:C.highlight);}
 });
 plane(backdrop,126,60,0,3,-68);
 const façade=canvas(1536,610,(q)=>{
  // Laterales de piedra, gradas con pequeños brillos simulando público.
  for(const [x,w] of [[0,440],[1096,440]]){
   fill(q,x,255,w,355,C.ink);fill(q,x+10,266,w-20,328,C.rock);
   for(let row=0;row<6;row++){
    const y=290+row*48;
    fill(q,x+9,y,w-18,8,C.highlight);
    fill(q,x+11,y+36,w-22,10,'#271f33');
    for(let i=0;i<30;i++){
     const xx=x+24+(i*31+row*11)%(w-48);
     fill(q,xx,y+13,8,12,i%3===0?'#a7839a':i%3===1?'#ebae76':'#665b83');
     fill(q,xx+1,y+11,6,5,'#d9c2a6');
    }
   }
  }
  // Monumento central — templo fortaleza de obsidiana.
  fill(q,426,234,684,376,C.ink);
  fill(q,447,255,642,345,C.rock);
  for(let row=0;row<15;row++){
   const y=263+row*23;
   fill(q,450,y,636,4,'#241e2d');
   for(let x=459+(row%2)*26;x<1074;x+=70)fill(q,x,y+4,4,19,C.edge);
  }
  poly(q,[[420,247],[492,203],[579,203],[608,157],[694,157],[706,116],[832,116],[846,157],[931,157],[962,203],[1050,203],[1115,247]],C.ink);
  poly(q,[[443,240],[497,208],[586,208],[617,167],[701,167],[721,125],[817,125],[834,167],[920,167],[955,208],[1041,208],[1090,240]],C.highlight);
  fill(q,490,247,547,24,'#271f2d');
  // Gran puerta incandescente para la salida de los Pokémon.
  fill(q,624,316,288,294,C.ink);fill(q,646,337,245,273,'#160e22');
  poly(q,[[650,410],[660,367],[699,332],[838,332],[879,365],[890,410]],C.edge);
  const g=q.createLinearGradient(0,345,0,605);g.addColorStop(0,'#582a32');g.addColorStop(1,'#ff7633');
  q.fillStyle=g;q.fillRect(668,385,202,210);
  for(let i=0;i<12;i++)fill(q,674+i*17,514-(i%4)*10,9,76+(i%4)*10,i%2?C.lava:C.hot);
  fill(q,627,594,282,16,'#2b2131');
  // Emblema circular central de la arena.
  q.fillStyle=C.ink;q.beginPath();q.arc(768,241,71,0,7);q.fill();
  q.fillStyle=C.gold;q.beginPath();q.arc(768,241,54,0,7);q.fill();
  q.fillStyle=C.rock;q.beginPath();q.arc(768,241,41,0,7);q.fill();
  fill(q,728,236,80,12,C.gold);
  q.fillStyle=C.gold;q.beginPath();q.arc(768,241,16,0,7);q.fill();
  q.fillStyle=C.ink;q.beginPath();q.arc(768,241,8,0,7);q.fill();
  // Columnas y estandartes rojos.
  for(const x of [461,1036]){
   fill(q,x,246,31,364,C.ink);fill(q,x+5,248,22,348,C.highlight);
   fill(q,x-18,232,67,24,C.ink);fill(q,x-13,235,57,14,C.gold);
   fill(q,x-22,279,74,143,C.banner);
   poly(q,[[x-22,421],[x+15,469],[x+52,421]],C.banner);
   fill(q,x+4,306,5,71,C.gold);
   fill(q,x-7,341,45,7,C.gold);
  }
  // Escaleras hacia la puerta, siempre al norte de la cancha.
  for(let row=0;row<9;row++){
   const y=486+row*13;
   fill(q,601-row*5,y,335+row*10,11,row%2?C.rock:C.edge);
   fill(q,601-row*5,y,335+row*10,3,C.highlight);
  }
  // Braseros de lava a ambos lados de la entrada.
  for(const x of [538,975]){
   fill(q,x-23,481,47,86,C.ink);fill(q,x-18,482,36,70,C.rock);
   fill(q,x-30,465,60,19,C.highlight);
   poly(q,[[x-20,465],[x-13,432],[x,444],[x+3,410],[x+20,453],[x+22,465]],C.lava);
   poly(q,[[x-11,465],[x-5,441],[x+4,455],[x+9,432],[x+14,465]],C.hot);
  }
 });
 plane(façade,102,40,0,4,-39);
 // Una línea de lava fuera de banda, visible desde arriba sin tocar la física.
 const lavaFloor=canvas(512,64,q=>{
  fill(q,0,0,512,64,C.ink);fill(q,0,4,512,55,'#7c332f');
  for(let x=0;x<512;x+=17){
   const y=13+Math.round(rnd()*14),w=14+rnd()*16;
   fill(q,x,y,w,18,C.lava);fill(q,x+4,y+4,w*.55,5,C.hot);
  }
  fill(q,0,0,512,5,C.highlight);fill(q,0,56,512,8,C.ink);
 });
 const lavaM=new THREE.Mesh(new THREE.PlaneGeometry(73,4.8).rotateX(-Math.PI/2),
  new THREE.MeshBasicMaterial({map:tex(lavaFloor),transparent:true,depthWrite:false,side:THREE.DoubleSide}));
 lavaM.position.set(0,.032,HZ+6.0);group.add(lavaM);
 const lavaM2=lavaM.clone();lavaM2.position.z=-(HZ+6.8);group.add(lavaM2);
 const flame=canvas(64,110,q=>{
  poly(q,[[11,105],[3,85],[19,64],[17,48],[32,13],[47,49],[57,69],[49,106]],C.lava);
  poly(q,[[21,103],[17,81],[30,56],[30,40],[43,78],[42,103]],C.hot);
  poly(q,[[27,99],[26,81],[34,63],[39,92],[37,101]],C.bright);
 });
 const flames=[];
 for(const [x,z] of [[-38,-26],[38,-26],[-34,23],[34,23]]){
  const m=plane(flame,3.5,6.1,x,3.4,z);
  const glow=new THREE.PointLight(0xff7432,.45,13);glow.position.set(x,3,z);group.add(glow);
  flames.push({m,glow,phase:rnd()*6});
 }
 group.userData.pmdTick=(dt,t)=>{
  for(const f of flames){
   const w=Math.sin(t*.008+f.phase),h=Math.sin(t*.012+f.phase);
   f.m.scale.set(1+w*.06,1+h*.09,1);f.glow.intensity=.34+.16*(.5+.5*w);
  }
  // Sutil pulso de lava, casi gratuito para móviles.
  const k=.93+.07*Math.sin(t*.0023);
  lavaM.material.color.setRGB(1,k,k*.94);
 };
 return group;
}
global.PMD_VOLCANO={build};
})(window);
