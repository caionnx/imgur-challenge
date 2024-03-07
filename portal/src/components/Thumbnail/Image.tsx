import React from 'react';
import { MediaProps } from "./Thumbnail";

export const Image = ({ media, ...rest }: MediaProps) => {
  return (
    <img
      {...rest}
      className="object-cover h-[28rem] md:h-72 max-w-full"
      height={300}
      src={media.link}
      loading="lazy"
    />
  );
};
