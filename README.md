<!-- Markdown Docs: -->
<!-- https://guides.github.com/features/mastering-markdown/#GitHub-flavored-markdown -->
<!-- https://daringfireball.net/projects/markdown/basics -->
<!-- https://daringfireball.net/projects/markdown/syntax -->

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
<!-- [![Node.js Version][node-version-image]][node-version-url] -->
[![Build Status][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url]

# Description

For quickly create NodeJs module with svelte components using these commands (just copy/paste it to the console):

# Create app ot module from template

(Create new clear empty repository before)

Config:

```cmd
(
SET TEMPLATE_BRANCH=node-module
SET TEMPLATE_REPO=https://github.com/NikolayMakhonin/app-template.git
SET /p DIR_NAME=Enter project directory name:
SET /p YOUR_REPO_URL=Enter your new clear repository url:
)
 
```

Install:

```cmd
git clone --origin template --branch %TEMPLATE_BRANCH% %TEMPLATE_REPO% %DIR_NAME%
cd %DIR_NAME%
git branch -m %TEMPLATE_BRANCH% master
git tag -a -m "New project from template \"%TEMPLATE_BRANCH%\"" v0.0.0
git remote set-url --push template no_push
git remote add origin %YOUR_REPO_URL%
git checkout -b develop
git push --all origin
git push --tags origin
git branch -u origin/develop develop
git branch -u origin/master master
 
```

Or you can just clone repository without history using this command:
```bash
npx degit NikolayMakhonin/app-template#node-module <app name> && cd <app name> && npm i && npm run test
```

# Documentation

## Terminal App
* [Implementation](<docs/doc/app/Implementation.md>)

## Template
* [Getting Started](<docs/doc/template/Getting Started.md>)
* [Architecture](<docs/doc/template/Architecture.md>)
* [Project Structure](<docs/doc/template/Project Structure.md>)
* [Testing](<docs/doc/template/Testing.md>)

<!--

---

[![BrowserStack](https://i.imgur.com/cOdhMed.png)](https://www.browserstack.com/)
---

-->

# License

[CC0-1.0](LICENSE)

[npm-image]: https://img.shields.io/npm/v/app-template.svg
[npm-url]: https://npmjs.org/package/app-template
[node-version-image]: https://img.shields.io/node/v/app-template.svg
[node-version-url]: https://nodejs.org/en/download/
[travis-image]: https://travis-ci.org/NikolayMakhonin/app-template.svg?branch=node-module
[travis-url]: https://travis-ci.org/NikolayMakhonin/app-template?branch=node-module
[coveralls-image]: https://coveralls.io/repos/github/NikolayMakhonin/app-template/badge.svg?branch=node-module
[coveralls-url]: https://coveralls.io/github/NikolayMakhonin/app-template?branch=node-module
[downloads-image]: https://img.shields.io/npm/dm/app-template.svg
[downloads-url]: https://npmjs.org/package/app-template
[npm-url]: https://npmjs.org/package/app-template
