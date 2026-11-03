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

 // Segunda capa de profundidad: volumen de piedra real, encima de la ilustración.
 // Todo permanece al fondo o fuera de cancha, evitando interferir con las jugadas.
 const stoneMain=new THREE.MeshStandardMaterial({color:0x473745,roughness:1,flatShading:true});
 const stoneFace=new THREE.MeshStandardMaterial({color:0x6e5866,roughness:1,flatShading:true});
 const stoneDark=new THREE.MeshStandardMaterial({color:0x241d2c,roughness:1,flatShading:true});
 const stoneTop=new THREE.MeshStandardMaterial({color:0x99808a,roughness:.92,flatShading:true});
 const emberMat=new THREE.MeshBasicMaterial({color:0xff843b});
 const emberBright=new THREE.MeshBasicMaterial({color:0xffca72});
 const trimMat=new THREE.MeshStandardMaterial({color:0x986a54,roughness:.7,flatShading:true});
 const animateParts=[];
 function block(w,h,d,x,y,z,mat=stoneMain,bevel=0){
  const obj=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);
  obj.position.set(x,y,z);group.add(obj);return obj;
 }
 function spire(x,z,scale=1){
  block(4.5*scale,9*scale,4.5*scale,x,4.5*scale,z,stoneDark);
  block(3.8*scale,8.5*scale,3.8*scale,x,5.25*scale,z,stoneMain);
  block(5.3*scale,1.1*scale,5.3*scale,x,9.8*scale,z,stoneFace);
  block(3.65*scale,1.0*scale,3.65*scale,x,10.8*scale,z,stoneTop);
  const crown=new THREE.Mesh(new THREE.ConeGeometry(2.9*scale,3.8*scale,4),stoneDark);
  crown.rotation.y=Math.PI/4;crown.position.set(x,13*scale,z);group.add(crown);
  // Lamas luminosas verticales con sombras en los bordes.
  block(.58*scale,4.0*scale,.13*scale,x-1.0*scale,5.4*scale,z+2.28*scale,emberMat);
  block(.58*scale,2.8*scale,.13*scale,x+1.0*scale,5.0*scale,z+2.28*scale,emberBright);
  for(let yy=1;yy<9;yy+=2.3)block(4.7*scale,.18*scale,4.7*scale,x,yy*scale,z,stoneFace);
 }
 // Dos torres escalonadas que se recortan delante de la fachada.
 spire(-22,-33,.92);spire(22,-33,.92);
 spire(-39,-40,.67);spire(39,-40,.67);
 // Bastiones laterales más cercanos a la cámara, de piedra fracturada.
 for(const side of [-1,1]){
  const xx=side*32;
  block(9,6.8,6.8,xx,3.4,-32,stoneDark);
  block(8,6.0,6.0,xx,3.75,-31.3,stoneMain);
  block(8.6,.95,6.6,xx,7.25,-31.3,stoneTop);
  for(let i=0;i<4;i++){
   block(1.7,1.6,1.9,xx-3.2+i*2.13,8.4,-31.2,stoneFace);
  }
  // Vetas laterales de magma, con una segunda capa incandescente.
  block(.25,3.9,.15,xx-side*1.35,3.7,-28.18,emberMat);
  block(.13,2.3,.16,xx-side*.97,3.1,-28.09,emberBright);
  // Rocas toscas delante de los parapetos: irregularidad real.
  for(let k=0;k<7;k++){
   const rock=new THREE.Mesh(new THREE.DodecahedronGeometry(.85+rnd()*.85,0),
    k%3===0?stoneFace:k%3===1?stoneMain:stoneDark);
   rock.position.set(xx+side*(1+rnd()*4),.7+rnd()*.48,-27.8+rnd()*2.5);
   rock.rotation.set(rnd()*2,rnd()*3,rnd());rock.scale.set(1.4,.8+rnd()*.8,.95);
   group.add(rock);
  }
 }
 // Puerta tallada: un túnel oscuro real en cuatro profundidades.
 // Se mantiene en z=-35, por donde pasan los sprites de la entrada.
 block(15.1,1.2,3.8,0,13.7,-35.0,stoneDark);
 block(13.6,1.1,4.1,0,14.3,-34.7,stoneTop);
 for(const side of [-1,1]){
  const x=side*8.8;
  block(2.2,12.4,4.8,x,6.2,-35.0,stoneDark);
  block(1.65,11.7,5.2,x-side*.16,6.5,-34.6,stoneFace);
  for(let j=0;j<5;j++)block(2.7,.30,5.4,x,2.0+j*2.5,-34.5,stoneTop);
  // Pilastras más profundas y pequeñas ventanas con resplandor.
  block(1.4,8.5,1.6,side*12.5,5,-32.8,stoneDark);
  block(.47,3.7,.16,side*12.5,6,-31.93,emberMat);
 }
 // Bóveda del arco mediante dovelas poligonales.
 for(let i=0;i<9;i++){
  const angle=Math.PI*(i/8);
  const x=Math.cos(angle)*8.0,y=10.25+Math.sin(angle)*4.2;
  const stone=block(2.25,2.2,4.5,x,y,-34.75,i%2?stoneFace:stoneMain);
  stone.rotation.z=angle-Math.PI/2;
 }
 // Escalera tridimensional hacia la salida: nueve peldaños reales.
 // La primera huella está en z=-26.4, fuera del terreno que arranca z=-18.
 for(let i=0;i<9;i++){
  const zz=-26.4-i*.86,wide=9.4-i*.36,h=.25+i*.23;
  block(wide,h,1.02,0,h*.5,zz,stoneDark);
  block(wide,.15,1.04,0,h+.06,zz,stoneFace);
  block(wide*.92,.045,.24,0,h+.16,zz+.39,stoneTop);
 }
 // Paredes en terrazas para una sensación de recinto cerrado y no una lámina plana.
 for(const side of [-1,1]){
  for(let k=0;k<5;k++){
   const x=side*(28+k*3.15),z=-31-k*.6;
   block(3.1,3.8+k*.48,4.2,x,2.0+k*.24,z,stoneMain);
   block(3.3,.42,4.4,x,4.1+k*.48,z,stoneTop);
  }
 }
 // Letrero flotante del escudo, con piezas que sobresalen de la mampostería.
 const disk=new THREE.Mesh(new THREE.CylinderGeometry(3.15,3.15,.55,24),
  new THREE.MeshStandardMaterial({color:0x312330,metalness:.18,roughness:.6}));
 disk.rotation.x=Math.PI/2;disk.position.set(0,15.7,-31.9);group.add(disk);
 const diskRing=new THREE.Mesh(new THREE.TorusGeometry(2.72,.27,6,30),
  new THREE.MeshBasicMaterial({color:0xe99552}));
 diskRing.position.set(0,15.7,-31.52);group.add(diskRing);
 block(4.5,.25,.25,0,15.7,-31.45,trimMat);
 const centerDisc=new THREE.Mesh(new THREE.CircleGeometry(.65,20),emberBright);
 centerDisc.position.set(0,15.7,-31.21);group.add(centerDisc);
 // Estandartes separados en el espacio con forma de tela, relieve y oscilación.
 const banner=canvas(96,172,q=>{
  poly(q,[[10,8],[86,8],[86,130],[48,166],[10,130]],'#201925');
  poly(q,[[17,14],[79,14],[79,126],[48,154],[17,126]],'#b34e49');
  fill(q,22,20,53,6,'#e7a470');fill(q,28,36,40,5,'#e07a5c');
  q.fillStyle='#f6c68e';q.beginPath();q.arc(48,91,19,0,7);q.fill();
  q.fillStyle='#a44a45';q.beginPath();q.arc(48,91,13,0,7);q.fill();
  fill(q,30,88,36,6,'#f6c68e');q.fillStyle='#f6c68e';q.beginPath();q.arc(48,91,6,0,7);q.fill();
 });
 for(const side of [-1,1]){
  const flag=plane(banner,3.25,6.15,side*15.0,7.8,-29.2);
  flag.material.depthTest=true;flag.renderOrder=4;
  block(3.8,.21,.37,side*15.0,11.1,-29.1,trimMat);
  animateParts.push({flag,phase:rnd()*7});
 }
 // Chispas y ceniza subiendo desde las brechas (pocas: móvil primero).
 const sparkCanvas=canvas(24,24,q=>{
  fill(q,9,6,6,12,'#fca252');fill(q,11,3,3,16,'#ffedaa');
 });
 const sparkTexture=tex(sparkCanvas);
 const sparks=[];
 for(let i=0;i<15;i++){
  const m=new THREE.Sprite(new THREE.SpriteMaterial({map:sparkTexture,transparent:true,opacity:.84,depthWrite:false}));
  m.scale.set(.22+rnd()*.23,.35+rnd()*.34,1);m.renderOrder=5;group.add(m);
  sparks.push({m,x:(rnd()-.5)*86,z:-27-rnd()*20,base:.8+rnd()*2,phase:rnd()*12,speed:.30+rnd()*.70});
 }


 // Escenografía de profundidad: flancos en la distancia y cornisa de primer plano.
 // La cornisa se retira durante el giro a cenital para no tapar la cancha.
 const foregroundG=new THREE.Group();foregroundG.name='VOLCAN_FOREGROUND_CINEMATIC';group.add(foregroundG);
 const foregroundParts=[],smokeParts=[],extraLava=[];
 function propBlock(w,h,d,x,y,z,mat=stoneMain,target=group){
  const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);m.position.set(x,y,z);target.add(m);return m;
 }
 function cluster(x,z,n,spread=5,size=1,target=group){
  for(let i=0;i<n;i++){
   const radius=(.65+rnd()*1.15)*size;
   const m=new THREE.Mesh(new THREE.DodecahedronGeometry(radius,0),
    i%3===0?stoneFace:i%3===1?stoneMain:stoneDark);
   m.position.set(x+(rnd()-.5)*spread,radius*.52,z+(rnd()-.5)*spread*.7);
   m.rotation.set(rnd()*2,rnd()*2,rnd());
   m.scale.set(.9+rnd()*.7,.65+rnd()*.65,.8+rnd()*.5);target.add(m);
  }
 }
 const fallTexture=tex(canvas(96,256,q=>{
  fill(q,0,0,96,256,'#301b2d');fill(q,7,0,82,256,'#8d3032');
  for(let i=0;i<11;i++){
   const x=11+i*7;
   fill(q,x,(i%4)*9,4,256-(i%4)*9,i%3===0?C.hot:C.lava);
   if(i%2===0)fill(q,x+1,28,2,215,C.bright);
  }
  fill(q,0,0,96,9,C.edge);fill(q,0,247,96,9,'#d64738');
 }));
 function lavaFall(x,y,z,w,h,target=group){
  const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),
   new THREE.MeshBasicMaterial({map:fallTexture,transparent:true,side:THREE.DoubleSide,depthWrite:false,fog:false}));
  m.position.set(x,y,z);target.add(m);
  extraLava.push({m,phase:rnd()*6});
  return m;
 }
 const smokeTexture=tex(canvas(96,96,q=>{
  for(const [x,y,radius,color] of [[31,53,23,'rgba(111,90,107,.35)'],[54,39,26,'rgba(157,115,117,.24)'],[62,63,21,'rgba(79,67,88,.34)']]){
   q.fillStyle=color;q.beginPath();q.arc(x,y,radius,0,7);q.fill();
  }
 }));
 function smoke(x,y,z,s,target=group){
  const m=new THREE.Sprite(new THREE.SpriteMaterial({
   map:smokeTexture,transparent:true,opacity:.32,depthWrite:false,depthTest:true}));
  m.position.set(x,y,z);m.scale.set(s,s,1);target.add(m);
  smokeParts.push({m,x,y,s,phase:rnd()*7,speed:.35+rnd()*.55});
 }
 // Costados de obsidiana: grandes siluetas, torres fracturadas y caídas de lava.
 for(const side of [-1,1]){
  const sx=side*50;
  propBlock(13,14,10,sx,7,-39,stoneDark);
  propBlock(11,12.7,9,sx-side*.65,8,-38.2,stoneMain);
  propBlock(13.5,1.05,10.5,sx,14.5,-38.1,stoneTop);
  propBlock(9,10.5,7.5,sx-side*5.8,5.8,-46,stoneDark);
  propBlock(7.8,9,7,sx-side*5.6,6.5,-45.8,stoneMain);
  for(let i=0;i<5;i++){
   const xx=sx-side*(5+i*2.6);
   propBlock(3.6,.85,4.6,xx,2.3+i*.73,-31.9-i*.72,stoneFace);
  }
  propBlock(3.3,8.2,3.4,sx-side*8,4.1,-34,stoneDark);
  propBlock(2.7,7.2,2.8,sx-side*8,4.6,-33.6,stoneFace);
  const cap=new THREE.Mesh(new THREE.ConeGeometry(2.05,3.2,5),stoneDark);
  cap.position.set(sx-side*8,9.5,-33.6);cap.rotation.z=side*.21;group.add(cap);
  lavaFall(sx-side*1.9,7.3,-33.5,2.5,11.8);
  lavaFall(sx-side*6.5,6.0,-43.8,1.65,8.8);
  propBlock(.3,4.2,.16,sx-side*4.2,4.7,-32.9,emberMat);
  propBlock(.17,2.5,.17,sx-side*3.9,4.1,-32.8,emberBright);
  cluster(sx-side*3,-29.2,8,8,.95);
  cluster(sx-side*6,-36.2,7,6,.8);
  smoke(sx-side*2,12,-34,6.2);
  smoke(sx-side*6,10,-44,5.6);
 }
 // Cornisa cercana: únicamente cinematográfica. Se aleja al girar la cámara.
 propBlock(78,2.8,7,0,1.4,HZ+13,stoneDark,foregroundG);
 propBlock(76,.65,7.2,0,3.0,HZ+12.5,stoneTop,foregroundG);
 for(let i=0;i<9;i++){
  const xx=-33+i*8.25;
  propBlock(7.5,.75,4,xx,3.65,HZ+9.4+(i%2)*.55,stoneFace,foregroundG);
  propBlock(7.25,.16,.6,xx,4.12,HZ+7.7+(i%2)*.55,stoneTop,foregroundG);
 }
 // Grietas brillantes trazadas sobre la cornisa.
 for(const x of [-24,-13,0,13,24]){
  propBlock(3.1,.12,.42,x,4.18,HZ+11,emberMat,foregroundG);
  propBlock(1.3,.15,.19,x+.5,4.27,HZ+11.1,emberBright,foregroundG);
 }
 for(const side of [-1,1]){
  const x=side*40;
  propBlock(4.3,9.2,4.2,x,4.6,HZ+8,stoneDark,foregroundG);
  propBlock(3.6,8.0,3.5,x,5.0,HZ+8.2,stoneMain,foregroundG);
  propBlock(5.2,.88,5,x,9.6,HZ+8,stoneTop,foregroundG);
  cluster(side*28,HZ+9.2,9,10,1.35,foregroundG);
  smoke(side*25,8,HZ+9,5.4,foregroundG);
 }
 cluster(0,HZ+10.2,7,14,1.2,foregroundG);
 // Braseros sobre la balaustrada, animados y con iluminación puntual moderada.
 for(const x of [-26,-9,9,26]){
  propBlock(2.1,2.6,2.1,x,5.0,HZ+7.0,stoneDark,foregroundG);
  propBlock(3.2,.7,2.9,x,6.5,HZ+7.0,stoneTop,foregroundG);
  const flameMesh=new THREE.Mesh(new THREE.PlaneGeometry(2.45,3.7),
   new THREE.MeshBasicMaterial({map:tex(flame),transparent:true,side:THREE.DoubleSide,depthWrite:false}));
  flameMesh.position.set(x,8.2,HZ+7);foregroundG.add(flameMesh);
  const glow=new THREE.PointLight(0xff873b,.28,9);glow.position.set(x,7.1,HZ+7);
  foregroundG.add(glow);foregroundParts.push({flameMesh,glow,phase:rnd()*6});
 }

 // Detallado de ruinas: grabados, sillares, nichos, estatuas y lava sobre la arquitectura.
 // Una lámina pixel-art transparente aporta el microdetalle que los prismas no tienen.
 const relief=canvas(1536,720,q=>{
  const crack=(x,y,len,phase=0,glow=false)=>{
   q.lineJoin='miter';q.lineCap='square';
   const pts=[[x,y]];let px=x,py=y;
   for(let j=0;j<5;j++){px+=Math.sin(phase+j*1.9)*len*.12;py+=len*(.12+.045*(j%2));pts.push([px,py]);}
   q.beginPath();q.moveTo(pts[0][0],pts[0][1]);
   for(let j=1;j<pts.length;j++)q.lineTo(pts[j][0],pts[j][1]);
   q.strokeStyle=glow?'rgba(252,116,47,.88)':'rgba(23,16,29,.95)';
   q.lineWidth=glow?4:6;q.stroke();
   if(glow){q.strokeStyle='rgba(255,211,111,.86)';q.lineWidth=1.6;q.stroke();}
  };
  // Fachada lateral detallada hasta los extremos del encuadre.
  for(const left of [true,false]){
   const x0=left?0:1085,x1=left?451:1536;
   for(let row=0;row<13;row++){
    const y=264+row*31;
    fill(q,x0,y,x1-x0,4,'rgba(19,15,27,.75)');
    fill(q,x0,y+5,x1-x0,2,'rgba(167,118,127,.48)');
    const offset=row%2?43:0;
    for(let x=x0-18+offset;x<x1;x+=88){
     fill(q,x,y+7,4,25,'rgba(19,13,23,.75)');
     fill(q,x+5,y+10,25,3,'rgba(173,134,145,.25)');
     if((row+Math.floor(x/88))%4===0){
      fill(q,x+28,y+16,11,4,'rgba(208,160,128,.26)');
      fill(q,x+51,y+24,3,3,'rgba(22,15,27,.8)');
     }
    }
   }
   // Focos de antorcha y nichos arqueados.
   for(let i=0;i<3;i++){
    const cx=left?85+i*120:1451-i*120,yy=350+(i%2)*76;
    fill(q,cx-31,yy-65,62,99,'#231b2c');
    poly(q,[[cx-31,yy-65],[cx,yy-98],[cx+31,yy-65]],'#231b2c');
    fill(q,cx-22,yy-58,44,82,'#533a43');
    poly(q,[[cx-22,yy-58],[cx,yy-80],[cx+22,yy-58]],'#533a43');
    fill(q,cx-15,yy-26,30,46,'#211924');
    fill(q,cx-7,yy-18,14,29,'#c2553d');
    fill(q,cx-2,yy-22,5,26,'#ffd288');
    fill(q,cx-35,yy+24,70,10,'#8b6f77');
    fill(q,cx-39,yy+32,78,5,'#2b2032');
   }
   // Ornamentos metalicos antiguos: anillos y trazos.
   for(let j=0;j<4;j++){
    const x=left?51+j*99:1485-j*99,y=573-(j%2)*30;
    q.strokeStyle='rgba(221,160,103,.75)';q.lineWidth=5;
    q.beginPath();q.arc(x,y,15,0,Math.PI*2);q.stroke();
    fill(q,x-17,y-3,34,6,'rgba(218,145,78,.6)');
    fill(q,x-4,y-20,8,38,'rgba(26,18,31,.62)');
   }
   for(let i=0;i<15;i++){
    const x=left?25+rnd()*400:1110+rnd()*400,y=270+rnd()*360;
    crack(x,y,24+rnd()*76,i*.9,i%5===0);
   }
  }
  // Junta tallada y pequeños símbolos alrededor del portón sin cubrir su hueco.
  for(const side of [-1,1]){
   const base=768+side*215;
   for(let row=0;row<11;row++){
    const y=265+row*29;
    fill(q,base-27,y,54,4,'rgba(27,19,29,.8)');
    fill(q,base-24,y+5,48,2,'rgba(194,145,132,.58)');
    fill(q,base-22+(row%2)*21,y+6,3,20,'rgba(29,20,31,.65)');
   }
   for(let i=0;i<4;i++){
    const x=768+side*(165+i*30);
    fill(q,x-8,202,16,40,'#281e2b');
    fill(q,x-6,206,12,32,i%2?'#c07d53':'#9b6658');
    fill(q,x-3,208,6,15,'#f2b978');
   }
  }
  // Parte alta: paneles ceremoniales triangulares entre torres.
  for(const side of [-1,1]){
   const x=768+side*330;
   poly(q,[[x-80,247],[x,188],[x+80,247]],'#241c2b');
   poly(q,[[x-65,242],[x,202],[x+65,242]],'#665161');
   poly(q,[[x-43,236],[x,214],[x+43,236]],'#a36b56');
   fill(q,x-41,239,82,7,'#231927');
  }
 });
 const reliefMesh=new THREE.Mesh(new THREE.PlaneGeometry(102,47.8),
  new THREE.MeshBasicMaterial({map:tex(relief),transparent:true,alphaTest:.035,
   depthWrite:false,side:THREE.DoubleSide,fog:false,toneMapped:false}));
 reliefMesh.position.set(0,4.0,-38.0);
 // Detalle fino sobre la lámina, sin falsos volúmenes en el área del portón.
 reliefMesh.renderOrder=1;group.add(reliefMesh);
 // Bloques de piedra con azulejos grabados, hendiduras y bordes iluminados.
 const engraved=tex(canvas(192,256,q=>{
  fill(q,0,0,192,256,'#443440');
  for(let row=0;row<11;row++){
   const yy=row*24;
   fill(q,0,yy,192,4,'#261d2d');fill(q,0,yy+4,192,2,'#866c79');
   for(let xx=(row%2)*37-50;xx<192;xx+=73){
    fill(q,xx,yy+6,4,18,'#2a2030');
    fill(q,xx+7,yy+10,21,2,'#826775');
    fill(q,xx+47,yy+17,8,3,'#302431');
   }
  }
  for(let i=0;i<18;i++){
   const x=rnd()*192,y=rnd()*256;
   fill(q,x,y,4+rnd()*11,2,i%3?'#80616e':'#a98781');
  }
  // Largas fracturas con magma entre sillares.
  for(let i=0;i<4;i++){
   const x=13+i*53;fill(q,x,43+i*45,3,48,'#2b1b2d');
   fill(q,x+2,53+i*45,2,28,i%2?'#f47c42':'#e19c5a');
  }
 }));
 const carvedMat=new THREE.MeshStandardMaterial({map:engraved,roughness:1,flatShading:true});
 // Revestir pilares importantes con piedra pixelada, sin crear cuerpos duplicados.
 for(const side of [-1,1]){
  const sx=side*50;
  propBlock(10.8,12.3,.19,sx-side*.65,8,-33.55,carvedMat);
  propBlock(4.6,9.1,.16,side*40,4.95,-29.45,carvedMat);
  // Hornacinas, contrafuertes y balcones recortan la silueta de los costados.
  for(let j=0;j<4;j++){
   const xx=sx-side*(1.5+j*2.55),z=-32.4-j*.38;
   propBlock(1.0,5.6+j*.4,1.2,xx,7.1,z,stoneDark);
   propBlock(1.3,.53,1.55,xx,10+j*.24,z,stoneTop);
   propBlock(.3,3.3,.15,xx,6.3,z+.84,emberMat);
  }
 }
 // Estatuas guardianas basadas en siluetas talladas, no en personajes Pokemon.
 const guardianTex=tex(canvas(160,228,q=>{
  poly(q,[[17,224],[13,197],[35,185],[44,111],[31,96],[43,52],[58,38],[53,12],[77,30],
   [99,12],[111,46],[130,59],[124,95],[139,128],[124,184],[146,215]],'#221c2b');
  poly(q,[[29,214],[40,191],[54,170],[58,101],[48,77],[61,51],[78,43],[92,55],
   [111,47],[119,88],[108,124],[117,171],[130,211]],'#554252');
  poly(q,[[57,80],[65,60],[78,64],[89,59],[104,80],[98,95],[62,97]],'#89717c');
  poly(q,[[44,115],[29,90],[28,126],[52,158]],'#726071');
  poly(q,[[115,115],[133,90],[135,126],[111,158]],'#302537');
  fill(q,60,99,15,5,'#ff9b4c');fill(q,89,99,13,5,'#ff9b4c');
  fill(q,64,100,7,3,'#ffe2a1');fill(q,91,100,7,3,'#ffe2a1');
  poly(q,[[64,146],[82,134],[102,146],[85,159]],'#ae7965');
  for(let k=0;k<9;k++)fill(q,46+k*8,182+(k%3)*5,5,3,k%2?'#9d7e82':'#251a2b');
  fill(q,10,219,140,9,'#251c2c');fill(q,17,216,126,4,'#a18180');
 }));
 for(const side of [-1,1]){
  const statue=new THREE.Mesh(new THREE.PlaneGeometry(8.1,11.6),
   new THREE.MeshBasicMaterial({map:guardianTex,transparent:true,alphaTest:.08,side:THREE.DoubleSide,depthWrite:false}));
  statue.position.set(side*43,7.3,-28.6);group.add(statue);
  propBlock(9.0,1.8,5.6,side*43,.9,-28.8,stoneDark);
  propBlock(8.7,.35,5.7,side*43,2,-28.8,stoneTop);
  // Secciones de cadena suspendida alrededor del pedestal.
  for(let k=0;k<5;k++){
   const chain=new THREE.Mesh(new THREE.TorusGeometry(.43,.11,5,8),trimMat);
   chain.rotation.y=Math.PI/2;chain.position.set(side*(39.6+k*1.72),4.9-Math.sin(k*Math.PI/4)*1.5,-25.65);
   group.add(chain);
  }
 }
 // Bloques ornamentales de foreground: musgo de ceniza, grietas y runas.
 const rimTexture=tex(canvas(768,128,q=>{
  fill(q,0,0,768,128,'#443440');
  for(let row=0;row<5;row++){
   const y=row*26;
   fill(q,0,y,768,5,'#211827');fill(q,0,y+5,768,2,'#947b82');
   for(let x=((row%2)*39)-50;x<768;x+=79){
    fill(q,x,y+7,4,18,'#211a28');
    fill(q,x+12,y+12,23,3,'#826878');
   }
  }
  for(let i=0;i<34;i++){
   let x=12+i*23+Math.sin(i*4)*7;
   fill(q,x,68+(i%5)*7,3,23,'#261d2d');
   if(i%3===0){fill(q,x+1,78+(i%5)*7,2,9,C.lava);fill(q,x+1,80+(i%5)*7,1,5,C.hot);}
  }
  for(let i=0;i<24;i++){
   const x=rnd()*768,y=rnd()*128;
   fill(q,x,y,3+rnd()*8,2,i%3===0?'#c18d75':'#2c2332');
  }
 }));
 const rimSlab=new THREE.Mesh(new THREE.PlaneGeometry(75.5,4.0),
  new THREE.MeshBasicMaterial({map:rimTexture,transparent:false,side:THREE.DoubleSide}));
 rimSlab.position.set(0,5.4,HZ+7.0);foregroundG.add(rimSlab);
 // Balconies y escaleras ocultas, en franjas de ambos lados para que no haya huecos.
 for(const side of [-1,1]){
  for(let k=0;k<6;k++){
   const x=side*(26+k*5.2),z=-25-k*.55;
   propBlock(4.8,1.1,3.8,x,.8+k*.45,z,stoneDark);
   propBlock(4.4,.23,3.6,x,1.45+k*.45,z,stoneTop);
   if(k%2===0){
    const g=new THREE.Mesh(new THREE.DodecahedronGeometry(1.05,0),stoneFace);
    g.position.set(x,.9+k*.45,z+.4);g.rotation.y=k*.7;group.add(g);
   }
  }
 }
 // Distancia: partículas en capas, no un volumen denso.
 const ashTexture=tex(canvas(32,32,q=>{
  fill(q,12,8,8,9,'#99828f');fill(q,16,12,6,4,'#dcb2a0');fill(q,9,17,9,5,'#594759');
 }));
 const ash=[];
 for(let i=0;i<28;i++){
  const m=new THREE.Sprite(new THREE.SpriteMaterial({map:ashTexture,transparent:true,opacity:.33,depthWrite:false}));
  m.scale.set(.28+rnd()*.4,.22+rnd()*.3,1);
  group.add(m);
  ash.push({m,x:(rnd()-.5)*118,y:2+rnd()*16,z:-25-rnd()*38,phase:rnd()*10,speed:.2+rnd()*.65});
 }

 group.userData.pmdSetIntro=mix=>{
  // Objetos bajos y cercanos desaparecen cuando la cámara termina de subir.
  const k=Math.max(0,Math.min(1,(mix-.45)/.35));
  foregroundG.visible=k<.95;
  foregroundG.position.y=-k*17;
 };

 group.userData.pmdTick=(dt,t)=>{
  for(const a of ash){
   const p=(t*.00015*a.speed+a.phase)%1;
   a.m.position.set(a.x+Math.sin(t*.0005+a.phase)*1.4,a.y+p*8,a.z);
   a.m.material.opacity=.3*Math.sin(Math.PI*p);
  }
  for(const item of animateParts)if(item.flag)item.flag.rotation.y=Math.sin(t*.0015+item.phase)*.07;
  for(const item of foregroundParts){
   const w=Math.sin(t*.009+item.phase),h=Math.sin(t*.012+item.phase);
   item.flameMesh.scale.set(1+w*.06,1+h*.10,1);
   item.glow.intensity=.21+.13*(.5+.5*w);
  }
  for(const s of smokeParts){
   const p=(t*.00025*s.speed+s.phase)%1;
   s.m.position.set(s.x+Math.sin(t*.00045+s.phase)*.85,s.y+p*2.2,s.m.position.z);
   s.m.material.opacity=.22*(1-p);
   s.m.scale.set(s.s*(1+p*.27),s.s*(1+p*.25),1);
  }
  for(const l of extraLava){
   const pulse=.86+.14*Math.sin(t*.003+l.phase);
   l.m.material.color.setRGB(1,pulse,.88+.12*pulse);
  }
  for(const s of sparks){
   const p=(t*.001*s.speed+s.phase)%5;
   s.m.position.set(s.x+Math.sin(t*.0018+s.phase)*.65,s.base+p*1.6,s.z);
   s.m.material.opacity=.72*Math.min(1,p*2)*Math.min(1,(5-p)*1.3);
  }
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
