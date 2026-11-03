/* Poké Strikers · VOLCÁN PMD — reconstrucción integral
 * Diseño aprobado: entrada central + alas/gradas laterales + primer plano,
 * todos ilustrados sobre la misma retícula de píxeles que Ciudad PMD.
 * La cancha usa una superficie de obsidiana aparte, sin cambiar su física.
 */
(function(global){
'use strict';
function build(o){
 const {THREE,cityG,HX,HZ,GW,apron,pitchMat,SCENIC_TEXTURES}=o;
 const scene=new THREE.Group();scene.name='ESTADIO_VOLCAN_PMD_REHECHO';cityG.add(scene);
 let seed=81721;function rand(){seed=(seed*16807)%2147483647;return(seed/2147483647);}
 const C={
  ink:'#30283e',dark:'#403248',stone:'#6e5867',stone2:'#836a75',light:'#b49793',
  shine:'#ddbbac',ash:'#493648',ash2:'#644354',lava:'#f26536',hot:'#ff9a43',
  core:'#ffd276',red:'#b94a4e',red2:'#dc6c5b',cream:'#fff1d8',
  sky:'#543c67',sky2:'#ae6475',mount:'#342c46'
 };
 const canvas=(w,h,draw)=>{const c=document.createElement('canvas');c.width=w;c.height=h;const q=c.getContext('2d');q.imageSmoothingEnabled=false;draw(q,w,h);return c;};
 const rect=(q,x,y,w,h,col)=>{q.fillStyle=col;q.fillRect(Math.round(x),Math.round(y),Math.ceil(w),Math.ceil(h));};
 const poly=(q,pts,col)=>{q.fillStyle=col;q.beginPath();q.moveTo(pts[0][0],pts[0][1]);for(let i=1;i<pts.length;i++)q.lineTo(pts[i][0],pts[i][1]);q.closePath();q.fill();};
 const circ=(q,x,y,r,col)=>{q.fillStyle=col;q.beginPath();q.arc(x,y,r,0,Math.PI*2);q.fill();};
 function mkTex(c){const t=new THREE.CanvasTexture(c);t.encoding=THREE.sRGBEncoding;t.magFilter=t.minFilter=THREE.NearestFilter;t.generateMipmaps=false;SCENIC_TEXTURES.push(t);return t;}
 function plane(img,w,h,x,y,z,parent=scene){
  const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({
   map:mkTex(img),transparent:true,alphaTest:.018,depthWrite:false,side:THREE.DoubleSide,toneMapped:false,fog:false
  }));
  m.position.set(x,y,z);parent.add(m);return m;
 }
 function bricks(q,x,y,w,h,scale=1){
  const bw=45*scale,bh=20*scale;
  for(let row=0;row<Math.ceil(h/bh);row++){
   const yy=y+row*bh;
   rect(q,x,yy,w,3*scale,C.ink);
   rect(q,x,yy+3*scale,w,2*scale,C.light);
   for(let xx=x-bw+(row%2)*bw*.5;xx<x+w;xx+=bw){
    const sx=Math.max(x,xx);if(sx>x+w)continue;
    rect(q,sx,yy+5*scale,3*scale,bh-5*scale,C.ink);
    if((row+Math.round(xx/bw))%4===0)rect(q,sx+8*scale,yy+8*scale,14*scale,2*scale,C.shine);
   }
  }
 }
 function cutArch(q,x,y,w,h,lit=false){
  rect(q,x-6,y+25,w+12,h-17,C.ink);
  poly(q,[[x-6,y+28],[x+5,y+5],[x+w*.23,y-5],[x+w*.5,y-14],
          [x+w*.77,y-5],[x+w-5,y+5],[x+w+6,y+28]],C.ink);
  rect(q,x+4,y+27,w-8,h-21,lit?'#8c3b3f':'#282233');
  poly(q,[[x+4,y+30],[x+13,y+11],[x+w*.5,y],[x+w-13,y+11],[x+w-4,y+30]],lit?'#9d4641':'#282233');
  if(lit){
   rect(q,x+12,y+35,w-24,h-40,C.lava);
   for(let i=0;i<5;i++)rect(q,x+16+i*(w-32)/5,y+41+(i%3)*7,4,h-47,C.hot);
   rect(q,x+w*.49,y+36,5,h-42,C.core);
  }
  rect(q,x-11,y+h-5,w+22,9,C.light);
  rect(q,x-13,y+h+3,w+26,6,C.ink);
 }
 function torch(q,x,y,s=1){
  rect(q,x-20*s,y+20*s,40*s,43*s,C.ink);
  rect(q,x-16*s,y+24*s,32*s,30*s,C.stone);
  rect(q,x-24*s,y+14*s,48*s,12*s,C.light);
  poly(q,[[x-17*s,y+15*s],[x-20*s,y-4*s],[x-5*s,y-24*s],
          [x+2*s,y-12*s],[x+10*s,y-39*s],[x+22*s,y-1*s],[x+15*s,y+15*s]],C.lava);
  poly(q,[[x-9*s,y+13*s],[x-5*s,y-6*s],[x+6*s,y-22*s],[x+13*s,y+12*s]],C.hot);
  poly(q,[[x-3*s,y+12*s],[x+3*s,y-9*s],[x+7*s,y+13*s]],C.core);
  rect(q,x-27*s,y+61*s,54*s,8*s,C.ink);
 }
 function banner(q,x,y,scale=1){
  const s=scale;
  rect(q,x-25*s,y,50*s,6*s,C.ink);rect(q,x-22*s,y+3*s,44*s,4*s,C.shine);
  poly(q,[[x-19*s,y+8*s],[x+19*s,y+8*s],[x+19*s,y+100*s],[x,y+121*s],[x-19*s,y+100*s]],C.ink);
  poly(q,[[x-14*s,y+13*s],[x+14*s,y+13*s],[x+14*s,y+95*s],[x,y+110*s],[x-14*s,y+95*s]],C.red);
  rect(q,x-11*s,y+25*s,22*s,4*s,C.shine);
  circ(q,x,y+62*s,12*s,C.cream);circ(q,x,y+62*s,7*s,C.red);
  rect(q,x-11*s,y+60*s,22*s,4*s,C.cream);circ(q,x,y+62*s,3*s,C.cream);
 }
 function lavaFall(q,x,y,w,h){
  rect(q,x-9,y-5,w+18,h+10,C.ink);rect(q,x,y,w,h,'#ac393f');
  for(let i=0;i<12;i++){
   const xx=x+3+i*(w-6)/12;
   rect(q,xx,y+(i%4)*5,4+rand()*3,h-(i%3)*11,i%3===0?C.hot:C.lava);
   if(i%3===0)rect(q,xx+1,y+9,2,h-18,C.core);
  }
  rect(q,x-9,y+h-4,w+18,10,C.hot);
  for(let i=0;i<8;i++)rect(q,x-12+rand()*(w+24),y+h+3+rand()*9,3+rand()*8,3,C.lava);
 }
 function crest(q,x,y,s=1){
  circ(q,x,y,26*s,C.ink);circ(q,x,y,21*s,C.shine);
  circ(q,x,y,16*s,C.red);circ(q,x,y,13*s,C.cream);
  rect(q,x-19*s,y-3*s,38*s,7*s,C.ink);
  circ(q,x,y,8*s,C.ink);circ(q,x,y,5*s,C.cream);
 }
 function tower(q,x,y,s=1){
  const w=121*s,h=285*s;
  rect(q,x-w/2,y,w,h,C.ink);
  rect(q,x-w/2+8*s,y+8*s,w-16*s,h-18*s,C.stone);
  bricks(q,x-w/2+10*s,y+19*s,w-20*s,h-28*s,s*.82);
  rect(q,x-w/2-13*s,y-20*s,w+26*s,25*s,C.ink);
  rect(q,x-w/2-9*s,y-17*s,w+18*s,17*s,C.light);
  for(let k=0;k<5;k++){
   rect(q,x-w/2-6*s+k*27*s,y-50*s,21*s,31*s,C.ink);
   rect(q,x-w/2-2*s+k*27*s,y-47*s,14*s,23*s,C.stone2);
  }
  for(const yy of [y+62*s,y+164*s]){
   cutArch(q,x-22*s,yy,44*s,56*s,true);
  }
  rect(q,x-w/2-10*s,y+h-11*s,w+20*s,17*s,C.ink);
  rect(q,x-w/2-5*s,y+h-8*s,w+10*s,6*s,C.shine);
 }
 function stairs(q,x,y,w,steps=9){
  for(let i=0;i<steps;i++){
   const ww=w+i*11,yy=y+i*14;
   rect(q,x-ww/2-7,yy+1,ww+14,18,C.ink);
   rect(q,x-ww/2,yy,ww,14,i%2?C.stone:C.stone2);
   rect(q,x-ww/2+3,yy+2,ww-6,3,C.shine);
   rect(q,x-ww/2+3,yy+11,ww-6,3,'#473746');
  }
  poly(q,[[x-w/2-20,y],[x-w/2-5,y],[x-w/2-5-steps*6,y+steps*14],
          [x-w/2-33-steps*6,y+steps*14]],C.light);
  poly(q,[[x+w/2+5,y],[x+w/2+20,y],[x+w/2+33+steps*6,y+steps*14],
          [x+w/2+5+steps*6,y+steps*14]],C.light);
 }
 function rock(q,x,y,s=1){
  poly(q,[[x-39*s,y+20*s],[x-30*s,y-23*s],[x-11*s,y-46*s],
          [x+16*s,y-35*s],[x+37*s,y-14*s],[x+46*s,y+18*s]],C.ink);
  poly(q,[[x-30*s,y+14*s],[x-25*s,y-21*s],[x-9*s,y-37*s],
          [x+9*s,y-26*s],[x+14*s,y+18*s]],C.stone);
  poly(q,[[x+10*s,y-29*s],[x+28*s,y-17*s],[x+36*s,y+13*s],
          [x+14*s,y+15*s]],C.stone2);
  rect(q,x-18*s,y-20*s,18*s,4*s,C.light);
  rect(q,x-41*s,y+19*s,87*s,7*s,C.ink);
 }
 function crystal(q,x,y,s=1){
  poly(q,[[x-16*s,y+14*s],[x-21*s,y-11*s],[x-7*s,y-42*s],
          [x+4*s,y-13*s],[x+4*s,y+16*s]],C.lava);
  poly(q,[[x-8*s,y+14*s],[x-7*s,y-29*s],[x+3*s,y-13*s],[x+12*s,y+15*s]],C.hot);
  poly(q,[[x+4*s,y+16*s],[x+16*s,y-19*s],[x+30*s,y-6*s],[x+28*s,y+16*s]],C.lava);
  rect(q,x-25*s,y+15*s,57*s,6*s,C.ink);
 }
 // Superficie independiente: mismos límites y marcas que Ciudad, temática volcánica.
 const paving=canvas(1024,614,q=>{
  rect(q,0,0,1024,614,'#493a4c');
  for(let row=0;row<25;row++){
   const yy=row*26,shift=(row%2)*33;
   for(let col=-1;col<17;col++){
    const xx=col*66+shift;
    const shades=['#554556','#5b4b5c','#645264','#514154','#5d4a5c'];
    rect(q,xx+2,yy+2,62,22,shades[Math.floor(rand()*shades.length)]);
    rect(q,xx+6,yy+4,48,2,'rgba(207,164,161,.13)');
    rect(q,xx+8+rand()*35,yy+14+rand()*5,9+rand()*11,2,'rgba(30,23,39,.20)');
   }
  }
  // Ríos finos de magma, no fajas brillantes que impidan leer la pelota.
  for(let k=0;k<36;k++){
   let x=rand()*1024,y=rand()*614;
   q.beginPath();q.moveTo(x,y);
   for(let j=0;j<4;j++){x+=8+rand()*26;y+=(rand()-.5)*30;q.lineTo(x,y);}
   q.strokeStyle='#342a41';q.lineWidth=6;q.stroke();
   q.strokeStyle=k%3===0?'#fa8d4a':'#c25741';q.lineWidth=2.3;q.stroke();
   if(k%3===0){q.strokeStyle='#ffbc69';q.lineWidth=.9;q.stroke();}
  }
 });
 const pitch=canvas(1024,614,q=>{
  q.drawImage(paving,0,0);
  q.strokeStyle=C.cream;q.lineWidth=6;
  q.strokeRect(10,10,1004,594);
  q.beginPath();q.moveTo(512,10);q.lineTo(512,604);q.stroke();
  q.strokeRect(10,168,164,278);q.strokeRect(850,168,164,278);
  q.strokeRect(10,237,55,140);q.strokeRect(959,237,55,140);
  q.beginPath();q.arc(512,307,88,0,Math.PI*2);q.stroke();
  circ(q,512,307,7,C.cream);
  circ(q,104,307,5,C.cream);circ(q,920,307,5,C.cream);
  crest(q,512,307,23/26);
 });
 if(pitchMat.map&&pitchMat.map.userData&&pitchMat.map.userData.pmdOwned)pitchMat.map.dispose();
 const pitchTex=mkTex(pitch);pitchTex.userData.pmdOwned=true;
 pitchMat.map=pitchTex;pitchMat.color.setHex(0xffffff);pitchMat.needsUpdate=true;
 if(apron.material.map&&apron.material.map.userData&&apron.material.map.userData.pmdOwned)apron.material.map.dispose();
 const apronTex=mkTex(paving);apronTex.userData.pmdOwned=true;
 apronTex.wrapS=apronTex.wrapT=THREE.RepeatWrapping;
 apronTex.repeat.set((HX*2+16)/(HX*2),(HZ*2+18)/(HZ*2));
 apron.material.map=apronTex;apron.material.color.setHex(0xffffff);
 apron.material.needsUpdate=true;apron.visible=true;
 // 1. Fondo ambiental: un volcán central y acantilados con cascadas.
 const sky=canvas(1536,640,q=>{
  const grad=q.createLinearGradient(0,0,0,640);
  grad.addColorStop(0,'#563a67');grad.addColorStop(.55,'#aa6278');grad.addColorStop(1,'#e59c80');
  q.fillStyle=grad;q.fillRect(0,0,1536,640);
  for(let i=0;i<48;i++){
   const x=rand()*1536,y=50+rand()*230;
   rect(q,x,y,46+rand()*130,8+rand()*13,i%2?'#74516d':'#8f5a70');
   rect(q,x+13,y-10,50+rand()*92,9,'#7c526a');
  }
  poly(q,[[0,575],[0,358],[114,300],[222,356],[329,278],[440,390],[590,320],
          [722,405],[854,329],[993,374],[1110,298],[1245,361],[1370,291],[1536,345],[1536,575]],'#43334c');
  poly(q,[[420,576],[548,402],[655,289],[709,184],[757,161],[815,204],[874,311],[1039,579]],C.mount);
  poly(q,[[539,567],[650,321],[711,200],[752,189],[789,251],[874,421],[922,566]],'#624457');
  poly(q,[[698,203],[719,189],[754,188],[788,212],[762,222],[722,222]],C.lava);
  poly(q,[[719,199],[744,193],[776,207],[754,212]],C.core);
  for(const side of [-1,1]){
   const xx=768+side*160;
   poly(q,[[xx,280],[xx-side*28,360],[xx-side*55,427],[xx-side*45,500]],'#772e3c');
   poly(q,[[xx,287],[xx-side*28,364],[xx-side*51,419],[xx-side*44,500]],C.lava);
   poly(q,[[xx-side*8,313],[xx-side*36,394],[xx-side*43,467]],C.hot);
  }
  for(const [x,y,w,h] of [[130,353,70,210],[1304,342,73,227]]){
   poly(q,[[x-80,540],[x-39,y-46],[x+w+35,y-55],[x+w+70,570]],'#362b41');
   lavaFall(q,x,y,w,h);
  }
 });
 plane(sky,174,58,0,-8,-62);
 // 2. Fachada central dibujada como un único conjunto detallado.
 const entrance=canvas(1536,650,q=>{
  // Detrás del templo hay terrazas de basalto: no bloques de geometría 3D.
  for(const side of [-1,1]){
   const center=768+side*590;
   for(let j=0;j<5;j++){
    const xx=center+side*j*46,top=230+j*26;
    rect(q,xx-52,top,115,420,C.ink);rect(q,xx-47,top+8,106,406,C.stone);
    bricks(q,xx-45,top+15,100,375,.9);
   }
  }
  // Muros laterales alineados a la fachada, con ladrillos a la misma escala.
  for(const [x,w] of [[0,470],[1066,470]]){
   rect(q,x,333,w,317,C.ink);rect(q,x+8,341,w-16,296,C.stone);
   bricks(q,x+10,344,w-20,292,.85);
   rect(q,x,320,w,18,C.ink);rect(q,x+5,324,w-10,10,C.light);
   for(let i=0;i<6;i++){
    const bx=x+12+i*(w-24)/6;
    rect(q,bx,297,40,26,C.ink);rect(q,bx+4,300,32,20,C.stone2);
   }
  }
  rect(q,436,252,664,398,C.ink);rect(q,445,260,646,381,C.stone);
  bricks(q,448,270,640,365,.9);
  poly(q,[[418,292],[465,248],[542,247],[597,211],[681,210],
          [711,163],[827,163],[857,210],[944,211],[992,247],[1066,248],[1119,292]],C.ink);
  poly(q,[[434,281],[482,251],[552,251],[604,219],[691,219],
          [716,176],[822,176],[850,219],[934,219],[981,251],[1054,251],[1101,281]],C.light);
  poly(q,[[454,278],[508,259],[583,259],[627,233],[705,231],
          [727,192],[807,192],[832,231],[910,233],[951,259],[1023,259],[1081,278]],C.stone2);
  rect(q,432,287,674,18,C.ink);rect(q,449,291,638,9,C.shine);
  tower(q,518,192,.82);tower(q,1018,192,.82);
  // Arco central luminoso y entradas laterales.
  cutArch(q,647,337,242,272,true);
  cutArch(q,562,407,67,123,true);cutArch(q,909,407,67,123,true);
  for(const xx of [635,901]){
   rect(q,xx-9,323,18,279,C.ink);rect(q,xx-5,326,10,269,C.light);
  }
  // Entrada con escalera monumental, profundamente escalonada en píxeles.
  stairs(q,768,509,210,10);
  crest(q,768,259,1.5);
  // Brillos y frontones laterales.
  for(const x of [464,1072]){
   banner(q,x,325,1.13);
   torch(q,x+((x<768)?66:-66),520,.88);
  }
  for(const x of [403,1133]){rock(q,x,588,1.27);crystal(q,x+(x<768?-34:32),622,1.0);}
  // Lámparas junto al acceso, visibles a escala cinematográfica.
  for(const x of [597,938])torch(q,x,524,.90);

  // Fachada ceremonial detallada, como los paneles de referencia aprobados.
  rect(q,575,99,386,80,C.ink);rect(q,584,108,368,64,C.light);
  rect(q,592,116,352,48,C.red);rect(q,598,122,340,36,'#633747');
  rect(q,600,123,336,4,C.hot);
  q.font='bold 40px monospace';q.textAlign='center';q.textBaseline='middle';
  q.lineWidth=5;q.strokeStyle=C.ink;q.strokeText('ESTADIO VOLCÁN',768,143,320);
  q.fillStyle=C.cream;q.fillText('ESTADIO VOLCÁN',768,143,320);
  // Torres auxiliares con almenas y hornacinas iluminadas.
  for(const side of [-1,1]){
   const x0=768+side*290;
   for(let i=0;i<5;i++){
    const x=x0+side*i*47;
    rect(q,x-17,234,35,45,C.ink);rect(q,x-12,241,25,35,C.stone2);
    rect(q,x-19,229,41,12,C.light);
    rect(q,x-7,250,14,21,i%2?C.lava:'#382838');
    if(i%2)rect(q,x-3,258,5,13,C.core);
   }
   // Cadenas de hierro en suspensión entre las torres.
   for(let i=0;i<12;i++){
    const u=i/11,x=768+side*(135+u*272),y=299+Math.sin(u*Math.PI)*42;
    q.lineWidth=8;q.strokeStyle=C.ink;
    q.beginPath();q.ellipse(x,y,8,5,side*.15,0,Math.PI*2);q.stroke();
    q.lineWidth=2.4;q.strokeStyle=C.shine;
    q.beginPath();q.ellipse(x,y,8,4,side*.15,0,Math.PI*2);q.stroke();
   }
   // Nichos tallados y pequeños retablos Poké Ball.
   const x=768+side*360;
   rect(q,x-32,397,64,116,C.ink);rect(q,x-27,402,54,103,C.stone2);
   bricks(q,x-25,408,50,89,.37);crest(q,x,459,.54);
   torch(q,x+side*64,430,.55);
   for(let j=0;j<32;j++){
    const xx=x+(rand()-.5)*200,yy=356+rand()*220;
    rect(q,xx,yy,3+rand()*13,2,j%4===0?C.shine:j%3===0?C.ink:C.stone2);
   }
  }
  // Portón con reja visible delante de las llamas y dintel decorado.
  for(let i=0;i<11;i++){
   const x=668+i*20;
   rect(q,x,392,6,178,'#332437');
   rect(q,x+2,396,2,164,'#836377');
   rect(q,x-2,413,10,7,C.shine);
  }
  rect(q,665,432,209,13,C.ink);rect(q,670,436,199,4,C.shine);
  rect(q,666,569,206,11,C.ink);
  // Friso de ventanas de fuego en la base de la fortaleza.
  for(const x of [461,494,527,1008,1041,1074]){
   rect(q,x-15,551,30,73,C.ink);rect(q,x-10,558,21,57,C.stone2);
   rect(q,x-7,566,15,43,C.lava);rect(q,x-3,574,7,27,C.hot);
   rect(q,x-18,546,37,10,C.light);
  }
  rect(q,0,631,1536,19,C.ink);rect(q,0,631,1536,6,C.light);
 });
 plane(entrance,106,45,0,3,-40);

 // 3. GRANDE TRIBUNA ILUSTRADA: tres filas de asientos verificables.
 // El público NO está dibujado en la textura: son sprites PMD del juego.
 const standPanel=(side)=>canvas(1088,920,q=>{
  const outer=side<0?85:1003,inner=side<0?1003:85;
  // Acantilado escalonado y línea de cumbres, lejos de las tribunas.
  poly(q,[[0,920],[0,281],[64,233],[103,172],[173,226],[257,140],
          [332,208],[414,158],[507,250],[591,179],[670,268],[751,206],
          [845,253],[923,207],[1014,250],[1088,207],[1088,920]],C.ink);
  poly(q,[[0,920],[0,301],[74,251],[117,189],[185,240],[264,167],
          [341,233],[424,178],[516,278],[587,207],[677,297],[748,237],
          [847,280],[932,234],[1023,282],[1088,247],[1088,920]],C.stone);
  for(let i=0;i<155;i++){
   const px=rand()*1088,py=210+rand()*620;
   rect(q,px,py,7+rand()*21,2+rand()*3,i%3===0?C.light:C.ash);
  }
  // Dos torres y arco alejados de la fila superior; forman la silueta del estadio.
  const outside=side<0?104:984,inside=side<0?962:126;
  tower(q,outside,228,.88);
  tower(q,inside,255,.66);
  // Columnas cortas y capitel, anexados a la fachada.
  for(const x of [215,871]){
   rect(q,x-29,268,58,278,C.ink);rect(q,x-22,279,44,262,C.stone2);
   bricks(q,x-18,281,38,253,.56);
   rect(q,x-34,256,68,26,C.ink);rect(q,x-29,261,58,14,C.light);
   rect(q,x-32,524,64,20,C.ink);
  }
  // Cascada de lava situada claramente entre las torres.
  lavaFall(q,side<0?155:841,296,84,297);
  // Tres graderías con peldaños, respaldos, divisores, arcos y zócalos.
  rect(q,166,368,763,525,C.ink);
  rect(q,176,379,743,497,C.stone);
  bricks(q,179,389,739,490,.74);
  for(let row=0;row<3;row++){
   const yy=402+row*143,stagger=row%2?22:0;
   // Plataforma sobresaliente bajo el público, resaltada como en Ciudad.
   rect(q,173,yy-20,754,19,C.ink);
   rect(q,179,yy-15,741,6,C.shine);
   rect(q,176,yy+91,749,20,C.ink);
   rect(q,178,yy+93,746,7,C.light);
   rect(q,182,yy+103,740,7,C.stone2);
   // Asientos distribuidos de forma exacta y sin personajes falsos.
   for(let seat=0;seat<16;seat++){
    const xx=196+seat*44+stagger;
    if(xx>889)continue;
    rect(q,xx,yy+14,31,30,C.ink);
    rect(q,xx+4,yy+19,23,20,'#58465c');
    rect(q,xx+3,yy+41,27,7,C.stone2);
    rect(q,xx+6,yy+23,18,3,'#8d7083');
   }
   // Arquería bajo los peldaños, con pequeñas ventanas de lava.
   for(let k=0;k<11;k++){
    const xx=193+k*67;
    rect(q,xx,yy+113,50,23,C.ink);
    rect(q,xx+5,yy+115,39,15,k%3===0?'#a84e42':'#504055');
    if(k%3===0)rect(q,xx+12,yy+117,18,10,C.hot);
   }
  }
  // Pasarela de servicio central y escaleras originales de las láminas aprobadas.
  const stairsX=side<0?844:246;
  stairs(q,stairsX,376,70,13);
  for(const x of [side<0?763:329,side<0?955:137]){
   rect(q,x-22,374,45,440,C.ink);
   rect(q,x-16,382,33,420,C.stone2);
   for(let yy=393;yy<797;yy+=57){
    rect(q,x-18,yy,38,7,C.ink);
    rect(q,x-15,yy+1,33,3,C.light);
   }
  }
  // Muro frontal, dos largos corredores y un remate con pilares ornamentados.
  rect(q,161,840,784,63,C.ink);
  rect(q,172,845,765,49,C.stone2);
  for(let x=187;x<937;x+=71){
   cutArch(q,x,855,39,25,true);
   rect(q,x-4,883,46,8,C.ink);
  }
  rect(q,152,818,798,31,C.ink);rect(q,159,822,785,11,C.shine);
  for(let x=162;x<943;x+=84){
   rect(q,x,788,34,48,C.ink);rect(q,x+6,796,22,36,C.stone);
   rect(q,x-4,784,43,12,C.light);
  }
  // Monumentos, banderas y braseros colocados en pilares, no sobre espectadores.
  banner(q,side<0?300:788,264,1.22);
  banner(q,side<0?948:140,553,.9);
  for(const [x,y,s] of [[side<0?140:948,585,1.15],[side<0?956:132,848,.95],
                         [side<0?346:742,345,.75]])torch(q,x,y,s);
  for(const x of [side<0?55:1033,side<0?324:760])rock(q,x,888,.85);
  crystal(q,side<0?78:1010,894,1.15);
  // Muro exterior lateral lleno de detalle en el fondo, no color plano.
  for(let j=0;j<20;j++){
   const x=12+j*55;
   rect(q,x,900,44,5,C.ink);
   if(j%3===0)rect(q,x+12,906,7,11,C.hot);
  }
 });
 // Las imágenes comparten el mismo tamaño lógico de pixel que la fachada.
 plane(standPanel(-1),44,32,-44.7,13.5,-32);
 plane(standPanel(1),44,32,44.7,13.5,-32);
 // Barandillas delante de los pies, por fila, con separación de Pokémon.
 const railArt=canvas(832,76,q=>{
  for(let y=0;y<76;y+=19){
   rect(q,0,y,832,19,y%38===0?C.stone:C.stone2);
   rect(q,0,y,832,3,C.light);
  }
  rect(q,0,28,832,20,C.ink);
  rect(q,0,30,832,7,C.shine);
  for(let i=0;i<23;i++){
   const x=i*39;
   rect(q,x,8,13,60,C.ink);
   rect(q,x+3,12,7,51,C.stone2);
   rect(q,x-4,0,19,12,C.light);
   if(i%4===0){
    rect(q,x+23,38,12,11,'#9d453f');rect(q,x+27,39,5,8,C.hot);
   }
  }
  rect(q,0,65,832,11,C.ink);rect(q,0,67,832,4,C.light);
 });
 for(const side of [-1,1]){
  for(const yy of [3.0,8.0,13.0]){
   const r=plane(railArt,31.7,1.35,side*41.2,yy,-26.15);
   r.renderOrder=4;r.material.depthTest=false;
  }
 }
 // 4. Edificaciones pequeñas y decoración cerca de las bandas, como Ciudad.
 const prop=canvas(128,152,q=>{
  rect(q,17,117,95,25,C.ink);rect(q,20,120,90,15,C.stone);
  rect(q,24,108,82,12,C.shine);
  for(let i=0;i<3;i++)rock(q,25+i*35,101,.35);
  crystal(q,37,120,.6);crystal(q,99,118,.46);
  banner(q,72,11,.66);
 });
 for(const side of [-1,1])for(const z of [-12,7]){
  plane(prop,5.2,6.3,side*(HX+6),3.15,z);
 }

 // Plaza exterior amplia y continua, para no mostrar el color vacío del cielo
 // por debajo y a ambos costados del campo durante la panorámica inclinada.
 const plazaGround=canvas(1024,1024,q=>{
  rect(q,0,0,1024,1024,'#4c3b4b');
  for(let row=0;row<46;row++){
   const yy=row*23,shift=row%2?31:0;
   for(let col=-1;col<18;col++){
    const xx=col*62+shift;
    rect(q,xx+2,yy+2,58,19,['#665061','#725767','#5a465a','#786071'][(row+col+12)%4]);
    rect(q,xx+3,yy+3,52,2,'#9c7a80');
    if((row*7+col)%5===0)rect(q,xx+9,yy+11,14,2,'#453544');
   }
  }
  // Vetas discontinuas incandescentes, no una cuadrícula uniforme.
  for(let i=0;i<54;i++){
   let x=rand()*1024,y=rand()*1024;
   q.beginPath();q.moveTo(x,y);
   for(let j=0;j<4;j++){x+=9+rand()*12;y+=(rand()-.5)*22;q.lineTo(x,y);}
   q.strokeStyle='#352636';q.lineWidth=4;q.stroke();
   q.strokeStyle=i%3?'#b64b3d':'#ed7c3e';q.lineWidth=1.7;q.stroke();
  }
 });
 const plazaTex=mkTex(plazaGround);plazaTex.wrapS=plazaTex.wrapT=THREE.RepeatWrapping;
 plazaTex.repeat.set(1.38,1.35);
 const plazaMesh=new THREE.Mesh(new THREE.PlaneGeometry(148,138),
  new THREE.MeshBasicMaterial({map:plazaTex,side:THREE.DoubleSide,depthWrite:true}));
 plazaMesh.rotation.x=-Math.PI/2;plazaMesh.position.set(0,-.085,8);
 scene.add(plazaMesh);
 // Muros de contención y lava dibujada alrededor, como piezas de escenario.
 const lavaChannel=canvas(512,96,q=>{
  rect(q,0,0,512,96,C.ink);rect(q,0,9,512,78,'#993b3a');
  for(let i=0;i<41;i++){
   const x=i*13,w=7+rand()*12,y=19+rand()*24;
   rect(q,x,y,w,46,C.lava);
   rect(q,x+2,y+9,w*.47,18,C.hot);
   if(i%4===0)rect(q,x+3,y+12,3,20,C.core);
  }
  rect(q,0,0,512,10,C.stone2);rect(q,0,83,512,12,C.ink);
 });
 const lavaTex=mkTex(lavaChannel);
 const lavaMat=new THREE.MeshBasicMaterial({map:lavaTex,side:THREE.DoubleSide});
 for(const z of [-25.5,26.5]){
  const m=new THREE.Mesh(new THREE.PlaneGeometry(92,3.2),lavaMat);
  m.rotation.x=-Math.PI/2;m.position.set(0,-.016,z);scene.add(m);
 }
 for(const x of [-38,38]){
  const m=new THREE.Mesh(new THREE.PlaneGeometry(3.0,56),lavaMat);
  m.rotation.x=-Math.PI/2;m.position.set(x,-.015,0);scene.add(m);
 }

 // 5. Primer plano ilustrado; se retira al terminar la cámara cinematográfica.
 const foreground=new THREE.Group();scene.add(foreground);
 const foregroundArt=canvas(1536,300,q=>{
  // Pared frontal baja, sin cortar el centro de la entrada.
  rect(q,0,153,1536,147,C.ink);rect(q,0,160,1536,132,C.stone);
  bricks(q,5,165,1526,119,.92);
  rect(q,0,144,1536,24,C.ink);rect(q,0,147,1536,12,C.shine);
  for(let i=0;i<21;i++){
   const x=i*77;
   rect(q,x,100,38,49,C.ink);rect(q,x+6,104,26,38,C.stone2);
   rect(q,x-6,96,51,12,C.light);
  }
  // Vista de la plaza inferior con grietas y escaleras ornamentales.
  for(let i=0;i<9;i++){
   const x=178+i*155;
   rect(q,x,176,40,4,C.ink);
   rect(q,x+11,180,4,45,C.lava);
   rect(q,x+14,200,2,27,C.hot);
  }
  crest(q,768,190,1.0);
  for(const x of [111,1425]){torch(q,x,117,1.18);}
  for(const x of [271,1265]){banner(q,x,146,.62);}
  for(const x of [35,1500])rock(q,x,257,1.15);
  for(const x of [183,1353])crystal(q,x,273,.85);
 });
 plane(foregroundArt,112,12,0,3.5,HZ+8,foreground);
 const embers=[];
 const emberTex=mkTex(canvas(32,32,q=>{
  rect(q,10,8,11,14,C.lava);rect(q,13,9,5,12,C.core);
 }));
 for(let i=0;i<24;i++){
  const m=new THREE.Sprite(new THREE.SpriteMaterial({map:emberTex,transparent:true,opacity:.6,depthWrite:false}));
  m.scale.set(.22+rand()*.3,.32+rand()*.38,1);
  const x=(rand()-.5)*109,y=.6+rand()*7,z=-39+rand()*68;
  m.position.set(x,y,z);scene.add(m);
  embers.push({m,x,y,z,phase:rand()*8,speed:.25+rand()*.7});
 }
 // 6. Porterías cenitales blancas y acentos de equipo: consistencia visual.
 const white=new THREE.MeshBasicMaterial({color:0xfff1dc,depthTest:false,depthWrite:false});
 const net=new THREE.MeshBasicMaterial({color:0xe1c9cb,transparent:true,opacity:.66,depthTest:false,depthWrite:false});
 const accents=[0xe85e5d,0x62bce7].map(color=>new THREE.MeshBasicMaterial({color,depthTest:false,depthWrite:false}));
 const mark=(x,z,w,d,mat,y=.12)=>{
  const m=new THREE.Mesh(new THREE.BoxGeometry(w,.014,d),mat);
  m.position.set(x,y,z);m.renderOrder=10;scene.add(m);
 };
 for(const side of [-1,1]){
  const accent=accents[side<0?0:1];
  const cx=side*(HX+1.34),far=side*(HX+2.65);
  mark(cx,0,2.7,GW*2+.7,net,.07);
  mark(far,0,.3,GW*2+.9,white,.108);
  mark(side*(HX+.1),0,.34,GW*2+.6,white,.128);
  for(const zz of [-GW-.45,GW+.45]){
   mark(cx,zz,2.95,.32,white,.12);
   mark(cx,zz,2.45,.11,accent,.14);
  }
  for(let z=-GW+.35;z<GW;z+=.75)mark(cx,z,2.4,.045,net,.087);
  for(let x=.5;x<2.6;x+=.5)mark(side*(HX+x),0,.055,GW*2,net,.087);
  mark(side*(HX+.35),0,.14,GW*2-.15,accent,.145);
 }
 scene.userData.pmdSetIntro=mix=>{
  // La cornisa frontal es un recurso de la intro, jamás tapa la cancha cenital.
  foreground.visible=mix<.64;
 };
 scene.userData.pmdTick=(dt,t)=>{
  for(const e of embers){
   const p=(t*.00014*e.speed+e.phase)%1;
   e.m.position.set(e.x+Math.sin(t*.0004+e.phase)*.55,e.y+p*6,e.z);
   e.m.material.opacity=.5*Math.sin(p*Math.PI);
  }
 };
 return scene;
}
global.PMD_VOLCANO={build};
})(window);
