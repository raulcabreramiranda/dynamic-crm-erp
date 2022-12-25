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

import TablePagination from '@mui/material/TablePagination';

import IconButton from '@mui/material/IconButton';

import EyeIcon from 'mdi-material-ui/Eye';
import PencilIcon from 'mdi-material-ui/Pencil';
import DeleteIcon from 'mdi-material-ui/Delete';

import { APP_LOCAL_DATE_FORMAT, BASE_API_VERSION_PATH } from 'src/util/constants';
import { hasAnyAuthority, trim, IApiResponseProps, showFieldsSelectAsync } from 'src/util/entity-utils';
import { apiGetList, apiGetEntity, apiDeleteEntity } from './jorney-services';

import { IJorney } from './jorney-model';

import { EntityContext } from './jorney';

export interface IEntityListSort {
    [key: string]: 'asc' | 'desc';
}
const ListTable = ({}: any) => {
    const {
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

    const deleteEntityModal = (entity: IJorney) => {
        if (typeof entity.id === 'number' && entity?.id > 0) {
            const handleSuccess = (response1: IApiResponseProps): void => {};
            apiDeleteEntity(entity.id, handleSuccess);
        }
    };
    const openUpdateModal = (entity: IJorney) => {
        if (typeof entity.id === 'number' && entity?.id > 0) {
            const handleSuccess = (response: IApiResponseProps) => {
                const _entityEdit = response['data'][0] || {};
                setEntityEdit(_entityEdit);
            };
            apiGetEntity(entity.id, handleSuccess);
        }
    };
    const openViewModal = (entity: IJorney) => {
        if (typeof entity.id === 'number' && entity?.id > 0) {
            const handleSuccess = (response: IApiResponseProps) => {
                const _entityView = response['data'][0] || {};
                setEntityView(_entityView);
            };
            apiGetEntity(entity.id, handleSuccess);
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
                <div id="jorney-table-list" className="table-list">
                    <TableContainer sx={{ maxHeight: '69vh' }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align={'left'} onClick={sortFunction('imageBanner')}>
                                        <Translate contentKey="jorney.imageBanner" />
                                        <i className={sort === 'imageBanner' ? (order === 'asc' ? 'fa fa-sort-up' : 'fa fa-sort-down') : 'fa fa-sort'} />
                                    </TableCell>
                                    <TableCell align={'left'} onClick={sortFunction('year')}>
                                        <Translate contentKey="jorney.year" />
                                        <i className={sort === 'year' ? (order === 'asc' ? 'fa fa-sort-up' : 'fa fa-sort-down') : 'fa fa-sort'} />
                                    </TableCell>
                                    <TableCell align={'left'} onClick={sortFunction('name')}>
                                        <Translate contentKey="jorney.name" />
                                        <i className={sort === 'name' ? (order === 'asc' ? 'fa fa-sort-up' : 'fa fa-sort-down') : 'fa fa-sort'} />
                                    </TableCell>
                                    <TableCell align={'left'} onClick={sortFunction('jorneyType')}>
                                        <Translate contentKey="jorney.jorneyType" />
                                        <i className={sort === 'jorneyType' ? (order === 'asc' ? 'fa fa-sort-up' : 'fa fa-sort-down') : 'fa fa-sort'} />
                                    </TableCell>
                                    <TableCell align={'left'} onClick={sortFunction('clientId')}>
                                        <Translate contentKey="jorney.clientId" />
                                        <i className={sort === 'clientId' ? (order === 'asc' ? 'fa fa-sort-up' : 'fa fa-sort-down') : 'fa fa-sort'} />
                                    </TableCell>
                                    <TableCell align={'left'} id="jorneyDegrees-cell-header">
                                        <Translate contentKey="jorney.jorneyDegrees" />
                                    </TableCell>
                                    <TableCell align={'left'} id="themes-cell-header">
                                        <Translate contentKey="jorney.themes" />
                                    </TableCell>

                                    <TableCell align={'left'} />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow></TableRow>
                                {entityList
                                    .filter((v: any) => typeof v.deletedAt === 'undefined' || v.deletedAt === null)
                                    .map((jorney: any, i: number) => (
                                        <TableRow key={`entity-${i}`}>
                                            <TableCell id="imageBanner-cell" align={'left'}>
                                                {jorney.imageBanner ? (
                                                    <div>
                                                        <a rel="noopener noreferrer" target={'_blank'} href={trim(BASE_API_VERSION_PATH, '/') + '/' + trim(jorney.imageBanner, '/')}>
                                                            {jorney.imageBannerContentType && jorney.imageBannerContentType.includes('image/') ? (
                                                                <img src={trim(BASE_API_VERSION_PATH, '/') + '/' + trim(jorney.imageBanner, '/')} style={{ maxHeight: '30px' }} />
                                                            ) : (
                                                                <Translate contentKey="jorney.btnOpen">Open</Translate>
                                                            )}
                                                        </a>
                                                    </div>
                                                ) : null}
                                            </TableCell>

                                            <TableCell id="year-cell" align={'left'}>
                                                {jorney.year ? dayjs(jorney.year).format(APP_LOCAL_DATE_FORMAT) : ''}
                                            </TableCell>

                                            <TableCell id="name-cell" align={'left'}>
                                                {jorney.name}
                                            </TableCell>

                                            <TableCell id="jorneyType-cell" align={'left'}>
                                                {jorney.jorneyType ? <Translate contentKey={`jorney.JorneyType.${jorney.jorneyType}`} /> : <> </>}
                                            </TableCell>

                                            <TableCell id="clientId-cell" align={'left'}>
                                                {jorney.clientId}
                                            </TableCell>

                                            <TableCell id="jorneyDegrees-cell" align={'left'} role="one-to-many">
                                                {showFieldsSelectAsync(jorney, 'jorneyDegrees.year', null).map((v: any, ikey: any) => (
                                                    <span key={ikey}> {v} </span>
                                                ))}
                                            </TableCell>

                                            <TableCell id="themes-cell" align={'left'} role="one-to-many">
                                                {showFieldsSelectAsync(jorney, 'themes.id', null).map((v: any, ikey: any) => (
                                                    <span key={ikey}> {v} </span>
                                                ))}
                                            </TableCell>

                                            <TableCell align={'right'}>
                                                <div className="btn-group flex-btn-group-container">
                                                    {hasAnyAuthority(null, ['jorney'], 'view') ? (
                                                        <IconButton color="primary" size="small" onClick={() => openViewModal(jorney)}>
                                                            <EyeIcon fontSize="small" />
                                                        </IconButton>
                                                    ) : (
                                                        <></>
                                                    )}
                                                    {hasAnyAuthority(null, ['jorney'], 'edit') ? (
                                                        <IconButton color="primary" size="small" onClick={() => openUpdateModal(jorney)}>
                                                            <PencilIcon fontSize="small" />
                                                        </IconButton>
                                                    ) : (
                                                        <></>
                                                    )}
                                                    {hasAnyAuthority(null, ['jorney'], 'canDelete') ? (
                                                        <IconButton color="primary" size="small" onClick={() => deleteEntityModal(jorney)}>
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
                    <Translate contentKey="jorney.home.notFound">No Jornadas found</Translate>
                </div>
            ) : (
                <div />
            )}
        </>
    );
};

export default ListTable;
