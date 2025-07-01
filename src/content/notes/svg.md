---
date: 2024-07-04
title: "Svg"
categories: ["images"]
---

- toc
{:toc}

## Favicon

Create favicon.svg with this code:

```html
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
viewbox="0 0 16 16">
    <style>
        circle {
            fill: #000;
        }
        text {
            fill: #fff;
        }
        @media (prefers-color-scheme: dark) {
            circle {
                fill: #fff;
            }
        text {
            fill: #000;
        }
        }
    </style>
    <circle cx="8" cy="8" r="8" />
    <text x="50%" y="50%" text-anchor="middle" font-size="12px" font-family="system-ui" dy=".4em">ER</text>
</svg>
```

In the head:

```html
    <link rel="icon" href="./favicon.svg">
```
