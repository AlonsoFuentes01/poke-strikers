/* Poké Strikers · Estadio Volcán Mystery Dungeon · geometría y arte NUEVOS
 * Fase 1: escenario estático. No usa la ciudad, gradas ni decorados anteriores.
 * Los únicos personajes de la escena son los sprites Pokémon del juego y los
 * entrenadores oficiales de Pokémon Showdown colocados por el juego.
 */
(function(global){
'use strict';
function build(o){
 const {THREE,cityG,HX,HZ,GW,apron,pitchMat,SCENIC_TEXTURES}=o;
 const scene=new THREE.Group();scene.name='ESTADIO_VOLCAN_PMD_CALDERA';cityG.add(scene);
 let seed=18473;const rand=()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483647};
 const C={
  sky:'#58436b',sky2:'#ab6b79',cloud:'#a4849a',cloudShadow:'#604b66',
  mountain:'#755668',mountainShade:'#41354f',mountainLight:'#9a737d',
  ink:'#332941',stone:'#9f8691',stoneLight:'#d7b5ab',stoneDark:'#695364',
  roof:'#9d4c50',roofLight:'#d07964',roofDark:'#5d394c',banner:'#b84b4e',
  tree:'#8a4754',treeLight:'#f37b4b',treeDark:'#4d3548',wood:'#634759',
  water:'#e96a3a',waterLight:'#ffcc76',field:'#5d4c61',field2:'#534259',
  marking:'#fff2df',flower:'#ef6a3e',flower2:'#ffca71',green2:'#8b574f'
 };
 const canvas=(w,h,fn)=>{
  const c=document.createElement('canvas');c.width=w;c.height=h;
  const q=c.getContext('2d');q.imageSmoothingEnabled=false;fn(q,w,h);return c;
 };
 const r=(q,x,y,w,h,col)=>{q.fillStyle=col;q.fillRect(Math.round(x),Math.round(y),Math.ceil(w),Math.ceil(h))};
 const poly=(q,pts,col)=>{q.fillStyle=col;q.beginPath();q.moveTo(pts[0][0],pts[0][1]);for(let i=1;i<pts.length;i++)q.lineTo(pts[i][0],pts[i][1]);q.closePath();q.fill()};
 const circle=(q,x,y,rad,col)=>{q.fillStyle=col;q.beginPath();q.arc(x,y,rad,0,Math.PI*2);q.fill()};
 function cloud(q,x,y,scale=1){
  for(const [dx,dy,w,h] of [[-58,10,87,25],[-33,-7,79,34],[18,-23,83,50],[54,-2,64,27]])
   r(q,x+dx*scale+4,y+dy*scale+6,w*scale,h*scale,C.cloudShadow);
  for(const [dx,dy,w,h] of [[-58,10,87,25],[-33,-7,79,34],[18,-23,83,50],[54,-2,64,27]])
   r(q,x+dx*scale,y+dy*scale,w*scale,h*scale,C.cloud);
 }
 function pine(q,x,y,s=1){
  r(q,x-6*s,y-20*s,12*s,25*s,C.wood);
  for(let i=0;i<3;i++)poly(q,[[x-28*s,y-(20+i*18)*s],[x,y-(67+i*14)*s],[x+28*s,y-(20+i*18)*s]],i%2?C.tree:C.treeDark);
  poly(q,[[x-17*s,y-76*s],[x,y-111*s],[x+17*s,y-76*s]],C.treeLight);
 }
 function tree(q,x,y,s=1){
  // Basalto y obsidiana en la misma escala y posiciones que los árboles PMD.
  r(q,x-40*s,y-12*s,80*s,12*s,C.ink);
  for(const [dx,w,h] of [[-27,35,61],[-4,46,86],[25,29,51]]){
   poly(q,[[x+(dx-w*.42)*s,y],[x+(dx-w*.36)*s,y-h*.58*s],
     [x+dx*s,y-h*s],[x+(dx+w*.32)*s,y-h*.64*s],
     [x+(dx+w*.55)*s,y]],C.ink);
   poly(q,[[x+(dx-w*.28)*s,y-5*s],[x+(dx-w*.21)*s,y-h*.53*s],
     [x+(dx-5)*s,y-h*.86*s],[x+(dx+7)*s,y-h*.32*s],
     [x+(dx+w*.34)*s,y-5*s]],C.stoneDark);
   r(q,x+(dx-5)*s,y-h*.59*s,4*s,16*s,C.stoneLight);
   if((dx|0)%2)r(q,x+(dx+8)*s,y-20*s,3*s,12*s,C.flower);
  }
 }
 function flowers(q,x,y){
  // Cristales de magma en el mismo tamaño de props que las flores de Ciudad.
  r(q,x-17,y-7,34,9,C.ink);r(q,x-14,y-11,28,7,C.stone);
  for(let i=0;i<3;i++){
   const xx=x-11+i*11,base=y-11,h=10+(i%2)*8;
   poly(q,[[xx-6,base],[xx-5,base-h*.5],[xx,base-h],
     [xx+6,base-h*.5],[xx+7,base]],C.ink);
   poly(q,[[xx-4,base-1],[xx-3,base-h*.48],[xx,base-h+3],
     [xx+3,base-h*.45],[xx+3,base-1]],i%2?C.flower2:C.flower);
   r(q,xx-1,base-h+5,2,Math.max(2,h*.35),C.waterLight);
  }
 }
 function window(q,x,y,w=20,h=27){
  r(q,x-3,y-3,w+6,h+6,C.ink);r(q,x,y,w,h,C.water);
  r(q,x+3,y+3,6,h*.36,C.waterLight);r(q,x+w-4,y,4,h,C.ink);
  r(q,x,y+h-5,w,5,C.stoneLight);
  // Vidrios divididos, marcos en madera y brillo diagonal discreto.
  r(q,x+w/2-1,y,3,h,C.ink);
  r(q,x,y+h*.52,w,3,C.ink);
  for(let k=0;k<3;k++)r(q,x+3+k*3,y+3+k*4,6,2,'rgba(235,250,255,.6)');
  r(q,x-3,y+h+3,w+6,3,C.stoneDark);

 }
 function building(q,x,base,w,h,opt={}){
  const y=base-h;const roof=opt.roof||C.roof;
  r(q,x-5,y+6,w+10,h+3,C.ink);r(q,x,y,w,h,opt.wall||C.stone);
  poly(q,[[x-11,y+11],[x+12,y-16],[x+w-14,y-16],[x+w+12,y+11]],C.roofDark);
  poly(q,[[x-8,y+8],[x+15,y-15],[x+w-17,y-15],[x+w+8,y+8]],roof);
  r(q,x,y+10,w,5,C.roofLight);r(q,x-3,base-7,w+6,8,C.stoneLight);
  // Tejas vistas, imposta, piedra imperfecta y reflejos: pixel art a escala nativa.
  for(let ry=y-12;ry<y+8;ry+=6)for(let rx=x+4+(ry%12?8:0);rx<x+w-5;rx+=17){
   r(q,rx,ry,13,2,ry%12?C.roofLight:C.roofDark);
   r(q,rx+2,ry+3,10,1,'rgba(255,218,174,.38)');
  }
  for(let by=y+16;by<base-9;by+=13){
   r(q,x+2,by,w-4,1,'rgba(117,81,92,.26)');
   for(let bx=x+3+((by/13|0)%2)*14;bx<x+w-6;bx+=29)
    r(q,bx,by+2,1,9,'rgba(116,83,83,.18)');
  }
  r(q,x+4,base-14,w-8,2,'rgba(255,236,193,.75)');
  for(let k=0;k<5;k++){
   const px=x+7+rand()*(w-14),py=y+22+rand()*Math.max(1,h-48);
   r(q,px,py,3+rand()*6,2,'rgba(247,229,199,.32)');
  }

  const cols=Math.max(1,Math.floor((w-15)/29)),rows=Math.max(1,Math.floor((h-25)/43));
  for(let iy=0;iy<rows;iy++)for(let ix=0;ix<cols;ix++){
   const xx=x+12+ix*(w-24)/cols,yy=y+28+iy*38;
   if(yy+29<base)window(q,xx,yy,17,23);
  }
  if(opt.shop){
   r(q,x+8,base-37,w-16,32,C.ink);r(q,x+11,base-34,w-22,27,C.water);
   r(q,x+17,base-30,12,13,C.waterLight);r(q,x+5,base-48,w-10,17,C.roofDark);
   for(let i=0;i<Math.floor((w-10)/17);i++)r(q,x+6+i*17,base-47,16,15,i%2?C.stoneLight:roof);
  }
 }
 function clockTower(q,x,base){
  r(q,x-31,base-214,62,214,C.ink);r(q,x-26,base-210,52,205,C.stone);
  r(q,x-38,base-227,76,19,C.roofDark);r(q,x-33,base-231,66,17,C.roof);
  r(q,x-24,base-257,48,26,C.ink);r(q,x-18,base-252,36,21,C.stoneLight);
  r(q,x-5,base-268,10,13,C.roof);
  circle(q,x,base-176,28,C.ink);circle(q,x,base-176,23,C.stoneLight);
  r(q,x-2,base-195,4,22,C.ink);r(q,x,base-177,13,4,C.ink);
  window(q,x-12,base-123,24,33);window(q,x-12,base-60,24,36);
 }
 // Pixel tiles based on the actual visual reference, not a retextured old model.
 const pavement=canvas(1024,614,(q)=>{
  // Adoquín de plaza PMD: bloques de piedra cálida, juntas suaves y desgaste natural.
  // El mismo material continúa bajo las líneas de la cancha y en la zona exterior.
  r(q,0,0,1024,614,'#49394f');
  const stones=['#675668','#705d70','#766273','#655568','#756071','#806879','#716073','#6d566b'];
  const bw=63,bh=29;
  for(let row=0;row<Math.ceil(614/bh);row++){
   const yy=row*bh,shift=(row%2)*Math.floor(bw/2);
   for(let col=-1;col<=Math.ceil(1024/bw);col++){
    const xx=col*bw+shift,colr=stones[Math.floor(rand()*stones.length)];
    // Bordes desiguales, sin cuadrícula brillante ni aspecto de baldosas de baño.
    r(q,xx+2,yy+2,bw-4,bh-4,colr);
    r(q,xx+4,yy+3,bw-8,2,'rgba(225,188,168,.22)');
    r(q,xx+3,yy+bh-5,bw-6,2,'rgba(34,21,45,.25)');
    if(rand()<.57)r(q,xx+7+rand()*29,yy+9+rand()*10,7+rand()*15,2,'rgba(26,20,38,.23)');
    if(rand()<.24)r(q,xx+8+rand()*33,yy+5+rand()*11,3+rand()*7,2,'rgba(252,238,218,.30)');
    if(rand()<.16){
     const cx=xx+14+rand()*32,cy=yy+9+rand()*10;
     r(q,cx,cy,12,1,'rgba(117,87,103,.15)');
     r(q,cx+9,cy+1,2,4,'rgba(117,87,103,.12)');
    }
   }
  }
  // Finas fisuras de lava integradas en los adoquines, sin ruido excesivo.
  for(let k=0;k<38;k++){
   let x=rand()*1024,y=rand()*614;
   q.beginPath();q.moveTo(x,y);
   for(let j=0;j<4;j++){x+=3+rand()*21;y+=(rand()-.5)*19;q.lineTo(x,y);}
   q.strokeStyle='#35293d';q.lineWidth=3.2;q.stroke();
   q.strokeStyle=k%3===0?'#ffb16b':'#d16b50';q.lineWidth=1.15;q.stroke();
  }
  // Zonas de uso: polvo y bordes erosionados discretos, no patrones repetitivos.
  for(let i=0;i<390;i++){
   const x=rand()*1024,y=rand()*614;
   r(q,x,y,2+rand()*5,1,rand()<.5?'rgba(30,21,37,.20)':'rgba(219,161,142,.18)');
  }
 });
 const pitchC=canvas(1024,614,(q)=>{
  // Continuous textured stone court: same logical 60 × 36 playing field.
  q.drawImage(pavement,0,0);
  for(let i=0;i<230;i++){
   let x=rand()*1024,y=rand()*614;r(q,x,y,3+rand()*9,1+rand()*3,'rgba(98,75,87,.13)');
  }
  q.strokeStyle=C.marking;q.lineWidth=6;q.strokeRect(10,10,1004,594);
  q.beginPath();q.moveTo(512,10);q.lineTo(512,604);q.stroke();
  q.strokeRect(10,168,164,278);q.strokeRect(850,168,164,278);
  q.strokeRect(10,237,55,140);q.strokeRect(959,237,55,140);
  q.beginPath();q.arc(512,307,88,0,Math.PI*2);q.stroke();
  circle(q,512,307,7,C.marking);
  for(const x of [104,920])circle(q,x,307,5,C.marking);
 });
 // Be very explicit about replacing the playing surface and the apron.
 const mkTex=(c)=>{
  const t=new THREE.CanvasTexture(c);t.encoding=THREE.sRGBEncoding;
  t.magFilter=t.minFilter=THREE.NearestFilter;t.anisotropy=1;t.generateMipmaps=false;
  return t;
 };
 if(pitchMat.map&&pitchMat.map.userData&&pitchMat.map.userData.pmdOwned)pitchMat.map.dispose();
 const pt=mkTex(pitchC);pt.userData.pmdOwned=true;pitchMat.map=pt;pitchMat.color.setHex(0xffffff);
 pitchMat.needsUpdate=true;SCENIC_TEXTURES.push(pt);
 if(apron.material.map&&apron.material.map.userData&&apron.material.map.userData.pmdOwned)apron.material.map.dispose();
 const at=mkTex(pavement);at.userData.pmdOwned=true;at.wrapS=at.wrapT=THREE.RepeatWrapping;
 at.repeat.set((HX*2+16)/(HX*2),(HZ*2+12+6)/(HZ*2));apron.material.map=at;apron.material.color.setHex(0xffffff);
 apron.material.needsUpdate=true;SCENIC_TEXTURES.push(at);
 apron.visible=true;
 // Skyline: three true layers (sky, town, architectural foreground).
 const sky=canvas(1536,600,q=>{
  // Misma escala y composición que Ciudad; el paisaje sí es volcánico.
  for(let y=0;y<600;y+=16)
   r(q,0,y,1536,16,y<180?C.sky:y<365?C.sky2:'#cf9185');
  for(let i=0;i<16;i++)
   cloud(q,35+i*109+(rand()-.5)*42,35+rand()*140,.42+rand()*.62);
  for(let i=0;i<9;i++){
   const x=i*204-65,peak=289+rand()*68;
   poly(q,[[x-140,600],[x-80,peak+71],[x,peak-76],
    [x+83,peak+73],[x+160,600]],C.mountainShade);
   poly(q,[[x-72,peak+78],[x,peak-76],[x+35,peak+29],
    [x+7,peak+131]],C.mountain);
   poly(q,[[x-50,peak+48],[x,peak-76],[x+11,peak-36],
    [x-9,peak+70]],C.mountainLight);
  }
  // Volcán detrás de la entrada, al estilo de las montañas PMD.
  poly(q,[[420,600],[603,384],[715,235],[758,201],[806,233],
    [915,389],[1115,600]],'#352b42');
  poly(q,[[520,600],[663,343],[730,229],[760,221],
    [815,294],[970,600]],'#705063');
  poly(q,[[694,269],[721,238],[760,224],[799,254],
    [774,269],[730,268]],C.ink);
  poly(q,[[720,246],[742,234],[762,235],[780,247],
    [759,255],[740,253]],C.flower2);
  poly(q,[[748,256],[736,345],[728,411],[694,518],[678,600],
    [702,600],[742,454],[769,338],[767,260]],C.flower);
  poly(q,[[757,262],[751,339],[740,408],[717,486],
    [705,520]],C.waterLight);
  for(let i=0;i<11;i++){
   const x=698+rand()*105,y=159-rand()*131;
   r(q,x,y,13+rand()*29,6+rand()*9,C.cloudShadow);
  }
 });
 // Paisaje exterior volcánico: no hay ciudad, casas ni tiendas.
 // Mantiene idéntico plano y resolución que el paisaje de Ciudad PMD.
 const caldera=canvas(1536,540,q=>{
  const outline=C.ink,rock=C.stoneDark,light=C.stoneLight;
  function cliff(x,base,w,h,back=false){
   const y=base-h;
   poly(q,[[x-9,base],[x-15,y+42],[x+w*.09,y+12],[x+w*.28,y-10],
     [x+w*.43,y+27],[x+w*.60,y+4],[x+w*.80,y+20],
     [x+w-6,y+7],[x+w+13,base]],back?C.mountainShade:outline);
   poly(q,[[x+2,base],[x-2,y+50],[x+w*.16,y+24],
     [x+w*.33,y+9],[x+w*.52,y+48],[x+w*.73,y+21],
     [x+w-1,y+31],[x+w-4,base]],back?C.mountain:rock);
   poly(q,[[x+w*.12,base-3],[x+w*.15,y+37],[x+w*.30,y+26],
     [x+w*.43,y+51],[x+w*.44,base-3]],back?C.mountainLight:C.stone);
   poly(q,[[x+w*.74,y+25],[x+w*.88,y+34],
     [x+w-4,y+27],[x+w-4,base-1],[x+w*.71,base-1]],back?C.mountainShade:outline);
   for(let k=0;k<Math.max(8,Math.floor(w*h/2000));k++){
    const xx=x+8+rand()*(w-18),yy=y+57+rand()*(h-66);
    r(q,xx,yy,6+rand()*16,2,k%4===0?C.stoneLight:C.stoneDark);
    if(k%7===0)r(q,xx+3,yy+4,2,10,C.ink);
   }
   if(!back)for(let k=0;k<4;k++){
    const xx=x+w*(.18+k*.17),yy=y+h*(.44+(k%2)*.16);
    r(q,xx,yy,4,20+k*5,C.flower);
    r(q,xx+1,yy+3,2,9,C.waterLight);
   }
  }
  function lavafall(x,y,w,h){
   r(q,x-11,y-5,w+22,h+14,C.ink);
   r(q,x-6,y,w+12,h,'#843a4d');
   for(let i=0;i<Math.ceil(w/8);i++){
    const xx=x+2+i*8,off=i%4*6;
    r(q,xx,y+off,6,h-off-((i*3)%17),i%3===0?C.waterLight:C.water);
    if(i%3===0)r(q,xx+1,y+off+13,2,h-off-25,C.flower2);
   }
   r(q,x-12,y+h,w+24,10,C.water);
   for(let k=0;k<11;k++)r(q,x-10+rand()*(w+20),y+h+rand()*16,
     5+rand()*9,3,k%3===0?C.waterLight:C.flower);
  }
  function ruins(x,base,w,h){
   const y=base-h;
   r(q,x-12,y+42,w+24,h-35,C.ink);r(q,x-4,y+51,w+8,h-48,C.stoneDark);
   // Dos pilares erosionados, sin tejados ni ventanas urbanas.
   for(const dx of [7,w-30]){
    r(q,x+dx,y+38,24,h-55,C.ink);
    r(q,x+dx+5,y+44,14,h-68,C.stone);
    for(let j=0;j<6;j++)
     r(q,x+dx+4,y+50+j*(h-76)/6,18,3,C.stoneDark);
    r(q,x+dx-5,y+29,34,15,C.stoneLight);
   }
   r(q,x+2,y+22,w-4,18,C.ink);r(q,x+9,y+25,w-18,9,C.stoneLight);
   for(let k=0;k<Math.floor(w/28);k++){
    r(q,x+5+k*27,y-3+(k%3)*5,19,30,C.ink);
    r(q,x+9+k*27,y+2+(k%3)*5,11,19,C.stone);
   }
   const mid=x+w*.5;
   poly(q,[[mid-24,base-11],[mid-24,base-75],[mid-14,base-93],
    [mid,base-105],[mid+14,base-93],[mid+24,base-75],
    [mid+24,base-11]],C.ink);
   r(q,mid-14,base-69,28,55,C.water);
   r(q,mid-5,base-57,10,40,C.waterLight);
   r(q,x-17,base-20,w+34,20,C.ink);
   r(q,x-11,base-17,w+22,7,C.stoneLight);
  }
  // Profundidad: colinas de ceniza -> acantilados -> santuario en ruinas.
  for(let i=0;i<13;i++){
   const x=i*137-75,h=138+(i*57)%95;
   cliff(x,431,158,h,true);
  }
  for(let i=0;i<11;i++){
   const x=i*151-60,h=205+(i*47)%87;
   cliff(x,537,175,h,false);
  }
  // Muros de contención fragmentados que conectan las formaciones naturales.
  r(q,0,461,1536,76,C.ink);r(q,6,467,1524,61,C.stoneDark);
  for(let row=0;row<3;row++){
   const y=470+row*20;
   r(q,7,y,1522,3,C.ink);
   for(let x=(row%2)*29;x<1536;x+=65){
    r(q,x,y+4,4,15,C.ink);
    if((x+row)%3===0)r(q,x+8,y+8,28,2,C.stoneLight);
   }
  }
  // Restos de un anfiteatro excavado en la roca, no una calle con casas.
  for(const [x,w,h] of [[64,145,193],[303,149,230],[1086,149,223],[1349,145,196]]){
   ruins(x,508,w,h);
  }
  // Grietas verticales de magma y grandes cascadas flanqueando la entrada.
  lavafall(209,284,53,242);
  lavafall(1274,274,56,252);
  for(const [x,y,w,h] of [[23,350,27,166],[490,351,25,170],
    [1022,343,27,172],[1485,347,28,176]]){
   lavafall(x,y,w,h);
  }
  // Escarpes próximos, piedras cristalizadas y fogatas naturales.
  for(let i=0;i<22;i++){
   const x=31+i*70;
   if(i%4===0)tree(q,x,525,.58+(i%3)*.14);
   else flowers(q,x,516);
  }
  for(let i=0;i<50;i++){
   const xx=rand()*1536,yy=399+rand()*120;
   r(q,xx,yy,6+rand()*28,2,i%6===0?C.flower:C.stoneLight);
  }
 });
 // New spectator architecture, intentionally EMPTY of hand-drawn creatures;
 // all visible Pokémon spectators are actual SpriteCollab assets.
 const tribune=canvas(1536,570,q=>{
  r(q,0,510,1536,60,C.ink);r(q,0,515,1536,46,C.stoneDark);
  for(let row=0;row<3;row++){
   const y=393+row*40;
   r(q,0,y,1536,33,C.stoneDark);r(q,0,y+5,1536,23,C.stone);
   r(q,0,y+33,1536,7,C.ink);r(q,0,y+37,1536,3,C.stoneLight);
   for(let x=0;x<1536;x+=64)r(q,x+row%2*30,y+12,54,2,'#b99a91');
  }
  // The side stairways from the reference sketch.
  for(const xx of [332,1120]){
   r(q,xx-11,330,106,178,C.ink);r(q,xx,331,83,175,C.stone);
   for(let i=0;i<9;i++){r(q,xx,335+i*19,83,8,C.stoneLight);r(q,xx,345+i*19,83,5,C.stoneDark);}
   r(q,xx-19,321,125,14,C.stoneLight);
  }
  // Fortaleza del Volcán, exactamente en la posición y escala del Centro Pokémon.
  // Una sola fachada compacta y coherente con las gradas, sin PNG dispersos.
  r(q,574,246,384,257,C.ink);r(q,584,251,364,247,C.stone);
  poly(q,[[546,272],[585,213],[618,194],[913,194],[950,213],[988,272]],C.ink);
  poly(q,[[554,265],[593,216],[624,203],[906,203],[942,216],[980,265]],C.roofDark);
  poly(q,[[564,260],[600,223],[630,210],[904,210],[932,223],[970,260]],C.roof);
  r(q,551,268,434,18,C.ink);r(q,559,271,417,8,C.roofLight);
  for(let yy=210;yy<260;yy+=9){
   for(let xx=558+((yy/9|0)%2)*11;xx<969;xx+=24){
    r(q,xx,yy,19,3,yy%18?C.roofLight:C.roofDark);
    r(q,xx+3,yy+4,12,1,C.stoneLight);
   }
  }
  // Cada sillar, junta y borde conserva el grosor visual de Ciudad.
  for(let yy=292;yy<497;yy+=15){
   r(q,586,yy,359,2,C.stoneDark);
   for(let xx=592+((yy/15|0)%2)*21;xx<938;xx+=43)
    r(q,xx,yy+2,3,11,C.ink);
  }
  // Dos torretas pequeñas integradas, no rascacielos independientes.
  for(const xx of [609,917]){
   r(q,xx-36,287,73,211,C.ink);r(q,xx-30,293,61,201,C.stone);
   for(let yy=309;yy<486;yy+=16){
    r(q,xx-28,yy,57,2,C.stoneDark);
    for(let sx=xx-24+((yy/16|0)%2)*16;sx<xx+28;sx+=31)
     r(q,sx,yy+3,3,12,C.ink);
   }
   r(q,xx-40,279,81,17,C.ink);r(q,xx-34,281,69,10,C.stoneLight);
   for(let k=0;k<4;k++){
    const sx=xx-34+k*21;
    r(q,sx,263,16,20,C.ink);r(q,sx+3,266,10,13,C.stone);
   }
   window(q,xx-11,326,22,40);window(q,xx-11,417,22,39);
  }
  // Portal incandescente con un arco tallado a mano (misma escala PMD).
  r(q,682,397,169,106,C.ink);
  poly(q,[[681,414],[692,381],[719,362],[767,350],
    [815,361],[843,382],[853,414]],C.ink);
  poly(q,[[694,414],[703,389],[721,374],[767,364],
    [813,373],[830,390],[840,414]],C.stoneLight);
  r(q,700,416,135,86,C.water);
  poly(q,[[701,417],[721,393],[765,377],
    [812,392],[834,417]],C.flower);
  for(let x=707;x<831;x+=15){
   r(q,x,421,6,77,C.roofDark);r(q,x+2,426,2,68,C.ink);
   if(((x/15)|0)%2===0)r(q,x+8,437,4,54,C.waterLight);
  }
  r(q,695,446,144,9,C.ink);r(q,700,449,134,3,C.stoneLight);
  r(q,686,500,161,9,C.stoneLight);
  // Emblema del club Poké Strikers: misma Poké Ball que en Ciudad.
  circle(q,767,249,58,C.ink);circle(q,767,249,50,C.stoneLight);
  circle(q,767,249,42,C.roof);
  r(q,725,245,84,9,C.ink);circle(q,767,250,15,C.ink);
  circle(q,767,250,9,C.stoneLight);
  // Dos estandartes y antorchas adosados a la fortaleza.
  for(const xx of [550,981]){
   r(q,xx-5,313,12,189,C.ink);r(q,xx-2,319,6,180,C.stoneDark);
   r(q,xx-11,304,24,13,C.stoneLight);
   r(q,xx+6,336,42,78,C.ink);
   r(q,xx+10,339,34,69,C.banner);
   r(q,xx+14,348,27,5,C.waterLight);
   r(q,xx+14,369,26,5,C.stoneLight);
  }
  for(const xx of [663,869]){
   r(q,xx-17,459,35,36,C.ink);r(q,xx-12,461,25,29,C.stone);
   poly(q,[[xx-10,457],[xx-11,438],[xx,418],
    [xx+4,433],[xx+11,408],[xx+14,457]],C.water);
   poly(q,[[xx-4,457],[xx-2,439],[xx+4,428],[xx+7,457]],C.waterLight);
   r(q,xx-21,455,42,8,C.stoneLight);
  }
  for(let xx=594;xx<940;xx+=19)r(q,xx,486,13,4,C.stoneLight);
  r(q,552,502,435,8,C.ink);r(q,560,501,419,4,C.stoneLight);
  // Graderías volcánicas secundarias con muros tallados en la ladera.
  // Misma escala y límites de Ciudad, sin puestos de comercio ni toldos.
  for(const [x,w] of [[110,209],[1217,209]]){
   r(q,x-10,333,w+20,167,C.ink);
   r(q,x-3,340,w+6,151,C.stoneDark);
   for(let row=0;row<8;row++){
    const y=345+row*18;
    r(q,x,y,w,3,C.ink);
    r(q,x+4,y+4,w-8,2,C.stoneLight);
    for(let xx=x+5+((row%2)*22);xx<x+w-7;xx+=44)
     r(q,xx,y+7,3,10,C.ink);
   }
   // Ventanas arqueadas que muestran magma debajo de los espectadores.
   for(let j=0;j<4;j++){
    const xx=x+20+j*47;
    r(q,xx-9,410,35,67,C.ink);
    poly(q,[[xx-9,427],[xx-3,414],[xx+9,409],
      [xx+20,414],[xx+26,427]],C.ink);
    r(q,xx,428,18,45,C.water);
    r(q,xx+7,435,4,35,C.waterLight);
   }
   r(q,x-12,325,w+24,15,C.ink);
   r(q,x-8,328,w+16,7,C.stoneLight);
   for(let j=0;j<Math.floor(w/37);j++){
    const xx=x+j*37+4;
    r(q,xx,304,29,23,C.ink);r(q,xx+4,307,20,16,C.stone);
   }
   // Lenguas de lava naturales a un lado de cada muro.
   const lavaX=x===110?x-26:x+w+4;
   r(q,lavaX,361,18,123,C.ink);
   r(q,lavaX+4,363,10,117,C.water);
   r(q,lavaX+6,368,3,103,C.waterLight);
   r(q,lavaX-6,482,30,8,C.flower);
  }
  // Braseros de piedra y estandartes rojos sobre pilastras.
  for(const x of [83,451,1086,1462]){
   r(q,x-9,347,20,156,C.ink);
   r(q,x-5,351,12,147,C.stoneDark);
   r(q,x-16,339,35,12,C.stoneLight);
   r(q,x-27,331,56,12,C.ink);
   r(q,x-23,333,49,6,C.stoneLight);
   poly(q,[[x-21,331],[x-16,316],[x-3,302],
     [x+3,314],[x+11,290],[x+22,329]],C.water);
   poly(q,[[x-8,329],[x-2,310],[x+6,319],
     [x+9,328]],C.waterLight);
  }
  for(const x of [261,497,1042,1282]){
   r(q,x,340,10,142,C.ink);r(q,x+3,344,4,134,C.stone);
   r(q,x+10,349,48,79,C.ink);
   poly(q,[[x+14,354],[x+54,358],[x+51,414],
     [x+31,431],[x+14,411]],C.banner);
   r(q,x+18,363,29,6,C.stoneLight);
   circle(q,x+33,386,9,C.stoneLight);
   circle(q,x+33,386,5,C.roofDark);
  }
  for(let i=0;i<18;i++)flowers(q,36+i*85,497);
  // Escaleras monumentales: pasamanos, huellas y zócalos sombreados.
  for(const sx of [331,1119]){
   r(q,sx-23,314,8,196,C.ink);r(q,sx-20,314,5,189,C.stoneLight);
   r(q,sx+88,314,8,196,C.ink);r(q,sx+90,314,5,189,C.stoneLight);
   for(let i=0;i<9;i++){
    const yy=334+i*19;
    r(q,sx+1,yy+7,82,4,'#ad8e89');
    r(q,sx+3,yy+12,77,3,'rgba(80,67,84,.17)');
   }
  }
  // En los antiguos maceteros: altares de roca con cristales volcánicos.
  for(const x of [35,212,426,1000,1212,1462]){
   r(q,x-36,446,72,48,C.ink);r(q,x-30,452,61,34,C.stoneDark);
   r(q,x-40,442,80,12,C.stoneLight);
   r(q,x-26,438,54,9,C.ink);
   for(let j=0;j<3;j++){
    const xx=x-21+j*20,h=19+(j%2)*16;
    poly(q,[[xx-10,440],[xx-8,440-h*.59],[xx,440-h],
      [xx+9,440-h*.61],[xx+10,440]],C.ink);
    poly(q,[[xx-6,439],[xx-5,440-h*.56],[xx,443-h],
      [xx+6,440-h*.53],[xx+7,439]],j%2?C.flower2:C.flower);
    r(q,xx-1,440-h+5,2,8,C.waterLight);
   }
  }
  // Antorchas fijadas a la roca: sin farolas ni banderines urbanos.
  for(const x of [44,456,1078,1496]){
   r(q,x-7,373,15,124,C.ink);r(q,x-3,378,7,115,C.stoneDark);
   r(q,x-20,352,40,34,C.ink);r(q,x-15,355,30,26,C.stone);
   r(q,x-25,344,51,13,C.stoneLight);
   poly(q,[[x-18,343],[x-17,326],[x-5,308],
     [x+1,319],[x+11,299],[x+19,338]],C.water);
   poly(q,[[x-9,341],[x-5,323],[x+4,319],[x+9,340]],C.waterLight);
  }
  r(q,0,539,1536,13,C.stoneLight);r(q,0,553,1536,10,C.ink);
 });
 const foreground=canvas(1024,160,q=>{
  // Lower pixel stone balustrade and flower boxes (no character silhouettes).
  r(q,0,112,1024,48,C.ink);r(q,0,116,1024,39,C.stone);
  r(q,0,104,1024,13,C.stoneLight);
  for(let i=0;i<33;i++){
   const x=i*32;
   r(q,x,105,6,55,C.ink);r(q,x+3,109,4,47,C.stoneDark);
   if(i%3===0)flowers(q,x+19,115);
  }
 });
 function plane(c,w,h,x,y,z,rot=0){
  const texture=mkTex(c);SCENIC_TEXTURES.push(texture);
  const mesh=new THREE.Mesh(new THREE.PlaneGeometry(w,h),
    new THREE.MeshBasicMaterial({map:texture,transparent:true,alphaTest:.01,side:THREE.DoubleSide,
      depthWrite:false,toneMapped:false,fog:false}));
  mesh.position.set(x,y,z);mesh.rotation.y=rot;scene.add(mesh);return mesh;
 }
 // Capas situadas para la nueva proyección ortográfica, sin fuga de perspectiva.
 // La vista es fija: las capas se muestran completas sin mover la cámara.
 // El conjunto está compacto: edificio + escaleras + gradas junto al borde norte.
 // Capas paralelas, misma escala de lectura y sin bloques dispersos.
 plane(sky,117,62,0,-12,-56);
 plane(caldera,102,48,0,0,-44);
 plane(tribune,91,29,0,11.5,-28);
 // Side gardens are decor, not old stands. Keep outside the gameplay perimeter.
 const garden=canvas(256,192,q=>{
  r(q,0,164,256,28,C.stoneDark);
  r(q,0,158,256,8,C.stoneLight);
  for(let i=0;i<4;i++)tree(q,36+i*67,166,.38+(i%2)*.11);
  for(let i=0;i<8;i++)flowers(q,17+i*31,169);
 });
 // Sin paneles laterales rotados ni baranda lejana: rompían la composición.
 // El jardín está pintado dentro de las terrazas centrales, unido al estadio.
 // Plazoleta lateral: piezas pixel-art genuinas con sombras, jardineras y pequeños movimientos.
 // Todo se coloca fuera de los límites físicos de la cancha (|x| > HX o z > HZ).
 const life=[];
 function decorSprite(c,w,h,x,y,z,opt={}){
  const texture=mkTex(c);SCENIC_TEXTURES.push(texture);
  const material=new THREE.MeshBasicMaterial({map:texture,transparent:true,alphaTest:.08,
   side:THREE.DoubleSide,depthWrite:false,toneMapped:false,fog:false});
  const mesh=new THREE.Mesh(new THREE.PlaneGeometry(w,h),material);
  mesh.position.set(x,y,z);mesh.renderOrder=opt.order||2;scene.add(mesh);
  return mesh;
 }
 const plantTex=canvas(128,104,q=>{
  // Piedra y cerámica con vegetación en capas.
  r(q,8,83,113,9,'rgba(52,62,77,.28)');
  r(q,14,57,101,27,C.ink);r(q,19,59,91,21,C.stone);
  r(q,16,54,96,9,C.stoneLight);r(q,24,77,84,5,C.stoneDark);
  for(let j=0;j<13;j++){
   const x=21+j*7;
   r(q,x,45-(j%4)*4,11,14,j%3===0?C.treeDark:j%2?C.tree:C.treeLight);
   r(q,x+3,41-(j%3)*7,7,8,j%4===0?C.flower2:j%3===0?C.flower:'#f6a5c4');
   r(q,x+5,38-(j%3)*7,3,3,C.stoneLight);
  }
  r(q,38,64,9,2,'rgba(255,249,219,.42)');r(q,76,69,13,2,'rgba(255,249,219,.35)');
 });
 const bushTex=canvas(96,82,q=>{
  r(q,9,72,77,6,'rgba(52,62,77,.20)');
  for(let i=0;i<11;i++){
   const x=15+i*6,y=39+(i%3)*5;
   r(q,x,y,17,32,i%3===0?C.treeDark:i%2?C.tree:C.treeLight);
   r(q,x+3,y-6,12,12,i%2?'#a6d477':'#67b687');
   if(i%2===0)r(q,x+7,y-10,5,6,i%4?C.flower:C.flower2);
  }
 });
 const lampTex=canvas(72,148,q=>{
  r(q,29,135,21,7,'rgba(52,62,77,.23)');
  r(q,32,45,9,93,C.ink);r(q,35,48,4,86,C.wood);
  r(q,20,28,34,28,C.ink);r(q,24,33,26,20,'#f4ce85');
  r(q,29,35,15,16,'#fff0b4');r(q,18,27,38,6,C.stoneLight);
  r(q,27,19,22,9,C.ink);r(q,32,14,12,7,C.roofDark);
  r(q,26,54,24,4,C.stoneDark);
 });
 const pennantTex=canvas(92,128,q=>{
  r(q,20,12,6,110,C.ink);r(q,22,13,3,107,C.wood);
  poly(q,[[26,20],[80,25],[73,78],[55,95],[29,78]],C.ink);
  poly(q,[[29,24],[76,29],[70,75],[55,89],[32,74]],C.banner);
  r(q,38,34,27,5,C.waterLight);r(q,41,48,20,4,C.stoneLight);
  circle(q,52,64,8,C.stoneLight);circle(q,52,64,4,C.roofDark);
 });
 const benchTex=canvas(112,75,q=>{
  r(q,9,65,94,5,'rgba(52,62,77,.24)');
  r(q,18,14,78,29,C.ink);r(q,23,17,68,21,C.wood);
  for(let i=0;i<3;i++)r(q,26,20+i*6,62,3,i===1?C.woodLight:C.stoneDark);
  r(q,12,44,88,12,C.ink);r(q,18,46,76,7,C.woodLight);
  r(q,23,53,8,14,C.ink);r(q,82,53,8,14,C.ink);
 });
 const decorShadowMat=new THREE.MeshBasicMaterial({color:0x59455e,transparent:true,opacity:.15,depthWrite:false});
 function sideObject(tex,w,h,x,z,yOff=0,animate=false){
  const shadow=new THREE.Mesh(new THREE.CircleGeometry(w*.43,12),decorShadowMat);
  shadow.rotation.x=-Math.PI/2;shadow.position.set(x,.025,z);scene.add(shadow);
  const m=decorSprite(tex,w,h,x,h/2+yOff,z);
  if(animate)life.push({mesh:m,baseX:x,baseY:h/2+yOff,phase:rand()*6.28,amp:.035+rand()*.05});
  return m;
 }
 // Bordes en ambos costados. No se ponen objetos detrás de las porterías.
 for(const side of [-1,1]){
  const x=side*(HX+5.4);
  for(const z of [-15.7,-8.5,8.5,15.7])sideObject(plantTex,5,3.7,x,z);
  sideObject(benchTex,4.6,2.8,x,-2);
  sideObject(bushTex,3.6,2.8,side*(HX+7),-12.5);
  sideObject(bushTex,3.4,2.5,side*(HX+7),12.5);
  const lamp=sideObject(lampTex,2.6,5.1,side*(HX+7),3);
  life.push({mesh:lamp,phase:rand()*6.28,lamp:true});
  sideObject(pennantTex,3.2,4.4,side*(HX+7.2),-5.7,0,true);
 }
 // El borde cercano funciona como una plaza transitada, sin cruzar la línea lateral.
 for(const x of [-23,-13,13,23]){
  sideObject(plantTex,4.4,3.1,x,HZ+3.8);
 }
 for(const x of [-28,28])sideObject(pennantTex,2.8,3.9,x,HZ+4.5,0,true);
 // Luciérnagas de la plaza al atardecer: parpadeo mínimo, sin partículas sobre el campo.
 const glows=[];
 const glowTexture=mkTex(canvas(32,32,q=>{
  for(let k=5;k>=1;k--)circle(q,16,16,k*3,k>3?'rgba(255,220,125,.06)':k>1?'rgba(255,234,145,.15)':'rgba(255,252,217,.6)');
 }));
 SCENIC_TEXTURES.push(glowTexture);
 for(const side of [-1,1])for(const z of [-13,2,13]){
  const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:glowTexture,transparent:true,
   opacity:.37,depthWrite:false,blending:THREE.AdditiveBlending}));
  const bx=side*(HX+5.7),by=2.3+rand()*1.7;
  sp.position.set(bx,by,z);sp.scale.set(1.3,1.3,1);scene.add(sp);
  glows.push({sp,bx,by,bz:z,phase:rand()*6.28});
 }
 scene.userData.pmdTick=(dt,t)=>{
  const tm=t*.001;
  for(const a of life){
   if(a.lamp)continue;
   a.mesh.position.x=a.baseX+Math.sin(tm*1.2+a.phase)*a.amp;
   a.mesh.position.y=a.baseY+Math.cos(tm*1.1+a.phase)*.025;
  }
  for(const a of glows){
   a.sp.position.x=a.bx+Math.sin(tm*.65+a.phase)*.45;
   a.sp.position.y=a.by+Math.sin(tm*.85+a.phase)*.32;
   a.sp.material.opacity=.15+.22*(.5+.5*Math.sin(tm*2+a.phase));
  }
 };
 // Small pixel-art goal frames, not the former mesh, using existing goal dimensions.
 const goalTex=canvas(64,64,q=>{
  for(let y=0;y<64;y+=8)for(let x=0;x<64;x+=8){
   r(q,x,y,1,8,'#c5b0a0');r(q,x,y,8,1,'#fff4e7');
  }
 });
 const netTexture=mkTex(goalTex);netTexture.wrapS=netTexture.wrapT=THREE.RepeatWrapping;netTexture.repeat.set(3,2);
 SCENIC_TEXTURES.push(netTexture);
 const postMat=new THREE.MeshBasicMaterial({color:0xfbf2e5});
 const shadowMat=new THREE.MeshBasicMaterial({color:0x63788d});
 for(const side of [-1,1]){
  for(const zz of [-GW,GW]){
   const post=new THREE.Mesh(new THREE.BoxGeometry(.36,3.6,.4),shadowMat);
   post.position.set(side*HX,1.8,zz);scene.add(post);
   const light=new THREE.Mesh(new THREE.BoxGeometry(.24,3.49,.41),postMat);
   light.position.set(side*HX-side*.14,1.8,zz);scene.add(light);
  }
  const cross=new THREE.Mesh(new THREE.BoxGeometry(.38,.38,GW*2+.2),postMat);
  cross.position.set(side*HX,3.6,0);scene.add(cross);
  const net=new THREE.Mesh(new THREE.PlaneGeometry(GW*2,3.6),
    new THREE.MeshBasicMaterial({map:netTexture,transparent:true,opacity:.9,side:THREE.DoubleSide,depthWrite:false}));
  net.rotation.y=Math.PI/2;net.position.set(side*(HX+2.25),1.8,0);scene.add(net);
 }
 // PORTERÍAS CENITALES: geometría visual de alto contraste para la cámara superior.
 // No cambia ni portería lógica ni colisiones.
 const goalWhite=new THREE.MeshBasicMaterial({color:0xfff6de,depthTest:false,depthWrite:false});
 const goalDark=new THREE.MeshBasicMaterial({color:0x34465f,depthTest:false,depthWrite:false});
 const goalGrid=new THREE.MeshBasicMaterial({color:0xc7e7e8,transparent:true,opacity:.65,depthTest:false,depthWrite:false});
 const goalAccent=[
  new THREE.MeshBasicMaterial({color:0xf48a78,depthTest:false,depthWrite:false}),
  new THREE.MeshBasicMaterial({color:0x63bde9,depthTest:false,depthWrite:false})
 ];
 function goalMark(x,z,w,d,mat,y=.09){
  const m=new THREE.Mesh(new THREE.BoxGeometry(w,.015,d),mat);
  m.position.set(x,y,z);m.renderOrder=10;scene.add(m);
 }
 for(const side of [-1,1]){
  const far=side*(HX+2.65),near=side*(HX+.10);
  const accent=goalAccent[side<0?0:1];
  goalMark(side*(HX+1.37),0,2.52,GW*2+.7,goalDark,.061);
  goalMark(far,0,.30,GW*2+.9,goalWhite,.105);
  for(const zz of [-GW-.45,GW+.45]){
   goalMark(side*(HX+1.32),zz,2.95,.33,goalWhite,.108);
   goalMark(side*(HX+1.32),zz,2.48,.12,accent,.116);
  }
  for(let zi=-GW+.35;zi<GW;zi+=.75)goalMark(side*(HX+1.4),zi,2.3,.055,goalGrid,.088);
  for(let xx=.45;xx<2.6;xx+=.53)goalMark(side*(HX+xx),0,.055,GW*2-.12,goalGrid,.088);
  goalMark(near,0,.35,GW*2+.65,goalWhite,.128);
  goalMark(near+side*.22,0,.11,GW*2-.22,accent,.137);
  for(const zz of [-GW,GW])goalMark(side*(HX+.07),zz,.54,.54,accent,.148);
 }
 return scene;
}

// Banquillos también rediseñados desde cero. Sus Pokémon los carga el juego.
function buildBench(o){
 const {THREE,dugG,centerX,frontZ,backZ,name,color,subs,maxSubs}=o;
 const shade=(k)=>{const c=new THREE.Color(color);c.multiplyScalar(k);return '#'+c.getHexString()};
 const team=shade(1),lite=shade(1.43),dark=shade(.53);
 const ink='#332941',wall='#9f8691',wood='#695364',woodLight='#d7b5ab';
 const canvas=(w,h,fn)=>{let c=document.createElement('canvas');c.width=w;c.height=h;const q=c.getContext('2d');q.imageSmoothingEnabled=false;fn(q,w,h);return c};
 const fill=(q,x,y,w,h,col)=>{q.fillStyle=col;q.fillRect(x,y,w,h)};
 const t=(c)=>{
  const v=new THREE.CanvasTexture(c);v.encoding=THREE.sRGBEncoding;
  v.magFilter=v.minFilter=THREE.NearestFilter;v.generateMipmaps=false;
  return v;
 };
 const front=canvas(256,116,(q)=>{
  fill(q,0,0,256,116,ink);fill(q,5,5,246,105,wall);
  for(let y=10;y<112;y+=14){fill(q,6,y,244,3,woodLight);for(let x=12+(y%28?10:0);x<255;x+=33)fill(q,x,y+3,2,9,wood);}
  fill(q,0,105,256,11,wood);fill(q,0,105,256,4,woodLight);
  // Central open arch — occupants remain authentic sprites placed in 3D.
  fill(q,14,33,228,71,ink);fill(q,20,39,216,65,wood);
  for(let x=20;x<240;x+=13)fill(q,x,39,3,65,shade(.31));
  fill(q,20,39,216,6,woodLight);
 });
 const roof=canvas(512,96,(q)=>{
  fill(q,0,0,512,96,ink);fill(q,4,4,504,88,dark);
  for(let y=9;y<96;y+=22)for(let x=0;x<512;x+=29){
   fill(q,x+(y%44?12:0),y,26,19,team);
   fill(q,x+(y%44?12:0)+3,y+3,20,3,lite);
  }
  fill(q,0,84,512,12,ink);fill(q,0,84,512,5,lite);
 });
 const plaque=canvas(512,70,(q)=>{
  fill(q,0,0,512,70,ink);fill(q,7,6,498,57,dark);
  fill(q,14,12,484,45,team);fill(q,17,15,478,6,lite);
  q.fillStyle='#fff5df';q.textAlign='center';q.textBaseline='middle';
  q.font='bold 36px monospace';q.fillText(String(name).toUpperCase().slice(0,13),256,36);
  q.font='bold 11px monospace';q.fillText('BANQUILLO',64,55);
  q.fillText('CAMBIOS '+subs+'/'+maxSubs,432,55);
 });
 const texs=[t(front),t(roof),t(plaque)];
 const material=map=>new THREE.MeshBasicMaterial({map,side:THREE.DoubleSide,transparent:true,alphaTest:.01,depthWrite:false});
 const add=(w,h,x,y,z,tex,rotation=0)=>{
  const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),material(tex));
  m.position.set(x,y,z);m.rotation.y=rotation;m.userData.own=1;dugG.add(m);return m;
 };
 add(16.4,6.4,centerX,3.2,backZ+.15,texs[0]);
 add(17.9,3.25,centerX,6.0,frontZ-.5,texs[1]);
 add(15.5,1.5,centerX,6.45,frontZ+.05,texs[2]);
 // Supports and wooden benches, all freshly textured.
 const woodTex=t(canvas(64,64,q=>{
  fill(q,0,0,64,64,wood);for(let y=0;y<64;y+=16){
   fill(q,0,y,64,4,woodLight);fill(q,0,y+15,64,2,ink);
   for(let x=0;x<64;x+=21)fill(q,x+(y%32?9:0),y+4,3,10,'#755346');
  }
 }));
 texs.push(woodTex);
 const pillar=(x)=>{
  const m=new THREE.Mesh(new THREE.BoxGeometry(.38,6.15,.4),new THREE.MeshBasicMaterial({map:woodTex}));
  m.position.set(x,3.1,frontZ-.45);m.userData.own=1;dugG.add(m);
 };
 pillar(centerX-8.2);pillar(centerX+8.2);
 add(12.5,.75,centerX+1,1.18,backZ+1.7,woodTex);
 add(12.5,1.1,centerX+1,.65,backZ+1.85,woodTex);
 return texs;
}

global.PMD_VOLCANO={build,buildBench};
})(window);
