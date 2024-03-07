import React, { ChangeEvent, useCallback, useState } from "react";
import { Select } from "../components/Select/Select";
import { Search } from "../components/Search/Search";
import { useGallery } from "../providers/GalleryProvider";

export const Refine = () => {
  const { parameters, setParameters } = useGallery();
  const [search, setSearchTerm] = useState("");

  const onSearchChange = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(ev.target.value);
    },
    []
  );

  const onSetSearch = useCallback(() => {
    setParameters({ ...parameters, search });
    setSearchTerm("");
  }, [search]);

  const searchInputProps = {
    value: search,
    onChange: onSearchChange,
    showButton: Boolean(search),
    buttonLabel: "Search",
    name: "search",
    label: "Search:",
    onTrigger: onSetSearch,
  };

  const sectionSelectProps = {
    options: [
      { value: "hot", label: "Hot" },
      { value: "top", label: "Top" },
      { value: "user", label: "User" },
    ],
    label: "Section:",
    name: "section",
    onChange: (ev: ChangeEvent<HTMLSelectElement>) => {
      setParameters({ ...parameters, section: ev.target.value });
    },
  };

  const viralSelectProps = {
    options: [
      { value: "true", label: "Please and thank you!" },
      { value: "false", label: "No" },
    ],
    label: "Show virals:",
    name: "virals",
    onChange: (ev: ChangeEvent<HTMLSelectElement>) => {
      setParameters({ ...parameters, showViral: ev.target.value });
    },
  };

  return (
    <div className="flex flex-col md:flex-row mb-8 space-y-4 md:space-y-0 md:space-x-4">
      <div className="grow">
        <Search {...searchInputProps} />
      </div>
      {!parameters.search && (
        <>
          <Select {...sectionSelectProps} />
          <Select {...viralSelectProps} />
        </>
      )}
    </div>
  );
};
