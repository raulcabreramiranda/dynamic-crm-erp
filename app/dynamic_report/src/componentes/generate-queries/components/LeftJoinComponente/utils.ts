import TreeNode from 'primereact/treenode';
import { IRelationshipsProps } from '../../GenerateQueriesProvider';
import { Dispatch, SetStateAction } from 'react';

export const isEqualsRelations = (rel1: IRelationshipsProps, rel2: IRelationshipsProps): boolean => {
  if (rel1.startTable === rel2.startTable && rel1.startColumn === rel2.startColumn && rel1.endTable === rel2.endTable && rel1.endColumn === rel2.endColumn) {
    return true;
  }
  return false;
};

export const createTreeNodeList = (autoRelations: IRelationshipsProps[], leftJoin: IRelationshipsProps[], startTable: string, parentsKey: string, parents: string[]): TreeNode[] => {
  const _relections: any[] = [];
  let count = 0;
  autoRelations
    .filter((v) => v.startTable === startTable)
    .forEach((data: IRelationshipsProps, key) => {
      if (!parents.includes(data.endTable)) {
        const children = createTreeNodeList(autoRelations, leftJoin, data.endTable, `${parentsKey}${count}-`, [...parents, startTable]);

        _relections.push({
          key: `${parentsKey}${count++}`,
          isChecked: false,
          startTable: data.startTable,
          startColumn: data.startColumn,
          endTable: data.endTable,
          endColumn: data.endColumn,
          parents: [...parents, startTable],
          children,
        });
      }
    });
  return _relections;
};