import React, { useState, useEffect, useRef, useContext } from 'react';
import { DataTable, DataTableExpandedRows, DataTableRowEvent, DataTableValueArray } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Rating } from 'primereact/rating';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Dropdown } from 'primereact/dropdown';
import ColumnFieldsTemplate from './FieldsTemplate/ColumnFieldsTemplate';
import FormatFieldsTemplate from './FieldsTemplate/FormatFieldsTemplate';
import NameFieldsTemplate from './FieldsTemplate/NameFieldsTemplate';
import RoulerFieldsTemplate from './FieldsTemplate/RoulerFieldsTemplate';
import { GenerateQueriesContext } from '../../GenerateQueriesProvider';
import TableFieldsTemplate from './FieldsTemplate/TableFieldsTemplate';

interface Order {
  id: string;
  productCode: string;
  date: string;
  amount: number;
  quantity: number;
  customer: string;
  status: string;
}

interface Product {
  id: string;
  code: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  quantity: number;
  inventoryStatus: string;
  rating: number;
  orders?: Order[];
}

function SelectFieldsList() {
  const [expandedRows, setExpandedRows] = useState<DataTableExpandedRows | DataTableValueArray | undefined>(undefined);
  const { select, setSelect } = useContext(GenerateQueriesContext);
  const toast = useRef<Toast>(null);

  useEffect(() => {}, []);

  const header = (
    <div className="flex flex-wrap justify-content-end gap-2">
      <Button
        icon="pi pi-plus"
        label="Nova"
        onClick={() =>
          setSelect((_columns) => [
            ..._columns,
            {
              id: 0,
              table: undefined,
              column: undefined,
              name: '',
              format: '',
              rulers: [],
            },
          ])
        }
        text
      />
    </div>
  );

  return (
    <div className="card">
      <Toast ref={toast} />
      <DataTable value={select} expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)} dataKey="id" header={header} tableStyle={{ minWidth: '60rem' }}>
        <Column header="Table" body={(data, options) => <TableFieldsTemplate data={data} options={options} />} />
        <Column header="Column" body={(data, options) => <ColumnFieldsTemplate data={data} options={options} />} />
        <Column header="Name" body={(data, options) => <NameFieldsTemplate data={data} options={options} />} />
        <Column header="Format" body={(data, options) => <FormatFieldsTemplate data={data} options={options} />} />
        <Column header="Rulers" body={(data, options) => <RoulerFieldsTemplate data={data} options={options} />} />
      </DataTable>
    </div>
  );
}

export default SelectFieldsList;
