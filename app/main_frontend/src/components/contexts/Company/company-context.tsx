import { Dispatch, createContext } from 'react';
import { ICompany, ICompanyFilters } from 'src/components/models/Company/company-model';
import { IEntityListSort } from 'src/layouts/components/inputs/FilterSelectMany';

export interface IReloadList {
    filters?: ICompany | false;
    sort?: IEntityListSort | false;
    page?: number | false;
    size?: number | false;
}

export const EntityContext = createContext(
    {} as {
        baseFilters?: ICompanyFilters | any;
        baseEntity?: ICompanyFilters | any;
        entityEdit: ICompany;
        setEntityEdit: Dispatch<ICompany>;
        formTabActive: number;
        setFormTabActive: Dispatch<number>;
        entityView: ICompany;
        setEntityView: Dispatch<ICompany>;
        viewTabActive: number;
        setViewTabActive: Dispatch<number>;
        entityFilter: ICompanyFilters;
        setEntityFilter: Dispatch<ICompanyFilters>;
        entityList: ICompany[];
        setEntityList: Dispatch<ICompany[]>;
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
