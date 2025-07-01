---
title: "Markdown"
date: 2023-12-09
categories: ["markdown"]
---

- TOC
{:toc}

<https://www.markdownguide.org>

Markdown Cheat Sheet

A quick reference to the Markdown syntax.
Overview

This Markdown cheat sheet provides a quick overview of all the Markdown syntax elements. It can’t cover every edge case, so if you need more information about any of these elements, refer to the reference guides for basic syntax and extended syntax.
Basic Syntax

These are the elements outlined in John Gruber’s original design document. All Markdown applications support these elements.

## Basic Syntax

| Element | Markdown Syntax |
| ----------- | ----------- |
| Heading |# H1 <br> ## H2 <br> ### H3|
|Bold | `**`**bold text**`**`|
|Italic | `*`*italicized text*`*`|
|Blockquote | > blockquote|
|Ordered List | 1. First item <br> 2. Second item <br> 3. Third item|
|Unordered List | - First item <br> - Second item <br> - Third item|
|Code | `code`|
|Horizontal Rule | --- |
|Link | \[title](<https://www.example.com>) |
|Image | !\[alt text](image.jpg) |

## Extended Syntax

These elements extend the basic syntax by adding additional features. Not all Markdown applications support these elements.

|Element | Markdown Syntax |
| ---------- | ----------- |
|Table  | &#124; Syntax &#124; Description &#124; <br> &#124; ----------- &#124;  ----------- &#124; <br> &#124; Header &#124; Title &#124; <br> &#124; Paragraph &#124; Text &#124; |
|Fenced Code Block |  \`\`\` <br> { <br> &nbsp; "firstName": "John", <br> &nbsp; "lastName": "Smith", <br> &nbsp; "age": 25 <br> } <br> \`\`\` |
|Footnote | Here's a sentence with a footnote. [^1] <br> [^1]: This is the footnote.|
|Heading ID | ### My Great Heading {#custom-id}|
|Definition List | term <br>: definition|
|Strikethrough | \~~The world is flat.\~~|
|Task List | - [x] Write the press release <br> - [ ] Update the website <br> - [ ] Contact the media|
|Emoji <br> (see also Copying and Pasting Emoji) | That is so funny! &#58; joy &#58;|
|Highlight | I need to highlight these ==very important words==.
|Subscript | H~2~O|
|Superscript | X^2^|

## Links

In document links work for headers.

Use a single "#" to link:

```console
[Basic Syntax](#basic-syntax)
```
