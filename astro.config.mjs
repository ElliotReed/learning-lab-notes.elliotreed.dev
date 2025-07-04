// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import path from 'node:path';
import icon from "astro-icon";

export default defineConfig({
    experimental: {},
    image: {
        layout: 'constrained',
    },
    integrations: [
        icon(),
        mdx(),
    ],
    trailingSlash: 'always',
    vite: {
        resolve: {
            alias: {
                '@': path.resolve('./src'),
                '@images': path.resolve('./src/assets/images'),
            },
        },
    },
});