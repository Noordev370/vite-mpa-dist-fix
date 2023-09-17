# vite-mpa-dist-fix

## Motivation

When you have file structure like this

```shell
/
vite.config.js
index.html
/src
   /styles
   /scripts
   /pages
      about.html
      contact.html 
```
if you open a page inside the src folder for example about.html the url in the browser address bar looks like `http://localhost/src/pages/about.html`

we don't want the url to be shown like that, we want it to be something like `http://localhost/pages/about.html` and that is what ***vite-mpa-dist-fix*** does

## How it works

after bundling the app with vite build we change the dist folder strcture by  
- renaming the `$root/src/pages` folder to `$root/pages`
- scanning the index.html to find any hrefs to HTML pages  
and convert it from `/src/page/about.html` to `/page/about.html`

## Usage

vite-mpa-dist-fix is a simple script and doesn't imply any architectural pattern, you can add it to your workflow as you wish like:  
- make it a vite plugin
- run as script with `npm run`
