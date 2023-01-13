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
import { apiGetList, apiGetEntityForm, apiUpdateEntity, apiNewEntity, apiDeleteEntity } from './business-entity-services';

import { IBusinessEntity, IBusinessEntityFilters } from './business-entity-model';
import FormView from './business-entity-view';

export const EntityContext = createContext(
    {} as {
        entityView: IBusinessEntity;
        setEntityView: Dispatch<IBusinessEntity>;
        entityFilter: IBusinessEntityFilters;
        setEntityFilter: Dispatch<IBusinessEntityFilters>;
        loading: boolean;
        setLoading: Dispatch<boolean>;
        getEntityFiltersURL(offset?: number | null): string;
    },
);

const MUITable = () => {
    const router = useRouter();

    const [loading, setLoading] = useState(true);

    const [entityFilter, setEntityFilter] = useState<IBusinessEntityFilters>({});

    const [entityView, setEntityView] = useState<IBusinessEntity>({});
    const [showFilters, setShowFilters] = useState<boolean>(false);

    const openUpdateModal = (entity: IBusinessEntity) => {
        if (typeof entity.id === 'number' && entity?.id > 0) {
            const handleSuccess = (response: IApiResponseProps) => {
                const _entityView = response['data'][0] || {};
                setEntityView(_entityView);
            };
            apiGetEntityForm(entity.id, handleSuccess);
        }
    };

    useEffect(() => {
        const id = +(router.query?.slug || -1);
        openUpdateModal({ id });
    }, []);

    const getEntityFiltersURL = (offset = null) => {
        return (
            '' +
            (entityFilter.entityName ? 'entityName=' + entityFilter.entityName + '&' : '') +
            (entityFilter.entityNameHumanized ? 'entityNameHumanized=' + entityFilter.entityNameHumanized + '&' : '') +
            (entityFilter.entityNameHumanizedPlural ? 'entityNameHumanizedPlural=' + entityFilter.entityNameHumanizedPlural + '&' : '') +
            (entityFilter.hasWhiteLabel ? 'hasWhiteLabel=' + entityFilter.hasWhiteLabel + '&' : '') +
            (entityFilter.hasDateAudit ? 'hasDateAudit=' + entityFilter.hasDateAudit + '&' : '') +
            (entityFilter.frontPath ? 'frontPath=' + entityFilter.frontPath + '&' : '') +
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

    const handleClose = () => {
        router.push(`/BusinessEntity?${getEntityFiltersURL()}`);
    };

    return (
        <EntityContext.Provider
            value={{
                loading,
                setLoading,
                getEntityFiltersURL,
                entityFilter,
                setEntityFilter,
                entityView,
                setEntityView,
            }}
        >
            <CardHeader
                title={
                    <>
                        <h2>Detail BusinessEntity </h2>
                    </>
                }
                buttons={
                    <>
                        <Button onClick={handleClose} icon={'arrow-left'}>
                            Go to list
                        </Button>
                    </>
                }
            ></CardHeader>
            <Grid item xs={12}>
                <Card>
                    <Paper>
                        <FormView />
                    </Paper>
                </Card>
            </Grid>
        </EntityContext.Provider>
    );
};

export default MUITable;
