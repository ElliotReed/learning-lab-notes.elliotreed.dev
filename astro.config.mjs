// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import path from 'node:path';
import icon from "astro-icon";
import remarkToc from 'remark-toc';
import rehypeCopyButton from './src/utils/rehype-copy-button';

export default defineConfig({
    experimental: {},
    image: {
        layout: 'constrained',
    },
    integrations: [
        icon(),
        mdx(),
    ],
    markdown: {
        shikiConfig: {
            theme: 'vitesse-black',
        },
        remarkPlugins: [[remarkToc, { heading: "contents" }]],
        rehypePlugins: [rehypeCopyButton],
    },
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