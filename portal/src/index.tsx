import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home } from "./pages/index";
import { GalleryProvider } from "./providers/GalleryProvider";

const App = ({
  initialState,
}: {
  initialState: ImgurRestApi.GalleryAlbum[] | undefined;
}) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <GalleryProvider initialState={initialState}>
        <Home />
      </GalleryProvider>
    </QueryClientProvider>
  );
};

export default App;
