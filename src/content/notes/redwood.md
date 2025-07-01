---
title: "Redwood"
date: 2024-01-02
categories: ["react"]
tags: ["react", "storybook", "prisma"]
---

- toc
{:toc}

## About

[ReddwoodJS](https://redwoodjs.com/) is a  React framework that combines

- GraphQL
- Prisma
- TypeScript
- Jest
- Storybook
- vite
- Babel

### Browser Urls

- Redwood <http://localhost:8910/>
- Prisma Studio <http://localhost:5555/>
- GrapiQL <http://localhost:8911/graphql>
- Storybook

## Install NVM

Redwood has locked versions for full stack and deploy capabilities.

Used [nvm-windows](https://github.com/coreybutler/nvm-windows) to handle multiple versions of node (needed for [Redwood.js]({%  link _notes/redwood.md %}))

nvm use [version]

- 18.19.0
- 20.10.0

Add this to package.json to simplify remembering versions

```json
  "scripts": {
    "nvm": "nvm use 18.19.0"
  },
```

## Create a Redwoodjs App

Switch node version to 18 using nvm

```shell
nvm use 18.19.0
```

The Redwood cli will create the directory, so start the command in the containing directory.

If you leave off the name it will be asked by the cli.

```shell
yarn create redwood-app
```

Say no to the cli when it asks to yarn install, that will try to use the incorect version.

cd into the app directory and run:

```shell
yarn install
```

To start the app, run:

```shell
yarn rw dev
```

To upgrade:

```shell
yarn rw upgrade
```

### UI Setup

[Redwood can start a ui setup](#ui)

## Structure

Redwood uses two source folders:

- **api** for the backend
- **web** for the frontend

To install additional packages use the workspace command in the cli.

```console
yarn workspace web add some-package
```

## Full Stack (API and Web)

### Authentication

 Docs: [self-hosted](https://redwoodjs.com/docs/auth/dbauth) and [third-party authentication](https://redwoodjs.com/docs/authentication#official-integrations).

Redwood includes integrations for several of the most popular third-party auth providers:

- Auth0
- Clerk
- Netlify Identity
- Firebase's GoogleAuthProvider
- [Supabase](https://supabase.io/docs/guides/auth)
- SuperTokens

Redwood supplies **dbAuth**:

```shell
yarn rw setup auth dbAuth
```

schema.prisma

```js
model User {
  id                  Int       @id @default(autoincrement())
  name                String?
  email               String    @unique
  hashedPassword      String
  salt                String
  resetToken          String?
  resetTokenExpiresAt DateTime?
}
```

If using uuid or cuid change schema:

```js
model User {
  id                  String       @id @default(cuid())
  // rest of properties
}
```

and in auth.ts change type of session.id check to 'string' (default is 'number')

```js
export const getCurrentUser = async (session: Decoded) => {
  if (!session || typeof session.id !== 'string') {
    throw new Error('Invalid session')
  }
  // rest of properties
}
```

```shell
yarn rw prisma migrate dev
```

#### Login & Signup Pages

```shell
yarn rw g dbAuth
```

Pages will be created <http://localhost:8910/login>:

#### Session Secret

.env

The setup script appended a new ENV var called SESSION_SECRET. This is the encryption key for the cookies that are stored in the user's browser when they log in. This secret should never be shared, never checked into your repo, and should be re-generated for each environment you deploy to.

You can generate a new value with the yarn `rw g secret` command. It only outputs it to the terminal, you'll need to copy/paste to your .env file. Note that if you change this secret in a production environment, all users will be logged out.

## API

### Prisma

Use schema.prisma to define models.

```shell
yarn rw prisma migrate [database]
```

View with

```shell
yarn rw prisma studio
```

Generate CRUD

```shell
yarn rw g scaffold [table]
```

### Create an SDL & Service

Create the GraphQL interface to access a new table. The scaffold command uses this:

```shell
yarn rw g sdl [table]
```

This will create a few new files under the api directory:

- `api/src/graphql/[table].sdl.ts`: defines the GraphQL schema in GraphQL's schema definition language

- `api/src/services/[table]/[table].ts`: contains your app's business logic (also creates associated test files)

Queries and mutations in an SDL file are automatically mapped to resolvers defined in a service, so when you generate an SDL file you'll get a service file as well, since one requires the other.

If you just need a simple read-only SDL, you can skip creating the create/update/delete mutations by passing a flag to the SDL generator like so:

```shell
yarn rw g sdl Contact --no-crud
```

You'd only get a single type to return them all.

## Web

### Cells

```shell
yarn rw g cell [name]
```

### Meta

```jsx
<MetaTags /> // from tutorial (deprecated)
<MetaData /> // current
```

### Public

- web/public assets available from build

### Components

Generate a component

```shell
yarn rw g component [name]
```

#### Redwood Components

Redwood comes with some built in components:

```jsx
<TextField />
<PasswordField />
// etc
```

##### Forms

Contact form example:

{% raw %}

```js
<Form onSubmit={onSubmit} config={{ mode: 'onBlur' }}>
  <Label name="name" errorClassName="error" />
  <TextField
    name="name"
    validation={{ required: true }}
    errorClassName="error"/>
  <FieldError name="name" className="error" />

  <Label name="email" errorClassName="error" />
  <TextField
    name="email"
    validation={{
      required: true,
      pattern: {
        value: /^[^@]+@[^.]+\..+$/,
        message: 'Please enter a valid email address',
      },
    }}
    errorClassName="error"
  />
  <FieldError name="email" className="error" />

  <Label name="message" errorClassName="error" />
  <TextAreaField
    name="message"
    validation={{ required: true }}
    errorClassName="error"
  />
  <FieldError name="message" className="error" />

  <Submit>Save</Submit>
</Form>
```

{% endraw %}

### Pages

Pages are stored in the pages direcory, genetate a new page (and route) with:

```shell
yarn rw g page [page name]
```

### Router

The router will attempt to match the current URL to each route in turn, and only render those with a matching path. The only exception to this is the notfound route, which can be placed anywhere in the list and only matches when no other routes do.
The notfound route can't be nested in a Set

Routes.ts

```jsx
import { Router, Route } from '@redwoodjs/router'

const Routes = () => (
  <Router>
    <Set wrap={[BlogContext, BlogLayout]}>
      <Route path="/" page={HomePage} name="home" />
      <Route path="/about" page={AboutPage} name="about" />
      <Route path="/contact" page={ContactPage} name="contact" />
      <Route path="/blog-post/{id:Int}" page={BlogPostPage} name="blogPost" />
    </Set>
    <PrivateSet unauthenticated="home">
      <Route path="/admin" page={AdminPage} name="admin" />
    </PrivateSet>
  </Router>
)

export default Routes
```

Private Routes

```tsx
<Router>
  <PrivateSet unauthenticated="forbidden" roles={['admin', 'editor', 'publisher']}>
    <Route path="/admin/posts/{id:Int}/edit" page={EditPostPage} name="editPost" />
  </PrivateSet>

  <Route path="/forbidden" page={ForbiddenPage} name="forbidden" />
</Router>
```

### Toast

- toast messages [react-hot-toast](https://react-hot-toast.com/)

```js
import { toast, Toaster } from '@redwoodjs/web/toast'
```

### UI

Redwood is already configured to use Sass, if the packages are there:

```shell
yarn workspace web add -D sass sass-loader
```

Set up a UI design or style library

```shell
yarn rw setup ui <library>
```

Commands:

```shell
  rw setup ui chakra-ui    //Set up Chakra UI
  rw setup ui mantine      //Set up Mantine UI
  rw setup ui tailwindcss  //Set up tailwindcss and PostCSS[aliases: tailwind, tw]
```

Also see the Redwood CLI Reference
(​<https://redwoodjs.com/docs/cli-commands#setup-ui​>)

## Deployment

- Netlify

```shell
yarn rw setup deploy netlify
```

This adds a netlify.toml config file in the root of the project

## GraphQL

GraphQL implementation is built with [Apollo Client](https://www.apollographql.com/docs/react/) (on the client) and [GraphQL Yoga](https://www.graphql-yoga.com/) & [Envelop](https://www.envelop.dev/docs) (on the server)

The name of the **SDL** needs to match the name of the **service**

### GraphQL Playground

<http://localhost:8911/graphql>

This is GraphQL Yoga's [GraphiQL](https://www.graphql-yoga.com/docs/features/graphiql), a web-based GUI for GraphQL APIs:

### useMutation()

```js
const [create, { loading, error }] = useMutation<
  CreateContactMutation,
  CreateContactMutationVariables
>(CREATE_CONTACT)
```

create is a function that invokes the mutation and takes an object with a variables key, containing another object with an input key.

```js
create({
  variables: {
    input: {
      name: 'Rob',
      email: '<rob@redwoodjs.com>',
      message: 'I love Redwood!',
    },
  },
})
```

useMutation accepts an options object as a second argument. One of the options is a callback function, onCompleted, that will be invoked when the mutation successfully completes. We'll use that callback to invoke a toast() function which will add a message to be displayed in a `<Toaster>` component.

### Services

The name of the **SDL** needs to match the name of the **service**

#### Context

There's a magical variable named **context** that's available within any of your service functions. It contains the context in which the service function is being called. One property available on this context is the user that's logged in (if someone is logged in).

It's the same currentUser that is available on the web side:
*api/src/service/posts/posts.js*

```js
export const createPost = ({ input }) => {
  return db.post.create({
    data: { ...input, userId: context.currentUser.id }
  })
}
```

So `context.currentUser` will always be around if you need access to the user that made this request.

#### Validation

We talked about business logic belonging in our services files and this is a perfect example. And since validating inputs is such a common requirement, Redwood once again makes our lives easier with [Service Validations](https://redwoodjs.com/docs/services#service-validations).

```js
  validate(input.email, 'email', { email: true })
```

- The first argument is the value that we want to check. In this case input contains all our contact data and the value of email is the one we want to check

- The second argument is the name prop from the `<TextField>`, so that we know which input field on the page has an error

- The third argument is an object containing the validation directives we want to invoke. In this case it's just one, and `email: true` means we want to use the built-in email validator

```js
export const createCar = ({ input }: Car) => {
  validate(input.make, 'make', {
    inclusion: ['Audi', 'BMW', 'Ferrari', 'Lexus', 'Tesla'],
  })
  validate(input.color, 'color', {
    exclusion: { in: ['Beige', 'Mauve'], message: "No one wants that color" }
  })
  validate(input.hasDamage, 'hasDamage', {
    absence: true
  })
  validate(input.vin, 'vin', {
    format: /[A-Z0-9]+/,
    length: { equal: 17 }
  })
  validate(input.odometer, 'odometer', {
    numericality: { positive: true, lessThanOrEqual: 10000 }
  })

  return db.car.create({ data: input })
}
```

## Storybook

```shell
yarn rw storybook
```

### Issues

- Problems running storybook without css: errors when trying to use sass (with Mantine)

## Testing

What's the difference between getByText() and queryByText()?

getByText() will throw an error if the text isn't found in the document, whereas queryByText() will return null and let you continue with your testing (and is one way to test that some text is not present on the page). You can read more about these in the DOM Testing Library Queries docs.

## Typescript

### Types

When you have the dev server (via yarn rw dev) running, the CLI watches files for changes and triggers type generation automatically, but you can trigger it manually too by running:

```shell
yarn rw g types
```

## Recipies

- Blog

  1. Generate the homepage
  2. Generate the blog layout
  3. Define the database schema
  4. Run migrations to update the database and create a table
  5. Scaffold a CRUD interface to the database table
  6. Create a cell to load the data and take care of loading/empty/failure/success states
  7. Add the cell to the page
