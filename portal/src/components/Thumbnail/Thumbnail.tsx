import React from 'react';
import { Image } from "./Image";
import { Video } from "./Video";

export type ThumbnailProps = {
  media: ImgurRestApi.Image;
  title: string;
};

export type MediaProps = {
  media: ImgurRestApi.Image;
  [rest: string]: unknown;
};

export const Thumbnail = ({ media, title }: ThumbnailProps) => {
  return (
    <div className="flex relative justify-center rounded-sm border-r border-b border-l border-gray-900 bg-slate-800">
      {media.type === "video/mp4" ? (
        <Video media={media} />
      ) : (
        <Image alt={title} media={media} />
      )}
      <span className="absolute bottom-0 w-full bg-slate-900/75 text-white px-4 py-2 truncate">
        {title}
      </span>
    </div>
  );
};
