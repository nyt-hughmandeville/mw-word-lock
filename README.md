# Word Lock Game

This project contains the Word Lock game. It is a Next.js/React app.

- <https://nyt-hughmandeville.github.io/mw-word-lock/>

## Main Links

- [GitHub](https://github.com/nytimes/mw-word-lock)
- [GitHub Action](https://github.com/nyt-hughmandeville/mw-word-lock/actions)
- [GitHub Pages](https://nyt-hughmandeville.github.io/mw-word-lock/)

## Files & Directories

```text
  .gitignore             - files for Git to ignore
  Makefile               - make commands
  README.md              - project's README
  client/                - Next.js/React code
```

## Environments

- Local (pnpm): <http://localhost:3000/>

## Running Locally

Use `make run` to start the web client/server.

```sh
make run
```

## Updating Dependencies

```sh
make dep-update
```

## Dependencies

```sh
cd client
npm add gh-pages
npm add --save-dev prettier
```

## Project Setup

See the [Next.js setup doc](https://nextjs.org/learn/basics/deploying-nextjs-app/setup).

```sh
npx create-next-app@latest client --use-npm --js --app
npm install -g serve
```

## React Strict Mode

Add `reactStrictMode: false` to next.config.mjs to turn off React Strict Mode.

## To Do

- Setup GH page.
- Have each column have unique letters.
- Support arrow keys.
- Make look good on mobile.
- Add win sound.
- Support typing letters.
- Add help module.
