// Éclore : cache "stale-while-revalidate" (affichage immédiat, mise à jour en arrière-plan). L'API Supabase n'est jamais mise en cache.
const C='eclore-v12',A=['./','index.html','manifest.webmanifest','icon.svg','assets.js'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(A.map(u=>new Request(u,{cache:'reload'})))).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);
 if(r.method!='GET'||!(u.origin==location.origin||u.hostname=='cdn.jsdelivr.net'||u.hostname=='cdnjs.cloudflare.com'))return;
 e.respondWith(caches.match(r).then(c=>{const n=fetch(r).then(x=>{if(x&&x.ok){const y=x.clone();caches.open(C).then(k=>k.put(r,y))}return x}).catch(()=>c);return c||n}))});
