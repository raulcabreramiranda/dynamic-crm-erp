import { Button } from 'primereact/button';
import React, { useContext } from 'react';
import { ITemplateProps } from '../SelectFieldsProvider';

const RoulerFieldsTemplate = ({data, options}: ITemplateProps) => {
  return <Button icon="pi pi-search" />;
};

export default RoulerFieldsTemplate;
