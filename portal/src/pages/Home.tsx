import React from "react";
import { DefaultLayout } from "../layout/index";
import { Thumbnail } from "../components/Thumbnail/Thumbnail";
import { Refine } from '../modules/Refine';
import { useGallery } from "../providers/GalleryProvider";

export const Home = () => {
  const { data, isFetching } = useGallery();

  return (
    <DefaultLayout>
      <Refine />
      <div className={`${isFetching ? 'opacity-50' : ''} grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4`}>
        {data?.map((item) => {
          const firstMediaItem = item.images && item.images[0];
          if (!firstMediaItem) {
            return null;
          }
          return (
            <Thumbnail
              title={item.title}
              key={item.id}
              media={firstMediaItem}
            />
          );
        })}
      </div>
    </DefaultLayout>
  );
};
