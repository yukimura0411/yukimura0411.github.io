// Service Worker (sw.js)
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// プッシュ通知イベントの受信
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : { title: 'リマインダー', body: '期限が近づいているタスクがあります。' };
  
  const options = {
    body: data.body,
    icon: './icon.png',
    badge: './icon.png',
    v1: [200, 100, 200]
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// 通知をクリックした時の動作
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('./index.html')
  );
});