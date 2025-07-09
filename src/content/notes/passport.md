---
title: "Passport"
date: 2024-01-02
categories: ["express"]
---


[Passport](https://www.passportjs.org/)

## Strategies

### passport-local

[passport-local](https://www.passportjs.org/packages/passport-local/)

#### Install

```shell
npm install passport-local
```

#### Usage

Configure Strategy

The local authentication strategy authenticates users using a username and password. The strategy requires a verify callback, which accepts these credentials and calls done providing a user.

```js
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));
```

If using email instead of username, pass an options object with the fields.

```js
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'passwd'
  },
  function(username, password, done) {
    // ...
  }
));
```

#### Authenticate Requests

Use passport.authenticate(), specifying the 'local' strategy, to authenticate requests.

For example, as route middleware in an Express application:

```js
app.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });
```
