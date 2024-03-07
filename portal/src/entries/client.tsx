import React, { hydrateRoot } from "react-dom/client";
import App from "../index.js";

declare global {
  interface Window {
    __initialState__: ImgurRestApi.GalleryItem[];
  }
}

let initialState;

if (typeof window !== "undefined") {
  initialState = window.__initialState__;
}

hydrateRoot(
  document.getElementById("app") as HTMLElement,
  <App initialState={initialState} searchParams={window.location.search} />,
);
