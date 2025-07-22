---
date: 2025-07-22
title: "Postman"
categories: ["api"]
---

---

title: Postman Setup for Local and Production Testing
description: Configure Postman to test both local and production environments for LifeManager, including auth token handling and cookie management.
---------------------------------------------------------------------------------------------------------------------------------------------------

## 🔧 Environments

Create two Postman environments:

### Local Environment

```json
{
  "baseUrl": "http://localhost:3000",
  "email": "your-local-email@example.com",
  "password": "yourLocalPassword"
}
```

### Production Environment

```json
{
  "baseUrl": "https://yourdomain.com",
  "email": "your-prod-email@example.com",
  "password": "yourProdPassword"
}
```

Use `{{baseUrl}}`, `{{email}}`, and `{{password}}` in request bodies and URLs.

---

## 📂 Collections

Create a Collection grouping all API requests (Auth, Users, Tasks, etc.).

### Headers for Protected Requests

Add this to each request that requires authentication:

```
Key: x-access-token
Value: {{xAccessToken}}
```

---

## 🔐 Login Request Setup

### Request

**POST** `{{baseUrl}}/api/auth/login`

### Body (JSON)

```json
{
  "email": "{{email}}",
  "password": "{{password}}"
}
```

### Post-response Script

(Click the **Post-response** tab in Postman):

```js
const xAccessToken = pm.response.headers.get("x-access-token");
pm.environment.set("xAccessToken", xAccessToken);
```

Postman will:

* Store `x-access-token` from the login response header into the environment
* Automatically store any cookies (e.g., `lmrt`) sent via `Set-Cookie`

---

## 🍪 Cookie Behavior

* Cookies are stored per domain (e.g., `localhost`, `yourdomain.com`)
* Postman will automatically send them with future requests if:

  * Domains/ports match
  * Cookie jar is enabled in settings

No need to manually add cookies to the `Cookie` header.

---

## 🧪 Verifying

You can log cookie values in `Pre-request Script` or `Post-response`:

```js
const cookies = pm.cookies.toObject();
console.log(cookies.lmrt);
```

---

## ✅ Summary

* Use environments to manage `baseUrl`, `email`, and `password`
* Capture `x-access-token` in a Post-response script
* Let Postman manage cookies automatically
* Reference `{{xAccessToken}}` in protected requests
* Use separate login credentials per environment
