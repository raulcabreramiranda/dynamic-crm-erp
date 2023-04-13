import { apiGet, apiPost, apiPut, apiDelete, hasAnyAuthority, trim, IApiResponseProps } from 'src/util/entity-utils';
import { IPatient } from 'src/pages/patients/_base/patient-model';

export const apiGetList = ({ sort, filters, page, size }: any, onSuccess?: (response: IApiResponseProps) => void) => {
    apiGet(`patients`, {
        filters,
        sort,
        page,
        size,
        selectColumns: ['name', 'zipCode', 'neighborhood', 'city', 'uf', 'status'],
        onSuccess,
    });
};

export const apiGetEntityForm = (id: number, onSuccess?: (response: IApiResponseProps) => void) => {
    apiGet(`patients`, {
        filters: { 'id.equals': id },
        size: 1,
        selectColumns: [
            'name',
            'cpf',
            'rg',
            'sex',
            'birthDate',
            'weight',
            'height',
            'zipCode',
            'street',
            'number',
            'neighborhood',
            'city',
            'uf',
            'complement',
            'reference',
            'healthPlanEnrollment',
            'liminar',
            'patientComplexity',
            'adId',
            'obese',
            'nead',
            'hospitalReference',
            'observations',
            'informationProfessional',
        ],
        onSuccess,
    });
};

export const apiGetEntityView = (id: number, onSuccess?: (response: IApiResponseProps) => void) => {
    apiGet(`patients`, {
        filters: { 'id.equals': id },
        size: 1,
        selectColumns: [
            'name',
            'cpf',
            'rg',
            'sex',
            'birthDate',
            'weight',
            'height',
            'zipCode',
            'street',
            'number',
            'neighborhood',
            'city',
            'uf',
            'complement',
            'reference',
            'healthPlanEnrollment',
            'liminar',
            'patientComplexity',
            'adId',
            'obese',
            'nead',
            'hospitalReference',
            'observations',
            'informationProfessional',
        ],
        onSuccess,
    });
};

export const apiUpdateEntity = (entityEdit: IPatient, onSuccess?: (response: IApiResponseProps) => void) => {
    apiPut(`patients`, {
        body: entityEdit,
        onSuccess,
    });
};

export const apiNewEntity = (entityEdit: IPatient, onSuccess?: (response: IApiResponseProps) => void) => {
    apiPost(`patients`, {
        body: { ...entityEdit, id: undefined },
        onSuccess,
    });
};

export const apiDeleteEntity = (id: number, onSuccess?: (response: IApiResponseProps) => void) => {
    apiDelete(`patients`, {
        id: id,
        onSuccess,
    });
};
