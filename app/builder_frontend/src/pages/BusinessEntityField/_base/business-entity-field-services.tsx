import { apiGet, apiPost, apiPut, apiDelete, hasAnyAuthority, trim, IApiResponseProps } from 'src/util/entity-utils';
import { IBusinessEntityField } from 'src/pages/BusinessEntityField/_base/business-entity-field-model';

export const apiGetList = ({ sort, filters, page, size }: any, onSuccess?: (response: IApiResponseProps) => void) => {
    apiGet(`business-entity-fields`, {
        filters,
        sort,
        page,
        size,
        selectColumns: ['fieldName', 'fieldNameHumanized', 'fieldType', 'businessEntity.id', 'businessEntity.entityName', 'businessEntity.entityNameHumanized'],
        onSuccess,
    });
};

export const apiGetEntityForm = (id: number, onSuccess?: (response: IApiResponseProps) => void) => {
    apiGet(`business-entity-fields`, {
        filters: { 'id.equals': id },
        size: 1,
        selectColumns: ['fieldName', 'fieldNameHumanized', 'fieldType', 'businessEntity.id', 'businessEntity.entityName', 'businessEntity.entityNameHumanized'],
        onSuccess,
    });
};

export const apiGetEntityView = (id: number, onSuccess?: (response: IApiResponseProps) => void) => {
    apiGet(`business-entity-fields`, {
        filters: { 'id.equals': id },
        size: 1,
        selectColumns: ['fieldName', 'fieldNameHumanized', 'fieldType', 'businessEntity.id', 'businessEntity.entityName', 'businessEntity.entityNameHumanized'],
        onSuccess,
    });
};

export const apiUpdateEntity = (entityEdit: IBusinessEntityField, onSuccess?: (response: IApiResponseProps) => void) => {
    apiPut(`business-entity-fields`, {
        body: entityEdit,
        onSuccess,
    });
};

export const apiNewEntity = (entityEdit: IBusinessEntityField, onSuccess?: (response: IApiResponseProps) => void) => {
    apiPost(`business-entity-fields`, {
        body: { ...entityEdit, id: undefined },
        onSuccess,
    });
};

export const apiDeleteEntity = (id: number, onSuccess?: (response: IApiResponseProps) => void) => {
    apiDelete(`business-entity-fields`, {
        id: id,
        onSuccess,
    });
};
