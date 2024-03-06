import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useRef,
  useEffect,
} from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Params = {
  section: string;
  search?: string;
  showViral: string;
};

type ProviderValue = {
  parameters: Params;
  setParameters: Dispatch<SetStateAction<Params>>;
  data: ImgurRestApi.GalleryAlbum[] | undefined;
  isFetching: boolean;
  error: Error | null;
};

const defaultContextValue = {
  parameters: {
    section: "hot",
    showViral: "true",
  },
  setParameters: () => undefined,
  data: undefined,
  isFetching: false,
  error: null,
} as ProviderValue;

const GalleryContext = createContext(defaultContextValue);

export const GalleryProvider = ({
  initialState,
  children,
}: {
  children: ReactNode;
  initialState: ImgurRestApi.GalleryAlbum[] | undefined;
}) => {
  const [parameters, setParameters] = useState(defaultContextValue.parameters);
  const enabledQuery = useRef(false);
  const { error, data, isFetching, } = useQuery({
    queryKey: ["gallery", parameters],
    queryFn: () => {
      return axios
        .get(
          `https://imgur-api.fly.dev/gallery?${new URLSearchParams(parameters).toString()}`
        )
        .then((res) => res.data?.data);
    },
    initialData: initialState,
    enabled: enabledQuery.current,
  });

  useEffect(() => {
    // Set query as enabled only on mount to avoid a initial request to the API
    enabledQuery.current = true;
  }, []);

  return (
    <GalleryContext.Provider
      value={{ parameters, setParameters, data, isFetching, error }}
    >
      {children}
    </GalleryContext.Provider>
  );
};

export const useGallery = () => {
  const context = useContext(GalleryContext);
  if (!context) {
    throw new Error("useGallery must be used within a GalleryProvider");
  }
  return context;
};
