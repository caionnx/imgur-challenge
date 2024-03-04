import { DefaultLayout } from '../layout/index';

export const Home = ({ initialState }: { initialState: ImgurRestApi.GalleryItem[] | undefined }) => {
  return (
    <DefaultLayout>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {initialState?.map((item) => {
          // @ts-ignore
          const image = item.images && item.images[0];
          if (!image) return null;
          if (image.type === 'video/mp4') {
            return <div><video className="h-auto max-w-full rounded-lg" draggable="false" muted playsInline autoPlay loop title="" style={{ height: '300px'}}><source type="video/mp4" src={image.mp4} /></video></div>
          }
          return <div><img className="h-auto max-w-full rounded-lg" height={300} width={300} src={ image.link } loading='lazy' /></div>;
        })}
      </div>
    </DefaultLayout>
  );
};
