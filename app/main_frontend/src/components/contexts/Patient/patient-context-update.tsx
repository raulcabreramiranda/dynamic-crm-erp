import { Dispatch, createContext } from 'react';
import { IPatient, IPatientFilters } from 'src/components/models/Patient/patient-model';
import { IEntityListSort } from 'src/layouts/components/inputs/FilterSelectMany';

const EntityContextUpdate = createContext(
    {} as {
        baseFilters?: IPatientFilters | any;
        entityEdit: IPatient;
        setEntityEdit: Dispatch<IPatient>;
        formTabActive: number;
        setFormTabActive: Dispatch<number>;
        entityView: IPatient;
        setEntityView: Dispatch<IPatient>;
        viewTabActive: number;
        setViewTabActive: Dispatch<number>;
        entityFilter: IPatientFilters;
        setEntityFilter: Dispatch<IPatientFilters>;
        loading: boolean;
        setLoading: Dispatch<boolean>;
        getEntityFiltersURL(offset?: number | null): string;
    },
);
export default EntityContextUpdate;
