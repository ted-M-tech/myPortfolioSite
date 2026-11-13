// Download a small static MP4 once, then let the browser seek in its local Blob.
// No range-proxy server, paid API or persistent browser storage is needed.
// A series page swaps episodes by changing data-static-src and dispatching 'static-src-change'.
document.querySelectorAll<HTMLVideoElement>('video[data-static-src]').forEach(video=>{
 const status=document.querySelector<HTMLElement>('.video-loading');
 const retry=status?.querySelector<HTMLButtonElement>('[data-video-retry]');
 let objectUrl:string|undefined;
 let controller=new AbortController();
 async function load(autoplay=false){
  controller.abort();
  controller=new AbortController();
  const {signal}=controller;
  if(objectUrl){video.removeAttribute('src');video.load();URL.revokeObjectURL(objectUrl);objectUrl=undefined;}
  if(retry)retry.hidden=true;
  if(status)status.hidden=false;
  status?.querySelector('.ja')?.replaceChildren('動画を読み込み中…');
  status?.querySelector('.en')?.replaceChildren('Loading video…');
  try{
   const response=await fetch(video.dataset.staticSrc!,{signal});
   if(!response.ok)throw new Error(`Video HTTP ${response.status}`);
   const blob=await response.blob();
   if(signal.aborted)return;
   objectUrl=URL.createObjectURL(blob);
   video.src=objectUrl;
   video.load();
   if(status)status.hidden=true;
   if(autoplay)video.play().catch(()=>{});
  }catch(error){
   if(signal.aborted)return;
   status?.querySelector('.ja')?.replaceChildren('動画を読み込めませんでした。');
   status?.querySelector('.en')?.replaceChildren('Video could not be loaded.');
   if(retry)retry.hidden=false;
  }
 }
 retry?.addEventListener('click',()=>void load());
 video.addEventListener('static-src-change',event=>void load(Boolean((event as CustomEvent<{autoplay?:boolean}>).detail?.autoplay)));
 window.addEventListener('pagehide',event=>{if(!event.persisted){controller.abort();if(objectUrl)URL.revokeObjectURL(objectUrl);}});
 void load();
});
