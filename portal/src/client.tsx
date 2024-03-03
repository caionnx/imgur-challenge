import { hydrateRoot } from 'react-dom/client';

import App from './app.js';

hydrateRoot(document.getElementById('app') as HTMLElement, <App />);
