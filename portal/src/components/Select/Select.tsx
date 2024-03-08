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
        className="block mb-2 text-sm font-medium text-white"
      >
        {label}
      </label>
      <select
        {...rest}
        id={name}
        className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
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
