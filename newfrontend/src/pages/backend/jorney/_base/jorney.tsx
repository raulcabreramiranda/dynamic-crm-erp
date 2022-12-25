// ** MUI Imports
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';

// ** React Imports
import { useState, ChangeEvent, useEffect, Dispatch, createContext, useContext } from 'react';
import { Translate, translate } from 'src/layouts/components/translate-component';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// ** MUI Imports
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import CardContent from '@mui/material/CardContent';
import Button, { ButtonProps } from '@mui/material/Button';

import IconButton from '@mui/material/IconButton';

import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import EyeIcon from 'mdi-material-ui/Eye';
import PencilIcon from 'mdi-material-ui/Pencil';
import DeleteIcon from 'mdi-material-ui/Delete';

import { BASE_API_VERSION_PATH } from 'src/util/constants';
import { apiGet, apiPost, apiPut, apiDelete, hasAnyAuthority, trim, IApiResponseProps, showFieldsSelectAsync } from 'src/util/entity-utils';
import { apiGetList, apiGetEntity, apiUpdateEntity, apiNewEntity, apiDeleteEntity } from './jorney-services';

import { IJorney } from './jorney-model';
import FormView from './jorney-view';
import FormUpdate from './jorney-form';
import ListTable, { IEntityListSort } from './jorney-list';
import FilterList from './jorney-filter';

export const EntityContext = createContext(
    {} as {
        entityEdit: IJorney;
        setEntityEdit: Dispatch<IJorney>;
        entityView: IJorney;
        setEntityView: Dispatch<IJorney>;
        entityFilter: IJorney;
        setEntityFilter: Dispatch<IJorney>;
        entityList: IJorney[];
        setEntityList: Dispatch<IJorney[]>;
        entityListPage: number;
        setEntityListPage: Dispatch<number>;
        entityListSize: number;
        setEntityListSize: Dispatch<number>;
        entityListCount: number;
        setEntityListCount: Dispatch<number>;

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

    const openUpdateModal = (entity: IJorney) => {
        setEntityView(entity);
    };

    const handleClose = () => {
        setEntityView({} as IJorney);
    };

    const saveChanges = () => {
        if (!!entityView.id && entityView?.id > 0) {
            const handleSuccess = (response: IApiResponseProps): void => {
                handleClose();
            };
            apiUpdateEntity(entityView, handleSuccess);
        } else {
            const handleSuccess = (response: IApiResponseProps): void => {
                handleClose();
            };
            apiNewEntity(entityView, handleSuccess);
        }
    };

    return (
        <Dialog open={true} onClose={handleClose} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
            <DialogTitle id="scroll-dialog-title">Subscribe {entityView.id} </DialogTitle>
            <DialogContent dividers={true}>
                <FormView />
            </DialogContent>
            <DialogActions>
                <Button onClick={saveChanges} variant="contained" sx={{ marginRight: 3.5 }}>
                    Save Changes
                </Button>
                <Button onClick={handleClose} type="reset" variant="outlined" color="secondary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}

function ModalUpdate() {
    const { entityEdit, setEntityEdit } = useContext(EntityContext);
    if (!entityEdit || !entityEdit?.id) {
        return <></>;
    }

    const openUpdateModal = (entity: IJorney) => {
        setEntityEdit(entity);
    };

    const handleClose = () => {
        setEntityEdit({} as IJorney);
    };

    const saveChanges = () => {
        if (!!entityEdit.id && entityEdit?.id > 0) {
            const handleSuccess = (response: IApiResponseProps): void => {
                handleClose();
            };
            apiUpdateEntity(entityEdit, handleSuccess);
        } else {
            const handleSuccess = (response: IApiResponseProps): void => {
                handleClose();
            };
            apiNewEntity(entityEdit, handleSuccess);
        }
    };

    return (
        <Dialog open={true} onClose={handleClose} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
            <DialogTitle id="scroll-dialog-title">Subscribe {entityEdit.id} </DialogTitle>
            <DialogContent dividers={true}>
                <FormUpdate isNew={false} />
            </DialogContent>
            <DialogActions>
                <Button onClick={saveChanges} variant="contained" sx={{ marginRight: 3.5 }}>
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

    const [entityList, setEntityList] = useState<IJorney[]>([]);
    const [entityFilter, setEntityFilter] = useState<IJorney>({});
    const [entityListPage, setEntityListPage] = useState<number>(0);
    const [entityListSize, setEntityListSize] = useState<number>(25);
    const [entityListCount, setEntityListCount] = useState<number>(0);
    const [entityListSort, setEntityListSort] = useState<IEntityListSort>({ id: 'asc' });

    const [entityEdit, setEntityEdit] = useState<IJorney>({});
    const [entityView, setEntityView] = useState<IJorney>({});
    const [showFilters, setShowFilters] = useState<boolean>(false);

    const openNewModal = () => {
        setEntityEdit({ id: -1 });
    };

    return (
        <EntityContext.Provider
            value={{
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Grid container spacing={3}>
                    <Grid container>
                        <Grid xs={10}>
                            <h2>List Jorney </h2>
                        </Grid>
                        <Grid xs={2}>
                            <Button className="float-right" onClick={() => setShowFilters(!showFilters)} variant="contained" sx={{ marginRight: 3.5 }}>
                                {showFilters ? 'Hide Filters' : 'Filters'}
                            </Button>
                        </Grid>
                    </Grid>

                    {showFilters && (
                        <Grid item xs={12}>
                            <Card>
                                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                    <FilterList />
                                </Paper>
                            </Card>
                        </Grid>
                    )}

                    <Grid item xs={12}>
                        <Card>
                            <CardHeader
                                title={
                                    <Grid container>
                                        <Grid xs={10}></Grid>
                                        <Grid xs={2}>
                                            <Button fullWidth onClick={openNewModal} variant="contained" sx={{ marginRight: 3.5 }}>
                                                New
                                            </Button>
                                        </Grid>
                                    </Grid>
                                }
                            />
                            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                <ListTable />
                                <ModalUpdate />
                                <ModalView />
                            </Paper>
                        </Card>
                    </Grid>
                </Grid>
            </LocalizationProvider>
        </EntityContext.Provider>
    );
};

export default MUITable;