import { MediaProps } from "./Thumbnail";

export const Image = ({ media, ...rest }: MediaProps) => {
  return (
    <img
      {...rest}
      className="object-cover h-72 max-w-full"
      height={300}
      width={300}
      src={media.link}
      loading="lazy"
    />
  );
};
