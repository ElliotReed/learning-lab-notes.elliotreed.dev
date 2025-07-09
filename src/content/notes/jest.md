---
date: 2024-01-14
title: "Jest"
categories: ["testing"]
---


## Setup

Install

```shell
npm install --save-dev
```

For Typescript, install types

```shell
npm i @types/jest -D //? not sure
```

Init configuration file

```shell
npm init jest@latest
```

You will be asked if you want to use babel, needed to use esm

### Using Babel

```shell
npm install --save-dev babel-jest @babel/core @babel/preset-env
```

Configure Babel to target your current version of Node by creating a `babel.config.js` file in the root of your project:

*babel.config.cjs* must use `.cjs` extension

```shell
module.exports = {
  presets: [['@babel/preset-env', {targets: {node: 'current'}}]],
};
```
