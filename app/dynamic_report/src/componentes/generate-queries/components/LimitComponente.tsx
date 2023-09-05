import React, { useContext } from 'react';
import { GenerateQueriesContext } from '../GenerateQueriesProvider';

const LimitComponente = () => {
  const { columns, autoRelations, select, setSelect, from, setFrom } = useContext(GenerateQueriesContext);
  return (
    <div>
      <h1>Limitar Resultados</h1>
    </div>
  );
};

export default LimitComponente;
