/* Poké Strikers — Estadio Glaciar PMD
   Arte modular nuevo, dibujado a resolución pixel-art nativa.
   Comparte proyección/campo/cámara con Ciudad, pero NO recicla sus casas.
   El clima snow, cloudy, fog, clear lo controla el motor principal. */
(function(global){
'use strict';
function build(o){
 const {THREE,cityG,HX,HZ,GW,apron,pitchMat,SCENIC_TEXTURES}=o;
 const scene=new THREE.Group();scene.name='ESTADIO_GLACIAR_PMD';cityG.add(scene);
 let seed=271828;const rnd=()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646};
 const P={ink:'#314563',deep:'#465978',slate:'#617895',stone:'#93adc3',
  mid:'#b3cfdf',light:'#e6f7f7',white:'#fcfff4',ice:'#81d6eb',
  cyan:'#5fc5de',cyanDeep:'#438dad',blue:'#7198d1',sky:'#6c9cd2',
  skyLight:'#bfdcf0',gold:'#fce7b1',banner:'#5b8ec2',shadow:'#36495f',
  crack:'#6cb2d1',blush:'#b7c4e9'};
 const canvas=(w,h,draw)=>{const c=document.createElement('canvas');c.width=w;c.height=h;const q=c.getContext('2d');q.imageSmoothingEnabled=false;draw(q,w,h);return c;};
 const rect=(q,x,y,w,h,c)=>{q.fillStyle=c;q.fillRect(Math.round(x),Math.round(y),Math.ceil(w),Math.ceil(h));};
 const poly=(q,p,c)=>{q.fillStyle=c;q.beginPath();q.moveTo(p[0][0],p[0][1]);for(let i=1;i<p.length;i++)q.lineTo(p[i][0],p[i][1]);q.closePath();q.fill()};
 const circ=(q,x,y,r,c)=>{q.fillStyle=c;q.beginPath();q.arc(x,y,r,0,Math.PI*2);q.fill()};
 function mountain(q,x,base,w,h,near=false){
  const y=base-h;
  poly(q,[[x-12,base],[x+w*.12,y+h*.48],[x+w*.39,y+8],
    [x+w*.58,y+h*.27],[x+w*.75,y+h*.43],[x+w+12,base]],P.ink);
  poly(q,[[x,base],[x+w*.13,y+h*.51],[x+w*.39,y+20],
    [x+w*.57,y+h*.35],[x+w*.75,y+h*.49],[x+w,base]],near?P.slate:P.deep);
  poly(q,[[x+w*.15,y+h*.51],[x+w*.39,y+20],[x+w*.54,y+h*.34],
    [x+w*.47,y+h*.52],[x+w*.34,y+h*.44]],P.light);
  poly(q,[[x+w*.58,y+h*.36],[x+w*.75,y+h*.49],[x+w*.72,y+h*.61],
    [x+w*.52,y+h*.51]],P.mid);
  for(let k=0;k<12;k++){
   const xx=x+22+rnd()*(w-44),yy=y+h*.53+rnd()*h*.39;
   rect(q,xx,yy,8+rnd()*22,2,k%4===0?P.light:P.slate);
  }
 }
 function crystal(q,x,y,s=1){
  rect(q,x-44*s,y-6*s,88*s,10*s,P.shadow);
  for(const [dx,w,h,tone] of [[-27,18,38,P.cyan],[-4,26,64,P.ice],[23,21,46,P.blue]]){
   poly(q,[[x+(dx-w)*s,y-5*s],[x+(dx-w*.84)*s,y-h*.60*s],
      [x+dx*s,y-h*s],[x+(dx+w*.82)*s,y-h*.60*s],[x+(dx+w)*s,y-5*s]],P.ink);
   poly(q,[[x+(dx-w*.67)*s,y-7*s],[x+(dx-w*.56)*s,y-h*.57*s],
      [x+dx*s,y-h*s+5*s],[x+(dx+w*.47)*s,y-h*.57*s],
      [x+(dx+w*.68)*s,y-7*s]],tone);
   poly(q,[[x+(dx-w*.48)*s,y-h*.56*s],[x+dx*s,y-h*s+7*s],
      [x+(dx+3)*s,y-8*s]],P.light);
  }
 }
 function icePillar(q,x,y,w,h){
  rect(q,x-6,y-10,w+12,h+20,P.ink);
  rect(q,x,y,w,h,P.slate);
  poly(q,[[x-8,y],[x+w*.5,y-31],[x+w+8,y]],P.ink);
  poly(q,[[x,y],[x+w*.5,y-22],[x+w,y]],P.light);
  rect(q,x+6,y+6,w-12,h-16,P.stone);
  for(let yy=y+12;yy<y+h-12;yy+=22){
   rect(q,x+5,yy,w-10,4,P.deep);
   rect(q,x+7,yy+5,w-14,2,P.light);
   for(let xx=x+8+((yy/22|0)%2)*18;xx<x+w-6;xx+=39)
    rect(q,xx,yy+7,3,11,P.slate);
  }
  rect(q,x-13,y+h-7,w+26,13,P.ink);
  rect(q,x-8,y+h-6,w+16,6,P.mid);
 }
 function frostArch(q,x,y,w,h){
  poly(q,[[x-10,y+h],[x-10,y+35],[x+w*.12,y+7],[x+w*.5,y-16],
   [x+w*.88,y+7],[x+w+10,y+35],[x+w+10,y+h]],P.ink);
  poly(q,[[x+2,y+h],[x+2,y+38],[x+w*.17,y+19],[x+w*.5,y-5],
   [x+w*.83,y+19],[x+w-2,y+38],[x+w-2,y+h]],P.light);
  poly(q,[[x+15,y+h],[x+15,y+50],[x+w*.23,y+28],[x+w*.5,y+9],
   [x+w*.77,y+28],[x+w-15,y+50],[x+w-15,y+h]],P.cyanDeep);
  poly(q,[[x+21,y+h],[x+21,y+54],[x+w*.25,y+34],[x+w*.5,y+17],
   [x+w*.75,y+34],[x+w-21,y+54],[x+w-21,y+h]],P.deep);
  for(let k=0;k<8;k++){
   const xx=x+20+k*(w-40)/8;
   rect(q,xx,y+h-42,4,33,P.ice);
   rect(q,xx+1,y+h-34,2,24,P.light);
  }
  rect(q,x-13,y+h-11,w+26,15,P.ink);
  rect(q,x-8,y+h-9,w+16,5,P.light);
 }
 function scarf(q,x,y,s=1){
  rect(q,x-9*s,y-3*s,18*s,76*s,P.ink);
  rect(q,x-5*s,y+1*s,10*s,70*s,P.stone);
  poly(q,[[x+5*s,y+13*s],[x+52*s,y+21*s],
    [x+50*s,y+72*s],[x+31*s,y+91*s],[x+7*s,y+72*s]],P.ink);
  poly(q,[[x+11*s,y+18*s],[x+46*s,y+26*s],
    [x+44*s,y+66*s],[x+30*s,y+81*s],[x+11*s,y+68*s]],P.banner);
  rect(q,x+16*s,y+30*s,24*s,5*s,P.light);
  circ(q,x+28*s,y+52*s,11*s,P.light);circ(q,x+28*s,y+52*s,7*s,P.banner);
  rect(q,x+20*s,y+50*s,16*s,4*s,P.white);
 }
 function lantern(q,x,y,s=1){
  rect(q,x-7*s,y+20*s,14*s,72*s,P.ink);
  rect(q,x-4*s,y+24*s,8*s,62*s,P.stone);
  rect(q,x-22*s,y+5*s,44*s,38*s,P.ink);
  rect(q,x-17*s,y+10*s,34*s,29*s,P.cyan);
  rect(q,x-10*s,y+13*s,20*s,20*s,P.light);
  rect(q,x-2*s,y+15*s,4*s,19*s,P.white);
  rect(q,x-29*s,y+2*s,58*s,11*s,P.light);
  poly(q,[[x-30*s,y+2*s],[x-19*s,y-15*s],[x+19*s,y-15*s],[x+30*s,y+2*s]],P.ink);
  poly(q,[[x-24*s,y-1*s],[x-15*s,y-12*s],[x+15*s,y-12*s],[x+24*s,y-1*s]],P.light);
 }
 function tex(cv){const t=new THREE.CanvasTexture(cv);t.encoding=THREE.sRGBEncoding;t.magFilter=t.minFilter=THREE.NearestFilter;t.generateMipmaps=false;SCENIC_TEXTURES.push(t);return t;}
 function plane(cv,w,h,x,y,z,group=scene){
  const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),
   new THREE.MeshBasicMaterial({map:tex(cv),transparent:true,alphaTest:.02,
    depthWrite:false,side:THREE.DoubleSide,toneMapped:false,fog:false}));
  m.position.set(x,y,z);group.add(m);return m;
 }
 // Texturas separadas — pista, horizonte, anfiteatro, templo, props.
 const iceGround=canvas(1024,614,q=>{
  rect(q,0,0,1024,614,P.slate);
  const cols=[P.stone,P.mid,'#afd4e3','#a2c7db','#8dbad1','#95bfd3'];
  for(let row=0;row<26;row++){
   const y=row*24,offset=row%2?31:0;
   for(let col=-1;col<18;col++){
    const x=col*63+offset;
    rect(q,x+2,y+2,59,21,cols[Math.floor(rnd()*cols.length)]);
    rect(q,x+4,y+3,51,2,'rgba(255,255,255,.38)');
    rect(q,x+6,y+20,48,2,'rgba(52,83,110,.24)');
   }
  }
  for(let k=0;k<60;k++){
   let x=rnd()*1024,y=rnd()*614;
   q.beginPath();q.moveTo(x,y);
   for(let j=0;j<4;j++){x+=2+rnd()*16;y+=(rnd()-.5)*22;q.lineTo(x,y);}
   q.strokeStyle=k%3===0?P.light:P.cyanDeep;
   q.lineWidth=k%3===0?1.1:2.5;q.stroke();
  }
  for(let k=0;k<230;k++){
   const x=rnd()*1024,y=rnd()*614;rect(q,x,y,2+rnd()*8,1,k%2?P.white:P.ice);
  }
 });
 const icePitch=canvas(1024,614,q=>{
  q.drawImage(iceGround,0,0);
  // Bandas de luz helada y marcas de alto contraste como Ciudad.
  q.fillStyle='rgba(223,253,255,.07)';q.fillRect(0,0,1024,614);
  q.strokeStyle=P.white;q.lineWidth=6;q.strokeRect(10,10,1004,594);
  q.beginPath();q.moveTo(512,10);q.lineTo(512,604);q.stroke();
  q.strokeRect(10,168,164,278);q.strokeRect(850,168,164,278);
  q.strokeRect(10,237,55,140);q.strokeRect(959,237,55,140);
  q.beginPath();q.arc(512,307,88,0,Math.PI*2);q.stroke();
  for(const [x,y] of [[512,307],[104,307],[920,307]])circ(q,x,y,6,P.white);
  // Insignia geométrica en las áreas externas, legible desde arriba.
  for(const [x,y] of [[512,76],[512,539]]){
   q.strokeStyle='rgba(250,255,255,.42)';q.lineWidth=3;
   q.beginPath();q.moveTo(x,y-19);q.lineTo(x+15,y);q.lineTo(x,y+19);q.lineTo(x-15,y);q.closePath();q.stroke();
  }
 });
 if(pitchMat.map&&pitchMat.map.userData&&pitchMat.map.userData.pmdOwned)pitchMat.map.dispose();
 const pt=tex(icePitch);pt.userData.pmdOwned=true;pitchMat.map=pt;
 pitchMat.color.setHex(0xffffff);pitchMat.needsUpdate=true;
 if(apron.material.map&&apron.material.map.userData&&apron.material.map.userData.pmdOwned)apron.material.map.dispose();
 const ap=tex(iceGround);ap.userData.pmdOwned=true;ap.wrapS=ap.wrapT=THREE.RepeatWrapping;
 ap.repeat.set((HX*2+16)/(HX*2),(HZ*2+18)/(HZ*2));
 apron.material.map=ap;apron.material.color.setHex(0xffffff);apron.material.needsUpdate=true;apron.visible=true;
 const sky=canvas(1536,600,q=>{
  for(let y=0;y<600;y+=20)rect(q,0,y,1536,20,y<220?P.sky:y<410?P.skyLight:'#e5f1f4');
  for(let k=0;k<12;k++){
   const x=32+k*143,y=40+rnd()*190;
   rect(q,x+11,y+12,134,16,'#b0cee5');
   rect(q,x,y,122,13,P.light);rect(q,x+23,y-16,91,19,P.white);
  }
  for(let i=0;i<11;i++)mountain(q,i*158-102,612,215,222+rnd()*94);
  // Macizo glacial central, desproporcionado a propósito en el horizonte.
  mountain(q,422,603,682,490,true);
  for(let k=0;k<10;k++){
   const x=673+rnd()*239,y=190+rnd()*249;
   rect(q,x,y,6+rnd()*19,2,P.white);
  }
 });
 plane(sky,117,62,0,-12,-56);
 const distant=canvas(1536,540,q=>{
  // Ninguna fachada urbana: arcos de hielo y acantilados tallados.
  for(let i=0;i<10;i++)mountain(q,i*170-85,537,185,210+(i%3)*32,true);
  for(const x of [110,390,1020,1294]){
   icePillar(q,x,290,111,232);
   crystal(q,x+55,530,1.1);
  }
  for(const [x,w] of [[0,278],[1258,278]]){
   rect(q,x,385,w,151,P.ink);rect(q,x+5,392,w-10,137,P.slate);
   for(let yy=400;yy<531;yy+=19){
    rect(q,x+6,yy,w-12,3,P.ink);
    rect(q,x+8,yy+3,w-16,2,P.mid);
   }
  }
 });
 plane(distant,102,48,0,0,-44);
 const tribune=canvas(1536,570,q=>{
  // Igual que Ciudad: tres hileras de graderías SIN monstruos pintados.
  rect(q,0,515,1536,55,P.ink);rect(q,0,521,1536,41,P.slate);
  for(let row=0;row<3;row++){
   const y=394+row*39;
   rect(q,0,y,1536,33,P.deep);rect(q,0,y+5,1536,23,P.stone);
   rect(q,0,y+33,1536,7,P.ink);rect(q,0,y+37,1536,3,P.light);
   for(let x=0;x<1536;x+=63)
    rect(q,x+(row%2)*28,y+11,53,2,P.white);
  }
  // Escaleras simétricas.
  for(const xx of [331,1119]){
   rect(q,xx-19,314,123,200,P.ink);rect(q,xx-7,321,98,188,P.stone);
   for(let i=0;i<9;i++){
    rect(q,xx,336+i*19,84,8,P.light);
    rect(q,xx,345+i*19,84,5,P.slate);
   }
   rect(q,xx-26,310,139,13,P.white);
  }
  // Palacio del hielo, mismo tamaño real del Centro PMD en Ciudad.
  rect(q,566,257,405,252,P.ink);rect(q,577,266,383,233,P.mid);
  poly(q,[[541,286],[585,208],[625,205],[677,161],[765,123],
    [854,161],[907,205],[948,209],[997,287]],P.ink);
  poly(q,[[553,280],[591,215],[635,215],[687,174],[765,136],
    [843,174],[901,214],[942,215],[985,280]],P.ice);
  poly(q,[[568,274],[609,226],[650,226],[699,183],
    [765,148],[832,184],[882,225],[933,226],[966,274]],P.light);
  for(let row=0;row<10;row++){
   const yy=292+row*19;
   rect(q,580,yy,377,3,P.slate);
   for(let x=584+(row%2)*25;x<947;x+=58)rect(q,x,yy+4,3,14,P.stone);
  }
  for(const x of [606,931]){
   icePillar(q,x-36,276,75,226);
   rect(q,x-44,265,92,13,P.light);
  }
  frostArch(q,677,367,182,135);
  // Emblema de hielo: copo de nieve de ocho puntas, no Poké Ball flotante.
  circ(q,767,254,51,P.ink);circ(q,767,254,44,P.light);
  circ(q,767,254,37,P.blue);
  for(let k=0;k<8;k++){
   const angle=k*Math.PI/4,x=767+Math.cos(angle)*27,y=254+Math.sin(angle)*27;
   rect(q,x-3,y-3,7,7,P.white);
   rect(q,767+Math.cos(angle)*14-2,254+Math.sin(angle)*14-2,5,5,P.white);
  }
  circ(q,767,254,8,P.white);
  // Laterales enriquecidos sin mezclar tiendas, ladrillo urbano o madera.
  for(const [x,w] of [[107,213],[1218,212]]){
   rect(q,x,341,w,169,P.ink);rect(q,x+6,347,w-12,155,P.stone);
   for(let row=0;row<6;row++){
    const yy=357+row*24;rect(q,x+8,yy,w-16,4,P.slate);
    for(let i=0;i<5;i++)rect(q,x+12+i*39,yy+7,16,14,P.mid);
   }
   rect(q,x-10,331,w+20,17,P.ink);
   rect(q,x-5,333,w+10,8,P.light);
   for(let k=0;k<4;k++){
    const xx=x+17+k*48;
    frostArch(q,xx,396,36,72);
   }
  }
  for(const x of [80,452,1088,1450])scarf(q,x,320,1.04);
  for(const x of [51,431,1095,1495])lantern(q,x,351,.9);
  for(const x of [38,211,424,1007,1220,1488])crystal(q,x,503,.48);
  rect(q,0,542,1536,14,P.white);
  rect(q,0,555,1536,10,P.ink);
 });
 plane(tribune,91,29,0,11.5,-28);
 // Objetos pequeños con sombras, misma densidad del borde de Ciudad.
 const life=[],glows=[];
 const decor=(cv,w,h,x,z,animate=false)=>{
  const shadow=new THREE.Mesh(new THREE.CircleGeometry(w*.39,12),
   new THREE.MeshBasicMaterial({color:0x3b5670,transparent:true,opacity:.23,depthWrite:false}));
  shadow.rotation.x=-Math.PI/2;shadow.position.set(x,.023,z);scene.add(shadow);
  const m=plane(cv,w,h,x,h/2,z);
  if(animate)life.push({m,x,y:h/2,phase:rnd()*7});
  return m;
 };
 const crystalTex=canvas(96,112,q=>{
  crystal(q,48,104,.88);
  for(let i=0;i<9;i++)rect(q,12+i*8,105+i%2,5,2,P.white);
 });
 const torchTex=canvas(72,154,q=>{
  lantern(q,36,49,.88);
 });
 const drifts=canvas(128,92,q=>{
  rect(q,2,72,124,13,P.ink);rect(q,8,64,112,14,P.light);
  poly(q,[[8,63],[20,42],[44,49],[65,27],[94,44],[116,29],[126,65]],P.white);
  poly(q,[[16,63],[44,49],[64,34],[73,66]],P.mid);
  for(let i=0;i<17;i++){
   const x=8+rnd()*109,y=49+rnd()*16;
   rect(q,x,y,2+rnd()*4,2,P.light);
  }
 });
 const iceFlag=canvas(92,128,q=>scarf(q,34,15,.66));
 for(const side of [-1,1]){
  const x=side*(HX+5.5);
  for(const z of [-14,-5,7,15])decor(crystalTex,4.6,5.0,x,z);
  decor(torchTex,2.6,5.4,side*(HX+7.5),1.7,true);
  decor(iceFlag,3.1,4.5,side*(HX+7.3),-8.6,true);
  for(const z of [-11.5,11.5])decor(drifts,4.7,2.8,side*(HX+9),z);
 }
 for(const x of [-25,-17,17,25]){
  decor(crystalTex,3.8,4.1,x,HZ+4.8);
  decor(drifts,5.4,2.3,x,-(HZ+5.5));
 }
 // Pequeñas motas de hielo: 12 sprites, movimiento suave y coste reducido.
 const flake=tex(canvas(24,24,q=>{
  rect(q,10,3,4,18,P.white);rect(q,3,10,18,4,P.white);
  rect(q,6,6,3,3,P.ice);rect(q,15,15,3,3,P.ice);
 }));
 for(let i=0;i<12;i++){
  const sx=(i%2?1:-1)*(HX+4.8+rnd()*4),sz=-14+rnd()*28;
  const sp=new THREE.Sprite(new THREE.SpriteMaterial({
   map:flake,transparent:true,opacity:.50,depthWrite:false}));
  sp.position.set(sx,2+rnd()*5,sz);
  sp.scale.set(.38,.38,1);scene.add(sp);
  glows.push({sp,sx,sy:sp.position.y,sz,p:rnd()*6.28});
 }
 // La vista cenital mantiene las porterías claras sin modificar goles lógicos.
 const whiteMat=new THREE.MeshBasicMaterial({color:0xfaffff,depthTest:false,depthWrite:false});
 const cyanMat=new THREE.MeshBasicMaterial({color:0x67cdf0,depthTest:false,depthWrite:false});
 const accent=[0xf19591,0x7dcbff].map(color=>new THREE.MeshBasicMaterial({color,depthTest:false,depthWrite:false}));
 function goalLine(x,z,w,d,mat,h=.12){
  const m=new THREE.Mesh(new THREE.BoxGeometry(w,.014,d),mat);
  m.position.set(x,h,z);m.renderOrder=10;scene.add(m);
 }
 for(const side of [-1,1]){
  const x=side*(HX+1.5);
  goalLine(side*(HX+.15),0,.29,GW*2+.75,whiteMat);
  goalLine(side*(HX+2.8),0,.29,GW*2+.75,whiteMat);
  for(const z of [-GW-.4,GW+.4]){
   goalLine(x,z,3.0,.3,whiteMat);
   goalLine(x,z,2.3,.09,accent[side<0?0:1],.15);
  }
  for(let z=-GW+.5;z<GW;z+=.75)goalLine(x,z,2.6,.045,cyanMat,.083);
 }
 scene.userData.pmdTick=(dt,t)=>{
  for(const e of life){
   e.m.position.y=e.y+Math.sin(t*.002+e.phase)*.045;
   e.m.rotation.y=Math.sin(t*.0012+e.phase)*.025;
  }
  for(const e of glows){
   const z=t*.00038+e.p;
   e.sp.position.set(e.sx+Math.sin(z)*.8,e.sy+Math.cos(z)*.36,e.sz);
   e.sp.material.opacity=.25+.3*(.5+.5*Math.sin(z*3));
  }
 };
 return scene;
}

/* Banquillo de hielo para Glaciar PMD: los Pokémon son sprites reales del juego.
 * No hay entrenadores generados; se mantiene el sistema oficial existente. */
const benchTextures=new Map();
function buildBench(o){
 const {THREE,dugG,cx,zSeat,team}=o;
 const A={ink:'#314563',dark:'#617895',mid:'#9bbdd3',ice:'#b5e3f0',
  light:'#eefcff',blue:'#4f9ac5',gold:'#fce7b1'};
 const color=team===0?'#ed8c8d':'#77c8ec';
 const tex=(key,w,h,draw)=>{
  const cacheKey=key+team;
  if(benchTextures.has(cacheKey))return benchTextures.get(cacheKey);
  const cv=document.createElement('canvas');cv.width=w;cv.height=h;
  const q=cv.getContext('2d');q.imageSmoothingEnabled=false;
  const r=(x,y,w,h,col)=>{q.fillStyle=col;q.fillRect(x,y,w,h);};
  draw(q,r);
  const t=new THREE.CanvasTexture(cv);t.encoding=THREE.sRGBEncoding;
  t.magFilter=t.minFilter=THREE.NearestFilter;t.generateMipmaps=false;
  benchTextures.set(cacheKey,t);return t;
 };
 const wall=tex('wall',512,208,(q,r)=>{
  r(0,0,512,208,A.ink);r(7,9,498,189,A.dark);
  for(let row=0;row<10;row++){
   const y=16+row*18;
   r(9,y,494,3,A.ink);r(11,y+3,491,2,A.light);
   for(let x=15+(row%2)*25;x<492;x+=58){
    r(x,y+6,3,10,A.ink);r(x+7,y+8,24,2,A.mid);
   }
  }
  r(0,0,512,20,A.ink);r(7,4,498,10,A.light);
  for(let x=15;x<506;x+=70){
   r(x,0,42,28,A.ink);r(x+4,3,34,19,A.mid);
   r(x+7,5,26,4,A.light);
  }
  for(let x=52;x<485;x+=111){
   r(x-18,59,49,73,A.ink);
   q.fillStyle=A.ink;q.beginPath();q.moveTo(x-18,64);
   q.lineTo(x+6,37);q.lineTo(x+31,64);q.fill();
   r(x-10,66,35,57,A.blue);r(x-5,68,26,50,A.ice);
   r(x,70,12,38,A.light);
  }
  r(4,181,505,22,A.ink);r(10,186,492,8,A.light);
 });
 const base=tex('floor',256,128,(q,r)=>{
  r(0,0,256,128,A.dark);
  for(let yy=0;yy<128;yy+=18){
   for(let xx=(yy%36)*2-35;xx<256;xx+=49){
    r(xx+2,yy+2,45,15,(xx+yy)%3===0?A.ice:A.mid);
    r(xx+5,yy+3,37,2,A.light);
    r(xx+5,yy+15,37,2,A.ink);
   }
  }
 });
 const rail=tex('rail',512,82,(q,r)=>{
  for(let x=0;x<512;x+=49){
   r(x,11,13,70,A.ink);r(x+3,14,7,62,A.mid);
   r(x-4,8,20,11,A.light);
  }
  r(0,35,512,17,A.ink);r(0,37,512,7,A.light);
  r(0,74,512,8,A.ink);
  for(let x=28;x<512;x+=112){
   r(x-11,52,27,17,color);r(x-7,54,19,11,A.ink);
   r(x-3,56,10,7,A.ice);
  }
 });
 const mat=(map,opacity=1)=>new THREE.MeshBasicMaterial({
  map,transparent:true,opacity,alphaTest:.025,
  depthWrite:false,side:THREE.DoubleSide,toneMapped:false});
 const panel=(w,h,x,y,z,t,order)=>{
  const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),mat(t));
  m.position.set(x,y,z);m.renderOrder=order;dugG.add(m);return m;
 };
 const ground=new THREE.Mesh(new THREE.PlaneGeometry(21,4),mat(base));
 ground.rotation.x=-Math.PI/2;ground.position.set(cx,1.05,zSeat);
 dugG.add(ground);
 panel(21.0,7.3,cx,4.65,zSeat-2.2,wall,1);
 // Barandilla y pedestales delante de los pies.
 panel(20.3,1.3,cx,.79,zSeat+1.9,rail,5);
 for(const dx of [-8.6,8.6]){
  const p=new THREE.Mesh(new THREE.BoxGeometry(.8,3.2,1.2),
   new THREE.MeshBasicMaterial({color:0x9bbdd3}));
  p.position.set(cx+dx,1.8,zSeat+1.6);dugG.add(p);
 }
 return true;
}

global.PMD_GLACIER={build,buildBench};
})(window);
