import {getCollection} from 'astro:content';
export async function getArticles(){return (await getCollection('articles',e=>e.data.status!=='draft')).map(e=>({...e.data,slug:e.id,entry:e})).sort((a,b)=>b.updatedAt.localeCompare(a.updatedAt));}
