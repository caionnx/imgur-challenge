<h1 align="center">Welcome to Portal 👋</h1>
<p>
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
</p>

> Check the app at https://imgur-portal.fly.dev/

A portal to render Imgur images.

This is a React/TS App built with Vite and TailwindCSS. It uses Express to server side render the application.

> The project requires a env file with INITIAL_STATE_GALLERY_API and INITIAL_STATE_SEARCH_API declared. These values are the endpoints for fetching data.

A Docker file is in place to facilitate deployment. For the purposes of demonstration I have used Fly.io to easily deploy the final result.

## Install

```sh
npm install
```

## Start development
```sh
npm run dev
```

## Run tests

```sh
npm run test
```

## Lint

```sh
npm run lint
```

## Build for production

```sh
npm run build
```

You can also serve the build production with `npm run serve`