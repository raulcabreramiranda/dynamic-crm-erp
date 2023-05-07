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
import { apiGetList, apiGetEntityForm, apiUpdateEntity, apiNewEntity, apiDeleteEntity } from 'src/components/services/Patient/patient-services';

import { IPatient, IPatientFilters } from 'src/components/models/Patient/patient-model';
import FormView from 'src/components/views/Patient/patient-view';
import FormUpdate from 'src/components/views/Patient/patient-form';
import ListTable, { IEntityListSort } from 'src/components/views/Patient/patient-list';
import FilterList from 'src/components/views/Patient/patient-filter';
import EntityContext, { IReloadList } from 'src/components/contexts/Patient/patient-context-list';

const MUITable = () => {
    const [loading, setLoading] = useState(true);

    const [entityList, setEntityList] = useState<IPatient[]>([]);
    const [entityFilter, setEntityFilter] = useState<IPatientFilters>({});
    const [entityListPage, setEntityListPage] = useState<number>(0);
    const [entityListSize, setEntityListSize] = useState<number>(25);
    const [entityListCount, setEntityListCount] = useState<number>(0);
    const [entityListSort, setEntityListSort] = useState<IEntityListSort>({ id: 'asc' });

    const [showFilters, setShowFilters] = useState<boolean>(false);

    const getEntityFiltersURL = (offset = null) => {
        return (
            '' +
            (entityFilter.name ? 'name=' + entityFilter.name + '&' : '') +
            (entityFilter.zipCode ? 'zipCode=' + entityFilter.zipCode + '&' : '') +
            (entityFilter.neighborhood ? 'neighborhood=' + entityFilter.neighborhood + '&' : '') +
            (entityFilter.city ? 'city=' + entityFilter.city + '&' : '') +
            (entityFilter.uf ? 'uf=' + entityFilter.uf + '&' : '') +
            (entityFilter.cpf ? 'cpf=' + entityFilter.cpf + '&' : '') +
            (entityFilter.register ? 'register=' + entityFilter.register + '&' : '') +
            (entityFilter.status ? 'status=' + entityFilter.status + '&' : '') +
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
            }}
        >
            <CardHeader
                title={
                    <>
                        <h2>Lista de Pacientes importante </h2>
                    </>
                }
                buttons={
                    <>
                        <Button color="primary" size="sm" isLink={true} href={`/patients/new?${getEntityFiltersURL()}`} icon={'pi pi-plus'} permissionSession="PATIENT" permissionMethod="CREATE">
                            Criar novo Paciente
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
                    </Paper>
                </Card>
            </Grid>
        </EntityContext.Provider>
    );
};

export default MUITable;
