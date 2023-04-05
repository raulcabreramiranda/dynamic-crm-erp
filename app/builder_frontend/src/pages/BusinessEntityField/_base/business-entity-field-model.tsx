import { IBusinessEntity, IBusinessEntityFilter } from '../../BusinessEntity/_base/business-entity-model';
import { BusinessEntityFieldFieldType } from '../../../components/enumerations/business-entity-field-field-type.model';
import { Dayjs } from 'dayjs';
import { IFilter } from 'src/util/entity-utils';

export const ApiPathBusinessEntityField = 'business-entity-fields';
export interface IBusinessEntityField {
    id?: number;
    fieldName?: string;
    fieldNameHumanized?: string;
    fieldType?: BusinessEntityFieldFieldType;
    businessEntity?: IBusinessEntity;

    whiteLabel?: number;
    createdBy?: number;
    createdDate?: Dayjs;
    lastModifiedBy?: number;
    lastModifiedDate?: Dayjs;
    deletedAt?: Dayjs;
}

export interface IBusinessEntityFieldFilter {
    id?: IFilter<number>;
    fieldName?: IFilter<string>;
    fieldNameHumanized?: IFilter<string>;
    fieldType?: IFilter<BusinessEntityFieldFieldType>;
    businessEntity?: IBusinessEntityFilter;

    whiteLabel?: number;
    createdBy?: number;
    createdDate?: Dayjs;
    lastModifiedBy?: number;
    lastModifiedDate?: Dayjs;
    deletedAt?: Dayjs;
}

export interface IBusinessEntityFieldFilters extends IBusinessEntityField {
    baseFilters?: string;
    extraFilters?: string;
    activePage?: number;
    itemsPerPage?: number;
    sortField?: string;
    sortOrder?: 'asc' | 'desc';
}

export const defaultValue: Readonly<IBusinessEntityField> = {
    id: 0,
};

export default () => <div />;
