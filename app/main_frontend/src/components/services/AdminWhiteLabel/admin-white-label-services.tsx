import { apiGet, apiPost, apiPut, apiDelete, hasAnyAuthority, trim, IApiResponseProps } from 'src/util/entity-utils';
import { IAdminWhiteLabel } from 'src/components/models/AdminWhiteLabel/admin-white-label-model';

export const apiGetList = ({ sort, filters, page, size }: any, onSuccess?: (response: IApiResponseProps) => void) => {
    apiGet(`admin-white-labels`, {
        filters,
        sort,
        page,
        size,
        selectColumns: ['name'],
        onSuccess,
    });
};

export const apiGetEntityForm = (id: number, onSuccess?: (response: IApiResponseProps) => void) => {
    apiGet(`admin-white-labels`, {
        filters: { 'id.equals': id },
        size: 1,
        selectColumns: ['name'],
        onSuccess,
    });
};

export const apiGetEntityView = (id: number, onSuccess?: (response: IApiResponseProps) => void) => {
    apiGet(`admin-white-labels`, {
        filters: { 'id.equals': id },
        size: 1,
        selectColumns: ['name'],
        onSuccess,
    });
};

export const apiUpdateEntity = (entityEdit: IAdminWhiteLabel, onSuccess?: (response: IApiResponseProps) => void) => {
    apiPut(`admin-white-labels`, {
        body: entityEdit,
        onSuccess,
    });
};

export const apiNewEntity = (entityEdit: IAdminWhiteLabel, onSuccess?: (response: IApiResponseProps) => void) => {
    apiPost(`admin-white-labels`, {
        body: { ...entityEdit, id: undefined },
        onSuccess,
    });
};

export const apiDeleteEntity = (id: number, onSuccess?: (response: IApiResponseProps) => void) => {
    apiDelete(`admin-white-labels`, {
        id: id,
        onSuccess,
    });
};

const __base = () => {
    return <></>;
};
export default __base;
