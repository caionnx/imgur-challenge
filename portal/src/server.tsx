import { renderToString } from 'react-dom/server';

import App from './app.js';

export const render = (initialState: ImgurRestApi.GalleryItem[] | undefined) => {
  return renderToString(<App initialState={initialState} />);
};