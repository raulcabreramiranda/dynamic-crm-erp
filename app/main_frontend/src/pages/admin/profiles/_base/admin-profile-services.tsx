import { apiGet, apiPost, apiPut, apiDelete, hasAnyAuthority, trim, IApiResponseProps } from 'src/util/entity-utils';
import { IAdminProfile } from 'src/pages/admin/profiles/_base/admin-profile-model';

export const apiGetList = ({ sort, filters, page, size }: any, onSuccess?: (response: IApiResponseProps) => void) => {
    apiGet(`admin-profiles`, {
        filters,
        sort,
        page,
        size,
        selectColumns: ['name'],
        onSuccess,
    });
};

export const apiGetEntityForm = (id: number, onSuccess?: (response: IApiResponseProps) => void) => {
    apiGet(`admin-profiles`, {
        filters: { 'id.equals': id },
        size: 1,
        selectColumns: ['name'],
        onSuccess,
    });
};

export const apiGetEntityView = (id: number, onSuccess?: (response: IApiResponseProps) => void) => {
    apiGet(`admin-profiles`, {
        filters: { 'id.equals': id },
        size: 1,
        selectColumns: ['name'],
        onSuccess,
    });
};

export const apiUpdateEntity = (entityEdit: IAdminProfile, onSuccess?: (response: IApiResponseProps) => void) => {
    apiPut(`admin-profiles`, {
        body: entityEdit,
        onSuccess,
    });
};

export const apiNewEntity = (entityEdit: IAdminProfile, onSuccess?: (response: IApiResponseProps) => void) => {
    apiPost(`admin-profiles`, {
        body: { ...entityEdit, id: undefined },
        onSuccess,
    });
};

export const apiDeleteEntity = (id: number, onSuccess?: (response: IApiResponseProps) => void) => {
    apiDelete(`admin-profiles`, {
        id: id,
        onSuccess,
    });
};
