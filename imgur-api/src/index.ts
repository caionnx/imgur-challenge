import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import axios from "axios";
import cors from "cors";
import {
  buildGalleryPathAndParameters,
  buildSearchPathAndParameters,
} from "./utils";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.CORS_ALLOWED_ORIGIN,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Imgur Server");
});

app.get("/gallery", async (req: Request, res: Response, next: NextFunction) => {
  const clientId = process.env.CLIENT_ID;
  const apiParameters = buildGalleryPathAndParameters(req.query);

  try {
    const imgurReq = await axios.get(
      `https://api.imgur.com/3/gallery/${apiParameters}`,
      {
        headers: {
          Authorization: `Client-ID ${clientId}`,
        },
      }
    );
    res.json(imgurReq.data);
  } catch (err) {
    next(err);
  }
});

app.get("/search", async (req: Request, res: Response, next: NextFunction) => {
  const clientId = process.env.CLIENT_ID;
  const apiParameters = buildSearchPathAndParameters(req.query);

  try {
    const imgurReq = await axios.get(
      `https://api.imgur.com/3/gallery/search/${apiParameters}`,
      {
        headers: {
          Authorization: `Client-ID ${clientId}`,
        },
      }
    );
    res.json(imgurReq.data);
  } catch (err) {
    next(err);
  }
});

app.listen(port, () => {
  if (!process.env.CLIENT_ID || !process.env.CORS_ALLOWED_ORIGIN) {
    console.error("[server]: Missing env variables");

    return;
  }
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default app;
