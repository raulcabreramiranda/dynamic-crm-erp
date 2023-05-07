import { Dispatch, createContext } from 'react';
import { IProfessional, IProfessionalFilters } from 'src/components/models/Professional/professional-model';
import { IEntityListSort } from 'src/layouts/components/inputs/FilterSelectMany';

export interface IReloadList {
    filters?: IProfessional | false;
    sort?: IEntityListSort | false;
    page?: number | false;
    size?: number | false;
}

export const EntityContext = createContext(
    {} as {
        baseFilters?: IProfessionalFilters | any;
        baseEntity?: IProfessionalFilters | any;
        entityEdit: IProfessional;
        setEntityEdit: Dispatch<IProfessional>;
        formTabActive: number;
        setFormTabActive: Dispatch<number>;
        entityView: IProfessional;
        setEntityView: Dispatch<IProfessional>;
        viewTabActive: number;
        setViewTabActive: Dispatch<number>;
        entityFilter: IProfessionalFilters;
        setEntityFilter: Dispatch<IProfessionalFilters>;
        entityList: IProfessional[];
        setEntityList: Dispatch<IProfessional[]>;
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
