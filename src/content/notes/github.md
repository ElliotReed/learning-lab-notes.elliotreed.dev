---
title: "Github"
date: 2023-12-07
categories: ["github"]
---

## installation

## cli

### usage

```bash
gh repo
```

create interactively

```bash
gh repo create
```

## github pages

uses [jekyll](https://jekyllrb.com/)

### setup

- Settings>Pages

  - "Deploy from a branch" main
  - Click the Save button.

- create "./_config.yml"

  example
```yaml
theme: minima
title: dev notes
author: elliot reed
description: notes
```

### site

- create "./index.md" or "./README.md"
  - add homepage content

- jekyll, create blog with files named "_posts/YYYY-MM-DD-title.md"
- include title and date

    ```yaml
    ---
    title: "YOUR-TITLE"
    date: YYYY-MM-DD
    ---
    ```

---

## Actions

### Automating React App Deployment to Shared Hosting with GitHub Actions

#### Overview
This document outlines the  steps  to automate the deployment of a React app from GitHub to shared hosting using `rsync` over SSH.

---

#### 1️⃣ **Set Up SSH Access**

1. **Generated an SSH key for GitHub Actions**:
   ```bash
   ssh-keygen -t rsa -b 4096 -f ~/.ssh/github-actions-key -N ""
   ```
2. **Added the public key** (`~/.ssh/github-actions-key.pub`) to the hosting server under `~/.ssh/authorized_keys` via cPanel SSH Key Manager (preferred method).

To verify the added keys, run:
```bash
ssh-add -l
```
To display the key values in the console, run:

Public key (on the host)

```bash
cat ~/.ssh/github-actions-key.pub
```

Private key for Github

```bash
cat ~/.ssh/github-actions-key
```

3. **Configured SSH access**:
   - Verified SSH connection using:
     ```bash
     ssh -p {port and login}
     ```
   - Tested `scp` for manual deployment, but `rsync` was not available locally.

---

#### 2️⃣ **Configured GitHub Actions Workflow**

1. Created the workflow file:

    ```bash
    mkdir -p .github/workflows
    nano .github/workflows/deploy.yml
    ```

2. Added the following YAML configuration:

   ```yaml
   name: Deploy to Shared Hosting

   on:
     push:
       branches:
         - main  # Runs when pushing to main branch

   jobs:
     deploy:
       runs-on: ubuntu-latest

       steps:
         - name: Checkout Repository
           uses: actions/checkout@v4

          - name: Setup SSH key for deployment
            uses: webfactory/ssh-agent@v0.5.3
            with:
              ssh-private-key: ${{ secrets.DEPLOY_SSH_KEY }}

            - name: Install dependencies
              run: npm install

            - name: Build project
              run: npm run build

            - name: Test SSH connectivity
              run: ssh -o StrictHostKeyChecking=no -p {port} {identifier} "echo 'SSH connection successful'"

            - name: Ensure target directory exists
              run: ssh -p {port} {identifier} "mkdir -p {path}"

            - name: Deploy via rsync
              run: rsync -avz --delete --exclude '.well-known' --exclude 'cgi-bin' -e "ssh -p {port}" ./public/ {identifier}:{path}
   ```

    --delete will remove files and folders

    --exclude to ensure not deleted, check for all files that should stay (.htaccess, .env)

    -p port port number for hostings port
    
    ./public/ - the folder containing the contents to be transfered (could be "dist" or "build)
    
    identifier (hosting login identifier, accountname#root site)
    
    path (eg: /home/elliotre/site folder)

3. Saved the file and committed it:
   ```bash
   git add .github/workflows/deploy.yml
   git commit -m "Add GitHub Actions deployment workflow"
   git push origin main
   ```

---

#### 3️⃣ **Added SSH Key to GitHub Secrets**

1. Went to **GitHub → Repository → Settings → Secrets and variables → Actions**.
2. Created a new secret **`DEPLOY_SSH_KEY`**.
3. Pasted the **private SSH key** 

```bash
~/.ssh/github-actions-key
```

---

#### 4️⃣ **Testing the Deployment**

1. Made a small change in the React app.
2. Committed and pushed:
   ```bash
   git add .
   git commit -m "Test rsync auto-deploy"
   git push origin main
   ```
3. **GitHub Actions built and deployed the app successfully!** 🎉

---

#### 🎯 **Final Outcome**
✅ Automatic deployment to shared hosting on every push to `main`  
✅ Uses `rsync` to only update modified files  
✅ Deletes old files to keep the deployment clean (optional: remove `--delete` to disable)  
✅ No need for manual file uploads—GitHub handles everything! 🚀

