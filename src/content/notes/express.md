---
title: "Express"
date: 2024-01-05
categories: ["express"]
---

<!-- toc -->

## Typescript

[typsescript](https://www.typescriptlang.org/)

Install typescript, ts-node and @types/typescript as devDependancies.

```shell
npm i -D typescript ts-node @types/typescript
```

Create tsconfig.json using the typescript cli.

```shell
tsc --init
```

tsconfig.json options:

```json
"target": "ESNext",
"baseUrl": "./src",
"module": "CommonJS",
```
