// @ts-check
import { defineConfig, envField } from 'astro/config';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

import vercel from '@astrojs/vercel';
import node from '@astrojs/node';

// The Vercel adapter's packaging step requires symlink permissions that
// Windows dev machines typically lack; use the Node adapter for local builds.
const isVercel = Boolean(process.env.VERCEL);

// https://astro.build/config
export default defineConfig({
  site: 'https://www.redisites.com',
  trailingSlash: 'never',
  integrations: [react(), sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },

  image: {
    remotePatterns: [{ protocol: 'https' }],
  },

  env: {
    schema: {
      WORDPRESS_API_URL: envField.string({ context: 'server', access: 'secret', optional: true }),
      PUBLIC_GOOGLE_MAPS_API_KEY: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
      }),
    },
  },

  adapter: isVercel ? vercel() : node({ mode: 'standalone' }),
});
