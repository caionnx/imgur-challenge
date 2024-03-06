import React, { useState } from "react";
import ReactModal from "react-modal";

export const AlbumModal = ({
  album,
  onCloseModal,
}: {
  album: ImgurRestApi.GalleryAlbum | undefined;
  onCloseModal: () => void;
}) => {
  return (
    <ReactModal
      isOpen={Boolean(album)}
      className="fixed bg-slate-800/75 top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative w-full max-w-7xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              {album?.title}
            </h3>
            <button
              onClick={onCloseModal}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
                        muted
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
                        alt={media.description || album?.title}
                        src={media.link}
                      />
                    )}
                  </center>
                  <p className="text-base max-w-prose	leading-relaxed text-gray-500 dark:text-gray-400">
                    {media.description}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="p-4 md:p-5 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600">
            <p className="text-base text-center	leading-relaxed text-gray-500 dark:text-gray-400">
              {album?.ups} ⬆️ / {album?.downs} ⬇️ / {album?.score} ⭐ /{" "}
              {album?.views} 👀
            </p>
          </div>
        </div>
      </div>
    </ReactModal>
  );
};
