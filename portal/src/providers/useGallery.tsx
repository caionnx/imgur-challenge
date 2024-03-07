import { useContext } from "react";
import { GalleryContext } from "./GalleryProvider";

export const useGallery = () => {
  const context = useContext(GalleryContext);
  if (!context) {
    throw new Error("useGallery must be used within a GalleryProvider");
  }
  return context;
};
