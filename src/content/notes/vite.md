---
date: 2024-06-07
title: "Vite"
categories: ["build"]
---


[Vite](https://vitejs.dev/)

Frontend tooling

## Instalation

```code
npm create vite@latest
```

## Config

[vite config](https://vitejs.dev/config)

Vite's config file (vite.config.ts)

To import kebab case into a styles object:

```css
.icon-button {
  \\ properties
}
```

and import as 'styles' in camelCase use this config:

```js
css: {
  modules: {
    localsConvention: 'camelCase',
  }
},
```

```js
export default defineConfig({
  plugins: [
    react(),
  ],
})
```

Add an alias to defineConfig()

```js
resolve: {
  alias: {
    '@': path.resolve(__dirname, 'src'),
  },
}
```

If using typescript add to tsconfig

```json
"baseUrl": ".",
"paths": {
  "@/*": ["src/*"],
},
```

Add multiple page endpoints:

```js
// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: './index.html',
                about: './about.html' // add your new HTML page here
            }
        }
    }
});
```

## Development

To run on the local network (for phone, device, etc.) add `--host` to the 'dev' script in package.json.

```json
"dev": vite --host
```

 that will expose the port 5173 on the network IPV4 address.
