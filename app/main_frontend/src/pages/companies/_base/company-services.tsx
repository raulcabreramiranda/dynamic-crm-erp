import { apiGet, apiPost, apiPut, apiDelete, hasAnyAuthority, trim, IApiResponseProps } from 'src/util/entity-utils';
import { ICompany } from 'src/pages/companies/_base/company-model';

export const apiGetList = ({ sort, filters, page, size }: any, onSuccess?: (response: IApiResponseProps) => void) => {
    apiGet(`companies`, {
        filters,
        sort,
        page,
        size,
        selectColumns: ['commercialName', 'corporateName', 'cnpj', 'telephone', 'email'],
        onSuccess,
    });
};

export const apiGetEntityForm = (id: number, onSuccess?: (response: IApiResponseProps) => void) => {
    apiGet(`companies`, {
        filters: { 'id.equals': id },
        size: 1,
        selectColumns: ['commercialName', 'corporateName', 'cnpj', 'telephone', 'email', 'address', 'cnae', 'technicalManagerName', 'technicalManagerCategory', 'technicalManagerBoardNumber'],
        onSuccess,
    });
};

export const apiGetEntityView = (id: number, onSuccess?: (response: IApiResponseProps) => void) => {
    apiGet(`companies`, {
        filters: { 'id.equals': id },
        size: 1,
        selectColumns: ['commercialName', 'corporateName', 'cnpj', 'telephone', 'email', 'address', 'cnae', 'technicalManagerName', 'technicalManagerCategory', 'technicalManagerBoardNumber'],
        onSuccess,
    });
};

export const apiUpdateEntity = (entityEdit: ICompany, onSuccess?: (response: IApiResponseProps) => void) => {
    apiPut(`companies`, {
        body: entityEdit,
        onSuccess,
    });
};

export const apiNewEntity = (entityEdit: ICompany, onSuccess?: (response: IApiResponseProps) => void) => {
    apiPost(`companies`, {
        body: { ...entityEdit, id: undefined },
        onSuccess,
    });
};

export const apiDeleteEntity = (id: number, onSuccess?: (response: IApiResponseProps) => void) => {
    apiDelete(`companies`, {
        id: id,
        onSuccess,
    });
};
