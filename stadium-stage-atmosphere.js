/* Poké Strikers · Atmósfera PMD compartida para Volcán y Glaciar
 * Sombras suaves de nubes, brillos ambientales y partículas de bioma.
 * No cambia jugabilidad, colisiones ni material de la cancha.
 * Diseñado para móviles: texturas pequeñas, máximo 24 sprites, sin geometría por frame.
 */
(function(global){
'use strict';
const TAU=Math.PI*2;
function build(options){
 const {THREE,scene,HX,HZ,stadium,getWeather,SCENIC_TEXTURES}=options;
 const group=new THREE.Group();group.name='PMD_'+stadium.toUpperCase()+'_ATMOSPHERE';
 scene.add(group);
 let seed=stadium==='volcano'?9831:27719;
 const rnd=()=>{seed=seed*16807%2147483647;return (seed-1)/2147483646};
 const glacier=stadium==='glacier';
 const cfg=glacier?{
  glow:0xa4eeff,particles:0xf5fcff,shade:0x355e90
 }:{
  glow:0xff9147,particles:0xffc58d,shade:0x272037
 };
 function texture(w,h,paint){
  const cv=document.createElement('canvas');cv.width=w;cv.height=h;
  const q=cv.getContext('2d');q.imageSmoothingEnabled=false;
  paint(q,w,h);
  const t=new THREE.CanvasTexture(cv);t.encoding=THREE.sRGBEncoding;
  t.magFilter=t.minFilter=THREE.NearestFilter;t.generateMipmaps=false;
  SCENIC_TEXTURES.push(t);return t;
 }
 const shadowTex=texture(128,128,q=>{
  const g=q.createRadialGradient(64,64,10,64,64,64);
  g.addColorStop(0,'rgba(19,15,33,.78)');
  g.addColorStop(.40,'rgba(25,19,43,.56)');
  g.addColorStop(.78,'rgba(28,23,43,.15)');
  g.addColorStop(1,'rgba(28,23,43,0)');
  q.fillStyle=g;q.fillRect(0,0,128,128);
 });
 const cloudShadow=texture(192,96,q=>{
  const g=q.createLinearGradient(0,0,0,96);
  g.addColorStop(0,'rgba(23,24,52,0)');
  g.addColorStop(.30,'rgba(22,23,50,.24)');
  g.addColorStop(.60,'rgba(27,27,51,.28)');
  g.addColorStop(1,'rgba(25,23,51,0)');
  q.fillStyle=g;
  for(const [x,y,w,h] of [[8,40,63,31],[35,20,70,47],
    [80,27,83,45],[124,45,61,30]])q.fillRect(x,y,w,h);
 });
 const haloTex=texture(96,96,q=>{
  const g=q.createRadialGradient(48,48,0,48,48,48);
  g.addColorStop(0,'rgba(255,255,255,.75)');
  g.addColorStop(.24,'rgba(255,255,255,.38)');
  g.addColorStop(.60,'rgba(255,255,255,.12)');
  g.addColorStop(1,'rgba(255,255,255,0)');
  q.fillStyle=g;q.fillRect(0,0,96,96);
 });
 const dustTex=texture(24,24,q=>{
  q.fillStyle='#1a2432';q.fillRect(8,9,11,10);
  q.fillStyle=glacier?'#f6ffff':'#ffa34e';q.fillRect(10,8,7,8);
  q.fillStyle=glacier?'#d4f5ff':'#ffe9ad';q.fillRect(12,9,3,4);
 });
 const mistTex=texture(96,96,q=>{
  for(const [x,y,r] of [[30,57,24],[54,45,27],[68,59,19]]){
   const grad=q.createRadialGradient(x,y,0,x,y,r);
   grad.addColorStop(0,glacier?'rgba(231,249,255,.53)':'rgba(168,139,166,.43)');
   grad.addColorStop(.72,glacier?'rgba(181,216,242,.19)':'rgba(120,94,133,.15)');
   grad.addColorStop(1,'rgba(100,80,130,0)');
   q.fillStyle=grad;q.fillRect(x-r,y-r,2*r,2*r);
  }
 });
 function floorSprite(t,w,h,x,z,y,opacity=.2,color=0xffffff){
  const mat=new THREE.MeshBasicMaterial({map:t,color,
   transparent:true,opacity,depthWrite:false,depthTest:true,side:THREE.DoubleSide,fog:false});
  const mesh=new THREE.Mesh(new THREE.PlaneGeometry(w,h),mat);
  mesh.rotation.x=-Math.PI/2;mesh.position.set(x,y,z);
  mesh.renderOrder=3;group.add(mesh);return mesh;
 }
 const shadows=[];
 for(const side of [-1,1]){
  // Sombras fijas bajo pórticos y piedras de los laterales.
  for(const [z,scale] of [[-14,1.0],[0,1.3],[13,1.1]]){
   const x=side*(HX+5.7);
   shadows.push(floorSprite(shadowTex,7.8*scale,3.7*scale,x,z,.027,.22));
  }
 }
 for(const x of [-25,-10,10,25])shadows.push(floorSprite(shadowTex,7,2.6,x,HZ+3.2,.025,.17));
 // Las sombras climáticas siguen el suelo: no son PNG parados frente a cámara.
 const clouds=[];
 for(let i=0;i<2;i++){
  const m=floorSprite(cloudShadow,31,16,-12+i*34,-6+i*9,.032,0);
  m.renderOrder=3;clouds.push({m,phase:i*2.7});
 }
 const glows=[];
 function glow(x,y,z,size,intensity=1){
  const sprite=new THREE.Sprite(new THREE.SpriteMaterial({map:haloTex,
   color:cfg.glow,transparent:true,blending:THREE.AdditiveBlending,
   opacity:.30*intensity,depthWrite:false,depthTest:true,fog:false}));
  sprite.position.set(x,y,z);sprite.scale.set(size,size,1);
  sprite.renderOrder=4;group.add(sprite);
  glows.push({sprite,x,y,z,size,phase:rnd()*TAU,intensity});
 }
 if(glacier){
  for(const side of [-1,1]){
   for(const z of [-13,-2,12])glow(side*(HX+5.8),2.4,z,5.8,.54);
   glow(side*37,5,-31,8.8,.32);
  }
 }else{
  for(const side of [-1,1]){
   for(const z of [-14,0,12])glow(side*(HX+4.8),1.4,z,5.8,.63);
   glow(side*56,4,-43,14,.8);
   glow(side*23,2,HZ+5,7,.76);
  }
 }
 const motes=[];
 for(let i=0;i<18;i++){
  const side=i%2?1:-1,x=side*(HX+4+rnd()*12),
   z=(rnd()-.5)*(HZ*2+14),y=.9+rnd()*4.5;
  const sp=new THREE.Sprite(new THREE.SpriteMaterial({
   map:dustTex,color:cfg.particles,transparent:true,opacity:.4,
   depthWrite:false,fog:false}));
  sp.position.set(x,y,z);sp.scale.set(.22+rnd()*.25,.28+rnd()*.25,1);
  group.add(sp);motes.push({sp,x,y,z,phase:rnd()*TAU,speed:.25+rnd()*.7});
 }
 const fogSprites=[];
 for(let i=0;i<7;i++){
  const side=i%2?1:-1,x=side*(HX+5.0+rnd()*6),
   z=-19+i*6.4,y=1.5+rnd()*1.8;
  const sp=new THREE.Sprite(new THREE.SpriteMaterial({
   map:mistTex,transparent:true,opacity:0,depthWrite:false,fog:false}));
  sp.position.set(x,y,z);sp.scale.set(5+rnd()*2.4,3.2+rnd()*1.8,1);
  group.add(sp);fogSprites.push({sp,x,y,z,phase:rnd()*TAU});
 }
 // Brillo del escenario con 2 luces reales, orientadas a los objetos Standard.
 // Las superficies MeshBasic siguen mostrando los colores originales.
 const realLights=[];
 for(const side of [-1,1]){
  const color=glacier?0x8deeff:0xff8b47;
  const light=new THREE.PointLight(color,glacier?.34:.70,glacier?19:23,2);
  light.position.set(side*(HX+6),4.2,8);
  group.add(light);realLights.push({light,phase:rnd()*6});
 }
 function tick(dt,t){
  const wx=(typeof getWeather==='function'?getWeather():'clear');
  const secs=t*.001;
  const dark=wx==='fog'?.68:wx==='cloudy'?.45:wx==='snow'?.35:.15;
  for(const cloud of clouds){
   cloud.m.material.opacity=dark*(glacier?.22:.19);
   cloud.m.position.x=((secs*1.15+cloud.phase*22+75)%140)-70;
   cloud.m.position.z=cloud.phase*4-6;
  }
  for(const g of glows){
   const pulse=.87+.13*Math.sin(secs*2.1+g.phase);
   g.sprite.material.opacity=(glacier?.17:.28)*g.intensity*pulse
      *(wx==='fog'?.75:1);
   g.sprite.scale.setScalar(g.size*(1+.035*Math.sin(secs*2+g.phase)));
  }
  for(const l of realLights){
   l.light.intensity=(glacier?.31:.64)*
    (wx==='fog'?.83:1)*(.88+.12*Math.sin(secs*2.5+l.phase));
  }
  for(const p of motes){
   const cycle=(secs*p.speed+p.phase)%6;
   p.sp.position.set(p.x+Math.sin(secs*.8+p.phase)*.8,
    p.y+(glacier?-cycle*.28:cycle*.28),p.z);
   p.sp.material.opacity=Math.max(0,(glacier?.44:.50)*
     Math.sin(Math.PI*cycle/6)*(wx==='fog'?.64:1));
  }
  for(const s of fogSprites){
   s.sp.position.x=s.x+Math.sin(secs*.39+s.phase)*.45;
   s.sp.position.y=s.y+Math.sin(secs*.47+s.phase)*.24;
   s.sp.material.opacity=(wx==='fog'?.35:wx==='cloudy'?.12:.055)*
     (.7+.3*Math.sin(secs*.55+s.phase));
  }
 }
 return {group,tick};
}
global.PMD_STAGE_ATMOSPHERE={build};
})(window);
