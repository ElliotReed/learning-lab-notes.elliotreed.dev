---
date: 2023-12-07
title: "Nodejs"
categories: ["node"]
---


## Installed Versions

Used [nvm-windows](https://github.com/coreybutler/nvm-windows) to handle multiple versions of node (needed for [Redwood.js]({%  link _notes/redwood.md %}))

nvm use [version]

- 18.19.0
- 20.10.0

## Errors

> Fix the upstream dependency conflict, or retry npm ERR! this command with --force or --legacy-peer-deps

This is a package conflict, you can pin the version to the specified version, or run with the flags to suppess the warnings. This may cause unintended results.

## Build A CLI

1. Create a folder for your cli
2. Run npm init
    - set entry point to bin/index.js
    - to use esm modules (import instead of require) add to your **package.json**

    ```json
    "type": "module"
    ```

3. Create directory and file bin/index.js
    - index.js will contain the code to be executed
4. At the top of index.js add:

    ```js
    # !/usr/bin/env node
    ```

    `#!/usr/bin/env node` is an instance of a shebang line: the very first line in an executable plain-text file on Unix-like platforms that tells the system what interpreter to pass that file to for execution, via the command line following the magic #! prefix (called shebang).
5. Add a main function and invoke it

    ```js
    function main() {
      // code
    }

    main();
    ```

    or use an IFFE (Imediately Invoked Function Expression)

    ```js
    (function() {
      //code
    })();
    ```

## Files

[Go to nodejs file system docs](https://nodejs.org/docs/latest/api/fs.html)

Import the file module

```js
import fs from "node:fs";
```

### Writing a file

At the most rudimentary level, **writeFile()** takes 4 arguments:

- output file name
- file data
- encoding
- callback function that recieves (err, written, string)

```js
    fs.writeFile('note.md', "Hello world!", 'utf-8', (err) => {
      if (err) {
        console.log('err: ', err);
      }
    });
```
