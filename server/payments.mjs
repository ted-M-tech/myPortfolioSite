import Stripe from 'stripe';

// Sandbox only. Live sales require durable accounts/entitlements and protected media.
const json = (body, status = 200, headers = {}) => new Response(JSON.stringify(body), {
  status, headers: {'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...headers},
});
const hash = async value => Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value))), b => b.toString(16).padStart(2, '0')).join('');
const cookieName = course => `maepace_checkout_${course}`;
const validCourse = value => typeof value === 'string' && /^[a-z0-9-]{1,60}$/.test(value);
function prices(env) {
  try { const parsed = JSON.parse(env.STRIPE_COURSE_PRICES || '{}'); return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {}; }
  catch { return {}; }
}
function ready(env) { return /^rk_test_|^sk_test_/.test(env.STRIPE_RESTRICTED_KEY || ''); }

export function createHandler(makeStripe = key => new Stripe(key)) {
  return async function fetch(request, env) {
    const url = new URL(request.url);
    const origin = env.CHECKOUT_ORIGIN || url.origin;
    if (!url.pathname.startsWith('/api/payments/')) return env.ASSETS.fetch(request);
    try {
      if (url.pathname === '/api/payments/offer' && request.method === 'GET') {
        const course = url.searchParams.get('course');
        const priceId = course === 'mentoring-campaign' && prices(env)[course];
        if (!ready(env) || !priceId) return json({available: false});
        const price = await makeStripe(env.STRIPE_RESTRICTED_KEY).prices.retrieve(priceId);
        if (price.livemode || !price.active || price.type !== 'one_time' || price.unit_amount === null) return json({available: false});
        return json({available: true, sandbox: true, amount: price.unit_amount, currency: price.currency});
      }
      if (url.pathname === '/api/payments/checkout' && request.method === 'POST') {
        if (request.headers.get('Origin') !== origin) return json({error: '送信元を確認できません。'}, 403);
        if (!ready(env)) return json({error: 'テスト決済は設定中です。'}, 503);
        if (!request.headers.get('Content-Type')?.includes('application/json')) return json({error: 'Invalid request'}, 400);
        const body = await request.text();
        if (body.length > 2000) return json({error: 'Invalid request'}, 400);
        let course;
        try { course = JSON.parse(body).course; } catch { return json({error: 'Invalid request'}, 400); }
        if (course !== 'mentoring-campaign') return json({error: '講座の提供は終了しました。'}, 410);
        const priceId = course === 'mentoring-campaign' && prices(env)[course];
        if (!priceId) return json({error: 'この講座の販売準備中です。'}, 400);
        const stripe = makeStripe(env.STRIPE_RESTRICTED_KEY);
        const price = await stripe.prices.retrieve(priceId);
        if (price.livemode || !price.active || price.type !== 'one_time' || price.unit_amount === null) return json({error: '価格設定を確認中です。'}, 409);
        const nonce = crypto.randomUUID();
        const suffix = Array.from(crypto.getRandomValues(new Uint8Array(8)), n => String.fromCharCode(97 + n % 26)).join('');
        const session = await stripe.checkout.sessions.create({
          mode: 'payment', line_items: [{price: priceId, quantity: 1}],
          success_url: `${origin}/learn/payment-result?course=${course}&session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${origin}/learn/mentoring?checkout=cancelled`,
          metadata: {course, browser_hash: await hash(nonce)},
          integration_identifier: `maepace_learn_${suffix}`,
        }, {idempotencyKey: nonce});
        if (session.livemode || !session.url || new URL(session.url).hostname !== 'checkout.stripe.com') throw new Error('Unexpected checkout');
        const secure = url.protocol === 'https:' ? '; Secure' : '';
        return json({url: session.url}, 200, {'Set-Cookie': `${cookieName(course)}=${nonce}; Path=/api/payments; HttpOnly; SameSite=Lax; Max-Age=86400${secure}`});
      }
      if (url.pathname === '/api/payments/result' && request.method === 'GET') {
        if (!ready(env)) return json({error: 'テスト決済は設定中です。'}, 503);
        const course = url.searchParams.get('course');
        const id = url.searchParams.get('session_id');
        if (!validCourse(course) || !prices(env)[course] || !/^cs_test_[a-zA-Z0-9]+$/.test(id || '')) return json({error: 'Invalid request'}, 400);
        const nonce = (request.headers.get('Cookie') || '').split(';').map(s => s.trim()).find(s => s.startsWith(`${cookieName(course)}=`))?.split('=')[1];
        if (!nonce) return json({error: '決済を開始したブラウザーで開いてください。'}, 403);
        const session = await makeStripe(env.STRIPE_RESTRICTED_KEY).checkout.sessions.retrieve(id);
        if (session.livemode || session.metadata?.course !== course || session.metadata?.browser_hash !== await hash(nonce)) return json({error: '決済情報を確認できません。'}, 403);
        return json({sandbox: true, paid: session.status === 'complete' && session.payment_status === 'paid'});
      }
      return json({error: 'Not found'}, 404);
    } catch {
      // Never return provider errors, account details, or credentials to the browser.
      return json({error: '決済サービスに接続できませんでした。しばらくしてからお試しください。'}, 502);
    }
  };
}
export default {fetch: createHandler()};
