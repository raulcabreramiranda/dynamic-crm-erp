import { Dropdown } from 'primereact/dropdown';
import React, { useContext } from 'react';
import { ITemplateProps } from '../SelectFieldsProvider';

const FormatFieldsTemplate = ({data, options}: ITemplateProps) => {
  return <Dropdown className="w-full"></Dropdown>;
};

export default FormatFieldsTemplate;
