import React, { useEffect } from "react";
import ReactModal from "react-modal";

export const AlbumModal = ({
  album,
  isOpen,
  onCloseModal,
}: {
  album: ImgurRestApi.GalleryAlbum | undefined;
  isOpen: boolean;
  onCloseModal: () => void;
}) => {
  const appElement =
    typeof window !== "undefined"
      ? (document.querySelector("#app") as HTMLElement)
      : undefined;
  const modalPropsElement = appElement ? { appElement } : {};

  useEffect(() => {
    const bodyElement = document.querySelector("body");

    if (bodyElement) {
      bodyElement.style.overflow = isOpen ? "hidden" : "auto";
    }
  }, [isOpen]);

  return (
    <ReactModal
      {...modalPropsElement}
      isOpen={isOpen}
      onRequestClose={onCloseModal}
      shouldCloseOnOverlayClick
      shouldCloseOnEsc
      overlayClassName="fixed flex justify-center items-center z-20 bg-slate-800/75 top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[100%] max-h-full"
      className="relative w-full max-w-7xl max-h-full"
      style={{
        content: {
          position: "initial",
          inset: 0,
          border: 0,
          background: "initial",
          overflow: "auto",
          borderRadius: 0,
          outline: "none",
          padding: 0,
          scrollbarWidth: "none",
        },
      }}
    >
      <div className="relative rounded-lg shadow bg-gray-700">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600">
          <h3 className="text-xl font-medium pr-4 text-gray-900 text-white">
            {album?.title}
          </h3>
          <button
            onClick={onCloseModal}
            type="button"
            className="text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <div className="p-4 md:p-5 space-y-4">
          {album?.images.map((media) => {
            return (
              <div key={media.id}>
                <center>
                  {media.mp4 ? (
                    <video
                      className="h-auto max-w-full"
                      draggable="false"
                      controls
                      muted={album?.images.length > 1}
                      playsInline
                      autoPlay
                      loop
                    >
                      <source
                        data-testid="videosource"
                        type="video/mp4"
                        src={media.mp4}
                      />
                    </video>
                  ) : (
                    <img
                      className="max-w-full lg:max-w-xl"
                      alt={media.description || album?.title}
                      src={media.link}
                    />
                  )}
                </center>
                <p className="text-base max-w-prose	leading-relaxed pt-2 text-gray-100">
                  {media.description}
                </p>
              </div>
            );
          })}
        </div>
        <div className="p-4 md:p-5 space-x-3 rtl:space-x-reverse border-t rounded-b border-gray-600">
          <p className="text-base text-center	leading-relaxed text-white">
            {album?.ups} ⬆️ / {album?.downs} ⬇️ / {album?.score} ⭐ /{" "}
            {album?.views} 👀
          </p>
        </div>
      </div>
    </ReactModal>
  );
};
