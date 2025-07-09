---
date: 2023-12-07
title: "NPM"
categories: ["npm"]
---


## Scripts

Run scripts using npm.

Scripts in a package.json file can be run with:

```shell
npm run [script name]
```

You can pass arguments to the script by using `--`

```shell
npm run [script] -- [args]
```

## Errors

> Fix the upstream dependency conflict, or retry npm ERR! this command with --force or --legacy-peer-deps

This is a package conflict, you can pin the version to the specified version, or run with the flags to suppess the warnings. This may cause unintended results.
