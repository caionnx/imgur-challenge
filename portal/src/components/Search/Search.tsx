import React from "react";

type Props = {
  showButton: boolean;
  buttonLabel: string;
  name: string;
  label: string;
  onTrigger: () => void;
  [rest: string]: unknown;
};

export const Search = ({
  showButton,
  buttonLabel,
  name,
  label,
  onTrigger,
  ...rest
}: Props) => {
  return (
    <div>
      <form onSubmit={onTrigger}>
        <label
          htmlFor={name}
          className="block mb-2 text-sm font-medium text-white"
        >
          {label}
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            {...rest}
            type="search"
            id={name}
            className="block w-full p-2.5 ps-10 text-sm border rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search images by term"
          />
          {showButton && (
            <button
              onClick={onTrigger}
              className="text-white absolute end-0.5 bottom-[0.215rem] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
            >
              {buttonLabel}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
