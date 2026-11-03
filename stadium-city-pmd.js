/* Poké Strikers · Estadio Ciudad Mystery Dungeon · geometría y arte NUEVOS
 * Fase 1: escenario estático. No usa la ciudad, gradas ni decorados anteriores.
 * Los únicos personajes de la escena son los sprites Pokémon del juego y los
 * entrenadores oficiales de Pokémon Showdown colocados por el juego.
 */
(function(global){
'use strict';
function build(o){
 const {THREE,cityG,HX,HZ,GW,apron,pitchMat,SCENIC_TEXTURES}=o;
 const scene=new THREE.Group();scene.name='ESTADIO_CIUDAD_PMD_NUEVO';cityG.add(scene);
 let seed=18793;const rand=()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483647};
 const C={
  sky:'#75bafa',sky2:'#b8e4ff',cloud:'#fffaf0',cloudShadow:'#afd8ea',
  mountain:'#70b6a4',mountainShade:'#47968a',mountainLight:'#a2d4ae',
  ink:'#34465f',stone:'#e5c8a3',stoneLight:'#fae8c6',stoneDark:'#a77f80',
  roof:'#d36d59',roofLight:'#f29a72',roofDark:'#a74e53',banner:'#3b8dd1',
  tree:'#529e6f',treeLight:'#a6d477',treeDark:'#307c69',wood:'#8f695c',
  water:'#74c5de',waterLight:'#dcfbfa',field:'#c9b7a6',field2:'#b6a29b',
  marking:'#fff4e3',flower:'#f58dab',flower2:'#ffcf69'
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
  r(q,x-8*s,y-48*s,16*s,55*s,C.wood);
  for(const [dx,dy,rr] of [[-27,-67,26],[8,-90,32],[31,-63,25],[-2,-51,34]]){
   circle(q,x+dx*s+3*s,y+dy*s+5*s,rr*s,C.treeDark);
   circle(q,x+dx*s,y+dy*s,rr*s,rr>30?C.treeLight:C.tree);
  }
  for(let i=0;i<8;i++)r(q,x+(-40+rand()*82)*s,y+(-105+rand()*47)*s,6*s,3*s,C.mountainLight);
 }
 function flowers(q,x,y){
  r(q,x-15,y-7,30,9,C.ink);r(q,x-12,y-11,24,8,C.stone);r(q,x-9,y-18,18,8,C.tree);
  for(let j=0;j<5;j++){let xx=x-10+j*5;r(q,xx,y-24-(j%3)*3,7,6,j%2?C.flower:C.flower2);r(q,xx+2,y-26-(j%3)*3,2,3,C.stoneLight);}
 }
 function window(q,x,y,w=20,h=27){
  r(q,x-3,y-3,w+6,h+6,C.ink);r(q,x,y,w,h,C.water);
  r(q,x+3,y+3,6,h*.36,C.waterLight);r(q,x+w-4,y,4,h,C.ink);
  r(q,x,y+h-5,w,5,C.stoneLight);
 }
 function building(q,x,base,w,h,opt={}){
  const y=base-h;const roof=opt.roof||C.roof;
  r(q,x-5,y+6,w+10,h+3,C.ink);r(q,x,y,w,h,opt.wall||C.stone);
  poly(q,[[x-11,y+11],[x+12,y-16],[x+w-14,y-16],[x+w+12,y+11]],C.roofDark);
  poly(q,[[x-8,y+8],[x+15,y-15],[x+w-17,y-15],[x+w+8,y+8]],roof);
  r(q,x,y+10,w,5,C.roofLight);r(q,x-3,base-7,w+6,8,C.stoneLight);
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
 const pavement=canvas(512,512,(q)=>{
  r(q,0,0,512,512,C.field);
  for(let row=0;row<16;row++){
   let y=row*32;for(let col=-1;col<16;col++){
    const x=col*39+(row%2)*19,shade=rand();
    r(q,x+1,y+1,37,30,C.ink);
    r(q,x+3,y+3,33,26,shade<.25?'#b9aa9e':shade<.75?'#d3bca9':'#dac6b8');
    r(q,x+5,y+5,27,3,'#ead8c4');
    if(rand()<.22)r(q,x+18,y+16,11,2,'#a9958a');
    if(rand()<.18)r(q,x+6,y+24,4,2,'#9d8b87');
   }
  }
 });
 const pitchC=canvas(1024,614,(q)=>{
  // Continuous textured stone court: same logical 60 × 36 playing field.
  q.drawImage(pavement,0,0,1024,614);
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
 at.repeat.set(2.4,1.6);apron.material.map=at;apron.material.color.setHex(0xffffff);
 apron.material.needsUpdate=true;SCENIC_TEXTURES.push(at);
 apron.visible=true;
 // Skyline: three true layers (sky, town, architectural foreground).
 const sky=canvas(1536,600,q=>{
  for(let y=0;y<600;y+=25)r(q,0,y,1536,25,y<260?C.sky:y<420?C.sky2:'#c5e2d9');
  for(let i=0;i<15;i++)cloud(q,35+i*111+(rand()-.5)*42,35+rand()*148,.42+rand()*.65);
  for(let i=0;i<9;i++){
   let x=i*204-70,peak=286+rand()*74;
   poly(q,[[x-140,600],[x-80,peak+72],[x,peak-76],[x+83,peak+76],[x+160,600]],C.mountainShade);
   poly(q,[[x-80,peak+72],[x,peak-76],[x+35,peak+27],[x+9,peak+130]],C.mountain);
   poly(q,[[x-55,peak+55],[x,peak-76],[x+15,peak-36],[x-7,peak+62]],C.mountainLight);
  }
 });
 const town=canvas(1536,540,q=>{
  // Each facade has distinct roof, window depth and staggered silhouette.
  for(let i=0;i<16;i++){
   const x=i*102-25,h=174+(i*37)%105;
   building(q,x,530,94,h,{roof:i%3===0?'#ad5a64':i%2?C.roof:C.roof2,shop:i%4===2});
  }
  clockTower(q,1183,529);
  for(let i=0;i<17;i++)tree(q,43+i*99,540,.5+(i%3)*.06);
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
  // Pokémon Center: hand-painted brick architecture with real-depth pixels.
  r(q,574,246,384,257,C.ink);r(q,584,251,364,247,C.stone);
  poly(q,[[546,272],[585,213],[618,194],[913,194],[950,213],[988,272]],C.roofDark);
  poly(q,[[553,264],[592,213],[622,203],[910,203],[941,213],[981,264]],C.roof);
  r(q,549,267,438,19,C.ink);r(q,558,269,420,9,C.roofLight);
  r(q,607,286,319,6,C.stoneLight);
  for(const x of [608,838]){r(q,x-9,312,95,135,C.stoneDark);window(q,x,326,27,63);window(q,x+48,326,27,63);}
  // Entrance, door frame and highlights.
  r(q,691,399,154,105,C.ink);r(q,700,408,136,96,C.water);
  r(q,765,408,7,96,C.ink);r(q,708,414,56,10,C.waterLight);
  r(q,781,414,46,10,C.waterLight);r(q,688,391,162,12,C.roof2);
  // Architectural Poké Ball emblem (not a fabricated spectator).
  circle(q,767,250,58,C.ink);circle(q,767,250,50,C.stoneLight);
  circle(q,767,250,43,'#fff2e2');q.fillStyle=C.roof;
  q.beginPath();q.arc(767,250,43,Math.PI,0);q.fill();
  r(q,724,246,86,9,C.ink);circle(q,767,251,15,C.ink);circle(q,767,251,9,C.stoneLight);
  // Stalls with striped awnings and wooden counters.
  for(const [x,w] of [[117,200],[1218,204]]){
   r(q,x,337,w,162,C.ink);r(q,x+6,344,w-12,150,C.stone);
   r(q,x+22,380,w-44,98,C.wood);r(q,x+29,385,w-58,84,C.water);
   r(q,x+11,348,w-22,31,C.roofDark);
   for(let j=0;j<9;j++){const sx=x+11+j*(w-22)/9;
    r(q,sx,348,(w-22)/9,29,j%2?C.stoneLight:C.roof);}
   r(q,x+10,476,w-20,11,C.wood);
  }
  // Lanterns and blue flags, deliberately away from the pitch.
  for(const x of [81,452,1088,1451]){
   r(q,x-5,293,12,214,C.ink);r(q,x-3,300,8,202,C.wood);
   r(q,x-15,281,33,18,C.ink);r(q,x-11,286,25,12,C.stoneLight);
   r(q,x+10,313,58,97,C.ink);r(q,x+14,318,50,82,C.banner);
   r(q,x+21,327,34,8,C.waterLight);r(q,x+22,359,32,7,C.stoneLight);
  }
  for(let i=0;i<18;i++)flowers(q,36+i*85,497);
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
 plane(sky,440,149,0,64,-210);
 plane(town,300,100,0,42,-113);
 plane(tribune,118,43.8,0,19.7,-HZ-37);
 // Side gardens are decor, not old stands. Keep outside the gameplay perimeter.
 const garden=canvas(256,192,q=>{
  r(q,0,164,256,28,C.stoneDark);
  r(q,0,158,256,8,C.stoneLight);
  for(let i=0;i<4;i++)tree(q,36+i*67,166,.38+(i%2)*.11);
  for(let i=0;i<8;i++)flowers(q,17+i*31,169);
 });
 plane(garden,29,16,-HX-13,6.7,-3,Math.PI/2);
 plane(garden,29,16,HX+13,6.7,-3,-Math.PI/2);
 // A low wall far outside the court; no billboard mesh or old seating.
 plane(foreground,106,16,0,1.8,-HZ-31);
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
 return scene;
}
global.PMD_CITY={build};
})(window);
