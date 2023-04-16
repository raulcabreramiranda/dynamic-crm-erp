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
import { apiGetList, apiGetEntityForm, apiGetEntityView, apiDeleteEntity } from 'src/pages/professionals/_base/professional-services';

import { IProfessional } from 'src/pages/professionals/_base/professional-model';

import { EntityContext } from './professional';

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

    const deleteEntityModal = (entity: IProfessional) => {
        if (typeof entity.id === 'number' && entity?.id > 0) {
            const handleSuccess = (response1: IApiResponseProps): void => {
                reloadList({});
            };
            apiDeleteEntity(entity.id, handleSuccess);
        }
    };
    const openUpdateModal = (entity: IProfessional) => {
        if (typeof entity.id === 'number' && entity?.id > 0) {
            const handleSuccess = (response: IApiResponseProps) => {
                const _entityEdit = response['data'][0] || {};
                setEntityEdit(_entityEdit);
            };
            apiGetEntityForm(entity.id, handleSuccess);
            setFormTabActive(0);
        }
    };
    const openViewModal = (entity: IProfessional) => {
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
                <div id="professional-table-list" className="table-list">
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableHeadRow>
                                    <TableHeadCell align={'left'} onClick={sortFunction('name')}>
                                        <Translate label={{ pt: 'Nome' }} contentKey="professional.name" />
                                        <i className={sort === 'name' ? (order === 'asc' ? 'fa fa-sort-up' : 'fa fa-sort-down') : 'fa fa-sort'} />
                                    </TableHeadCell>

                                    <TableHeadCell align={'left'} onClick={sortFunction('birthDate')}>
                                        <Translate label={{ pt: 'Data de nascimento' }} contentKey="professional.birthDate" />
                                        <i className={sort === 'birthDate' ? (order === 'asc' ? 'fa fa-sort-up' : 'fa fa-sort-down') : 'fa fa-sort'} />
                                    </TableHeadCell>

                                    <TableHeadCell align={'left'} onClick={sortFunction('cpf')}>
                                        <Translate label={{ pt: 'Cpf' }} contentKey="professional.cpf" />
                                        <i className={sort === 'cpf' ? (order === 'asc' ? 'fa fa-sort-up' : 'fa fa-sort-down') : 'fa fa-sort'} />
                                    </TableHeadCell>

                                    <TableHeadCell align={'left'} onClick={sortFunction('rg')}>
                                        <Translate label={{ pt: 'Rg' }} contentKey="professional.rg" />
                                        <i className={sort === 'rg' ? (order === 'asc' ? 'fa fa-sort-up' : 'fa fa-sort-down') : 'fa fa-sort'} />
                                    </TableHeadCell>

                                    <TableHeadCell align={'left'} onClick={sortFunction('telephone')}>
                                        <Translate label={{ pt: 'Celular' }} contentKey="professional.telephone" />
                                        <i className={sort === 'telephone' ? (order === 'asc' ? 'fa fa-sort-up' : 'fa fa-sort-down') : 'fa fa-sort'} />
                                    </TableHeadCell>

                                    <TableHeadCell align={'left'} onClick={sortFunction('email')}>
                                        <Translate label={{ pt: 'E-mail' }} contentKey="professional.email" />
                                        <i className={sort === 'email' ? (order === 'asc' ? 'fa fa-sort-up' : 'fa fa-sort-down') : 'fa fa-sort'} />
                                    </TableHeadCell>

                                    <TableHeadCell align={'left'} onClick={sortFunction('contract')}>
                                        <Translate label={{ pt: 'Contrato' }} contentKey="professional.contract" />
                                        <i className={sort === 'contract' ? (order === 'asc' ? 'fa fa-sort-up' : 'fa fa-sort-down') : 'fa fa-sort'} />
                                    </TableHeadCell>

                                    <TableHeadCell align={'left'} onClick={sortFunction('startDate')}>
                                        <Translate label={{ pt: 'Data de início' }} contentKey="professional.startDate" />
                                        <i className={sort === 'startDate' ? (order === 'asc' ? 'fa fa-sort-up' : 'fa fa-sort-down') : 'fa fa-sort'} />
                                    </TableHeadCell>

                                    <TableHeadCell align={'left'} onClick={sortFunction('endDate')}>
                                        <Translate label={{ pt: 'Data de término' }} contentKey="professional.endDate" />
                                        <i className={sort === 'endDate' ? (order === 'asc' ? 'fa fa-sort-up' : 'fa fa-sort-down') : 'fa fa-sort'} />
                                    </TableHeadCell>

                                    <TableHeadCell align={'left'} />
                                </TableHeadRow>
                            </TableHead>
                            <TableBody>
                                {entityList
                                    .filter((v: any) => typeof v.deletedAt === 'undefined' || v.deletedAt === null)
                                    .map((professional: any, i: number) => (
                                        <TableBodyRow tableRowIndex={i} key={`entity-${i}`}>
                                            <TableBodyCell id="name-cell" align={'left'}>
                                                <TableText name={'name'} entityView={professional} />
                                            </TableBodyCell>

                                            <TableBodyCell id="birthDate-cell" align={'left'}>
                                                <TableDate name={'birthDate'} entityView={professional} format={APP_DATE_FORMAT} />
                                            </TableBodyCell>

                                            <TableBodyCell id="cpf-cell" align={'left'}>
                                                <TableText name={'cpf'} entityView={professional} />
                                            </TableBodyCell>

                                            <TableBodyCell id="rg-cell" align={'left'}>
                                                <TableText name={'rg'} entityView={professional} />
                                            </TableBodyCell>

                                            <TableBodyCell id="telephone-cell" align={'left'}>
                                                <TableText name={'telephone'} entityView={professional} />
                                            </TableBodyCell>

                                            <TableBodyCell id="email-cell" align={'left'}>
                                                <TableText name={'email'} entityView={professional} />
                                            </TableBodyCell>

                                            <TableBodyCell id="contract-cell" align={'left'}>
                                                <TableText name={'contract'} entityView={professional} />
                                            </TableBodyCell>

                                            <TableBodyCell id="startDate-cell" align={'left'}>
                                                <TableDate name={'startDate'} entityView={professional} format={APP_DATE_FORMAT} />
                                            </TableBodyCell>

                                            <TableBodyCell id="endDate-cell" align={'left'}>
                                                <TableDate name={'endDate'} entityView={professional} format={APP_DATE_FORMAT} />
                                            </TableBodyCell>

                                            <TableBodyCell align={'right'}>
                                                <div className="btn-group flex-btn-group-container">
                                                    <Button color="success" size="small" onClick={() => openViewModal(professional)} isLink={false} icon={'eye'}></Button>

                                                    <Button color="primary" size="small" onClick={() => openUpdateModal(professional)} isLink={false} icon={'pencil'}></Button>

                                                    <Button color="danger" size="small" onClick={() => deleteEntityModal(professional)} isLink={false} icon={'trash'}></Button>
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
                    <Translate contentKey="professional.home.notFound">No Professionals found</Translate>
                </div>
            ) : (
                <div />
            )}
        </>
    );
};

export default ListTable;
