import { Dispatch, createContext } from 'react';
import { IAdminWhiteLabel, IAdminWhiteLabelFilters } from 'src/components/models/AdminWhiteLabel/admin-white-label-model';
import { IEntityListSort } from 'src/layouts/components/inputs/FilterSelectMany';

export interface IReloadList {
    filters?: IAdminWhiteLabel | false;
    sort?: IEntityListSort | false;
    page?: number | false;
    size?: number | false;
}

export const EntityContext = createContext(
    {} as {
        baseFilters?: IAdminWhiteLabelFilters | any;
        baseEntity?: IAdminWhiteLabelFilters | any;
        entityEdit: IAdminWhiteLabel;
        setEntityEdit: Dispatch<IAdminWhiteLabel>;
        formTabActive: number;
        setFormTabActive: Dispatch<number>;
        entityView: IAdminWhiteLabel;
        setEntityView: Dispatch<IAdminWhiteLabel>;
        viewTabActive: number;
        setViewTabActive: Dispatch<number>;
        entityFilter: IAdminWhiteLabelFilters;
        setEntityFilter: Dispatch<IAdminWhiteLabelFilters>;
        entityList: IAdminWhiteLabel[];
        setEntityList: Dispatch<IAdminWhiteLabel[]>;
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
