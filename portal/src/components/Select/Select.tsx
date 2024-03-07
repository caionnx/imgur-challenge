import React from "react";

type Props = {
  options: Record<string, string>[];
  containerClassName?: string;
  label: string;
  name: string;
  [rest: string]: unknown;
};

export const Select = ({
  options,
  containerClassName,
  label,
  name,
  ...rest
}: Props) => {
  return (
    <div className={containerClassName || "relative w-full md:w-48"}>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <select
        {...rest}
        id={name}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};
