---
date: 2024-01-14
title: "Git"
categories: ["version control"]
---

## Contents

## Removing Tracked Files

```shell
git rm --cached [path/file(or directory)]
```

Use the `-r` flag to recursively remove a directory's contests.

## Merge



## Change a commit message

```console
git commit --amend -m "New commit message."
```

Force push to update the history of the remote repository:

```console
git push --force branch-name
```

What the command does is overwriting the most recent commit with the new one.

The -m option allows you to write the new message on the command line without opening an editor session.
