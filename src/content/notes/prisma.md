---
title: "Prisma"
date: 2024-01-02
categories: ["orm"]
---

- TOC
{:toc}

GraphQL's SDL syntax requires an extra `!` when a field is required. Remember: schema.prisma syntax requires an extra `?` character when a field is not required.

## Installation

Locally install the prisma cli:

```console
npm i -D prisma
```

Install the prisma client

```console
npm i @prisma/client
```

## Initialize

```console
npx prisma init
```

This also adds DATABASE_URL to the .env file.

Create the database and then run:

```console
npx prisma generate
```

to generate the client inside the node_modules folder.

## schema.prisma

Create the schema file and prisma folder:

Example:

```js
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

generator client {
  provider      = "prisma-client-js"
  binaryTargets = "native"
}

model Post {
  id        Int       @id @default(autoincrement())
  title     String
  body      String
  comments  Comment[]
  createdAt DateTime  @default(now())
}

model Contact {
  id        Int      @id @default(autoincrement())
  name      String
  email     String
  message   String
  createdAt DateTime @default(now())
}

model User {
  id                  Int       @id @default(autoincrement())
  name                String?
  email               String    @unique
  hashedPassword      String
  salt                String
  resetToken          String?
  resetTokenExpiresAt DateTime?
}

model Comment {
  id        Int      @id @default(autoincrement())
  name      String
  body      String
  post      Post     @relation(fields: [postId], references: [id])
  postId    Int
  createdAt DateTime @default(now())
}
```

### Relation

Comment has a relation to Post:

- post which has a type of Post and a special @relation keyword that tells Prisma how to connect a Comment to a Post. In this case the field postId references the field id in Post

- postId is just a regular Int column which contains the id of the Post that this comment is referencing

This gives us a classic database model:

```mermaid
┌───────────┐       ┌───────────┐
│   Post    │       │  Comment  │
├───────────┤       ├───────────┤
│ id        │───┐   │ id        │
│ title     │   │   │ name      │
│ body      │   │   │ body      │
│ createdAt │   └──<│ postId    │
└───────────┘       │ createdAt │
                    └───────────┘
```

When you query for a Comment using Prisma you can get access to the attached Post using that name:

```js
db.comment.findUnique({ where: { id: 1 }}).post()
```

Prisma also added a convenience comments field to Post which gives us the same capability in reverse:

```js
db.post.findUnique({ where: { id: 1 }}).comments()
```

## Prisma and the N+1 Problem

If you have any experience with database design and retrieval you may have noticed this method presents a less than ideal solution: for every post that's found, you need to perform an additional query just to get the user data associated with that post, also known as the N+1 problem. This is just due to the nature of GraphQL queries: each resolver function really only knows about its own parent object, nothing about potential children.

There have been several attempts to work around this issue. A simple one that includes no extra dependencies is to remove this field resolver and simply include user data along with any post you retrieve from the database:

```js
export const post = ({ id }) => {
  return db.post.findUnique({
    where: { id },
    include: {
      user: true
    }
  })
}
```

This may or may not work for you: you are incurring the overhead of always returning user data, even if that data wasn't requested in the GraphQL query. In addition, this breaks further nesting of queries: what if you wanted to return the user for this post, and a list of all the other posts IDs that they created?

```graphql
post {
  id
  title
  body
  createdAt
  user {
    name
    posts {
      id
    }
  }
}
```

This query would now fail because you only have post.user available, not post.user.posts.

## findUnique() vs. findFirst()

- **findUnique()** requires that any attributes in the where clause have unique indexes, which id does, but userId does not.

- **findFirst()** allows you to put whatever you want in the where, which may return more than one record, but Prisma will only return the first of that set. In this case we know there'll always only be one, because we're selecting by id in addition to userId.
