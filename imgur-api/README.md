<h1 align="center">Welcome to imgur-api 👋</h1>
<p>
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
</p>

This app serves as an API to consume data from [Imgur REST API](https://apidocs.imgur.com/).

### GET /gallery
Implements the [Gallery API](https://apidocs.imgur.com/#eff60e84-5781-4c12-926a-208dc4c7cc94). It receives the same routes and params but all as params. 

Example: `/gallery?section=hot&sort=viral&window=day&page=1&showViral=false&mature=false`
### GET /search
Implements the [Gallery Search API](https://apidocs.imgur.com/#3c981acf-47aa-488f-b068-269f65aee3ce) with a defined sort, window, and page. It receives the `q` param. 

Example: `/search?q=cats`
## Install

```sh
npm install
```
---
*Before using the app you need to set a .env file with your CLIENT_ID. The app also applies a CORS middleware so it is also advised to set CORS_ALLOWED_ORIGIN too.*

## Start development

```sh
npm run dev
```

## Run tests

```sh
npm run test
```

## Usage

```sh
npm run build && npm start
```

