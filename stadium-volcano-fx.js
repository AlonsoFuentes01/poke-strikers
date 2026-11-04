/* Poké Strikers · Estadio Volcán · Lava viva.
 * flow_loop: 8 cuadros / 6 FPS
 * bubble_pop: 8 cuadros / 12 FPS, apariciones aleatorias
 * steam_loop: 8 cuadros / 6 FPS, nace de los estallidos y respiraderos
 * Las texturas se dibujan una vez en Canvas 2D con la paleta de los sprites
 * aprobados y se usan SOLO fuera de los límites de la cancha.
 */
(function(global){
'use strict';
const TAU=Math.PI*2;
function build(opts){
 const {THREE,scene,HX,HZ,SCENIC_TEXTURES}=opts;
 const fx=new THREE.Group();fx.name='VOLCAN_LAVA_FLOW_BUBBLES_STEAM';scene.add(fx);
 const tex=[];
 let seed=87321;
 const rnd=()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646};
 const box=(q,x,y,w,h,c)=>{q.fillStyle=c;q.fillRect(Math.round(x),Math.round(y),Math.ceil(w),Math.ceil(h));};
 const circle=(q,x,y,r,c)=>{q.fillStyle=c;q.beginPath();q.arc(x,y,r,0,TAU);q.fill();};
 function makeTex(w,h,draw){
  const cv=document.createElement('canvas');cv.width=w;cv.height=h;
  const q=cv.getContext('2d');q.imageSmoothingEnabled=false;draw(q,w,h);
  const t=new THREE.CanvasTexture(cv);t.encoding=THREE.sRGBEncoding;
  t.magFilter=t.minFilter=THREE.NearestFilter;
  t.generateMipmaps=false;t.wrapS=t.wrapT=THREE.ClampToEdgeWrapping;
  SCENIC_TEXTURES.push(t);tex.push(t);return t;
 }
 // PALETA DE LAS LÁMINAS APROBADAS: basalto violeta, naranja y magma claro.
 const C={outline:'#30253e',rock:'#5a415a',rockHi:'#9d7888',
  dark:'#9f3448',red:'#dc4a36',orange:'#f36a2f',hot:'#ff9436',
  yellow:'#ffc45a',white:'#ffe4a1',smoke:'#a48ba8',smokeDark:'#695771'};
 function lavaFrame(frame){
  return makeTex(128,72,(q,w,h)=>{
   // Los bordes son roca permanente, mientras el magma de dentro se mueve.
   box(q,0,0,w,h,C.outline);
   box(q,2,10,w-4,h-20,C.dark);
   for(let i=0;i<20;i++){
    const cx=i*8-12,up=2+(i%4)*2,down=64-(i%3)*3;
    box(q,cx,0,11,up+6,C.rock);
    box(q,cx+2,2,8,2,C.rockHi);
    box(q,cx,down,13,72-down,C.rock);
    box(q,cx+2,down,9,2,C.rockHi);
   }
   // Bandas curvadas de magma con desplazamiento cíclico exacto.
   // Cuatro sistemas de corriente, cada uno con grosor y velocidad distinta.
   for(let k=0;k<5;k++){
    const baseY=19+k*9;
    for(let x=-3;x<w+3;x+=2){
     const u=(x/128*TAU+frame/8*TAU);
     const y=baseY+Math.sin(u+(k*1.34))*3+Math.sin(u*2-k*.7)*1.9;
     box(q,x,y,3,6,k%2?C.red:C.orange);
     box(q,x,y+1,3,2,k%2?C.hot:C.yellow);
     if(k%3===0)box(q,x,y+2,2,1,C.white);
    }
   }
   // Pequeños afloramientos que no saltan de fotograma a fotograma.
   for(let i=0;i<13;i++){
    const xx=(i*37+13)%124+2,yy=19+(i*13)%33;
    circle(q,xx,yy,2+i%2,C.hot);
    box(q,xx-1,yy-1,2,1,C.white);
   }
   for(const [x,y,wv] of [[21,34,12],[91,30,10],[65,45,11]]){
    const drift=Math.sin((frame/8)*TAU+x)*2;
    box(q,x-wv/2,y+drift,wv,3,C.red);
    box(q,x-wv/2+2,y+drift-2,wv*.6,2,C.hot);
   }
  });
 }
 function bubbleFrame(n){
  return makeTex(96,96,q=>{
   if(n===7)return;
   const cx=48,base=70;
   // Aro de expansión, siempre anclado al mismo lugar.
   circle(q,cx,base,26+n*.5,C.red);
   circle(q,cx,base,21+n*.55,C.hot);
   circle(q,cx,base,16+n*.6,C.orange);
   circle(q,cx,base,12+n*.8,C.red);
   if(n<3){
    const radius=7+n*8;
    circle(q,cx,base-5-n*4,radius,C.outline);
    circle(q,cx,base-7-n*4,radius-3,C.red);
    circle(q,cx,base-9-n*4,radius-5,C.hot);
    circle(q,cx-radius*.42,base-13-n*4,Math.max(2,radius*.19),C.white);
   }else if(n<6){
    const splash=n-3;
    // Corona de magma en cuatro brazos, como los cuadros diseñados.
    for(let k=0;k<7;k++){
     const ang=Math.PI+(k/6)*Math.PI;
     const reach=23+splash*7;
     const xx=cx+Math.cos(ang)*reach,yy=base-6+Math.sin(ang)*reach;
     box(q,xx-4,yy-5,8,10,C.orange);
     box(q,xx-2,yy-6,4,5,C.yellow);
     if(k%2===0)circle(q,xx,yy-8,3,C.hot);
    }
    circle(q,cx,base-9,20-splash*4,C.yellow);
   }else{
    circle(q,cx,base,20,C.orange);
    circle(q,cx,base,14,C.red);
    circle(q,cx,base,8,C.hot);
   }
  });
 }
 function steamFrame(n){
  return makeTex(96,120,q=>{
   const progress=n/8,cy=96-progress*42;
   // Transparent clouds at the top; no dark rectangle or white background.
   const layers=[
    [48,cy+8,16],[38+Math.sin(progress*TAU)*8,cy-10,16+progress*4],
    [54-Math.sin(progress*TAU)*7,cy-26,19],[46+Math.cos(progress*TAU)*7,cy-40,12+progress*7]
   ];
   for(let i=0;i<layers.length;i++){
    const [x,y,r]=layers[i];
    circle(q,x+2,y+3,r+3,'rgba(61,39,67,.22)');
    circle(q,x,y,r,'rgba(151,122,154,.29)');
    circle(q,x-4,y-5,r*.65,'rgba(196,169,185,.23)');
    circle(q,x+3,y-9,r*.35,'rgba(255,215,167,.17)');
   }
   for(let i=0;i<9;i++){
    const x=48+Math.sin((i+n*.45)*2.1)*21,y=110-i*9-progress*17;
    box(q,x,y,2+i%3,2+i%2,'rgba(185,158,173,.35)');
   }
  });
 }
 const flowFrames=Array.from({length:8},(_,i)=>lavaFrame(i));
 const bubbleFrames=Array.from({length:8},(_,i)=>bubbleFrame(i));
 const steamFrames=Array.from({length:8},(_,i)=>steamFrame(i));
 const surfaceMaterial=frame=>new THREE.MeshBasicMaterial({
  map:frame,transparent:true,alphaTest:.018,side:THREE.DoubleSide,
  depthWrite:false,depthTest:true,toneMapped:false,fog:false});
 const flowParts=[];
 const channels=[
  {x:-(HX+4.8),z:-8.5,w:6.2,d:11},
  {x:HX+4.8,z:8.5,w:6.2,d:11},
  {x:-(HX+4.8),z:9,w:6.2,d:11},
  {x:HX+4.8,z:-9,w:6.2,d:11},
  {x:-19,z:HZ+3.8,w:18,d:4.7},
  {x:19,z:HZ+3.8,w:18,d:4.7},
  {x:-18,z:-(HZ+4.0),w:17,d:4.3},
  {x:18,z:-(HZ+4.0),w:17,d:4.3}
 ];
 for(let i=0;i<channels.length;i++){
  const c=channels[i];
  const mesh=new THREE.Mesh(new THREE.PlaneGeometry(c.w,c.d),surfaceMaterial(flowFrames[i%8]));
  mesh.rotation.x=-Math.PI/2;mesh.position.set(c.x,.055,c.z);
  mesh.renderOrder=1;fx.add(mesh);
  flowParts.push({mesh,offset:i%8});
 }
 function effectMesh(frames,w,h,horizontal=true){
  // El vapor mira siempre hacia la cámara; se ve tanto en intro como cenital.
  const mesh=horizontal?
   new THREE.Mesh(new THREE.PlaneGeometry(w,h),surfaceMaterial(frames[0])):
   new THREE.Sprite(new THREE.SpriteMaterial({
    map:frames[0],transparent:true,alphaTest:.018,depthWrite:false,
    depthTest:true,opacity:.64}));
  if(horizontal)mesh.rotation.x=-Math.PI/2;
  else mesh.scale.set(w,h,1);
  mesh.visible=false;mesh.renderOrder=4;fx.add(mesh);return mesh;
 }
 // Burbujas de escala distinta, siempre al nivel del magma.
 const bubbles=Array.from({length:7},()=>({
  mesh:effectMesh(bubbleFrames,3.2,3.2),time:0,active:false,phase:0,x:0,z:0
 }));
 // Vapor en un plano vertical. No cubre los jugadores ni se forma en la cancha.
 const clouds=Array.from({length:9},()=>({
  mesh:effectMesh(steamFrames,3.0,4.6,false),time:0,active:false,
  x:0,y:0,z:0,seed:rnd()*TAU
 }));
 function spawnSteam(x,z,size=1){
  const s=clouds.find(v=>!v.active);if(!s)return;
  s.active=true;s.time=0;s.x=x;s.y=2.1;s.z=z;
  s.mesh.visible=true;s.mesh.position.set(x,s.y,z);
  s.mesh.scale.setScalar(size);s.mesh.material.opacity=.64;
 }
 function pop(){
  const b=bubbles.find(e=>!e.active);if(!b)return;
  const c=channels[Math.floor(rnd()*channels.length)];
  const x=c.x+(rnd()-.5)*c.w*.60,z=c.z+(rnd()-.5)*c.d*.52;
  b.x=x;b.z=z;b.time=0;b.active=true;b.phase=0;
  b.mesh.visible=true;
  b.mesh.position.set(x,.13,z);
  const scale=.70+rnd()*.58;b.mesh.scale.setScalar(scale);
 }

 // Mini-erupciones meteoríticas FUERA de la cancha: ambientación puramente
 // visual, sin tocar jugadores, balón, goles o red. Mismo sombreado del basalto.
 const stoneTex=makeTex(64,64,q=>{
  box(q,8,47,48,12,C.outline);
  const poly=(pts,col)=>{q.fillStyle=col;q.beginPath();q.moveTo(pts[0][0],pts[0][1]);
    for(let i=1;i<pts.length;i++)q.lineTo(pts[i][0],pts[i][1]);
    q.closePath();q.fill();};
  poly([[7,45],[13,18],[24,9],[45,12],[58,30],[55,49],[42,58],[17,55]],C.outline);
  poly([[13,43],[17,22],[25,15],[42,17],[49,30],[45,47],[30,53],[17,50]],C.rock);
  poly([[19,24],[25,16],[41,19],[33,27]],C.rockHi);
  poly([[40,27],[46,33],[41,46],[30,52]],C.dark);
  poly([[22,39],[27,35],[31,46],[33,54],[29,53],[26,44],[20,43]],C.orange);
  box(q,25,38,3,9,C.hot);box(q,27,45,2,5,C.yellow);
 });
 const falling=[];
 for(let i=0;i<4;i++){
  const sp=new THREE.Sprite(new THREE.SpriteMaterial({
   map:stoneTex,transparent:true,alphaTest:.025,depthWrite:false,
   depthTest:true,fog:false}));
  sp.visible=false;sp.scale.set(2.3,2.3,1);sp.renderOrder=4;fx.add(sp);
  falling.push({sp,time:0,active:false,x:0,z:0,phase:rnd()*TAU});
 }
 function spawnDebris(){
  const free=falling.find(f=>!f.active);if(!free)return;
  free.active=true;free.time=0;
  const side=rnd()<.5?-1:1;
  free.x=side*(HX+7.1+rnd()*4.7);
  free.z=(rnd()-.5)*HZ*1.8;
  free.sp.position.set(free.x,16+rnd()*4,free.z);
  const scale=1.4+rnd()*1.1;
  free.sp.scale.set(scale,scale,1);free.sp.visible=true;
  free.sp.material.opacity=1;
 }
 let rockTimer=6+rnd()*5;

 let clock=0,elapsed=0,spawnTimer=.5,flowIndex=-1;
 function tick(dt,t){
  // dt está en segundos; t es el timestamp en ms del bucle del estadio.
  // Micro-erupciones detrás de las líneas de banda, nunca en el campo.
  rockTimer-=Math.min(.10,Math.max(0,dt));
  if(rockTimer<=0){spawnDebris();rockTimer=7+rnd()*7;}
  for(const rock of falling){
   if(!rock.active)continue;
   rock.time+=Math.min(.10,Math.max(0,dt));
   const p=Math.min(1,rock.time/.88);
   rock.sp.position.set(rock.x,Math.max(.9,17*(1-p*p)+.9),rock.z);
   rock.sp.material.rotation=Math.sin(p*8+rock.phase)*.20;
   if(p>=1){
    rock.sp.visible=false;rock.active=false;
    spawnSteam(rock.x,rock.z,1.1);
    const b=bubbles.find(e=>!e.active);
    if(b){
     b.x=rock.x;b.z=rock.z;b.time=.22;b.active=true;b.phase=2;
     b.mesh.visible=true;b.mesh.material.map=bubbleFrames[2];
     b.mesh.position.set(rock.x,.14,rock.z);b.mesh.scale.setScalar(1.0);
    }
   }
  }
  if(!(dt>0))return;
  const step=Math.min(.10,dt);
  clock+=step;elapsed+=step;spawnTimer-=step;
  const fi=Math.floor(clock*6)%8;
  if(fi!==flowIndex){
   flowIndex=fi;
   for(const p of flowParts)p.mesh.material.map=flowFrames[(fi+p.offset)%8];
  }
  if(spawnTimer<=0){
   pop();spawnTimer=.85+rnd()*1.5;
   // Un poco de vapor ambiental entre estallidos.
   if(rnd()<.26){
    const c=channels[Math.floor(rnd()*channels.length)];
    spawnSteam(c.x+(rnd()-.5)*c.w*.42,c.z+(rnd()-.5)*c.d*.4,.65);
   }
  }
  for(const b of bubbles){
   if(!b.active)continue;
   b.time+=step;
   const f=Math.min(7,Math.floor(b.time*12));
   if(f!==b.phase){b.phase=f;b.mesh.material.map=bubbleFrames[f];}
   if(b.time>.45&&!b.steam){
    spawnSteam(b.x,b.z,.65+rnd()*.38);b.steam=true;
   }
   if(b.time>=8/12){
    b.active=false;b.mesh.visible=false;b.steam=false;
    b.mesh.material.map=bubbleFrames[0];
   }
  }
  for(const s of clouds){
   if(!s.active)continue;
   s.time+=step;const frame=Math.floor(s.time*6)%8;
   if(s.frame!==frame){s.frame=frame;s.mesh.material.map=steamFrames[frame];}
   s.mesh.position.set(s.x+Math.sin(s.time*1.3+s.seed)*.19,
    s.y+s.time*.65,s.z);
   s.mesh.material.opacity=Math.max(0,.62*(1-s.time/2.1));
   if(s.time>=2.1){s.active=false;s.mesh.visible=false;s.frame=-1;}
  }
 }
 // Motor propio del Volcán. Sin eventos de red ni cambios en las colisiones.
 tick(0,0);
 return {tick,group:fx};
}
global.PMD_VOLCANO_FX={build};
})(window);
