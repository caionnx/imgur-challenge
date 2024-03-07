import React, {
  createContext,
  useState,
  ReactNode,
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
  setParameters: (args: Params) => void;
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

const buildDefaultParameters = (searchParams: string) => {
  const qs = new URLSearchParams(searchParams);
  const search = qs.get("q");
  const result: Params = {
    section: qs.get("section") || defaultContextValue.parameters.section,
    showViral: qs.get("showViral") || defaultContextValue.parameters.showViral,
  };
  if (search) {
    result.search = search;
  }

  return result;
};

export const GalleryContext = createContext(defaultContextValue);

export const GalleryProvider = ({
  initialState,
  searchParams,
  children,
}: {
  children: ReactNode;
  initialState: ImgurRestApi.GalleryAlbum[] | undefined;
  searchParams: string;
}) => {
  const [parameters, setParameters] = useState<Params>(
    buildDefaultParameters(searchParams),
  );
  const enabledQuery = useRef(false);
  const { error, data, isFetching } = useQuery({
    queryKey: [
      "gallery",
      parameters.section,
      parameters.showViral,
      parameters.search,
    ],
    queryFn: () => {
      // Uses a different API in case of search
      if (parameters.search) {
        return axios
          .get(
            `${import.meta.env.VITE_INITIAL_STATE_SEARCH_API}?q=${encodeURI(parameters.search)}`,
          )
          .then((res) => res.data?.data);
      }

      return axios
        .get(
          `${import.meta.env.VITE_INITIAL_STATE_GALLERY_API}?${new URLSearchParams(parameters).toString()}`,
        )
        .then((res) => res.data?.data);
    },
    initialData: initialState,
    enabled: enabledQuery.current,
  });

  const updateParameters = (params: Params) => {
    setParameters(params);

    // Updates the URL with the new params
    const url = new URL(window.location.href);
    const queryParameters = url.searchParams;
    queryParameters.set("section", params.section);
    queryParameters.set("showViral", params.showViral);
    if (params.search) {
      queryParameters.set("q", params.search);
    } else {
      queryParameters.delete("q");
    }

    window.history.pushState(params, "", url);
  };

  // Every back and forward of the browser we update the internal state to reflect the url params
  const onPopState = (e: PopStateEvent) => {
    if (!e.state) {
      return;
    }

    setParameters(e.state);
  };

  useEffect(() => {
    window.history.replaceState(parameters, "", window.location.href);
    window.addEventListener("popstate", onPopState);

    return () => window.removeEventListener("popstate", onPopState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Set query as enabled only on mount to avoid a initial request to the API
    enabledQuery.current = true;
  }, []);

  return (
    <GalleryContext.Provider
      value={{
        parameters,
        setParameters: updateParameters,
        data,
        isFetching,
        error,
      }}
    >
      {children}
    </GalleryContext.Provider>
  );
};
