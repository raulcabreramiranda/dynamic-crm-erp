import { Dispatch, createContext } from 'react';
import { IPatient, IPatientFilters } from 'src/components/models/Patient/patient-model';
import { IEntityListSort } from 'src/layouts/components/inputs/FilterSelectMany';

const EntityContextDetail = createContext(
    {} as {
        baseFilters?: IPatientFilters | any;
        entityView: IPatient;
        setEntityView: Dispatch<IPatient>;
        viewTabActive: number;
        setViewTabActive: Dispatch<number>;
        formTabActive: number;
        setFormTabActive: Dispatch<number>;
        entityFilter: IPatientFilters;
        setEntityFilter: Dispatch<IPatientFilters>;
        loading: boolean;
        setLoading: Dispatch<boolean>;
        getEntityFiltersURL(offset?: number | null): string;
    },
);

export default EntityContextDetail;
