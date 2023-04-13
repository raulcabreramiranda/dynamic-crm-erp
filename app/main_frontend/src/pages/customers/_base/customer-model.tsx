import { CustomerPersonType } from '../../../components/enumerations/customer-person-type.model';
import { Dayjs } from 'dayjs';
import { IFilter } from 'src/util/entity-utils';

export const ApiPathCustomer = 'customers';
export interface ICustomer {
    id?: number;
    commercialName?: string;
    corporateName?: string;
    personType?: CustomerPersonType;
    cnpj?: string;
    cpf?: string;
    address?: string;
    telephone?: string;
    email?: string;
    technicalManagerName?: string;
    technicalManagerSector?: string;
    technicalManagerFunction?: string;
    technicalManagerContact?: string;
    technicalManagerEmail?: string;

    createdBy?: number;
    createdDate?: Dayjs;
    lastModifiedBy?: number;
    lastModifiedDate?: Dayjs;
    deletedAt?: Dayjs;
}

export interface ICustomerFilter {
    id?: IFilter<number>;
    commercialName?: IFilter<string>;
    corporateName?: IFilter<string>;
    personType?: IFilter<CustomerPersonType>;
    cnpj?: IFilter<string>;
    cpf?: IFilter<string>;
    address?: IFilter<string>;
    telephone?: IFilter<string>;
    email?: IFilter<string>;
    technicalManagerName?: IFilter<string>;
    technicalManagerSector?: IFilter<string>;
    technicalManagerFunction?: IFilter<string>;
    technicalManagerContact?: IFilter<string>;
    technicalManagerEmail?: IFilter<string>;
}

export interface ICustomerFilters extends ICustomer {
    baseFilters?: string;
    extraFilters?: string;
    activePage?: number;
    itemsPerPage?: number;
    sortField?: string;
    sortOrder?: 'asc' | 'desc';
}

export const defaultValue: Readonly<ICustomer> = {
    id: 0,
};

export default () => <div />;
