import React, { useContext } from 'react';
import { GenerateQueriesContext } from '../../GenerateQueriesProvider';
import SelectFieldsList from './SelectFieldsList';
import { SelectFieldsProvider } from './SelectFieldsProvider';

const SelectComponente = () => {
  const { columns, autoRelations, select, setSelect, from, setFrom } = useContext(GenerateQueriesContext);
  return (
    <SelectFieldsProvider>
      <h1>Colunas</h1>
      <SelectFieldsList />
    </SelectFieldsProvider>
  );
};

export default SelectComponente;
