import {readdir,readFile,stat} from 'node:fs/promises';
import {join,resolve} from 'node:path';
const root=resolve('dist');
async function walk(dir){const out=[];for(const name of await readdir(dir)){const path=join(dir,name);if((await stat(path)).isDirectory())out.push(...await walk(path));else out.push(path);}return out;}
const files=await walk(root);const known=new Set(files);const issues=[];let count=0;
for(const file of files.filter(f=>f.endsWith('.html'))){const html=await readFile(file,'utf8');count++;
 if(!/<title(?:\s[^>]*)?>[^<]+<\/title>/.test(html))issues.push(`${file}: missing title`);
 if(!/name="viewport"/.test(html))issues.push(`${file}: missing viewport`);
 if(/(?:rk|sk)_(?:live|test)_[a-zA-Z0-9]{12,}/.test(html))issues.push(`${file}: credential-like content`);
 for(const match of html.matchAll(/\b(?:href|src)="(\/[^"#?]*)[^" ]*"/g)){
  const path=decodeURIComponent(match[1]);if(path.startsWith('//')||path.startsWith('/api/'))continue;
  const direct=join(root,path);if(!known.has(direct)&&!known.has(join(direct,'index.html')))issues.push(`${file}: unresolved ${path}`);
 }
}
for(const route of ['learn/blog','learn/consult','learn/mentoring','learn/privacy']){
 const text=await readFile(join(root,route,'index.html'),'utf8');if(/name="robots" content="noindex"/.test(text))issues.push(`${route}: unexpectedly noindex`);
}
console.log(`${count} HTML pages checked; ${issues.length} issues.`);if(issues.length){console.log(issues.join('\n'));process.exitCode=1;}

for (const file of files.filter(f=>f.endsWith('.html'))) {
 const html=await readFile(file,'utf8');
 if(/(?:href|src)=["']\/learn(?:["'#?]|\/(?:courses|classroom|purchase-preview|resources|examples|covers)(?:\/|["'?]))/.test(html)) throw new Error(`Retired course link: ${file}`);
}
for (const path of ['learn/index.html','learn/courses','learn/classroom','learn/purchase-preview','learn/resources','learn/examples','learn/covers']) {
 if (files.some(file=>file===join(root,path)||file.startsWith(join(root,path)+'/'))) throw new Error(`Retired course artifact: ${path}`);
}
