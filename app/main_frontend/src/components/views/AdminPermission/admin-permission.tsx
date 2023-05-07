// ** MUI Imports
import Grid from 'src/layouts/components/Grid';
import Link from 'src/layouts/components/Link';
import Card from 'src/layouts/components/Card/Card';
import CardContent from 'src/layouts/components/Card/CardContent';
import Typography from 'src/layouts/components/Typography';
import CardHeader from 'src/layouts/components/Card/CardHeader';

// ** React Imports
import { useState, ChangeEvent, useEffect, Dispatch, createContext, useContext } from 'react';
import { Translate, translate } from 'src/layouts/components/translate-component';

// ** MUI Imports
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
import TablePagination from 'src/layouts/components/Table/TablePagination';

import Button from 'src/layouts/components/Button';
import Dialog from 'src/layouts/components/Dialog/Dialog';
import DialogActions from 'src/layouts/components/Dialog/DialogActions';
import DialogContent from 'src/layouts/components/Dialog/DialogContent';
import DialogContentText from 'src/layouts/components/Dialog/DialogContentText';
import DialogTitle from 'src/layouts/components/Dialog/DialogTitle';

import { BASE_API_VERSION_PATH } from 'src/util/constants';
import { apiGet, apiPost, apiPut, apiDelete, hasAnyAuthority, trim, IApiResponseProps, showFieldsSelectAsync } from 'src/util/entity-utils';
import { apiGetList, apiGetEntityForm, apiGetEntityView, apiUpdateEntity, apiNewEntity, apiDeleteEntity } from 'src/components/services/AdminPermission/admin-permission-services';

import { IAdminPermission, IAdminPermissionFilters } from 'src/components/models/AdminPermission/admin-permission-model';
import FormView from 'src/components/views/AdminPermission/admin-permission-view';
import FormUpdate from 'src/components/views/AdminPermission/admin-permission-form';
import ListTable, { IEntityListSort } from 'src/components/views/AdminPermission/admin-permission-list';
import FilterList from 'src/components/views/AdminPermission/admin-permission-filter';

import EntityContext, { IReloadList } from 'src/components/contexts/AdminPermission/admin-permission-context';

export interface Props {
    baseFilters?: IAdminPermissionFilters | any;
    baseEntity?: IAdminPermissionFilters | any;
    startList?: IAdminPermission[];
}

function ModalView() {
    const { entityView, setEntityView } = useContext(EntityContext);
    if (!entityView || !entityView?.id) {
        return <></>;
    }

    const handleClose = () => {
        setEntityView({} as IAdminPermission);
    };

    return (
        <Dialog isOpen={true} onClose={handleClose}>
            <DialogTitle onClose={handleClose}>Detalhe do Permission</DialogTitle>
            <DialogContent>
                <FormView />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}

function ModalUpdate() {
    const { entityEdit, setEntityEdit, reloadList, setFormTabActive, formTabActive } = useContext(EntityContext);
    if (!entityEdit || !entityEdit?.id) {
        return <></>;
    }

    const handleClose = () => {
        setEntityEdit({} as IAdminPermission);
    };

    const saveChanges = () => {
        if (!!entityEdit.id && entityEdit?.id > 0) {
            const handleSuccess = (response: IApiResponseProps): void => {
                handleClose();
                reloadList({});
            };
            apiUpdateEntity(entityEdit, handleSuccess);
        } else {
            const handleSuccess = (response: IApiResponseProps): void => {
                handleClose();
                reloadList({});
            };
            apiNewEntity(entityEdit, handleSuccess);
        }
    };
    const isNew = !entityEdit?.id || entityEdit?.id < 0;
    return (
        <Dialog isOpen={true} onClose={handleClose}>
            <DialogTitle onClose={handleClose}>{!!entityEdit.id && entityEdit?.id > 0 ? 'Atualizar Permission' : 'Criar Permission'}</DialogTitle>
            <DialogContent>
                <FormUpdate isNew={isNew} />
            </DialogContent>
            <DialogActions>
                <Button onClick={saveChanges}>Save Changes</Button>

                <Button onClick={handleClose} color="secondary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}

const MUITable = ({ baseFilters, baseEntity, startList }: Props) => {
    const [loading, setLoading] = useState(true);

    const [entityList, setEntityList] = useState<IAdminPermission[]>(startList || []);
    const [entityFilter, setEntityFilter] = useState<IAdminPermissionFilters>(baseFilters || {});
    const [entityListPage, setEntityListPage] = useState<number>(0);
    const [entityListSize, setEntityListSize] = useState<number>(25);
    const [entityListCount, setEntityListCount] = useState<number>(0);
    const [entityListSort, setEntityListSort] = useState<IEntityListSort>({ id: 'asc' });

    const [entityEdit, setEntityEdit] = useState<IAdminPermission>({});
    const [entityView, setEntityView] = useState<IAdminPermission>({});
    const [formTabActive, setFormTabActive] = useState<number>(0);
    const [viewTabActive, setViewTabActive] = useState<number>(0);
    const [showFilters, setShowFilters] = useState<boolean>(false);

    const openNewModal = () => {
        setEntityEdit({ ...{ id: -1 }, ...baseEntity });
        setFormTabActive(0);
    };

    const getEntityFiltersURL = (offset = null) => {
        return (
            '' +
            (entityFilter.name ? 'name=' + entityFilter.name + '&' : '') +
            (entityFilter.baseFilters ? 'baseFilters=' + entityFilter.baseFilters + '&' : '') +
            (entityFilter.extraFilters ? 'extraFilters=' + encodeURI(JSON.stringify(entityFilter.extraFilters)) + '&' : '') +
            'page=' +
            entityFilter.activePage +
            '&' +
            'size=' +
            entityFilter.itemsPerPage +
            '&' +
            (offset !== null ? 'offset=' + offset + '&' : '') +
            'sort=' +
            entityFilter.sortField +
            ',' +
            entityFilter.sortOrder +
            '&' +
            ''
        );
    };

    const reloadList = ({ filters = false, sort = false, page = false, size = false }: IReloadList) => {
        const handleSuccessList = (response: IApiResponseProps) => {
            const _entityList = response['data'] || [];
            setEntityList(_entityList);
        };
        apiGetList(
            {
                filters: filters ? filters : entityFilter,
                sort: sort ? sort : entityListSort,
                page: page ? page : entityListPage,
                size: size ? size : entityListSize,
            },
            handleSuccessList,
        );
    };

    return (
        <EntityContext.Provider
            value={{
                baseFilters,
                reloadList,
                loading,
                setLoading,
                getEntityFiltersURL,
                entityList,
                setEntityList,
                entityFilter,
                setEntityFilter,
                entityListPage,
                setEntityListPage,
                entityListSort,
                setEntityListSort,
                entityListSize,
                setEntityListSize,
                entityListCount,
                setEntityListCount,
                entityEdit,
                setEntityEdit,
                entityView,
                setEntityView,
                formTabActive,
                setFormTabActive,
                viewTabActive,
                setViewTabActive,
            }}
        >
            <CardHeader
                title={
                    <>
                        <h2>Lista de Permissions</h2>
                    </>
                }
                buttons={
                    <>
                        <Button icon="pi pi-plus" onClick={openNewModal}>
                            Novo Permission
                        </Button>
                        <Button icon="pi pi-filter-fill" onClick={() => setShowFilters(!showFilters)}>
                            {showFilters ? 'Ocultar filtros' : 'Filtros'}
                        </Button>
                    </>
                }
            ></CardHeader>

            {showFilters && (
                <Card>
                    <FilterList />
                </Card>
            )}

            <Grid item xs={12}>
                <Card>
                    <Paper>
                        <ListTable />
                        <ModalUpdate />
                        <ModalView />
                    </Paper>
                </Card>
            </Grid>
        </EntityContext.Provider>
    );
};

export default MUITable;
