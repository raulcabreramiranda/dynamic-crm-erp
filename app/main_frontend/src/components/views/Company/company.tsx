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
import { apiGetList, apiGetEntityForm, apiGetEntityView, apiUpdateEntity, apiNewEntity, apiDeleteEntity } from 'src/components/services/Company/company-services';

import { ICompany, ICompanyFilters } from 'src/components/models/Company/company-model';
import FormView from 'src/components/views/Company/company-view';
import FormUpdate from 'src/components/views/Company/company-form';
import ListTable, { IEntityListSort } from 'src/components/views/Company/company-list';
import FilterList from 'src/components/views/Company/company-filter';

import EntityContext, { IReloadList } from 'src/components/contexts/Company/company-context';

export interface Props {
    baseFilters?: ICompanyFilters | any;
    baseEntity?: ICompanyFilters | any;
    startList?: ICompany[];
}

function ModalView() {
    const { entityView, setEntityView } = useContext(EntityContext);
    if (!entityView || !entityView?.id) {
        return <></>;
    }

    const handleClose = () => {
        setEntityView({} as ICompany);
    };

    return (
        <Dialog isOpen={true} onClose={handleClose}>
            <DialogTitle onClose={handleClose}>Detalhe do Company</DialogTitle>
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
        setEntityEdit({} as ICompany);
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
    const formListTabs = [
        { name: 'VIEW_TAB_BASE', label: 'Base' },
        { name: 'VIEW_TAB_DATA', label: 'Data' },
        { name: 'VIEW_TAB_TECHNICAL_MANAGER', label: 'Responsável técnico' },
    ];
    const isNew = !entityEdit?.id || entityEdit?.id < 0;
    return (
        <Dialog isOpen={true} onClose={handleClose}>
            <DialogTitle onClose={handleClose}>{!!entityEdit.id && entityEdit?.id > 0 ? 'Atualizar Company' : 'Criar Company'}</DialogTitle>
            <DialogContent>
                <FormUpdate isNew={isNew} />
            </DialogContent>
            <DialogActions>
                {isNew && formTabActive > 0 && (
                    <Button onClick={() => setFormTabActive(formTabActive - 1)}>
                        {' '}
                        {'<'} {formListTabs[formTabActive - 1].label}{' '}
                    </Button>
                )}
                {isNew && formTabActive < formListTabs.length - 1 && (
                    <Button onClick={() => setFormTabActive(formTabActive + 1)}>
                        {formListTabs[formTabActive + 1].label} {'>'}{' '}
                    </Button>
                )}
                {(!isNew || formTabActive === formListTabs.length - 1) && <Button onClick={saveChanges}>Save Changes</Button>}

                <Button onClick={handleClose} color="secondary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}

const MUITable = ({ baseFilters, baseEntity, startList }: Props) => {
    const [loading, setLoading] = useState(true);

    const [entityList, setEntityList] = useState<ICompany[]>(startList || []);
    const [entityFilter, setEntityFilter] = useState<ICompanyFilters>(baseFilters || {});
    const [entityListPage, setEntityListPage] = useState<number>(0);
    const [entityListSize, setEntityListSize] = useState<number>(25);
    const [entityListCount, setEntityListCount] = useState<number>(0);
    const [entityListSort, setEntityListSort] = useState<IEntityListSort>({ id: 'asc' });

    const [entityEdit, setEntityEdit] = useState<ICompany>({});
    const [entityView, setEntityView] = useState<ICompany>({});
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
            (entityFilter.commercialName ? 'commercialName=' + entityFilter.commercialName + '&' : '') +
            (entityFilter.corporateName ? 'corporateName=' + entityFilter.corporateName + '&' : '') +
            (entityFilter.cnpj ? 'cnpj=' + entityFilter.cnpj + '&' : '') +
            (entityFilter.telephone ? 'telephone=' + entityFilter.telephone + '&' : '') +
            (entityFilter.email ? 'email=' + entityFilter.email + '&' : '') +
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
                        <h2>Lista de Companies</h2>
                    </>
                }
                buttons={
                    <>
                        <Button icon="pi pi-plus" onClick={openNewModal}>
                            Novo Company
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
