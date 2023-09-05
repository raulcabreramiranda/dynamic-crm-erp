import React, { useContext } from 'react';
import { GenerateQueriesContext } from '../GenerateQueriesProvider';

const SelectFuntionsComponente = () => {
  const { columns, autoRelations, select, setSelect, from, setFrom } = useContext(GenerateQueriesContext);
  return (
    <div>
      <h1>Resumir</h1>
    </div>
  );
};

export default SelectFuntionsComponente;
