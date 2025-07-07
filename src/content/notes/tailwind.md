---
title: "Tailwind"
date: 2024-01-02
categories: ["css"]
---

## Contents

## Root

The root file is **index.css**

Handle editor code check errors [VSCode](#vscode-settings)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Import fonts

```css
 @import url('https://fonts.googleapis.com/css2?family=Agbalumo&family=Bebas+Neue&family=Inter:wght@400;500;700&family=Kalam:wght@700&display=swap');
```

Extend layers

```css
 @layer base {}

 @layer components {}

 @layer utilities {}
```

### svg

Add to base layer to get text color fill

```css
 @layer base {
  svg {
    @apply fill-current
  }
 }
 ```

## Config

tailwind.config

```js
module.exports = {
  content: ['src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        supernova: '#fac900' /*yellow / warning */,
        spicyMustard: '#6e5a0d' /* dark yellow */,
        bombay: '#aeaeae' /* light gray */,
        orangeRed: '#ff4600' /* red / error */,
        cognac: '#9a360e' /* dark red */,
        fireEngineRed: '#c52425' /* dark red */,
        silverTree: '#70bd91' /* light green */,
        turquoiseGreen: '#a0ccb7' /* very light green */,
        spanishGreen: '#008a52' /* medium green */,
        cruseo: '#0a5d2c' /* dark green */,
        countyGreen: '#003d19' /* darkest green */,
        acadia: '#392f2d' /* brown */,
        scotchMist: '#efe9cb' /* light brown */,
        nileBlue: '#243853' /* blue */,
        blackPearl: '#071126' /* navy blue */,
        pastelMagenta: '#ff9dbf' /* pink */,
        padua: '#b1e3cc' /* lightest green - placeholder color */,
        vistaBlue: '#94d1b4' /* light green - placeholder color*/,
      },
    },
    fontFamily: {
      condensed: ['Bebas Neue', 'sans-serif'],
      handwriting: ['Kalam', 'cursive'],
      sans: ['inter', 'sans-serif'],
      script: ['Agbalumo', 'cursive'],
    },
  },
  plugins: [],
}
```

To add a property "width", add to the **extend** object

```js
theme: {
  extend: {
    colors: {
        // ...
    },
    height: {
      18: '72px',
    },
    width: {
      18: '72px',
    },
  }
}
```

## vscode settings

This is to stop error reporting in the talilwind index.css

Create file "css-data.json"

```json
{
  "version": 1.1,
  "atDirectives": [
    {
      "name": "@tailwind",
      "description": "Use the @tailwind directive to insert Tailwind's `base`, `components`, `utilities`, and `screens` styles into your CSS."
    },
    {
      "name": "@apply",
      "description": "Use @apply to inline any existing utility classes into your own custom CSS."
    },
    {
      "name": "@layer",
      "description": "Use @layer base, component and utilities."
    }
  ]
}
```

Add to settings file

```json
  "css.customData": [
    "./.vscode/css-data.json"
  ],
```
