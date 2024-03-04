import { Home } from './pages/index';

const App = ({ initialState }: { initialState: ImgurRestApi.GalleryItem[] | undefined }) => {
  return (
    <Home initialState={initialState} />
  );
};

export default App;
