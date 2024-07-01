import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { VitePWA } from 'vite-plugin-pwa';

// For more info, visit: https://vitejs.dev/config/
export default defineConfig( {
	plugins: [
		react(),
		svgr( {
			svgrOptions: {
			// svgr options
			},
		} ),
		VitePWA(
			{
				registerType: 'autoUpdate',
				// Below manifest options will be added to the generated `manifest.webmanifest`.
				manifest: {
					short_name: 'Netflix-Clone',
					start_url: '/',
					display: 'standalone',
					theme_color: '#000000',
					icons: [
						{
							src: 'icons/favicon_512.png',
							sizes: '512x512',
							type: 'image/png',
						},
						{
							src: 'icons/favicon_maskable_512.png',
							sizes: '512x512',
							type: 'image/png',
							purpose: 'maskable',
						},
						{
							src: 'icons/favicon_192.png',
							sizes: '192x192',
							type: 'image/png',
						},
						{
							src: 'icons/favicon_maskable_192.png',
							sizes: '192x192',
							type: 'image/png',
							purpose: 'maskable',
						},
					],
				},
				workbox: {
					runtimeCaching: [
						{
							// Cache only fixed no. of static resources, not dynamic ones like brightcove
							urlPattern: ( { url } ) => !/(brightcove\.com)/.test( url.host ),

							// Fetch up-to-date resources from network if online,
							// and potentially deprecated resources from cache if offline.
							handler: 'NetworkFirst',
							options: {
								cacheName: 'static-cache',
								cacheableResponse: {
									statuses: [ 0, 200 ],
								},
							},
						},
					],
				},
			},
		),
	],
	server: {
		port: 3000,
	},
	preview: {
		port: 3000, // Keeping 3000 to prevent CORS
	},
} );
