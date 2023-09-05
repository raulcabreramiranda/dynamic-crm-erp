import { Dropdown } from 'primereact/dropdown';
import React, { useContext, useEffect, useState } from 'react';
import { GenerateQueriesContext, ITableProps, IColumnSelected } from '../../../GenerateQueriesProvider';
import { ITemplateProps } from '../SelectFieldsProvider';

const TableFieldsTemplate = ({ data, options }: ITemplateProps) => {
  const { from, treeNodeRelations, columns, setSelect } = useContext(GenerateQueriesContext);

  const [tableList, setTableList] = useState<ITableProps[]>([]);

  const setTableSelected = (value: string): void => {
    const _selectRow: IColumnSelected = { ...data, table: value, column: undefined };
    setSelect((_selectList) => _selectList.map((v, i) => (i === options.rowIndex ? _selectRow : v)));
  };

  const getLeftJoinFromTree = (_treeNodeRelations: any[]): string[] => {
    let _tables: string[] = [];
    _treeNodeRelations.forEach((_rel) => {
      if (_rel.isChecked) {
        _tables.push(_rel.endTable);
        if (_rel.children) {
          _tables = [..._tables, ...getLeftJoinFromTree(_rel.children)];
        }
      }
    });
    return _tables;
  };

  useEffect(() => {
    const tables = [from?.name || '', ...getLeftJoinFromTree(treeNodeRelations)];
    setTableList(tables.map((v) => (columns[v])));
  }, [treeNodeRelations]);

  return <Dropdown value={data.table} onChange={(e) => setTableSelected(e.value)} options={tableList} optionLabel="name" className="w-full"></Dropdown>;
};

export default TableFieldsTemplate;
