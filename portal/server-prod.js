import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import compression from "compression";

dotenv.config();

const app = express();
const port = process.env.PORT || 5858;

app.use(compression());
app.use(
  express.static(
    path.resolve(path.dirname(fileURLToPath(import.meta.url)), "dist/client"),
    { index: false },
  ),
);

app.get("/", async (req, res) => {
  try {
    const template = fs.readFileSync("./dist/client/index.html", "utf-8");
    const { render } = await import("./dist/server/server.js");

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

app.listen(port, () => {
  if (
    !process.env.VITE_INITIAL_STATE_SEARCH_API ||
    !process.env.VITE_INITIAL_STATE_GALLERY_API
  ) {
    console.log("[portal]: Missing env variables");

    return;
  }
  console.log(`[portal]: App is running at http://localhost:${port}`);
});
