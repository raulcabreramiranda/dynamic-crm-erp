// ** MUI Imports
import { useRouter } from 'next/router';
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
import { apiGetList, apiGetEntityForm, apiGetEntityView, apiUpdateEntity, apiNewEntity, apiDeleteEntity } from 'src/pages/patients/_base/patient-services';

import { IPatient, IPatientFilters } from 'src/pages/patients/_base/patient-model';
import FormUpdate from 'src/pages/patients/_base/patient-form';

export const EntityContext = createContext(
    {} as {
        baseFilters?: IPatientFilters | any;
        entityEdit: IPatient;
        setEntityEdit: Dispatch<IPatient>;
        formTabActive: number;
        setFormTabActive: Dispatch<number>;
        entityView: IPatient;
        setEntityView: Dispatch<IPatient>;
        viewTabActive: number;
        setViewTabActive: Dispatch<number>;
        entityFilter: IPatientFilters;
        setEntityFilter: Dispatch<IPatientFilters>;
        loading: boolean;
        setLoading: Dispatch<boolean>;
        getEntityFiltersURL(offset?: number | null): string;
    },
);

const MUITable = () => {
    const router = useRouter();

    const [loading, setLoading] = useState(true);

    const [entityFilter, setEntityFilter] = useState<IPatientFilters>({});

    const [entityEdit, setEntityEdit] = useState<IPatient>({});
    const [entityView, setEntityView] = useState<IPatient>({});
    const [formTabActive, setFormTabActive] = useState<number>(0);
    const [viewTabActive, setViewTabActive] = useState<number>(0);
    const [showFilters, setShowFilters] = useState<boolean>(false);

    const openUpdateModal = (entity: IPatient) => {
        if (typeof entity.id === 'number' && entity?.id > 0) {
            const handleSuccess = (response: IApiResponseProps) => {
                const _entityEdit = response['data'][0] || {};
                setEntityEdit(_entityEdit);
            };
            apiGetEntityForm(entity.id, handleSuccess);
            setFormTabActive(0);
        } else {
            //  setEntityEdit({...{id: -1}, ...baseEntity})
        }
    };

    useEffect(() => {
        const id = +(router.query?.slug || -1);
        openUpdateModal({ id });
    }, [router.query?.slug]);

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
            entityFilter.sort +
            ',' +
            entityFilter.order +
            '&' +
            ''
        );
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

    const handleClose = () => {
        router.push(`/patients?${getEntityFiltersURL()}`);
    };

    return (
        <EntityContext.Provider
            value={{
                loading,
                setLoading,
                getEntityFiltersURL,
                entityFilter,
                setEntityFilter,
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
                        <h2>{!!entityEdit.id && entityEdit?.id > 0 ? 'Editar um paciente' : 'Novo pacientes'}</h2>
                    </>
                }
                buttons={
                    <>
                        <Button onClick={saveChanges} icon={'save'}>
                            Salvar agora
                        </Button>
                        <Button onClick={handleClose} icon={'ban'}>
                            Voltar
                        </Button>
                    </>
                }
            ></CardHeader>

            <Grid item xs={12}>
                <Card>
                    <Paper>
                        <FormUpdate isNew={!entityEdit?.id || entityEdit?.id < 0} />
                    </Paper>
                </Card>
            </Grid>
        </EntityContext.Provider>
    );
};

export default MUITable;
