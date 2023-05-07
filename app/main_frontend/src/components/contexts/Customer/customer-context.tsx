import { Dispatch, createContext } from 'react';
import { ICustomer, ICustomerFilters } from 'src/components/models/Customer/customer-model';
import { IEntityListSort } from 'src/layouts/components/inputs/FilterSelectMany';

export interface IReloadList {
    filters?: ICustomer | false;
    sort?: IEntityListSort | false;
    page?: number | false;
    size?: number | false;
}

export const EntityContext = createContext(
    {} as {
        baseFilters?: ICustomerFilters | any;
        baseEntity?: ICustomerFilters | any;
        entityEdit: ICustomer;
        setEntityEdit: Dispatch<ICustomer>;
        formTabActive: number;
        setFormTabActive: Dispatch<number>;
        entityView: ICustomer;
        setEntityView: Dispatch<ICustomer>;
        viewTabActive: number;
        setViewTabActive: Dispatch<number>;
        entityFilter: ICustomerFilters;
        setEntityFilter: Dispatch<ICustomerFilters>;
        entityList: ICustomer[];
        setEntityList: Dispatch<ICustomer[]>;
        entityListPage: number;
        setEntityListPage: Dispatch<number>;
        entityListSize: number;
        setEntityListSize: Dispatch<number>;
        entityListCount: number;
        setEntityListCount: Dispatch<number>;
        reloadList: (data: IReloadList) => void;
        loading: boolean;
        setLoading: Dispatch<boolean>;
        entityListSort: IEntityListSort;
        setEntityListSort: Dispatch<IEntityListSort>;
        getEntityFiltersURL(offset?: number | null): string;
    },
);

export default EntityContext;
