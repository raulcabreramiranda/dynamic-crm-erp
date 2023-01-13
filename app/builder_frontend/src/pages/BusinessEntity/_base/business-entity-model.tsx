import { IBusinessEntityField } from '../../BusinessEntityField/_base/business-entity-field-model';
import { Dayjs } from 'dayjs';

export interface IBusinessEntity {
    id?: number;
    entityName?: string;
    entityNameHumanized?: string;
    entityNameHumanizedPlural?: string;
    frontPath?: string;
    hasWhiteLabel?: boolean;
    hasDateAudit?: boolean;
    businessEntityField?: IBusinessEntityField[];

    whiteLabel?: number;
    createdBy?: number;
    createdDate?: Dayjs;
    lastModifiedBy?: number;
    lastModifiedDate?: Dayjs;
    deletedAt?: Dayjs;
}

export interface IBusinessEntityFilters extends IBusinessEntity {
    baseFilters?: string;
    extraFilters?: string;
    activePage?: number;
    itemsPerPage?: number;
    sort?: string;
    order?: 'asc' | 'desc';
}

export const defaultValue: Readonly<IBusinessEntity> = {
    id: 0,
};

export default () => <div />;
