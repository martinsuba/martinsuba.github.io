// Replaces the old site's service worker (scope "/"). Browsers that still have the old worker fetch this file on
// their next update check; it clears the old caches, unregisters itself and reloads open pages.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
	event.waitUntil(
		(async () => {
			const keys = await caches.keys();
			await Promise.all(keys.map((k) => caches.delete(k)));
			await self.registration.unregister();
			const clients = await self.clients.matchAll({ type: 'window' });
			clients.forEach((c) => c.navigate(c.url));
		})(),
	);
});
