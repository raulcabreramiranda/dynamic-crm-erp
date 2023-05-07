import { Dayjs } from 'dayjs';
import { IFilter } from 'src/util/entity-utils';

export const ApiPathAdminAuthority = 'admin-authorities';
export interface IAdminAuthority {
    id?: number;
    name?: string;

    createdBy?: number;
    createdDate?: Dayjs;
    lastModifiedBy?: number;
    lastModifiedDate?: Dayjs;
    deletedAt?: Dayjs;
}

export interface IAdminAuthorityFilter {
    id?: IFilter<number>;
    name?: IFilter<string>;

    createdBy?: number;
    createdDate?: Dayjs;
    lastModifiedBy?: number;
    lastModifiedDate?: Dayjs;
    deletedAt?: Dayjs;
}

export interface IAdminAuthorityFilters extends IAdminAuthorityFilter {
    baseFilters?: string;
    extraFilters?: string;
    activePage?: number;
    itemsPerPage?: number;
    sortField?: string;
    sortOrder?: 'asc' | 'desc';
}

export const defaultValue: Readonly<IAdminAuthority> = {
    id: 0,
};

export default () => <div />;
