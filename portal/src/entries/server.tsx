import React, { renderToString } from 'react-dom/server';

import App from '../index.js';

export const render = (initialState: ImgurRestApi.GalleryItem[] | undefined) => {
  return renderToString(<App initialState={initialState} />);
};