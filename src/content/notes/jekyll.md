---
title: "Jekyll"
date: 2023-12-07
categories: ["jekyll"]
---

* TOC
{:toc}

## Resources

* <https://jekyllrb.com/>
* <https://mademistakes.com/>
* <https://mademistakes.com/mastering-jekyll/>
* <https://mademistakes.com/mastering-jekyll/site-url-baseurl/>

## Setup

  After installing Ruby (follow this [link ]({%  link _notes/ruby.md %}) for instructions):

  Install jekyll and bundle

  ```console
  gem install jekyll bundler
  ```

  Create a new site

  ```console
  jekyll new [name or .]
  ```

  Add the `--`blank flag if creating from scratch.

  On first run

  ```console
  bundle exec jekyll serve
  ```

  "serve" can be shortened to "s".

  Subsequent runs, just

  ```console
  jekyll s
  ```

## Config

* _config.yml

  example

```yml
title: learning lab notes
author: elliot reed
email: <dev@elliotreed.net>
description: >- # this means to ignore newlines until "baseurl:"
  A personal note site.
baseurl: "/learning-lab-notes" # the subpath of your site, e.g. /blog
url: "<https://github.com/ElliotReed>" # the base hostname & protocol for your site, e.g. <http://example.com>
# twitter_username: jekyllrb
# github_username:  jekyll

# Build settings

theme: minima
plugins:

- jekyll-feed
```

* Use index.md for entry

  * add homepage content

* Add README.md

  * for github

## Blog files

* create blog with files named "_posts/YYYY-MM-DD-title.md"
* include title and date (other keys such as layout and categories also)

```yml
---
layout: post
title: "YOUR-TITLE"
date: YYYY-MM-DD
categories: developer
---
```

## Themes

### minima

<https://github.com/jekyll/minima>

default theme for jekyll

To have your CSS overrides in sync with upstream changes released in future versions, you can collect all your overrides for the Sass variables and mixins inside a sass file placed at _sass/minima/custom-variables.scss and all other overrides inside a sass file placed at path_sass/minima/custom-styles.scss.

## Sytax Highlights

Jekyll comes with highlighter [Rouge](https://github.com/rouge-ruby/rouge) built in.

List of [language definitions](https://github.com/rouge-ruby/rouge/blob/master/docs/Languages.md)

You need a stylesheet for this to work, find themes at <https://jwarby.github.io/jekyll-pygments-themes/languages/ruby.html>

Add the sheet into your _sass directory and modify to suit.

Use by wrapping your code blocks with \{`% highlight lang %`\} and \{`% endhighlight %`\} tags.

Add \{`% raw %`\} and \{`% endraw %`\} if language uses curly braces.

Fencing syntax works also?

## Table of Contents

Using a list item seperator (*, -) before "TOC"

```kramdown
```

When using jekyll's liquid syntax, the syntax symbols need to be escaped with "raw"

{% raw %}

```jeykll
{% prints literally %}
{{ prints literally }}
```

{% endraw %}
