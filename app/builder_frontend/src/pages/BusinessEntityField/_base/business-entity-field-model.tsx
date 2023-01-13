import { IBusinessEntity } from '../../BusinessEntity/_base/business-entity-model';
import { BusinessEntityFieldFieldType } from '../../../components/enumerations/business-entity-field-field-type.model';
import { Dayjs } from 'dayjs';

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

export interface IBusinessEntityFieldFilters extends IBusinessEntityField {
    baseFilters?: string;
    extraFilters?: string;
    activePage?: number;
    itemsPerPage?: number;
    sort?: string;
    order?: 'asc' | 'desc';
}

export const defaultValue: Readonly<IBusinessEntityField> = {
    id: 0,
};

export default () => <div />;
