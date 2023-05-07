import { Dispatch, createContext } from 'react';
import { IAdminUser, IAdminUserFilters } from 'src/components/models/AdminUser/admin-user-model';
import { IEntityListSort } from 'src/layouts/components/inputs/FilterSelectMany';

export interface IReloadList {
    filters?: IAdminUser | false;
    sort?: IEntityListSort | false;
    page?: number | false;
    size?: number | false;
}

export const EntityContext = createContext(
    {} as {
        baseFilters?: IAdminUserFilters | any;
        baseEntity?: IAdminUserFilters | any;
        entityEdit: IAdminUser;
        setEntityEdit: Dispatch<IAdminUser>;
        formTabActive: number;
        setFormTabActive: Dispatch<number>;
        entityView: IAdminUser;
        setEntityView: Dispatch<IAdminUser>;
        viewTabActive: number;
        setViewTabActive: Dispatch<number>;
        entityFilter: IAdminUserFilters;
        setEntityFilter: Dispatch<IAdminUserFilters>;
        entityList: IAdminUser[];
        setEntityList: Dispatch<IAdminUser[]>;
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
