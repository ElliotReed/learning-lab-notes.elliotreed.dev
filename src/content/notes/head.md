---
date: 2025-07-04
title: "The <head> element"
categories: ["html"]
---

## Contents

```js
interface Props {
    site: {
        title: string; // Page title (e.g. "About - My Site")
        description?: string; // For SEO and meta tags
        image?: string; // OpenGraph/social share image
        canonical?: string; // If this page has a canonical URL
        keywords?: string[]; // Optional SEO keywords
        noIndex?: boolean; // Tells search engines not to index
        layoutStyle?: string; // To switch visual layouts per page
    };
}
```