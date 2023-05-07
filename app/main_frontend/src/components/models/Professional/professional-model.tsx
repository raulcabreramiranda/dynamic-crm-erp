import { Dayjs } from 'dayjs';
import { IFilter } from 'src/util/entity-utils';

export const ApiPathProfessional = 'professionals';
export interface IProfessional {
    id?: number;
    name?: string;
    birthDate?: string;
    cpf?: string;
    rg?: string;
    telephone?: string;
    email?: string;
    contract?: string;
    startDate?: string;
    endDate?: string;

    createdBy?: number;
    createdDate?: Dayjs;
    lastModifiedBy?: number;
    lastModifiedDate?: Dayjs;
    deletedAt?: Dayjs;
}

export interface IProfessionalFilter {
    id?: IFilter<number>;
    name?: IFilter<string>;
    birthDate?: IFilter<string>;
    cpf?: IFilter<string>;
    rg?: IFilter<string>;
    telephone?: IFilter<string>;
    email?: IFilter<string>;
    contract?: IFilter<string>;
    startDate?: IFilter<string>;
    endDate?: IFilter<string>;
}

export interface IProfessionalFilters extends IProfessionalFilter {
    baseFilters?: string;
    extraFilters?: string;
    activePage?: number;
    itemsPerPage?: number;
    sortField?: string;
    sortOrder?: 'asc' | 'desc';
}

export const defaultValue: Readonly<IProfessional> = {
    id: 0,
};

export default () => <div />;
