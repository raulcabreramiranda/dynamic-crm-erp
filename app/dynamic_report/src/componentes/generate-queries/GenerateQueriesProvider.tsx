import React, { useState, createContext, Dispatch, SetStateAction } from 'react';
import { ChildContainerProps } from '../../types/types';

import columnsDefault from './metadata/columns.js';
import autoRelationsDefault from './metadata/relations.js';
import TreeNode from 'primereact/treenode';

export const GenerateQueriesContext = createContext({} as GenerateQueriesContextProps);
export interface IColumnSelected {
  id?: number;
  table?: ITableProps;
  column?: IColumnProps;
  name?: string;
  format?: string;
  rulers?: any[];
}

export interface GenerateQueriesContextProps {
  columns: ITableList;
  autoRelations: IRelationshipsProps[];
  select: IColumnSelected[];
  setSelect: Dispatch<SetStateAction<IColumnSelected[]>>;
  from: ITableProps | undefined;
  setFrom: Dispatch<SetStateAction<ITableProps | undefined>>;
  leftJoin: IRelationshipsProps[];
  setLeftJoin: Dispatch<SetStateAction<IRelationshipsProps[]>>;
  where: any[];
  setWhere: Dispatch<SetStateAction<any[]>>;
  groupBy: any[];
  setGroupBy: Dispatch<SetStateAction<any[]>>;
  orderBy: any[];
  setOrderBy: Dispatch<SetStateAction<any[]>>;
  limit: any[];
  setLimit: Dispatch<SetStateAction<any[]>>;
  treeNodeRelations: TreeNode[];
  setTreeNodeRelations: Dispatch<React.SetStateAction<TreeNode[]>>;
}

export interface IColumnProps {
  name: string;
  label: string;
  type: string;
}
export interface ITableProps {
  name: string;
  label: string;
  columns: IColumnProps[];
}
export interface ITableList {
  [name: string]: ITableProps;
}

export interface IRelationshipsProps {
  startTable: string;
  startColumn: string;
  endTable: string;
  endColumn: string;
}

export const GenerateQueriesProvider = ({ children }: ChildContainerProps) => {
  const columns: ITableList = columnsDefault.default;
  const autoRelations: IRelationshipsProps[] = autoRelationsDefault.default;

  const [select, setSelect] = useState<IColumnSelected[]>([]);
  const [from, setFrom] = useState<ITableProps | undefined>(undefined);
  const [leftJoin, setLeftJoin] = useState<IRelationshipsProps[]>([]);
  const [where, setWhere] = useState<any[]>([]);
  const [groupBy, setGroupBy] = useState<any[]>([]);
  const [orderBy, setOrderBy] = useState<any[]>([]);
  const [limit, setLimit] = useState<any[]>([]);
  const [treeNodeRelations, setTreeNodeRelations] = useState<TreeNode[]>([]);

  const value: GenerateQueriesContextProps = { treeNodeRelations, setTreeNodeRelations, columns, autoRelations, select, setSelect, from, setFrom, leftJoin, setLeftJoin, where, setWhere, groupBy, setGroupBy, orderBy, setOrderBy, limit, setLimit };

  return <GenerateQueriesContext.Provider value={value}>{children}</GenerateQueriesContext.Provider>;
};
