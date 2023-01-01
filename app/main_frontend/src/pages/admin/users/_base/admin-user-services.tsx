import { apiGet, apiPost, apiPut, apiDelete, hasAnyAuthority, trim, IApiResponseProps } from 'src/util/entity-utils';
import { IAdminUser } from './admin-user-model';

export const apiGetList = ({ sort, filters, page, size }: any, onSuccess?: (response: IApiResponseProps) => void) => {
    apiGet(`admin-users`, {
        filters,
        sort,
        page,
        size,
        selectColumns: [
            'fullname',
            'cellphone',
            'adminProfile.id',
            'adminProfile.name',
            'adminPermissionUsers.id',
            'adminPermissionUsers.adminPermission.id',
            'adminPermissionUsers.adminPermission.name',
            'adminWhiteLabel.id',
        ],
        onSuccess,
    });
};

export const apiGetEntityForm = (id: number, onSuccess?: (response: IApiResponseProps) => void) => {
    apiGet(`admin-users`, {
        filters: { 'id.equals': id },
        size: 1,
        selectColumns: [
            'login',
            'fullname',

            'adminProfile.id',
            'adminProfile.name',

            'adminPermissionUsers.id',
            'adminPermissionUsers.adminPermission.id',
            'adminPermissionUsers.adminPermission.name',

            'adminWhiteLabel.id',
        ],
        onSuccess,
    });
};

export const apiGetEntityView = (id: number, onSuccess?: (response: IApiResponseProps) => void) => {
    apiGet(`admin-users`, {
        filters: { 'id.equals': id },
        size: 1,
        selectColumns: [
            'login',
            'fullname',

            'adminProfile.id',
            'adminProfile.name',

            'adminPermissionUsers.id',
            'adminPermissionUsers.adminPermission.id',
            'adminPermissionUsers.adminPermission.name',

            'adminWhiteLabel.id',
        ],
        onSuccess,
    });
};

export const apiUpdateEntity = (entityEdit: IAdminUser, onSuccess?: (response: IApiResponseProps) => void) => {
    apiPut(`admin-users`, {
        body: entityEdit,
        onSuccess,
    });
};

export const apiNewEntity = (entityEdit: IAdminUser, onSuccess?: (response: IApiResponseProps) => void) => {
    apiPost(`admin-users`, {
        body: { ...entityEdit, id: undefined },
        onSuccess,
    });
};

export const apiDeleteEntity = (id: number, onSuccess?: (response: IApiResponseProps) => void) => {
    apiDelete(`admin-users`, {
        id: id,
        onSuccess,
    });
};
