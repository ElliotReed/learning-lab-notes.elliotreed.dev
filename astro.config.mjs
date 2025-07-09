// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import path from 'node:path';
import icon from "astro-icon";
import rehypeCopyButton from './src/plugins/rehype-copy-button';
import remarkCollectHeadings from './src/plugins/remark-collect-headings';

export default defineConfig({
    experimental: {},
    image: {
        layout: 'constrained',
    },
    integrations: [
        icon(),
        mdx({
            remarkPlugins: [remarkCollectHeadings]
        }),
    ],
    markdown: {
        shikiConfig: {
            theme: 'vitesse-black',
        },
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