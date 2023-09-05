import React, { Children, useContext } from 'react';
import { GenerateQueriesContext } from '../../GenerateQueriesProvider';

const ShowQueryComponente = () => {
  const { from, treeNodeRelations } = useContext(GenerateQueriesContext);

  const getLeftJoinFromTree = (_treeNodeRelations: any[]) => {
    let _leftJoinSQL = '';
    _treeNodeRelations.forEach((_rel) => {
      if (_rel.isChecked) {
        _leftJoinSQL += /*SQL*/ `  
           LEFT JOIN ${_rel.endTable} on (${_rel.endTable}.${_rel.endColumn} = ${_rel.startTable}.${_rel.startColumn})`;
        if (_rel.children) {
          _leftJoinSQL += getLeftJoinFromTree(_rel.children);
        }
      }
    });
    return _leftJoinSQL;
  };

  const selectSQL = '';
  const fromSQL = from?.name || '<Not Selected Table>';
  const leftJoinSQL = getLeftJoinFromTree(treeNodeRelations);
  const conditionalSQL = '1=1';
  const querySQLFormated = /*SQL*/ `
           SELECT 
                  ${selectSQL ? selectSQL : '*'} 
           FROM ${fromSQL} ${leftJoinSQL} 
           WHERE
                  ${conditionalSQL || '1=1'}
        `;

  return (
    <div>
      <pre style={{ width: '100%', float: 'left', padding: '0 10px' }}>{querySQLFormated}</pre>
    </div>
  );
};

export const trimChar = (string: string, charToRemove: string) => {
  while (string.charAt(0) == charToRemove) {
    string = string.substring(1);
  }

  while (string.charAt(string.length - 1) == charToRemove) {
    string = string.substring(0, string.length - 1);
  }

  return string;
};

export default ShowQueryComponente;
