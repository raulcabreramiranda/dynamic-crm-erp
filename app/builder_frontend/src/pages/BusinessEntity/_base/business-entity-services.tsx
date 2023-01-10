import { apiGet, apiPost, apiPut, apiDelete, hasAnyAuthority, trim, IApiResponseProps } from 'src/util/entity-utils';
import { IBusinessEntity } from './business-entity-model';

export const apiGetList = ({ sort, filters, page, size }: any, onSuccess?: (response: IApiResponseProps) => void) => {
    apiGet(`business-entities`, {
        filters,
        sort,
        page,
        size,
        selectColumns: ['entityName', 'entityNameHumanized', 'entityNameHumanizedPlural', 'hasWhiteLabel', 'hasDateAudit', 'frontPath'],
        onSuccess,
    });
};

export const apiGetEntityForm = (id: number, onSuccess?: (response: IApiResponseProps) => void) => {
    apiGet(`business-entities`, {
        filters: { 'id.equals': id },
        size: 1,
        selectColumns: ['entityName', 'entityNameHumanized', 'entityNameHumanizedPlural', 'hasWhiteLabel', 'hasDateAudit', 'frontPath'],
        onSuccess,
    });
};

export const apiGetEntityView = (id: number, onSuccess?: (response: IApiResponseProps) => void) => {
    apiGet(`business-entities`, {
        filters: { 'id.equals': id },
        size: 1,
        selectColumns: ['entityName', 'entityNameHumanized', 'entityNameHumanizedPlural', 'hasWhiteLabel', 'hasDateAudit', 'frontPath'],
        onSuccess,
    });
};

export const apiUpdateEntity = (entityEdit: IBusinessEntity, onSuccess?: (response: IApiResponseProps) => void) => {
    apiPut(`business-entities`, {
        body: entityEdit,
        onSuccess,
    });
};

export const apiNewEntity = (entityEdit: IBusinessEntity, onSuccess?: (response: IApiResponseProps) => void) => {
    apiPost(`business-entities`, {
        body: { ...entityEdit, id: undefined },
        onSuccess,
    });
};

export const apiDeleteEntity = (id: number, onSuccess?: (response: IApiResponseProps) => void) => {
    apiDelete(`business-entities`, {
        id: id,
        onSuccess,
    });
};
