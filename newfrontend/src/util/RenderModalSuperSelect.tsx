import React, { useState } from 'react';

import {
  Button,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

import { translate, Translate } from './translate-component';
import { getListAxios, getValueRecursive } from './entity-utils';

export const RenderModalSuperSelect = ({
  context,
  baseState,
  setState,
  entity,
  listEntity,
  template,
  stateField,
  multiple,
  showFields,
  order = 'id,asc',
  filtersBase = {},
}: any) => {
  const [totalCount, setTotalCount] = useState(0);
  const [listCheckedModalSuperEntities, setListCheckedModalSuperEntities] =
    useState([] as any);
  const [listCheckedModalSuperSelectID, setListCheckedModalSuperSelectID] =
    useState([] as any);
  const [
    listCheckedModalSuperSelectFilters,
    setListCheckedModalSuperSelectFilters,
  ] = useState({} as any);
  const [modalSuperSelect, setModalSuperSelect] = useState('');

  const handleInputModalSuperSelectChange = (selected: any, _multiple: any) => {
    let _listCheckedModalSuperSelectID: any = _multiple
      ? [...listCheckedModalSuperSelectID]
      : [];
    if (
      _listCheckedModalSuperSelectID
        .map((v: any) => v['value'] + '')
        .includes(selected.value + '')
    ) {
      _listCheckedModalSuperSelectID = _listCheckedModalSuperSelectID.filter(
        (v: any) => v['value'] + '' !== selected.value + ''
      );
    } else {
      _listCheckedModalSuperSelectID.push(selected);
    }
    setListCheckedModalSuperSelectID(
      _multiple
        ? _listCheckedModalSuperSelectID
        : _listCheckedModalSuperSelectID[0]
    );
  };

  const handleInputAllModalSuperSelectThisItens = (
    evt: any,
    listChecked: any,
    label: any
  ) => {
    if (evt.target.checked) {
      setListCheckedModalSuperSelectID(
        listChecked.map((v: any) => ({
          ...v,
          value: v.id,
          label: v[label],
        }))
      );
    } else {
      setListCheckedModalSuperSelectID([]);
    }
  };

  return (
    <div className="col-md-12">
      <div className="row super-select-button-row">
        <Button
          color="secondary"
          className="super-select-button"
          onClick={async () => {
            const axiosListEntity = await getListAxios(
              listEntity,
              filtersBase,
              0,
              150,
              order ? order : 'id,asc',
              template.join(',')
            );
            if (baseState[stateField]) {
              setListCheckedModalSuperSelectID(baseState[stateField]);
              setListCheckedModalSuperSelectFilters({});
              setListCheckedModalSuperEntities(
                axiosListEntity ? axiosListEntity : []
              );
              setModalSuperSelect(entity);
            } else {
              setListCheckedModalSuperSelectFilters({});
              setListCheckedModalSuperEntities(
                axiosListEntity ? axiosListEntity : []
              );
              setModalSuperSelect(entity);
            }
          }}
        >
          <i className="fa fa-filter" />
          &nbsp;
        </Button>
        {modalSuperSelect === entity ? (
          <Modal
            size={template.length > 3 ? 'xl' : 'lg'}
            isOpen={true}
            toggle={() => {
              setListCheckedModalSuperSelectID([]);
              setListCheckedModalSuperSelectFilters({});
              setModalSuperSelect('');
            }}
            className={'super-select-' + entity}
          >
            <ModalHeader
              toggle={() => {
                setListCheckedModalSuperSelectID([]);
                setListCheckedModalSuperSelectFilters({});
                setModalSuperSelect('');
              }}
            >
              <Translate
                t={context.t}
                contentKey={'global.' + entity + '-modal-super-select-title'}
              />
            </ModalHeader>
            <ModalBody>
              <div style={{ height: '350px', overflow: 'auto' }}>
                <Table
                  id={'filter-table-list-' + entity}
                  responsive
                  className={
                    'table-hover table-striped mt-4 table-responsive-css'
                  }
                >
                  <thead>
                    <tr>
                      <th
                        className={'align-middle text-center'}
                        style={{ width: '4%' }}
                      >
                        <input
                          type={multiple ? 'checkbox' : 'hidden'}
                          onChange={(evt) =>
                            handleInputAllModalSuperSelectThisItens(
                              evt,
                              listCheckedModalSuperEntities,
                              showFields
                            )
                          }
                        />
                      </th>
                      {Object.keys(template).map((v, i) => (
                        <th key={'list-' + entity + '-' + i}>
                          {}
                          <input
                            className={'form-control'}
                            name={'list-' + entity + '-' + i}
                            type="text"
                            style={
                              v === 'id'
                                ? {
                                    width: '60px',
                                  }
                                : {}
                            }
                            onChange={async (evt) => {
                              const _listCheckedModalSuperSelectFilters =
                                listCheckedModalSuperSelectFilters;
                              _listCheckedModalSuperSelectFilters[i] =
                                evt.target.value;

                              const _filters = {
                                ...filtersBase,
                              };
                              Object.keys(
                                _listCheckedModalSuperSelectFilters
                              ).map((v2, k) => {
                                if (_listCheckedModalSuperSelectFilters[v2])
                                  _filters[template[v2] + '.contains'] =
                                    _listCheckedModalSuperSelectFilters[v2];
                              });

                              const axiosListEntity = await getListAxios(
                                listEntity,
                                _filters,
                                0,
                                150,
                                order ? order : 'id,asc',
                                template.join(',')
                              );
                              setListCheckedModalSuperSelectFilters(
                                _listCheckedModalSuperSelectFilters
                              );
                              setListCheckedModalSuperEntities(
                                axiosListEntity ? axiosListEntity : []
                              );
                            }}
                            value={
                              listCheckedModalSuperSelectFilters[i]
                                ? listCheckedModalSuperSelectFilters[i]
                                : ''
                            }
                            placeholder={translate(
                              () => {},
                              template[v] === 'id'
                                ? 'global..' + entity + '.field_id'
                                : 'global..' + entity + '.' + template[v]
                            )}
                          />
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {listCheckedModalSuperEntities &&
                      listCheckedModalSuperEntities.map((ent: any, i: any) => (
                        <tr key={i}>
                          <td className={'align-middle text-center'}>
                            <input
                              type={multiple ? 'checkbox' : 'radio'}
                              checked={
                                multiple
                                  ? listCheckedModalSuperSelectID
                                      .map((v: any) => v['value'] + '')
                                      .includes(ent['id'] + '')
                                  : listCheckedModalSuperSelectID['value'] +
                                      '' ===
                                    ent['id'] + ''
                              }
                              onChange={() =>
                                handleInputModalSuperSelectChange(
                                  {
                                    ...ent,
                                    value: ent['id'],
                                    label: showFields
                                      .map((field: any) =>
                                        getValueRecursive(ent, field.split('.'))
                                      )
                                      .filter((field: any) => field)
                                      .join(' | '),
                                  },
                                  multiple
                                )
                              }
                            />
                          </td>
                          {template &&
                            template.map((field: any, j: any) => {
                              if (!field.includes('.')) {
                                return (
                                  <td key={'list-' + entity + '-' + field}>
                                    {ent[field]}
                                  </td>
                                );
                              } else {
                                let valAux: any = ent;
                                field.split('.').map((subField: any) => {
                                  if (Array.isArray(valAux)) {
                                    valAux = valAux
                                      .map((arrField: any) =>
                                        arrField[subField]
                                          ? arrField[subField]
                                          : false
                                      )
                                      .filter((filt: any) => filt !== false)
                                      .join(' | ');
                                  } else {
                                    valAux = valAux[subField]
                                      ? valAux[subField]
                                      : '';
                                  }
                                });
                                return (
                                  <td key={'list-' + entity + '-' + field}>
                                    {valAux}
                                  </td>
                                );
                              }
                            })}
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="secondary"
                onClick={() => {
                  setListCheckedModalSuperSelectID([]);
                  setListCheckedModalSuperSelectFilters({});
                  setModalSuperSelect('');
                }}
              >
                <i className="fa fa-ban" />
                &nbsp;
                <Translate
                  t={context.t}
                  contentKey={'global.' + entity + '.btnCancel'}
                >
                  Cancel
                </Translate>
              </Button>
              <Button
                id={'jhi-confirm-delete-' + entity}
                color="primary"
                onClick={() => {
                  setListCheckedModalSuperSelectID([]);
                  setListCheckedModalSuperSelectFilters({});
                  setModalSuperSelect('');

                  const newState = { ...baseState };
                  newState[stateField] = listCheckedModalSuperSelectID;
                  setState(newState);
                }}
              >
                <i className="fa fa-filter" />
                &nbsp;
                <Translate
                  t={context.t}
                  contentKey={'global.' + entity + '.btnFilter'}
                >
                  Filter
                </Translate>
              </Button>
            </ModalFooter>
          </Modal>
        ) : (
          <> </>
        )}
      </div>
    </div>
  );
};

export default RenderModalSuperSelect;
