import {XMLParser} from 'fast-xml-parser';
import {integrations} from '../data/integrations';
export type NoteArticle={title:string;url:string;summary:string;image?:string};
export async function getNoteArticles():Promise<{profile:string|null;articles:NoteArticle[]}>{
 const configured=integrations.noteProfileUrl.trim();
 if(!configured)return {profile:null,articles:[]};
 const profile=new URL(configured);
 if(profile.protocol!=='https:'||profile.hostname!=='note.com'||!/^\/[\w-]+\/?$/.test(profile.pathname)||profile.username||profile.password)throw new Error('Set a public note.com profile URL.');
 profile.search='';profile.hash='';profile.pathname=profile.pathname.replace(/\/$/,'');
 try{
  const response=await fetch(`${profile.href}/rss`,{signal:AbortSignal.timeout(8000)});
  if(!response.ok)throw new Error(`RSS ${response.status}`);
  const feed=new XMLParser({processEntities:false}).parse(await response.text());
  const items=feed.rss?.channel?.item??[];
  const articles=(Array.isArray(items)?items:[items]).flatMap((item:any):NoteArticle[]=>{
   if(typeof item.link!=='string'||typeof item.title!=='string')return [];
   const link=new URL(item.link);
   if(link.origin!==profile.origin||!link.pathname.startsWith(`${profile.pathname}/n/`))return [];
   const image=typeof item['media:thumbnail']==='string'?item['media:thumbnail']:undefined;
   return [{title:item.title,url:link.href,summary:String(item.description??'').replace(/<[^>]*>/g,'').replace(/&[^;]+;/g,' ').trim().slice(0,100),image:image?.startsWith('https://')?image:undefined}];
  });
  return {profile:profile.href,articles};
 }catch(error){console.warn('note RSS unavailable; keeping profile link.',error instanceof Error?error.message:'Fetch failed');return {profile:profile.href,articles:[]};}
}
