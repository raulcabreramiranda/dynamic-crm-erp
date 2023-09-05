import React, { Dispatch, useContext, useEffect, useState } from 'react';
import { GenerateQueriesContext, IRelationshipsProps } from '../../GenerateQueriesProvider';
import TreeNode from 'primereact/treenode';
import { classNames } from 'primereact/utils';
import { Tree } from 'primereact/tree';
import { Column } from 'primereact/column';
import { isEqualsRelations } from './utils';

export interface IProp {
  node: any;
  options: any;
}
function LeftJoinTreeNode({ node, options }: IProp) {
  const { autoRelations, from, leftJoin, setLeftJoin, treeNodeRelations, setTreeNodeRelations } = useContext(GenerateQueriesContext);

  const nodeClick = (listTablesToAdd: string[]) => {
    const listOfKeys: number[] = node.key.split('-').map((v: string) => +v);
    if (isAddedLeftJoin(listOfKeys, treeNodeRelations)) {
      const newTreeNodeRelations = removeLeftJoinParent(listOfKeys, treeNodeRelations);
      setTreeNodeRelations(newTreeNodeRelations);

      /*       const clickedTable = listTablesToAdd[listTablesToAdd.length - 1];
      const clickedTableParent = listTablesToAdd[listTablesToAdd.length - 2];
      const relToClicked: IRelationshipsProps | undefined = leftJoin.filter((v) => v.startTable === clickedTableParent && v.endTable === clickedTable).pop();
      if (relToClicked) {
      } */
    } else {
      const newTreeNodeRelations = addLeftJoin(listOfKeys, treeNodeRelations);
      setTreeNodeRelations(newTreeNodeRelations);
    }
  };

  const isAddedLeftJoin = (listOfKeys: number[], auxTreeNodeRelations: any[]): boolean => {
    const key = listOfKeys[0];
    if (listOfKeys.length > 1) {
      return isAddedLeftJoin(listOfKeys.slice(1), auxTreeNodeRelations[key]?.children || []);
    }
    return auxTreeNodeRelations[key].isChecked;
  };

  const removeLeftJoinParent = (listOfKeys: number[], auxTreeNodeRelations: any[]): TreeNode[] => {
    const key = listOfKeys[0];
    let children: TreeNode[] | undefined = auxTreeNodeRelations[key]?.children;
    const newTreeNodeRelations = [...auxTreeNodeRelations];
    if (listOfKeys.length > 1) {
      children = removeLeftJoinParent(listOfKeys.slice(1), auxTreeNodeRelations[key]?.children || []);
      newTreeNodeRelations[key] = { ...newTreeNodeRelations[key], children };
      return newTreeNodeRelations;
    }

    newTreeNodeRelations[key] = removeLeftJoinChild(newTreeNodeRelations[key]);
    return newTreeNodeRelations;
  };

  const removeLeftJoinChild = (auxTreeNode: any): TreeNode => {
    const children: TreeNode[] | undefined = auxTreeNode.children;
    if (children) {
      const newChildren: TreeNode[] = [];
      children.forEach((v) => {
        newChildren.push(removeLeftJoinChild(v))
      });
      return { ...auxTreeNode, isChecked: false, children: newChildren };
    }
    return { ...auxTreeNode, isChecked: false };
  };

  const addLeftJoin = (listOfKeys: number[], auxTreeNodeRelations: any[]): TreeNode[] => {
    const key = listOfKeys[0];
    let children: TreeNode[] | undefined = auxTreeNodeRelations[key]?.children;
    if (listOfKeys.length > 1) {
      children = addLeftJoin(listOfKeys.slice(1), auxTreeNodeRelations[key]?.children || []);
    }
    const newTreeNodeRelations = [...auxTreeNodeRelations];
    newTreeNodeRelations[key] = {
      ...newTreeNodeRelations[key],
      isChecked: true,
      children,
    };

    return newTreeNodeRelations;

    /*     let startTable = from?.name;
    listTablesToAdd.forEach((tableToAdd: string) => {
      if (startTable === tableToAdd) {
        return;
      }
      const relToAdd: IRelationshipsProps | undefined = autoRelations.filter((v) => v.startTable === startTable && v.endTable === tableToAdd).pop();
      if (relToAdd) {
        const isRelNotAdded = leftJoin.filter((_leftJoin) => isEqualsRelations(relToAdd, _leftJoin)).length === 0;
        if (isRelNotAdded) {
          setLeftJoin((_leftJoin) => [..._leftJoin, relToAdd]);
        }
      }
      startTable = relToAdd?.endTable;
    }); */
  };

  return (
    <span className={options.className}>
      <input type="checkbox" checked={node.isChecked || false} className={'form-control'} onChange={() => nodeClick([...node.parents, node.endTable])} />
      {node.endTable}
    </span>
  );
}

export default LeftJoinTreeNode;
