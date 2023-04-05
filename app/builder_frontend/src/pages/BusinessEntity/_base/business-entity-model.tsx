import { IBusinessEntityField, IBusinessEntityFieldFilter } from '../../BusinessEntityField/_base/business-entity-field-model';
import { Dayjs } from 'dayjs';
import { IFilter } from 'src/util/entity-utils';

export const ApiPathBusinessEntity = 'business-entities';
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

export interface IBusinessEntityFilter {
    id?: IFilter<number>;
    entityName?: IFilter<string>;
    entityNameHumanized?: IFilter<string>;
    entityNameHumanizedPlural?: IFilter<string>;
    frontPath?: IFilter<string>;
    hasWhiteLabel?: IFilter<boolean>;
    hasDateAudit?: IFilter<boolean>;
    businessEntityField?: IBusinessEntityFieldFilter[];

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
    sortField?: string;
    sortOrder?: 'asc' | 'desc';
}

export const defaultValue: Readonly<IBusinessEntity> = {
    id: 0,
};

export default () => <div />;
