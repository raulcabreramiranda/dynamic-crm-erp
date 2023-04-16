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
import { apiGetList, apiGetEntityForm, apiGetEntityView, apiUpdateEntity, apiNewEntity, apiDeleteEntity } from 'src/pages/professionals/_base/professional-services';

import { IProfessional, IProfessionalFilters } from 'src/pages/professionals/_base/professional-model';
import FormView from './professional-view';
import FormUpdate from './professional-form';
import ListTable, { IEntityListSort } from './professional-list';
import FilterList from './professional-filter';

export interface IReloadList {
    filters?: IProfessional | false;
    sort?: IEntityListSort | false;
    page?: number | false;
    size?: number | false;
}

export interface Props {
    baseFilters?: IProfessionalFilters | any;
    baseEntity?: IProfessionalFilters | any;
    startList?: IProfessional[];
}

export const EntityContext = createContext(
    {} as {
        baseFilters?: IProfessionalFilters | any;
        baseEntity?: IProfessionalFilters | any;
        entityEdit: IProfessional;
        setEntityEdit: Dispatch<IProfessional>;
        formTabActive: number;
        setFormTabActive: Dispatch<number>;
        entityView: IProfessional;
        setEntityView: Dispatch<IProfessional>;
        viewTabActive: number;
        setViewTabActive: Dispatch<number>;
        entityFilter: IProfessionalFilters;
        setEntityFilter: Dispatch<IProfessionalFilters>;
        entityList: IProfessional[];
        setEntityList: Dispatch<IProfessional[]>;
        entityListPage: number;
        setEntityListPage: Dispatch<number>;
        entityListSize: number;
        setEntityListSize: Dispatch<number>;
        entityListCount: number;
        setEntityListCount: Dispatch<number>;
        reloadList: (data: IReloadList) => void;
        loading: boolean;
        setLoading: Dispatch<boolean>;
        entityListSort: IEntityListSort;
        setEntityListSort: Dispatch<IEntityListSort>;
        getEntityFiltersURL(offset?: number | null): string;
    },
);

function ModalView() {
    const { entityView, setEntityView } = useContext(EntityContext);
    if (!entityView || !entityView?.id) {
        return <></>;
    }

    const handleClose = () => {
        setEntityView({} as IProfessional);
    };

    return (
        <Dialog isOpen={true} onClose={handleClose}>
            <DialogTitle onClose={handleClose}>Detalhe do Professional</DialogTitle>
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
        setEntityEdit({} as IProfessional);
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
            <DialogTitle onClose={handleClose}>{!!entityEdit.id && entityEdit?.id > 0 ? 'Atualizar Professional' : 'Criar Professional'}</DialogTitle>
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

    const [entityList, setEntityList] = useState<IProfessional[]>(startList || []);
    const [entityFilter, setEntityFilter] = useState<IProfessionalFilters>(baseFilters || {});
    const [entityListPage, setEntityListPage] = useState<number>(0);
    const [entityListSize, setEntityListSize] = useState<number>(25);
    const [entityListCount, setEntityListCount] = useState<number>(0);
    const [entityListSort, setEntityListSort] = useState<IEntityListSort>({ id: 'asc' });

    const [entityEdit, setEntityEdit] = useState<IProfessional>({});
    const [entityView, setEntityView] = useState<IProfessional>({});
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
            (entityFilter.birthDate ? 'birthDate=' + entityFilter.birthDate + '&' : '') +
            (entityFilter.cpf ? 'cpf=' + entityFilter.cpf + '&' : '') +
            (entityFilter.rg ? 'rg=' + entityFilter.rg + '&' : '') +
            (entityFilter.telephone ? 'telephone=' + entityFilter.telephone + '&' : '') +
            (entityFilter.email ? 'email=' + entityFilter.email + '&' : '') +
            (entityFilter.contract ? 'contract=' + entityFilter.contract + '&' : '') +
            (entityFilter.startDate ? 'startDate=' + entityFilter.startDate + '&' : '') +
            (entityFilter.endDate ? 'endDate=' + entityFilter.endDate + '&' : '') +
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
            entityFilter.sort +
            ',' +
            entityFilter.order +
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
                        <h2>Lista de Professionals</h2>
                    </>
                }
                buttons={
                    <>
                        <Button icon="pi pi-plus" onClick={openNewModal}>
                            Novo Professional
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
