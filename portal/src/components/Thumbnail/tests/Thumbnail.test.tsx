import React from "react";
import { render, screen } from "@testing-library/react";
import { Thumbnail } from "../Thumbnail";
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils";

const testMedia = {
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
};

describe("Thumbnail", () => {
  it("should render image with title", () => {
    const titleText = "My Test";

    render(<Thumbnail title={titleText} media={testMedia} />);

    const title = screen.getByText(titleText);
    const image = screen.getByAltText(titleText);

    expect(title).toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });

  it("should render video with title if intersected", () => {
    const titleText = "My Test";
    const videoMedia = {
      ...testMedia,
      type: "video/mp4",
      mp4: "linktovideo",
    };

    render(<Thumbnail title={titleText} media={videoMedia} />);
    mockAllIsIntersecting(true);

    const title = screen.getByText(titleText);
    const image = screen.queryByAltText(titleText);
    const videoSource = screen.queryByTestId("videosource");

    expect(title).toBeInTheDocument();
    expect(videoSource).toBeInTheDocument();
    expect(image).not.toBeInTheDocument();
  });
});
