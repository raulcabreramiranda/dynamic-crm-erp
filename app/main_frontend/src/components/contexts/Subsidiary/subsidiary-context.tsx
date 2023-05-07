import { Dispatch, createContext } from 'react';
import { ISubsidiary, ISubsidiaryFilters } from 'src/components/models/Subsidiary/subsidiary-model';
import { IEntityListSort } from 'src/layouts/components/inputs/FilterSelectMany';

export interface IReloadList {
    filters?: ISubsidiary | false;
    sort?: IEntityListSort | false;
    page?: number | false;
    size?: number | false;
}

export const EntityContext = createContext(
    {} as {
        baseFilters?: ISubsidiaryFilters | any;
        baseEntity?: ISubsidiaryFilters | any;
        entityEdit: ISubsidiary;
        setEntityEdit: Dispatch<ISubsidiary>;
        formTabActive: number;
        setFormTabActive: Dispatch<number>;
        entityView: ISubsidiary;
        setEntityView: Dispatch<ISubsidiary>;
        viewTabActive: number;
        setViewTabActive: Dispatch<number>;
        entityFilter: ISubsidiaryFilters;
        setEntityFilter: Dispatch<ISubsidiaryFilters>;
        entityList: ISubsidiary[];
        setEntityList: Dispatch<ISubsidiary[]>;
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
