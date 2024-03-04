import { DefaultLayout } from '../layout/index';

export const Home = ({ initialState }: { initialState: ImgurRestApi.GalleryItem[] | undefined }) => {
  return (
    <DefaultLayout>
      <pre className='max-h-60 overflow-auto'>{JSON.stringify(initialState, null, 2)}</pre>
    </DefaultLayout>
  );
};
