import { Dropdown } from 'primereact/dropdown';

import React, { useContext, useState } from 'react';
import { GenerateQueriesContext, IColumnSelected, ITableProps } from '../../../GenerateQueriesProvider';
import { ITemplateProps } from '../SelectFieldsProvider';

const ColumnFieldsTemplate = ({data, options}: ITemplateProps) => {

  const { columns, select, setSelect } = useContext(GenerateQueriesContext);

  const columnSelected: ITableProps = data.table

  const setColumnSelected = (value: string): void => {
    const _selectRow: IColumnSelected = { ...data, column: value };
    setSelect((_selectList) => _selectList.map((v, i) => (i === options.rowIndex ? _selectRow : v)));
  };


  return <Dropdown value={data.column} onChange={(e) => setColumnSelected(e.value)} options={columnSelected?.columns || []} optionLabel="label" className="w-full"></Dropdown>;
};

export default ColumnFieldsTemplate;
