import React, { useContext } from 'react';
import { GenerateQueriesContext } from '../GenerateQueriesProvider';

const WhereComponente = () => {
  const { columns, autoRelations, select, setSelect, from, setFrom } = useContext(GenerateQueriesContext);
  return (
    <div>
      <h1>Filtros</h1>
    </div>
  );
};

export default WhereComponente;
