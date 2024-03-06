import React, { renderToString } from "react-dom/server";

import App from "../index.js";

export const render = (
  initialState: ImgurRestApi.GalleryAlbum[] | undefined
) => {
  return renderToString(<App initialState={initialState} />);
};
