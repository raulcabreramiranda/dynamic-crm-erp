import React, { useContext } from 'react';
import { GenerateQueriesContext } from '../GenerateQueriesProvider';

const GroupByComponente = () => {
  const { columns, autoRelations, select, setSelect, from, setFrom } = useContext(GenerateQueriesContext);
  return (
    <div>
      <h1>Agrupar</h1>
    </div>
  );
};

export default GroupByComponente;
