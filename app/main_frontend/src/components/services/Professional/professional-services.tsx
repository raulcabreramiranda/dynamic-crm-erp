import { apiGet, apiPost, apiPut, apiDelete, hasAnyAuthority, trim, IApiResponseProps } from 'src/util/entity-utils';
import { IProfessional } from 'src/components/models/Professional/professional-model';

export const apiGetList = ({ sort, filters, page, size }: any, onSuccess?: (response: IApiResponseProps) => void) => {
    apiGet(`professionals`, {
        filters,
        sort,
        page,
        size,
        selectColumns: ['name', 'birthDate', 'cpf', 'rg', 'telephone', 'email', 'contract', 'startDate', 'endDate'],
        onSuccess,
    });
};

export const apiGetEntityForm = (id: number, onSuccess?: (response: IApiResponseProps) => void) => {
    apiGet(`professionals`, {
        filters: { 'id.equals': id },
        size: 1,
        selectColumns: ['name', 'birthDate', 'cpf', 'rg', 'telephone', 'email', 'contract', 'startDate', 'endDate'],
        onSuccess,
    });
};

export const apiGetEntityView = (id: number, onSuccess?: (response: IApiResponseProps) => void) => {
    apiGet(`professionals`, {
        filters: { 'id.equals': id },
        size: 1,
        selectColumns: ['name', 'birthDate', 'cpf', 'rg', 'telephone', 'email', 'contract', 'startDate', 'endDate'],
        onSuccess,
    });
};

export const apiUpdateEntity = (entityEdit: IProfessional, onSuccess?: (response: IApiResponseProps) => void) => {
    apiPut(`professionals`, {
        body: entityEdit,
        onSuccess,
    });
};

export const apiNewEntity = (entityEdit: IProfessional, onSuccess?: (response: IApiResponseProps) => void) => {
    apiPost(`professionals`, {
        body: { ...entityEdit, id: undefined },
        onSuccess,
    });
};

export const apiDeleteEntity = (id: number, onSuccess?: (response: IApiResponseProps) => void) => {
    apiDelete(`professionals`, {
        id: id,
        onSuccess,
    });
};

const __base = () => {
    return <></>;
};
export default __base;
