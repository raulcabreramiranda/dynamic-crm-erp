import { apiGet, apiPost, apiPut, apiDelete, hasAnyAuthority, trim, IApiResponseProps } from 'src/util/entity-utils';
import { ICustomer } from 'src/components/models/Customer/customer-model';

export const apiGetList = ({ sort, filters, page, size }: any, onSuccess?: (response: IApiResponseProps) => void) => {
    apiGet(`customers`, {
        filters,
        sort,
        page,
        size,
        selectColumns: ['commercialName', 'corporateName', 'cnpj', 'cpf', 'telephone', 'email'],
        onSuccess,
    });
};

export const apiGetEntityForm = (id: number, onSuccess?: (response: IApiResponseProps) => void) => {
    apiGet(`customers`, {
        filters: { 'id.equals': id },
        size: 1,
        selectColumns: [
            'commercialName',
            'corporateName',
            'cnpj',
            'cpf',
            'telephone',
            'email',
            'address',
            'technicalManagerName',
            'technicalManagerSector',
            'technicalManagerFunction',
            'technicalManagerContact',
            'technicalManagerEmail',
        ],
        onSuccess,
    });
};

export const apiGetEntityView = (id: number, onSuccess?: (response: IApiResponseProps) => void) => {
    apiGet(`customers`, {
        filters: { 'id.equals': id },
        size: 1,
        selectColumns: [
            'commercialName',
            'corporateName',
            'cnpj',
            'cpf',
            'telephone',
            'email',
            'address',
            'technicalManagerName',
            'technicalManagerSector',
            'technicalManagerFunction',
            'technicalManagerContact',
            'technicalManagerEmail',
        ],
        onSuccess,
    });
};

export const apiUpdateEntity = (entityEdit: ICustomer, onSuccess?: (response: IApiResponseProps) => void) => {
    apiPut(`customers`, {
        body: entityEdit,
        onSuccess,
    });
};

export const apiNewEntity = (entityEdit: ICustomer, onSuccess?: (response: IApiResponseProps) => void) => {
    apiPost(`customers`, {
        body: { ...entityEdit, id: undefined },
        onSuccess,
    });
};

export const apiDeleteEntity = (id: number, onSuccess?: (response: IApiResponseProps) => void) => {
    apiDelete(`customers`, {
        id: id,
        onSuccess,
    });
};

const __base = () => {
    return <></>;
};
export default __base;
