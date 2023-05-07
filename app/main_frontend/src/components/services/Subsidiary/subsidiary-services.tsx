import { apiGet, apiPost, apiPut, apiDelete, hasAnyAuthority, trim, IApiResponseProps } from 'src/util/entity-utils';
import { ISubsidiary } from 'src/components/models/Subsidiary/subsidiary-model';

export const apiGetList = ({ sort, filters, page, size }: any, onSuccess?: (response: IApiResponseProps) => void) => {
    apiGet(`subsidiaries`, {
        filters,
        sort,
        page,
        size,
        selectColumns: ['commercialName', 'corporateName', 'cnpj', 'telephone', 'email'],
        onSuccess,
    });
};

export const apiGetEntityForm = (id: number, onSuccess?: (response: IApiResponseProps) => void) => {
    apiGet(`subsidiaries`, {
        filters: { 'id.equals': id },
        size: 1,
        selectColumns: ['commercialName', 'corporateName', 'cnpj', 'telephone', 'email', 'address', 'cnae'],
        onSuccess,
    });
};

export const apiGetEntityView = (id: number, onSuccess?: (response: IApiResponseProps) => void) => {
    apiGet(`subsidiaries`, {
        filters: { 'id.equals': id },
        size: 1,
        selectColumns: ['commercialName', 'corporateName', 'cnpj', 'telephone', 'email', 'address', 'cnae'],
        onSuccess,
    });
};

export const apiUpdateEntity = (entityEdit: ISubsidiary, onSuccess?: (response: IApiResponseProps) => void) => {
    apiPut(`subsidiaries`, {
        body: entityEdit,
        onSuccess,
    });
};

export const apiNewEntity = (entityEdit: ISubsidiary, onSuccess?: (response: IApiResponseProps) => void) => {
    apiPost(`subsidiaries`, {
        body: { ...entityEdit, id: undefined },
        onSuccess,
    });
};

export const apiDeleteEntity = (id: number, onSuccess?: (response: IApiResponseProps) => void) => {
    apiDelete(`subsidiaries`, {
        id: id,
        onSuccess,
    });
};

const __base = () => {
    return <></>;
};
export default __base;
