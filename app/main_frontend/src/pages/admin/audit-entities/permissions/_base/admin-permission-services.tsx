import { apiGet, apiPost, apiPut, apiDelete, hasAnyAuthority, trim, IApiResponseProps } from 'src/util/entity-utils';
import { IAdminPermission } from 'src/pages/admin/permissions/_base/admin-permission-model';

export const apiGetList = ({ sort, filters, page, size }: any, onSuccess?: (response: IApiResponseProps) => void) => {
    apiGet(`admin-permissions`, {
        filters,
        sort,
        page,
        size,
        selectColumns: ['name'],
        onSuccess,
    });
};

export const apiGetEntityForm = (id: number, onSuccess?: (response: IApiResponseProps) => void) => {
    apiGet(`admin-permissions`, {
        filters: { 'id.equals': id },
        size: 1,
        selectColumns: ['name'],
        onSuccess,
    });
};

export const apiGetEntityView = (id: number, onSuccess?: (response: IApiResponseProps) => void) => {
    apiGet(`admin-permissions`, {
        filters: { 'id.equals': id },
        size: 1,
        selectColumns: ['name'],
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
