---
title: "CSS"
date: 2024-01-02
categories: ["css"]
---

- TOC
{:toc}

## Aria

### aria-label

The [aria-label] attribute only works on elements that have a [role], either implicit (like with button, a, and so on), or added used the [role] attribute (where appropriate).

Also, as Adrian Roselli has pointed out, [aria-label] is often not translated by automatic translation software.

As an alternative, you can use a .visually-hidden class to include content that’s exposed to screen readers but hidden visually in the HTML.

```css
.visually-hidden {
 border: 0;
 clip: rect(0 0 0 0);
 height: 1px;
 overflow: hidden;
 padding: 0;
 position: absolute;
 white-space: nowrap;
 width: 1px;
}
```

## Images

Standard image properties:

```css
img {
  display: block;
  width: 100%;
}
```

## Inputs

### Label in Input

HTML

```html
<div class="field relative">
  <label for="email">Label</label>
  <input type="email" name="email" placeholder="" required/>
</div>
```

Tailwind example:

```css
label {
  @apply font-handwriting uppercase text-xl tracking-tighter
}

label:has(+ input:placeholder-shown) {
  @apply text-3xl absolute top-8 left-8 pointer-events-none transition-all duration-300
}

label:has(+ input),
label:has(+ input:focus) {
  @apply absolute top-2 left-2 text-xl
}

input[type="email"],
input[type="number"],
input[type="password"],
input[type="tel"],
input[type="text"],
input[type="url"] {
  @apply font-sans text-2xl h-[100px] w-full px-7 border-black border-2
}

/* invalid label */
label:has(+ input:invalid:not(:placeholder-shown)) {
  @apply text-white
}

/* invalid input */
input:invalid:not(:placeholder-shown) {
  @apply bg-orangeRed border-fireEngineRed
}
```

## Challenge Sites

### CSSBattle

[CSSBattle](https://cssbattle.dev/)

Judged by least number of characters. Learning from solutions is worthless.

Good to try for matching on my own.

## Resets

[Normalize CSS](https://necolas.github.io/normalize.css/)

## Shapes

### Triangle

[The Shapes of CSS](https://css-tricks.com/the-shapes-of-css/)

The `border-left` property is transparent, defines the left side.

The `border-right` property is transparent, defines the right side.

The top (or bottom) border is the actual triangle itself.

```css
#triangle-up {
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 100px solid red;
}
```

### Microphone

Code I wrote to make an image of an 40's style microphone. It's CSSBattle code, so will need modified to use.

```css
* {
  background: #1e1d50;
  margin: 20 55;
  * {
    position: relative;
    width: 180;
    height: 220;
    background: #eeecf6;
    border-radius: 100%/80%;
    outline: 20px solid #1e1d50;
    outline-offset:- 40px;

    &:before, &:after {
      position: absolute;
      content: '';
      height: 82;
      width: 20;
      bottom: -40px;
      left: 80px;
      background: #eeecf6
    }

    &:before {
      top: 80;
      left: 40;
      background: linear-gradient(#1e1d50 20px,transparent 20px,transparent 40px, #1e1d50 40px);
      height: 60;
      width: 50;
```

## Typography

### Responsive Font Size

This give good font size on all devices.

```css
:root {
  font-size: calc(15px + .390625vw);
}
```

### Letter-spacing

The letter-spacing property in CSS specifies the amount of space to be added between characters in a text. It can be expressed in various units, including pixels, ems, or percentages.

When computing the actual spacing between characters, the letter-spacing value is added to or subtracted from the default spacing of the font. If the letter-spacing value is positive, it adds space between characters, making them appear further apart. If it's negative, it reduces the space between characters, making them appear closer together.
