import React from "react";
import { Thumbnail } from "../components/Thumbnail/Thumbnail";
import { useGallery } from "../providers/GalleryProvider";

export const Grid = () => {
  const { data, parameters, setParameters, isFetching } = useGallery();
  const onClearSeach = () => {
    setParameters({ ...parameters, search: "" });
  };

  return (
    <>
      {parameters.search && (
        <div className="flex mt-8 mb-8 flex-col md:items-center md:flex-row md:justify-between gap-4">
          <h1 className="text-white text-2xl">
            {data?.length ? (
              <>Showing results for "{parameters.search}"</>
            ) : (
              <>No results found for "{parameters.search}"</>
            )}
          </h1>
          <button
            type="button"
            onClick={onClearSeach}
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Clear search
          </button>
        </div>
      )}
      <div
        className={`${isFetching ? "opacity-50" : ""} grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4`}
      >
        {data?.map((item) => {
          const firstMediaItem = item.images && item.images[0];
          if (!firstMediaItem) {
            return null;
          }
          return (
            <Thumbnail
              title={item.title}
              key={item.id}
              media={firstMediaItem}
            />
          );
        })}
      </div>
    </>
  );
};
