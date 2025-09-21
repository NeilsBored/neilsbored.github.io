# Simple Portfolio for GitHub Pages

This repository contains a lightweight, modern portfolio template that
can be deployed as a GitHub Pages site.  It requires no build step
or external tooling—everything is plain HTML, CSS and JavaScript.

## How it works

* `index.html` — the main page layout.  It references a stylesheet
  (`styles.css`) and a small script (`script.js`) that personalises
  the page and fetches your projects from the GitHub API.
* `styles.css` — defines the colour palette, typography and layout.  It
  uses CSS variables so you can easily tweak the colours in one
  place.
* `script.js` — loads `site.config.json` (if present) and uses it to
  populate the hero section, about text and contact email.  It also
  fetches your public repositories and displays up to six of them.
* `site.config.json` — optional configuration file where you can set
  your name, tagline, about description, email address and
  repositories to feature at the top of the list.  If you omit a
  field, reasonable defaults are used instead.

## Customising your site

1. **Edit the configuration** — open `site.config.json` and fill in
   your real name, GitHub username, tagline and a short bio.  Set
   your preferred contact email and list any projects you want to
   feature first.
2. **Update content** — if you'd like to adjust the text in
   `index.html` directly (for example, adding new sections), you can
   do so—just remember to keep the IDs (`projects`, `about` and
   `contact`) intact so the navigation still works.
3. **Add a resume** — create a folder named `resume` and place your
   PDF inside.  Then link to it from your site wherever you'd like.
4. **Tweak the styling** — feel free to adjust colours, spacing or
   fonts in `styles.css`.  CSS variables at the top of the file make
   it easy to experiment.

## Deploying to GitHub Pages

1. Create a new repository named `<username>.github.io` (replace
   `<username>` with your GitHub handle).
2. Copy the contents of this folder into the root of that repository
   and commit.
3. Push to the `main` branch.  GitHub will automatically build and
   deploy your site at `https://<username>.github.io`.

That's it!
