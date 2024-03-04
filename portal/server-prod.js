import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import axios from 'axios';
import dotenv from "dotenv";
import compression from 'compression';

dotenv.config();

const app = express();

app.use(compression())
app.use(express.static(path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'dist/client'), { index: false }));

app.get('/', async (req, res) => {
  try {
    const template = fs.readFileSync('./dist/client/index.html', 'utf-8');
    const { render } = await import('./dist/server/server.js');

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

app.listen(5173, () => {
  console.log('http://localhost:5173.');
});
