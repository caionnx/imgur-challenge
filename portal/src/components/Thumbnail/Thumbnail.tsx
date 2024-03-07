import React from "react";
import { Image } from "./Image";
import { Video } from "./Video";

export type ThumbnailProps = {
  media: ImgurRestApi.Image;
  title: string;
  id: string;
  onClick: (id: string) => void;
};

export type MediaProps = {
  media: ImgurRestApi.Image;
  [rest: string]: unknown;
};

export const Thumbnail = ({ media, title, onClick, id }: ThumbnailProps) => {
  return (
    <div
      tabIndex={0}
      aria-label={`${title}`}
      onClick={() => onClick(id)}
      onKeyDown={event => {
        if (event.code === 'Space' || event.code === 'Enter') {
          event.preventDefault();
          event.stopPropagation();
          onClick(id);
        }
      }}
      className="cursor-pointer flex relative justify-center rounded-sm border-r border-b border-l border-gray-900 bg-slate-800"
    >
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
