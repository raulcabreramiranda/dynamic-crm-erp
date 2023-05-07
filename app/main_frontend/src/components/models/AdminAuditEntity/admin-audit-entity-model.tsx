import { Dayjs } from 'dayjs';
import { IFilter } from 'src/util/entity-utils';

export const ApiPathAdminAuditEntity = 'admin-audit-entities';
export interface IAdminAuditEntity {
    id?: number;
    entityId?: number;
    entityType?: string;
    action?: string;
    entityValue?: any;
    entityKeyDiff?: any;
    commitVersion?: number;

    createdBy?: number;
    createdDate?: Dayjs;
    lastModifiedBy?: number;
    lastModifiedDate?: Dayjs;
    deletedAt?: Dayjs;
}

export interface IAdminAuditEntityFilter {
    id?: IFilter<number>;
    entityId?: IFilter<number>;
    entityType?: IFilter<string>;
    action?: IFilter<string>;
    entityValue?: IFilter<any>;
    entityKeyDiff?: IFilter<any>;
    commitVersion?: IFilter<number>;

    createdBy?: number;
    createdDate?: Dayjs;
    lastModifiedBy?: number;
    lastModifiedDate?: Dayjs;
    deletedAt?: Dayjs;
}

export interface IAdminAuditEntityFilters extends IAdminAuditEntityFilter {
    baseFilters?: string;
    extraFilters?: string;
    activePage?: number;
    itemsPerPage?: number;
    sortField?: string;
    sortOrder?: 'asc' | 'desc';
}

export const defaultValue: Readonly<IAdminAuditEntity> = {
    id: 0,
};

export default () => <div />;
