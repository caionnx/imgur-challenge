import fs from "fs";
import express from "express";
import { createServer } from "vite";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const vite = await createServer({
  server: {
    middlewareMode: true,
  },
  appType: "custom",
});

app.use(vite.middlewares);

app.get("/", async (req, res) => {
  const url = req.originalUrl;

  try {
    const template = await vite.transformIndexHtml(
      url,
      fs.readFileSync("index.html", "utf-8"),
    );
    const { render } = await vite.ssrLoadModule("/src/entries/server.tsx");

    let apiRequest = null;
    try {
      const query = new URLSearchParams(req.query);
      const apiEndpoint = query.has("q")
        ? process.env.VITE_INITIAL_STATE_SEARCH_API
        : process.env.VITE_INITIAL_STATE_GALLERY_API;
      apiRequest = await axios.get(`${apiEndpoint}?${query.toString()}`);
    } catch (error) {
      res.status(500).end(error);
    }

    const script = `<script>window.__initialState__=${JSON.stringify(apiRequest.data?.data)}</script>`;
    const html = template.replace(
      `<!--ssr-output-->`,
      `${render(apiRequest.data?.data, req.url.replace("/?", ""))} ${script}`,
    );

    res.status(200).set({ "Content-Type": "text/html" }).end(html);
  } catch (error) {
    res.status(500).end(error);
  }
});

app.listen(4040, () => {
  console.log("Portal is ready at http://localhost:4040.");
});
