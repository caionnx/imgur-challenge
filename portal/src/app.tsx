const App = ({ initialState }: { initialState: ImgurRestApi.GalleryItem[] | undefined }) => {
  return (
    <main>
      <h1>Portal</h1>
      <p>Welcome to the best of Imgur!</p>
      <div>
        <span></span>
        <button>Button</button>
      </div>
      <pre>{JSON.stringify(initialState, null, 2)}</pre>
    </main>
  );
};

export default App;
