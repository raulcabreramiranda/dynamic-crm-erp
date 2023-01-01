import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import dayjs from 'dayjs';
import { useState, ChangeEvent, useEffect, Dispatch, createContext, useContext } from 'react';
import { Translate, translate } from 'src/layouts/components/translate-component';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

import TableBoolean from 'src/layouts/components/inputs/TableBoolean';
import TableDate from 'src/layouts/components/inputs/TableDate';
import TableText from 'src/layouts/components/inputs/TableText';
import TableSelect from 'src/layouts/components/inputs/TableSelect';
import TableSelectMany from 'src/layouts/components/inputs/TableSelectMany';
import TableImage from 'src/layouts/components/inputs/TableImage';

import TablePagination from '@mui/material/TablePagination';

import IconButton from '@mui/material/IconButton';

import EyeIcon from 'mdi-material-ui/Eye';
import PencilIcon from 'mdi-material-ui/Pencil';
import DeleteIcon from 'mdi-material-ui/Delete';

import { APP_LOCAL_DATE_FORMAT, BASE_API_VERSION_PATH } from 'src/util/constants';
import { hasAnyAuthority, trim, IApiResponseProps, showFieldsSelectAsync } from 'src/util/entity-utils';
import { apiGetList, apiGetEntityForm, apiGetEntityView, apiDeleteEntity } from './admin-user-services';

import { IAdminUser } from './admin-user-model';

import { EntityContext } from './admin-user';

export interface IEntityListSort {
    [key: string]: 'asc' | 'desc';
}
const ListTable = ({}: any) => {
    const {
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
        setEntityListCount,
        entityListPage,
        setEntityListPage,
        entityListSize,
        setEntityListSize,
    } = useContext(EntityContext);

    const deleteEntityModal = (entity: IAdminUser) => {
        if (typeof entity.id === 'number' && entity?.id > 0) {
            const handleSuccess = (response1: IApiResponseProps): void => {
                reloadList({});
            };
            apiDeleteEntity(entity.id, handleSuccess);
        }
    };
    const openUpdateModal = (entity: IAdminUser) => {
        if (typeof entity.id === 'number' && entity?.id > 0) {
            const handleSuccess = (response: IApiResponseProps) => {
                const _entityEdit = response['data'][0] || {};
                setEntityEdit(_entityEdit);
            };
            apiGetEntityForm(entity.id, handleSuccess);
        }
    };
    const openViewModal = (entity: IAdminUser) => {
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
                filters: {},
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
                filters: {},
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
                filters: {},
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
                filters: {},
                page: entityListPage,
                size: entityListSize,
            },
            handleSuccessList,
        );
    };

    return (
        <>
            {entityList && entityList.filter && entityList.filter((v: any) => typeof v.deletedAt === 'undefined' || v.deletedAt === null).length > 0 ? (
                <div id="admin-user-table-list" className="table-list">
                    <TableContainer sx={{ maxHeight: '69vh' }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align={'left'} onClick={sortFunction('fullname')}>
                                        <Translate contentKey="adminUser.fullname" />
                                        <i className={sort === 'fullname' ? (order === 'asc' ? 'fa fa-sort-up' : 'fa fa-sort-down') : 'fa fa-sort'} />
                                    </TableCell>
                                    <TableCell align={'left'} onClick={sortFunction('cellphone')}>
                                        <Translate contentKey="adminUser.cellphone" />
                                        <i className={sort === 'cellphone' ? (order === 'asc' ? 'fa fa-sort-up' : 'fa fa-sort-down') : 'fa fa-sort'} />
                                    </TableCell>
                                    <TableCell align={'left'} id="adminProfile-cell-header">
                                        <Translate contentKey="adminUser.adminProfile" />
                                    </TableCell>
                                    <TableCell align={'left'} id="adminPermissionUsers-cell-header">
                                        <Translate contentKey="adminUser.adminPermissionUsers" />
                                    </TableCell>
                                    <TableCell align={'left'} id="adminWhiteLabel-cell-header">
                                        <Translate contentKey="adminUser.adminWhiteLabel" />
                                    </TableCell>

                                    <TableCell align={'left'} />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow></TableRow>
                                {entityList
                                    .filter((v: any) => typeof v.deletedAt === 'undefined' || v.deletedAt === null)
                                    .map((adminUser: any, i: number) => (
                                        <TableRow key={`entity-${i}`}>
                                            <TableCell id="fullname-cell" align={'left'}>
                                                <TableText name={'fullname'} entityView={adminUser} />
                                            </TableCell>

                                            <TableCell id="cellphone-cell" align={'left'}>
                                                <TableText name={'cellphone'} entityView={adminUser} />
                                            </TableCell>

                                            <TableCell id="adminProfile-cell" align={'left'} role="many-to-one">
                                                <TableSelectMany
                                                    id="admin-user-adminProfile-form"
                                                    options={[]}
                                                    entityView={adminUser}
                                                    relationshipType={'many-to-one'}
                                                    optionsLink={'admin-profiles'}
                                                    optionsSort={{ id: 'asc' }}
                                                    optionsShowFields={['id', 'name']}
                                                    name="adminProfile"
                                                    label={
                                                        <>
                                                            <Translate contentKey="adminUser.Profile" />
                                                        </>
                                                    }
                                                />
                                            </TableCell>

                                            <TableCell id="adminPermissionUsers-cell" align={'left'} role="one-to-many">
                                                <TableSelectMany
                                                    id="admin-user-adminPermissionUsers-form"
                                                    options={[]}
                                                    entityView={adminUser}
                                                    relationshipType={'one-to-many'}
                                                    optionsLink={'admin-permission-users'}
                                                    optionsSort={{ id: 'asc' }}
                                                    optionsShowFields={['id', 'adminPermission.id', 'adminPermission.name']}
                                                    name="adminPermissionUsers"
                                                    label={
                                                        <>
                                                            <Translate contentKey="adminUser.PermissionUsers" />
                                                        </>
                                                    }
                                                />
                                            </TableCell>

                                            <TableCell id="adminWhiteLabel-cell" align={'left'} role="many-to-one">
                                                <TableSelectMany
                                                    id="admin-user-adminWhiteLabel-form"
                                                    options={[]}
                                                    entityView={adminUser}
                                                    relationshipType={'many-to-one'}
                                                    optionsLink={'admin-white-labels'}
                                                    optionsSort={{ id: 'asc' }}
                                                    optionsShowFields={['id']}
                                                    name="adminWhiteLabel"
                                                    label={
                                                        <>
                                                            <Translate contentKey="adminUser.WhiteLabel" />
                                                        </>
                                                    }
                                                />
                                            </TableCell>

                                            <TableCell align={'right'}>
                                                <div className="btn-group flex-btn-group-container">
                                                    {hasAnyAuthority(null, ['adminUser'], 'view') ? (
                                                        <IconButton color="primary" size="small" onClick={() => openViewModal(adminUser)}>
                                                            <EyeIcon fontSize="small" />
                                                        </IconButton>
                                                    ) : (
                                                        <></>
                                                    )}
                                                    {hasAnyAuthority(null, ['adminUser'], 'edit') ? (
                                                        <IconButton color="primary" size="small" onClick={() => openUpdateModal(adminUser)}>
                                                            <PencilIcon fontSize="small" />
                                                        </IconButton>
                                                    ) : (
                                                        <></>
                                                    )}
                                                    {hasAnyAuthority(null, ['adminUser'], 'canDelete') ? (
                                                        <IconButton color="primary" size="small" onClick={() => deleteEntityModal(adminUser)}>
                                                            <DeleteIcon fontSize="small" />
                                                        </IconButton>
                                                    ) : (
                                                        <></>
                                                    )}{' '}
                                                </div>
                                            </TableCell>
                                        </TableRow>
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
                    <Translate contentKey="adminUser.home.notFound">No Users found</Translate>
                </div>
            ) : (
                <div />
            )}
        </>
    );
};

export default ListTable;
