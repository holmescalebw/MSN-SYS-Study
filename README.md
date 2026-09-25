# Mission Systems Written Comp Study App

A static, mobile-friendly study app designed for GitHub Pages.

## Features

- 8-module study guide
- Equation-card navigator
- Review-vs-equation-card crosswalk
- 16-question interactive quiz
- Missed-concept tracking
- Local progress storage
- Dark mode
- No backend or database required

## Run locally

Open `index.html` in a browser.

## Publish with GitHub Pages

1. Create a new GitHub repository, for example `mission-systems-study`.
2. Upload `index.html`, `styles.css`, `data.js`, `app.js`, and this README to the repository root.
3. In GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)`, then save.
6. GitHub will provide the public Pages URL after deployment.

## Customize

Most study content lives in `data.js`.

- Edit `MODULES` to change module content.
- Edit `EQUATION_CARDS` to change the equation-card reference.
- Edit `QUIZ` to add or modify questions.

Progress is stored in the browser using `localStorage`.
