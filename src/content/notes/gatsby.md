---
title: "Gatsby"
date: 2025-06-28
categories: ["react", "gatsby"]
---


## Concepts

Gatsby uses **graphql** queries to access a *data layer*, which can then be used in the app.

## Queries (Data Layer)

### Static Query

```js
import { graphql, useStaticQuery } from "gatsby";
```

Write a query to the *data layer*.

In your ***component***:

```ts
const data = useStaticQuery<ReturnValue>(graphql`
  query {
    site {
      siteMetadata {
        author
        description
        siteUrl
        title
      }
    }
  }
`)
```

**useStaticQuery** cannot use query variables.

### Page Query

Export the query (can have *variables*).

**Must** be in a page component.

```js
export const query = graphql`
query {
  allMdx(
    filter: {
      fields: {source: {eq: "portfolio"}}, 
      frontmatter: {
        tags: {in: "organization"},
        isActive: {eq: true}
        }
      }
  ) {
    nodes {
      fields {
        source
      }
      frontmatter {
        slug
        title
        hero_image {
          childImageSharp {
            gatsbyImageData(width: 300)
          }
        }
        hero_image_alt
      }
      id
    }
  }
}
`;
```

Import it as component props.

```js
export default function Page({ data }: Readonly<PageProps<PageData>>) {}
```

## API

### File System Route API

Use a template syntax to create *dynamic* routes.

- /pages/[path folders]/{[query]}.tsx

queries are formatted as:

- {mdx.frontmatter__slug}

When you use Gatsby’s File System Route API, it automatically adds some props into the page template component for each page:

- The id for the data layer node used to create the page.
- The field you used to create the dynamic part of the route. (In this case, the frontmatter__slug field.)

Under the hood, Gatsby makes both of these values available to use as query variables in your page queries.

## Plugins

### gatsby-source-filesystem

Create a seperate object for each **filesystem source**.

```js
gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        // The unique name for each instance
        name: `pages`,
        // Path to the directory
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`,
        // Ignore files starting with a dot
        ignore: [`**/\.*`],
        // Use "mtime" and "inode" to fingerprint files (to check if file has changed)
        fastHash: true,
      },
    },
  ],
}
```

### gatsby-plugin-image

[Documentation](https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-plugin-image)

#### Image Properties

- layout
  - "constrained"
  - "fixed"
  - "fullWidth"

#### Static Images

```js
import {StaticImage} from "gatsby-plugin-image"
```

```js
<StaticImage />
```

#### Dynamic Images

```js
import {GatsbyImage, getImage} from "gatsby-plugin-image"
```

The getImage() helper function get the childSharp > GatsbyImageData from containing node.

```js
<GatsbyImage image={image}/>
```

toggle the childImageSharp field, and then check the box for the gatsbyImageData field.

```js
query ($id: String) {
  mdx(id: {eq: $id}) {
    frontmatter {
      title
      date(formatString: "MMMM D, YYYY")
      hero_image_alt
      hero_image_credit_link
      hero_image_credit_text
      hero_image {
        childImageSharp {
          gatsbyImageData
        }
      }
    }
  }
}
```

### Markdown

- gatsby-remark-autolink-headers
- gatsby-remark-copy-linked-files
- gatsby-remark-images

#### gatsby-remark-prismjs

[gatsby-remark-prismjs]("https://www.gatsbyjs.com/plugins/gatsby-remark-prismjs/").

Install the plugin:

``` shell
npm install gatsby-remark-prismjs
```

<br/>

Add to gatsby-config under remark plugins (I'm using *gatsby-remark-mdx* as my transformer). This shows the default options:

```js
gatsbyRemarkPlugins: [
  {
    resolve: `gatsby-remark-prismjs`,
    options: {
      classPrefix: "language-",
      inlineCodeMarker: null,
      aliases: {},
      showLineNumbers: false,
      languageExtensions: [
        {
          language: "superscript",
          extend: "javascript",
          definition: {
            superscript_types: /(SuperType)/,
          },
          insertBefore: {
            function: {
              superscript_keywords: /(superif|superelse)/,
            },
          },
        },
      ],
      prompt: {
        user: "root",
        host: "localhost",
        global: false,
      },
      escapeEntities: {},
    },
  },
],
```

<br/>

Add the theme to the gatsby-browser file:

``` js
require("prismjs/themes/prism-tomorrow.css");
```

Theme options are available on the [prismjs website](https://prismjs.com/).

If you need to overwrite the styles with your own, create a stylesheet (in this case "/src/styles/global.scss");

Add this to the gatsby-browser file:

``` js
require("./src/styles/global.scss");
```

This is what my sass file looks like to overide some basic styles:

``` scss
@use "./abstracts" as *;

.gatsby-highlight-code-line {
  background-color: get-color("black");
  display: block;
  margin-right: -1em;
  margin-left: -1em;
  padding-right: 1em;
  padding-left: 0.75em;
  border-left: 0.25em solid #f99;
}

/**
 * Add back the container background-color, border-radius, padding, margin
 * and overflow that we removed from <pre>.
 */
.gatsby-highlight {
  background-color: get-color("black");
  border-radius: $border-radius;
  padding: $space-md;
  overflow: auto;
  @include scrollbar;
}

/**
 * Remove the default PrismJS theme background-color, border-radius, margin,
 * padding and overflow.
 * 1. Make the element just wide enough to fit its content.
 * 2. Always fill the visible space in .gatsby-highlight.
 * 3. Adjust the position of the line numbers
 */
.gatsby-highlight pre[class*="language-"] {
  background-color: transparent;
  margin: 0;
  padding: 0;
  overflow: initial;
  float: left;
  /* 1 */
  min-width: 100%;
  /* 2 */
}
```

## Typescript

### SASS

In  a file declarations.d.ts add:

```ts
declare module '*.scss';
```
