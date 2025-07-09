---
title: "Email"
date: 2024-01-11
categories: ["email"]
---


## The Plus Trick

The Plus Trick is a very handy feature of the email standard known as a "boxname", the idea being that you may have other incoming boxes besides one just named "Inbox" and by adding +something to your email address you can specify which box the mail should be sorted into. They don't appear to be in common use these days, but they are ridiculously helpful for us developers when we're constantly needing new email addresses for testing: it gives us an infinite number of valid email addresses—they all come to your regular inbox!

Just append +something to your email address before the @:

```shell
jane.doe+testing@example.com // will go to jane.doe@example.com
dom+20210909@example.com // will go to dom@example.com
```

Note that not all providers support this plus-based syntax, but the major ones (Gmail, Yahoo, Microsoft, Apple) do. If you find that you're not receiving emails at your own domain, you may want to create a free account at one of these providers just to use for testing.
