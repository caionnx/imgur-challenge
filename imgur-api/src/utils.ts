const GalleryValidPaths = new Map();
GalleryValidPaths.set('section', 'hot');
GalleryValidPaths.set('sort', 'viral');
GalleryValidPaths.set('window', 'day');
GalleryValidPaths.set('page', '1');

const GalleryValidParameters = new Map();
GalleryValidParameters.set('showViral', 'true');
GalleryValidParameters.set('mature', 'false');

export function buildGalleryPathAndParameters(requestParameters: Record<string, any>) {
  const paths = new Map(GalleryValidPaths);
  const parameters = new Map(GalleryValidParameters);

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

const GallerySearchValidPaths = new Map();
GallerySearchValidPaths.set('sort', 'viral');
GallerySearchValidPaths.set('window', 'week');
GallerySearchValidPaths.set('page', '1');

export function buildSearchPathAndParameters(requestParameters: Record<string, any>) {
  const paths = new Map(GallerySearchValidPaths);

  for (const param of Object.keys(requestParameters)) {
    if (paths.has(param)) {
      paths.set(param, requestParameters[param])
    }
  }

  const pathName = Array.from(paths.values()).join('/');
  return `${pathName}?q=${requestParameters.q}`
}