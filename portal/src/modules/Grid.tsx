import React from "react";
import { Thumbnail } from "../components/Thumbnail/Thumbnail";
import { useGallery } from "../providers/GalleryProvider";

export const Grid = () => {
  const { data, isFetching } = useGallery();

  return (
    <div
      className={`${isFetching ? "opacity-50" : ""} grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4`}
    >
      {data?.map((item) => {
        const firstMediaItem = item.images && item.images[0];
        if (!firstMediaItem) {
          return null;
        }
        return (
          <Thumbnail title={item.title} key={item.id} media={firstMediaItem} />
        );
      })}
    </div>
  );
};
