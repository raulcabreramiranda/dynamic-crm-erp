import { Dispatch, createContext } from 'react';
import { IAdminProfile, IAdminProfileFilters } from 'src/components/models/AdminProfile/admin-profile-model';
import { IEntityListSort } from 'src/layouts/components/inputs/FilterSelectMany';

export interface IReloadList {
    filters?: IAdminProfile | false;
    sort?: IEntityListSort | false;
    page?: number | false;
    size?: number | false;
}

export const EntityContext = createContext(
    {} as {
        baseFilters?: IAdminProfileFilters | any;
        baseEntity?: IAdminProfileFilters | any;
        entityEdit: IAdminProfile;
        setEntityEdit: Dispatch<IAdminProfile>;
        formTabActive: number;
        setFormTabActive: Dispatch<number>;
        entityView: IAdminProfile;
        setEntityView: Dispatch<IAdminProfile>;
        viewTabActive: number;
        setViewTabActive: Dispatch<number>;
        entityFilter: IAdminProfileFilters;
        setEntityFilter: Dispatch<IAdminProfileFilters>;
        entityList: IAdminProfile[];
        setEntityList: Dispatch<IAdminProfile[]>;
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
