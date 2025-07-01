---
title: "GraphQL"
date: 2027-09-10
categories: ["database"]
---

- TOC
{:toc}

GraphQL's SDL syntax requires an extra `!` when a field is required,an extra `?` character when a field is not required.

**every query/mutation must have a unique name** across your entire application

## Queries

Write a query

```ts
graphql`
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
`
```

## Relation Resolver

```graphQl
export const Post = {
  user: (_obj, { root }) =>
    db.post.findFirst({ where: { id: root.id } }).user(),
}
```

- First, declare a variable with the same name as the model this service is for: Post for the posts service.
- Set that to an object containing keys that are the same as the fields that are going to be looked up, in this case user.

When GraphQL invokes this function it passes a couple of arguments, one of which is root which is the object that was resolved to start with, in this case the post in our GraphQL query:

```graphQl
post {   <- root
  id
  title
  body
  createdAt
  user {
    name
  }
}
```

That post will already be retrieved from the database, and so we know its id. root is that object, so can simply call .id on it to get that property.
