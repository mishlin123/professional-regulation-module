# Automating Netlify Deploys with GitHub

You do **not** need to manually drag-and-drop files every time. You can set up "Continuous Deployment" so that every time you save changes to the code, Netlify automatically updates the live site.

## Prerequisites
1.  A [GitHub Account](https://github.com/).
2.  A [Netlify Account](https://netlify.com/).

## Step 1: Push your code to GitHub
I have already initialized a Git repository on your computer. Now you need to upload it to GitHub.

1.  Log in to GitHub and click **"New Repository"** (top right `+` button).
2.  Name it `professional-regulation-module`.
3.  **Do not** check "Add a README" or "Add .gitignore" (we already have them).
4.  Click **Create repository**.
5.  Copy the code block under **"…or push an existing repository from the command line"**. It will look like this:
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/professional-regulation-module.git
    git branch -M main
    git push -u origin main
    ```
6.  Paste those commands into your terminal in VS Code.

## Step 2: Connect Netlify to GitHub
1.  Log in to your [Netlify Dashboard](https://app.netlify.com/).
2.  Click **"Add new site"** -> **"Import from an existing project"**.
3.  Choose **GitHub**.
4.  Authorize Netlify to access your GitHub account.
5.  Select the `professional-regulation-module` repository you just created.
6.  **Build Settings**: Netlify usually detects these automatically, but check:
    *   **Build Command**: `npm run build`
    *   **Publish directory**: `dist`
7.  Click **Deploy Site**.

## You're Done!
From now on, whenever you make changes:
1.  Open Terminal.
2.  Run:
    ```bash
    git add .
    git commit -m "Description of your changes"
    git push
    ```
3.  Netlify will see the change and automatically rebuild and publish your site within minutes.
