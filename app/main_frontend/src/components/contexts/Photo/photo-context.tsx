import { Dispatch, createContext } from 'react';
import { IPhoto, IPhotoFilters } from 'src/components/models/Photo/photo-model';
import { IEntityListSort } from 'src/layouts/components/inputs/FilterSelectMany';

export interface IReloadList {
    filters?: IPhoto | false;
    sort?: IEntityListSort | false;
    page?: number | false;
    size?: number | false;
}

export const EntityContext = createContext(
    {} as {
        baseFilters?: IPhotoFilters | any;
        baseEntity?: IPhotoFilters | any;
        entityEdit: IPhoto;
        setEntityEdit: Dispatch<IPhoto>;
        formTabActive: number;
        setFormTabActive: Dispatch<number>;
        entityView: IPhoto;
        setEntityView: Dispatch<IPhoto>;
        viewTabActive: number;
        setViewTabActive: Dispatch<number>;
        entityFilter: IPhotoFilters;
        setEntityFilter: Dispatch<IPhotoFilters>;
        entityList: IPhoto[];
        setEntityList: Dispatch<IPhoto[]>;
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
