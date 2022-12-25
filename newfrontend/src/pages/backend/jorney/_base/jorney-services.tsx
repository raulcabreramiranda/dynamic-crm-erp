import { apiGet, apiPost, apiPut, apiDelete, hasAnyAuthority, trim, IApiResponseProps } from 'src/util/entity-utils';
import { IJorney } from './jorney-model';

export const apiGetList = ({ sort, filters, page, size }: any, onSuccess?: (response: IApiResponseProps) => void) => {
    apiGet(`jorneys`, {
        filters,
        sort,
        page,
        size,
        selectColumns: ['imageBanner', 'year', 'name', 'jorneyType', 'clientId', 'jorneyDegrees.id', 'jorneyDegrees.year', 'themes.id'],
        onSuccess,
    });
};

export const apiGetEntity = (id: number, onSuccess?: (response: IApiResponseProps) => void) => {
    apiGet(`jorneys`, {
        filters: { 'id.equals': id },
        size: 1,
        selectColumns: ['imageBanner', 'year', 'name', 'jorneyType', 'clientId', 'jorneyDegrees.id', 'jorneyDegrees.year', 'themes.id'],
        onSuccess,
    });
};

export const apiUpdateEntity = (entityEdit: IJorney, onSuccess?: (response: IApiResponseProps) => void) => {
    apiPut(`jorneys`, {
        body: entityEdit,
        onSuccess,
    });
};

export const apiNewEntity = (entityEdit: IJorney, onSuccess?: (response: IApiResponseProps) => void) => {
    apiPost(`jorneys`, {
        body: { ...entityEdit, id: undefined },
        onSuccess,
    });
};

export const apiDeleteEntity = (id: number, onSuccess?: (response: IApiResponseProps) => void) => {
    apiDelete(`jorneys`, {
        id: id,
        onSuccess,
    });
};
