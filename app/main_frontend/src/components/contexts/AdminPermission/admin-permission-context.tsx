import { Dispatch, createContext } from 'react';
import { IAdminPermission, IAdminPermissionFilters } from 'src/components/models/AdminPermission/admin-permission-model';
import { IEntityListSort } from 'src/layouts/components/inputs/FilterSelectMany';

export interface IReloadList {
    filters?: IAdminPermission | false;
    sort?: IEntityListSort | false;
    page?: number | false;
    size?: number | false;
}

export const EntityContext = createContext(
    {} as {
        baseFilters?: IAdminPermissionFilters | any;
        baseEntity?: IAdminPermissionFilters | any;
        entityEdit: IAdminPermission;
        setEntityEdit: Dispatch<IAdminPermission>;
        formTabActive: number;
        setFormTabActive: Dispatch<number>;
        entityView: IAdminPermission;
        setEntityView: Dispatch<IAdminPermission>;
        viewTabActive: number;
        setViewTabActive: Dispatch<number>;
        entityFilter: IAdminPermissionFilters;
        setEntityFilter: Dispatch<IAdminPermissionFilters>;
        entityList: IAdminPermission[];
        setEntityList: Dispatch<IAdminPermission[]>;
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
