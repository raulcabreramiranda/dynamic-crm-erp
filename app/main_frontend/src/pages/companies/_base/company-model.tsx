import { Dayjs } from 'dayjs';
import { IFilter } from 'src/util/entity-utils';

export const ApiPathCompany = 'companies';
export interface ICompany {
    id?: number;
    commercialName?: string;
    corporateName?: string;
    cnpj?: string;
    telephone?: string;
    email?: string;
    address?: string;
    cnae?: string;
    technicalManagerName?: string;
    technicalManagerCategory?: string;
    technicalManagerBoardNumber?: string;

    createdBy?: number;
    createdDate?: Dayjs;
    lastModifiedBy?: number;
    lastModifiedDate?: Dayjs;
    deletedAt?: Dayjs;
}

export interface ICompanyFilter {
    id?: IFilter<number>;
    commercialName?: IFilter<string>;
    corporateName?: IFilter<string>;
    cnpj?: IFilter<string>;
    telephone?: IFilter<string>;
    email?: IFilter<string>;
    address?: IFilter<string>;
    cnae?: IFilter<string>;
    technicalManagerName?: IFilter<string>;
    technicalManagerCategory?: IFilter<string>;
    technicalManagerBoardNumber?: IFilter<string>;
}

export interface ICompanyFilters extends ICompany {
    baseFilters?: string;
    extraFilters?: string;
    activePage?: number;
    itemsPerPage?: number;
    sortField?: string;
    sortOrder?: 'asc' | 'desc';
}

export const defaultValue: Readonly<ICompany> = {
    id: 0,
};

export default () => <div />;
