import { renderToString } from 'react-dom/server';

import App from './app.js';

export const render = () => {
  return renderToString(<App />);
};
