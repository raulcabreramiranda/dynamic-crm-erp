import { apiGet, apiPost, apiPut, apiDelete, hasAnyAuthority, trim, IApiResponseProps } from 'src/util/entity-utils';
import { IPhoto } from 'src/components/models/Photo/photo-model';

export const apiGetList = ({ sort, filters, page, size }: any, onSuccess?: (response: IApiResponseProps) => void) => {
    apiGet(`photos`, {
        filters,
        sort,
        page,
        size,
        selectColumns: ['title', 'description', 'link', 'typeContent'],
        onSuccess,
    });
};

export const apiGetEntityForm = (id: number, onSuccess?: (response: IApiResponseProps) => void) => {
    apiGet(`photos`, {
        filters: { 'id.equals': id },
        size: 1,
        selectColumns: ['title', 'description', 'link', 'typeContent'],
        onSuccess,
    });
};

export const apiGetEntityView = (id: number, onSuccess?: (response: IApiResponseProps) => void) => {
    apiGet(`photos`, {
        filters: { 'id.equals': id },
        size: 1,
        selectColumns: ['title', 'description', 'link', 'typeContent'],
        onSuccess,
    });
};

export const apiUpdateEntity = (entityEdit: IPhoto, onSuccess?: (response: IApiResponseProps) => void) => {
    apiPut(`photos`, {
        body: entityEdit,
        onSuccess,
    });
};

export const apiNewEntity = (entityEdit: IPhoto, onSuccess?: (response: IApiResponseProps) => void) => {
    apiPost(`photos`, {
        body: { ...entityEdit, id: undefined },
        onSuccess,
    });
};

export const apiDeleteEntity = (id: number, onSuccess?: (response: IApiResponseProps) => void) => {
    apiDelete(`photos`, {
        id: id,
        onSuccess,
    });
};

const __base = () => {
    return <></>;
};
export default __base;
