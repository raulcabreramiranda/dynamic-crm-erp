import React, { useState, createContext, Dispatch } from 'react';
import { ChildContainerProps } from '../../../../types/types';
import { ColumnBodyOptions } from 'primereact/column';

export const SelectFieldsContext = createContext({} as SelectFieldsContextProps);

export interface ITemplateProps {
  data: any, 
  options: ColumnBodyOptions
}



export interface SelectFieldsContextProps {
  // columnSelected: IColumnSelected[];
  // setColumnSelected: Dispatch<React.SetStateAction<IColumnSelected[]>>;
}

export const SelectFieldsProvider = ({ children }: ChildContainerProps) => {
  // const [columnSelected, setColumnSelected] = useState<IColumnSelected[]>([]);

  const value: SelectFieldsContextProps = { /* columnSelected, setColumnSelected */ };

  return <SelectFieldsContext.Provider value={value}>{children}</SelectFieldsContext.Provider>;
};
