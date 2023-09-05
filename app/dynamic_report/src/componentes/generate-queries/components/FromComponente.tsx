import React, { useContext } from 'react';
import { GenerateQueriesContext } from '../GenerateQueriesProvider';
import { Dropdown } from 'primereact/dropdown';

const FromComponente = () => {
  const { columns, from, setFrom } = useContext(GenerateQueriesContext);
  const tablesOptions = Object.values(columns)  
  
  return (
      <div className="card flex justify-content-center">
          <Dropdown value={from} onChange={(e) => setFrom(e.value)} options={tablesOptions} optionLabel="label" 
              placeholder="Seleccione a Tabela" className="w-full md:w-14rem" />
      </div>
  )
};

export default FromComponente;
