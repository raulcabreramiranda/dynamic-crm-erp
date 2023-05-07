import { Dispatch, createContext } from 'react';
import { IPatient, IPatientFilters } from 'src/components/models/Patient/patient-model';
import { IEntityListSort } from 'src/layouts/components/inputs/FilterSelectMany';

export interface IReloadList {
    filters?: IPatient | false;
    sort?: IEntityListSort | false;
    page?: number | false;
    size?: number | false;
}

const EntityContextList = createContext(
    {} as {
        baseFilters?: IPatientFilters | any;
        entityFilter: IPatientFilters;
        setEntityFilter: Dispatch<IPatientFilters>;
        entityList: IPatient[];
        setEntityList: Dispatch<IPatient[]>;
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

export default EntityContextList;
