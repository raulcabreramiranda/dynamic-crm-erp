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

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT, BASE_API_VERSION_PATH } from 'src/util/constants';
import { hasAnyAuthority, trim, IApiResponseProps, showFieldsSelectAsync } from 'src/util/entity-utils';
import { apiGetList, apiGetEntityForm, apiGetEntityView, apiDeleteEntity } from 'src/components/services/Photo/photo-services';

import { IPhoto } from 'src/components/models/Photo/photo-model';

import EntityContext from 'src/components/contexts/Photo/photo-context';

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
        setEntityListSort,
        entityList,
        setEntityList,
        setEntityView,
        setEntityEdit,
        setFormTabActive,
        entityListCount,
        setEntityListCount,
        entityListPage,
        setEntityListPage,
        entityListSize,
        setEntityListSize,
        getEntityFiltersURL,
    } = useContext(EntityContext);

    const deleteEntityModal = (entity: IPhoto) => {
        if (typeof entity.id === 'number' && entity?.id > 0) {
            const handleSuccess = (response1: IApiResponseProps): void => {
                reloadList({});
            };
            apiDeleteEntity(entity.id, handleSuccess);
        }
    };

    const openUpdateModal = (entity: IPhoto) => {
        if (typeof entity.id === 'number' && entity?.id > 0) {
            const handleSuccess = (response: IApiResponseProps) => {
                const _entityEdit = response['data'][0] || {};
                setEntityEdit(_entityEdit);
            };
            apiGetEntityForm(entity.id, handleSuccess);
            setFormTabActive(0);
        }
    };
    const openViewModal = (entity: IPhoto) => {
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
                <div id="photo-table-list" className="table-list">
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableHeadRow>
                                    <TableHeadCell align={'left'} onClick={sortFunction('title')}>
                                        <Translate label={{ pt: 'title' }} contentKey="photo.title" />
                                        <i className={sort === 'title' ? (order === 'asc' ? 'fa fa-sort-up' : 'fa fa-sort-down') : 'fa fa-sort'} />
                                    </TableHeadCell>

                                    <TableHeadCell align={'left'} onClick={sortFunction('description')}>
                                        <Translate label={{ pt: 'description' }} contentKey="photo.description" />
                                        <i className={sort === 'description' ? (order === 'asc' ? 'fa fa-sort-up' : 'fa fa-sort-down') : 'fa fa-sort'} />
                                    </TableHeadCell>

                                    <TableHeadCell align={'left'} onClick={sortFunction('link')}>
                                        <Translate label={{ pt: 'link' }} contentKey="photo.link" />
                                        <i className={sort === 'link' ? (order === 'asc' ? 'fa fa-sort-up' : 'fa fa-sort-down') : 'fa fa-sort'} />
                                    </TableHeadCell>

                                    <TableHeadCell align={'left'} onClick={sortFunction('typeContent')}>
                                        <Translate label={{ pt: 'typeContent' }} contentKey="photo.typeContent" />
                                        <i className={sort === 'typeContent' ? (order === 'asc' ? 'fa fa-sort-up' : 'fa fa-sort-down') : 'fa fa-sort'} />
                                    </TableHeadCell>

                                    <TableHeadCell align={'left'} />
                                </TableHeadRow>
                            </TableHead>
                            <TableBody>
                                {entityList
                                    .filter((v: any) => typeof v.deletedAt === 'undefined' || v.deletedAt === null)
                                    .map((photo: any, i: number) => (
                                        <TableBodyRow tableRowIndex={i} key={`entity-${i}`}>
                                            <TableBodyCell id="title-cell" align={'left'}>
                                                <TableText name={'title'} entityView={photo} />
                                            </TableBodyCell>

                                            <TableBodyCell id="description-cell" align={'left'}>
                                                <div dangerouslySetInnerHTML={{ __html: photo.description ? photo.description.replace(/(<([^>]+)>)/gi, '').substring(0, 150) : null }} />
                                            </TableBodyCell>

                                            <TableBodyCell id="link-cell" align={'left'}>
                                                <TableImage name={'link'} entityView={photo} widthPreview={'70px'} heightPreview={'70px'} />
                                            </TableBodyCell>

                                            <TableBodyCell id="typeContent-cell" align={'left'}>
                                                <TableDate name={'typeContent'} entityView={photo} format={APP_LOCAL_DATE_FORMAT} />
                                            </TableBodyCell>

                                            <TableBodyCell align={'right'}>
                                                <div className="btn-group flex-btn-group-container">
                                                    <Button color="success" size="small" onClick={() => openViewModal(photo)} isLink={false} icon={'eye'}></Button>

                                                    <Button color="primary" size="small" onClick={() => openUpdateModal(photo)} isLink={false} icon={'pencil'}></Button>

                                                    <Button color="danger" size="small" onClick={() => deleteEntityModal(photo)} isLink={false} icon={'trash'}></Button>
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
                    <Translate contentKey="photo.home.notFound">No Photo found</Translate>
                </div>
            ) : (
                <div />
            )}
        </>
    );
};

export default ListTable;
