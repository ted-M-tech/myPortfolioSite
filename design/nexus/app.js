/* ===== Portfolio logic: i18n, content, animations ===== */
const T=(ja,en)=>`<span class="ja">${ja}</span><span class="en">${en}</span>`;

/* ---------- content ---------- */
const MARQUEE=['TypeScript','React','Go','Python','Rust','Next.js','LLM','RAG','AWS','Kubernetes','Postgres','WebGL','Figma','Motion','Node','GraphQL'];
const STATS=[
  {n:8,suf:'+',l:['経験年数','Years building']},
  {n:34,suf:'+',l:['公開プロダクト','Projects shipped']},
  {n:12,suf:'',l:['一緒に働いた組織','Teams & clients']},
  {n:9280,suf:'',l:['飲んだコーヒー','Cups of coffee']},
];
const WORK=[
  {id:'p1',role:['フルスタック · AI','Full-stack · AI'],t:['Agent Workbench','Agent Workbench'],
   d:['自律型AIエージェントを設計・監視する開発者コンソール。','A console to design & observe autonomous AI agents.'],tags:['Next.js','LangGraph','Postgres']},
  {id:'p2',role:['リードエンジニア','Lead Engineer'],t:['Realtime Canvas','Realtime Canvas'],
   d:['数千人が同時編集できる低遅延コラボキャンバス。','Low-latency canvas for thousands of live editors.'],tags:['WebSocket','CRDT','Go']},
  {id:'p3',role:['フロントエンド','Frontend'],t:['Aurora Design System','Aurora Design System'],
   d:['20以上のプロダクトを支えるトークン駆動の基盤。','A token-driven system powering 20+ products.'],tags:['TypeScript','Storybook','A11y']},
  {id:'p4',role:['個人開発','Solo · Product'],t:['Focus OS','Focus OS'],
   d:['集中を守る、静かでミニマルなタスクランナー。','A quiet, minimal runner that guards your focus.'],tags:['SwiftUI','Local-first','Sync']},
];
const PLAY=[
  {id:'h1',cls:'t-lg',cap:['山を登る','Climbing'],sub:['週末は岩の上','Weekends on rock']},
  {id:'h2',cls:'t-md',cap:['写真','Photography'],sub:['35mm / film','35mm / film']},
  {id:'h3',cls:'t-sm',cap:['珈琲','Coffee'],sub:['ハンドドリップ沼','pour-over nerd']},
  {id:'h4',cls:'t-sm',cap:['音楽','Music'],sub:['シンセとlo-fi','synths & lo-fi']},
  {id:'h5',cls:'t-md',cap:['旅','Travel'],sub:['24ヶ国','24 countries']},
];
const JOBS=[
  {id:'j1',co:'Technomore',rl:['シニアソフトウェアエンジニア','Senior Software Engineer'],pd:'2023 — Now'},
  {id:'j2',co:'Studio Aurora',rl:['フルスタックエンジニア','Full-stack Engineer'],pd:'2020 — 2023'},
  {id:'j3',co:'Freelance',rl:['エンジニア / デザイナー','Engineer / Designer'],pd:'2018 — 2020'},
];

/* ---------- render ---------- */
const el=(h)=>{const d=document.createElement('div');d.innerHTML=h.trim();return d.firstElementChild;};
const slot=(id,ph,src)=>`<image-slot id="${id}" shape="rect" placeholder="${ph}"${src?` src="${src}"`:''}></image-slot>`;
const IMG={
  p1:'https://picsum.photos/seed/nexus-a/1000/700',
  p2:'https://picsum.photos/seed/nexus-b/1000/700',
  p3:'https://picsum.photos/seed/nexus-c/1000/700',
  p4:'https://picsum.photos/seed/nexus-d/1000/700',
  h1:'https://loremflickr.com/900/800/climbing,mountain',
  h2:'https://loremflickr.com/900/500/film,camera',
  h3:'https://loremflickr.com/700/500/coffee',
  h4:'https://loremflickr.com/700/500/synthesizer',
  h5:'https://loremflickr.com/900/500/tokyo,street',
};

document.getElementById('mt1').innerHTML=(()=>{const one=MARQUEE.map(w=>`<span>${w}</span><span class="dot">∗</span>`).join('');return one+one;})();
document.getElementById('mt2').innerHTML=(()=>{const one=MARQUEE.slice().reverse().map(w=>`<span>${w}</span><span class="dot">∗</span>`).join('');return one+one;})();

document.getElementById('stats').append(...STATS.map(s=>el(
  `<div class="stat reveal"><div class="n"><span data-count="${s.n}">0</span>${s.suf}</div><div class="l">${T(s.l[0],s.l[1])}</div></div>`)));

document.getElementById('workList').append(...WORK.map((w,i)=>el(
  `<div class="project reveal tilt"><div class="p-media"><span class="p-num">0${i+1}</span>${slot(w.id,'Project image',IMG[w.id])}</div>`+
  `<div class="p-body"><div class="p-role">${T(w.role[0],w.role[1])}</div><h3>${T(w.t[0],w.t[1])}</h3><p>${T(w.d[0],w.d[1])}</p>`+
  `<div class="tags">${w.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div>`+
  `<span class="p-more">${T('ケースを見る','View case')} <i data-lucide="arrow-right"></i></span></div></div>`)));

document.getElementById('playGrid').append(...PLAY.map(p=>el(
  `<div class="tile ${p.cls} reveal tilt">${slot(p.id,'',IMG[p.id])}<div class="scrim"></div>`+
  `<div class="cap"><b>${T(p.cap[0],p.cap[1])}</b><span>${T(p.sub[0],p.sub[1])}</span></div></div>`)));

document.getElementById('timeline').append(...JOBS.map(j=>el(
  `<div class="job reveal"><div class="logo">${slot(j.id,'')}</div>`+
  `<div><div class="co">${j.co}</div><div class="rl">${T(j.rl[0],j.rl[1])}</div></div><div class="pd">${j.pd}</div></div>`)));

if(window.lucide)lucide.createIcons();

/* ---------- language ---------- */
const savedLang=localStorage.getItem('pf-lang')||'ja';
function setLang(l){
  document.documentElement.setAttribute('data-lang',l);
  document.documentElement.lang=l;
  document.querySelectorAll('#lang button').forEach(b=>b.classList.toggle('on',b.dataset.l===l));
  localStorage.setItem('pf-lang',l);
}
document.querySelectorAll('#lang button').forEach(b=>b.addEventListener('click',()=>setLang(b.dataset.l)));
setLang(savedLang);

/* ---------- reveal + count-up ---------- */
const io=new IntersectionObserver((es)=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{threshold:0.14});
document.querySelectorAll('.reveal').forEach(x=>io.observe(x));
const cio=new IntersectionObserver((es)=>es.forEach(e=>{if(e.isIntersecting){count(e.target);cio.unobserve(e.target);}}),{threshold:0.5});
document.querySelectorAll('[data-count]').forEach(x=>cio.observe(x));
function count(node){
  const to=+node.dataset.count,dur=1400,t0=performance.now();
  const step=(t)=>{const p=Math.min(1,(t-t0)/dur);const e=1-Math.pow(1-p,3);
    node.textContent=Math.round(to*e).toLocaleString();if(p<1)requestAnimationFrame(step);};
  requestAnimationFrame(step);
}

/* ---------- nav dark/light ---------- */
const nav=document.getElementById('nav');
const darkSections=[...document.querySelectorAll('.hero,.block.ink,.contact')];
function navState(){
  nav.classList.toggle('scrolled',scrollY>40);
  const y=32;let onDark=false;
  darkSections.forEach(s=>{const r=s.getBoundingClientRect();if(r.top<=y&&r.bottom>=y)onDark=true;});
  nav.classList.toggle('dark-mode',onDark);nav.classList.toggle('light-mode',!onDark);
}
addEventListener('scroll',navState,{passive:true});navState();

/* ---------- 3D tilt (playful) ---------- */
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
if(!reduce)document.querySelectorAll('.tilt').forEach(c=>{
  c.addEventListener('pointermove',(e)=>{const r=c.getBoundingClientRect();
    const rx=((e.clientY-r.top)/r.height-0.5)*-6,ry=((e.clientX-r.left)/r.width-0.5)*6;
    c.style.transition='transform .08s var(--ease-out)';
    c.style.transform=`perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;});
  c.addEventListener('pointerleave',()=>{c.style.transition='transform .5s var(--ease-out)';c.style.transform='';});
});

/* ================= HERO ORBIT ================= */
const NODES=[{l:'LLM',i:'brain-circuit'},{l:'Agents',i:'bot'},{l:'Cloud',i:'cloud'},{l:'Code',i:'code-xml'},{l:'Data',i:'database'},{l:'Design',i:'shapes'}];
const stage=document.getElementById('stage'),canvas=document.getElementById('fx'),ctx=canvas.getContext('2d');
let W=0,H=0,DPR=Math.min(2,devicePixelRatio||1),cx=0,cy=0,coreR=0,mx=0,my=0,tmx=0,tmy=0;
const nodeEls=NODES.map(n=>{const d=document.createElement('div');d.className='node';d.innerHTML=`<span class="ic"><i data-lucide="${n.i}"></i></span><b>${n.l}</b>`;stage.appendChild(d);return d;});
if(window.lucide)lucide.createIcons();
let dust=[];
function buildDust(){dust=[];[
  {rx:coreR*2.4,ry:coreR*0.80,rot:-0.34,n:220,speed:0.00016},
  {rx:coreR*3.1,ry:coreR*1.04,rot:0.28,n:180,speed:-0.00012},
  {rx:coreR*1.8,ry:coreR*0.62,rot:0.62,n:120,speed:0.00022}
].forEach(b=>{for(let i=0;i<b.n;i++)dust.push({b,a:Math.random()*6.283,rj:0.86+Math.random()*0.3,sz:Math.random()*1.6+0.3,tw:Math.random()*6.283,tint:Math.random()});});
  for(let i=0;i<110;i++)dust.push({star:1,x:Math.random(),y:Math.random(),sz:Math.random()*1.2+0.2,tw:Math.random()*6.283});}
function resize(){const b=canvas.parentElement.getBoundingClientRect();W=b.width;H=b.height;canvas.width=W*DPR;canvas.height=H*DPR;ctx.setTransform(DPR,0,0,DPR,0,0);cx=W/2;cy=H*0.42;coreR=Math.min(H*0.40,360)/2;buildDust();}
addEventListener('resize',resize);
const proj=(rx,ry,rot,a)=>{const ex=rx*Math.cos(a),ey=ry*Math.sin(a);return{x:ex*Math.cos(rot)-ey*Math.sin(rot),y:ex*Math.sin(rot)+ey*Math.cos(rot),d:Math.sin(a)};};
let flows=NODES.map(()=>Array.from({length:3},()=>Math.random()));
function frame(t){
  ctx.clearRect(0,0,W,H);mx+=(tmx-mx)*0.05;my+=(tmy-my)*0.05;const ox=mx*22,oy=my*15;
  for(const p of dust){
    if(p.star){const al=0.18+0.3*(0.5+0.5*Math.sin(t*0.002+p.tw));ctx.fillStyle=`rgba(245,246,250,${al*0.5})`;ctx.beginPath();ctx.arc(p.x*W+ox*0.4,p.y*H+oy*0.4,p.sz,0,7);ctx.fill();continue;}
    p.a+=p.b.speed*16;const pr=proj(p.b.rx*p.rj,p.b.ry*p.rj,p.b.rot,p.a);const df=(pr.d+1)/2;
    const al=(0.1+df*0.7)*(0.6+0.4*Math.sin(t*0.003+p.tw)),px=cx+pr.x+ox,py=cy+pr.y+oy;
    ctx.fillStyle=p.tint<0.62?`rgba(238,240,248,${al})`:p.tint<0.84?`rgba(201,210,234,${al})`:`rgba(231,216,222,${al})`;
    ctx.beginPath();ctx.arc(px,py,p.sz*(0.5+df*0.85),0,7);ctx.fill();
  }
  const pos=[],rx=Math.min(W*0.40,560),ry=rx*0.34,rotN=-0.30;
  NODES.forEach((n,i)=>{const a=i/NODES.length*6.283+t*0.00009;const pr=proj(rx,ry,rotN,a);pos.push({x:cx+pr.x+ox,y:cy+pr.y+oy,df:(pr.d+1)/2});});
  pos.forEach((p,i)=>{const g=ctx.createLinearGradient(cx+ox,cy+oy,p.x,p.y);g.addColorStop(0,`rgba(235,238,248,${0.04+p.df*0.2})`);g.addColorStop(1,`rgba(201,210,234,${0.02+p.df*0.1})`);ctx.strokeStyle=g;ctx.lineWidth=0.5+p.df*0.9;ctx.beginPath();ctx.moveTo(cx+ox,cy+oy);ctx.lineTo(p.x,p.y);ctx.stroke();
    flows[i].forEach((f,k)=>{f-=0.0045;flows[i][k]=f<=0?1:f;const fx=p.x+(cx+ox-p.x)*(1-f),fy=p.y+(cy+oy-p.y)*(1-f);ctx.fillStyle=`rgba(226,230,244,${(0.15+p.df*0.5)*f})`;ctx.beginPath();ctx.arc(fx,fy,1.5*(0.5+p.df),0,7);ctx.fill();});});
  pos.forEach((p,i)=>{const e=nodeEls[i],sc=0.74+p.df*0.26;e.style.transform=`translate(-50%,-50%) translate(${p.x}px,${p.y}px) scale(${sc})`;e.style.opacity=(0.4+p.df*0.6).toFixed(3);e.style.zIndex=p.df>0.5?8:1;e.style.filter=p.df<0.5?`blur(${(0.5-p.df)*3}px)`:'none';});
  requestAnimationFrame(frame);
}
addEventListener('pointermove',e=>{tmx=(e.clientX/innerWidth-0.5)*2;tmy=(e.clientY/innerHeight-0.5)*2;});
resize();requestAnimationFrame(frame);
setTimeout(()=>window.lucide&&lucide.createIcons(),80);

/* ================= ETHOS CONSTELLATION (scroll-driven) ================= */
(()=>{
const stageEl=document.getElementById('ethosStage');if(!stageEl)return;
const cv=document.getElementById('ethosFx'),ec=cv.getContext('2d');
const VALUES=[
  {ja:'好奇心',en:'Curiosity'},{ja:'遊び心',en:'Playfulness'},{ja:'執念',en:'Grit'},
  {ja:'やさしさ',en:'Empathy'},{ja:'美意識',en:'Taste'},{ja:'祈り',en:'Hope'}
];
const mk=(v,center)=>{const d=document.createElement('div');d.className='enode'+(center?' center':'');
  d.innerHTML=`<b><span class="ja">${v.ja}</span><span class="en">${v.en}</span></b><span class="sub"><span class="ja">${v.en}</span><span class="en">${v.ja}</span></span>`;
  stageEl.appendChild(d);return d;};
const outer=VALUES.map(v=>mk(v,false));
const centerEl=mk({ja:'わたし',en:'Me'},true);
let eW=0,eH=0;
function esize(){const r=stageEl.getBoundingClientRect();eW=r.width;eH=r.height;cv.width=eW*DPR;cv.height=eH*DPR;ec.setTransform(DPR,0,0,DPR,0,0);}
addEventListener('resize',esize);esize();
const ease=(x)=>1-Math.pow(1-Math.min(1,Math.max(0,x)),3);
const seg=(p,a,b)=>ease((p-a)/(b-a));
let prog=0,target=0;
function scrub(){const vh=innerHeight,r=stageEl.getBoundingClientRect();
  target=Math.min(1,Math.max(0,(vh*0.88-r.top)/(vh*0.75)));}
addEventListener('scroll',scrub,{passive:true});scrub();
let glints=Array.from({length:6},()=>Math.random());
function eframe(t){
  prog+=(target-prog)*0.07;const p=prog;
  ec.clearRect(0,0,eW,eH);
  const cx2=eW/2,cy2=eH/2;
  const rx=Math.min(eW*0.40,430),ry=Math.min(eH*0.40,215);
  const pts=VALUES.map((_,i)=>{const a=-Math.PI/2+i*(Math.PI*2/VALUES.length);
    return{x:cx2+Math.cos(a)*rx+Math.sin(t*0.0006+i*1.7)*7,y:cy2+Math.sin(a)*ry+Math.cos(t*0.0007+i*2.3)*6};});
  // spokes then ring, drawn progressively
  const line=(x1,y1,x2,y2,q,al)=>{if(q<=0)return;const g=ec.createLinearGradient(x1,y1,x2,y2);
    g.addColorStop(0,`rgba(109,132,196,${al})`);g.addColorStop(1,`rgba(169,126,149,${al})`);
    ec.strokeStyle=g;ec.lineWidth=1.2;ec.beginPath();ec.moveTo(x1,y1);ec.lineTo(x1+(x2-x1)*q,y1+(y2-y1)*q);ec.stroke();};
  pts.forEach((pt,i)=>{const q=seg(p,0.30+i*0.05,0.55+i*0.05);line(cx2,cy2,pt.x,pt.y,q,0.4);});
  pts.forEach((pt,i)=>{const n=pts[(i+1)%pts.length];const q=seg(p,0.55+i*0.05,0.78+i*0.05);line(pt.x,pt.y,n.x,n.y,q,0.25);});
  // glints flowing to center once formed
  if(p>0.9){glints.forEach((f,i)=>{f-=0.005;glints[i]=f<=0?1:f;const pt=pts[i];
    ec.fillStyle=`rgba(109,132,196,${0.5*f*(p-0.9)*10})`;ec.beginPath();
    ec.arc(pt.x+(cx2-pt.x)*(1-f),pt.y+(cy2-pt.y)*(1-f),1.8,0,7);ec.fill();});}
  // nodes
  pts.forEach((pt,i)=>{const q=seg(p,0.04+i*0.06,0.26+i*0.06);const el=outer[i];
    el.style.opacity=q.toFixed(3);
    el.style.transform=`translate(-50%,-50%) translate(${pt.x}px,${pt.y}px) scale(${0.82+q*0.18}) translateY(${(1-q)*18}px)`;});
  const cq=seg(p,0.72,0.95);const pulse=1+Math.sin(t*0.0018)*0.02*cq;
  centerEl.style.opacity=cq.toFixed(3);
  centerEl.style.transform=`translate(-50%,-50%) translate(${cx2}px,${cy2}px) scale(${(0.8+cq*0.2)*pulse})`;
  requestAnimationFrame(eframe);
}
requestAnimationFrame(eframe);
})();
