---
title: "SASS"
date: 2024-01-02
categories: ["css"]
---

![sass](https://sass-lang.com/assets/img/logos/logo.svg)


## Documentaion

[Go to the Sass website](https://sass-lang.com/).

## Interpolation

### Syntax

```sass
#{$variable}
```

Use for `calc()`:

```sass
width: calc(100% + #{variable});
```

## 🧱 Sass Token Structure for Design Systems

When building your own design system or component library using Sass, organize your tokens in layers of abstraction. Here's a structured approach.

---

### ✅ Core Idea: Multi-Level Token Structure

#### **Level 1: Primitive tokens (raw values)**

```scss
// _tokens/_colors.scss
$color-blue-500: #3b82f6;
$color-gray-100: #f3f4f6;

// _tokens/_spacing.scss
$space-1: 0.25rem;
$space-2: 0.5rem;
```

* These are raw, reusable values.
* Use a naming convention that matches utility scales (like Tailwind).

---

#### **Level 2: Semantic tokens**

```scss
// _tokens/_semantic.scss
$color-primary: $color-blue-500;
$color-background: $color-gray-100;
$space-content-padding: $space-4;
```

* Represent **meaningful roles**, not values.
* Easier to theme and maintain.

---

#### **Level 3: CSS custom properties (optional)**

```scss
:root {
  --color-primary: #{$color-primary};
  --space-content-padding: #{$space-content-padding};
}
```

* Enables runtime theming and overrides.
* Works well with Web Components and framework interop.

---

### 📦 Recommended File Structure

```
/tokens
  _colors.scss
  _spacing.scss
  _typography.scss
  _semantic.scss
/_variables.scss // imports and exposes tokens
/components/
  _buttons.scss
  _cards.scss
```

---

### 🧠 Tailwind-like Scales to Include

| Token Type | Examples                            |
| ---------- | ----------------------------------- |
| Colors     | `$color-blue-100`, `$color-red-700` |
| Spacing    | `$space-1` → `$space-64`            |
| Sizes      | `$size-sm`, `$size-lg`, `$size-xl`  |
| Font sizes | `$font-xs` → `$font-4xl`            |
| Border     | `$radius-sm`, `$radius-lg`          |
| Z-index    | `$z-content`, `$z-overlay`          |

---

### ✨ Optional: JSON-Based Token Source

* Define tokens in JSON/YAML and generate outputs via build tools.
* Use tools like [Style Dictionary](https://amzn.github.io/style-dictionary/) or a custom Node script.

---

### ✅ Summary

| Token Layer      | Purpose                |
| ---------------- | ---------------------- |
| Primitive        | Raw consistent values  |
| Semantic         | Abstracted, meaningful |
| CSS custom props | Runtime flexibility    |
