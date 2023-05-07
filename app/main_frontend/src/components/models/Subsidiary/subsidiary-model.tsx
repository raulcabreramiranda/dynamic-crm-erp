import { Dayjs } from 'dayjs';
import { IFilter } from 'src/util/entity-utils';

export const ApiPathSubsidiary = 'subsidiaries';
export interface ISubsidiary {
    id?: number;
    commercialName?: string;
    corporateName?: string;
    cnpj?: string;
    telephone?: string;
    email?: string;
    address?: string;
    cnae?: string;

    createdBy?: number;
    createdDate?: Dayjs;
    lastModifiedBy?: number;
    lastModifiedDate?: Dayjs;
    deletedAt?: Dayjs;
}

export interface ISubsidiaryFilter {
    id?: IFilter<number>;
    commercialName?: IFilter<string>;
    corporateName?: IFilter<string>;
    cnpj?: IFilter<string>;
    telephone?: IFilter<string>;
    email?: IFilter<string>;
    address?: IFilter<string>;
    cnae?: IFilter<string>;
}

export interface ISubsidiaryFilters extends ISubsidiaryFilter {
    baseFilters?: string;
    extraFilters?: string;
    activePage?: number;
    itemsPerPage?: number;
    sortField?: string;
    sortOrder?: 'asc' | 'desc';
}

export const defaultValue: Readonly<ISubsidiary> = {
    id: 0,
};

export default () => <div />;
