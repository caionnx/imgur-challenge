import React from "react";
import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import { GalleryProvider, useGallery } from "../GalleryProvider";

jest.mock("axios");

const mockedGallery = {
  id: "ywtUtDj",
  title: "Mean but funny",
  description: "",
  datetime: 1709689433,
  cover: "YHr9xVl",
  cover_width: 832,
  cover_height: 262,
  account_url: "memes4youungratefulbastards",
  account_id: 178355116,
  privacy: "hidden",
  layout: "blog",
  views: 13515,
  link: "https://imgur.com/a/ywtUtDj",
  ups: 216,
  downs: 11,
  points: 205,
  score: 211,
  is_album: true,
  vote: "",
  favorite: false,
  nsfw: false,
  section: "",
  comment_count: 38,
  favorite_count: 8,
  topic: "",
  topic_id: 12,
  images_count: 1,
  in_gallery: true,
  is_ad: false,
  tags: [],
  ad_type: 0,
  ad_url: "",
  in_most_viral: true,
  include_album_ads: false,
  images: [
    {
      id: "zWKfF4B",
      title: "",
      description: "",
      datetime: 1709619310,
      type: "image/png",
      animated: false,
      width: 1080,
      height: 1127,
      size: 1548178,
      views: 11322,
      bandwidth: 17528471316,
      vote: "",
      favorite: false,
      nsfw: undefined,
      section: "",
      account_url: "",
      account_id: 154848,
      is_ad: false,
      in_most_viral: false,
      has_sound: false,
      tags: [],
      ad_type: 0,
      ad_url: "",
      edited: "0",
      in_gallery: false,
      link: "https://i.imgur.com/zWKfF4B.png",
      comment_count: "",
      favorite_count: "",
      ups: "",
      downs: "",
      points: "",
      score: "",
    },
  ],
  ad_config: {
    safeFlags: ["album", "in_gallery", "gallery"],
    highRiskFlags: [],
    unsafeFlags: [],
    wallUnsafeFlags: [],
    showsAds: true,
    showAdLevel: 2,
    safe_flags: ["album", "in_gallery", "gallery"],
    high_risk_flags: [],
    unsafe_flags: [],
    wall_unsafe_flags: [],
    show_ads: true,
    show_ad_level: 2,
    nsfw_score: 0,
  },
};

describe("GalleryProvider", () => {
  let queryClient: QueryClient;

  beforeAll(() => {
    queryClient = new QueryClient();
  });

  afterEach(() => {
    jest.clearAllMocks();
    queryClient.clear();
  });

  it("should renders children and not fetches data from API on mount", async () => {
    const initialState = [mockedGallery];

    render(
      <QueryClientProvider client={queryClient}>
        <GalleryProvider searchParams="" initialState={initialState}>
          <TestComponent />
        </GalleryProvider>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(axios.get).not.toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(screen.getByText(mockedGallery.title)).toBeInTheDocument();
    });
  });

  it("should render children and fetches data from Gallery API when parameters change", async () => {
    const fakeData = [{ ...mockedGallery, title: "From API" }];
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: { data: fakeData } });

    const initialState = [mockedGallery];

    render(
      <QueryClientProvider client={queryClient}>
        <GalleryProvider searchParams="" initialState={initialState}>
          <TestComponent />
        </GalleryProvider>
      </QueryClientProvider>
    );

    await waitFor(() => {
      fireEvent.click(screen.getByRole('button', { name: "Change Parameters" }));
    });

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        "https://imgur-api.fly.dev/gallery?section=hot&showViral=false"
      );
    });

    await waitFor(() => {
      expect(screen.getByText("From API")).toBeInTheDocument();
    });
  });

  it("should render children and fetches data from Search API when search parameter exists", async () => {
    const fakeData = [{ ...mockedGallery, title: "From Search API" }];
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: { data: fakeData } });

    const initialState = [mockedGallery];

    render(
      <QueryClientProvider client={queryClient}>
        <GalleryProvider searchParams="" initialState={initialState}>
          <TestComponent />
        </GalleryProvider>
      </QueryClientProvider>
    );

    await waitFor(() => {
      fireEvent.click(screen.getByRole('button', { name: "Set Search" }));
    });

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        "https://imgur-api.fly.dev/search?q=cats"
      );
    });

    await waitFor(() => {
      expect(screen.getByText("From Search API")).toBeInTheDocument();
    });
  });
});

const TestComponent = () => {
  const { data, setParameters } = useGallery();

  return (
    <div>
      <button onClick={() => { setParameters({ section: 'hot', showViral: 'false' }) }}>Change Parameters</button>
      <button onClick={() => { setParameters({ search: 'cats', section: 'hot', showViral: 'false' }) }}>Set Search</button>
      {data?.map((item) => <div key={item.id}>{item.title}</div>)}
    </div>
  );
};
