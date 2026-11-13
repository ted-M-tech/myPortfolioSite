import Stripe from 'stripe';
import {readFile,writeFile} from 'node:fs/promises';
// Only run explicitly after the owner configures a sandbox restricted key.
const path=new URL('../.dev.vars',import.meta.url);
const source=await readFile(path,'utf8').catch(()=> '');
const values=Object.fromEntries(source.split('\n').filter(line=>line.trim()&&!line.trim().startsWith('#')).map(line=>{const split=line.indexOf('=');return [line.slice(0,split).trim(),line.slice(split+1).trim().replace(/^"(.*)"$/,'$1')];}));
const key=process.env.STRIPE_RESTRICTED_KEY||values.STRIPE_RESTRICTED_KEY;
if(!/^rk_test_|^sk_test_/.test(key||'')){console.error('サンドボックスの制限付きキーを .dev.vars に設定してください。本番キーは使用しません。');process.exit(1);}
const stripe=new Stripe(key);
const slug='mentoring-campaign';
try {
 let product;
 for await(const candidate of stripe.products.list({limit:100,active:true})){
   if(candidate.metadata.maepace_slug===slug){product=candidate;break;}
 }
 if(!product) product=await stripe.products.create({name:'MaePace 1か月の伴走（キャンペーン）',description:'面談月4回・チャット相談。1か月単位、自動更新なし。',metadata:{maepace_slug:slug}},{idempotencyKey:'maepace-mentoring-campaign-product'});
 if(product.livemode) throw new Error('live');
 let price;
 for await(const candidate of stripe.prices.list({product:product.id,active:true,limit:100})){
   if(candidate.currency==='jpy'&&candidate.unit_amount===10000&&candidate.type==='one_time'){price=candidate;break;}
 }
 if(!price) price=await stripe.prices.create({product:product.id,currency:'jpy',unit_amount:10000},{idempotencyKey:'maepace-mentoring-campaign-jpy-10000'});
 if(price.livemode) throw new Error('live');
 const mapping=JSON.parse(values.STRIPE_COURSE_PRICES||'{}');mapping[slug]=price.id;
 const setting=`STRIPE_COURSE_PRICES=${JSON.stringify(mapping)}`;
 const next=/^STRIPE_COURSE_PRICES=.*$/m.test(source)?source.replace(/^STRIPE_COURSE_PRICES=.*$/m,setting):source+'\n'+setting+'\n';
 await writeFile(path,next,{mode:0o600});
 console.log('サンドボックスの商品・価格（10,000円）を設定しました。キーは表示していません。');
}catch{console.error('設定できませんでした。サンドボックス接続と Products / Prices の読み書き権限を確認してください。');process.exitCode=1;}
