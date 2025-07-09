---
title: "React Query (Tanstack)"
date: 2023-12-07
categories: ["react"]
---


## library

<https://tanstack.com/query/latest>

## installation

Versions < 4 don't require the @tanstack prefix

```bash
npm i @tanstack/react-query @tanstack/react-query-devtools
```

## setup

- wrap *provider* at highest use level (probably around \<App/>)

```js
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
```

```js
const queryClient = new QueryClient();

<QueryClientProvider client={queryClient}>
  <App />
</QueryClientProvider>
```

### devtools

```javascript
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
```

added next to \<App />

```javascript
<QueryClientProvider client={queryClient}>
  <App />
  <ReactQueryDevtools />
</QueryClientProvider>
```

## usage

- useQuery to get, useMutation to post

```javascript
import { useQuery, useMutation } from "@tanstack/react-query";
```

### useQuery()

 @params

```javascript
{
  queryKey: ["key"],
  queryFn: () => Promise,
}
```

### useMutation()

 @params

```javascript
{
  mutationFn: () => Promise,
}
```
