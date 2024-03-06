import React, { ChangeEvent } from "react";
import { Select } from '../components/Select/Select';
import { useGallery } from "../providers/GalleryProvider";

export const Refine = () => {
  const { parameters, setParameters } = useGallery();

  const sectionSelectProps = {
    options: [{ value: 'hot', label: 'Hot' }, { value: 'top', label: 'Top' }, { value: 'user', label: 'User' }],
    label: 'Section',
    name: 'section',
    onChange: (ev: ChangeEvent<HTMLSelectElement>) => { setParameters({ ...parameters, section: ev.target.value }) }
  }

  const viralSelectProps = {
    options: [{ value: 'true', label: 'Please and thank you!' }, { value: 'false', label: 'No' }],
    label: 'Show virals',
    name: 'virals',
    onChange: (ev: ChangeEvent<HTMLSelectElement>) => { setParameters({ ...parameters, showViral: ev.target.value }) }
  }

  return (
    <div className="flex space-x-4">
      <Select {...sectionSelectProps} />
      <Select {...viralSelectProps} />
    </div>
  );
};
