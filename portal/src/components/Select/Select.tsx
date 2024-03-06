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
    <div className="relative h-10 w-72">
      <select
        {...rest}
        name={name}
        className="peer h-full w-full rounded-[7px] border border-slate-400 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-white outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-gray-200 placeholder-shown:border-t-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-slate-400 focus:border-t-transparent focus:outline-0 disabled:border-0"
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <label
        htmlFor={name}
        className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-white transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-slate-400 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-slate-400 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-white peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-slate-400 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-slate-400 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-white"
      >
        {label}
      </label>
    </div>
  );
};
