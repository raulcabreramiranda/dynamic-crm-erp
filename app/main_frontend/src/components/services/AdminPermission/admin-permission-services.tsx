import { apiGet, apiPost, apiPut, apiDelete, hasAnyAuthority, trim, IApiResponseProps } from 'src/util/entity-utils';
import { IAdminPermission } from 'src/components/models/AdminPermission/admin-permission-model';

export const apiGetList = ({ sort, filters, page, size }: any, onSuccess?: (response: IApiResponseProps) => void) => {
    apiGet(`admin-permissions`, {
        filters,
        sort,
        page,
        size,
        selectColumns: ['name', 'session', 'method'],
        onSuccess,
    });
};

export const apiGetEntityForm = (id: number, onSuccess?: (response: IApiResponseProps) => void) => {
    apiGet(`admin-permissions`, {
        filters: { 'id.equals': id },
        size: 1,
        selectColumns: ['name', 'session', 'method'],
        onSuccess,
    });
};

export const apiGetEntityView = (id: number, onSuccess?: (response: IApiResponseProps) => void) => {
    apiGet(`admin-permissions`, {
        filters: { 'id.equals': id },
        size: 1,
        selectColumns: ['name', 'session', 'method'],
        onSuccess,
    });
};

export const apiUpdateEntity = (entityEdit: IAdminPermission, onSuccess?: (response: IApiResponseProps) => void) => {
    apiPut(`admin-permissions`, {
        body: entityEdit,
        onSuccess,
    });
};

export const apiNewEntity = (entityEdit: IAdminPermission, onSuccess?: (response: IApiResponseProps) => void) => {
    apiPost(`admin-permissions`, {
        body: { ...entityEdit, id: undefined },
        onSuccess,
    });
};

export const apiDeleteEntity = (id: number, onSuccess?: (response: IApiResponseProps) => void) => {
    apiDelete(`admin-permissions`, {
        id: id,
        onSuccess,
    });
};

const __base = () => {
    return <></>;
};
export default __base;
