import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import axios from 'axios';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Imgur Server");
});

const ValidPaths = new Map();
ValidPaths.set('section', 'hot');
ValidPaths.set('sort', 'viral');
ValidPaths.set('window', 'day');
ValidPaths.set('page', '1');

const ValidParameters = new Map();
ValidParameters.set('showViral', 'true');
ValidParameters.set('mature', 'false');

// @ts-ignore
const buildPathAndParameters = (requestParameters) => {
  const paths = new Map(ValidPaths);
  const parameters = new Map(ValidParameters);

  for (const param of Object.keys(requestParameters)) {
    if (paths.has(param)) {
      paths.set(param, requestParameters[param])
    }
    if (parameters.has(param)) {
      parameters.set(param, requestParameters[param])
    }
  }

  const pathName = Array.from(paths.values()).join('/');
  const queryParameters = Array.from(parameters.entries()).map(([ name, value ]) => `${name}=${value}`).join('&');
  return `${pathName}?${queryParameters}`
}

app.get('/gallery', async (req: Request, res: Response, next: NextFunction) => {
  const clientId = process.env.CLIENT_ID;

  if (!clientId) {
    res.status(401).send('Missing Client-ID env!');
  }

  const apiParameters = buildPathAndParameters(req.query);

  try {
    const imgurReq = await axios.get(`https://api.imgur.com/3/gallery/${apiParameters}`, {
      headers: {
        Authorization: `Client-ID ${clientId}`
      }
    });
    res.json(imgurReq.data);
  }
  catch (err) {
    next(err)
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
