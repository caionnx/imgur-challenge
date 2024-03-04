const App = ({ initialState }: { initialState: ImgurRestApi.GalleryItem[] | undefined }) => {
  return (
    <main>
      <h1 className="text-3xl font-bold underline">Portal</h1>
      <p>Welcome to the best of Imgur!</p>
      <div>
        <button>Button</button>
      </div>
      <pre>{JSON.stringify(initialState, null, 2)}</pre>
    </main>
  );
};

export default App;
