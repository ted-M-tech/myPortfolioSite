// Download a small static MP4 once, then let the browser seek in its local Blob.
// No range-proxy server, paid API or persistent browser storage is needed.
document.querySelectorAll<HTMLVideoElement>('video[data-static-src]').forEach(video=>{
 const status=document.querySelector<HTMLElement>('.video-loading');
 const retry=status?.querySelector<HTMLButtonElement>('[data-video-retry]');
 let objectUrl:string|undefined;
 const controller=new AbortController();
 async function load(){
  if(retry)retry.hidden=true;
  status?.querySelector('.ja')?.replaceChildren('動画を読み込み中…');
  status?.querySelector('.en')?.replaceChildren('Loading video…');
  try{
   const response=await fetch(video.dataset.staticSrc!,{signal:controller.signal});
   if(!response.ok)throw new Error(`Video HTTP ${response.status}`);
   const blob=await response.blob();
   objectUrl=URL.createObjectURL(blob);
   video.src=objectUrl;
   video.load();
   if(status)status.hidden=true;
  }catch(error){
   if(controller.signal.aborted)return;
   status?.querySelector('.ja')?.replaceChildren('動画を読み込めませんでした。');
   status?.querySelector('.en')?.replaceChildren('Video could not be loaded.');
   if(retry)retry.hidden=false;
  }
 }
 retry?.addEventListener('click',load);
 window.addEventListener('pagehide',event=>{if(!event.persisted){controller.abort();if(objectUrl)URL.revokeObjectURL(objectUrl);}});
 void load();
});
