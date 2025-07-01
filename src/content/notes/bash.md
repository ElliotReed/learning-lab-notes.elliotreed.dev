---
title: "Bash"
date: 2024-01-02
categories: ["shell", "bash"]
---

- TOC
{:toc}

## Batch Rename

To rename avatar-01.png to placeholder__avatar-01.png

```bash
for file in avatar-*.png ; do mv "$file" "placeholder__${file}" ; done
```

## Color Console Logs

```shell
console.log(`\x1b[38;2;0;200;0m${value}\x1b[0;m`)
```

`\x1b[` and `\x1b[` are the delimeters

`38;` or `48;` for text vs block colors

`2;0;200` are rgb values

`0m` ends the first part

`0;m` at the end resets the console

## Create File

```shell
touch [filename with path]
```

To create multiple files at once:

```shell
touch file-{1,2}.ext
```

## Make Directory

```shell
mkdir [directory name]
```

Use the -p flage for nested directory creation:

```shell
mkdir -p directory/subdirectory
```
