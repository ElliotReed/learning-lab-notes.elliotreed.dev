---
title: "Github"
date: 2023-12-07
categories: ["github"]
---

- TOC
{:toc}

## installation

## cli

### usage

- gh repo

  - create interactively

          gh repo create

## github pages

uses [jekyll](https://jekyllrb.com/)

### setup

- Settings>Pages

  - "Deploy from a branch" main
  - Click the Save button.

- create "./_config.yml"

  example

        theme: minima
        title: dev notes
        author: elliot reed
        description: notes

### site

- create "./index.md" or "./README.md"
  - add homepage content

- jekyll, create blog with files named "_posts/YYYY-MM-DD-title.md"
- include title and date

      ---
      title: "YOUR-TITLE"
      date: YYYY-MM-DD
      ---
