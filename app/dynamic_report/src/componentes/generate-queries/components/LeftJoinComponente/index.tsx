import React, { useContext, useEffect, useState } from 'react';
import { GenerateQueriesContext, IRelationshipsProps } from '../../GenerateQueriesProvider';
import TreeNode from 'primereact/treenode';
import { Tree } from 'primereact/tree';
import LeftJoinTreeNode from './LeftJoinTreeNode';
import { createTreeNodeList } from './utils';

const LeftJoinComponente = () => {
  const { autoRelations, from, leftJoin, setLeftJoin, treeNodeRelations, setTreeNodeRelations } = useContext(GenerateQueriesContext);

  useEffect(() => {
    setLeftJoin([]);
    if (from?.name) {
      const _relections: TreeNode[] = createTreeNodeList(autoRelations, leftJoin, from?.name, '', []);
      setTreeNodeRelations(_relections);
    }
  }, [from?.name]);

  useEffect(() => {
    
  }, [treeNodeRelations]);

  return (
    <div>
      <Tree value={treeNodeRelations} nodeTemplate={(node: any, options: any) => <LeftJoinTreeNode node={node} options={options} />} />
    </div>
  );
};

export default LeftJoinComponente;
