import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { AlbumModal } from "../AlbumModal";

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
      description: "a horse doing horse things",
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

describe("AlbumModal", () => {
  const mockOnCloseModal = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly when isOpen is true", () => {
    render(
      <AlbumModal
        album={mockedGallery}
        isOpen={true}
        onCloseModal={mockOnCloseModal}
      />
    );

    const albumTitle = screen.getByText("Mean but funny");
    const image = screen.getByAltText("a horse doing horse things");
    const closeButton = screen.getByText("Close modal");

    expect(albumTitle).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();
  });

  it("should render correctly when isOpen is false", () => {
    render(
      <AlbumModal
        album={undefined}
        isOpen={false}
        onCloseModal={mockOnCloseModal}
      />
    );

    const albumTitle = screen.queryByText("Mean but funny");

    expect(albumTitle).not.toBeInTheDocument();
  });

  it("should trigger onCloseModal function when close button is clicked", () => {
    render(
      <AlbumModal
        album={mockedGallery}
        isOpen={true}
        onCloseModal={mockOnCloseModal}
      />
    );

    const closeButton = screen.getByText("Close modal");
    fireEvent.click(closeButton);

    expect(mockOnCloseModal).toHaveBeenCalledTimes(1);
  });

  it("should render video correctly when album contains mp4 video", () => {
    render(
      <AlbumModal
        album={{
          ...mockedGallery,
          images: [{ ...mockedGallery.images[0], mp4: "video_link" }],
        }}
        isOpen={true}
        onCloseModal={mockOnCloseModal}
      />
    );

    const videoSource = screen.getByTestId("videosource") as HTMLSourceElement;

    expect(videoSource).toBeInTheDocument();
    expect(videoSource.src).toBe("http://localhost/video_link");
  });
});
