import React from 'react';
import { MediaProps } from "./Thumbnail";
import { useInView } from "react-intersection-observer";

export const Video = ({ media }: MediaProps) => {
  const { ref, inView } = useInView({
    rootMargin: "50px",
  });

  if (!media.mp4) {
    return null;
  }

  return (
    <video
      ref={ref}
      className="h-auto max-w-full"
      draggable="false"
      muted
      playsInline
      autoPlay
      loop
      title=""
      style={{ height: "300px" }}
    >
      {inView && <source data-testid="videosource" type="video/mp4" src={media.mp4} />}
    </video>
  );
};
