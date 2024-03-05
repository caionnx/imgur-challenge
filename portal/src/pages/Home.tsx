import { DefaultLayout } from "../layout/index";
import { Thumbnail } from "../components/Thumbnail/Thumbnail";

export const Home = ({
  initialState,
}: {
  initialState: ImgurRestApi.GalleryAlbum[] | undefined;
}) => {
  return (
    <DefaultLayout>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {initialState?.map((item) => {
          const firstMediaItem = item.images && item.images[0];
          if (!firstMediaItem) {
            return null;
          }
          return <Thumbnail title={item.title} key={item.id} media={firstMediaItem} />;
        })}
      </div>
    </DefaultLayout>
  );
};
