import Grid from 'src/layouts/components/Grid';
import Link from 'src/layouts/components/Link';
import Card from 'src/layouts/components/Card/Card';
import Typography from 'src/layouts/components/Typography';
import CardHeader from 'src/layouts/components/Card/CardHeader';
import dayjs from 'dayjs';
import { useState, ChangeEvent, useEffect, Dispatch, createContext, useContext } from 'react';
import { Translate, translate } from 'src/layouts/components/translate-component';

import Icon from 'src/layouts/components/Icon';
import Paper from 'src/layouts/components/Paper';
import Table from 'src/layouts/components/Table/Table';
import TableHead from 'src/layouts/components/Table/TableHead';
import TableHeadRow from 'src/layouts/components/Table/TableHeadRow';
import TableHeadCell from 'src/layouts/components/Table/TableHeadCell';
import TableBody from 'src/layouts/components/Table/TableBody';
import TableBodyRow from 'src/layouts/components/Table/TableBodyRow';
import TableBodyCell from 'src/layouts/components/Table/TableBodyCell';
import TableContainer from 'src/layouts/components/Table/TableContainer';

import TableBoolean from 'src/layouts/components/inputs/TableBoolean';
import TableDate from 'src/layouts/components/inputs/TableDate';
import TableText from 'src/layouts/components/inputs/TableText';
import TableSelect from 'src/layouts/components/inputs/TableSelect';
import TableSelectMany from 'src/layouts/components/inputs/TableSelectMany';
import TableImage from 'src/layouts/components/inputs/TableImage';

import TablePagination from 'src/layouts/components/Table/TablePagination';

import Button from 'src/layouts/components/Button';

import { APP_LOCAL_DATE_FORMAT, BASE_API_VERSION_PATH } from 'src/util/constants';
import { hasAnyAuthority, trim, IApiResponseProps, showFieldsSelectAsync } from 'src/util/entity-utils';
import { apiGetList, apiGetEntityForm, apiGetEntityView, apiDeleteEntity } from 'src/pages/admin/profiles/_base/admin-profile-services';

import { IAdminProfile } from 'src/pages/admin/profiles/_base/admin-profile-model';

import { EntityContext } from './admin-profile';

export interface IEntityListSort {
    [key: string]: 'asc' | 'desc';
}
const ListTable = ({}: any) => {
    const {
        baseFilters,
        reloadList,
        loading,
        setLoading,
        entityListSort,
        setEntityView,
        setEntityListSort,
        entityList,
        setEntityList,
        setEntityEdit,
        entityListCount,
        setFormTabActive,
        setEntityListCount,
        entityListPage,
        setEntityListPage,
        entityListSize,
        setEntityListSize,
        getEntityFiltersURL,
    } = useContext(EntityContext);

    const deleteEntityModal = (entity: IAdminProfile) => {
        if (typeof entity.id === 'number' && entity?.id > 0) {
            const handleSuccess = (response1: IApiResponseProps): void => {
                reloadList({});
            };
            apiDeleteEntity(entity.id, handleSuccess);
        }
    };
    const openUpdateModal = (entity: IAdminProfile) => {
        if (typeof entity.id === 'number' && entity?.id > 0) {
            const handleSuccess = (response: IApiResponseProps) => {
                const _entityEdit = response['data'][0] || {};
                setEntityEdit(_entityEdit);
            };
            apiGetEntityForm(entity.id, handleSuccess);
            setFormTabActive(0);
        }
    };
    const openViewModal = (entity: IAdminProfile) => {
        if (typeof entity.id === 'number' && entity?.id > 0) {
            const handleSuccess = (response: IApiResponseProps) => {
                const _entityView = response['data'][0] || {};
                setEntityView(_entityView);
            };
            apiGetEntityView(entity.id, handleSuccess);
        }
    };
    const handleSuccessList = (response: IApiResponseProps) => {
        const _entityList = response['data'] || [];
        setEntityList(_entityList);
    };
    const handleChangePage = (event: unknown, newPage: number) => {
        setEntityListPage(newPage);

        apiGetList(
            {
                sort: entityListSort,
                filters: baseFilters || {},
                page: newPage,
                size: entityListSize,
            },
            handleSuccessList,
        );
    };

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setEntityListCount(+event.target.value);
        setEntityListPage(0);

        apiGetList(
            {
                sort: entityListSort,
                filters: baseFilters || {},
                page: 0,
                size: +event.target.value,
            },
            handleSuccessList,
        );
    };

    useEffect(() => {
        setLoading(true);
        apiGetList(
            {
                sort: entityListSort,
                filters: baseFilters || {},
                page: entityListPage,
                size: entityListSize,
            },
            handleSuccessList,
        );
    }, []);

    const sort = Object.keys(entityListSort)[0];
    const order = Object.values(entityListSort)[0];

    const sortFunction = (_sort: any) => () => {
        const _order = _sort === sort && order === 'asc' ? 'desc' : 'asc';
        const _entityListSort: IEntityListSort = {};
        _entityListSort[_sort] = _order;
        setEntityListSort(_entityListSort);
        apiGetList(
            {
                sort: _entityListSort,
                filters: baseFilters || {},
                page: entityListPage,
                size: entityListSize,
            },
            handleSuccessList,
        );
    };

    return (
        <>
            {entityList && entityList.filter && entityList.filter((v: any) => typeof v.deletedAt === 'undefined' || v.deletedAt === null).length > 0 ? (
                <div id="admin-profile-table-list" className="table-list">
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableHeadRow>
                                    <TableHeadCell align={'left'} onClick={sortFunction('name')}>
                                        <Translate label={{ pt: 'name' }} contentKey="adminProfile.name" />
                                        <i className={sort === 'name' ? (order === 'asc' ? 'fa fa-sort-up' : 'fa fa-sort-down') : 'fa fa-sort'} />
                                    </TableHeadCell>

                                    <TableHeadCell align={'left'} id="adminPermissionProfiles-cell-header">
                                        <Translate label={{ pt: 'Permisos' }} contentKey="adminProfile.adminPermissionProfiles" />
                                    </TableHeadCell>

                                    <TableHeadCell align={'left'} />
                                </TableHeadRow>
                            </TableHead>
                            <TableBody>
                                {entityList
                                    .filter((v: any) => typeof v.deletedAt === 'undefined' || v.deletedAt === null)
                                    .map((adminProfile: any, i: number) => (
                                        <TableBodyRow tableRowIndex={i} key={`entity-${i}`}>
                                            <TableBodyCell id="name-cell" align={'left'}>
                                                <TableText name={'name'} entityView={adminProfile} />
                                            </TableBodyCell>

                                            <TableBodyCell id="adminPermissionProfiles-cell" align={'left'} role="one-to-many">
                                                <TableSelectMany
                                                    id="admin-profile-adminPermissionProfiles-form"
                                                    options={[]}
                                                    entityView={adminProfile}
                                                    relationshipType={'one-to-many'}
                                                    optionsLink={'admin-permission-profiles'}
                                                    optionsSort={{ id: 'asc' }}
                                                    optionsShowFields={['id', 'adminPermission.id', 'adminPermission.name']}
                                                    name="adminPermissionProfiles"
                                                    label={
                                                        <>
                                                            <Translate contentKey="adminProfile.Permisos" />
                                                        </>
                                                    }
                                                />
                                            </TableBodyCell>

                                            <TableBodyCell align={'right'}>
                                                <div className="btn-group flex-btn-group-container">
                                                    <Button color="success" size="small" onClick={() => openViewModal(adminProfile)} isLink={false} icon={'eye'}></Button>

                                                    <Button color="primary" size="small" onClick={() => openUpdateModal(adminProfile)} isLink={false} icon={'pencil'}></Button>

                                                    <Button color="danger" size="small" onClick={() => deleteEntityModal(adminProfile)} isLink={false} icon={'trash'}></Button>
                                                </div>
                                            </TableBodyCell>
                                        </TableBodyRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={entityListCount}
                        rowsPerPage={entityListSize}
                        page={entityListPage}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />

                    {/* { totalItems > itemsPerPage ? (<div className={ entityList && entityList.length > 0 ? '' : 'd-none' }>
      <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        previousClassName={'page-item'}
        nextClassName={'page-item'}
        breakClassName={'page-item'}
        pageClassName={'page-item'}
        nextLinkClassName={'btn btn-primary'}
        previousLinkClassName={'btn btn-primary'}
        breakLinkClassName={'btn btn-primary'}
        pageLinkClassName={'btn btn-default'}
        activeLinkClassName={'btn btn-primary'}
        pageCount={(totalItems / itemsPerPage)}
        breakLabel={'...'}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={(v: any) => { if(v.selected >= 0) handlePagination(v.selected) } }
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
  </div>) : '' }   */}
                </div>
            ) : !loading ? (
                <div className="alert alert-warning">
                    <Translate contentKey="adminProfile.home.notFound">No Profiles found</Translate>
                </div>
            ) : (
                <div />
            )}
        </>
    );
};

export default ListTable;
