import React, { useContext } from 'react';
import { GenerateQueriesContext } from '../GenerateQueriesProvider';

const OrderByComponente = () => {
  const { columns, autoRelations, select, setSelect, from, setFrom } = useContext(GenerateQueriesContext);
  return (
    <div>
      <h1>Ordem</h1>
    </div>
  );
};

export default OrderByComponente;
