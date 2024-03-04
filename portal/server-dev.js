import fs from 'fs';
import express from 'express';
import { createServer } from 'vite';
import axios from 'axios';
import dotenv from "dotenv";

dotenv.config();

const app = express();

const vite = await createServer({
  server: {
    middlewareMode: true,
  },
  appType: 'custom',
});

app.use(vite.middlewares);

app.get('/', async (req, res) => {
  const url = req.originalUrl;

  try {
    const template = await vite.transformIndexHtml(url, fs.readFileSync('index.html', 'utf-8'));
    const { render } = await vite.ssrLoadModule('/src/server.tsx');

    let apiRequest = null;
    try {
      apiRequest = await axios.get(`${process.env.INITIAL_STATE_API}?${new URLSearchParams(req.query).toString()}`);
    } catch (error) {
      console.log(error);
    }

    const script = `<script>window.__initialState__=${JSON.stringify(apiRequest.data?.data)}</script>`;
    const html = template.replace(`<!--ssr-output-->`, `${render(apiRequest.data?.data)} ${script}`);

    res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
  } catch (error) {
    res.status(500).end(error);
  }
});

app.listen(4040, () => {
  console.log('Portal is ready at http://localhost:4040.');
});
