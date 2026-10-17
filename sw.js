const C='eclore-v11',A=['./','index.html','manifest.webmanifest','icon.svg','assets.js'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(A)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);
 if(r.method!='GET'||!(u.origin==location.origin||u.hostname=='cdn.jsdelivr.net'||u.hostname=='cdnjs.cloudflare.com'))return; // l'API Supabase n'est jamais mise en cache
 e.respondWith(fetch(r).then(x=>{const y=x.clone();caches.open(C).then(c=>c.put(r,y));return x}).catch(()=>caches.match(r)))});
