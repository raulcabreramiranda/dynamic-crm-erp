import { InputText } from 'primereact/inputtext';
import React, { useContext } from 'react';
import { ITemplateProps } from '../SelectFieldsProvider';

const NameFieldsTemplate = ({data, options}: ITemplateProps) => {
  return <InputText className="w-full" />;
};

export default NameFieldsTemplate;
