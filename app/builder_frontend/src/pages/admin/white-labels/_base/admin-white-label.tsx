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
import { apiGetList, apiGetEntityForm, apiGetEntityView, apiUpdateEntity, apiNewEntity, apiDeleteEntity } from './admin-white-label-services';

import { IAdminWhiteLabel } from './admin-white-label-model';
import FormView from './admin-white-label-view';
import FormUpdate from './admin-white-label-form';
import ListTable, { IEntityListSort } from './admin-white-label-list';
import FilterList from './admin-white-label-filter';

export interface IReloadList {
    filters?: IAdminWhiteLabel | false;
    sort?: IEntityListSort | false;
    page?: number | false;
    size?: number | false;
}

export const EntityContext = createContext(
    {} as {
        entityEdit: IAdminWhiteLabel;
        setEntityEdit: Dispatch<IAdminWhiteLabel>;
        entityView: IAdminWhiteLabel;
        setEntityView: Dispatch<IAdminWhiteLabel>;
        entityFilter: IAdminWhiteLabel;
        setEntityFilter: Dispatch<IAdminWhiteLabel>;
        entityList: IAdminWhiteLabel[];
        setEntityList: Dispatch<IAdminWhiteLabel[]>;
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
    },
);

function ModalView() {
    const { entityView, setEntityView } = useContext(EntityContext);
    if (!entityView || !entityView?.id) {
        return <></>;
    }

    const handleClose = () => {
        setEntityView({} as IAdminWhiteLabel);
    };

    return (
        <Dialog isOpen={true} onClose={handleClose}>
            <DialogTitle onClose={handleClose}>Subscribe {entityView.id} </DialogTitle>
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
    const { entityEdit, setEntityEdit, reloadList } = useContext(EntityContext);
    if (!entityEdit || !entityEdit?.id) {
        return <></>;
    }

    const handleClose = () => {
        setEntityEdit({} as IAdminWhiteLabel);
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

    return (
        <Dialog isOpen={true} onClose={handleClose}>
            <DialogTitle onClose={handleClose}>Subscribe {entityEdit.id} </DialogTitle>
            <DialogContent>
                <FormUpdate isNew={false} />
            </DialogContent>
            <DialogActions>
                <Button onClick={saveChanges} variant="contained">
                    Save Changes
                </Button>
                <Button onClick={handleClose} type="reset" variant="outlined" color="secondary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}

const MUITable = () => {
    const [loading, setLoading] = useState(true);

    const [entityList, setEntityList] = useState<IAdminWhiteLabel[]>([]);
    const [entityFilter, setEntityFilter] = useState<IAdminWhiteLabel>({});
    const [entityListPage, setEntityListPage] = useState<number>(0);
    const [entityListSize, setEntityListSize] = useState<number>(25);
    const [entityListCount, setEntityListCount] = useState<number>(0);
    const [entityListSort, setEntityListSort] = useState<IEntityListSort>({ id: 'asc' });

    const [entityEdit, setEntityEdit] = useState<IAdminWhiteLabel>({});
    const [entityView, setEntityView] = useState<IAdminWhiteLabel>({});
    const [showFilters, setShowFilters] = useState<boolean>(false);

    const openNewModal = () => {
        setEntityEdit({ id: -1 });
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
                reloadList,
                loading,
                setLoading,
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
            }}
        >
            <CardHeader
                title={
                    <>
                        <h2>List AdminWhiteLabel </h2>
                    </>
                }
                buttons={
                    <>
                        <Button icon="pi pi-plus" onClick={openNewModal}>
                            New
                        </Button>
                        <Button icon="pi pi-filter-fill" onClick={() => setShowFilters(!showFilters)}>
                            {showFilters ? 'Hide Filters' : 'Filters'}
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