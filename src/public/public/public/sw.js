self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => clients.claim());
// sem fetch handler: segue comportamento padrão de rede
