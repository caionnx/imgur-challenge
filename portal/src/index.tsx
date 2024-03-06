import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home } from "./pages/index";
import { GalleryProvider } from "./providers/GalleryProvider";

const queryClient = new QueryClient();

const App = ({
  initialState,
}: {
  initialState: ImgurRestApi.GalleryAlbum[] | undefined;
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <GalleryProvider initialState={initialState}>
        <Home />
      </GalleryProvider>
    </QueryClientProvider>
  );
};

export default App;
